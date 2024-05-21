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
   - lipsește `pure`
   - lipsește `payable`
5. exemple de transfer de eth:
   - lipsește
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
   - lipsește
4. implementarea de standarde ERC:
   - lipsește
5. utilizarea de Oracles:
   - lipsește
6. utilizarea altor platforme de stocare descentralizată (exemplu: IPFS):
   - lipsește

<br/>

### Partea 2: Interacțiunea cu blockchain-ul printr-o aplicație web3.
#### Cerințe obligatorii:
1. utilizarea unei librării web3 și conectarea cu un Web3 Provider pentru accesarea unor informații generale despre conturi (adresa, balance):
   - coming soon
2. inițierea tranzacțiilor de transfer sau de apel de funcții, utilizând clase din librăriile web3:
   - coming soon <br/>
#### Cerințe opționale:
1. tratarea de events (Observer Pattern):
   - coming soon
2. analiza gas-cost (estimare cost și fixare limită de cost):
   - coming soon
3. controlul stării tranzacțiilor (tratare excepții):
   - coming soon
