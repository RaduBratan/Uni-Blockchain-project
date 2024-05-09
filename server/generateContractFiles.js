const fs = require('fs');
const path = require('path');

const contractsBuildDirectory = path.join(__dirname, 'build/contracts');
const contractsOutputDirectory = path.join(__dirname, '../client/src');

// Ensure the output directory exists
if (!fs.existsSync(contractsOutputDirectory)) {
  fs.mkdirSync(contractsOutputDirectory, { recursive: true });
}

// Read all contract JSON files from Truffle build
fs.readdirSync(contractsBuildDirectory).forEach(file => {
  if (path.extname(file) === '.json') {
    const contractJson = require(path.join(contractsBuildDirectory, file));
    const contractName = path.basename(file, '.json');

    // Extract ABI and address
    const abi = contractJson.abi;
    const networkId = Object.keys(contractJson.networks)[0]; // Assuming you want the first network
    const address = contractJson.networks[networkId].address;

    // Prepare content to write
    const content = `import getWeb3 from './getWeb3';\n\n` +
      `const address = '${address}';\n` +
      `const abi = ${JSON.stringify(abi, null, 2)};\n\n` +
      `let contractInstance = null;\n\n` +
      `const getContractInstance = async () => {\n` +
      `  if (!contractInstance) {\n` +
      `    const web3 = await getWeb3();\n` +
      `    contractInstance = new web3.eth.Contract(abi, address);\n` +
      `  }\n` +
      `  return contractInstance;\n` +
      `};\n\n` +
      `export default getContractInstance;\n`;

    // Write to file in the React app's src/contracts directory
    fs.writeFileSync(path.join(contractsOutputDirectory, `${contractName}.js`), content);
    console.log(`Contract file generated for ${contractName}`);
  }
});