const hre = require("hardhat");

async function main() {
  const dnsContract = await hre.ethers.getContractFactory("DNS");
  const dns = await dnsContract.deploy();

  await dns.deployed();

  console.log("DNS deployed to:", dns.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
