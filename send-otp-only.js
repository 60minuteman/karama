const axios = require('axios');

// Create axios instance with same config as the app
const api = axios.create({
  baseURL: 'https://starfish-app-7pbch.ondigitalocean.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

const PHONE_NUMBER = '+23409038819008';

console.log('📱 Sending OTP to:', PHONE_NUMBER);
console.log('Base URL:', api.defaults.baseURL);
console.log('================================\n');

async function sendOTP() {
  try {
    // Try SIGN_UP first
    console.log('🔄 Attempting SIGN_UP strategy...');
    const response = await api.post('/auth/phone/start-verification', {
      phone_number: PHONE_NUMBER,
      strategy: 'SIGN_UP',
    });
    
    console.log('✅ OTP sent successfully with SIGN_UP!');
    console.log('📊 Status:', response.status);
    console.log('📄 Response:', JSON.stringify(response.data, null, 2));
    
  } catch (error) {
    if (error.response?.status === 409) {
      console.log('ℹ️  User already exists, trying SIGN_IN strategy...');
      
      try {
        const response = await api.post('/auth/phone/start-verification', {
          phone_number: PHONE_NUMBER,
          strategy: 'SIGN_IN',
        });
        
        console.log('✅ OTP sent successfully with SIGN_IN!');
        console.log('📊 Status:', response.status);
        console.log('📄 Response:', JSON.stringify(response.data, null, 2));
        
      } catch (signInError) {
        console.log('❌ Failed to send OTP with SIGN_IN:');
        console.log('📊 Status:', signInError.response?.status);
        console.log('💬 Error:', signInError.response?.data?.message || signInError.message);
        console.log('📄 Full Error:', JSON.stringify(signInError.response?.data, null, 2));
      }
    } else {
      console.log('❌ Failed to send OTP with SIGN_UP:');
      console.log('📊 Status:', error.response?.status);
      console.log('💬 Error:', error.response?.data?.message || error.message);
      console.log('📄 Full Error:', JSON.stringify(error.response?.data, null, 2));
    }
  }
}

console.log('🚀 Starting OTP request...\n');
sendOTP().then(() => {
  console.log('\n✨ OTP request completed!');
  console.log('📱 Check your phone for the OTP code.');
}).catch(console.error); 