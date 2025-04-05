import { CurrentConnectionProps, OrderProps, TxsToOwner } from '@/app/types';
import { BigNumberish } from 'ethers';
import React from 'react';

type ContolllerFormProps = {
    currentConnection: CurrentConnectionProps;
    setTxBeingSent: React.Dispatch<React.SetStateAction<string | undefined>>;
    setTransactionError: React.Dispatch<React.SetStateAction<string | undefined>>;
    setAcceptanceOrderId: React.Dispatch<React.SetStateAction<BigNumberish | undefined>>;
    orderId: BigNumberish;
    orders: OrderProps[];
    setOrders: React.Dispatch<React.SetStateAction<OrderProps[]>>;
    setTxsBeingSentToOwner: React.Dispatch<React.SetStateAction<TxsToOwner[]>>;
};

export const AcceptanceOperatorForm: React.FC<ContolllerFormProps> = ({
    orderId,
    orders,
    setOrders,
    currentConnection,
    setTransactionError,
    setAcceptanceOrderId,
    setTxBeingSent,
}) => {
    const handleAcceptOrder = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const formData = new FormData(event.currentTarget);

            const resourceWeight = formData.get('resourceWeight')?.toString();
            const noDamage = formData.get('cargoNotDamaged');

            const order = orders.find((order) => order.orderId === orderId);
            if (!order) {
                setTransactionError('Not correct order ID');
                return;
            }
            if (!currentConnection?.contract) {
                return;
            }

            if (!noDamage || !resourceWeight) {
                // Проверка отклонила ордер
                const controlTx = await currentConnection.contract.controllFailed(orderId);
                setTxBeingSent(controlTx.hash);
                await controlTx.wait();

                setOrders((prevOrders) =>
                    prevOrders.map((prevOrder) => {
                        if (order.orderId === prevOrder.orderId) {
                            return {
                                ...prevOrder,
                                logisticStatus: 'ControllFailed'
                            };
                        }
                        return prevOrder;
                    })
                );
            } else {
                // Успешный сценарий
                const controlTx = await currentConnection.contract.acceptOrder(orderId);
                setTxBeingSent(controlTx.hash);
                await controlTx.wait();
                setOrders((prevOrders) =>
                    prevOrders.map((prevOrder) => {
                        if (order.orderId === prevOrder.orderId) {
                            return {
                                ...prevOrder,
                                logisticStatus: 'Accepted',
                                orderStatus: 'PaidOnSeller'
                            };
                        }
                        return prevOrder;
                    })
                );

                // const txToOwner: TxsToOwner = {
                //     hash: controlTx.hash,
                //     timestamp: Math.floor(Date.now() / 1000),
                //     value: order.resourcePrice
                // };
                // const acceptedOrderTx = await currentConnection.contract.addAcceptedOrder(
                //     txToOwner.timestamp,
                //     txToOwner.hash,
                //     txToOwner.value
                // );
                // await acceptedOrderTx.wait();
                // setTxsBeingSentToOwner((txs) => [...txs, txToOwner]);
                //TODO: должен отдавать событие перевода денег
                // if(currentConnection.provider) {
                //     currentConnection.provider.on("OrderAccepted", () => {
                //         order.orderStatus = 'PaidOnSeller';
                //         setAcceptanceOrderId(undefined);
                //         console.log("Order accepted!");
                //       });
                // }
            }

            setAcceptanceOrderId(undefined);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error?.reason) {
                console.warn(error.reason);
                setTransactionError(error.reason as string);
            } else {
                console.warn(error);
                setTransactionError(error as string);
            }
        } finally {
            setTxBeingSent(undefined);
        }
    };
    return (
        <div className='max-w-lg p-4 bg-gray-900 shadow-lg rounded-lg'>
            <h2 className='text-xl font-bold text-white mb-4'>Accepting form</h2>
            <form onSubmit={handleAcceptOrder} className='space-y-4'>
                <div>
                    <span className='text-gray-300 text-sm font-medium'>Order ID</span>
                    <span className='pl-2 text-gray-300 text-sm font-medium'>{orderId}</span>
                </div>

                <div className='flex items-center space-x-2'>
                    <label htmlFor='documentsCorrect' className='text-gray-300 text-sm font-medium'>
                        The cargo is not damaged
                    </label>
                    <input
                        id='cargoNotDamaged'
                        name='cargoNotDamaged'
                        type='checkbox'
                        className='w-5 h-5 bg-gray-800 text-blue-500 border border-gray-600 rounded focus:ring-2 focus:ring-blue-500'
                    />
                </div>

                <div>
                    <label className='block text-gray-300 text-sm font-medium'>
                        Resource weight on acceptance
                    </label>
                    <input
                        name='resourceWeight'
                        type='text'
                        placeholder='Resource Weight'
                        className='w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>

                <button
                    type='submit'
                    className='w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition'>
                    Make decision
                </button>
            </form>
        </div>
    );
};
