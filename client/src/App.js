import React, { useContext } from 'react';
import { AppProvider, AppContext } from './AppContext';
import Login from './Login';
import VotingComponent from './VotingComponent';

const App = () => {
  return (
    <AppProvider>
      <Content />
    </AppProvider>
  );
};

const Content = () => {
  const { account } = useContext(AppContext);

  return (
    <div>
      {!account ? (
        <Login />
      ) : (
        <div>
          <h1>Welcome, {account}</h1>
          <VotingComponent />
        </div>
      )}
    </div>
  );
};

export default App;
