import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployAccessMoreInfoContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer, owner1, owner2, owner3 } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // Ensure that all three owner accounts are defined
  if (!owner1 || !owner2 || !owner3) {
    throw new Error("Owner addresses (owner1, owner2, owner3) must be provided in the named accounts.");
  }

  await deploy("AccessMoreInfoContract", {
    from: deployer,
    // Contract constructor arguments: array of owner addresses
    args: [[owner1, owner2, owner3]],
    log: true,
    autoMine: true, // Speeds up deployment on local networks
  });

  // Get the deployed contract instance
  const contract = await hre.ethers.getContract<Contract>("AccessMoreInfoContract", deployer);
  console.log(`AccessMoreInfoContract deployed at ${contract.address}`);
};

export default deployAccessMoreInfoContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags AccessMoreInfoContract
deployAccessMoreInfoContract.tags = ["AccessMoreInfoContract"];