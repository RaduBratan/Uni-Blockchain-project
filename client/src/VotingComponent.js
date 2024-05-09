import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import getVotingSystemInstance from './VotingSystem';

const VotingComponent = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState('');
  const [account, setAccount] = useState(null);
  const [votingSystem, setVotingSystem] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (typeof window.ethereum === 'undefined') {
        alert('Please install MetaMask to use this application.');
        return;
      }

      try {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);

        const votingSystemInstance = await getVotingSystemInstance();
        setVotingSystem(votingSystemInstance);

        loadCandidates(votingSystemInstance);
      } catch (error) {
        alert('Failed to load web3, accounts, or contract. Check console for details.');
        console.error(error);
      }
    };

    init();

    window.ethereum.on('accountsChanged', function(accounts) {
      setAccount(accounts[0]);
    });
  }, []);

  const loadCandidates = async (votingSystemInstance) => {
    const candidatesCount = await votingSystemInstance.methods.candidatesCount().call();
    const candidates = [];
    for (let i = 1; i <= candidatesCount; i++) {
      const candidate = await votingSystemInstance.methods.candidates(i).call();
      candidates.push({
        id: candidate.id.toString(),
        name: candidate.name
      });
    }
    setCandidates(candidates);
    if (candidates.length > 0) {
      setSelectedCandidateId(candidates[0].id);
    }
  };

  const vote = async () => {
    try {
      await votingSystem.methods.vote(selectedCandidateId).send({ from: account });
      alert('Vote cast successfully!');
    } catch (error) {
      alert('Failed to cast vote.');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Vote for Your Candidate</h1>
      <select value={selectedCandidateId} onChange={e => setSelectedCandidateId(e.target.value)}>
        {candidates.map(candidate => (
          <option key={candidate.id} value={candidate.id}>
            {candidate.name}
          </option>
        ))}
      </select>
      <button onClick={vote}>Vote</button>
    </div>
  );
};

export default VotingComponent;