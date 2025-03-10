// const path = require("path");

import { ethers } from "hardhat";

async function main() {
    console.log('DEPLOYING...');

    const [owner, bayer, deliveryOperator, controller, acceptanceOperator] = await ethers.getSigners();

    const Logistic = await ethers.getContractFactory("Logistic");
    const shop = await Logistic.deploy(
        owner.address, 
        bayer.address,
        deliveryOperator.address,
        controller.address,
        acceptanceOperator.address 
    );
    await shop.waitForDeployment();

    console.log('CONTRACT DEPLOYED.');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
