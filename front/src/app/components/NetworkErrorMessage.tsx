import React from 'react'

type NetworkErrorMessageProps = {
    message: string,
    dismiss: React.MouseEventHandler<HTMLButtonElement>
}

export const NetworkErrorMessage: React.FC<NetworkErrorMessageProps> = ({message, dismiss}) => {
    return (
        <div className="fixed top-4 right-4 bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg animate-slide-in flex items-center justify-between w-80">
          <p className="text-sm font-medium">{message}</p>
          <button onClick={dismiss} className="text-white text-lg font-bold ml-4 focus:outline-none">
            &times;
          </button>
        </div>
      );
}
