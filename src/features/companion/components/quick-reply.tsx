import type { PressableProps, StyleProp, ViewStyle } from 'react-native';
import { Pressable, StyleSheet } from 'react-native';
import { AppText } from '@/components/ui';
import { colors, radius, spacing } from '@/design-system/tokens';

type QuickReplyProps = Omit<PressableProps, 'children' | 'style'> & {
  label: string;
  style?: StyleProp<ViewStyle>;
};

export function QuickReply({ label, style, ...props }: QuickReplyProps) {
  return (
    <Pressable accessibilityLabel={label} accessibilityRole="button" style={({ pressed }) => [styles.base, pressed && styles.pressed, style]} {...props}>
      <AppText color="brand" variant="label">{label}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { alignSelf: 'flex-start', backgroundColor: colors.surface.card, borderColor: colors.brand.primary, borderRadius: radius.pill, borderWidth: 1, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm },
  pressed: { backgroundColor: colors.brand.soft },
});
