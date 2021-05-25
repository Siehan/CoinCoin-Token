async function main() {
  const CoinCoin = await ethers.getContractFactory("CoinCoin");
  const coincoin = await CoinCoin.deploy();

  await coincoin.deployed();
  console.log("CoinCoin address:", coincoin.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
