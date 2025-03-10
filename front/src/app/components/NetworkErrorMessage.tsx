import React from 'react'

type NetworkErrorMessageProps = {
    message: string,
    dismiss: React.MouseEventHandler<HTMLButtonElement>
}

export const NetworkErrorMessage: React.FC<NetworkErrorMessageProps> = ({message, dismiss}) => {
  return (
    <div>TransactionErrorMessage:
        {message}
        <button onClick={dismiss}><span aria-hidden="true">&times;</span></button>
    </div>
  )
}
