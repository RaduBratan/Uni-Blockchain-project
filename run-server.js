const shell = require('shelljs');
const path = require('path');

const serverDir = path.join(__dirname, 'server');
const buildDir = path.join(serverDir, 'build/contracts');

// sterge continutul din server/build/contracts
shell.rm('-rf', buildDir);
console.log('The contents of server/build/contracts have been deleted.');

// seteaza directorul curent de lucru la folderul /server
const options = { cwd: serverDir };

// compileaza contractele
shell.exec('truffle compile', options);

// migreaza contractele
shell.exec('truffle migrate --reset', options);

// testeaza contractele
shell.exec('truffle test', options);