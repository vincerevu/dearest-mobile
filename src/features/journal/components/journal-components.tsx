import { Pressable, StyleSheet, View } from 'react-native';
import { DovieAvatar, DovieMicro } from '@/components/brand';
import { AppText, Badge, Button, Card, EmptyState, TextArea } from '@/components/ui';
import { spacing } from '@/design-system/tokens';

export type JournalEntry = { id: string; dateLabel: string; preview: string; private?: boolean };

export function JournalPrivacyBadge({ private: isPrivate = true }: { private?: boolean }) {
  return <Badge label={isPrivate ? 'Chỉ mình bạn xem' : 'Cho phép cá nhân hóa'} tone="actual" />;
}
export function JournalEntryCard({ entry, onPress }: { entry: JournalEntry; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress}>
      <Card>
        <View style={styles.card}>
          <AppText color="muted" variant="label">{entry.dateLabel}</AppText>
          <AppText numberOfLines={3}>{entry.preview}</AppText>
          <JournalPrivacyBadge private={entry.private} />
        </View>
      </Card>
    </Pressable>
  );
}
export function JournalList({ entries, onPressEntry }: { entries: JournalEntry[]; onPressEntry: (entry: JournalEntry) => void }) {
  return <View style={styles.list}>{entries.map(entry => <JournalEntryCard key={entry.id} entry={entry} onPress={() => onPressEntry(entry)} />)}</View>;
}
export function JournalEditor({ value, onChangeText }: { value: string; onChangeText: (value: string) => void }) {
  return <TextArea label="Ghi chú của bạn" maxLength={2000} placeholder="Viết điều bạn đang nghĩ..." value={value} onChangeText={onChangeText} />;
}
export function JournalEmptyState({ onCreate }: { onCreate: () => void }) {
  return <EmptyState actionLabel="Viết nhật ký" description="Lưu lại những điều bạn muốn nhớ về ngày hôm nay." icon={<DovieMicro decorative size={96} state="empty" />} onAction={onCreate} title="Chưa có nhật ký nào" />;
}
export function JournalDetail({ entry, onEdit }: { entry: JournalEntry; onEdit: () => void }) {
  return <Card><View style={styles.card}><AppText color="muted" variant="label">{entry.dateLabel}</AppText><AppText>{entry.preview}</AppText><JournalPrivacyBadge private={entry.private} /><Button label="Chỉnh sửa" size="sm" variant="outline" onPress={onEdit} /></View></Card>;
}
export function DeleteJournalConfirmation({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
  return <View style={styles.actions}><Button label="Hủy" variant="outline" onPress={onCancel} /><Button label="Xóa nhật ký" variant="destructive" onPress={onConfirm} /></View>;
}
export function JournalAIConsentNotice() {
  return (
    <Card variant="soft">
      <View style={styles.notice}>
        <DovieAvatar decorative size={40} variant="listening" />
        <View style={styles.card}>
        <AppText variant="label">Cá nhân hóa là tùy chọn</AppText>
        <AppText color="secondary" variant="label">Chỉ dùng nội dung nhật ký khi bạn chủ động cho phép.</AppText>
        </View>
      </View>
    </Card>
  );
}
const styles = StyleSheet.create({ actions: { gap: spacing.sm }, card: { flex: 1, gap: spacing.sm }, list: { gap: spacing.md }, notice: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm } });
