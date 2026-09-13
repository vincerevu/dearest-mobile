import { useRouter } from 'expo-router';
import * as React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dovie, DovieMicro } from '@/components/brand';
import { AppText, HealthSafetyNotice } from '@/components/ui';
import { colors, spacing } from '@/design-system/tokens';
import { todayKey } from '@/features/core/use-core-store';
import { ChatComposer, ChatHeader, ChatHistorySheet, ChatMessageList, ChatQuickActionList, DovieMessage, QuickReplyList, UserMessageBubble } from './components';
import { useChatStore } from './use-chat-store';

const quickReplies = ['Hơi mệt', 'Tớ buồn nhẹ', 'Tớ đau bụng', 'Tớ ổn'];

export function DovieChatScreen() {
  const router = useRouter(); const [draft, setDraft] = React.useState(''); const [historyVisible, setHistoryVisible] = React.useState(false);
  const activeThreadId = useChatStore(state => state.activeThreadId); const threads = useChatStore(state => state.threads); const createThread = useChatStore(state => state.createThread); const selectThread = useChatStore(state => state.selectThread); const sendMessage = useChatStore(state => state.sendMessage);
  const activeThread = threads.find(thread => thread.id === activeThreadId) ?? threads[0]; const messages = activeThread?.messages ?? [];
  const lastUserMessage = [...messages].reverse().find(message => message.role === 'user')?.text ?? '';
  const hasSafetyContext = /đau|chóng mặt|khó thở|ra máu/i.test(lastUserMessage);
  const hasConversation = messages.length > 0;

  const send = (value = draft) => {
    if (!value.trim()) return;
    sendMessage(value); setDraft('');
  };
  const openThread = (id: string) => { selectThread(id); setHistoryVisible(false); };
  const newThread = () => { createThread(); setHistoryVisible(false); };

  return <SafeAreaView style={styles.safe}><KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', default: undefined })} style={styles.safe}><View style={styles.header}><ChatHeader onHistory={() => setHistoryVisible(true)} onMenu={() => {}} /></View><ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled"><View style={styles.stack}>
    {!hasConversation ? <View style={styles.empty}><Dovie decorative motion="idle" pose="listening" size={164} /><View style={styles.emptyCopy}><AppText variant="headingMd">Mình ở đây để lắng nghe cậu.</AppText><AppText align="center" color="secondary">Hôm nay cậu thấy thế nào?</AppText></View><QuickReplyList replies={quickReplies} onSelect={send} /></View> : <><ChatMessageList>{messages.map(message => message.role === 'user' ? <UserMessageBubble key={message.id} message={message.text} /> : <DovieMessage key={message.id} message={message.text} variant={hasSafetyContext ? 'care' : 'listening'} />)}</ChatMessageList><ChatQuickActionList onCheckIn={() => router.push(`/check-in/${todayKey()}`)} onJournal={() => router.push('/journal/new')} onSuggestion={() => router.push('/suggestions/today')} /></>}
    {hasSafetyContext ? <View style={styles.safety}><DovieMicro decorative size={36} state="gentleAlert" /><HealthSafetyNotice message="Nếu triệu chứng nặng, kéo dài hoặc làm bạn lo lắng, hãy liên hệ cơ sở y tế phù hợp." title="Lưu ý sức khỏe" /></View> : null}
  </View></ScrollView><View style={styles.composer}><ChatComposer value={draft} onChangeText={setDraft} onSend={() => send()} /></View><ChatHistorySheet items={threads} visible={historyVisible} onClose={() => setHistoryVisible(false)} onNewThread={newThread} onSelect={openThread} /></KeyboardAvoidingView></SafeAreaView>;
}

const styles = StyleSheet.create({ composer: { backgroundColor: colors.background.primary, borderTopColor: colors.border.soft, borderTopWidth: 1, paddingHorizontal: spacing.xl, paddingVertical: spacing.md }, content: { flexGrow: 1, padding: spacing.xl }, empty: { alignItems: 'center', flex: 1, gap: spacing.lg, justifyContent: 'center', minHeight: 420 }, emptyCopy: { alignItems: 'center', gap: spacing.xs }, header: { paddingHorizontal: spacing.xl, paddingTop: spacing.md }, safe: { backgroundColor: colors.background.primary, flex: 1 }, safety: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm }, stack: { gap: spacing.lg } });
