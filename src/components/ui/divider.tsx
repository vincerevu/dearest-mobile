import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '@/design-system/tokens';

export function Divider({ inset = 0, style }: { inset?: number; style?: StyleProp<ViewStyle> }) {
  return <View accessibilityElementsHidden style={[styles.divider, { marginHorizontal: inset * spacing.sm }, style]} />;
}
const styles = StyleSheet.create({ divider: { backgroundColor: colors.border.soft, height: StyleSheet.hairlineWidth } });
