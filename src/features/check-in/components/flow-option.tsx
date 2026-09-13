import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import type { PressableProps, StyleProp, ViewStyle } from 'react-native';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from '@/components/ui';
import { colors, spacing } from '@/design-system/tokens';

type FlowOptionProps = Omit<PressableProps, 'children' | 'style'> & {
  label: string;
  level: 0 | 1 | 2 | 3 | 4;
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
};

/** Flow is optional. Its visual strength never represents medical severity. */
export function FlowOption({ accessibilityLabel, disabled, label, level, selected = false, style, ...props }: FlowOptionProps) {
  const dropCount = level === 4 ? 4 : 3;

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
        {Array.from({ length: dropCount }, (_, index) => index + 1).map(drop => <MaterialCommunityIcons key={drop} color={drop <= level ? colors.brand.action : colors.brand.soft} name="water" size={12} />)}
      </View>
      <AppText align="center" color={selected ? 'brand' : 'body'} numberOfLines={2} variant="label">{label}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  option: { alignItems: 'center', backgroundColor: colors.surface.card, borderColor: colors.border.default, borderRadius: 14, borderWidth: 1, gap: spacing.xs, justifyContent: 'center', minHeight: 68, paddingHorizontal: spacing.xs, paddingVertical: spacing.sm },
  selected: { backgroundColor: colors.surface.soft, borderColor: colors.brand.action, borderWidth: 1.5 },
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.76 },
  drops: { flexDirection: 'row', gap: 1 },
});
