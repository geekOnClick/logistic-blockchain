import { timestampToDate } from '@/app/helpers'
import { TxsToOwner } from '@/app/types'
import React from 'react'

type SellerTxProps = {
    txsBeingSentToOwner: TxsToOwner
}

export const SellerTx: React.FC<SellerTxProps> = ({ txsBeingSentToOwner }) => {
    return (
      <tr className="border-b">
      <td className="py-2 px-4">{ timestampToDate(Number(txsBeingSentToOwner.timestamp)) }</td>
      <td className="py-2 px-4">{ txsBeingSentToOwner.hash }</td>
      <td className="py-2 px-4 text-green-600">+ { txsBeingSentToOwner.value } ETH</td>
    </tr>
    )
}
