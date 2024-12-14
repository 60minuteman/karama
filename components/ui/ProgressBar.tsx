import { StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/Colors';

type ProgressBarProps = {
  /**
   * Progress value between 0 and 1 (0% to 100%)
   */
  progress: number;
  /**
   * Optional color for the progress fill
   */
  color?: string;
  /**
   * Optional color for the background
   */
  backgroundColor?: string;
  /**
   * Optional height for the progress bar
   */
  height?: number;
};

export function ProgressBar({
  progress,
  color = Colors.light.primary,
  backgroundColor = '#F5F5F5',
  height = 4,
}: ProgressBarProps) {
  // Ensure progress is between 0 and 1
  const clampedProgress = Math.min(Math.max(progress, 0), 1);

  return (
    <View style={[styles.container, { paddingVertical: height > 4 ? height / 2 : 10 }]}>
      <View style={[styles.bar, { height, backgroundColor }]}>
        <View
          style={[
            styles.fill,
            {
              width: `${clampedProgress * 100}%`,
              height,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  bar: {
    borderRadius: 2,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: 2,
  },
});