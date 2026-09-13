import { create } from 'zustand';
import { getItem, setItem } from '@/lib/storage';
import type { PartnerConnectionState } from './components';
import type { PartnerSharingPermissions } from './domain/partner-shared-snapshot';

type PartnerState = {
  connection: PartnerConnectionState;
  partnerName: string;
  permissions: PartnerSharingPermissions;
  setConnection: (connection: PartnerConnectionState) => void;
  setPartnerName: (name: string) => void;
  setPermission: (key: keyof PartnerSharingPermissions, value: boolean) => void;
};
type PersistedPartnerState = Pick<PartnerState, 'connection' | 'partnerName' | 'permissions'>;
const storageKey = 'partner-state-v1';
const defaults: PersistedPartnerState = { connection: 'none', partnerName: 'Minh', permissions: { appointments: false, cyclePhase: true, energy: false, lifeStage: true, mood: false, nextPeriodPrediction: true, pregnancyWeek: false, sharedPlans: false, supportHints: true, symptoms: false } };
const initial = { ...defaults, ...getItem<Partial<PersistedPartnerState>>(storageKey) };
const persist = (state: PersistedPartnerState) => { void setItem(storageKey, state); };

export const usePartnerStore = create<PartnerState>(set => ({
  ...initial,
  setConnection: connection => set(state => { const next = { connection, partnerName: state.partnerName, permissions: state.permissions }; persist(next); return { connection }; }),
  setPartnerName: partnerName => set(state => { const next = { connection: state.connection, partnerName, permissions: state.permissions }; persist(next); return { partnerName }; }),
  setPermission: (key, value) => set(state => { const permissions = { ...defaults.permissions, ...state.permissions, [key]: value }; persist({ connection: state.connection, partnerName: state.partnerName, permissions }); return { permissions }; }),
}));
