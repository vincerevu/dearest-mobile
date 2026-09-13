import { StyleSheet, View } from 'react-native';
import { AppText, Card, Chip } from '@/components/ui';
import { ModeHeroCard } from '@/components/future-shared';
import { spacing } from '@/design-system/tokens';

export function BabyContextSummary({ summary }: { summary: string }) { return <Card><View style={styles.stack}><AppText variant="headingMd">Bối cảnh của bé</AppText><AppText color="secondary">{summary}</AppText></View></Card>; }
export function BabyAgeBadge({ label }: { label: string }) { return <Chip label={label} onPress={() => {}} />; }
export function FeedingSummary({ summary }: { summary: string }) { return <BabyContextSummary summary={summary} />; }
export function SleepContextSummary({ summary }: { summary: string }) { return <BabyContextSummary summary={summary} />; }
export function MotherWellbeingCard({ message }: { message: string }) { return <ModeHeroCard description={message} eyebrow="Còn mẹ thì sao?" title="Wellbeing của mẹ" />; }
export function MotherEnergyCard({ level }: { level: string }) { return <Card><View style={styles.stack}><AppText variant="headingMd">Năng lượng của mẹ</AppText><AppText color="secondary">{level}</AppText></View></Card>; }
export function MentalLoadSelector({ value, onChange }: { value?: 'light' | 'medium' | 'heavy'; onChange: (value: 'light' | 'medium' | 'heavy') => void }) { return <View style={styles.choices}>{([{ key: 'light', label: 'Nhẹ' }, { key: 'medium', label: 'Vừa' }, { key: 'heavy', label: 'Nặng' }] as const).map(item => <Chip key={item.key} label={item.label} selected={value === item.key} onPress={() => onChange(item.key)} />)}</View>; }
export function RestSuggestionCard({ message, onPress }: { message: string; onPress?: () => void }) { return <ModeHeroCard actionLabel={onPress ? 'Thử ngay' : undefined} description={message} eyebrow="Một khoảng nghỉ" title="Mẹ cũng cần được chăm" onAction={onPress} />; }
export function MotherhoodInsightCard({ message }: { message: string }) { return <ModeHeroCard description={message} eyebrow="Từ ghi nhận của bạn" title="Một điều nhỏ để ý" />; }
const styles = StyleSheet.create({ choices: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }, stack: { gap: spacing.sm } });
