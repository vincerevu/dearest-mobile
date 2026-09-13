import type { LifeStage } from '@/components/future-shared';

export type WidgetType = 'mini' | 'daily' | 'cycle_countdown' | 'mood_check_in' | 'gentle_reminder' | 'pregnancy_week' | 'postpartum_support' | 'partner_support';
export type WidgetPrivacyMode = 'normal' | 'discreet';
export type WidgetSnapshot = { widgetType: WidgetType; stage: LifeStage; privacyMode: WidgetPrivacyMode; title?: string; message?: string; metric?: string; updatedAt: string; isStale?: boolean; actionLabel?: string };
