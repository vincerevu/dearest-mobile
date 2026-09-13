import { StyleSheet, View } from 'react-native';
import { AppText, Card, Chip, HealthSafetyNotice } from '@/components/ui';
import { ModeHeroCard, TimelineCard, type TimelineItem } from '@/components/future-shared';
import { spacing } from '@/design-system/tokens';

export function PostpartumWeekCard({ week }: { week?: number }) { return <Card variant="soft"><View style={styles.stack}><AppText color="secondary" variant="label">Sau sinh</AppText><AppText variant="headingLg">{week ? `Tuần ${week}` : 'Mới bắt đầu hành trình'}</AppText></View></Card>; }
export function RecoveryCheckIn({ children }: { children: React.ReactNode }) { return <Card><View style={styles.stack}><AppText variant="headingMd">Check-in hồi phục</AppText><AppText color="secondary" variant="label">Ghi nhận cảm nhận của mẹ theo nhịp riêng.</AppText>{children}</View></Card>; }
export function RecoveryStatusCard({ summary }: { summary: string }) { return <ModeHeroCard description={summary} eyebrow="Từ ghi nhận của bạn" title="Cơ thể mẹ hôm nay" />; }
export function SleepSummary({ detail }: { detail: string }) { return <Card><View style={styles.stack}><AppText variant="headingMd">Giấc ngủ của mẹ</AppText><AppText color="secondary">{detail}</AppText></View></Card>; }
export function SleepDebtCard({ message }: { message: string }) { return <SleepSummary detail={message} />; }
export function SupportCheck({ value, onChange }: { value?: 'supported' | 'some' | 'low' | 'skip'; onChange: (value: 'supported' | 'some' | 'low' | 'skip') => void }) { return <Card><View style={styles.stack}><AppText variant="headingMd">Hôm nay bạn được hỗ trợ thế nào?</AppText><View style={styles.choices}>{([{ key: 'supported', label: 'Có' }, { key: 'some', label: 'Một chút' }, { key: 'low', label: 'Không nhiều' }, { key: 'skip', label: 'Chưa muốn trả lời' }] as const).map(item => <Chip key={item.key} label={item.label} selected={value === item.key} onPress={() => onChange(item.key)} />)}</View></View></Card>; }
export function SupportLevelSelector(props: { value?: 'supported' | 'some' | 'low' | 'skip'; onChange: (value: 'supported' | 'some' | 'low' | 'skip') => void }) { return <SupportCheck {...props} />; }
export function MentalLoadCard({ summary }: { summary: string }) { return <Card><View style={styles.stack}><AppText variant="headingMd">Những điều mẹ đang gánh</AppText><AppText color="secondary">{summary}</AppText></View></Card>; }
export function FeedingContextCard({ summary }: { summary: string }) { return <Card><View style={styles.stack}><AppText variant="headingMd">Bối cảnh cho bé bú</AppText><AppText color="secondary">{summary}</AppText></View></Card>; }
export function RecoveryTimeline({ items }: { items: TimelineItem[] }) { return <TimelineCard items={items} title="Nhịp hồi phục" />; }
export function PostpartumInsightCard({ message }: { message: string }) { return <ModeHeroCard description={message} eyebrow="Nhìn lại nhẹ nhàng" title="Một điều Dearest nhận thấy" />; }
export function PostpartumSafetyCard({ message }: { message: string }) { return <HealthSafetyNotice message={message} title="Khi nào nên tìm hỗ trợ" />; }
export function PartnerHelpCTA({ onPress }: { onPress: () => void }) { return <Chip label="Chia sẻ điều mình cần" onPress={onPress} />; }
const styles = StyleSheet.create({ choices: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }, stack: { gap: spacing.sm } });
