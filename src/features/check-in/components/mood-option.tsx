import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import type { ReactNode } from 'react';
import type { PressableProps } from 'react-native';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from '@/components/ui';
import { colors, spacing } from '@/design-system/tokens';

type MoodValue = 'happy' | 'neutral' | 'sad' | 'irritated' | 'tired';
type MoodOptionProps = Omit<PressableProps, 'children' | 'style'> & {
  label: string;
  illustration: ReactNode;
  mood?: MoodValue;
  selected?: boolean;
};

/** A single-select mood option. The calling screen owns the selected value. */
export function MoodOption({ illustration, label, mood = 'neutral', selected = false, ...props }: MoodOptionProps) {
  return <Pressable accessibilityRole="radio" accessibilityState={{ checked: selected }} style={({ pressed }) => [styles.option, selected && { backgroundColor: colors.mood[mood].soft, borderColor: colors.mood[mood].accent, borderWidth: 1.5 }, pressed && styles.pressed]} {...props}><View pointerEvents="none" style={styles.icon}>{illustration}</View><AppText align="center" numberOfLines={2} style={styles.label} variant="label">{label}</AppText>{selected ? <MaterialCommunityIcons color={colors.mood[mood].accent} name="check-circle" size={18} style={styles.check} /> : null}</Pressable>;
}

const styles = StyleSheet.create({
  check: { position: 'absolute', right: spacing.xs, top: spacing.xs },
  icon: { alignItems: 'center', height: 28, justifyContent: 'center' },
  label: { minHeight: 18 },
  option: { alignItems: 'center', backgroundColor: colors.surface.card, borderColor: colors.border.default, borderRadius: 14, borderWidth: 1, flex: 1, flexBasis: 0, gap: spacing.xs, justifyContent: 'center', minHeight: 68, minWidth: 0, paddingHorizontal: spacing.xs, paddingVertical: spacing.sm },
  pressed: { opacity: 0.72 },
});
