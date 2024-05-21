This is a project we created for our Blockchain class at UniBuc FMI.

## Project setup
1. download the Metamask extension for your browser of choice
2. run `npm install` in the root folder, the /server folder and the /client folder
3. go back to the root folder

## Running the project
1. in a new terminal, run `npm run g`
2. in a new terminal, run `npm run s`
3. in a new terminal, run `npm run c`
4. copy any private key from the terminal with ganache-cli
5. open your Metamask extension
6. click the accounts dropodown at the top
7. click on "Add account or hardware wallet"
8. click on "Import account"
9. paste that key in the "Enter your private key string here:" field
10. for any action (login, add candidate, vote, etc), connect or authorize the action with Metamask whenever the popup appears

## Extras
To retrieve the donations made towards the VotingSystem and transfer them in one of the ganache-cli generated accounts, do the following:
1. in the same terminal as the one with the server, type `cd server`
2. run `truffle console --network development`
3. run `let contract = await VotingSystem.deployed()`
4. run `await contract.withdrawFunds({from: accounts[0]})` to transfer the accumulated funds to the first account from ganache-cli
5. optionally, run `let balance = await web3.eth.getBalance(accounts[0])`
6. if you followed 5, also run `console.log(web3.utils.fromWei(balance, 'ether'))` to check that, indeed, VotingSystem has 0 funds (although you can also connect to the ganache-cli account using Metamask to check if the funds were transferred successfully)

## Implementarea cerințelor
### Partea 1: Implementarea smart-contractelor.
#### Cerințe obligatorii:
1. utilizarea tipurilor de date specifice Solidity (mappings, address):
   - am utilizat `mapping` pentru a stoca candidații și votanții
   - tipul `address` este folosit pentru a identifica proprietarul contractului și pentru a verifica drepturile de acces
2. înregistrarea de events:
   - am definit evenimentele `NewCandidate` și `Voted`, care sunt emise când un candidat este adăugat și când un vot este înregistrat
3. utilizarea de modifiers:
   - am creat modifier-ele `onlyOwner` și `restricted` pentru a restricționa accesul la funcțiile critice ale contractului
4. exemple pentru toate tipurile de funcții (external, pure, view, etc):
   - funcția `vote` este `external`
   - funcția `getCandidate` este `view`
   - funcția `areNamesEqual` este `pure`
   - funcția `donate` este `payable`
5. exemple de transfer de eth:
   - `VotingSystem` poate să transfere toate fondurile adunate către proprietarul contractului
6. ilustrarea interacțiunii dintre smart contracte:
   - contractul `VotingHelper` interacționează cu `VotingSystem` pentru a obține numărul de voturi pentru un candidat
7. deploy pe o rețea locală sau pe o rețea de test Ethereum:
   - am configurat `truffle-config.js` pentru deploy pe rețeaua locală și pe Ropsten <br/>
#### Cerințe opționale:
1. utilizare librării:
   - lipsește
2. implementarea de teste (cu tool-uri la alegere):
   - am inclus teste în `test/voting-system.js`, care verifică funcționalitățile de bază ale contractului `VotingSystem`
3. utilizarea unor elemente avansate de OOP (interfețe, moștenire) pentru implementarea unor pattern-uri utilizate frecvent (exemple: Proxy Pattern, Withdrawal Pattern, Library Pattern, etc):
   - moștenirea se face prin clasa de bază `Ownable`, care este folosită pentru gestionarea proprietății contractului
   - interfața este folosită pentru acțiunile de bază ale sistemului de votare
   - librăria este folosită pentru verificarea egalității numelor
4. implementarea de standarde ERC:
   - lipsește
5. utilizarea de Oracles:
   - lipsește
6. utilizarea altor platforme de stocare descentralizată (exemplu: IPFS):
   - lipsește <br/>
### Partea 2: Interacțiunea cu blockchain-ul printr-o aplicație web3.
#### Cerințe obligatorii:
1. utilizarea unei librării web3 și conectarea cu un Web3 Provider pentru accesarea unor informații generale despre conturi (adresa, balance):
   - conectarea cu un Web3 Provider este realizată prin `window.ethereum` în `getWeb3.js`
2. inițierea tranzacțiilor de transfer sau de apel de funcții, utilizând clase din librăriile web3:
   - tranzacțiile sunt inițiate folosind metodele contractelor inteligente (`vote`, `addCandidate`, `donate`) prin intermediul instanței contractului creat cu `web3.eth.Contract` <br/>
#### Cerințe opționale:
1. tratarea de events (Observer Pattern):
   - coming soon
2. analiza gas-cost (estimare cost și fixare limită de cost):
   - codul fixează limite de gas pentru tranzacții (`gasLimit` și `gasPrice` sunt specificate)
   - nu există o funcționalitate pentru estimarea costurilor de gas înainte de a efectua tranzacțiile
3. controlul stării tranzacțiilor (tratare excepții):
   - excepțiile sunt tratate în blocurile `try-catch` pentru fiecare tranzacție, iar utilizatorul este informat prin alerte și mesaje de eroare în consolă în cazul în care tranzacțiile eșuează.
