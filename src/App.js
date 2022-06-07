import React from 'react';
import ContextProvider from './context/ContextProvider';
import Table from './components/Table';

function App() {
  return (
    <ContextProvider>
      <Table />
    </ContextProvider>
  );
}

export default App;
