import { useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { DearestLogo, Dovie } from '@/components/brand';
import { Screen } from '@/components/layout';
import { Button, FocusAwareStatusBar } from '@/components/ui';
import { useIsFirstTime } from '@/lib/hooks';
import { setItem } from '@/lib/storage';
import { isValidDateInput } from '@/lib/date-input';
import { useCoreStore } from '@/features/core/use-core-store';
import { CycleSetupForm, FeaturePreviewCard, OnboardingActions, OnboardingHeader, OnboardingSubtitle, OnboardingTitle, PrivacyInfoCard, SupportGoalGrid, type CycleRegularity, type SupportGoal } from './components';

type Step = 0 | 1 | 2 | 3;
type CycleDataStatus = 'known' | 'insufficient';

const supportGoals: SupportGoal[] = [
  { id: 'cycle', label: 'Hiểu chu kỳ', description: 'Hiểu nhịp của cơ thể' },
  { id: 'mood', label: 'Hiểu cảm xúc' }, { id: 'care', label: 'Chăm sóc bản thân' },
  { id: 'sleep', label: 'Ngủ & năng lượng' }, { id: 'journal', label: 'Chỉ muốn ghi lại mỗi ngày' },
];
const partnerGoals: SupportGoal[] = [
  { id: 'listen', label: 'Lắng nghe tốt hơn', description: 'Hiểu khi nào người ấy cần một khoảng nhẹ nhàng' },
  { id: 'support', label: 'Hỗ trợ việc nhỏ', description: 'Chủ động chia sẻ bớt một việc hằng ngày' },
  { id: 'learn', label: 'Hiểu hành trình', description: 'Chỉ xem những điều người ấy cho phép' },
];

export function OnboardingScreen() {
  const [, setIsFirstTime] = useIsFirstTime();
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role?: string }>();
  const isPartner = role === 'partner';
  const setCycle = useCoreStore(state => state.setCycle);
  const [step, setStep] = React.useState<Step>(0);
  const [goals, setGoals] = React.useState<string[]>([]);
  const [lastPeriodDate, setLastPeriodDate] = React.useState('');
  const [cycleLength, setCycleLength] = React.useState('');
  const [periodLength, setPeriodLength] = React.useState('');
  const [regularity, setRegularity] = React.useState<CycleRegularity>();
  const [cycleDataStatus] = React.useState<CycleDataStatus>('insufficient');
  const hasCycleBaseline = isValidDateInput(lastPeriodDate);

  const complete = React.useCallback(async () => {
    await setItem('onboarding_profile', {
      goals, role: isPartner ? 'partner' : 'user', cycleDataStatus: !isPartner && hasCycleBaseline ? 'known' : cycleDataStatus,
      ...(!isPartner && hasCycleBaseline ? { cycle: { lastPeriodDate, cycleLength: Number(cycleLength) || 28, periodLength: Number(periodLength) || 5, regularity: regularity ?? 'unsure' } } : {}),
    });
    setCycle(!isPartner && hasCycleBaseline ? { lastPeriodDate, cycleLength: Number(cycleLength) || 28, periodLength: Number(periodLength) || 5, regularity: regularity ?? 'unsure' } : null);
    setIsFirstTime(false);
    router.replace(isPartner ? '/(partner-tabs)/today' : '/');
  }, [cycleDataStatus, cycleLength, goals, hasCycleBaseline, isPartner, lastPeriodDate, periodLength, regularity, router, setCycle, setIsFirstTime]);

  const next = () => {
    if (step === 3) { void complete(); return; }
    setStep(current => (current + 1) as Step);
  };

  return <Screen scroll contentContainerStyle={styles.content}>
    <FocusAwareStatusBar />
    <OnboardingHeader currentStep={step} totalSteps={4} onSkip={() => { void complete(); }} />
    <View style={styles.body}>
      {step === 0 ? <WelcomeStep partner={isPartner} /> : null}
      {step === 1 ? <GoalsStep goals={goals} partner={isPartner} onChange={setGoals} /> : null}
      {step === 2 ? isPartner ? <PartnerSupportStep goals={goals} onChange={setGoals} /> : <CycleStep cycleLength={cycleLength} lastPeriodDate={lastPeriodDate} periodLength={periodLength} regularity={regularity} onCycleLengthChange={setCycleLength} onLastPeriodDateChange={setLastPeriodDate} onPeriodLengthChange={setPeriodLength} onRegularityChange={setRegularity} /> : null}
      {step === 3 ? <PrivacyStep partner={isPartner} /> : null}
    </View>
    <View style={styles.actions}>
      {step === 2 ? <Button label="Mình chưa nhớ" variant="link" onPress={() => setStep(3)} /> : null}
      <OnboardingActions primaryLabel={step === 0 ? 'Bắt đầu' : step === 3 ? 'Vào Dấu Yêu' : 'Tiếp tục'} secondaryLabel={step > 0 ? 'Quay lại' : undefined} onPrimary={next} onSecondary={step > 0 ? () => setStep(current => Math.max(0, current - 1) as Step) : undefined} />
    </View>
  </Screen>;
}

function WelcomeStep({ partner }: { partner: boolean }) { return <><DearestLogo subtitle="Dịu dàng cùng nhịp của bạn" /><Dovie decorative motion="idle" pose="welcome" size={200} /><OnboardingTitle>{partner ? 'Đồng hành nhẹ nhàng, đúng cách.' : 'Hiểu mình hơn, nhẹ nhàng mỗi ngày.'}</OnboardingTitle><OnboardingSubtitle>{partner ? 'Dovie giúp bạn hỗ trợ người ấy, nhưng mọi dữ liệu đều do người ấy quyết định.' : 'Dovie đồng hành cùng chu kỳ, cảm xúc và những ngày cậu cần được lắng nghe.'}</OnboardingSubtitle></>; }
function GoalsStep({ goals, onChange, partner }: { goals: string[]; onChange: (ids: string[]) => void; partner: boolean }) { return <><Dovie decorative pose="encourage" size={88} /><OnboardingTitle>{partner ? 'Bạn muốn đồng hành theo cách nào?' : 'Bạn muốn Dearest đồng hành với điều gì trước?'}</OnboardingTitle><OnboardingSubtitle>{partner ? 'Chọn điều bạn muốn bắt đầu trước. Bạn có thể đổi sau nhé.' : 'Chọn điều gần với bạn nhất lúc này. Bạn có thể đổi sau nhé.'}</OnboardingSubtitle><SupportGoalGrid goals={partner ? partnerGoals : supportGoals} selectedIds={goals} onChange={onChange} /></>; }
function PrivacyStep({ partner }: { partner: boolean }) { return <><Dovie decorative pose="privacy" size={160} /><OnboardingTitle>{partner ? 'Quyền riêng tư luôn thuộc về người ấy' : 'Dữ liệu của cậu vẫn là của cậu'}</OnboardingTitle><OnboardingSubtitle>Không có dark pattern. Bạn có thể xem, thay đổi hoặc rút lại quyền bất kỳ lúc nào.</OnboardingSubtitle><FeaturePreviewCard description={partner ? 'Chỉ xem dữ liệu khi người ấy chủ động bật quyền chia sẻ.' : 'Nhật ký riêng tư theo mặc định.'} title={partner ? 'Chia sẻ có kiểm soát' : 'Nhật ký riêng tư'} /><FeaturePreviewCard description="Chỉ dùng dữ liệu khi bạn đồng ý." title="Cá nhân hóa có kiểm soát" /><PrivacyInfoCard /></>; }
function PartnerSupportStep({ goals, onChange }: { goals: string[]; onChange: (ids: string[]) => void }) { return <><Dovie decorative pose="listening" size={88} /><OnboardingTitle>Điều gì hữu ích nhất lúc này?</OnboardingTitle><OnboardingSubtitle>Chọn điều gần với bạn nhất. Đây chỉ là gợi ý chung, không yêu cầu dữ liệu riêng tư của người ấy.</OnboardingSubtitle><SupportGoalGrid goals={partnerGoals} selectedIds={goals} onChange={onChange} /></>; }
function CycleStep(props: React.ComponentProps<typeof CycleSetupForm>) { return <><Dovie decorative pose="listening" size={140} /><OnboardingTitle>Bắt đầu từ kỳ gần nhất nhé</OnboardingTitle><OnboardingSubtitle>Chỉ điền điều cậu nhớ. Các độ dài là tuỳ chọn và có thể sửa sau.</OnboardingSubtitle><CycleSetupForm {...props} /></>; }

const styles = StyleSheet.create({ actions: { gap: 0 }, body: { gap: 20 }, content: { gap: 24, paddingBottom: 32 } });
