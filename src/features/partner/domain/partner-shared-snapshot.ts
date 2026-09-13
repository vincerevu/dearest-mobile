export type PartnerSharingPermissions = {
  cyclePhase: boolean; nextPeriodPrediction: boolean; lifeStage: boolean;
  mood: boolean; energy: boolean; symptoms: boolean; supportHints: boolean;
  pregnancyWeek: boolean; appointments: boolean; sharedPlans: boolean;
};

export type PartnerSharedSnapshot = {
  owner: { id: string; displayName: string };
  journey?: { lifeStage: 'cycle' | 'ttc' | 'pregnancy' | 'postpartum' | 'motherhood'; cycleDay?: number; cyclePhase?: string; pregnancyWeek?: number };
  upcoming?: { type: 'appointment' | 'milestone' | 'period' | 'plan'; title: string; date?: string; prediction?: boolean }[];
  sharedState?: { energy?: string; mood?: string; symptoms?: string[] };
  supportHints?: { id: string; title: string; description: string }[];
};

/** A local mock of the server-filtered payload. Never use owner raw records in Partner UI. */
export function buildPartnerSnapshot(permissions: PartnerSharingPermissions): PartnerSharedSnapshot {
  const snapshot: PartnerSharedSnapshot = { owner: { id: 'owner-an', displayName: 'An' } };
  if (permissions.lifeStage || permissions.cyclePhase) snapshot.journey = { lifeStage: 'cycle', cycleDay: permissions.cyclePhase ? 25 : undefined, cyclePhase: permissions.cyclePhase ? 'Cuối chu kỳ' : undefined };
  if (permissions.nextPeriodPrediction) snapshot.upcoming = [{ type: 'period', title: 'Có thể bắt đầu khoảng 3 ngày nữa', prediction: true }];
  if (permissions.energy) snapshot.sharedState = { ...snapshot.sharedState, energy: 'Thấp' };
  if (permissions.mood) snapshot.sharedState = { ...snapshot.sharedState, mood: 'Ổn' };
  if (permissions.symptoms) snapshot.sharedState = { ...snapshot.sharedState, symptoms: ['Mệt'] };
  if (permissions.supportHints) snapshot.supportHints = [{ id: 'small-help', title: 'Chủ động giúp một việc nhỏ', description: 'An có thể cần thêm một chút thời gian nghỉ hôm nay.' }];
  return snapshot;
}
