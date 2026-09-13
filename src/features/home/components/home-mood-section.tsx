import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from '@/components/ui';
import { colors, radius, spacing } from '@/design-system/tokens';

export function MoodQuickItem({ icon, label, selected, onPress }: { label: string; icon: ReactNode; selected?: boolean; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" accessibilityState={{ selected }} style={[styles.item, selected && styles.selected]} onPress={onPress}>
      <View>{icon}</View>
      <AppText adjustsFontSizeToFit minimumFontScale={0.7} numberOfLines={1} style={styles.label} variant="label">{label}</AppText>
    </Pressable>
  );
}
export function HomeMoodSection({ children, title = 'Bạn thấy thế nào?' }: { children: ReactNode; title?: string }) {
  return (
    <View style={styles.section}>
      <AppText variant="headingMd">{title}</AppText>
      <View style={styles.items}>{children}</View>
    </View>
  );
}
export function MoodQuickPicker({ children }: { children: ReactNode }) { return <View style={styles.items}>{children}</View>; }
const styles = StyleSheet.create({ item: { alignItems: 'center', backgroundColor: colors.surface.card, borderColor: colors.border.default, borderRadius: radius.md, borderWidth: 1, flex: 1, gap: spacing.xs, justifyContent: 'center', minHeight: 82, minWidth: 0, paddingHorizontal: spacing.xs, paddingVertical: spacing.sm }, items: { flexDirection: 'row', gap: spacing.sm }, label: { alignSelf: 'stretch', textAlign: 'center' }, section: { gap: spacing.md }, selected: { backgroundColor: colors.surface.soft, borderColor: colors.brand.primary, borderWidth: 2 } });
