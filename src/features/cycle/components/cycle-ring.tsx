import { StyleSheet, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { AppText } from '@/components/ui';
import { colors, spacing } from '@/design-system/tokens';

type CycleRingProps = {
  currentDay: number;
  totalDays: number;
  label?: string;
  size?: number;
};

export function CycleRing({ currentDay, label = 'Ngày chu kỳ', size = 168, totalDays }: CycleRingProps) {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(currentDay / totalDays, 0), 1);

  return (
    <View accessibilityLabel={`${label} ${currentDay} trên ${totalDays}`} accessibilityRole="image" style={[styles.container, { height: size, width: size }]}>
      <Svg height={size} width={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          fill="none"
          r={radius}
          stroke={colors.brand.soft}
          strokeWidth={strokeWidth}
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          fill="none"
          r={radius}
          rotation="-90"
          stroke={colors.brand.primary}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference * (1 - progress)}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View pointerEvents="none" style={styles.content}>
        <AppText variant="metric">{currentDay}</AppText>
        <AppText align="center" color="secondary" variant="label">{label}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  content: { alignItems: 'center', gap: spacing.xs, position: 'absolute' },
});
