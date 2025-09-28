import React from 'react';
import { UserForm } from './components/UserForm';
import { AdminPanel } from './components/AdminPanel';
import { FaceCheck } from './components/FaceCheck'; 

function App() {
  const isAdmin = true;

  return (
    <div className="container">
      <h1>Veriff Sheriff Protocol</h1>
      <p>Verify your identity once. Use it everywhere, privately.</p>
      
      <UserForm />
      <FaceCheck />

      {isAdmin && <AdminPanel />}
    </div>
  );
}

export default App;