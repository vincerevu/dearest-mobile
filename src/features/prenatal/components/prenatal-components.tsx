import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, View } from 'react-native';
import { AppText, Card, Chip } from '@/components/ui';
import { ChecklistGroup, ChecklistItem, ProgressSummaryCard, type ChecklistItemModel } from '@/components/future-shared';
import { colors, spacing } from '@/design-system/tokens';

export function PrenatalProgressCard({ current, total }: { current: number; total: number }) { return <ProgressSummaryCard current={current} label="Chuẩn bị trước sinh" progress={total ? current / total : 0} total={total} />; }
export function HospitalBagCategory({ children, title }: { title: string; children: React.ReactNode }) { return <Card><View style={styles.stack}><AppText variant="headingMd">{title}</AppText>{children}</View></Card>; }
export function HospitalBagItem({ item, onToggle }: { item: ChecklistItemModel; onToggle?: (id: string, completed: boolean) => void }) { return <ChecklistItem item={item} onToggle={onToggle} />; }
export function BirthPreferenceCard({ summary }: { summary: string }) { return <Card variant="soft"><View style={styles.stack}><AppText variant="headingMd">Điều bạn muốn thảo luận</AppText><AppText color="secondary">{summary}</AppText><AppText color="muted" variant="label">Đây là ghi chú để trao đổi với đội ngũ chăm sóc.</AppText></View></Card>; }
export function PartnerTask({ completed, onToggle, title }: { title: string; completed: boolean; onToggle: () => void }) { return <Chip icon={completed ? <MaterialCommunityIcons color={colors.brand.primary} name="check-circle" size={18} /> : undefined} label={title} selected={completed} onPress={onToggle} />; }
export function DocumentChecklist({ items }: { items: ChecklistItemModel[] }) { return <ChecklistGroup items={items} title="Giấy tờ cần chuẩn bị" />; }
export function DueDateCountdown({ days }: { days?: number }) { return <Card variant="soft"><View style={styles.stack}><AppText color="secondary" variant="label">Ngày dự sinh</AppText><AppText variant="headingMd">{days === undefined ? 'Chưa có ngày dự kiến' : `Còn khoảng ${days} ngày`}</AppText><AppText color="muted" variant="label">Mốc dự kiến, có thể thay đổi.</AppText></View></Card>; }
const styles = StyleSheet.create({ stack: { gap: spacing.sm } });
