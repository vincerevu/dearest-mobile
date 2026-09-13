import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText, Card } from '@/components/ui';
import { colors, radius, spacing } from '@/design-system/tokens';

type CycleStatProps = {
  label: string;
  value: string;
  icon?: ReactNode;
  tone?: 'brand' | 'cycle' | 'warm';
};

export function CycleStat({ icon, label, tone = 'brand', value }: CycleStatProps) {
  return (
    <Card padding="sm" style={styles.card}>
      {icon ? <View style={[styles.icon, toneStyles[tone]]}>{icon}</View> : null}
      <View style={styles.copy}>
        <AppText adjustsFontSizeToFit minimumFontScale={0.62} numberOfLines={1} style={styles.value} variant="headingMd">{value}</AppText>
        <AppText adjustsFontSizeToFit color="secondary" minimumFontScale={0.7} numberOfLines={2} style={styles.label} variant="label">{label}</AppText>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, minWidth: 0, paddingHorizontal: spacing.sm, paddingVertical: spacing.md },
  copy: { gap: spacing.xs, minWidth: 0 },
  icon: { alignItems: 'center', borderRadius: radius.pill, height: 36, justifyContent: 'center', width: 36 },
  label: { minHeight: 40 },
  value: { fontSize: 20, lineHeight: 26, minHeight: 26 },
});

const toneStyles = StyleSheet.create({
  brand: { backgroundColor: colors.brand.soft },
  cycle: { backgroundColor: colors.provenance.actual },
  warm: { backgroundColor: colors.provenance.aiInsight },
});
