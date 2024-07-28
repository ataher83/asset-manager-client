import React, { useState } from 'react';
import axios from 'axios';

const PaymentAtSignup = ({ userEmail }) => {
  const [packageName, setPackageName] = useState('');
  const [memberLimit, setMemberLimit] = useState('');

  const handlePurchase = async () => {
    try {
      const response = await axios.patch(`http://localhost:5000/user/${userEmail}`, {
        packageName,
        memberLimit,
      });
      if (response.data.success) {
        alert('Purchase successful and user details updated.');
      } else {
        alert('Failed to update user details.');
      }
    } catch (error) {
      console.error('Error updating user details:', error);
      alert('An error occurred while updating user details.');
    }
  };

  return (
    <div>
      <h2>Purchase Package</h2>
      <div>
        <label>
          Package Name:
          <input
            type="text"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Member Limit:
          <input
            type="number"
            value={memberLimit}
            onChange={(e) => setMemberLimit(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handlePurchase}>Purchase</button>
    </div>
  );
};

export default PaymentAtSignup;
