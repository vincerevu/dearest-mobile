import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';

import { DovieMicro } from '@/components/brand';
import { Screen, ScreenHeader } from '@/components/layout';
import { AppText, EmptyState, TextAction } from '@/components/ui';
import { colors, spacing } from '@/design-system/tokens';
import { todayKey, useCoreStore } from '@/features/core/use-core-store';
import { usePreferencesStore } from '@/features/management/use-preferences-store';
import { CalendarLegend, CycleCalendar, MonthNavigator } from './components';
import { addMonths, buildCalendarCells, formatCalendarDate, formatMonth, getCycleDayForDate } from './calendar-model';

export function CalendarScreen({ title = 'Lịch' }: { title?: string }) {
  const router = useRouter();
  const cycle = useCoreStore(state => state.cycle);
  const checkIns = useCoreStore(state => state.checkIns);
  const showPredictions = usePreferencesStore(state => state.cyclePredictions);
  const [month, setMonth] = React.useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [selectedDate, setSelectedDate] = React.useState(todayKey);

  if (!cycle) return <Screen scroll><View style={styles.stack}><ScreenHeader title={title} /><EmptyState actionLabel="Thiết lập chu kỳ" description="Khi có thông tin chu kỳ, Hành trình sẽ phân biệt rõ điều bạn ghi nhận và phần được dự đoán." icon={<DovieMicro decorative size={96} state="empty" />} onAction={() => router.push('/cycle/edit')} title="Chưa có dữ liệu chu kỳ" /></View></Screen>;

  const selectedCheckIn = checkIns[selectedDate];
  const cycleDay = getCycleDayForDate(cycle, selectedDate);
  return <Screen scroll><View style={styles.stack}>
    <ScreenHeader title={title} trailing={<TextAction label="Ghi nhận" onPress={() => router.push(`/check-in/${todayKey()}`)} />} />
    <MonthNavigator label={formatMonth(month)} onNext={() => setMonth(value => addMonths(value, 1))} onPrevious={() => setMonth(value => addMonths(value, -1))} />
    <CycleCalendar days={buildCalendarCells(month, cycle, checkIns, selectedDate, showPredictions)} onSelectDay={cell => setSelectedDate(cell.dateKey)} />
    <CalendarLegend />
    <View accessibilityLabel={selectedCheckIn ? 'Chỉnh sửa check-in' : 'Ghi nhận ngày này'} style={styles.summary}><AppText color="muted" variant="label">{formatCalendarDate(selectedDate)}</AppText><AppText variant="headingMd">{cycleDay ? `Ngày ${cycleDay} của chu kỳ` : 'Ngoài dữ liệu chu kỳ'}</AppText>{selectedCheckIn ? <><View style={styles.metric}><MaterialCommunityIcons color={colors.mood.neutral.accent} name="emoticon-neutral-outline" size={20} /><AppText>{moodLabel(selectedCheckIn.mood)}</AppText></View><View style={styles.metric}><MaterialCommunityIcons color={colors.energy.medium} name="lightning-bolt-outline" size={20} /><AppText>Năng lượng {energyLabel(selectedCheckIn.energy)}</AppText></View>{selectedCheckIn.symptoms.length ? <View style={styles.metric}><MaterialCommunityIcons color={colors.text.secondary} name="medical-bag" size={19} /><AppText color="secondary">{selectedCheckIn.symptoms.join(', ')}</AppText></View> : null}</> : <AppText color="secondary">Chưa có check-in cho ngày này.</AppText>}<TextAction label={selectedCheckIn ? 'Xem check-in' : 'Ghi nhận ngày này'} onPress={() => router.push(`/check-in/${selectedDate}`)} /></View>
  </View></Screen>;
}

const moodLabel = (value: string) => ({ happy: 'Vui', irritated: 'Cáu nhẹ', neutral: 'Bình thường', sad: 'Hơi buồn', tired: 'Mệt' } as Record<string, string>)[value] ?? value;
const energyLabel = (value: string) => ({ good: 'Tốt', low: 'Thấp', medium: 'Trung bình' } as Record<string, string>)[value] ?? value;
const styles = { metric: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm }, stack: { gap: spacing.lg }, summary: { gap: spacing.sm, paddingVertical: spacing.lg } } as const;
