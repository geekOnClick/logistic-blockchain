import React, { useEffect } from 'react';
import { CurrentConnectionProps, OrderProps } from '../types';

type ArbitrationProcessProps = {
    orders: OrderProps[];
    order: OrderProps;
    role: string;
    currentConnection: CurrentConnectionProps | undefined;
    setTxBeingSent: (arg: string | undefined) => void;
    setTransactionError: (err: string) => void;
    setOrders: React.Dispatch<React.SetStateAction<OrderProps[]>>;
};

export const ArbitrationProcess: React.FC<ArbitrationProcessProps> = ({
    orders,
    order,
    role,
    currentConnection,
    setTxBeingSent,
    setTransactionError,
    setOrders
}) => {

    const isArbitrationBegan = order.isArbitrating;
    const isArbitrationFinished = !order.isArbitrating && Boolean(order.numberOfVotes);

    const isControllFailed =
    (role === 'Bayer' || role === 'Seller') &&
    order.logisticStatus === 'ControllFailed' &&
    !isArbitrationBegan
    && ! isArbitrationFinished

    const alreadyVoted = localStorage.getItem(`${role}-voted`);

    useEffect(() => {
        if (!order.isArbitrating && Boolean(order.numberOfVotes)) {
            localStorage.clear();
        }
    }, [order]);

    const beginArbitrationProcess = async (orderId: string) => {
        if (!currentConnection?.contract) {
            return;
        }
        const order = orders.find((order) => String(order.orderId) === String(orderId));
        if (!order) {
            setTransactionError('Not correct order ID');
            return;
        }

        try {
            const controlTx = await currentConnection.contract.beginArbitration(orderId, role);
            setTxBeingSent(controlTx.hash);
            await controlTx.wait();

            setOrders((prevOrders) =>
                prevOrders.map((prevOrder) => {
                    if (order.orderId === prevOrder.orderId) {
                        return {
                            ...prevOrder,
                            isArbitrating: true,
                            arbitratingBy: role
                        };
                    }
                    return prevOrder;
                })
            );
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

    const handleVote = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const orderId = order.orderId;
        try {
            const formData = new FormData(event.currentTarget);

            const votingFor = formData.get('votingFor');
            const order = orders.find((order) => order.orderId === orderId);
            if (!order) {
                setTransactionError('Not correct order ID');
                return;
            }
            if (!currentConnection?.contract) {
                return;
            }

            const controlTx = await currentConnection.contract.vote(orderId, Boolean(votingFor));
            setTxBeingSent(controlTx.hash);
            await controlTx.wait();

            order.numberOfVotes =  Number(order.numberOfVotes) + 1;
            localStorage.setItem(`${role}-voted`, 'true');

            if(order.numberOfVotes === 5) {
                const newOrders = (await currentConnection?.contract?.allOrders()).map((order) => {
                    return {
                        orderId: order.orderId,
                        resourceId: order.resourceId,
                        resourceTitle: order.resourceTitle,
                        resourceWeight: order.resourceWeight,
                        resourcePrice: order.resourcePrice,
                        orderedAt: order.orderedAt,
                        orderStatus: order.orderStatus,
                        logisticStatus: order.logisticStatus,
                        isArbitrating: order.isArbitrating,
                        arbitratingBy: order.arbitratingBy,
                        numberOfVotes: order.numberOfVotes,
                        arbitrationWinner: order.arbitrationWinner
                    };
                });
                setOrders(() => [...newOrders]);
            }
        } catch (error) {
            console.error(error);
            setTransactionError(error as string);
        } finally {
            setTxBeingSent(undefined);
        }
    };

    return (
        <>
            {isControllFailed && (
                <div className='mb-4 p-4 bg-red-400 shadow-lg rounded-lg'>
                    <p className='mb-3 text-base'>
                        Order was declined by controlling operator. You can start arbitration
                        process
                    </p>
                    <button
                        type='button'
                        onClick={() => beginArbitrationProcess(String(order.orderId))}
                        className='w-full py-2 bg-blue-600 hover:bg-blue-700 text-black font-bold rounded-lg transition'>
                        Start arbitration
                    </button>
                </div>
            )}
            {isArbitrationBegan && !alreadyVoted && (
                <div className='mb-4 p-4 bg-yellow-400 shadow-lg rounded-lg'>
                    <form onSubmit={handleVote} className='space-y-4'>
                        <p className='mb-3 text-gray-800'>
                            Arbitration process has began. Please, make your vote.
                        </p>
                        <div className='flex items-center space-x-2'>
                            <label
                                htmlFor='documentsCorrect'
                                className='text-gray-800 text-sm font-medium'>
                                Refund to arbitration initiator
                            </label>
                            <input
                                id='votingFor'
                                name='votingFor'
                                type='checkbox'
                                className='w-5 h-5 bg-gray-800 text-blue-500 border border-gray-600 rounded focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                        <button
                            type='submit'
                            className='w-full py-2 bg-blue-600 hover:bg-blue-700 text-gray-800 font-bold rounded-lg transition'>
                            Vote
                        </button>
                    </form>
                </div>
            )}
            {alreadyVoted && (
                <div className='mb-4 p-4 bg-yellow-400 shadow-lg rounded-lg'>
                    <p className='mb-3 text-gray-800'>You have already voted</p>
                </div>
            )}
            {isArbitrationFinished && (
                <div className='mb-4 p-4 bg-green-400 shadow-lg rounded-lg'>
                    <p className='mb-3 text-gray-800 '>
                        Arbitration process has finished. The money were refunded to{' '}
                        {order.arbitrationWinner}.
                    </p>
                </div>
            )}
        </>
    );
};
