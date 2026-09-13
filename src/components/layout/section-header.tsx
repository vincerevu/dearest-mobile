import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from '@/components/ui';
import { spacing } from '@/design-system/tokens';

type SectionHeaderProps = { title: string; subtitle?: string; actionLabel?: string; onAction?: () => void; accessory?: ReactNode };

export function SectionHeader({ accessory, actionLabel, onAction, subtitle, title }: SectionHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.copy}>
        <AppText variant="headingMd">{title}</AppText>
        {subtitle ? <AppText color="secondary" variant="label">{subtitle}</AppText> : null}
      </View>
      {accessory}
      {actionLabel && onAction ? <Pressable accessibilityLabel={actionLabel} accessibilityRole="button" onPress={onAction}><AppText color="brand" variant="label">{actionLabel}</AppText></Pressable> : null}
    </View>
  );
}
const styles = StyleSheet.create({ header: { alignItems: 'center', flexDirection: 'row', gap: spacing.md, justifyContent: 'space-between' }, copy: { flex: 1, gap: spacing.xs } });
