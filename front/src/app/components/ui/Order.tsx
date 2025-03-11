import { timestampToDate } from '@/app/helpers'
import { OrderProps } from '@/app/types'
import { BigNumberish } from 'ethers'
import React from 'react'

type OrderRowProps = {
    order: OrderProps,
    role: string,
    handleOrder: (orderId: BigNumberish) => Promise<void>
}

export const Order: React.FC<OrderRowProps> = ({order, role, handleOrder}) => {
  return (
    <tr className="border-b">
    <td className="py-2 px-4">{ order.orderId }</td>
    <td className="py-2 px-4">{ order.resourceId }</td>
    <td className="py-2 px-4">{ order.resourceTitle.toString() }</td>
    <td className="py-2 px-4">{ order.resourceWeight }</td>
    <td className="py-2 px-4">{ order.resourcePrice }</td>
    <td className="py-2 px-4">{ timestampToDate(Number(order.orderedAt)) }</td>
    <td className="py-2 px-4">{ order.orderStatus }</td>
    <td className="py-2 px-4">{ order.logisticStatus }</td>
    {(role === 'controller' || role === 'acceptanceOperator') && (
        <td className="py-2 px-4">
            <button
              onClick={() => handleOrder(order.orderId)}
              className="w-full py-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
            >
              {role === 'controller' ? 'Take on controll' : 'Goods delivered'}
            </button>
        </td>
    )}
  </tr>
  )
}
