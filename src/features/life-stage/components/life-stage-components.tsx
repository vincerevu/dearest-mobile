import { StyleSheet, View } from 'react-native';
import { AppText, Button, Card } from '@/components/ui';
import { LifeStageCard, type LifeStage } from '@/components/future-shared';
import { spacing } from '@/design-system/tokens';

export function LifeStageSelector({ stages, value, onChange }: { stages: { stage: LifeStage; title: string; description: string; disabled?: boolean }[]; value?: LifeStage; onChange: (stage: LifeStage) => void }) { return <View style={styles.stack}>{stages.map(item => <LifeStageCard key={item.stage} {...item} selected={value === item.stage} onPress={() => onChange(item.stage)} />)}</View>; }
export function LifeStageSummary({ description, title }: { stage: LifeStage; title: string; description: string }) { return <View style={styles.summary}><AppText variant="headingLg">{title.replace('Hành trình: ', '')}</AppText><AppText color="secondary">{description}</AppText></View>; }
/** @deprecated Use LifeStageSummary. */
export const LifeStageTransitionCard = LifeStageSummary;
export function TransitionConfirmationSheet({ loading = false, onConfirm, title }: { title: string; loading?: boolean; onConfirm: () => void }) { return <View style={styles.confirm}><AppText color="secondary" variant="label">Dearest sẽ điều chỉnh nội dung theo {title.replace('Hành trình: ', '').toLowerCase()}.</AppText><Button label="Xác nhận" loading={loading} onPress={onConfirm} /></View>; }
export function BirthTransitionCard({ onPress }: { onPress: () => void }) { return <Card variant="soft"><View style={styles.stack}><AppText variant="headingMd">Chuyển sang sau sinh</AppText><AppText color="secondary">Khi bạn sẵn sàng, Dearest sẽ chuyển sang hành trình sau sinh.</AppText><Button label="Bắt đầu" onPress={onPress} /></View></Card>; }
export function ModeHistoryCard({ entries }: { entries: { id: string; label: string; detail?: string }[] }) { return <Card><View style={styles.stack}><AppText variant="headingMd">Lịch sử hành trình</AppText>{entries.map(item => <View key={item.id}><AppText variant="label">{item.label}</AppText>{item.detail ? <AppText color="secondary" variant="label">{item.detail}</AppText> : null}</View>)}</View></Card>; }
export function ModeContextNotice({ message }: { message: string }) { return <Card variant="soft"><AppText color="secondary">{message}</AppText></Card>; }
const styles = StyleSheet.create({ confirm: { gap: spacing.md, paddingTop: spacing.md }, stack: { gap: spacing.sm }, summary: { gap: spacing.sm } });
