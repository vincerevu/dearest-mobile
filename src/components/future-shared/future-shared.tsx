import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import type { ReactNode } from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText, Badge, Button, Card, IconButton, ProgressBar, SelectionRow } from '@/components/ui';
import { colors, radius, spacing } from '@/design-system/tokens';

export type LifeStage = 'cycle' | 'ttc' | 'pregnancy' | 'postpartum' | 'motherhood';
export type ContextSource = 'user_reported' | 'system_calculated' | 'predicted' | 'ai_interpretation' | 'shared_by_partner';
export type PermissionState = 'shared' | 'not_shared' | 'paused' | 'revoked' | 'pending';
export type ChecklistItemModel = { id: string; title: string; description?: string; completed: boolean; assignee?: 'user' | 'partner'; dueAt?: string; disabled?: boolean };
export type TimelineItem = { id: string; title: string; description?: string; dateLabel?: string; status?: 'complete' | 'current' | 'upcoming' };

const stageCopy: Record<LifeStage, string> = { cycle: 'Chu kỳ', ttc: 'Chuẩn bị mang thai', pregnancy: 'Mang thai', postpartum: 'Sau sinh', motherhood: 'Motherhood' };
const sourceCopy: Record<ContextSource, string> = { user_reported: 'Do bạn ghi nhận', system_calculated: 'Dearest tính toán', predicted: 'Dự đoán', ai_interpretation: 'Dearest nhận ra', shared_by_partner: 'Được chia sẻ bởi bạn' };
const permissionCopy: Record<PermissionState, string> = { shared: 'Đang chia sẻ', not_shared: 'Không chia sẻ', paused: 'Đã tạm dừng', revoked: 'Đã thu hồi', pending: 'Đang chờ' };

export function LifeStageBadge({ compact = false, label, stage }: { stage: LifeStage; label?: string; compact?: boolean }) { return <View style={[styles.stage, styles[stage], compact && styles.compact]}><AppText color="body" variant="label">{label ?? stageCopy[stage]}</AppText></View>; }
export function LifeStageCard({ description, disabled = false, illustration: _illustration, onPress, selected = false, stage, title }: { stage: LifeStage; title: string; description: string; illustration?: ImageSourcePropType; selected?: boolean; disabled?: boolean; onPress?: () => void }) { return <SelectionRow description={description} disabled={disabled} leading={<LifeStageBadge compact stage={stage} />} selected={selected} title={title} onPress={onPress ?? (() => {})} />; }
export function ModeHeroCard({ actionLabel, description, eyebrow, illustration: _illustration, mascotVariant: _mascotVariant, onAction, title }: { eyebrow?: string; title: string; description?: string; mascotVariant?: string; illustration?: ImageSourcePropType; actionLabel?: string; onAction?: () => void }) {
  return (
    <Card variant="soft">
      <View style={styles.stack}>
        {eyebrow ? <AppText color="brand" variant="label">{eyebrow}</AppText> : null}
        <AppText variant="headingMd">{title}</AppText>
        {description ? <AppText color="secondary">{description}</AppText> : null}
        {actionLabel && onAction ? <Button label={actionLabel} size="sm" onPress={onAction} /> : null}
      </View>
    </Card>
  );
}
export function ContextSourceBadge({ source }: { source: ContextSource }) { return <Badge label={sourceCopy[source]} tone={source === 'predicted' ? 'predicted' : source === 'ai_interpretation' ? 'aiInsight' : source === 'system_calculated' ? 'calculated' : 'userReported'} />; }
export function SafeSummaryCard({ icon, privacyLabel = 'Không hiển thị dữ liệu riêng tư', sourceLabel, summary, title = 'Tóm tắt dành cho bạn' }: { title?: string; summary: string; sourceLabel?: string; privacyLabel?: string; icon?: ReactNode }) {
  return (
    <Card>
      <View style={styles.stack}>
        {icon ? <View>{icon}</View> : null}
        <AppText variant="headingMd">{title}</AppText>
        <AppText color="secondary">{summary}</AppText>
        {sourceLabel ? <AppText color="muted" variant="label">{sourceLabel}</AppText> : null}
        <AppText color="muted" variant="label">{privacyLabel}</AppText>
      </View>
    </Card>
  );
}
export function PermissionStatusBadge({ state }: { state: PermissionState }) { return <Badge label={permissionCopy[state]} tone={state === 'shared' ? 'userReported' : state === 'pending' ? 'aiInsight' : 'calculated'} />; }
export function ProgressSummaryCard({ current, label, progress, secondaryLabel, total }: { current: number; total: number; label: string; secondaryLabel?: string; progress: number }) {
  const normalized = Math.max(0, Math.min(1, progress)); return (
    <Card>
      <View style={styles.stack}>
        <View style={styles.split}>
          <AppText variant="headingMd">{label}</AppText>
          <AppText color="brand" variant="label">
            {current}
            /
            {total}
          </AppText>
        </View>
        <ProgressBar initialProgress={normalized} />
        <AppText color="secondary" variant="label">{secondaryLabel ?? `${Math.round(normalized * 100)}% hoàn thành`}</AppText>
      </View>
    </Card>
  );
}
export function ChecklistItem({ item, onToggle }: { item: ChecklistItemModel; onToggle?: (id: string, completed: boolean) => void }) {
  return (
    <Pressable accessibilityLabel={item.title} accessibilityRole="checkbox" accessibilityState={{ checked: item.completed, disabled: item.disabled }} disabled={item.disabled} style={({ pressed }) => [styles.checkItem, item.completed && styles.completed, pressed && !item.disabled && styles.pressed]} onPress={() => onToggle?.(item.id, !item.completed)}>
      <View style={[styles.check, item.completed && styles.checkDone]}>{item.completed ? <MaterialCommunityIcons color={colors.text.inverse} name="check" size={16} /> : null}</View>
      <View style={styles.copy}>
        <AppText style={item.completed ? styles.struck : undefined} variant="label">{item.title}</AppText>
        {item.description ? <AppText color="secondary" variant="label">{item.description}</AppText> : null}
        {item.assignee || item.dueAt
          ? (
              <AppText color="muted" variant="label">
                {item.assignee === 'partner' ? 'Partner' : 'Bạn'}
                {item.dueAt ? ` · ${item.dueAt}` : ''}
              </AppText>
            )
          : null}
      </View>
    </Pressable>
  );
}
export function ChecklistGroup({ collapsible = false, description, items, onToggleItem, title }: { title: string; description?: string; items: ChecklistItemModel[]; collapsible?: boolean; onToggleItem?: (id: string, completed: boolean) => void }) {
  return (
    <Card>
      <View style={styles.stack}>
        <View style={styles.split}>
          <View style={styles.copy}>
            <AppText variant="headingMd">{title}</AppText>
            {description ? <AppText color="secondary" variant="label">{description}</AppText> : null}
          </View>
          {collapsible ? <IconButton accessibilityLabel="Thu gọn danh sách" icon={<MaterialCommunityIcons color={colors.navigation.icon} name="chevron-up" size={22} />} onPress={() => {}} /> : null}
        </View>
        {items.map(item => <ChecklistItem key={item.id} item={item} onToggle={onToggleItem} />)}
      </View>
    </Card>
  );
}
export function TimelineCard({ items, title }: { title: string; items: TimelineItem[] }) {
  return (
    <Card>
      <View style={styles.stack}>
        <AppText variant="headingMd">{title}</AppText>
        {items.map(item => (
          <View key={item.id} style={styles.timeline}>
            <View style={[styles.timelineDot, item.status === 'complete' && styles.checkDone]} />
            <View style={styles.copy}>
              <AppText variant="label">{item.title}</AppText>
              {item.description ? <AppText color="secondary" variant="label">{item.description}</AppText> : null}
              {item.dateLabel ? <AppText color="muted" variant="label">{item.dateLabel}</AppText> : null}
            </View>
          </View>
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({ check: { alignItems: 'center', borderColor: colors.border.default, borderRadius: 12, borderWidth: 1, height: 24, justifyContent: 'center', width: 24 }, checkDone: { backgroundColor: colors.brand.primary, borderColor: colors.brand.primary }, checkItem: { alignItems: 'flex-start', flexDirection: 'row', gap: spacing.md, minHeight: 44 }, compact: { paddingHorizontal: spacing.sm, paddingVertical: 2 }, completed: { opacity: 0.72 }, copy: { flex: 1, gap: spacing.xs }, cycle: { backgroundColor: colors.surface.soft }, motherhood: { backgroundColor: '#FFF4F5' }, postpartum: { backgroundColor: '#FFF1F3' }, pregnancy: { backgroundColor: colors.brand.soft }, pressed: { opacity: 0.75 }, split: { alignItems: 'center', flexDirection: 'row', gap: spacing.md, justifyContent: 'space-between' }, stage: { alignSelf: 'flex-start', borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.xs }, stack: { gap: spacing.sm }, struck: { textDecorationLine: 'line-through' }, timeline: { flexDirection: 'row', gap: spacing.md }, timelineDot: { backgroundColor: colors.border.default, borderRadius: 99, height: 12, marginTop: 4, width: 12 }, ttc: { backgroundColor: colors.cycle.fertile } });
