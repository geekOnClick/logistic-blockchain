import React from "react";

type WaitingForTransactionMessageProps = {
    txHash: string
}

export const WaitinfForTransactionMessage: React.FC<WaitingForTransactionMessageProps> = ({ txHash }) => {
    return (
        <div>
            <p>Waiting for transaction ${txHash}...</p>
        </div>
    )
}