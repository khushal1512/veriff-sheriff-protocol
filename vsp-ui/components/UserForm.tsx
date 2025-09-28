import React, { useState } from 'react';

export function UserForm() {
  const [aadhaar, setAadhaar] = useState('');
  const [pan, setPan] = useState('');
  const [hallTicket, setHallTicket] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting KYC data:', { aadhaar, pan, hallTicket });
    
    alert('Submitting KYC for review!');
  };

  return (
    <div>
      <h2>Submit Your Documents for Verification</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Aadhaar Number"
          value={aadhaar}
          onChange={(e) => setAadhaar(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="PAN Number"
          value={pan}
          onChange={(e) => setPan(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="10th Hall Ticket Number"
          value={hallTicket}
          onChange={(e) => setHallTicket(e.target.value)}
          required
        />
        <button type="submit">Submit for Review</button>
      </form>
    </div>
  );
}