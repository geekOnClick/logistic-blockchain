import { ethers } from 'ethers';

export type TxsToOwner = {
  orderId: ethers.BigNumberish;
  timestamp: ethers.BigNumberish;
  value: ethers.BigNumberish;
};
