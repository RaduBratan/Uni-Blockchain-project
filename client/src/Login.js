import React, { useContext } from 'react';
import { AppContext } from './AppContext';

const Login = () => {
  const { account, setAccount } = useContext(AppContext);

  const handleLogin = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        // set the account in global state
        setAccount(account);
      } catch (error) {
        alert('Failed to load accounts. Make sure MetaMask is installed and unlocked.');
        console.error('Login error:', error);
      }
    } else {
      alert('Please install MetaMask to interact with this app.');
    }
  };

  // only show login button if there is no account
  if (account) return null;

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login with MetaMask</button>
    </div>
  );
};

export default Login;
