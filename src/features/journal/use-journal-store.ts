import { create } from 'zustand';
import { getItem, setItem } from '@/lib/storage';

export type JournalRecord = { id: string; createdAt: string; text: string; allowForPersonalization: boolean };
type JournalState = { entries: JournalRecord[]; save: (entry: Omit<JournalRecord, 'id' | 'createdAt'> & Partial<Pick<JournalRecord, 'id' | 'createdAt'>>) => string; remove: (id: string) => void; clear: () => void };
const JOURNAL_STORAGE_KEY = 'journal-state-v1';
const initialEntries = getItem<JournalRecord[]>(JOURNAL_STORAGE_KEY) ?? [];
const persist = (entries: JournalRecord[]) => { void setItem(JOURNAL_STORAGE_KEY, entries); };

export const useJournalStore = create<JournalState>(set => ({
  entries: initialEntries,
  save: entry => {
    const id = entry.id ?? String(Date.now()); const createdAt = entry.createdAt ?? new Date().toISOString();
    set(state => { const entries = [{ id, createdAt, text: entry.text.trim(), allowForPersonalization: entry.allowForPersonalization }, ...state.entries.filter(item => item.id !== id)]; persist(entries); return { entries }; });
    return id;
  },
  remove: id => set(state => { const entries = state.entries.filter(item => item.id !== id); persist(entries); return { entries }; }),
  clear: () => set(() => { const entries: JournalRecord[] = []; persist(entries); return { entries }; }),
}));
