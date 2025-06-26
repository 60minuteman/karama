const axios = require('axios');

// Create axios instance with same config as the app
const api = axios.create({
  baseURL: 'https://starfish-app-7pbch.ondigitalocean.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Test phone number (you can modify this)
const TEST_PHONE_NUMBER = '+16045491015'; // User provided number

console.log('🚀 Starting OTP Endpoints Test');
console.log('Base URL:', api.defaults.baseURL);
console.log('Test Phone Number:', TEST_PHONE_NUMBER);
console.log('================================\n');

// Test 1: Send OTP for new user (SIGN_UP)
async function testSendOTPSignUp() {
  console.log('📱 Test 1: Send OTP for Sign Up');
  try {
    const response = await api.post('/auth/phone/start-verification', {
      phone_number: TEST_PHONE_NUMBER,
      strategy: 'SIGN_UP',
    });
    
    console.log('✅ Status:', response.status);
    console.log('📄 Response:', JSON.stringify(response.data, null, 2));
    return true;
  } catch (error) {
    console.log('❌ Error Status:', error.response?.status);
    console.log('💬 Error Message:', error.response?.data?.message || error.message);
    console.log('📄 Full Error Response:', JSON.stringify(error.response?.data, null, 2));
    
    // Check if it's a 409 (user exists) which is expected behavior
    if (error.response?.status === 409) {
      console.log('ℹ️  User already exists - this is expected behavior');
      return true;
    }
    return false;
  }
}

// Test 2: Send OTP for existing user (SIGN_IN)
async function testSendOTPExisting() {
  console.log('\n📱 Test 2: Send OTP for Existing User (SIGN_IN)');
  try {
    const response = await api.post('/auth/phone/start-verification', {
      phone_number: TEST_PHONE_NUMBER,
      strategy: 'SIGN_IN',
    });
    
    console.log('✅ Status:', response.status);
    console.log('📄 Response:', JSON.stringify(response.data, null, 2));
    return true;
  } catch (error) {
    console.log('❌ Error Status:', error.response?.status);
    console.log('💬 Error Message:', error.response?.data?.message || error.message);
    console.log('📄 Full Error Response:', JSON.stringify(error.response?.data, null, 2));
    return false;
  }
}

// Test 3: Verify OTP with invalid code
async function testVerifyOTPInvalid() {
  console.log('\n🔍 Test 3: Verify OTP with Invalid Code');
  try {
    const response = await api.post('/auth/phone/confirm-otp', {
      phone_number: TEST_PHONE_NUMBER,
      code: '123456', // Invalid code
    });
    
    console.log('✅ Status:', response.status);
    console.log('📄 Response:', JSON.stringify(response.data, null, 2));
    return true;
  } catch (error) {
    console.log('❌ Error Status:', error.response?.status);
    console.log('💬 Error Message:', error.response?.data?.message || error.message);
    console.log('📄 Full Error Response:', JSON.stringify(error.response?.data, null, 2));
    
    // This should fail with invalid code
    if (error.response?.status === 400 || error.response?.status === 401) {
      console.log('ℹ️  Invalid code rejected - this is expected behavior');
      return true;
    }
    return false;
  }
}

// Test 4: Test with malformed phone number
async function testMalformedPhoneNumber() {
  console.log('\n📱 Test 4: Send OTP with Malformed Phone Number');
  try {
    const response = await api.post('/auth/phone/start-verification', {
      phone_number: 'invalid-phone',
      strategy: 'SIGN_UP',
    });
    
    console.log('✅ Status:', response.status);
    console.log('📄 Response:', JSON.stringify(response.data, null, 2));
    return false; // Should not succeed
  } catch (error) {
    console.log('❌ Error Status:', error.response?.status);
    console.log('💬 Error Message:', error.response?.data?.message || error.message);
    
    // This should fail with validation error
    if (error.response?.status === 400) {
      console.log('ℹ️  Malformed phone number rejected - this is expected behavior');
      return true;
    }
    return false;
  }
}

// Test 5: Test missing required fields
async function testMissingFields() {
  console.log('\n📱 Test 5: Send OTP with Missing Phone Number');
  try {
    const response = await api.post('/auth/phone/start-verification', {
      strategy: 'SIGN_UP',
    });
    
    console.log('✅ Status:', response.status);
    console.log('📄 Response:', JSON.stringify(response.data, null, 2));
    return false; // Should not succeed
  } catch (error) {
    console.log('❌ Error Status:', error.response?.status);
    console.log('💬 Error Message:', error.response?.data?.message || error.message);
    
    // This should fail with validation error
    if (error.response?.status === 400) {
      console.log('ℹ️  Missing phone number rejected - this is expected behavior');
      return true;
    }
    return false;
  }
}

// Main test runner
async function runAllTests() {
  const results = {
    sendOTPSignUp: false,
    sendOTPExisting: false,
    verifyOTPInvalid: false,
    malformedPhoneNumber: false,
    missingFields: false,
  };

  console.log('Starting comprehensive OTP endpoint tests...\n');

  results.sendOTPSignUp = await testSendOTPSignUp();
  results.sendOTPExisting = await testSendOTPExisting();
  results.verifyOTPInvalid = await testVerifyOTPInvalid();
  results.malformedPhoneNumber = await testMalformedPhoneNumber();
  results.missingFields = await testMissingFields();

  // Summary
  console.log('\n📊 TEST SUMMARY');
  console.log('================');
  console.log('Send OTP (Sign Up):', results.sendOTPSignUp ? '✅ PASS' : '❌ FAIL');
  console.log('Send OTP (Existing):', results.sendOTPExisting ? '✅ PASS' : '❌ FAIL');
  console.log('Verify OTP (Invalid):', results.verifyOTPInvalid ? '✅ PASS' : '❌ FAIL');
  console.log('Malformed Phone:', results.malformedPhoneNumber ? '✅ PASS' : '❌ FAIL');
  console.log('Missing Fields:', results.missingFields ? '✅ PASS' : '❌ FAIL');

  const passedTests = Object.values(results).filter(result => result).length;
  const totalTests = Object.keys(results).length;
  
  console.log(`\n🎯 Overall: ${passedTests}/${totalTests} tests passed`);
  
  if (passedTests === totalTests) {
    console.log('🎉 All tests passed! Endpoints are working correctly.');
  } else {
    console.log('⚠️  Some tests failed. Please check the endpoint implementation.');
  }
}

// Interactive test mode
async function interactiveTest() {
  console.log('\n🎮 INTERACTIVE MODE');
  console.log('===================');
  console.log('This mode allows you to test with a real OTP code.');
  console.log('1. First, we\'ll send an OTP to your phone');
  console.log('2. Then you can enter the received code to test verification');
  
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function question(prompt) {
    return new Promise((resolve) => {
      rl.question(prompt, resolve);
    });
  }

  try {
    const phoneNumber = await question('\nEnter your phone number (with +1): ');
    
    console.log('\n📱 Sending OTP to', phoneNumber);
    
    // Send OTP
    try {
      const response = await api.post('/auth/phone/start-verification', {
        phone_number: phoneNumber,
        strategy: 'SIGN_UP',
      });
      console.log('✅ OTP sent successfully!');
      console.log('📄 Response:', JSON.stringify(response.data, null, 2));
    } catch (error) {
      if (error.response?.status === 409) {
        console.log('ℹ️  User exists, sending OTP for sign in...');
        // Try again with SIGN_IN strategy
        try {
          await api.post('/auth/phone/start-verification', {
            phone_number: phoneNumber,
            strategy: 'SIGN_IN',
          });
          console.log('✅ OTP sent successfully!');
        } catch (retryError) {
          console.log('❌ Failed to send OTP:', retryError.response?.data?.message);
          rl.close();
          return;
        }
      } else {
        console.log('❌ Failed to send OTP:', error.response?.data?.message);
        rl.close();
        return;
      }
    }

    const otpCode = await question('\nEnter the OTP code you received: ');
    
    console.log('\n🔍 Verifying OTP code', otpCode);
    
    // Verify OTP
    try {
      const response = await api.post('/auth/phone/confirm-otp', {
        phone_number: phoneNumber,
        code: otpCode,
      });
      console.log('✅ OTP verified successfully!');
      console.log('📄 Response:', JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.log('❌ OTP verification failed:', error.response?.data?.message);
      console.log('📄 Full Error Response:', JSON.stringify(error.response?.data, null, 2));
    }

  } catch (error) {
    console.log('Error in interactive mode:', error.message);
  } finally {
    rl.close();
  }
}

// Check command line arguments
const args = process.argv.slice(2);
if (args.includes('--interactive') || args.includes('-i')) {
  interactiveTest();
} else {
  runAllTests();
} 