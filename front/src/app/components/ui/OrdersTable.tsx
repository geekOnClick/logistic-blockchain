import { OrderProps } from '@/app/types'
import React from 'react'
import { Order } from './Order'

type OrderTableProps = {
    orders: OrderProps[]
}

export const OrdersTable: React.FC<OrderTableProps> = ({orders}) => {
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
          </tr>
        </thead>
      <tbody>
        {orders.map(order => {
            return <Order key={order.orderId} order={order} />
        })}
      </tbody>
    </table>
  </div>
  )
}
