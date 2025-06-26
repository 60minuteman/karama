const axios = require('axios');

const BASE_URL = 'https://starfish-app-7pbch.ondigitalocean.app';

async function testOTPVerification(phoneNumber, code) {
  console.log('🔐 DETAILED OTP VERIFICATION TEST');
  console.log('=================================');
  console.log('Phone Number:', phoneNumber);
  console.log('OTP Code:', code);
  console.log('Endpoint:', `${BASE_URL}/auth/phone/confirm-otp`);
  console.log('');

  try {
    const startTime = Date.now();
    
    const response = await axios.post(`${BASE_URL}/auth/phone/confirm-otp`, {
      phone_number: phoneNumber,
      code: code
    });

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    console.log('✅ VERIFICATION SUCCESS');
    console.log('=======================');
    console.log('🕐 Response Time:', responseTime + 'ms');
    console.log('📊 Status Code:', response.status);
    console.log('📋 Status Text:', response.statusText);
    console.log('');
    
    console.log('📤 REQUEST HEADERS:');
    console.log('Content-Type: application/json');
    console.log('');
    
    console.log('📥 RESPONSE HEADERS:');
    Object.entries(response.headers).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });
    console.log('');

    console.log('📄 FULL RESPONSE DATA:');
    console.log(JSON.stringify(response.data, null, 2));
    console.log('');

    console.log('🔍 RESPONSE ANALYSIS:');
    console.log('===================');
    console.log('Has statusCode:', !!response.data.statusCode);
    console.log('StatusCode value:', response.data.statusCode);
    console.log('Has status:', !!response.data.status);
    console.log('Status value:', response.data.status);
    console.log('Has success:', !!response.data.success);
    console.log('Success value:', response.data.success);
    console.log('Has error:', !!response.data.error);
    console.log('Error value:', response.data.error);
    console.log('Has message:', !!response.data.message);
    console.log('Message value:', response.data.message);
    console.log('Has token:', !!response.data.token);
    console.log('Has data:', !!response.data.data);
    
    if (response.data.token) {
      console.log('🔑 TOKEN DETAILS:');
      console.log('Token length:', response.data.token.length);
      console.log('Token preview:', response.data.token.substring(0, 50) + '...');
      console.log('Token type:', typeof response.data.token);
    }

    console.log('');
    console.log('🎯 USER FLOW DETERMINATION:');
    if (response.data.token) {
      console.log('👤 EXISTING USER - Has authentication token');
      console.log('🎯 Action: Direct login to main app');
    } else if (response.data.success && response.data.message === 'approved') {
      console.log('🆕 NEW USER - Verification approved, no token');
      console.log('🎯 Action: Redirect to password creation');
    } else {
      console.log('❓ UNKNOWN STATE - Unexpected response format');
    }

  } catch (error) {
    console.log('❌ VERIFICATION FAILED');
    console.log('======================');
    console.log('Status:', error.response?.status);
    console.log('Status Text:', error.response?.statusText);
    console.log('');
    
    console.log('📄 ERROR RESPONSE:');
    console.log(JSON.stringify(error.response?.data, null, 2));
    console.log('');
    
    console.log('🔍 ERROR ANALYSIS:');
    console.log('Error Message:', error.response?.data?.message);
    console.log('Error Type:', error.response?.data?.error);
    console.log('Status Code:', error.response?.data?.statusCode);
  }
}

// Test the provided OTP
async function runTests() {
  console.log('🚀 RUNNING OTP VERIFICATION TESTS');
  console.log('==================================');
  
  // Test 1: US number with provided OTP
  console.log('\n📱 TEST 1: US Number with Provided OTP');
  console.log('=' .repeat(50));
  await testOTPVerification('+17759865200', '413019');
  
  // Test 2: Invalid code for comparison
  console.log('\n📱 TEST 2: Invalid OTP Code (for comparison)');
  console.log('=' .repeat(50));
  await testOTPVerification('+17759865200', '000000');
  
  console.log('\n🎯 TESTS COMPLETED');
}

runTests(); 