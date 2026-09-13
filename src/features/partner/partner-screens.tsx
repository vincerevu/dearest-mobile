import { Redirect, useRouter } from 'expo-router';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Screen, ScreenHeader } from '@/components/layout';
import { AppText, Button, ConfirmDialog, InlineActionLink, Input, SettingsListRow, SettingsListSection } from '@/components/ui';
import { spacing } from '@/design-system/tokens';
import { ConnectionRow, PartnerHero, PartnerPermissionSections, PartnerProfileCard, PrivacyBenefitList, PrivacyLockedRow } from './components';
import { usePartnerStore } from './use-partner-store';

export function PartnerScreen() {
  const router = useRouter();
  const connection = usePartnerStore(state => state.connection);
  const name = usePartnerStore(state => state.partnerName);
  if (connection === 'none' || connection === 'disconnected') {
    return <Screen scroll><View style={styles.stack}><ScreenHeader title="Partner" onBack={() => router.back()} /><PartnerHero description="Cho người bạn tin tưởng xem một phần hành trình của bạn để họ có thể hỗ trợ đúng lúc hơn." title="Đồng hành cùng nhau" /><AppText color="secondary">Bạn luôn kiểm soát dữ liệu được chia sẻ.</AppText><PrivacyBenefitList /><Button label="Mời Partner" onPress={() => router.push('/partner/invite')} /><InlineActionLink label="Quyền riêng tư & chia sẻ" onPress={() => router.push('/settings/privacy')} /></View></Screen>;
  }
  if (connection === 'invited') return <PartnerInvitePendingScreen />;
  return <Screen scroll padded={false}><View style={styles.accountStack}><ScreenHeader title="Partner" onBack={() => router.back()} /><SettingsListSection title="KẾT NỐI"><ConnectionRow name={name} onPress={() => router.push('/partner/connection')} /></SettingsListSection><SettingsListSection title="ĐANG CHIA SẺ"><SettingsListRow label="Giai đoạn hiện tại" description="Đang chia sẻ" onPress={() => router.push('/partner/sharing')} /><SettingsListRow label="Kỳ kinh dự kiến" description="Đang chia sẻ" onPress={() => router.push('/partner/sharing')} /><SettingsListRow label="Gợi ý hỗ trợ" description="Đang chia sẻ" onPress={() => router.push('/partner/sharing')} /></SettingsListSection><SettingsListSection title="LUÔN RIÊNG TƯ"><PrivacyLockedRow description="Không chia sẻ" label="Nhật ký" /><PrivacyLockedRow description="Không chia sẻ" label="Dovie chat" /></SettingsListSection></View></Screen>;
}

export function PartnerInviteScreen() {
  const router = useRouter(); const setConnection = usePartnerStore(state => state.setConnection); const setPartnerName = usePartnerStore(state => state.setPartnerName);
  const [name, setName] = React.useState('Minh'); const [email, setEmail] = React.useState('minh@email.com');
  return <Screen scroll><View style={styles.stack}><ScreenHeader title="Mời Partner" onBack={() => router.back()} /><AppText variant="headingMd">Ai sẽ đồng hành cùng bạn?</AppText><Input accessibilityLabel="Tên Partner" label="Tên Partner" value={name} onChangeText={setName} /><Input accessibilityLabel="Email" autoCapitalize="none" keyboardType="email-address" label="Email" value={email} onChangeText={setEmail} /><AppText color="secondary">Partner sẽ nhận được một lời mời để kết nối với bạn.</AppText><View style={styles.info}><AppText variant="label">CHIA SẺ BAN ĐẦU</AppText><AppText>✓ Giai đoạn hiện tại</AppText><AppText>✓ Kỳ kinh dự kiến</AppText><AppText>✓ Gợi ý hỗ trợ</AppText><AppText color="secondary">Tâm trạng, năng lượng và triệu chứng được tắt mặc định.</AppText></View><Button disabled={!name.trim() || !email.trim()} label="Gửi lời mời" onPress={() => { setPartnerName(name.trim()); setConnection('invited'); router.replace('/partner'); }} /></View></Screen>;
}

export function PartnerInvitePendingScreen() {
  const setConnection = usePartnerStore(state => state.setConnection); const name = usePartnerStore(state => state.partnerName);
  return <Screen scroll><View style={styles.stack}><ScreenHeader title="Partner" /><PartnerHero doviePose="care" title="Lời mời đã được gửi" /><View style={styles.status}><AppText variant="label">{name}</AppText><AppText color="secondary">Đang chờ phản hồi</AppText><AppText color="muted" variant="label">Gửi lúc 4 tháng 9 · 21:30</AppText></View><Button label="Gửi lại lời mời" variant="outline" onPress={() => {}} /><InlineActionLink label="Hủy lời mời" onPress={() => setConnection('none')} /><Button label="Mock: chấp nhận lời mời" onPress={() => setConnection('connected')} /></View></Screen>;
}

export function PartnerSharingScreen() {
  const router = useRouter(); const permissions = usePartnerStore(state => state.permissions); const setPermission = usePartnerStore(state => state.setPermission); const [pending, setPending] = React.useState<keyof typeof permissions | null>(null);
  const change = (key: keyof typeof permissions, next: boolean, sensitive: boolean) => { if (next && sensitive) { setPending(key); return; } setPermission(key, next); };
  return <Screen scroll><View style={styles.stack}><ScreenHeader title="Chia sẻ với Minh" onBack={() => router.back()} /><AppText color="secondary">Bạn quyết định Minh có thể thấy gì.</AppText><PartnerPermissionSections permissions={permissions} onChange={change} /><View style={styles.lockedSection}><AppText color="muted" variant="label">LUÔN RIÊNG TƯ</AppText><PrivacyLockedRow description="Không chia sẻ" label="Nhật ký" /><PrivacyLockedRow description="Không chia sẻ" label="Dovie chat" /><PrivacyLockedRow description="Không chia sẻ" label="Ghi chú riêng" /></View><Button label="Lưu quyền chia sẻ" onPress={() => router.back()} /></View><ConfirmDialog confirmLabel="Cho phép" message="Minh chỉ thấy những thông tin bạn đã chọn chia sẻ." title={`Chia sẻ ${pending === 'symptoms' ? 'triệu chứng' : 'thông tin nhạy cảm'} với Minh?`} visible={Boolean(pending)} onCancel={() => setPending(null)} onConfirm={() => { if (pending) setPermission(pending, true); setPending(null); }} /></Screen>;
}

export function PartnerConnectionScreen() {
  const router = useRouter(); const name = usePartnerStore(state => state.partnerName); const setConnection = usePartnerStore(state => state.setConnection); const [confirm, setConfirm] = React.useState(false);
  return <Screen scroll padded={false}><View style={styles.accountStack}><ScreenHeader title="Kết nối" onBack={() => router.back()} /><View style={styles.connectionIntro}><PartnerProfileCard name={name} /><AppText color="secondary">{name} chỉ thấy thông tin bạn chủ động cho phép chia sẻ.</AppText></View><SettingsListSection title="QUẢN LÝ"><SettingsListRow label="Chỉnh quyền chia sẻ" onPress={() => router.push('/partner/sharing')} /><SettingsListRow label="Thông tin kết nối" description={`Đã kết nối với ${name}`} /></SettingsListSection><SettingsListSection title="NGUY HIỂM"><SettingsListRow label={`Ngắt kết nối với ${name}`} tone="danger" onPress={() => setConfirm(true)} /></SettingsListSection></View><ConfirmDialog confirmLabel="Ngắt kết nối" destructive message={`${name} sẽ không còn thấy dữ liệu được chia sẻ từ bạn.`} title={`Ngắt kết nối với ${name}?`} visible={confirm} onCancel={() => setConfirm(false)} onConfirm={() => { setConnection('disconnected'); router.replace('/partner'); }} /></Screen>;
}

/** Retained only so old external links move directly into the Partner workspace. */
export function PartnerSupportScreen() { return <Redirect href="/(partner-tabs)/support" />; }

const styles = StyleSheet.create({ accountStack: { gap: spacing.xl }, connectionIntro: { gap: spacing.sm, paddingHorizontal: spacing.lg }, info: { gap: spacing.sm }, lockedSection: { gap: spacing.xs }, stack: { gap: spacing.lg }, status: { gap: spacing.xs } });
