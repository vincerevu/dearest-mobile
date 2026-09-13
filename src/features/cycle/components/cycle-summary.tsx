import { StyleSheet, View } from 'react-native';
import { AppText, Button, Card, SelectionRow } from '@/components/ui';
import { spacing } from '@/design-system/tokens';

export function CalendarWeekHeader() {
  return <View style={styles.week}>{['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(day => <AppText key={day} align="center" color="muted" style={styles.day} variant="label">{day}</AppText>)}</View>;
}
export function PeriodCountdown({ days }: { days: number }) {
  return (
    <Card variant="soft">
      <View style={styles.countdown}>
        <AppText color="brand" variant="metric">{days}</AppText>
        <AppText variant="headingMd">ngày nữa tới kỳ</AppText>
      </View>
    </Card>
  );
}
export function MonthlyReportPreviewCard({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Card>
      <View style={styles.report}>
        <View>
          <AppText variant="headingMd">Báo cáo tháng</AppText>
          <AppText color="secondary">Nhìn lại nhịp cơ thể của bạn.</AppText>
        </View>
        <Button label={label} size="sm" onPress={onPress} />
      </View>
    </Card>
  );
}
export function CycleSettingCard({ description, label, selected = false, onPress }: { label: string; description?: string; selected?: boolean; onPress: () => void }) { return <SelectionRow description={description} selected={selected} title={label} onPress={onPress} />; }
export function CycleRegularitySelector({ value, onChange }: { value: 'regular' | 'irregular'; onChange: (value: 'regular' | 'irregular') => void }) { return <View style={styles.choices}><CycleSettingCard label="Chu kỳ đều" selected={value === 'regular'} onPress={() => onChange('regular')} /><CycleSettingCard label="Chu kỳ không đều" selected={value === 'irregular'} onPress={() => onChange('irregular')} /></View>; }
export function CycleStatsRow({ children }: { children: React.ReactNode }) { return <View style={styles.stats}>{children}</View>; }
const styles = StyleSheet.create({ choices: { gap: spacing.sm }, countdown: { alignItems: 'center', gap: spacing.xs }, day: { flex: 1 }, report: { gap: spacing.md }, stats: { flexDirection: 'row', gap: spacing.md }, week: { flexDirection: 'row', paddingHorizontal: spacing.sm } });
