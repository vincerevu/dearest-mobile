import type { CoreCheckIn, CoreCycle } from '@/features/core/use-core-store';
import { parseDateInput } from '@/lib/date-input';
import type { CycleCalendarCell } from './components/cycle-calendar';

export type CalendarCell = CycleCalendarCell & { dateKey: string };

export function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function dateFromKey(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  return match ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])) : undefined;
}

export function formatCalendarDate(value: string) {
  const date = dateFromKey(value) ?? new Date();
  return new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}

export function formatMonth(value: Date) {
  return new Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' }).format(value);
}

export function addMonths(value: Date, amount: number) {
  return new Date(value.getFullYear(), value.getMonth() + amount, 1);
}

export function buildCalendarCells(month: Date, cycle: CoreCycle, checkIns: Record<string, CoreCheckIn>, selectedDate: string, showPredictions = true): CalendarCell[] {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const firstWeekday = (first.getDay() + 6) % 7;
  const gridStart = new Date(month.getFullYear(), month.getMonth(), 1 - firstWeekday);
  const today = dateKey(new Date());
  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + index);
    const key = dateKey(date);
    const state = resolveState(key, cycle, checkIns[key], today, showPredictions);
    return {
      accessibilityLabel: `${formatCalendarDate(key)}${state === 'actual' ? ', kỳ kinh được ghi nhận' : state === 'predicted' ? ', kỳ kinh dự kiến' : state === 'fertile' ? ', cửa sổ thụ thai dự kiến' : ''}`,
      dateKey: key,
      day: date.getDate(),
      isCurrentMonth: date.getMonth() === month.getMonth(),
      isSelected: key === selectedDate,
      isToday: key === today,
      key,
      state,
    };
  });
}

export function getCycleDayForDate(cycle: CoreCycle, key: string) {
  const start = parseDmy(cycle.lastPeriodDate);
  const date = dateFromKey(key);
  if (!start || !date || cycle.cycleLength < 1) return undefined;
  const elapsed = Math.floor((atMidnight(date).getTime() - atMidnight(start).getTime()) / 86_400_000);
  if (elapsed < 0) return undefined;
  return elapsed % cycle.cycleLength + 1;
}

function resolveState(key: string, cycle: CoreCycle, checkIn: CoreCheckIn | undefined, today: string, showPredictions: boolean): CalendarCell['state'] {
  if (checkIn?.flow && checkIn.flow > 0) return 'actual';
  const baseline = parseDmy(cycle.lastPeriodDate);
  const date = dateFromKey(key);
  if (!baseline || !date) return 'normal';
  const elapsed = Math.floor((atMidnight(date).getTime() - atMidnight(baseline).getTime()) / 86_400_000);
  if (elapsed >= 0 && elapsed < cycle.periodLength) return 'actual';
  if (!showPredictions || key <= today || elapsed < 0) return 'normal';
  const cycleDay = elapsed % cycle.cycleLength + 1;
  if (cycleDay <= cycle.periodLength) return 'predicted';
  const fertileStart = Math.max(cycle.periodLength + 1, cycle.cycleLength - 16);
  return cycleDay >= fertileStart && cycleDay <= cycle.cycleLength - 12 ? 'fertile' : 'normal';
}

function parseDmy(value: string) {
  return parseDateInput(value);
}

function atMidnight(value: Date) {
  return new Date(value.getFullYear(), value.getMonth(), value.getDate());
}
