// app/index.tsx
import Navigation from '@/telas/navigation';
import React from 'react';
import { AuthProvider } from '@/context/AuthContext'; 

const App = () => {
  return <AuthProvider><Navigation/></AuthProvider>;
};

export default App;
