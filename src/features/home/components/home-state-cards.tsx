import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, View } from 'react-native';
import { AppText, Badge, DisclosureRow, TextAction } from '@/components/ui';
import { colors, spacing } from '@/design-system/tokens';

export function TodaySummaryCard({ energy, mood, onSuggestion }: { mood: string; energy: string; onSuggestion: () => void }) { return <View style={styles.flatRow}><View style={styles.metrics}><Metric icon="emoticon-outline" label="Tâm trạng" value={mood} /><Metric icon="lightning-bolt-outline" label="Năng lượng" value={energy} /></View><TextAction label="Xem lại check-in" onPress={onSuggestion} /></View>; }
export function UpcomingPredictionCard({ days, onCalendar }: { days: number; onCalendar: () => void }) { return <View style={styles.flatRow}><View style={styles.stack}><AppText color="muted" variant="label">SẮP TỚI</AppText><AppText variant="headingMd">Khoảng {days} ngày nữa</AppText><AppText color="secondary">Kỳ kinh tiếp theo là ước tính dựa trên chu kỳ hiện tại.</AppText><Badge label="Ước tính" tone="predicted" /></View><TextAction label="Xem lịch" onPress={onCalendar} /></View>; }

export function HomeDiscoverCard({ onPress }: { onPress: () => void }) { return <View style={styles.articleSection}><AppText color="muted" variant="label">GỢI Ý CHO HÔM NAY</AppText><DisclosureRow description="3 phút đọc" title="Hiểu nhịp cơ thể của bạn" onPress={onPress} /></View>; }

function Metric({ icon, label, value }: { icon: keyof typeof MaterialCommunityIcons.glyphMap; label: string; value: string }) { return <View style={styles.metric}><MaterialCommunityIcons color={colors.brand.primary} name={icon} size={20} /><View><AppText color="secondary" variant="label">{label}</AppText><AppText variant="label">{value}</AppText></View></View>; }
const styles = StyleSheet.create({ articleSection: { gap: spacing.xs }, flatRow: { borderBottomColor: colors.border.soft, borderBottomWidth: StyleSheet.hairlineWidth, gap: spacing.md, paddingVertical: spacing.lg }, metric: { alignItems: 'center', flex: 1, flexDirection: 'row', gap: spacing.sm }, metrics: { flexDirection: 'row', gap: spacing.sm }, stack: { gap: spacing.sm } });
