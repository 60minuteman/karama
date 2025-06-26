#!/bin/bash

# OTP Endpoints Test Script using curl
# Usage: ./test-otp-curl.sh [phone_number]

BASE_URL="https://starfish-app-7pbch.ondigitalocean.app"
PHONE_NUMBER=${1:-"+15551234567"}

echo "🚀 Testing OTP Endpoints with curl"
echo "Base URL: $BASE_URL"
echo "Phone Number: $PHONE_NUMBER"
echo "================================"

# Test 1: Send OTP for Sign Up
echo -e "\n📱 Test 1: Send OTP for Sign Up"
echo "POST $BASE_URL/auth/phone/start-verification"
curl -X POST "$BASE_URL/auth/phone/start-verification" \
  -H "Content-Type: application/json" \
  -d "{
    \"phone_number\": \"$PHONE_NUMBER\",
    \"strategy\": \"SIGN_UP\"
  }" \
  -w "\nStatus: %{http_code}\n" \
  -s

echo -e "\n" 

# Test 2: Send OTP for Existing User
echo -e "\n📱 Test 2: Send OTP for Existing User"
echo "POST $BASE_URL/auth/phone/start-verification"
curl -X POST "$BASE_URL/auth/phone/start-verification" \
  -H "Content-Type: application/json" \
  -d "{
    \"phone_number\": \"$PHONE_NUMBER\"
  }" \
  -w "\nStatus: %{http_code}\n" \
  -s

echo -e "\n"

# Test 3: Verify OTP with Invalid Code
echo -e "\n🔍 Test 3: Verify OTP with Invalid Code"
echo "POST $BASE_URL/auth/phone/confirm-otp"
curl -X POST "$BASE_URL/auth/phone/confirm-otp" \
  -H "Content-Type: application/json" \
  -d "{
    \"phone_number\": \"$PHONE_NUMBER\",
    \"code\": \"123456\"
  }" \
  -w "\nStatus: %{http_code}\n" \
  -s

echo -e "\n"

# Test 4: Test with Malformed Phone Number
echo -e "\n📱 Test 4: Send OTP with Malformed Phone Number"
echo "POST $BASE_URL/auth/phone/start-verification"
curl -X POST "$BASE_URL/auth/phone/start-verification" \
  -H "Content-Type: application/json" \
  -d "{
    \"phone_number\": \"invalid-phone\",
    \"strategy\": \"SIGN_UP\"
  }" \
  -w "\nStatus: %{http_code}\n" \
  -s

echo -e "\n"

# Test 5: Test Missing Required Fields
echo -e "\n📱 Test 5: Send OTP with Missing Phone Number"
echo "POST $BASE_URL/auth/phone/start-verification"
curl -X POST "$BASE_URL/auth/phone/start-verification" \
  -H "Content-Type: application/json" \
  -d "{
    \"strategy\": \"SIGN_UP\"
  }" \
  -w "\nStatus: %{http_code}\n" \
  -s

echo -e "\n"

echo "✅ All curl tests completed!"
echo ""
echo "💡 To test with a real phone number:"
echo "   ./test-otp-curl.sh \"+1234567890\""
echo ""
echo "💡 To test OTP verification interactively:"
echo "   node test-otp-endpoints.js --interactive" 