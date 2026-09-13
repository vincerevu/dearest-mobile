import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText, Badge, Card, Button } from '@/components/ui';
import { spacing } from '@/design-system/tokens';
import { CycleRing, CycleStat } from '@/features/cycle/components';

export function HomeGreeting({ eyebrow = 'Your day', greeting = 'Hello', name }: { eyebrow?: string; greeting?: string; name?: string }) {
  return (
    <View style={styles.greeting}>
      <AppText color="secondary" variant="label">{eyebrow}</AppText>
      <AppText variant="headingLg">{name ? `${greeting} ${name}` : greeting}</AppText>
    </View>
  );
}

export function CycleCountdown({ days }: { days: number }) {
  return (
    <View style={styles.countdown}>
      <AppText color="brand" variant="metric">{days}</AppText>
      <AppText color="secondary" variant="label">ngày nữa</AppText>
    </View>
  );
}

export function CyclePhaseBadge({ label, tone = 'predicted' }: { label: string; tone?: 'actual' | 'predicted' | 'calculated' }) {
  return <Badge label={label} tone={tone} />;
}

export function HomeCycleCard({ currentDay, phaseLabel, stats, title = 'Your cycle', totalDays }: { title?: string; currentDay: number; totalDays: number; phaseLabel: string; stats: { label: string; value: string; icon?: ReactNode }[] }) {
  return (
    <Card padding="lg">
      <View style={styles.card}>
        <View style={styles.top}>
          <View style={styles.copy}>
            <AppText variant="headingMd">{title}</AppText>
            <CyclePhaseBadge label={phaseLabel} />
          </View>
          <CycleRing currentDay={currentDay} size={116} totalDays={totalDays} />
        </View>
        <View style={styles.stats}>{stats.map(stat => <CycleStat key={stat.label} icon={stat.icon} label={stat.label} value={stat.value} />)}</View>
      </View>
    </Card>
  );
}

export const HomeHeader = HomeGreeting;

export function HomeSuggestionCard({ actionLabel = 'View suggestion', description, onPress, title }: { actionLabel?: string; title: string; description: string; onPress?: () => void }) {
  return <Card variant="soft"><View style={styles.card}><AppText variant="headingMd">{title}</AppText><AppText color="secondary">{description}</AppText>{onPress ? <Button label={actionLabel} size="sm" onPress={onPress} /> : null}</View></Card>;
}

export function HomeServiceCard({ icon, label, onPress }: { icon?: ReactNode; label: string; onPress: () => void }) {
  return <Button accessibilityLabel={label} label={label} variant="secondary" onPress={onPress}>{icon ? <View style={styles.serviceIcon}>{icon}<AppText variant="label">{label}</AppText></View> : undefined}</Button>;
}

export function HomeServicesGrid({ children }: { children: ReactNode }) { return <View style={styles.services}>{children}</View>; }

const styles = StyleSheet.create({ card: { gap: spacing.lg }, copy: { flex: 1, gap: spacing.sm, minWidth: 0 }, countdown: { alignItems: 'center', gap: spacing.xs }, greeting: { gap: spacing.xs }, serviceIcon: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm, justifyContent: 'center' }, services: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }, stats: { flexDirection: 'row', gap: spacing.sm }, top: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' } });
