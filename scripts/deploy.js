const main = async () => {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer address:", deployer.address);
  console.log(
    "Deployer balance:",
    ethers.utils.formatEther(await deployer.getBalance())
  );
  const contractFactory = await ethers.getContractFactory("FairGame");
  const contract = await contractFactory.deploy();
  await contract.deployed();
  console.log("Contract address:", contract.address);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
