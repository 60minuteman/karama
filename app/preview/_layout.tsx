import { Stack } from 'expo-router';

export default function PreviewLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide all headers by default
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Preview Screens',
          headerShown: true // Only show header on the index page
        }} 
      />
      <Stack.Screen 
        name="discovery-ui" 
        options={{ 
          headerShown: false // Hide header for discovery-ui
        }} 
      />
    </Stack>
  );
} 