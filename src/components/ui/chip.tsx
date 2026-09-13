import type { ReactNode } from 'react';
import type { PressableProps, StyleProp, ViewStyle } from 'react-native';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '@/design-system/tokens';
import { AppText } from './app-text';

type ChipProps = Omit<PressableProps, 'children' | 'style'> & {
  label: string;
  selected?: boolean;
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function Chip({ accessibilityLabel, disabled, icon, label, selected = false, style, ...props }: ChipProps) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      accessibilityState={{ disabled: Boolean(disabled), selected }}
      disabled={disabled}
      style={({ pressed }) => [styles.base, selected && styles.selected, disabled && styles.disabled, pressed && !disabled && styles.pressed, style]}
      {...props}
    >
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      <AppText variant="label" color={selected ? 'brand' : 'body'}>{label}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', alignSelf: 'flex-start', backgroundColor: colors.surface.card, borderColor: colors.border.soft, borderRadius: radius.pill, borderWidth: 1, flexDirection: 'row', gap: spacing.sm, justifyContent: 'center', minHeight: 44, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm },
  selected: { backgroundColor: colors.brand.soft, borderColor: colors.brand.action, borderWidth: 2 },
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.75 },
  icon: { alignItems: 'center', justifyContent: 'center' },
});
