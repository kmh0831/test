const express = require('express');
const AWS = require('aws-sdk');
require('dotenv').config();

const router = express.Router();

// AWS Cognito 설정
AWS.config.update({
  region: process.env.AWS_REGION, // AWS Cognito User Pool 리전
});

const cognito = new AWS.CognitoIdentityServiceProvider();

// 회원가입 API
router.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;

  const params = {
    ClientId: process.env.COGNITO_CLIENT_ID, // Cognito App Client ID
    Username: email,
    Password: password,
    UserAttributes: [
      { Name: 'email', Value: email },
      { Name: 'name', Value: name },
    ],
  };

  try {
    // Cognito로 회원가입 요청
    const data = await cognito.signUp(params).promise();
    res.json({ message: 'User signed up successfully', data });
  } catch (error) {
    console.error('Error during Cognito signup:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
