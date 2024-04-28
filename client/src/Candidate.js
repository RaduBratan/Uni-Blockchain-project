import React from 'react';

function Candidate({ candidate, contract }) {
  const vote = async () => {
    await contract.vote(candidate.id);
  };

  return (
    <div>
      <p>{candidate.name} - Votes: {candidate.voteCount}</p>
      <button onClick={vote}>Vote</button>
    </div>
  );
}

export default Candidate;