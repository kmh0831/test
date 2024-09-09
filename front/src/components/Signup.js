import React, { useState } from 'react';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { awsConfig } from '../awsConfig';
import './Signup.css';  // 스타일 적용

const userPool = new CognitoUserPool({
  UserPoolId: awsConfig.userPoolId,
  ClientId: awsConfig.clientId,
});

function Signup({ closeSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();

    userPool.signUp(email, password, [
      { Name: 'name', Value: name },
      { Name: 'email', Value: email },
      { Name: 'phone_number', Value: phone }
    ], null, (err, result) => {
      if (err) {
        setError(err.message || JSON.stringify(err));
      } else {
        setSuccess(true);
      }
    });
  };

  return (
    <div className="signup-background">
      <div className="signup-container">
        <span className="close" onClick={closeSignup}>×</span> {/* X 버튼 */}
        <h2>Sign Up</h2>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {success && <div style={{ color: 'green' }}>Signup successful!</div>}
        <form onSubmit={handleSignup}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
