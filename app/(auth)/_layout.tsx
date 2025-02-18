import { Stack } from 'expo-router';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function AuthLayout() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  return (
    <View style={styles.container}>
      <View style={[
        styles.content,
        {
          maxWidth: isDesktop ? 1200 : isTablet ? 768 : '100%',
          paddingHorizontal: isLargeScreen ? 16 : 0,
        }
      ]}>
        <Stack 
          screenOptions={{ 
            headerShown: false,
            contentStyle: { 
              backgroundColor: Colors.light.background,
            },
            fullScreenGestureEnabled: true,
          }}
        >
          <Stack.Screen 
            name="onboarding" 
            options={{
              animation: 'fade',
            }}
          />
          <Stack.Screen 
            name="auth" 
            options={{
              animation: 'fade',
            }}
          />
        </Stack>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
  },
});