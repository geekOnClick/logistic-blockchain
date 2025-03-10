import { CurrentConnectionProps, OrderProps } from '@/app/types';
import React, { FormEvent } from 'react'

type DeliveryOperatorFormProps = {
    currentConnection: CurrentConnectionProps,
    setTxBeingSent: React.Dispatch<React.SetStateAction<string | undefined>>,
    setTransactionError: React.Dispatch<React.SetStateAction<string | undefined>>,
    setOrders: React.Dispatch<React.SetStateAction<OrderProps[]>>,
}

export const DeliveryOperatorForm: React.FC<DeliveryOperatorFormProps> = ({currentConnection,setTransactionError,setTxBeingSent, setOrders}) => {

       const handleAddOrder = async (event: FormEvent<HTMLFormElement>) => {
         event.preventDefault();
         if(!currentConnection?.contract) {
            return;
         }

         const formData = new FormData(event.currentTarget);
         const contract = currentConnection.contract;


         const resourceId = formData.get("resourceId")?.toString();
         const resourceTitle = formData.get("resourceTitle")?.toString();
         const resourceWeight = formData.get("resourceWeight")?.toString();
         const resourcePrice = formData.get("resourcePrice")?.toString();

         if(resourceId && resourceTitle && resourceWeight && resourcePrice) {
            try {
                const orderId = await contract.currentOrderIndex();
                const orderedAt = await contract.orderAt();
                const orderStatus = await contract.orderStatus();
                const logisticStatus = await contract.logisticStatus();

                const addTx = await contract.addOrder(
                    BigInt(resourceId),
                    resourceTitle,
                    BigInt(resourceWeight),
                    BigInt(resourcePrice)
                )
                setTxBeingSent(addTx.hash);
                await addTx.wait();

                setOrders((orders) => [...orders, {
                    orderId,
                    resourceId,
                    resourceTitle,
                    resourceWeight,
                    resourcePrice,
                    orderedAt,
                    orderStatus,
                    logisticStatus
                }]);
            }catch(error) {
                console.error(error);
                setTransactionError(error as string);
            }finally {
                setTxBeingSent(undefined);
            }
         }
    }

    return (
        <div className="max-w-lg p-4 bg-gray-900 shadow-lg rounded-lg">
          <h2 className="text-xl font-bold text-white mb-4">Add Order</h2>
          <form onSubmit={handleAddOrder} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium">Resource ID</label>
              <input
                name="resourceId"
                type="text"
                placeholder="Resource ID"
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
    
            <div>
              <label className="block text-gray-300 text-sm font-medium">Resource Title</label>
              <input
                name="resourceTitle"
                type="text"
                placeholder="Resource Title"
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
    
            <div>
              <label className="block text-gray-300 text-sm font-medium">Resource Weight</label>
              <input
                name="resourceWeight"
                type="text"
                placeholder="Resource Weight"
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
    
            <div>
              <label className="block text-gray-300 text-sm font-medium">Resource Price</label>
              <input
                name="resourcePrice"
                type="text"
                placeholder="Resource Price"
                className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
    
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
            >
              ADD ORDER
            </button>
          </form>
        </div>
      );
}
