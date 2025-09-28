import React from 'react';

const mockPendingSubmissions = [
  { userKeyHash: '0x123...abc', piiHash: '0xdef...456' },
  { userKeyHash: '0x789...def', piiHash: '0xghi...789' },
];

export function AdminPanel() {
  const handleApprove = (userKeyHash: string) => {
    console.log('Approving user:', userKeyHash);
   
    alert(`Approving user ${userKeyHash}`);
  };

  return (
    <div className="admin-panel">
      <h2>Sheriff's Admin Panel</h2>
      <h3>Pending Submissions</h3>
      <table>
        <thead>
          <tr>
            <th>User Key Hash</th>
            <th>PII Hash</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {mockPendingSubmissions.map((sub) => (
            <tr key={sub.userKeyHash}>
              <td>{sub.userKeyHash}</td>
              <td>{sub.piiHash}</td>
              <td>
                <button onClick={() => handleApprove(sub.userKeyHash)}>Approve</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}