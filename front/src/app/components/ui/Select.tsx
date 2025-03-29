import { OrderProps } from '@/app/types';
import React from 'react';

type SelectProps = {
    orders: OrderProps[];
    selectedOrder: OrderProps | undefined;
    setSelectedOrder: React.Dispatch<React.SetStateAction<OrderProps | undefined>>;
};

export const Select: React.FC<SelectProps> = ({ orders, setSelectedOrder }) => {
    return (
        <>
            <div>Choose order id</div>
            <select
                onChange={(e) => {
                    setSelectedOrder(orders.find((order) => String(order.orderId) === String(e.target.value)));
                }}
                className='border bg-gray-500 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                <option value='' hidden>
                    Select order
                </option>
                {orders.map((order) => {
                    return (
                        <option key={order.orderId} value={String(order.orderId)}>
                            {order.orderId}
                        </option>
                    );
                })}
            </select>
        </>
    );
};
