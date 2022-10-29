require("@nomicfoundation/hardhat-toolbox");

const { privateKey, bscscanApiKey } = require("./secrets.json");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  etherscan: {
    apiKey: bscscanApiKey,
  },
  networks: {
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [privateKey],
    },
    mainnet: {
      url: "https://bsc-dataseed1.binance.org",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: [privateKey],
    },
  },
};
