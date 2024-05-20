import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from './AppContext';
import getWeb3 from './getWeb3';
import getVotingSystemInstance from './getVotingSystemInstance';
import VotingSystem from './contracts/VotingSystem.json';

const VotingComponent = () => {
  const { account } = useContext(AppContext);
  const [candidates, setCandidates] = useState([]);
  const [newCandidateName, setNewCandidateName] = useState('');
  const [votingSystem, setVotingSystem] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState('');
  
  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        setWeb3(web3);
        console.log('Web3 initialized.');

        const networkId = await web3.eth.net.getId();
        const deployedNetwork = VotingSystem.networks[networkId];
        console.log('Network ID:', networkId);
        if (!deployedNetwork) {
          throw new Error("VotingSystem contract not found on the current network.");
        }

        const instance = new web3.eth.Contract(
          VotingSystem.abi,
          deployedNetwork.address,
        );

        setVotingSystem(instance);
        console.log('Contract instance created:', instance);
        if (instance) {
          loadCandidates(instance); // Load candidates once the contract is ready
        }
      } catch (error) {
        alert('Failed to load web3, accounts, or contract. Check console for details.');
        console.error('Error:', error);
      }
    };

    init();
    
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

  const addCandidate = async (name) => {
    if (!votingSystem || !account) {
      console.error('Contract instance or account not available.');
      return;
    }

    try {
      await votingSystem.methods.addCandidate(name).send({
        from: account,
        gasLimit: web3.utils.toHex(2100000), // Adjust based on your contract's needs
        gasPrice: web3.utils.toHex(web3.utils.toWei('0.00001', 'gwei')) // Set a very low gas price
      });    
      console.log('Candidate added successfully!');
      setNewCandidateName(''); // Clear the candidate input field after successful addition
      loadCandidates(votingSystem); // Reload candidates to show the newly added candidate
    } catch (error) {
      console.error('Add candidate error:', error);
    }
  };

  const vote = async (candidateId) => {
    if (!votingSystem || !account) {
      console.error('Contract instance or account not available.');
      return;
    }
  
    try {
      await votingSystem.methods.vote(candidateId).send({
        from: account,
        gasLimit: web3.utils.toHex(300000), // Adjust the gas limit as needed
        gasPrice: web3.utils.toHex(web3.utils.toWei('0.00001', 'gwei')) // Adjust the gas price as needed
      });
      console.log('Vote cast successfully!');
      loadCandidates(votingSystem); // Reload candidates to refresh any state change
    } catch (error) {
      console.error('Voting error:', error);
    }
  };
  

  return (
    <div>
      <h1>Candidates List</h1>
      <select value={selectedCandidateId} onChange={e => setSelectedCandidateId(e.target.value)}>
        {candidates.map(candidate => (
           <option key={candidate.id} value={candidate.id}>
             {candidate.name}
           </option>
         ))}
      </select>
      <button onClick={() => vote(selectedCandidateId)} disabled={!votingSystem}>Vote</button> {/* Vote button */}
      <h1>Add a New Candidate</h1>
      <input 
        type="text"
        value={newCandidateName}
        onChange={e => setNewCandidateName(e.target.value)}
        placeholder="Candidate Name"
      />
      <button onClick={() => addCandidate(newCandidateName)} disabled={!votingSystem}>Add Candidate</button>
    </div>
  );
};

export default VotingComponent;
