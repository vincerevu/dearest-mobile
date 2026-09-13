import { StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '@/design-system/tokens';

export function PaginationDots({ activeIndex, count }: { activeIndex: number; count: number }) {
  return <View accessibilityLabel={`Trang ${activeIndex + 1} trên ${count}`} style={styles.base}>{Array.from({ length: count }, (_, index) => <View key={index} style={[styles.dot, index === activeIndex && styles.active]} />)}</View>;
}

const styles = StyleSheet.create({ active: { backgroundColor: colors.brand.primary, width: 22 }, base: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm }, dot: { backgroundColor: colors.border.default, borderRadius: radius.pill, height: 8, width: 8 } });
