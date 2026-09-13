import { StyleSheet, View } from 'react-native';
import { Dovie } from '@/components/brand';
import { AppText, Badge, Card } from '@/components/ui';
import { colors, spacing } from '@/design-system/tokens';

/** Demonstration-only cycle content for onboarding; never bind it to user data. */
export function CyclePreviewCard({ daysUntilPeriod = 5 }: { daysUntilPeriod?: number }) {
  return <Card variant="soft"><View accessibilityLabel="Ví dụ xem trước chu kỳ" accessibilityRole="summary" style={styles.cycle}><Dovie decorative pose="welcome" size={88} /><View style={styles.copy}><AppText variant="headingMd">Còn khoảng {daysUntilPeriod} ngày</AppText><Badge label="Ví dụ minh họa" tone="predicted" /><AppText color="secondary" variant="label">Khi bắt đầu, Dearest sẽ dùng dữ liệu bạn tự ghi nhận.</AppText></View></View></Card>;
}

export function FeaturePreviewCard({ description, title }: { title: string; description: string }) {
  return <Card><View style={styles.copy}><AppText variant="headingMd">{title}</AppText><AppText color="secondary">{description}</AppText></View></Card>;
}

export function KnowledgePreviewCard({ category, readTime, title }: { title: string; category: string; readTime?: string }) {
  return <Card><View style={styles.copy}><AppText color="brand" variant="label">{category}</AppText><AppText variant="headingMd">{title}</AppText>{readTime ? <AppText color="muted" variant="label">{readTime}</AppText> : null}</View></Card>;
}

const styles = StyleSheet.create({
  copy: { flex: 1, gap: spacing.xs },
  cycle: { alignItems: 'center', flexDirection: 'row', gap: spacing.md },
  demo: { color: colors.brand.primary },
});
