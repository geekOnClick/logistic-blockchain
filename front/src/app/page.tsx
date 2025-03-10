/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, {useState, useEffect} from "react";
import {ethers} from "ethers";
import { Logistic__factory } from "@/typechain";
import { ConnectWallet } from "./components/ConnectWallet";
import { WaitinfForTransactionMessage } from "./components/WaitingForTransactionMessage";
import { TransactionErrorMessage } from "./components/TransactionErrorMessage";
import { CurrentConnectionProps, OrderProps } from "./types";
import { OrdersTable } from "./components/ui/OrdersTable";
import { BigNumberish } from "ethers";
import { DeliveryOperatorForm } from "./components/ui/forms/DeliveryOperatorForm";
import { BayerForm } from "./components/ui/forms/BayerForm";

declare let window: any;
// НЕ ЗАБЫТЬ МЕНЯТЬ АДРЕС КОНТРАКТА
const CONTRACT_ADDRESS = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
const HARDHAT_NETWORK_ID = '0x539';

// const MUSIC_SHOP_ADDRESS = process.env.MUSIC_SHOP_ADDRESS;
// const HARDHAT_NETWORK_ID = process.env.HARDHAT_NETWORK_ID;

export default function Home() {

    const [currentConnection, setCurrentConnection] = useState<CurrentConnectionProps>();
    const [networkError, setNetworkError] = useState<string | undefined>();
    const [txBeingSent, setTxBeingSent] = useState<string | undefined>();
    const [transactionError, setTransactionError] = useState<any>();
    
    const [currentBalance, setCurrentBalance] = useState<string|undefined>();
    const [orders, setOrders] = useState<OrderProps[]>([]);
    const [role, setRole] = useState<string>('');
    const [contractBalance, setContractBalance] = useState<BigNumberish | undefined>();

    // корректное обновление баланса
    useEffect(() => {
        ( async () => {
            if(currentConnection?.provider && currentConnection?.signer) {
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
        })()
    }, [currentConnection, txBeingSent])

    // отображение заказов
    useEffect(() => {
        ( async () => {
            if(currentConnection?.contract && currentConnection?.signer) {
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
                        }
                       })
                   setOrders(() => [...newOrders]);
                

               setRole(await currentConnection?.contract?.getRoleByAdress(await currentConnection?.signer?.getAddress()));
            }
        })()

    }, [currentConnection])

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
            contract: Logistic__factory.connect(CONTRACT_ADDRESS as string, signer),
        })
    }

    const _getRpcErrorMessage = (error: any):string => {
        console.warn(error);

        if(error?.data) {
            return error.data.message;
        }
        if(error?.message) {
            return error.message;
        }

        return error;
    }
    // работа с аккаунтами на метамаск
    const _connectWallet = async () => {
        console.log("connect wallet");
        if(!window.ethereum) {
            return setNetworkError("Metamask not detected");
        }
        if(!(await _checkNetwork())) {
            return;
        }
        const [selectedAccount] = await window.ethereum.request({method: "eth_requestAccounts"});
        await _initialize(selectedAccount);

        window.ethereum.on("accountsChanged", async ([newAccount]: [newAccount:string]) => {
            if(newAccount === undefined) {
                return _resetState();
            }
            await _initialize(newAccount);
        });

        window.ethereum.on("chainChanged", async () => {
            _resetState();
        });
    }

    const _resetState = () => {
        setCurrentConnection({
            provider: undefined,
            contract: undefined,
            signer: undefined,
        });
        setOrders([]);
        setNetworkError(undefined);
        setTransactionError(undefined);
        setCurrentBalance(undefined);
        setRole('');
        setTxBeingSent(undefined);
    }

    const _checkNetwork = async (): Promise<boolean> => {
       const chosenChainId =  await window.ethereum.request({method: "eth_chainId"});

       if(chosenChainId === HARDHAT_NETWORK_ID) {
            return true;
       }
       setNetworkError("Change network to Hardhat(localhost:8545)");
       return false;
    }


  return (
      <main className="flex flex-col px-4 py-4 gap-8 row-start-2 items-center sm:items-start">
        {!currentConnection?.signer && (
            <ConnectWallet
                connectWallet={_connectWallet}
                networkError={networkError}
                dismiss={_dismissNetworkError}
            />
        )}

        {currentConnection?.signer && (
            <p>Your address: {currentConnection.signer.address}</p>
        )}

        {txBeingSent && <WaitinfForTransactionMessage txHash={txBeingSent} />}

        {transactionError && (
            <TransactionErrorMessage 
                message={_getRpcErrorMessage(transactionError)}
                dismiss={_dismissTransactionError}
            />
        )}

        {currentBalance && (
            <>
            <p>Your Balance: {ethers.formatEther(currentBalance)} ETH</p>
            <p>Your Role: {role} </p>
            </>
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
            <BayerForm 
                currentConnection={currentConnection}
                orders={orders}
                setTransactionError={setTransactionError}
                setTxBeingSent={setTxBeingSent}
            />
        )}
        {currentConnection?.contract && (
            <div>
                {contractBalance && <p>Contract Balance: {contractBalance} ETH</p>}
                <p className="mt-8">Orders:</p>
                <OrdersTable orders={orders} />
            </div>
        )
        }
        {/* <ul>
            Albums:
            {albums.map(album => 
            <div key={album.uid}>
                <li>Title: {album.title}</li>
                <li>Price: {album.price}</li>
                <li>Quantity: {album.quantity}</li>
                {BigInt(album.quantity) > BigInt(0) && <button onClick={(e) => _handleBuyAlbum(album, e)}>Buy</button>}
            </div>
            )}
        </ul> */}
{/* 
        {isOwner && !txBeingSent && (
            <>
            <h2>Add Album</h2>
            <form onSubmit={_handleAddAlbum}>
               <input name="title" placeholder="Title" />
               <input name="price" placeholder="Price" /> 
               <input name="quantity" placeholder="Quantity" /> 
               <button type="submit">ADD</button>
            </form>
            </>
        )} */}
      </main>

  );
}
