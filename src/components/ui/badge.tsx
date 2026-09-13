import { StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '@/design-system/tokens';
import { AppText } from './app-text';

type BadgeTone = 'actual' | 'predicted' | 'calculated' | 'aiInsight' | 'userReported';
type BadgeProps = { label: string; tone?: BadgeTone; testID?: string };

export function Badge({ label, testID, tone = 'userReported' }: BadgeProps) {
  const style = tone === 'actual' || tone === 'userReported'
    ? styles.actual
    : tone === 'predicted'
      ? styles.predicted
      : tone === 'calculated'
        ? styles.calculated
        : styles.aiInsight;
  return <View testID={testID} style={[styles.base, style]}><AppText variant="label" color="body">{label}</AppText></View>;
}

const styles = StyleSheet.create({
  base: { alignSelf: 'flex-start', borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  actual: { backgroundColor: colors.provenance.actual },
  predicted: { backgroundColor: colors.brand.soft },
  calculated: { backgroundColor: colors.provenance.calculated },
  aiInsight: { backgroundColor: colors.provenance.aiInsight },
});
