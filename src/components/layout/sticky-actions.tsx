import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '@/design-system/tokens';

export function StickyActions({ children }: { children: ReactNode }) {
  return <View style={styles.container}>{children}</View>;
}
const styles = StyleSheet.create({ container: { backgroundColor: colors.background.primary, borderTopColor: colors.border.soft, borderTopWidth: 1, gap: spacing.md, paddingHorizontal: spacing.xl, paddingVertical: spacing.md } });
