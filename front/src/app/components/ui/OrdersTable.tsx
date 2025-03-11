import { OrderProps } from '@/app/types'
import React from 'react'
import { Order } from './Order'
import { BigNumberish } from 'ethers'

type OrderTableProps = {
    orders: OrderProps[],
    role: string,
    handleOrder: (orderId: BigNumberish) => Promise<void>
}

export const OrdersTable: React.FC<OrderTableProps> = ({orders, role, handleOrder}) => {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full border border-gray-600 text-white text-sm">
        <thead>
          <tr className="bg-gray-800 border-b border-gray-600">
            <th className="py-2 px-4 text-left">Order ID</th>
            <th className="py-2 px-4 text-left">Resource ID</th>
            <th className="py-2 px-4 text-left">Resource Title</th>
            <th className="py-2 px-4 text-left">Resource Weight</th>
            <th className="py-2 px-4 text-left">Resource Price</th>
            <th className="py-2 px-4 text-left">Ordered At</th>
            <th className="py-2 px-4 text-left">Order Status</th>
            <th className="py-2 px-4 text-left">Logistic Status</th>
            {(role === 'controller' || role === 'acceptanceOperator') && <th className="py-2 px-4 text-left">Actions</th>}
          </tr>
        </thead>
      <tbody>
        {orders.map(order => {
            return <Order key={order.orderId} order={order} role={role} handleOrder={handleOrder} />
        })}
      </tbody>
    </table>
  </div>
  )
}
