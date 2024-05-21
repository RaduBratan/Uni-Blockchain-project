import Web3 from 'web3';
import VotingSystemContract from './contracts/VotingSystem.json';

const getVotingSystemInstance = async (web3) => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = VotingSystemContract.networks[networkId];

  if (!deployedNetwork) {
    throw new Error(`VotingSystem contract not deployed on network with ID ${networkId}`);
  }

  const instance = new web3.eth.Contract(
    VotingSystemContract.abi,
    deployedNetwork && deployedNetwork.address,
  );

  return instance;
};

export default getVotingSystemInstance;
