// const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    // ropsten: {
    //   provider: () =>
    //     new HDWalletProvider(
    //       process.env.MNEMONIC,
    //       `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`
    //     ),
    //   network_id: 3, // ID-ul retelei Ropsten
    //   gas: 5500000, // limita de gaz pentru tranzactii
    //   confirmations: 2, // Numarul de confirmari de bloc necesare inainte de a considera tranzactiile ca fiind finalizate
    //   timeoutBlocks: 200, // Numarul de blocuri inainte de a renunta la o tranzactie
    //   skipDryRun: true // sari peste simularea tranzactiilor inainte de desfasurarea efectiva
    // }
  },
  compilers: {
    solc: {
      version: "^0.8.0",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  },
  // plugins: ["truffle-plugin-verify"],
  // api_keys: {
  //   etherscan: process.env.ETHERSCAN_API_KEY
  // }
};