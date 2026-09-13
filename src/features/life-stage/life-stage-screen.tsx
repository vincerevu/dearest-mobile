import { useRouter } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';
import { Dovie } from '@/components/brand';
import { Screen, ScreenHeader, SectionHeader } from '@/components/layout';
import { AppText, Button, Card, ChecklistTaskRow, InlineActionLink } from '@/components/ui';
import { spacing } from '@/design-system/tokens';
import { LifeStageSelector, LifeStageTransitionCard, TransitionConfirmationSheet } from './components';
import { type LifeStagePreference, usePreferencesStore } from '@/features/management/use-preferences-store';

const stages: { stage: LifeStagePreference; title: string; description: string }[] = [
  { stage: 'cycle', title: 'Theo dõi chu kỳ', description: 'Theo dõi chu kỳ, cảm xúc và chăm sóc hằng ngày.' },
  { stage: 'ttc', title: 'Chuẩn bị mang thai', description: 'Bối cảnh sinh sản và wellbeing, không thay thế tư vấn y tế.' },
  { stage: 'pregnancy', title: 'Mang thai', description: 'Ưu tiên wellbeing của mẹ theo từng tuần.' },
  { stage: 'postpartum', title: 'Sau sinh', description: 'Hỗ trợ hồi phục, nghỉ ngơi và kết nối.' },
  { stage: 'motherhood', title: 'Làm mẹ', description: 'Tập trung vào wellbeing và nhịp sống của mẹ.' },
];
const stageCopy: Record<LifeStagePreference, { description: string; pose: 'default' | 'encourage' | 'care'; title: string }> = {
  cycle: { title: 'Hành trình: Chu kỳ', description: 'Theo dõi nhịp chu kỳ, cảm xúc và wellbeing hằng ngày.', pose: 'default' },
  ttc: { title: 'Hành trình: Chuẩn bị mang thai', description: 'Ưu tiên wellbeing, nhịp sinh hoạt và sự phối hợp với partner.', pose: 'encourage' },
  pregnancy: { title: 'Hành trình: Mang thai', description: 'Ưu tiên wellbeing của mẹ và các chuẩn bị theo từng giai đoạn.', pose: 'care' },
  postpartum: { title: 'Hành trình: Sau sinh', description: 'Ưu tiên hồi phục, nghỉ ngơi và nguồn hỗ trợ của bạn.', pose: 'care' },
  motherhood: { title: 'Hành trình: Làm mẹ', description: 'Ưu tiên wellbeing, routine và mental load của bạn.', pose: 'care' },
};
const planCopy: Record<LifeStagePreference, string> = {
  cycle: 'Một việc chăm sóc nhỏ phù hợp với hôm nay.', ttc: 'Routine, partner và câu hỏi cho lịch hẹn nếu bạn cần.', pregnancy: 'Lịch hẹn, chuẩn bị sinh và việc nhỏ cùng partner.', postpartum: 'Kế hoạch nghỉ ngơi, hỗ trợ và hồi phục.', motherhood: 'Routine, nguồn hỗ trợ và wellbeing cá nhân.',
};

export function LifeStageScreen() {
  const router = useRouter(); const stage = usePreferencesStore(state => state.lifeStage); const current = stageCopy[stage];
  return <Screen scroll><View style={{ gap: spacing.lg }}><ScreenHeader title="Hành trình của bạn" onBack={() => router.back()} /><Dovie decorative pose={current.pose} size={140} /><LifeStageTransitionCard description={current.description} stage={stage} title={current.title} /><SectionHeader title="Ưu tiên hiện tại" /><Card accessibilityLabel="Mở kế hoạch" variant="soft" onPress={() => router.push('/life-stage/plan')}><View style={{ gap: spacing.sm }}><AppText color="secondary">{planCopy[stage]}</AppText><InlineActionLink label="Mở kế hoạch" /></View></Card><Button label="Đổi hành trình" onPress={() => router.push('/life-stage/transition')} /></View></Screen>;
}

export function LifeStageTransitionScreen() {
  const router = useRouter(); const saved = usePreferencesStore(state => state.lifeStage); const setLifeStage = usePreferencesStore(state => state.setLifeStage); const [selected, setSelected] = React.useState<LifeStagePreference>(saved); const next = stageCopy[selected];
  return <Screen scroll><View style={{ gap: spacing.lg }}><ScreenHeader title="Đổi hành trình" onBack={() => router.back()} /><Dovie decorative pose={next.pose === 'default' ? 'encourage' : next.pose} size={140} /><AppText variant="headingMd">Bạn muốn Dovie đồng hành với điều gì lúc này?</AppText><AppText color="secondary">Nội dung hiển thị sẽ đổi theo lựa chọn này. Toàn bộ lịch sử chu kỳ, check-in và nhật ký của bạn vẫn được giữ nguyên.</AppText><LifeStageSelector stages={stages} value={selected} onChange={setSelected} /><TransitionConfirmationSheet title={next.title} onConfirm={() => { setLifeStage(selected); router.replace('/life-stage'); }} /></View></Screen>;
}

export function LifeStagePlanScreen() {
  const router = useRouter(); const stage = usePreferencesStore(state => state.lifeStage); const [done, setDone] = React.useState<string[]>([]);
  const items: Record<LifeStagePreference, { title: string; description: string }[]> = { cycle: [{ title: 'Dành vài phút check-in', description: 'Khoảng 2–3 phút' }, { title: 'Chuẩn bị một việc chăm sóc nhỏ', description: 'Chọn một điều dễ làm cho mình' }], ttc: [{ title: 'Chọn một routine nhẹ nhàng', description: 'Một việc nhỏ phù hợp hôm nay' }, { title: 'Trao đổi một việc cùng partner', description: 'Một lời nhắn hoặc kế hoạch ngắn' }, { title: 'Ghi câu hỏi nếu có lịch hẹn', description: 'Chỉ khi bạn cần' }], pregnancy: [{ title: 'Xem lại lịch hẹn sắp tới', description: 'Chỉ cần vài phút' }, { title: 'Ghi câu hỏi cho bác sĩ', description: 'Giữ lại điều bạn muốn hỏi' }, { title: 'Chuẩn bị một việc nhỏ cho tuần này', description: 'Theo nhịp của bạn' }], postpartum: [{ title: 'Bảo vệ một khoảng nghỉ', description: 'Dù chỉ là một khoảng ngắn' }, { title: 'Nhờ hỗ trợ một việc cụ thể', description: 'Chọn điều nhẹ nhất' }, { title: 'Ghi điều cơ thể đang cần', description: 'Không cần hoàn hảo' }], motherhood: [{ title: 'Chọn một việc giảm mental load', description: 'Bỏ bớt một việc không cần thiết' }, { title: 'Đặt một khoảng cho wellbeing cá nhân', description: 'Một chút thời gian cho mình' }, { title: 'Xin hỗ trợ khi cần', description: 'Bạn không cần tự làm mọi thứ' }] };
  const pose = stage === 'ttc' ? 'encourage' : stage === 'cycle' ? 'default' : stage === 'postpartum' ? 'rest' : 'care';
  const stageItems = items[stage]; const completeCount = stageItems.filter(item => done.includes(item.title)).length;
  return <Screen scroll><View style={{ gap: spacing.lg }}><ScreenHeader title="Kế hoạch" onBack={() => router.back()} /><Dovie decorative pose={pose} size={112} /><View style={{ gap: spacing.xs }}><AppText variant="headingMd">Một vài điều nhẹ nhàng</AppText><AppText color="secondary">Cậu có thể làm hôm nay</AppText></View><AppText color="muted" variant="label">HÔM NAY</AppText>{stageItems.map(item => <ChecklistTaskRow key={item.title} {...item} completed={done.includes(item.title)} onToggle={() => setDone(value => value.includes(item.title) ? value.filter(entry => entry !== item.title) : [...value, item.title])} />)}<AppText align="center" color="secondary" variant="label">{stageItems.length} việc • {completeCount} đã hoàn thành</AppText></View></Screen>;
}
