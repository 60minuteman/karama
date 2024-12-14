import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync(); // Prevents the splash screen from auto-hiding

export default function App() {
  useEffect(() => {
    // Hide the splash screen after a delay
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 2000); // 2 seconds delay
  }, []);

  return (
    <NavigationContainer>
      <LinearGradient
        colors={['#FFA07A', '#FF6B6B']}
        style={styles.background}
      >
        <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ title: 'Karama' }}
          />
        </Stack.Navigator>
        <StatusBar style="light" />
      </LinearGradient>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});