import type { PressableProps } from 'react-native';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from '@/components/ui';
import { colors, radius, spacing } from '@/design-system/tokens';

type EnergyLevel = 'low' | 'medium' | 'good';
type EnergyOptionProps = Omit<PressableProps, 'children'> & { label: string; level: EnergyLevel; selected?: boolean };

const filledBars: Record<EnergyLevel, number> = { low: 1, medium: 2, good: 3 };
const levelColor: Record<EnergyLevel, string> = { low: colors.energy.low, medium: colors.energy.medium, good: colors.energy.good };

export function EnergyOption({ accessibilityLabel, disabled, label, level, selected = false, ...props }: EnergyOptionProps) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel ?? `${label}, năng lượng ${level}`}
      accessibilityRole="radio"
      accessibilityState={{ disabled: Boolean(disabled), selected }}
      disabled={disabled}
      style={({ pressed }) => [styles.option, selected && styles.selected, disabled && styles.disabled, pressed && !disabled && styles.pressed]}
      {...props}
    >
      <View accessibilityElementsHidden style={styles.bars}>
        {[1, 2, 3].map(bar => <View key={bar} style={[styles.bar, { height: bar * 7 }, bar <= filledBars[level] && { backgroundColor: levelColor[level] }]} />)}
      </View>
      <AppText color={selected ? 'brand' : 'body'} variant="label">{label}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  option: { alignItems: 'center', backgroundColor: colors.surface.card, borderColor: colors.border.default, borderRadius: 14, borderWidth: 1, flex: 1, gap: spacing.xs, minHeight: 64, justifyContent: 'center', padding: spacing.sm },
  selected: { backgroundColor: colors.surface.soft, borderColor: colors.brand.action, borderWidth: 1.5 },
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.76 },
  bars: { alignItems: 'flex-end', flexDirection: 'row', gap: 3, height: 24 },
  bar: { backgroundColor: colors.border.default, borderRadius: radius.pill, width: 6 },
});
