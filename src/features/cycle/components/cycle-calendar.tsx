import { StyleSheet, View } from 'react-native';
import { AppText } from '@/components/ui';
import { colors, radius, spacing } from '@/design-system/tokens';
import { CalendarDay } from './calendar-day';

export type CycleCalendarCell = { key: string; dateKey: string; day: number; accessibilityLabel: string; state?: 'actual' | 'fertile' | 'normal' | 'predicted'; isCurrentMonth?: boolean; isSelected?: boolean; isToday?: boolean };
type CycleCalendarProps = { days: ReadonlyArray<CycleCalendarCell>; onSelectDay: (cell: CycleCalendarCell) => void };
const weekdayLabels = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

/** Renders the supplied 6×7 date grid; cycle calculation belongs outside this component. */
export function CycleCalendar({ days, onSelectDay }: CycleCalendarProps) {
  return (
    <View style={styles.card}>
      <View style={styles.week}>{weekdayLabels.map(label => <View key={label} style={styles.weekday}><AppText color="muted" variant="label">{label}</AppText></View>)}</View>
      {chunk(days, 7).map(week => (
        <View key={week[0]?.key} style={styles.week}>
          {week.map((cell) => {
            const { key, ...day } = cell;
            return <View key={key} style={styles.daySlot}><CalendarDay {...day} onPress={() => onSelectDay(cell)} /></View>;
          })}
        </View>
      ))}
    </View>
  );
}

function chunk<T>(items: ReadonlyArray<T>, size: number): T[][] {
  return Array.from({ length: Math.ceil(items.length / size) }, (_, index) => items.slice(index * size, index * size + size));
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface.card, borderColor: colors.border.default, borderRadius: 22, borderWidth: 1, padding: spacing.lg },
  // Keep a compact, fixed touch target: flex-sized squares made rows visually
  // crowded on wide web previews and tall Android screens.
  week: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  daySlot: { height: 38, width: 38 },
  weekday: { alignItems: 'center', height: 22, justifyContent: 'center', width: 38 },
});
