import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Dovie } from '@/components/brand';
import { AppText, Card, InlineActionLink, SettingsListRow, SwitchRow } from '@/components/ui';
import { colors, radius, spacing } from '@/design-system/tokens';
import type { PartnerSharedSnapshot, PartnerSharingPermissions } from '../domain/partner-shared-snapshot';

export function PartnerHero({ description, doviePose = 'privacy', title }: { title: string; description?: string; doviePose?: 'care' | 'default' | 'encourage' | 'privacy' }) {
  return <View style={styles.hero}><Dovie decorative pose={doviePose} size={96} /><View style={styles.heroCopy}><AppText align="center" style={styles.heroTitle} variant="headingMd">{title}</AppText>{description ? <AppText align="center" color="secondary">{description}</AppText> : null}</View></View>;
}

export function PrivacyBenefitList() {
  return <View style={styles.benefits}><Benefit text="Chỉ chia sẻ điều bạn chọn" /><Benefit text="Có thể đổi quyền bất cứ lúc nào" /><Benefit text="Dovie chat và ghi chú riêng luôn riêng tư" /></View>;
}

export function WorkspaceSwitcher({ active, onPartner, onPersonal, partnerName = 'An' }: { active: 'partner' | 'personal'; onPersonal: () => void; onPartner: () => void; partnerName?: string }) {
  return <View style={styles.rows}><WorkspaceRow active={active === 'personal'} label="Của tôi" onPress={onPersonal} /><WorkspaceRow active={active === 'partner'} label={`Hỗ trợ ${partnerName}`} onPress={onPartner} /></View>;
}

export function ConnectionRow({ connectedAt = '2 tháng 9', name = 'Minh', onPress }: { connectedAt?: string; name?: string; onPress?: () => void }) {
  return <SettingsListRow label={name} description={`Đã kết nối · từ ${connectedAt}`} onPress={onPress} trailing={<PartnerInitialAvatar name={name} size={36} />} />;
}

/** Legacy export retained while call sites migrate to ConnectionRow. */
export function PartnerProfileCard(props: { connectedAt?: string; name?: string; onPress?: () => void }) { return <ConnectionRow {...props} />; }

function PartnerInitialAvatar({ imageUrl: _imageUrl, name = 'Partner', size = 44 }: { name?: string; imageUrl?: string; size?: number }) {
  return <View accessibilityLabel={name} accessibilityRole="image" style={[styles.avatar, { borderRadius: size / 2, height: size, width: size }]}><AppText color="inverse" variant="label">{name.slice(0, 1).toUpperCase()}</AppText></View>;
}

export function SharedContextCard({ snapshot }: { snapshot: PartnerSharedSnapshot }) {
  const journey = snapshot.journey;
  const upcoming = snapshot.upcoming?.[0];
  if (!journey && !upcoming && !snapshot.sharedState) return <PartnerPrivateState />;
  const journeyTitle = journey?.cycleDay ? `Ngày ${journey.cycleDay} của chu kỳ` : journey?.lifeStage ? stageLabel(journey.lifeStage) : 'Giai đoạn hiện tại';
  return <Card variant="soft"><View style={styles.context}><View style={styles.contextTop}><Dovie decorative pose="thinking" size={56} /><View style={styles.flex}><AppText style={styles.contextTitle} variant="headingMd">{journeyTitle}</AppText><AppText color="secondary">{journey?.cyclePhase ?? 'An hiện chỉ chia sẻ thông tin cơ bản.'}</AppText></View></View>{upcoming ? <View style={styles.prediction}><AppText variant="label">{upcoming.title}</AppText>{upcoming.prediction ? <AppText color="brand" variant="label">Ước tính</AppText> : null}</View> : null}{snapshot.sharedState?.energy ? <SharedStateRow icon="lightning-bolt-outline" label="Năng lượng" value={snapshot.sharedState.energy} /> : null}{snapshot.sharedState?.mood ? <SharedStateRow icon="emoticon-outline" label="Tâm trạng" value={snapshot.sharedState.mood} /> : null}</View></Card>;
}

export function PartnerPrivateState() { return <View style={styles.privateState}><AppText variant="headingMd">Thông tin hôm nay đang riêng tư</AppText><AppText color="secondary">Bạn vẫn có thể ở bên An bằng một điều rất đơn giản:</AppText><AppText>“Hôm nay cậu muốn mình giúp gì?”</AppText></View>; }

export function PartnerSupportHintCard({ description, onPress, title }: { title: string; description: string; onPress: () => void }) {
  return <Card accessibilityLabel={title} onPress={onPress}><View style={styles.hint}><AppText style={styles.hintTitle} variant="headingMd">{title}</AppText><AppText color="secondary">{description}</AppText><InlineActionLink label="Xem thêm" /></View></Card>;
}

export function PartnerKnowledgeCard({ onPress, readTime = '3 phút đọc', title }: { title: string; readTime?: string; onPress: () => void }) {
  return <Pressable accessibilityLabel={title} accessibilityRole="button" style={({ pressed }) => [styles.knowledge, pressed && styles.pressed]} onPress={onPress}><View style={styles.flex}><AppText variant="label">{title}</AppText><AppText color="secondary" variant="label">{readTime}</AppText></View><MaterialCommunityIcons color="#E7A1AE" name="chevron-right" size={22} /></Pressable>;
}

export function PartnerTaskRow({ completed, description, onToggle, title }: { title: string; description: string; completed: boolean; onToggle: () => void }) {
  return <Pressable accessibilityLabel={title} accessibilityRole="checkbox" accessibilityState={{ checked: completed }} style={({ pressed }) => [styles.task, completed && styles.taskCompleted, pressed && styles.pressed]} onPress={onToggle}><MaterialCommunityIcons color={completed ? colors.brand.primary : colors.text.muted} name={completed ? 'check-circle' : 'checkbox-blank-circle-outline'} size={25} /><View style={styles.flex}><AppText variant="label">{title}</AppText><AppText color="secondary" variant="label">{completed ? 'Đã hoàn thành' : description}</AppText></View></Pressable>;
}

export function SharingPermissionRow({ description, label, sensitive = false, value, onChange }: { label: string; description: string; sensitive?: boolean; value: boolean; onChange: (next: boolean, sensitive: boolean) => void }) { return <SwitchRow description={description} label={label} value={value} onValueChange={next => onChange(next, sensitive)} />; }

export function PrivacyLockedRow({ label, description }: { label: string; description: string }) { return <View style={styles.locked}><MaterialCommunityIcons color={colors.text.muted} name="lock-outline" size={20} /><View style={styles.flex}><AppText variant="label">{label}</AppText><AppText color="secondary" variant="label">{description}</AppText></View></View>; }

export function PartnerPermissionSections({ permissions, onChange }: { permissions: PartnerSharingPermissions; onChange: (key: keyof PartnerSharingPermissions, next: boolean, sensitive: boolean) => void }) {
  return <View style={styles.permissionStack}><PermissionSection title="CHU KỲ & HÀNH TRÌNH"><SharingPermissionRow description="Giai đoạn An đang chọn" label="Giai đoạn hiện tại" value={permissions.lifeStage} onChange={next => onChange('lifeStage', next, false)} /><SharingPermissionRow description="Ngày dự đoán gần nhất" label="Kỳ kinh dự kiến" value={permissions.nextPeriodPrediction} onChange={next => onChange('nextPeriodPrediction', next, false)} /><SharingPermissionRow description="Ví dụ: cuối chu kỳ" label="Giai đoạn chu kỳ" value={permissions.cyclePhase} onChange={next => onChange('cyclePhase', next, false)} /></PermissionSection><PermissionSection title="TRẠNG THÁI HÔM NAY"><SharingPermissionRow description="Tóm tắt bạn cho phép" label="Tâm trạng" sensitive value={permissions.mood} onChange={next => onChange('mood', next, true)} /><SharingPermissionRow description="Mức năng lượng bạn cho phép" label="Năng lượng" sensitive value={permissions.energy} onChange={next => onChange('energy', next, true)} /><SharingPermissionRow description="Chỉ các triệu chứng bạn chọn" label="Triệu chứng" sensitive value={permissions.symptoms} onChange={next => onChange('symptoms', next, true)} /></PermissionSection><PermissionSection title="HỖ TRỢ"><SharingPermissionRow description="Một điều nhỏ Partner có thể làm" label="Gợi ý hỗ trợ" value={permissions.supportHints} onChange={next => onChange('supportHints', next, false)} /></PermissionSection></View>;
}

function PermissionSection({ children, title }: { title: string; children: ReactNode }) { return <View style={styles.permissionSection}><AppText color="muted" style={styles.sectionLabel} variant="label">{title}</AppText>{children}</View>; }
function Benefit({ text }: { text: string }) { return <View style={styles.benefit}><MaterialCommunityIcons color={colors.brand.primary} name="check" size={20} /><AppText>{text}</AppText></View>; }
function WorkspaceRow({ active, label, onPress }: { active: boolean; label: string; onPress: () => void }) { return <Pressable accessibilityLabel={label} accessibilityRole="button" style={styles.workspaceRow} onPress={onPress}><AppText color={active ? 'brand' : 'primary'} variant="label">{label}</AppText>{active ? <MaterialCommunityIcons color={colors.brand.primary} name="check" size={20} /> : <MaterialCommunityIcons color="#E7A1AE" name="chevron-right" size={20} />}</Pressable>; }
function SharedStateRow({ icon, label, value }: { icon: keyof typeof MaterialCommunityIcons.glyphMap; label: string; value: string }) { return <View style={styles.stateRow}><MaterialCommunityIcons color={colors.text.secondary} name={icon} size={20} /><AppText color="secondary" style={styles.flex}>{label}</AppText><AppText variant="label">{value}</AppText></View>; }
const stageLabel = (stage: NonNullable<PartnerSharedSnapshot['journey']>['lifeStage']) => ({ cycle: 'Theo dõi chu kỳ', motherhood: 'Làm mẹ', postpartum: 'Sau sinh', pregnancy: 'Mang thai', ttc: 'Chuẩn bị mang thai' } as const)[stage];

const styles = StyleSheet.create({
  avatar: { alignItems: 'center', backgroundColor: colors.brand.primary, justifyContent: 'center' },
  benefit: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm, minHeight: 32 },
  benefits: { gap: spacing.xs },
  context: { gap: spacing.md },
  contextTitle: { fontSize: 21, lineHeight: 27 },
  contextTop: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm },
  flex: { flex: 1, gap: spacing.xs },
  hero: { alignItems: 'center', gap: spacing.md },
  heroCopy: { gap: spacing.xs },
  heroTitle: { fontSize: 28, lineHeight: 34 },
  hint: { gap: spacing.sm },
  hintTitle: { fontSize: 21, lineHeight: 27 },
  knowledge: { alignItems: 'center', borderBottomColor: colors.border.soft, borderBottomWidth: StyleSheet.hairlineWidth, flexDirection: 'row', gap: spacing.md, minHeight: 64, paddingVertical: spacing.sm },
  locked: { alignItems: 'center', borderBottomColor: colors.border.soft, borderBottomWidth: StyleSheet.hairlineWidth, flexDirection: 'row', gap: spacing.md, minHeight: 60 },
  permissionSection: { gap: 0 },
  permissionStack: { gap: spacing.xl },
  prediction: { backgroundColor: '#FFF1F4', borderRadius: radius.md, gap: spacing.xs, padding: spacing.md },
  pressed: { opacity: 0.7 },
  privateState: { backgroundColor: '#FFF7F8', borderRadius: radius.md, gap: spacing.sm, padding: spacing.lg },
  rows: { borderBottomColor: colors.border.soft, borderBottomWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border.soft, borderTopWidth: StyleSheet.hairlineWidth },
  sectionLabel: { fontSize: 12, letterSpacing: 0.6, marginBottom: spacing.xs },
  stateRow: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm },
  task: { alignItems: 'flex-start', borderBottomColor: colors.border.soft, borderBottomWidth: StyleSheet.hairlineWidth, flexDirection: 'row', gap: spacing.md, minHeight: 66, paddingVertical: spacing.sm },
  taskCompleted: { backgroundColor: '#FFF7F8' },
  workspaceRow: { alignItems: 'center', borderBottomColor: colors.border.soft, borderBottomWidth: StyleSheet.hairlineWidth, flexDirection: 'row', justifyContent: 'space-between', minHeight: 56, paddingHorizontal: spacing.lg },
});
