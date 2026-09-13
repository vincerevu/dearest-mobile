import { create } from 'zustand';
import { getItem, setItem } from '@/lib/storage';
import { parseDateInput } from '@/lib/date-input';

export type CoreCycle = { lastPeriodDate: string; cycleLength: number; periodLength: number; regularity: 'regular' | 'irregular' | 'unsure' };
export type CoreCheckIn = { date: string; mood: 'happy' | 'neutral' | 'sad' | 'irritated' | 'tired'; symptoms: string[]; flow: 0 | 1 | 2 | 3 | 4; energy: 'low' | 'medium' | 'good'; note?: string };
type CoreState = { cycle: CoreCycle | null; checkIns: Record<string, CoreCheckIn>; setCycle: (cycle: CoreCycle | null) => void; saveCheckIn: (checkIn: CoreCheckIn) => void; clear: () => void };
type PersistedCoreState = Pick<CoreState, 'checkIns' | 'cycle'>;
const CORE_STORAGE_KEY = 'core-state-v1';
const initialState = getItem<PersistedCoreState>(CORE_STORAGE_KEY) ?? { checkIns: {}, cycle: null };
const persist = (state: PersistedCoreState) => { void setItem(CORE_STORAGE_KEY, state); };

export const todayKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

export const useCoreStore = create<CoreState>(set => ({
  ...initialState,
  setCycle: cycle => set(state => { const next = { checkIns: state.checkIns, cycle }; persist(next); return { cycle }; }),
  saveCheckIn: checkIn => set(state => { const checkIns = { ...state.checkIns, [checkIn.date]: checkIn }; persist({ checkIns, cycle: state.cycle }); return { checkIns }; }),
  clear: () => set(() => { const next = { checkIns: {}, cycle: null }; persist(next); return next; }),
}));

export function getCycleDay(cycle: CoreCycle, reference = new Date()) {
  const baseline = parseDateInput(cycle.lastPeriodDate);
  if (!baseline || cycle.cycleLength < 1) return null;
  const start = Date.UTC(baseline.getFullYear(), baseline.getMonth(), baseline.getDate());
  const today = Date.UTC(reference.getUTCFullYear(), reference.getUTCMonth(), reference.getUTCDate());
  const daysSinceStart = Math.floor((today - start) / 86_400_000);
  if (daysSinceStart < 0) return null;
  return daysSinceStart % cycle.cycleLength + 1;
}
