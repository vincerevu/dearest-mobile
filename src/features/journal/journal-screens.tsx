import { useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';
import { Screen, ScreenHeader, SectionHeader } from '@/components/layout';
import { Button, ConfirmDialog, SwitchRow } from '@/components/ui';
import { spacing } from '@/design-system/tokens';
import { JournalAIConsentNotice, JournalEditor, JournalEmptyState, JournalList, type JournalEntry } from './components';
import { useJournalStore } from './use-journal-store';

const formatDate = (value: string) => new Intl.DateTimeFormat('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value));
const toEntry = (entry: { id: string; createdAt: string; text: string; allowForPersonalization: boolean }): JournalEntry => ({ id: entry.id, dateLabel: formatDate(entry.createdAt), preview: entry.text, private: !entry.allowForPersonalization });

export function JournalListScreen() {
  const router = useRouter(); const entries = useJournalStore(state => state.entries);
  return <Screen scroll><View style={{ gap: spacing.lg }}><SectionHeader actionLabel="Viết mới" title="Nhật ký riêng tư" onAction={() => router.push('/journal/new')} /><JournalAIConsentNotice />
    {entries.length ? <JournalList entries={entries.map(toEntry)} onPressEntry={entry => router.push(`/journal/${entry.id}`)} /> : <JournalEmptyState onCreate={() => router.push('/journal/new')} />}
  </View></Screen>;
}

export function JournalEditorScreen() {
  const router = useRouter(); const { id } = useLocalSearchParams<{ id?: string }>(); const existing = useJournalStore(state => id ? state.entries.find(entry => entry.id === id) : undefined); const save = useJournalStore(state => state.save); const remove = useJournalStore(state => state.remove);
  const [text, setText] = React.useState(existing?.text ?? ''); const [allowForPersonalization, setAllowForPersonalization] = React.useState(existing?.allowForPersonalization ?? false); const [confirmDelete, setConfirmDelete] = React.useState(false);
  React.useEffect(() => { setText(existing?.text ?? ''); setAllowForPersonalization(existing?.allowForPersonalization ?? false); }, [existing?.allowForPersonalization, existing?.text]);
  const onSave = () => { if (!text.trim()) return; save({ id: existing?.id, createdAt: existing?.createdAt, text, allowForPersonalization }); router.replace('/journal'); };
  const onDelete = () => { if (!existing) return; remove(existing.id); setConfirmDelete(false); router.replace('/journal'); };
  return <Screen scroll><View style={{ gap: spacing.lg }}><ScreenHeader title={existing ? 'Chỉnh sửa nhật ký' : 'Nhật ký hôm nay'} onBack={() => router.back()} /><JournalEditor value={text} onChangeText={setText} /><SwitchRow description="Tắt mặc định. Nội dung chỉ được dùng cho context tương lai khi bạn bật." label="Cho phép AI cá nhân hóa" value={allowForPersonalization} onValueChange={setAllowForPersonalization} /><Button disabled={!text.trim()} label="Lưu nhật ký" onPress={onSave} />{existing ? <Button label="Xóa nhật ký" variant="destructive" onPress={() => setConfirmDelete(true)} /> : null}</View><ConfirmDialog confirmLabel="Xóa nhật ký" destructive message="Nội dung này sẽ bị xóa khỏi nhật ký và context cá nhân hóa tương lai." title="Xóa nhật ký?" visible={confirmDelete} onCancel={() => setConfirmDelete(false)} onConfirm={onDelete} /></Screen>;
}
