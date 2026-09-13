import type { ReactNode } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import type { PressableProps, StyleProp, ViewStyle } from 'react-native';
import { Pressable, StyleSheet } from 'react-native';
import { colors, radius } from '@/design-system/tokens';

type IconButtonProps = Omit<PressableProps, 'children' | 'style'> & { icon: ReactNode; style?: StyleProp<ViewStyle>; tone?: 'default' | 'soft' | 'primary' };

export function IconButton({ accessibilityLabel, disabled, icon, style, tone = 'soft', ...props }: IconButtonProps) {
  return <Pressable accessibilityLabel={accessibilityLabel} accessibilityRole="button" accessibilityState={{ disabled: Boolean(disabled) }} disabled={disabled} style={({ pressed }) => [styles.base, styles[tone], disabled && styles.disabled, pressed && !disabled && styles.pressed, style]} {...props}>{icon}</Pressable>;
}

/** Standard circular navigation control for paging and back navigation. */
export function NavigationIconButton({ accessibilityLabel, direction, onPress }: { accessibilityLabel: string; direction: 'back' | 'next'; onPress: () => void }) {
  const icon = direction === 'back' ? 'chevron-left' : 'chevron-right';
  return <IconButton accessibilityLabel={accessibilityLabel} hitSlop={8} icon={<MaterialCommunityIcons color={colors.brand.primary} name={icon} size={26} />} onPress={onPress} />;
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', borderRadius: radius.pill, height: 44, justifyContent: 'center', width: 44 },
  default: { backgroundColor: colors.surface.card, borderColor: colors.border.default, borderWidth: 1 },
  soft: { backgroundColor: colors.surface.soft },
  primary: { backgroundColor: colors.brand.primary },
  disabled: { opacity: 0.45 },
  pressed: { opacity: 0.72 },
});
