/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Logistic__factory } from '@/typechain';
import { ConnectWallet } from './components/ConnectWallet';
import { WaitinfForTransactionMessage } from './components/WaitingForTransactionMessage';
import { TransactionErrorMessage } from './components/TransactionErrorMessage';
import { CurrentConnectionProps, OrderProps, TxsToOwner } from './types';
import { OrdersTable } from './components/ui/OrdersTable';
import { BigNumberish } from 'ethers';
import { DeliveryOperatorForm } from './components/ui/forms/DeliveryOperatorForm';
import { BayerForm } from './components/ui/forms/BayerForm';
import { ControllerForm } from './components/ui/forms/ControllerForm';
import { AcceptanceOperatorForm } from './components/ui/forms/AcceptanceOperatorForm';
import { BayerRefundForm } from './components/ui/forms/BayerRefundForm';
import { SellerTable } from './components/ui/SellerTable';
import { Select } from './components/ui/Select';
import { OrderWay } from './components/ui/OrderWay';

declare let window: any;
// НЕ ЗАБЫТЬ МЕНЯТЬ АДРЕС КОНТРАКТА
const CONTRACT_ADDRESS = '0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9';
const HARDHAT_NETWORK_ID = '0x539';

// const MUSIC_SHOP_ADDRESS = process.env.MUSIC_SHOP_ADDRESS;
// const HARDHAT_NETWORK_ID = process.env.HARDHAT_NETWORK_ID;

export default function Home() {
    const [currentConnection, setCurrentConnection] = useState<CurrentConnectionProps>();
    const [networkError, setNetworkError] = useState<string | undefined>();
    const [txBeingSent, setTxBeingSent] = useState<string | undefined>();
    const [transactionError, setTransactionError] = useState<any>();
    const [txsBeingSentToOwner, setTxsBeingSentToOwner] = useState<TxsToOwner[]>([]);

    const [currentBalance, setCurrentBalance] = useState<string | undefined>();
    const [orders, setOrders] = useState<OrderProps[]>([]);
    const [role, setRole] = useState<string>('');
    const [contractBalance, setContractBalance] = useState<BigNumberish | undefined>();
    const [controlledOrderId, setControlledOrderId] = useState<BigNumberish | undefined>();
    const [acceptanceOrderId, setAcceptanceOrderId] = useState<BigNumberish | undefined>();
    const [selectedOrder, setSelectedOrder] = useState<OrderProps | undefined>();

    // корректное обновление баланса
    useEffect(() => {
        (async () => {
            if (currentConnection?.provider && currentConnection?.signer) {
                setCurrentBalance(
                    (
                        await currentConnection?.provider.getBalance(
                            currentConnection?.signer?.address,
                            // для корректного запроса баланса
                            await currentConnection?.provider?.getBlockNumber()
                        )
                    ).toString()
                );

                setContractBalance(
                    (
                        await currentConnection?.provider.getBalance(
                            CONTRACT_ADDRESS,
                            // для корректного запроса баланса
                            await currentConnection?.provider?.getBlockNumber()
                        )
                    ).toString()
                );
            }
        })();
    }, [currentConnection, txBeingSent]);

    // отображение заказов и сохранение выполненных заказов
    useEffect(() => {
        (async () => {
            if (currentConnection?.contract && currentConnection?.signer) {
                const newOrders = (await currentConnection?.contract?.allOrders()).map((order) => {
                    return {
                        orderId: order.orderId,
                        resourceId: order.resourceId,
                        resourceTitle: order.resourceTitle,
                        resourceWeight: order.resourceWeight,
                        resourcePrice: order.resourcePrice,
                        orderedAt: order.orderedAt,
                        orderStatus: order.orderStatus,
                        logisticStatus: order.logisticStatus
                    };
                });
                setOrders(() => [...newOrders]);

                const acceptedOrders = (await currentConnection?.contract?.allAcceptedOrders()).map(
                    (order) => {
                        return {
                            hash: order.hash,
                            timestamp: order.timestamp,
                            value: order.value
                        };
                    }
                );
                setTxsBeingSentToOwner(() => [...acceptedOrders]);

                setRole(
                    await currentConnection?.contract?.getRoleByAdress(
                        await currentConnection?.signer?.getAddress()
                    )
                );
            }
        })();
    }, [currentConnection]);

    useEffect(() => {
        setSelectedOrder(prev => orders.find((order) => String(order.orderId) === String(prev?.orderId)));
    }, [orders])

    const _dismissNetworkError = () => {
        setNetworkError(undefined);
    };

    const _dismissTransactionError = () => {
        setTransactionError(undefined);
    };

    const _initialize = async (selectedAccount: string) => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner(selectedAccount);

        console.log('selectedAcc', selectedAccount);
        setCurrentConnection({
            ...currentConnection,
            provider,
            signer,
            contract: Logistic__factory.connect(CONTRACT_ADDRESS as string, signer)
        });
    };

    const _getRpcErrorMessage = (error: any): string => {
        console.warn(error);

        if (error?.data) {
            return error.data.message;
        }
        if (error?.message) {
            return error.message;
        }

        return error;
    };
    // работа с аккаунтами на метамаск
    const _connectWallet = async () => {
        console.log('connect wallet');
        if (!window.ethereum) {
            return setNetworkError('Metamask not detected');
        }
        if (!(await _checkNetwork())) {
            return;
        }
        const [selectedAccount] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        await _initialize(selectedAccount);

        window.ethereum.on('accountsChanged', async ([newAccount]: [newAccount: string]) => {
            if (newAccount === undefined) {
                return _resetState();
            }
            await _initialize(newAccount);
        });

        window.ethereum.on('chainChanged', async () => {
            _resetState();
        });
    };

    const _resetState = () => {
        setCurrentConnection({
            provider: undefined,
            contract: undefined,
            signer: undefined
        });
        setOrders([]);
        setNetworkError(undefined);
        setTransactionError(undefined);
        setCurrentBalance(undefined);
        setRole('');
        setTxBeingSent(undefined);
        setControlledOrderId(undefined);
        setAcceptanceOrderId(undefined);
    };

    const _checkNetwork = async (): Promise<boolean> => {
        const chosenChainId = await window.ethereum.request({ method: 'eth_chainId' });

        if (chosenChainId === HARDHAT_NETWORK_ID) {
            return true;
        }
        setNetworkError('Change network to Hardhat(localhost:8545)');
        return false;
    };

    const handleOrder = async (orderId: BigNumberish) => {
        if (!currentConnection?.contract) {
            return;
        }

        const contract = currentConnection.contract;
        try {
            const addTx =
                role === 'controller'
                    ? await contract.controll(orderId)
                    : await contract.delivered(orderId);
            setTxBeingSent(addTx.hash);
            await addTx.wait();

            if (role === 'controller') {
                setControlledOrderId(orderId);
            } else {
                console.log(1, orderId);
                setAcceptanceOrderId(orderId);
            }

            const order = orders.find((order) => order.orderId === orderId);
            if (order) {
                order.logisticStatus = role === 'controller' ? 'Control' : 'Delivired';
            }
        } catch (error) {
            console.error(error);
            setTransactionError(error as string);
        } finally {
            setTxBeingSent(undefined);
        }
    };

    return (
        <main
            className={`grid ${
                currentBalance ? 'grid-cols-2' : 'grid-cols-1 justify-items-center'
            } gap-4 px-4 py-4`}>
            <div className='flex flex-col gap-8'>
                {!currentConnection?.signer && (
                    <ConnectWallet
                        connectWallet={_connectWallet}
                        networkError={networkError}
                        dismiss={_dismissNetworkError}
                    />
                )}

                {currentBalance && (
                    <div className='bg-gray-500 px-4 py-4 flex gap-4 flex-col rounded-lg'>
                        {currentConnection?.signer && (
                            <p>Your address: {currentConnection.signer.address}</p>
                        )}
                        <p>Your Balance: {ethers.formatEther(currentBalance)} ETH</p>
                        <p>Your Role: {role} </p>
                    </div>
                )}

                {role === 'deliveryOperator' && currentConnection && (
                    <DeliveryOperatorForm
                        currentConnection={currentConnection}
                        setOrders={setOrders}
                        setTransactionError={setTransactionError}
                        setTxBeingSent={setTxBeingSent}
                    />
                )}
                {role === 'Bayer' && currentConnection && (
                    <>
                        <BayerForm
                            currentConnection={currentConnection}
                            orders={orders}
                            setOrders={setOrders}
                            setTransactionError={setTransactionError}
                            setTxBeingSent={setTxBeingSent}
                        />
                        <BayerRefundForm
                            currentConnection={currentConnection}
                            orders={orders}
                            setOrders={setOrders}
                            setTransactionError={setTransactionError}
                            setTxBeingSent={setTxBeingSent}
                        />
                    </>
                )}
                {role === 'controller' &&
                    typeof controlledOrderId === 'bigint' &&
                    currentConnection && (
                        <ControllerForm
                            currentConnection={currentConnection as CurrentConnectionProps}
                            orders={orders}
                            setOrders={setOrders}
                            setTransactionError={setTransactionError}
                            setTxBeingSent={setTxBeingSent}
                            orderId={controlledOrderId as BigNumberish}
                            setControlledOrderId={setControlledOrderId}
                        />
                    )}
                {role === 'acceptanceOperator' &&
                    typeof acceptanceOrderId === 'bigint' &&
                    currentConnection && (
                        <AcceptanceOperatorForm
                            currentConnection={currentConnection as CurrentConnectionProps}
                            orders={orders}
                            setOrders={setOrders}
                            setTransactionError={setTransactionError}
                            setTxBeingSent={setTxBeingSent}
                            orderId={acceptanceOrderId as BigNumberish}
                            setAcceptanceOrderId={setAcceptanceOrderId}
                            setTxsBeingSentToOwner={setTxsBeingSentToOwner}
                        />
                    )}
                {role === 'Seller' && <SellerTable txsBeingSentToOwner={txsBeingSentToOwner} />}
                {currentConnection?.contract && (
                    <div className='mt-4'>
                        <div className='w-full h-[2px] bg-gray-500'></div>
                        {contractBalance && (
                            <p className='mt-4'>Contract Balance: {contractBalance} ETH</p>
                        )}
                        <p className='mt-4'>Orders:</p>
                        <OrdersTable orders={orders} role={role} handleOrder={handleOrder} />
                    </div>
                )}

                {txBeingSent && <WaitinfForTransactionMessage txHash={txBeingSent} />}

                {transactionError && (
                    <TransactionErrorMessage
                        message={_getRpcErrorMessage(transactionError)}
                        dismiss={_dismissTransactionError}
                    />
                )}
            </div>
            {currentBalance && (
                <div className='p-4 bg-gray-900 shadow-lg rounded-lg flex gap-4 flex-col'>
                    <Select orders={orders} selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />
                    {selectedOrder && <OrderWay order={selectedOrder} />}
                </div>
            )}
        </main>
    );
}
