require("@nomicfoundation/hardhat-toolbox");

const ALCHEMY_API_KEY = "Q623AMOHOjiyMd1Um8w2OViYR2MgwOeK";

const GOERLI_PRIVATE_KEY =
  "e67f6c1d4973551eaa6983978c5a6741804e7c698d30eb09d83dce8e08345bd7";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  etherscan: {
    apiKey: "8UE67KHMEZDBM4KC6PEBV3CAH1YIN4ABEB",
  },
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY],
    },
  },
};
