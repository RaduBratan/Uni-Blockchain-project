import Web3 from 'web3';

const getWeb3 = async () => {
  return new Promise(async (resolve, reject) => {
    // modern dapp browsers
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        // request account access if needed
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Web3 initialized.');
        resolve(web3);
      } catch (error) {
        console.error('User denied account access:', error);
        reject(error);
      }
    }
    // legacy dapp browsers
    else if (window.web3) {
      console.log('Using web3 detected from external source like older MetaMask / Mist');
      const web3 = new Web3(window.web3.currentProvider);
      resolve(web3);
    }
    // non-dapp browsers
    else {
      console.error('No Ethereum interface injected into browser.');
      reject('No Ethereum provider was found on this browser.');
    }
  });
};

export default getWeb3;
