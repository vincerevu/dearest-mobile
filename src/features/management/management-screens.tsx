import { useRouter } from 'expo-router';
import * as React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable, StyleSheet, View } from 'react-native';
import { Dovie, DovieAvatar, DovieMicro, DovieNavIcon } from '@/components/brand';
import { Screen, ScreenHeader, SectionHeader } from '@/components/layout';
import { AppText, Button, Card, ConfirmDialog, DateField, EmptyState, InlineActionLink, Input, SettingsListRow, SettingsListSection, SwitchRow } from '@/components/ui';
import { colors, radius, spacing } from '@/design-system/tokens';
import { type CoreCycle, useCoreStore } from '@/features/core/use-core-store';
import { useJournalStore } from '@/features/journal/use-journal-store';
import { useAuthStore } from '@/features/auth/use-auth-store';
import { translate, useSelectedLanguage } from '@/lib/i18n';
import { isValidDateInput } from '@/lib/date-input';
import { usePreferencesStore } from './use-preferences-store';

export function SettingsManagementScreen({ title = 'Hồ sơ & Cài đặt' }: { title?: string }) {
  const router = useRouter();
  const { language, setLanguage } = useSelectedLanguage();
  const lifeStage = usePreferencesStore(state => state.lifeStage);
  const nextLanguage = language === 'vi' ? 'en' : 'vi';
  const lifeStageLabel = ({ cycle: 'Theo dõi chu kỳ', motherhood: 'Làm mẹ', postpartum: 'Sau sinh', pregnancy: 'Mang thai', ttc: 'Chuẩn bị mang thai' } as const)[lifeStage];
  return <Screen scroll><View style={styles.settingsStack}><ScreenHeader title={title} onBack={title === 'Tôi' ? undefined : () => router.back()} />
    <SettingsProfileCard onPress={() => router.push('/profile')} />
    <SettingsGroup title="CƠ THỂ & HÀNH TRÌNH"><SettingsRow icon="calendar-month-outline" label="Chu kỳ của tôi" onPress={() => router.push('/settings/cycle')} /><SettingsRow icon="sprout-outline" label="Giai đoạn hiện tại" subtitle={lifeStageLabel} onPress={() => router.push('/life-stage')} /></SettingsGroup>
    <SettingsGroup title="CÁ NHÂN HÓA"><SettingsRow icon="robot-outline" label="Dovie & AI" onPress={() => router.push('/settings/dovie')} /><SettingsRow icon="bell-outline" label="Cài đặt thông báo" onPress={() => router.push('/settings/notifications')} /></SettingsGroup>
    <SettingsGroup title="KẾT NỐI"><SettingsRow icon="account-heart-outline" label="Partner" onPress={() => router.push('/partner')} /><SettingsRow icon="widgets-outline" label="Widgets" onPress={() => router.push('/settings/widgets')} /></SettingsGroup>
    <SettingsGroup title="QUYỀN RIÊNG TƯ"><SettingsRow icon="shield-lock-outline" label="Dữ liệu & quyền riêng tư" onPress={() => router.push('/settings/privacy')} /></SettingsGroup>
    <SettingsGroup title="TÀI KHOẢN"><SettingsRow icon="account-circle-outline" label="Tài khoản" onPress={() => router.push('/settings/account')} /><SettingsRow icon="translate" label="Ngôn ngữ" value={language === 'vi' ? 'Tiếng Việt' : 'English'} onPress={() => setLanguage(nextLanguage)} /></SettingsGroup>
  </View></Screen>;
}

export function MeScreen() { return <SettingsManagementScreen title="Tôi" />; }

function SettingsProfileCard({ onPress }: { onPress: () => void }) {
  return <Pressable accessibilityLabel="Thông tin cá nhân" accessibilityRole="button" style={({ pressed }) => [styles.profileCard, pressed && styles.pressed]} onPress={onPress}><View style={styles.profileAvatar}><MaterialCommunityIcons color={colors.brand.primary} name="account" size={28} /></View><View style={styles.flex}><AppText variant="headingMd">Bạn</AppText><AppText color="secondary" variant="label">Thông tin cá nhân</AppText></View><MaterialCommunityIcons color={colors.brand.primary} name="chevron-right" size={24} /></Pressable>;
}

function SettingsGroup({ children, title }: { title: string; children: React.ReactNode }) { return <View style={styles.settingsGroup}><AppText color="muted" style={styles.groupTitle} variant="label">{title}</AppText><View style={styles.rows}>{children}</View></View>; }

function SettingsRow({ icon, label, onPress, subtitle, value }: { icon: keyof typeof MaterialCommunityIcons.glyphMap; label: string; onPress: () => void; subtitle?: string; value?: string }) {
  return <Pressable accessibilityLabel={label} accessibilityRole="button" style={({ pressed }) => [styles.settingsRow, pressed && styles.pressed]} onPress={onPress}>{icon === 'robot-outline' ? <DovieNavIcon color={colors.text.secondary} size={24} /> : <MaterialCommunityIcons color={colors.text.secondary} name={icon} size={22} />}<View style={styles.flex}><AppText variant="label">{label}</AppText>{subtitle ? <AppText color="secondary" variant="label">{subtitle}</AppText> : null}</View>{value ? <AppText color="secondary" variant="label">{value}</AppText> : null}<MaterialCommunityIcons color={colors.brand.primary} name="chevron-right" size={22} /></Pressable>;
}

export function ProfileManagementScreen() {
  const router = useRouter(); const stage = usePreferencesStore(state => state.lifeStage);
  const stageLabel = ({ cycle: 'Theo dõi chu kỳ', motherhood: 'Làm mẹ', postpartum: 'Sau sinh', pregnancy: 'Mang thai', ttc: 'Chuẩn bị mang thai' } as const)[stage];
  return <Screen scroll><View style={styles.stack}><ScreenHeader title="Hồ sơ" /><Card accessibilityLabel="Đổi hành trình" variant="soft" onPress={() => router.push('/life-stage')}><View style={styles.stack}><AppText variant="headingMd">Hành trình của bạn</AppText><AppText color="secondary">{stageLabel}</AppText><InlineActionLink label="Đổi hành trình" /></View></Card><Card accessibilityLabel="Mở cài đặt" onPress={() => router.push('/settings')}><View style={styles.stack}><AppText variant="headingMd">Tùy chọn cá nhân</AppText><AppText color="secondary">Quản lý chu kỳ, nhắc nhở, dữ liệu và các thiết lập ứng dụng.</AppText><InlineActionLink label="Mở cài đặt" /></View></Card></View></Screen>;
}

export function DovieManagementScreen() {
  const router = useRouter(); const useCheckIns = usePreferencesStore(state => state.dovieUsesCheckIns); const useCycle = usePreferencesStore(state => state.dovieUsesCycleContext); const useJournal = usePreferencesStore(state => state.journalForPersonalization);
  const setUseCheckIns = usePreferencesStore(state => state.setDovieUsesCheckIns); const setUseCycle = usePreferencesStore(state => state.setDovieUsesCycleContext); const setUseJournal = usePreferencesStore(state => state.setJournalForPersonalization); const [cleared, setCleared] = React.useState(false); const [confirmingClear, setConfirmingClear] = React.useState(false);
  return <Screen scroll><View style={styles.stack}><ScreenHeader title="Dovie & AI" onBack={() => router.back()} /><View style={styles.avatarRow}><DovieAvatar decorative size={48} variant="default" /><AppText variant="headingMd">Tùy chọn Dovie</AppText></View>
    <AppText color="secondary">Chọn từng nguồn Dovie được dùng để tạo bối cảnh. Dovie không tự động biết mọi dữ liệu của bạn.</AppText>
    <SwitchRow description="Giúp Dovie hiểu tâm trạng, năng lượng và điều bạn đã ghi nhận." label="Dùng check-in" value={useCheckIns} onValueChange={setUseCheckIns} />
    <SwitchRow description="Dùng ngày chu kỳ và phần dự đoán trong cuộc trò chuyện." label="Dùng bối cảnh chu kỳ" value={useCycle} onValueChange={setUseCycle} />
    <SwitchRow description="Chỉ dùng các nhật ký khi bạn chủ động bật quyền này." label="Dùng nhật ký được cho phép" value={useJournal} onValueChange={setUseJournal} />
    <SectionHeader title="Lịch sử trò chuyện" />
    <AppText color="secondary">Xóa lịch sử sẽ không thay đổi check-in, chu kỳ hoặc nhật ký của bạn.</AppText>
    {cleared ? <AppText color="secondary">Đã xóa lịch sử trò chuyện trên thiết bị này.</AppText> : <Button label="Xóa lịch sử trò chuyện" variant="destructive" onPress={() => setConfirmingClear(true)} />}
  </View><ConfirmDialog confirmLabel="Xóa lịch sử" destructive message="Lịch sử trò chuyện trên thiết bị này sẽ bị xóa. Check-in, chu kỳ và nhật ký không bị ảnh hưởng." title="Xóa lịch sử trò chuyện?" visible={confirmingClear} onCancel={() => setConfirmingClear(false)} onConfirm={() => { setCleared(true); setConfirmingClear(false); }} /></Screen>;
}

export function CycleSettingsManagementScreen() {
  const router = useRouter(); const cycle = useCoreStore(state => state.cycle); const predictions = usePreferencesStore(state => state.cyclePredictions); const setPredictions = usePreferencesStore(state => state.setCyclePredictions);
  return <Screen scroll><View style={styles.stack}><ScreenHeader title="Tùy chọn chu kỳ" onBack={() => router.back()} /><Card accessibilityLabel="Chỉnh thông tin chu kỳ" onPress={() => router.push('/cycle/edit')}><View style={styles.stack}><AppText variant="headingMd">Độ dài chu kỳ</AppText><AppText color="secondary">{cycle ? `${cycle.cycleLength} ngày · Hành kinh ${cycle.periodLength} ngày` : 'Chưa có dữ liệu chu kỳ.'}</AppText><InlineActionLink label="Chỉnh thông tin chu kỳ" /></View></Card><SwitchRow description="Hiển thị kỳ kinh và cửa sổ thụ thai được ước tính trong tương lai. Dữ liệu bạn tự ghi nhận luôn hiển thị." label="Hiển thị dự đoán" value={predictions} onValueChange={setPredictions} /><Card variant="soft"><View style={styles.stack}><AppText variant="headingMd">Lịch sử chỉnh sửa</AppText><AppText color="secondary">Lịch sử thay đổi chi tiết sẽ xuất hiện khi dữ liệu được đồng bộ với tài khoản của bạn.</AppText></View></Card></View></Screen>;
}

export function WidgetsManagementScreen() {
  const router = useRouter(); const [selected, setSelected] = React.useState<'default' | 'care' | 'rest' | 'listening'>('default');
  const widgets = [{ id: 'default', title: 'Nhịp hôm nay', message: 'Ngày chu kỳ và một lời nhắc ngắn.' }, { id: 'care', title: 'Chăm sóc nhẹ nhàng', message: 'Một gợi ý nghỉ ngơi riêng tư.' }, { id: 'rest', title: 'Khoảng nghỉ', message: 'Lời nhắc dịu dàng cho hôm nay.' }, { id: 'listening', title: 'Dovie lắng nghe', message: 'Mở Dovie để tâm sự.' }] as const;
  return <Screen scroll><View style={styles.stack}><ScreenHeader title="Widgets" onBack={() => router.back()} /><AppText color="secondary">Widget chỉ hiển thị bối cảnh ngắn, không hiển thị nhật ký, nội dung chat hay triệu chứng chi tiết.</AppText>
    {widgets.map(widget => <Card key={widget.id} variant={selected === widget.id ? 'soft' : 'default'}><View style={styles.widgetRow}><DovieAvatar decorative size={48} variant={widget.id} /><View style={styles.flex}><AppText variant="headingMd">{widget.title}</AppText><AppText color="secondary">{widget.message}</AppText></View><Button label={selected === widget.id ? 'Đã chọn' : 'Chọn'} size="sm" variant={selected === widget.id ? 'default' : 'outline'} onPress={() => setSelected(widget.id)} /></View></Card>)}
  </View></Screen>;
}

export function AccountManagementScreen() {
  const router = useRouter(); const signOut = useAuthStore.use.signOut(); const [confirmingDeletion, setConfirmingDeletion] = React.useState(false); const [confirmingSignOut, setConfirmingSignOut] = React.useState(false);
  // Mock authentication is Google-based today. Password accounts can opt in once that provider is implemented.
  const authProvider: 'google' | 'password' = 'google';
  const handleSignOut = () => { signOut(); setConfirmingSignOut(false); router.replace('/login'); };
  return <Screen scroll padded={false}><View style={styles.accountStack}><ScreenHeader title="Tài khoản" onBack={() => router.back()} /><SettingsListSection title="THÔNG TIN ĐĂNG NHẬP"><SettingsListRow label="Email" description="ngoc@dearest.app" onPress={() => {}} />{authProvider === 'google' ? <SettingsListRow label="Phương thức đăng nhập" description="Google" trailing={<MaterialCommunityIcons color="#4285F4" name="google" size={24} />} /> : <SettingsListRow label="Mật khẩu" description="Đã thiết lập" onPress={() => {}} />}</SettingsListSection><SettingsListSection title="TÀI KHOẢN"><View style={styles.accountAction}><Button label="Đăng xuất" variant="outline" onPress={() => setConfirmingSignOut(true)} /></View></SettingsListSection><SettingsListSection title="VÙNG NGUY HIỂM"><View style={styles.accountAction}><Button label="Xóa tài khoản" variant="destructive" onPress={() => setConfirmingDeletion(true)} /></View></SettingsListSection><ConfirmDialog confirmLabel="Đăng xuất" message="Bạn sẽ quay về màn hình đăng nhập trên thiết bị này." title="Đăng xuất khỏi Dearest?" visible={confirmingSignOut} onCancel={() => setConfirmingSignOut(false)} onConfirm={handleSignOut} /><ConfirmDialog confirmLabel="Tiếp tục" destructive message="Chức năng xóa tài khoản cần dịch vụ máy chủ trước khi có thể hoàn tất an toàn." title="Xóa tài khoản?" visible={confirmingDeletion} onCancel={() => setConfirmingDeletion(false)} onConfirm={() => setConfirmingDeletion(false)} /></View></Screen>;
}

export function NotificationManagementScreen() {
  const router = useRouter();
  const checkInReminder = usePreferencesStore(state => state.checkInReminder); const periodReminder = usePreferencesStore(state => state.periodReminder); const reminderTime = usePreferencesStore(state => state.reminderTime); const lockScreenPrivacy = usePreferencesStore(state => state.lockScreenPrivacy); const periodReminderDays = usePreferencesStore(state => state.periodReminderDays);
  const setCheckInReminder = usePreferencesStore(state => state.setCheckInReminder); const setPeriodReminder = usePreferencesStore(state => state.setPeriodReminder); const setReminderTime = usePreferencesStore(state => state.setReminderTime); const setLockScreenPrivacy = usePreferencesStore(state => state.setLockScreenPrivacy); const setPeriodReminderDays = usePreferencesStore(state => state.setPeriodReminderDays);
  return <Screen scroll><View style={styles.stack}><ScreenHeader title={translate('management.reminders')} onBack={() => router.back()} />
    <AppText color="secondary">{translate('management.reminders_description')}</AppText>
    <SwitchRow description={translate('management.daily_checkin_description')} label={translate('management.daily_checkin')} value={checkInReminder} onValueChange={setCheckInReminder} />
    {checkInReminder ? <Input accessibilityLabel={translate('management.reminder_time')} label={translate('management.reminder_time')} maxLength={5} placeholder="20:00" value={reminderTime} onChangeText={setReminderTime} /> : null}
    <SwitchRow description={translate('management.period_reminder_description')} label={translate('management.period_reminder')} value={periodReminder} onValueChange={setPeriodReminder} />
    {periodReminder ? <Input accessibilityLabel="Số ngày báo trước" keyboardType="number-pad" label="Nhắc trước bao nhiêu ngày" maxLength={2} placeholder="Ví dụ: 2" value={periodReminderDays} onChangeText={setPeriodReminderDays} /> : null}
    <SwitchRow description="Ẩn nội dung nhạy cảm khỏi màn hình khóa khi thiết bị có hỗ trợ." label="Riêng tư trên màn hình khóa" value={lockScreenPrivacy} onValueChange={setLockScreenPrivacy} />
  </View></Screen>;
}

export function PrivacyManagementScreen() {
  const router = useRouter(); const [confirming, setConfirming] = React.useState(false); const [deleted, setDeleted] = React.useState(false);
  const ai = usePreferencesStore(state => state.aiPersonalization); const journal = usePreferencesStore(state => state.journalForPersonalization);
  const setAi = usePreferencesStore(state => state.setAiPersonalization); const setJournal = usePreferencesStore(state => state.setJournalForPersonalization); const clearPreferences = usePreferencesStore(state => state.clear);
  const clearCore = useCoreStore(state => state.clear); const clearJournal = useJournalStore(state => state.clear);
  const deleteData = () => { clearCore(); clearJournal(); clearPreferences(); setConfirming(false); setDeleted(true); };
  return <Screen scroll><View style={styles.stack}><ScreenHeader title={translate('management.privacy')} onBack={() => router.back()} />
    <Dovie decorative pose="privacy" size={120} />
    <AppText color="secondary">{translate('management.privacy_description')}</AppText>
    <SwitchRow description={translate('management.ai_personalization_description')} label={translate('management.ai_personalization')} value={ai} onValueChange={setAi} />
    <SwitchRow description={translate('management.journal_ai_description')} label={translate('management.journal_ai')} value={journal} onValueChange={setJournal} />
    <Card accessibilityLabel="Quản lý quyền Partner" variant="soft" onPress={() => router.push('/partner/sharing')}><View style={styles.compactCard}><AppText variant="label">Partner</AppText><AppText color="secondary" variant="label">Quản lý các mục bạn cho phép chia sẻ.</AppText><InlineActionLink label="Quản lý quyền Partner" /></View></Card>
    <SectionHeader title={translate('management.device_data')} />
    <AppText color="secondary">{translate('management.device_data_description')}</AppText>
    {deleted ? <EmptyState description={translate('management.deleted_local_data_description')} icon={<DovieMicro decorative size={72} state="empty" />} title={translate('management.deleted_local_data')} /> : <Button label={translate('management.delete_local_data')} variant="destructive" onPress={() => setConfirming(true)} />}
    <ConfirmDialog confirmLabel={translate('management.delete_confirm_label')} destructive message={translate('management.delete_confirm_message')} title={translate('management.delete_confirm_title')} visible={confirming} onCancel={() => setConfirming(false)} onConfirm={deleteData} />
  </View></Screen>;
}

export function CycleEditManagementScreen() {
  const router = useRouter(); const cycle = useCoreStore(state => state.cycle); const setCycle = useCoreStore(state => state.setCycle);
  const [lastPeriodDate, setLastPeriodDate] = React.useState(cycle?.lastPeriodDate ?? ''); const [cycleLength, setCycleLength] = React.useState(cycle ? String(cycle.cycleLength) : ''); const [periodLength, setPeriodLength] = React.useState(cycle ? String(cycle.periodLength) : ''); const [regularity, setRegularity] = React.useState<CoreCycle['regularity']>(cycle?.regularity ?? 'unsure');
  const valid = isValidDateInput(lastPeriodDate) && Number(cycleLength) > 0 && Number(periodLength) > 0;
  const save = () => { if (!valid) return; setCycle({ cycleLength: Number(cycleLength), lastPeriodDate, periodLength: Number(periodLength), regularity }); router.back(); };
  return <Screen scroll><View style={styles.stack}><ScreenHeader title="Chỉnh chu kỳ" onBack={() => router.back()} />
    <DateField accessibilityLabel="Nhập ngày kỳ gần nhất" label="Ngày kỳ gần nhất" value={lastPeriodDate} onChange={setLastPeriodDate} />
    <Input accessibilityLabel="Độ dài chu kỳ" keyboardType="number-pad" label="Chu kỳ trung bình (ngày)" placeholder="Ví dụ: 28" value={cycleLength} onChangeText={setCycleLength} />
    <Input accessibilityLabel="Số ngày hành kinh" keyboardType="number-pad" label="Số ngày hành kinh" placeholder="Ví dụ: 4" value={periodLength} onChangeText={setPeriodLength} />
    <View style={styles.regularity}><AppText variant="label">Chu kỳ thường…</AppText><View style={styles.actions}><Button label="Khá đều" variant={regularity === 'regular' ? 'default' : 'outline'} onPress={() => setRegularity('regular')} /><Button label="Không đều" variant={regularity === 'irregular' ? 'default' : 'outline'} onPress={() => setRegularity('irregular')} /></View></View>
    {!valid && (lastPeriodDate || cycleLength || periodLength) ? <AppText color="secondary">Hãy chọn một ngày và nhập số ngày lớn hơn 0.</AppText> : null}
    <Button disabled={!valid} label="Lưu thay đổi" onPress={save} />
  </View></Screen>;
}

const styles = StyleSheet.create({ accountAction: { paddingHorizontal: spacing.lg, paddingVertical: spacing.xs }, accountStack: { gap: spacing.xl }, actions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }, avatarRow: { alignItems: 'center', flexDirection: 'row', gap: spacing.md }, compactCard: { gap: spacing.sm }, flex: { flex: 1, gap: spacing.xs }, groupTitle: { fontSize: 12, letterSpacing: 0.6 }, pressed: { opacity: 0.68 }, profileAvatar: { alignItems: 'center', backgroundColor: colors.surface.soft, borderRadius: radius.pill, height: 48, justifyContent: 'center', width: 48 }, profileCard: { alignItems: 'center', backgroundColor: colors.surface.card, borderBottomColor: colors.border.soft, borderBottomWidth: 1, flexDirection: 'row', gap: spacing.md, minHeight: 72, paddingHorizontal: spacing.lg, paddingVertical: spacing.md }, regularity: { gap: spacing.sm }, rows: { backgroundColor: colors.surface.card, borderTopColor: colors.border.soft, borderTopWidth: 1 }, settingsGroup: { gap: spacing.sm }, settingsRow: { alignItems: 'center', borderBottomColor: colors.border.soft, borderBottomWidth: 1, flexDirection: 'row', gap: spacing.md, minHeight: 56, paddingHorizontal: spacing.lg }, settingsStack: { gap: spacing.xl }, stack: { gap: spacing.lg }, widgetRow: { alignItems: 'center', flexDirection: 'row', gap: spacing.md } });
