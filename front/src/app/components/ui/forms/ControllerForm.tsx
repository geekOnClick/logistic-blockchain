import { CurrentConnectionProps, OrderProps } from '@/app/types';
import { BigNumberish } from 'ethers';
import React from 'react';

type ContolllerFormProps = {
    currentConnection: CurrentConnectionProps;
    setTxBeingSent: React.Dispatch<React.SetStateAction<string | undefined>>;
    setTransactionError: React.Dispatch<React.SetStateAction<string | undefined>>;
    setControlledOrderId: React.Dispatch<React.SetStateAction<BigNumberish | undefined>>;
    orderId: BigNumberish;
    orders: OrderProps[];
    setOrders: React.Dispatch<React.SetStateAction<OrderProps[]>>;
};

export const ControllerForm: React.FC<ContolllerFormProps> = ({
    orderId,
    orders,
    setOrders,
    currentConnection,
    setControlledOrderId,
    setTransactionError,
    setTxBeingSent
}) => {
    const handleControlOrder = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);

            const documentsCorrect = formData.get('documentsCorrect');
            const noViolations = formData.get('noViolations');
            const order = orders.find((order) => order.orderId === orderId);
            if (!order) {
                setTransactionError('Not correct order ID');
                return;
            }
            if (!currentConnection?.contract) {
                return;
            }

            if (!documentsCorrect || !noViolations) {
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
                const controlTx = await currentConnection.contract.controllSuccess(orderId);
                setTxBeingSent(controlTx.hash);
                await controlTx.wait();

                setOrders((prevOrders) =>
                    prevOrders.map((prevOrder) => {
                        if (order.orderId === prevOrder.orderId) {
                            return {
                                ...prevOrder,
                                logisticStatus: 'TransitAfterControll'
                            };
                        }
                        return prevOrder;
                    })
                );
            }

            setControlledOrderId(undefined);
        } catch (error) {
            console.error(error);
            setTransactionError(error as string);
        } finally {
            setTxBeingSent(undefined);
        }
    };
    return (
        <div className='max-w-lg p-4 bg-gray-900 shadow-lg rounded-lg'>
            <h2 className='text-xl font-bold text-white mb-4'>Controlling form</h2>
            <form onSubmit={handleControlOrder} className='space-y-4'>
                <div>
                    <span className='text-gray-300 text-sm font-medium'>Order ID</span>
                    <span className='pl-2 text-gray-300 text-sm font-medium'>{orderId}</span>
                </div>

                <div className='flex items-center space-x-2'>
                    <label htmlFor='documentsCorrect' className='text-gray-300 text-sm font-medium'>
                        Documents correct
                    </label>
                    <input
                        id='documentsCorrect'
                        name='documentsCorrect'
                        type='checkbox'
                        className='w-5 h-5 bg-gray-800 text-blue-500 border border-gray-600 rounded focus:ring-2 focus:ring-blue-500'
                    />
                </div>

                <div className='flex items-center space-x-2'>
                    <label htmlFor='documentsCorrect' className='text-gray-300 text-sm font-medium'>
                        No violations of cargo transportation
                    </label>
                    <input
                        id='noViolations'
                        name='noViolations'
                        type='checkbox'
                        className='w-5 h-5 bg-gray-800 text-blue-500 border border-gray-600 rounded focus:ring-2 focus:ring-blue-500'
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
