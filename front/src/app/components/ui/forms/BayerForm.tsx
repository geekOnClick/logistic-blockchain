import { CurrentConnectionProps, OrderProps } from '@/app/types';
import React from 'react'

type BayerFormProps = {
    currentConnection: CurrentConnectionProps,
    setTxBeingSent: React.Dispatch<React.SetStateAction<string | undefined>>,
    setTransactionError: React.Dispatch<React.SetStateAction<string | undefined>>,
    orders: OrderProps[],
}

export const BayerForm: React.FC<BayerFormProps> = ({currentConnection,orders,setTxBeingSent,setTransactionError}) => {

    const handlePayOrder = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const orderId = BigInt(Number(formData.get("orderId")));
        const resourcePrice = BigInt(Number(formData.get("resourcePrice")));

        if(!currentConnection?.contract) {
           return;
        }

        const order = orders.find(order => order.orderId === orderId);
        if(!order) {
            setTransactionError('Not correct order ID')
            return;
        };

        try {
            const buyTx = await currentConnection.contract.buy(orderId, {value: resourcePrice});
            setTxBeingSent(buyTx.hash);
            await buyTx.wait();

            order.logisticStatus = 'Transit';
            order.orderStatus = 'PaidOnContract';

        } catch(error) {
            console.error(error);
            setTransactionError(error as string);
        }finally {
            setTxBeingSent(undefined);
        }
    }
    return (
        <div className="max-w-lg p-4 bg-gray-900 shadow-lg rounded-lg">
          <h2 className="text-xl font-bold text-white mb-4">Pay an Order</h2>
          <form onSubmit={handlePayOrder} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium">Order ID</label>
              <input
                name="orderId"
                type="text"
                placeholder="Resource ID"
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
    
            <div>
              <label className="block text-gray-300 text-sm font-medium">Amount</label>
              <input
                name="resourcePrice"
                type="text"
                placeholder="Resource Title"
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
    
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
            >
              PAY
            </button>
          </form>
        </div>
      );
}