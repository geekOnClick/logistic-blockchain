import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
        evmVersion: "byzantium",
        optimizer: {
            enabled: true,
            runs: 200
        },
      },
  },
  typechain: {
    outDir: "./front/src/typechain",  // указываем директорию для типов
  },
  networks: {
    hardhat: {
      chainId: 1337,
      initialBaseFeePerGas: 0
    }
  }
};

export default config;
