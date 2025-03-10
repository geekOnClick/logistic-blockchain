import React from 'react'
import { NetworkErrorMessage } from './NetworkErrorMessage'

type ConnectWalletProps = {
    networkError: string | undefined
    connectWallet: React.MouseEventHandler<HTMLButtonElement>
    dismiss: React.MouseEventHandler<HTMLButtonElement>
}

export const ConnectWallet: React.FC<ConnectWalletProps> = ({ networkError, connectWallet, dismiss }) => {
  return (
    <>
    <div>
        {
            networkError && <NetworkErrorMessage message={networkError} dismiss={dismiss}/>
        }
        <p>
            Please connect your account...
        </p>
        <button 
            className="w-full my-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"  
            onClick={connectWallet}>
                Connect
        </button>
    </div>
    </>
  )
}