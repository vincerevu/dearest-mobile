import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { DovieAvatar, DovieMicro } from '@/components/brand';
import { AppText, BottomSheet, Button, Card, Chip, IconButton } from '@/components/ui';
import { colors, radius, spacing } from '@/design-system/tokens';

export function ChatHeader({ title = 'Dovie', onHistory, onMenu }: { title?: string; onHistory?: () => void; onMenu?: () => void }) {
  return (
    <View style={styles.header}>
      <AppText variant="headingMd">{title}</AppText>
      <View style={styles.headerActions}><IconButton accessibilityLabel="Lịch sử trò chuyện" icon={<MaterialCommunityIcons color={colors.brand.primary} name="history" size={24} />} style={styles.headerIcon} onPress={onHistory} /><IconButton accessibilityLabel="Tùy chọn cuộc trò chuyện" icon={<MaterialCommunityIcons color={colors.brand.primary} name="dots-horizontal" size={25} />} style={styles.headerIcon} onPress={onMenu} /></View>
    </View>
  );
}
export function TypingIndicator() {
  return <View accessibilityLiveRegion="polite" style={styles.typing}><DovieMicro decorative motion="typing" size={32} state="typing" /><AppText color="secondary" variant="label">Dovie đang viết…</AppText></View>;
}
export function QuickReplyList({ replies, onSelect }: { replies: string[]; onSelect: (reply: string) => void }) {
  return <View style={styles.replies}>{replies.map(reply => <Pressable key={reply} style={styles.reply} onPress={() => onSelect(reply)}><AppText color="brand" variant="label">{reply}</AppText></Pressable>)}</View>;
}
export function QuickReplyChip({ label, onPress }: { label: string; onPress: () => void }) { return <Chip label={label} onPress={onPress} />; }
export function ChatQuickActionList({ onCheckIn, onJournal, onSuggestion }: { onCheckIn: () => void; onJournal: () => void; onSuggestion: () => void }) { return <View style={styles.actions}><Chip label="Check-in" onPress={onCheckIn} /><Chip label="Journal" onPress={onJournal} /><Chip label="Gợi ý" onPress={onSuggestion} /></View>; }
export function ChatHero({ message }: { message: string }) { return <Card variant="soft"><AppText>{message}</AppText></Card>; }
export function ChatAvatar() { return <DovieAvatar accessibilityLabel="Dovie" decorative={false} size={36} variant="default" />; }
export function UserMessageBubble({ message }: { message: string }) { return <View style={styles.userBubble}><AppText color="inverse">{message}</AppText></View>; }
export function AssistantMessageBubble({ message }: { message: string }) { return <View style={styles.assistantBubble}><AppText>{message}</AppText></View>; }
export function DovieMessage({ message, variant = 'default' }: { message: string; variant?: 'default' | 'listening' | 'care' | 'rest' }) { return <View accessibilityRole="text" style={styles.dovieMessage}><DovieAvatar decorative size={34} variant={variant} /><AssistantMessageBubble message={message} /></View>; }
export function ChatActionButton({ label, onPress }: { label: string; onPress: () => void }) { return <Button label={label} size="sm" variant="secondary" onPress={onPress} />; }
export function ChatActionPanel({ children }: { children: React.ReactNode }) { return <View style={styles.actions}>{children}</View>; }
export function ChatMessageList({ children }: { children: React.ReactNode }) { return <View accessibilityRole="list" style={styles.messageList}>{children}</View>; }
export const ChatTextInput = TextInput;
export function ChatSendButton({ disabled = false, onPress }: { disabled?: boolean; onPress: () => void }) { return <IconButton accessibilityLabel="Gửi" disabled={disabled} icon={<MaterialCommunityIcons color={colors.text.inverse} name="arrow-up" size={27} />} tone="primary" onPress={onPress} />; }
export function ChatAttachmentButton({ onPress }: { onPress: () => void }) { return <IconButton accessibilityLabel="Đính kèm" icon={<AppText variant="label">+</AppText>} onPress={onPress} />; }
export function ChatVoiceButton({ onPress }: { onPress: () => void }) { return <IconButton accessibilityLabel="Gửi tin nhắn thoại" icon={<AppText variant="label">◉</AppText>} onPress={onPress} />; }
export const AIRetryButton = AIConnectionError;
export function ChatComposer({ value, onChangeText, onSend }: { value: string; onChangeText: (value: string) => void; onSend: () => void }) {
  return (
    <View style={styles.composer}>
      <TextInput accessibilityLabel="Tin nhắn" placeholder="Nhắn với Dovie..." style={styles.input} value={value} onChangeText={onChangeText} />
      <ChatSendButton onPress={onSend} />
    </View>
  );
}
export function AIConnectionError({ onRetry }: { onRetry: () => void }) {
  return (
    <View style={styles.error}>
      <AppText color="secondary">Dovie đang khó kết nối. Thử lại nhé.</AppText>
      <Button label="Thử lại" size="sm" onPress={onRetry} />
    </View>
  );
}
export function ChatHistorySheet({ items, onClose, onNewThread, onSelect, visible }: { items: { id: string; preview: string; title: string }[]; onClose: () => void; onNewThread: () => void; onSelect: (id: string) => void; visible: boolean }) { return <BottomSheet title="Cuộc trò chuyện" visible={visible} onClose={onClose}>{items.map(item => <Pressable key={item.id} accessibilityLabel={`Mở cuộc trò chuyện ${item.title}`} style={styles.historyRow} onPress={() => onSelect(item.id)}><AppText variant="label">{item.title}</AppText>{item.preview ? <AppText color="secondary" numberOfLines={1}>{item.preview}</AppText> : <AppText color="muted">Chưa có tin nhắn</AppText>}</Pressable>)}<Pressable accessibilityLabel="Cuộc trò chuyện mới" style={styles.newThread} onPress={onNewThread}><MaterialCommunityIcons color={colors.brand.primary} name="plus" size={22} /><AppText color="brand" variant="label">Cuộc trò chuyện mới</AppText></Pressable></BottomSheet>; }
const styles = StyleSheet.create({ actions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }, assistantBubble: { backgroundColor: colors.surface.soft, borderRadius: radius.md, flex: 1, padding: spacing.md }, composer: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm }, dovieMessage: { alignItems: 'flex-end', alignSelf: 'flex-start', flexDirection: 'row', gap: spacing.sm, maxWidth: '90%' }, error: { gap: spacing.sm }, header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }, headerActions: { flexDirection: 'row', gap: spacing.xs }, headerIcon: { backgroundColor: 'transparent', height: 40, width: 40 }, historyRow: { borderBottomColor: colors.border.soft, borderBottomWidth: 1, gap: spacing.xs, minHeight: 64, paddingVertical: spacing.sm }, input: { backgroundColor: colors.surface.card, borderColor: colors.border.default, borderRadius: radius.pill, borderWidth: 1, flex: 1, minHeight: 44, paddingHorizontal: spacing.lg }, messageList: { gap: spacing.md }, newThread: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm, minHeight: 48, paddingVertical: spacing.sm }, replies: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }, reply: { borderColor: colors.brand.primary, borderRadius: radius.pill, borderWidth: 1, paddingHorizontal: spacing.md, paddingVertical: spacing.sm }, typing: { alignItems: 'center', alignSelf: 'flex-start', backgroundColor: colors.surface.soft, borderRadius: radius.md, flexDirection: 'row', gap: spacing.sm, padding: spacing.md }, userBubble: { alignSelf: 'flex-end', backgroundColor: colors.brand.primary, borderRadius: radius.md, maxWidth: '82%', padding: spacing.md } });
