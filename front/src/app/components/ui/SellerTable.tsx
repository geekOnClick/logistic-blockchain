import { TxsToOwner } from '@/app/types'
import React from 'react'
import { SellerTx } from './SellerTx'

type SellerTableProps = {
    txsBeingSentToOwner: TxsToOwner[],
}

export const SellerTable: React.FC<SellerTableProps> = ({txsBeingSentToOwner}) => {
    
    return (
      <div className="mt-4 overflow-x-auto">
        <p>New cash receipts:</p>
        <table className="mt-4 min-w-full border border-gray-600 text-white text-sm">
          <thead>
            <tr className="bg-gray-800 border-b border-gray-600">
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Order id</th>
              <th className="py-2 px-4 text-left">Value</th>  
            </tr>
          </thead>
        <tbody>
          {txsBeingSentToOwner.map(tx => {
              return <SellerTx key={tx.orderId} txsBeingSentToOwner={tx} />
          })}
        </tbody>
      </table>
    </div>
    )
}
