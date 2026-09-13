import type { PropsWithChildren } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '@/design-system/tokens';

type CardProps = PropsWithChildren<{
  variant?: 'default' | 'soft' | 'selected' | 'warning';
  padding?: 'sm' | 'md' | 'lg';
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityLabel?: string;
  onPress?: () => void;
}>;

export function Card({ accessibilityLabel, children, onPress, padding = 'md', style, testID, variant = 'default' }: CardProps) {
  const cardStyle = [styles.base, styles[variant], paddingStyles[padding], style];
  if (onPress)
    return <Pressable accessibilityLabel={accessibilityLabel} accessibilityRole="button" style={({ pressed }) => [cardStyle, pressed && styles.pressed]} testID={testID} onPress={onPress}>{children}</Pressable>;
  return <View testID={testID} style={cardStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  // Surfaces provide context; hierarchy comes from spacing and type, not elevation.
  base: { borderRadius: radius.lg, borderWidth: 1 },
  default: { backgroundColor: colors.surface.card, borderColor: colors.border.default },
  soft: { backgroundColor: colors.surface.soft, borderColor: colors.border.soft },
  selected: { backgroundColor: colors.surface.card, borderColor: colors.brand.action, borderWidth: 2 },
  warning: { backgroundColor: colors.warning.background, borderColor: colors.warning.border },
  pressed: { opacity: 0.72 },
});

const paddingStyles = StyleSheet.create({ sm: { padding: spacing.md }, md: { padding: spacing.lg }, lg: { padding: spacing.xxl } });
