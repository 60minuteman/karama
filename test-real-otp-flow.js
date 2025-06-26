const axios = require('axios');

const BASE_URL = 'https://starfish-app-7pbch.ondigitalocean.app';

// Test phone number
const PHONE_NUMBER = '+17759865200'; // US test number

async function testCompleteOTPFlow() {
  console.log('🚀 Testing Complete OTP Verification Flow');
  console.log('==========================================');
  console.log('Base URL:', BASE_URL);
  console.log('Phone Number:', PHONE_NUMBER);
  console.log('');

  try {
    // Step 1: Send OTP
    console.log('📱 Step 1: Sending OTP...');
    const otpResponse = await axios.post(`${BASE_URL}/auth/phone/start-verification`, {
      phone_number: PHONE_NUMBER,
      strategy: 'SIGN_UP'
    });

    console.log('✅ OTP Sent Successfully!');
    console.log('Status:', otpResponse.status);
    console.log('Response:', JSON.stringify(otpResponse.data, null, 2));
    console.log('');

    // Step 2: Prompt for OTP (we'll use a test code)
    console.log('📞 Check your phone for the OTP code...');
    console.log('🔍 For testing, we\'ll try some common test codes...');
    console.log('');

    // Step 3: Test verification with different codes
    const testCodes = ['123456', '000000', '111111', '999999'];
    
    for (const testCode of testCodes) {
      try {
        console.log(`🔐 Step 3: Testing verification with code: ${testCode}`);
        
        const verifyResponse = await axios.post(`${BASE_URL}/auth/phone/confirm-otp`, {
          phone_number: PHONE_NUMBER,
          code: testCode
        });

        console.log('✅ OTP Verified Successfully!');
        console.log('Status:', verifyResponse.status);
        console.log('Response:', JSON.stringify(verifyResponse.data, null, 2));
        console.log('');
        
        // Check if this is an existing user (has token) or new user
        if (verifyResponse.data.token) {
          console.log('🎯 EXISTING USER - Token received for direct login');
          console.log('Token:', verifyResponse.data.token.substring(0, 20) + '...');
        } else if (verifyResponse.data.success) {
          console.log('👤 NEW USER - Success flag received, needs password creation');
        }
        
        break; // Exit loop if successful
        
      } catch (verifyError) {
        console.log(`❌ Verification failed for code ${testCode}`);
        console.log('Status:', verifyError.response?.status);
        console.log('Error:', verifyError.response?.data?.message);
        console.log('');
      }
    }

    console.log('🎯 Testing complete!');
    console.log('');
    console.log('💡 To test with a real OTP:');
    console.log('1. Note the phone number:', PHONE_NUMBER);
    console.log('2. Check SMS for the real OTP code');
    console.log('3. Replace one of the test codes above with the real one');

  } catch (error) {
    console.error('❌ Error in OTP sending step:');
    console.error('Status:', error.response?.status);
    console.error('Message:', error.response?.data?.message);
    console.error('Full Response:', JSON.stringify(error.response?.data, null, 2));
  }
}

// Enhanced verification test with specific code
async function testSpecificOTPCode(code) {
  console.log('🔐 Testing OTP Verification with specific code');
  console.log('==============================================');
  console.log('Phone Number:', PHONE_NUMBER);
  console.log('OTP Code:', code);
  console.log('');

  try {
    const response = await axios.post(`${BASE_URL}/auth/phone/confirm-otp`, {
      phone_number: PHONE_NUMBER,
      code: code
    });

    console.log('✅ VERIFICATION SUCCESS');
    console.log('Status:', response.status);
    console.log('Headers:', response.headers);
    console.log('Response Data:', JSON.stringify(response.data, null, 2));
    
    // Analyze response structure
    console.log('');
    console.log('📊 RESPONSE ANALYSIS:');
    console.log('Has token:', !!response.data.token);
    console.log('Has success flag:', !!response.data.success);
    console.log('Status code:', response.data.statusCode);
    console.log('Status message:', response.data.status);
    
    if (response.data.token) {
      console.log('🔑 Token length:', response.data.token.length);
      console.log('🔑 Token preview:', response.data.token.substring(0, 50) + '...');
    }

  } catch (error) {
    console.log('❌ VERIFICATION FAILED');
    console.log('Status:', error.response?.status);
    console.log('Error Message:', error.response?.data?.message);
    console.log('Full Error Response:', JSON.stringify(error.response?.data, null, 2));
  }
}

// Run the test
testCompleteOTPFlow();

// Export function for manual testing with specific codes
module.exports = { testSpecificOTPCode }; 