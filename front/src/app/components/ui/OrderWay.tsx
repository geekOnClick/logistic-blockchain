import { OrderProps } from '@/app/types';
import React from 'react';

type OrderWayProps = {
    order: OrderProps
}

export const OrderWay: React.FC<OrderWayProps> = ({order}) => {
    return (
        <div>
            <h2 className='flex justify-center text-3xl'>Order #{order.orderId} status</h2>
            <p className='flex justify-center text-lg mb-4 underline'>{order.logisticStatus}</p>
            <div className='flex flex-col'>
                <div className='flex flex-col justify-center items-center mb-4'>
                    <p className='mb-3 text-base'>Creating order</p>
                    <span className='relative flex size-3 mb-4'>
                        {order.logisticStatus === 'Created' && <span className={`absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75`}></span>}
                        <span className='relative inline-flex size-3 rounded-full bg-sky-500'></span>
                    </span>
                    <div className='w-[1px] h-15 bg-amber-50'></div>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <p className='mb-3 text-base'>Delivery</p>
                    <span className='relative flex size-3 mb-4'>
                        {/* <span className='rounded-full w-3 h-3 bg-green-800 mb-4'></span> */}
                        {(order.logisticStatus === 'Transit' || order.logisticStatus === 'Cancelled') && <span className={`absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75`}></span>}
                        <span className='relative inline-flex size-3 rounded-full bg-sky-500'></span>
                    </span>
                    <div className='w-[1px] h-15 bg-amber-50 mb-4'></div>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <p className='mb-3 text-base'>Inspection</p>
                    <span className='relative flex size-3 mb-4'>
                        {/* <span className='rounded-full w-3 h-3 bg-green-800 mb-4'></span> */}
                        {order.logisticStatus === 'Control' && <span className={`absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75`}></span>}
                        <span className='relative inline-flex size-3 rounded-full bg-sky-500'></span>
                    </span>
                    <div className='w-[1px] h-15 bg-amber-50 mb-4'></div>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <p className='mb-3 text-base'>Delivery</p>
                    <span className='relative flex size-3 mb-4'>
                        {/* <span className='rounded-full w-3 h-3 bg-green-800 mb-4'></span> */}
                        {order.logisticStatus === 'TransitAfterControll' && <span className={`absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75`}></span>}
                        <span className='relative inline-flex size-3 rounded-full bg-sky-500'></span>
                    </span>
                    <div className='w-[1px] h-15 bg-amber-50 mb-4'></div>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <p className='mb-3 text-base'>Acceptance</p>
                    <span className='relative flex size-3 mb-4'>
                        {/* <span className='rounded-full w-3 h-3 bg-green-800 mb-4'></span> */}
                        {order.logisticStatus === 'Delivired' && <span className={`absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75`}></span>}
                        <span className='relative inline-flex size-3 rounded-full bg-sky-500'></span>
                    </span>
                    <div className='w-[1px] h-15 bg-amber-50 mb-4'></div>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <p className='mb-3 text-base'>Order closed</p>
                    <span className='relative flex size-3 mb-4'>
                        {/* <span className='rounded-full w-3 h-3 bg-green-800 mb-4'></span> */}
                        {order.logisticStatus === 'Accepted' && <span className={`absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75`}></span>}
                        <span className='relative inline-flex size-3 rounded-full bg-sky-500'></span>
                    </span>
                </div>
            </div>
        </div>
    );
};
