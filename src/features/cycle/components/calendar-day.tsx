import type { PressableProps } from 'react-native';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from '@/components/ui';
import { colors, radius } from '@/design-system/tokens';

export type CalendarDayState = 'actual' | 'fertile' | 'normal' | 'predicted';
type CalendarDayProps = Omit<PressableProps, 'children' | 'style'> & {
  day: number;
  state?: CalendarDayState;
  isCurrentMonth?: boolean;
  isSelected?: boolean;
  isToday?: boolean;
  accessibilityLabel: string;
};

/** Pure calendar cell. The parent provides all date and cycle state. */
export function CalendarDay({ accessibilityLabel, day, disabled, isCurrentMonth = true, isSelected = false, isToday = false, state = 'normal', ...props }: CalendarDayProps) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ disabled: Boolean(disabled), selected: isSelected }}
      disabled={disabled}
      style={({ pressed }) => [styles.cell, styles[state], !isCurrentMonth && styles.outsideMonth, isToday && styles.today, isSelected && styles.selected, pressed && !disabled && styles.pressed]}
      {...props}
    >
      <AppText color={state === 'actual' ? 'inverse' : isCurrentMonth ? 'body' : 'muted'} variant="label">{day}</AppText>
      {state === 'actual' ? <View accessibilityElementsHidden style={styles.actualMark} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cell: { alignItems: 'center', borderRadius: radius.md, height: '100%', justifyContent: 'center', width: '100%' },
  normal: { backgroundColor: 'transparent' },
  actual: { backgroundColor: colors.cycle.actual },
  predicted: { backgroundColor: colors.cycle.predicted },
  fertile: { backgroundColor: colors.cycle.fertile },
  outsideMonth: { opacity: 0.42 },
  today: { borderColor: colors.cycle.today, borderWidth: 2 },
  selected: { borderColor: colors.brand.action, borderWidth: 3 },
  pressed: { opacity: 0.7 },
  actualMark: { backgroundColor: colors.surface.card, borderRadius: radius.pill, height: 4, position: 'absolute', top: 7, width: 4 },
});
