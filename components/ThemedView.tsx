import { View, type ViewProps } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const { colors, isDark } = useTheme();
  const backgroundColor = isDark ? darkColor : lightColor ?? colors.background;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
