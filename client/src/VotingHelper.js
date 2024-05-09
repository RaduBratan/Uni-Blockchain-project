import Web3 from 'web3';
import VotingHelperContract from './contracts/VotingHelper.json';

const getVotingHelperInstance = async () => {
  const web3 = new Web3(window.ethereum);
  await window.ethereum.enable();

  const networkId = await web3.eth.net.getId();
  const deployedNetwork = VotingHelperContract.networks[networkId];
  return new web3.eth.Contract(
    VotingHelperContract.abi,
    deployedNetwork && deployedNetwork.address,
  );
};

export default getVotingHelperInstance;
