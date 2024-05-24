const shell = require('shelljs');
const fs = require('fs-extra');
const path = require('path');

const clientDir = path.join(__dirname, 'client');
const buildDir = path.join(__dirname, 'server/build/contracts');
const contractsDestDir = path.join(__dirname, 'client/src/contracts');

// copiaza contractele compilate in folderul client
fs.copySync(buildDir, contractsDestDir);
console.log('The contracts have been copied to the client folder.');

// seteaza directorul curent de lucru la folderul /client
const options = { cwd: clientDir };

// porneste aplicatia
shell.exec('npm start', options);