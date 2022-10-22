const main = async () => {
  const contractFactory = await ethers.getContractFactory("FairGame");
  const contract = await contractFactory.deploy();
  await contract.deployed();
  console.log(`FairGame deployed to ${contract.address}`);

  await contract.deposit({ value: ethers.utils.parseEther("1000") });

  await contract.bet(ethers.utils.parseEther("1"));

  await contract.betByMartingale(1000, ethers.utils.parseEther("1"));

  await contract.betByAntiMartingale(1000, ethers.utils.parseEther("1"));

  await contract.withdraw(ethers.utils.parseEther("10"));

  const [owner] = await ethers.getSigners();
  const ownerBalanceInContract = await contract.users(owner.address);
  console.log(
    "Owner balance (in contract):",
    ethers.utils.formatEther(ownerBalanceInContract)
  );

  const contractBalance = await ethers.provider.getBalance(contract.address);
  console.log("Contract balance:", ethers.utils.formatEther(contractBalance));
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
