import Web3 from 'web3';
import VotingSystemContract from './contracts/VotingSystem.json';

const getVotingSystemInstance = async () => {
  const web3 = new Web3(window.ethereum);
  await window.ethereum.enable();

  const networkId = await web3.eth.net.getId();
  const deployedNetwork = VotingSystemContract.networks[networkId];
  return new web3.eth.Contract(
    VotingSystemContract.abi,
    deployedNetwork && deployedNetwork.address,
  );
};

export default getVotingSystemInstance;
