import { useRouter } from 'expo-router';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { DovieAvatar } from '@/components/brand';
import { Screen } from '@/components/layout';
import { AppText, Card, InlineActionLink, SettingsListRow, SettingsListSection } from '@/components/ui';
import { spacing } from '@/design-system/tokens';
import { ConnectionRow, PartnerKnowledgeCard, PartnerPrivateState, PartnerSupportHintCard, PartnerTaskRow, SharedContextCard, WorkspaceSwitcher } from './components';
import { buildPartnerSnapshot } from './domain/partner-shared-snapshot';
import { usePartnerStore } from './use-partner-store';

export function PartnerTodayScreen() {
  const router = useRouter(); const permissions = usePartnerStore(state => state.permissions); const snapshot = buildPartnerSnapshot(permissions); const hint = snapshot.supportHints?.[0];
  return <Screen scroll><View style={styles.stack}><WorkspaceTitle title="Hôm nay" /><View style={styles.owner}><AppText color="brand" variant="headingMd">An</AppText><AppText color="secondary">Một chút để đồng hành tốt hơn hôm nay.</AppText></View>{Object.keys(permissions).some(key => permissions[key as keyof typeof permissions]) ? <SharedContextCard snapshot={snapshot} /> : <PartnerPrivateState />}{hint ? <><SectionLabel label="MỘT ĐIỀU NHỎ" /><PartnerSupportHintCard {...hint} onPress={() => router.push(`/partner-support/${hint.id}`)} /></> : null}<SectionLabel label="HIỂU THÊM" /><PartnerKnowledgeCard title="Vì sao năng lượng có thể thay đổi cuối chu kỳ?" onPress={() => router.push('/partner-support/knowledge/energy')} /></View></Screen>;
}

export function PartnerSupportWorkspaceScreen() {
  const router = useRouter(); const [done, setDone] = React.useState<string[]>([]); const tasks = [{ id: 'ask', title: 'Hỏi An cần gì', description: 'Một câu hỏi nhẹ nhàng.' }, { id: 'meal', title: 'Chuẩn bị một bữa nhẹ', description: 'Một việc nhỏ, dễ bắt đầu.' }, { id: 'rest', title: 'Cho An thêm thời gian nghỉ', description: 'Chủ động lo một việc hôm nay.' }];
  return <Screen scroll><View style={styles.stack}><WorkspaceTitle title="Hỗ trợ An" /><SectionLabel label="HÔM NAY" /><PartnerSupportHintCard description="Chủ động nhận giúp An một việc thường ngày." title="Một điều nhỏ" onPress={() => router.push('/partner-support/small-help')} /><SectionLabel label="GỢI Ý KHÁC" />{tasks.map(task => <PartnerTaskRow key={task.id} {...task} completed={done.includes(task.id)} onToggle={() => setDone(value => value.includes(task.id) ? value.filter(id => id !== task.id) : [...value, task.id])} />)}<SectionLabel label="HIỂU AN HƠN" />{['PMS là gì?', 'Vì sao năng lượng thay đổi?', 'Đau bụng kinh xảy ra vì sao?'].map(title => <PartnerKnowledgeCard key={title} title={title} onPress={() => router.push('/partner-support/knowledge/cycle')} />)}<Card accessibilityLabel="Hỏi Dovie" variant="soft" onPress={() => router.push('/partner-support/ask-dovie')}><View style={styles.dovieEntry}><DovieAvatar decorative size={44} variant="listening" /><View style={styles.flex}><AppText variant="label">Không biết nên làm gì?</AppText><AppText color="secondary" variant="label">Dovie có thể gợi ý dựa trên những gì An đã cho phép chia sẻ.</AppText><InlineActionLink label="Hỏi Dovie" /></View></View></Card></View></Screen>;
}

export function PartnerMeScreen() {
  const router = useRouter();
  return <Screen scroll><View style={styles.meStack}><View style={styles.meHeader}><AppText variant="headingLg">Tôi</AppText><View style={styles.person}><View style={styles.initial}><AppText color="inverse" variant="label">M</AppText></View><AppText variant="headingMd">Minh</AppText></View></View><SettingsListSection title="KHÔNG GIAN"><WorkspaceSwitcher active="partner" onPersonal={() => router.replace('/')} onPartner={() => {}} /></SettingsListSection><SettingsListSection title="KẾT NỐI"><ConnectionRow name="An" onPress={() => router.push('/partner/connection')} /></SettingsListSection><SettingsListSection title="THÔNG BÁO"><SettingsListRow label="Nhắc hỗ trợ" onPress={() => {}} /><SettingsListRow label="Lịch hẹn được chia sẻ" onPress={() => {}} /></SettingsListSection><SettingsListSection title="TÀI KHOẢN"><SettingsListRow label="Tài khoản" onPress={() => router.push('/settings/account')} /></SettingsListSection></View></Screen>;
}

function WorkspaceTitle({ title }: { title: string }) { return <AppText variant="headingLg">{title}</AppText>; }
function SectionLabel({ label }: { label: string }) { return <AppText color="muted" style={styles.sectionLabel} variant="label">{label}</AppText>; }

const styles = StyleSheet.create({ dovieEntry: { alignItems: 'flex-start', flexDirection: 'row', gap: spacing.md }, flex: { flex: 1, gap: spacing.xs }, initial: { alignItems: 'center', backgroundColor: '#F2506E', borderRadius: 22, height: 44, justifyContent: 'center', width: 44 }, meHeader: { gap: spacing.lg }, meStack: { gap: spacing.xl }, owner: { gap: spacing.xs }, person: { alignItems: 'center', flexDirection: 'row', gap: spacing.md }, sectionLabel: { fontSize: 12, letterSpacing: 0.6 }, stack: { gap: spacing.lg } });
