import { ethers } from 'ethers';

export type OrderProps = {
  orderId: ethers.BigNumberish;
  resourceId: ethers.BigNumberish;
  resourceTitle: string;
  resourceWeight: ethers.BigNumberish;
  resourcePrice: ethers.BigNumberish;
  orderedAt: ethers.BigNumberish;
  orderStatus: string;
  logisticStatus: string;
  isArbitrating: boolean;
  arbitratingBy: string;
  numberOfVotes: ethers.BigNumberish;
  arbitrationWinner: string;
};
