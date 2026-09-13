import { StyleSheet, View } from 'react-native';
import { AppText } from '@/components/ui';
import { colors, spacing } from '@/design-system/tokens';

export function DearestLogo({ compact = false, subtitle }: { compact?: boolean; subtitle?: string }) {
  return (
    <View accessibilityLabel="Dearest" accessibilityRole="header" style={styles.wrap}>
      <AppText color="brand" variant={compact ? 'headingMd' : 'headingLg'}>DEAREST</AppText>
      {subtitle ? <AppText color="secondary" variant="label">{subtitle}</AppText> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', gap: spacing.xs },
  wordmark: { color: colors.brand.primary },
});
