import React from "react";

type WaitingForTransactionMessageProps = {
    txHash: string
}

export const WaitinfForTransactionMessage: React.FC<WaitingForTransactionMessageProps> = ({ txHash }) => {
    return (
        <div className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg animate-slide-in">
            <p className="text-sm font-medium">Waiting for transaction <span className="font-bold">{txHash}</span>...</p>
        </div>
    );
}