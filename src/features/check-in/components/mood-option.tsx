import type { ReactNode } from 'react';
import type { PressableProps } from 'react-native';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from '@/components/ui';
import { colors, radius, spacing } from '@/design-system/tokens';

type MoodValue = 'happy' | 'neutral' | 'sad' | 'irritated' | 'tired';
type MoodOptionProps = Omit<PressableProps, 'children' | 'style'> & {
  label: string;
  illustration: ReactNode;
  mood?: MoodValue;
  selected?: boolean;
};

/** A single-select mood option. The calling screen owns the selected value. */
export function MoodOption({ illustration, label, mood = 'neutral', selected = false, ...props }: MoodOptionProps) {
  return <Pressable accessibilityRole="radio" accessibilityState={{ checked: selected }} style={({ pressed }) => [styles.tile, selected && { backgroundColor: colors.mood[mood].soft, borderColor: colors.mood[mood].accent, borderWidth: 1.5 }, pressed && styles.pressed]} {...props}><View pointerEvents="none" style={styles.icon}>{illustration}</View><AppText align="center" variant="label">{label}</AppText></Pressable>;
}

const styles = StyleSheet.create({
  icon: { height: 36, justifyContent: 'center' },
  pressed: { opacity: 0.72 },
  tile: { alignItems: 'center', backgroundColor: colors.surface.card, borderColor: '#EEE7E8', borderRadius: 16, borderWidth: 1, flexBasis: '30%', flexGrow: 1, gap: spacing.xs, justifyContent: 'center', minHeight: 76, padding: spacing.sm },
});
