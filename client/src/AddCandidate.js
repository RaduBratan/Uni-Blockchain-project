import React, { useState } from 'react';

function AddCandidate({ contract }) {
  const [name, setName] = useState('');

  const addCandidate = async () => {
    await contract.addCandidate(name);
  };

  return (
    <div>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <button onClick={addCandidate}>Add Candidate</button>
    </div>
  );
}

export default AddCandidate;