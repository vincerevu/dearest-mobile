import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { Dovie } from '@/components/brand';
import { Screen, ScreenHeader } from '@/components/layout';
import { AppText, DisclosureRow, SettingsListSection } from '@/components/ui';
import { spacing } from '@/design-system/tokens';
import { CalendarScreen } from '@/features/cycle/calendar-screen';
import { type LifeStagePreference, usePreferencesStore } from '@/features/management/use-preferences-store';

const copy: Record<Exclude<LifeStagePreference, 'cycle'>, { description: string; title: string; pose: 'care' | 'encourage' | 'rest' }> = {
  ttc: { title: 'Hành trình chuẩn bị mang thai', description: 'Theo dõi nhịp cơ thể, kế hoạch nhẹ nhàng và những điều bạn muốn chuẩn bị.', pose: 'encourage' },
  pregnancy: { title: 'Hành trình mang thai', description: 'Theo từng tuần, bạn có thể ghi lại lịch hẹn, câu hỏi và những chuẩn bị phù hợp.', pose: 'care' },
  postpartum: { title: 'Hành trình sau sinh', description: 'Ưu tiên hồi phục, nghỉ ngơi, giấc ngủ và nguồn hỗ trợ của bạn.', pose: 'rest' },
  motherhood: { title: 'Hành trình làm mẹ', description: 'Một không gian cho wellbeing, năng lượng và mental load của bạn.', pose: 'care' },
};

export function JourneyScreen() {
  const router = useRouter(); const stage = usePreferencesStore(state => state.lifeStage);
  if (stage === 'cycle') return <CalendarScreen title="Hành trình" />;
  const current = copy[stage];
  return <Screen scroll><View style={{ gap: spacing.xl }}><ScreenHeader title="Hành trình" /><View style={{ alignItems: 'center' }}><Dovie decorative pose={current.pose} size={96} /></View><View style={{ gap: spacing.sm }}><AppText variant="headingLg">{current.title.replace('Hành trình ', '')}</AppText><AppText color="secondary">{current.description}</AppText></View><SettingsListSection title="SẮP TỚI"><DisclosureRow description="Những việc nhẹ nhàng, phù hợp với hành trình hiện tại." title="Kế hoạch của bạn" onPress={() => router.push('/life-stage/plan')} /></SettingsListSection><SettingsListSection title="GIAI ĐOẠN"><DisclosureRow description={`Bạn đang ở: ${current.title.replace('Hành trình ', '')}`} title="Thay đổi giai đoạn" onPress={() => router.push('/life-stage/transition')} /></SettingsListSection></View></Screen>;
}
