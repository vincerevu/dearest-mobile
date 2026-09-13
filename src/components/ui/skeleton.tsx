import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { colors, radius } from '@/design-system/tokens';

export function Skeleton({ style }: { style?: StyleProp<ViewStyle> }) {
  return <View accessibilityLabel="Đang tải" accessibilityRole="progressbar" style={[styles.skeleton, style]} />;
}
const styles = StyleSheet.create({ skeleton: { backgroundColor: colors.border.soft, borderRadius: radius.sm, minHeight: 16 } });
