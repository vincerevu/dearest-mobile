import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from '@/components/ui';
import { colors, radius, spacing } from '@/design-system/tokens';

export type SupportGoal = { id: string; label: string; description?: string; icon?: ReactNode };

export function SupportGoalCard({ goal, selected, onPress }: { goal: SupportGoal; selected: boolean; onPress: () => void }) {
  return (
    <Pressable
      accessibilityLabel={goal.label}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      style={({ pressed }) => [styles.row, selected && styles.selected, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={[styles.radio, selected && styles.radioSelected]}>{selected ? <View style={styles.radioDot} /> : null}</View>
      {goal.icon ? <View style={styles.icon}>{goal.icon}</View> : null}
      <View style={styles.copy}>
        <AppText color={selected ? 'brand' : 'primary'} variant="label">{goal.label}</AppText>
        {goal.description ? <AppText color="secondary" variant="label">{goal.description}</AppText> : null}
      </View>
    </Pressable>
  );
}

/** A lightweight single-select question used throughout onboarding. */
export function SupportGoalGrid({ goals, selectedIds, onChange }: { goals: SupportGoal[]; selectedIds: string[]; onChange: (ids: string[]) => void }) {
  const selectedId = selectedIds[0];
  return <View accessibilityRole="radiogroup" style={styles.list}>{goals.map(goal => <SupportGoalCard key={goal.id} goal={goal} selected={goal.id === selectedId} onPress={() => onChange([goal.id])} />)}</View>;
}

const styles = StyleSheet.create({
  copy: { flex: 1, gap: 2 },
  icon: { alignItems: 'center', justifyContent: 'center' },
  list: { gap: spacing.sm },
  pressed: { opacity: 0.76 },
  radio: { alignItems: 'center', borderColor: colors.text.muted, borderRadius: radius.pill, borderWidth: 1.5, height: 22, justifyContent: 'center', width: 22 },
  radioDot: { backgroundColor: colors.brand.primary, borderRadius: radius.pill, height: 10, width: 10 },
  radioSelected: { borderColor: colors.brand.primary, borderWidth: 2 },
  row: { alignItems: 'center', backgroundColor: colors.surface.card, borderColor: colors.border.default, borderRadius: radius.md, borderWidth: 1, flexDirection: 'row', gap: spacing.md, minHeight: 72, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  selected: { backgroundColor: colors.brand.soft, borderColor: colors.brand.primary },
});
