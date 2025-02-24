import { Stack } from 'expo-router';
import {
  Platform,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AppLayout() {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const isLargeScreen = width > 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.content,
          {
            maxWidth: isDesktop ? 1200 : isTablet ? 768 : '100%',
            paddingHorizontal: isLargeScreen ? 16 : 0,
          },
        ]}
      >
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              paddingBottom: insets.bottom,
              paddingLeft: insets.left,
              paddingRight: insets.right,
              backgroundColor: '#F6F6F6',
            },
            animation: Platform.OS === 'ios' ? 'default' : 'fade',
            animationDuration: 200,
          }}
        >
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        </Stack>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  content: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
  },
});
