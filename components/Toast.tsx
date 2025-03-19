import { ThemedText } from '@/components/ThemedText';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';

const getToastStyle = (type: string) => {
  switch (type) {
    case 'success':
      return {
        backgroundColor: '#FF4B55',
        icon: '🎉',
      };
    case 'network':
      return {
        backgroundColor: '#FFD700',
        icon: '🚫',
      };
    case 'premium':
      return {
        backgroundColor: undefined,
        // icon: require('@/assets/icons/premium-tag.png'),
      };
    case 'profile':
      return {
        backgroundColor: '#FFFFFF',
        icon: '🥳',
      };
    case 'error':
      return {
        backgroundColor: '#FF4B55',
        icon: '😤',
      };
    case 'message':
      return {
        backgroundColor: '#FFFFFF',
        icon: '📨',
      };
    default:
      return {
        backgroundColor: '#FFFFFF',
        icon: '❗',
      };
  }
};

const CustomToast = ({ text1, text2, type, ...props }: BaseToastProps) => {
  const toastStyle = getToastStyle(type || 'default');
  const isDarkBg = ['success', 'error', 'premium'].includes(type || '');

  if (type === 'premium') {
    return (
      <LinearGradient
        colors={['#FD9204', '#EB4430']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.8, y: 0 }}
        style={styles.container}
      >
        <View style={styles.content}>
          <Image source={toastStyle.icon} style={styles.premiumIcon} />
          <View>
            <ThemedText style={[styles.message, { color: '#FFFFFF' }]}>
              {text1}
            </ThemedText>
            {text2 && (
              <ThemedText style={[styles.subMessage, { color: '#FFFFFF' }]}>
                {text2}
              </ThemedText>
            )}
          </View>
        </View>
      </LinearGradient>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: toastStyle.backgroundColor },
      ]}
    >
      <View style={styles.content}>
        <ThemedText style={styles.icon}>{toastStyle.icon}</ThemedText>
        <View>
          <ThemedText
            style={[styles.message, { color: isDarkBg ? '#FFFFFF' : '#000000' }]}
          >
            {text1}
          </ThemedText>
          {text2 && (
            <ThemedText
              style={[styles.subMessage, { color: isDarkBg ? '#FFFFFF' : '#000000' }]}
            >
              {text2}
            </ThemedText>
          )}
        </View>
      </View>
    </View>
  );
};

export const toastConfig = {
  success: (props: BaseToastProps) => <CustomToast {...props} />,
  error: (props: BaseToastProps) => <CustomToast {...props} />,
  info: (props: BaseToastProps) => <CustomToast {...props} />,
  network: (props: BaseToastProps) => <CustomToast {...props} />,
  premium: (props: BaseToastProps) => <CustomToast {...props} />,
  profile: (props: BaseToastProps) => <CustomToast {...props} />,
  message: (props: BaseToastProps) => <CustomToast {...props} />,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  icon: {
    fontSize: 20,
  },
  premiumIcon: {
    width: 34,
    height: 34,
  },
  message: {
    fontSize: 16,
    flex: 1,
  },
  subMessage: {
    fontSize: 14,
    opacity: 0.8,
    marginTop: 4,
  },
});
