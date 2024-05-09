import Web3 from 'web3';
import MigrationsContract from './contracts/Migrations.json';

const getMigrationsInstance = async () => {
  const web3 = new Web3(window.ethereum);
  await window.ethereum.enable();

  const networkId = await web3.eth.net.getId();
  const deployedNetwork = MigrationsContract.networks[networkId];
  return new web3.eth.Contract(
    MigrationsContract.abi,
    deployedNetwork && deployedNetwork.address,
  );
};

export default getMigrationsInstance;
