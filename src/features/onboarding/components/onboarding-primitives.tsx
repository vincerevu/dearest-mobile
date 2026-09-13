import type { PropsWithChildren, ReactNode } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText, Button, PaginationDots } from '@/components/ui';
import { colors, spacing } from '@/design-system/tokens';

export function OnboardingLayout({ children }: PropsWithChildren) {
  return <View style={styles.layout}>{children}</View>;
}

export function OnboardingHeader({ currentStep, onSkip, totalSteps }: { currentStep: number; totalSteps: number; onSkip?: () => void }) {
  return (
    <View style={styles.header}>
      <PaginationDots activeIndex={currentStep} count={totalSteps} />
      {onSkip ? <Pressable accessibilityRole="button" onPress={onSkip}><AppText color="secondary" variant="label">Bỏ qua</AppText></Pressable> : null}
    </View>
  );
}

export function OnboardingTitle({ children }: PropsWithChildren) {
  return <AppText variant="headingLg">{children}</AppText>;
}
export function OnboardingSubtitle({ children }: PropsWithChildren) {
  return <AppText color="secondary">{children}</AppText>;
}

export function OnboardingActions({ primaryLabel, secondaryLabel, onPrimary, onSecondary }: { primaryLabel: string; onPrimary: () => void; secondaryLabel?: string; onSecondary?: () => void }) {
  return (
    <View style={styles.actions}>
      <Button label={primaryLabel} onPress={onPrimary} />
      {secondaryLabel && onSecondary ? <Pressable accessibilityRole="button" style={styles.backAction} onPress={onSecondary}><MaterialCommunityIcons color={colors.brand.primary} name="chevron-left" size={20} /><AppText color="brand" variant="label">{secondaryLabel}</AppText></Pressable> : null}
    </View>
  );
}

export function PreferenceSection({ children, title }: PropsWithChildren<{ title: string }>) {
  return (
    <View style={styles.section}>
      <AppText variant="headingMd">{title}</AppText>
      <View style={styles.items}>{children}</View>
    </View>
  );
}

export function PreferenceItem({ icon, label, selected = false, onPress }: { icon?: ReactNode; label: string; selected?: boolean; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" accessibilityState={{ selected }} style={[styles.preference, selected && styles.selected]} onPress={onPress}>
      {icon}
      <AppText align="center" variant="label">{label}</AppText>
    </Pressable>
  );
}
export const FeatureTab = PreferenceItem;
export function FeatureTabs({ children }: PropsWithChildren) { return <View style={styles.items}>{children}</View>; }
export const PreferenceGrid = FeatureTabs;
export function OnboardingPager({ activeIndex, count }: { activeIndex: number; count: number }) { return <PaginationDots activeIndex={activeIndex} count={count} />; }

const styles = StyleSheet.create({ actions: { gap: spacing.sm }, backAction: { alignItems: 'center', alignSelf: 'center', flexDirection: 'row', minHeight: 40 }, header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }, items: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md }, layout: { backgroundColor: colors.background.primary, flex: 1, gap: spacing.xl, padding: spacing.xl }, preference: { alignItems: 'center', backgroundColor: colors.surface.card, borderColor: colors.border.default, borderRadius: 18, borderWidth: 1, gap: spacing.sm, minHeight: 92, minWidth: 100, padding: spacing.md }, section: { gap: spacing.md }, selected: { borderColor: colors.brand.primary, borderWidth: 2 } });
