import { BrowserProvider, ethers } from 'ethers';
import { Logistic } from '../../typechain';

export type CurrentConnectionProps = {
  provider: BrowserProvider | undefined;
  contract: Logistic | undefined;
  signer: ethers.JsonRpcSigner | undefined;
};
