import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Candidate from './Candidate';
import AddCandidate from './AddCandidate';
import './App.css';

const contractAddress = "YOUR_CONTRACT_ADDRESS";
const abi = [
  // ABI of your contract
];

function App() {
  const [candidates, setCandidates] = useState([]);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      setContract(contract);

      const count = await contract.candidatesCount();
      const candidates = [];
      for (let i = 1; i <= count; i++) {
        const candidate = await contract.candidates(i);
        candidates.push({
          id: candidate.id.toNumber(),
          name: candidate.name,
          voteCount: candidate.voteCount.toNumber(),
        });
      }
      setCandidates(candidates);
    };

    init();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Voting System</h1>
        {candidates.map(candidate => (
          <Candidate key={candidate.id} candidate={candidate} contract={contract} />
        ))}
        <AddCandidate contract={contract} />
      </header>
    </div>
  );
}

export default App;