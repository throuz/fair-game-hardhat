const main = async () => {
  const contractFactory = await ethers.getContractFactory("FairGame");
  const contract = await contractFactory.deploy();
  await contract.deployed();
  console.log(`FairGame deployed to ${contract.address}`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
