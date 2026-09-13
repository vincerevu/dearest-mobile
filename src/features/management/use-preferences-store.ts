import { create } from 'zustand';
import { getItem, setItem } from '@/lib/storage';

export type LifeStagePreference = 'cycle' | 'ttc' | 'pregnancy' | 'postpartum' | 'motherhood';

type PreferencesState = {
  aiPersonalization: boolean;
  journalForPersonalization: boolean;
  dovieUsesCheckIns: boolean;
  dovieUsesCycleContext: boolean;
  lifeStage: LifeStagePreference;
  lockScreenPrivacy: boolean;
  periodReminderDays: string;
  checkInReminder: boolean;
  cyclePredictions: boolean;
  periodReminder: boolean;
  reminderTime: string;
  setAiPersonalization: (value: boolean) => void;
  setJournalForPersonalization: (value: boolean) => void;
  setDovieUsesCheckIns: (value: boolean) => void;
  setDovieUsesCycleContext: (value: boolean) => void;
  setLifeStage: (value: LifeStagePreference) => void;
  setLockScreenPrivacy: (value: boolean) => void;
  setPeriodReminderDays: (value: string) => void;
  setCheckInReminder: (value: boolean) => void;
  setCyclePredictions: (value: boolean) => void;
  setPeriodReminder: (value: boolean) => void;
  setReminderTime: (value: string) => void;
  clear: () => void;
};
type PersistedPreferences = Pick<PreferencesState, 'aiPersonalization' | 'checkInReminder' | 'cyclePredictions' | 'dovieUsesCheckIns' | 'dovieUsesCycleContext' | 'journalForPersonalization' | 'lifeStage' | 'lockScreenPrivacy' | 'periodReminder' | 'periodReminderDays' | 'reminderTime'>;
const PREFERENCES_STORAGE_KEY = 'preferences-state-v1';
const defaults: PersistedPreferences = { aiPersonalization: false, checkInReminder: false, cyclePredictions: true, dovieUsesCheckIns: true, dovieUsesCycleContext: true, journalForPersonalization: false, lifeStage: 'cycle', lockScreenPrivacy: true, periodReminder: false, periodReminderDays: '2', reminderTime: '20:00' };
const initialState = { ...defaults, ...getItem<Partial<PersistedPreferences>>(PREFERENCES_STORAGE_KEY) };
const persist = (state: PersistedPreferences) => { void setItem(PREFERENCES_STORAGE_KEY, state); };

export const usePreferencesStore = create<PreferencesState>(set => ({
  ...initialState,
  setAiPersonalization: aiPersonalization => set(state => { const next = { ...pick(state), aiPersonalization }; persist(next); return { aiPersonalization }; }),
  setJournalForPersonalization: journalForPersonalization => set(state => { const next = { ...pick(state), journalForPersonalization }; persist(next); return { journalForPersonalization }; }),
  setDovieUsesCheckIns: dovieUsesCheckIns => set(state => { const next = { ...pick(state), dovieUsesCheckIns }; persist(next); return { dovieUsesCheckIns }; }),
  setDovieUsesCycleContext: dovieUsesCycleContext => set(state => { const next = { ...pick(state), dovieUsesCycleContext }; persist(next); return { dovieUsesCycleContext }; }),
  setLifeStage: lifeStage => set(state => { const next = { ...pick(state), lifeStage }; persist(next); return { lifeStage }; }),
  setLockScreenPrivacy: lockScreenPrivacy => set(state => { const next = { ...pick(state), lockScreenPrivacy }; persist(next); return { lockScreenPrivacy }; }),
  setPeriodReminderDays: periodReminderDays => set(state => { const next = { ...pick(state), periodReminderDays }; persist(next); return { periodReminderDays }; }),
  setCheckInReminder: checkInReminder => set(state => { const next = { ...pick(state), checkInReminder }; persist(next); return { checkInReminder }; }),
  setCyclePredictions: cyclePredictions => set(state => { const next = { ...pick(state), cyclePredictions }; persist(next); return { cyclePredictions }; }),
  setPeriodReminder: periodReminder => set(state => { const next = { ...pick(state), periodReminder }; persist(next); return { periodReminder }; }),
  setReminderTime: reminderTime => set(state => { const next = { ...pick(state), reminderTime }; persist(next); return { reminderTime }; }),
  clear: () => set(state => { persist(defaults); return defaults; }),
}));

function pick(state: PreferencesState): PersistedPreferences {
  return { aiPersonalization: state.aiPersonalization, checkInReminder: state.checkInReminder, cyclePredictions: state.cyclePredictions, dovieUsesCheckIns: state.dovieUsesCheckIns, dovieUsesCycleContext: state.dovieUsesCycleContext, journalForPersonalization: state.journalForPersonalization, lifeStage: state.lifeStage, lockScreenPrivacy: state.lockScreenPrivacy, periodReminder: state.periodReminder, periodReminderDays: state.periodReminderDays, reminderTime: state.reminderTime };
}
