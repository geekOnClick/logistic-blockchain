import React from 'react'

type TransactionErrorMessageProps = {
    message: string,
    dismiss: React.MouseEventHandler<HTMLButtonElement>
}

export const TransactionErrorMessage: React.FC<TransactionErrorMessageProps> = ({message, dismiss}) => {
  return (
    <div>TransactionErrorMessage:
        {message}
        <button onClick={dismiss}><span aria-hidden="true">&times;</span></button>
    </div>
  )
}
