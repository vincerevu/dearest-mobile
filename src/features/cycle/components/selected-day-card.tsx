import { StyleSheet, View } from 'react-native';
import { Dovie } from '@/components/brand';
import { AppText, Card } from '@/components/ui';
import { spacing } from '@/design-system/tokens';

type SelectedDayCardProps = { dateLabel: string; title: string; description: string };

export function SelectedDayCard({ dateLabel, description, title }: SelectedDayCardProps) {
  return (
    <Card variant="soft">
      <View style={styles.row}>
      <View style={styles.content}>
        <AppText color="brand" variant="label">{dateLabel}</AppText>
        <AppText variant="headingMd">{title}</AppText>
        <AppText color="secondary">{description}</AppText>
      </View>
      <Dovie decorative pose="thinking" size={72} />
      </View>
    </Card>
  );
}
const styles = StyleSheet.create({ content: { flex: 1, gap: spacing.sm }, row: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm } });
