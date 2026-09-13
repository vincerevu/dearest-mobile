import type { PressableProps, StyleProp, ViewStyle } from 'react-native';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from '@/components/ui';
import { colors, radius, spacing } from '@/design-system/tokens';

type FlowOptionProps = Omit<PressableProps, 'children' | 'style'> & {
  label: string;
  level: 0 | 1 | 2 | 3 | 4;
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
};

/** Flow is optional. Its visual strength never represents medical severity. */
export function FlowOption({ accessibilityLabel, disabled, label, level, selected = false, style, ...props }: FlowOptionProps) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="radio"
      accessibilityState={{ disabled: Boolean(disabled), selected }}
      disabled={disabled}
      style={({ pressed }) => [styles.option, selected && styles.selected, disabled && styles.disabled, pressed && !disabled && styles.pressed, style]}
      {...props}
    >
      <View accessibilityElementsHidden style={styles.drops}>
        {[1, 2, 3, 4].map(drop => <View key={drop} style={[styles.drop, drop <= level && styles.dropActive]} />)}
      </View>
      <AppText align="center" color={selected ? 'brand' : 'body'} numberOfLines={2} variant="label">{label}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  option: { alignItems: 'center', backgroundColor: colors.surface.card, borderColor: '#EEE7E8', borderRadius: 14, borderWidth: 1, gap: spacing.xs, justifyContent: 'center', minHeight: 64, paddingHorizontal: spacing.xs, paddingVertical: spacing.sm },
  selected: { backgroundColor: '#FFF0F3', borderColor: colors.brand.action, borderWidth: 1.5 },
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.76 },
  drops: { flexDirection: 'row', gap: 3 },
  drop: { backgroundColor: colors.border.default, borderRadius: radius.pill, height: 12, width: 6 },
  dropActive: { backgroundColor: colors.brand.rose },
});
