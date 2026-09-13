import type { CalendarDayState } from './calendar-day';
import { StyleSheet, View } from 'react-native';
import { AppText } from '@/components/ui';
import { colors, radius, spacing } from '@/design-system/tokens';

const items: ReadonlyArray<{ label: string; state: Exclude<CalendarDayState, 'normal'> }> = [
  { label: 'Kỳ kinh', state: 'actual' },
  { label: 'Dự đoán', state: 'predicted' },
  { label: 'Cửa sổ thụ thai', state: 'fertile' },
];

export function CalendarLegend() {
  return <View style={styles.legend}>{items.map(item => <LegendItem key={item.state} {...item} />)}</View>;
}

export function CalendarLegendItem({ label, state }: { label: string; state: Exclude<CalendarDayState, 'normal'> }) {
  return (
    <View style={styles.item}>
      <View accessibilityElementsHidden style={[styles.dot, styles[state]]} />
      <AppText color="secondary" variant="label">{label}</AppText>
    </View>
  );
}

const LegendItem = CalendarLegendItem;

const styles = StyleSheet.create({
  legend: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  item: { alignItems: 'center', flexDirection: 'row', gap: spacing.xs },
  dot: { borderRadius: radius.pill, height: 12, width: 12 },
  actual: { backgroundColor: colors.cycle.actual },
  predicted: { backgroundColor: colors.cycle.predicted },
  fertile: { backgroundColor: colors.cycle.fertile },
});
