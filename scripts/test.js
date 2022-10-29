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
  console.log(
    "Contract balance:",
    ethers.utils.formatEther(await ethers.provider.getBalance(contract.address))
  );
  await contract.deposit({ value: ethers.utils.parseEther("1000") });
  await contract.bet(ethers.utils.parseEther("1"));
  await contract.withdraw(ethers.utils.parseEther("10"));
  console.log(
    "Deployer balance (in contract):",
    ethers.utils.formatEther(await contract.users(deployer.address))
  );
  console.log(
    "Contract balance:",
    ethers.utils.formatEther(await ethers.provider.getBalance(contract.address))
  );
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
