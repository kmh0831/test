import React, { useState } from 'react';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { useHistory } from 'react-router-dom';
import { awsConfig } from '../awsConfig';  // AWS Cognito 설정 가져오기

// Cognito User Pool 설정
const userPool = new CognitoUserPool({
  UserPoolId: awsConfig.userPoolId,
  ClientId: awsConfig.clientId,
});

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = () => {
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) => {
        const token = result.getAccessToken().getJwtToken();
        localStorage.setItem('token', token);  // JWT 토큰을 저장하여 로그인 상태 유지
        history.push('/movies');  // 로그인 성공 시 영화 목록 페이지로 이동
      },
      onFailure: (err) => {
        console.error('Login failed:', err);
        alert('Login failed. Please try again.');
      },
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
