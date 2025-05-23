import { Logistic } from "@/typechain";
import { BrowserProvider } from "ethers";
import {ethers} from "ethers";

export type OrderProps = {
    orderId: ethers.BigNumberish,
    resourceId: ethers.BigNumberish,
    resourceTitle: string,
    resourceWeight: ethers.BigNumberish,
    resourcePrice: ethers.BigNumberish,
    orderedAt: ethers.BigNumberish,
    orderStatus: string,
    logisticStatus: string
    isArbitrating: boolean,
    arbitratingBy: string,
    numberOfVotes: ethers.BigNumberish,
    arbitrationWinner: string
}
export type CurrentConnectionProps = {
    provider: BrowserProvider | undefined,
    contract: Logistic | undefined,
    signer: ethers.JsonRpcSigner | undefined,
}
export type TxsToOwner = {
    orderId: ethers.BigNumberish,
    timestamp: ethers.BigNumberish,
    value: ethers.BigNumberish
}