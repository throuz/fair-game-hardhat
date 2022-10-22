const main = async () => {
  const FairGameFactory = await ethers.getContractFactory("FairGame");
  const FairGameContract = await FairGameFactory.deploy();
  await FairGameContract.deployed();
  console.log(`FairGame deployed to ${FairGameContract.address}`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
