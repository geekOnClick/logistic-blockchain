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
}
export type CurrentConnectionProps = {
    provider: BrowserProvider | undefined,
    contract: Logistic | undefined,
    signer: ethers.JsonRpcSigner | undefined,
}