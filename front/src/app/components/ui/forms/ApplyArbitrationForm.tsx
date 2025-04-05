import { CurrentConnectionProps, OrderProps } from '@/app/types';
import React from 'react'

type BayerRefundFormProps = {
    currentConnection: CurrentConnectionProps,
    setTxBeingSent: React.Dispatch<React.SetStateAction<string | undefined>>,
    setTransactionError: React.Dispatch<React.SetStateAction<string | undefined>>,
    orders: OrderProps[],
    setOrders: React.Dispatch<React.SetStateAction<OrderProps[]>>, 
    role: string
}

export const ApplyArbitrationForm: React.FC<BayerRefundFormProps> = ({currentConnection,orders, setOrders, role, setTxBeingSent,setTransactionError}) => {
      
    const handleRefundOrder = async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
  
          const formData = new FormData(event.currentTarget);
  
          const orderId = BigInt(Number(formData.get("orderId")));  
  
          if(!currentConnection?.contract || typeof orderId !== 'bigint') {
             return;
          }
  
          try {
              const order = orders.find(order => order.orderId === orderId);
              if(!order) {
                  throw new Error('Not correct order ID')
              };
  
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
          } catch(error: any) {
              if(error?.reason) {
                  console.warn(error.reason);
                  setTransactionError(error.reason as string);
              } else {
                  console.warn(error);
                  setTransactionError(error as string);
              }
          }finally {
              setTxBeingSent(undefined);
          }
      }
      return (
          <div className="max-w-lg p-4 bg-gray-900 shadow-lg rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">Apply for Arbitration</h2>
            <form onSubmit={handleRefundOrder} className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium">Order ID</label>
                <input
                  name="orderId"
                  type="text"
                  placeholder="Order ID"
                  className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
              >
                REFUND
              </button>
            </form>
          </div>
        );
}
