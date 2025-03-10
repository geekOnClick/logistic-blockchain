import { timestampToDate } from '@/app/helpers'
import { OrderProps } from '@/app/types'
import React from 'react'

type OrderRowProps = {
    order: OrderProps
}

export const Order: React.FC<OrderRowProps> = ({order}) => {
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
  </tr>
  )
}
