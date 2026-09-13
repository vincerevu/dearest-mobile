import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import type { PressableProps, StyleProp, ViewStyle } from 'react-native';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from './app-text';
import { colors, spacing } from '@/design-system/tokens';

type InlineActionLinkProps = Omit<PressableProps, 'children' | 'style'> & {
  label: string;
  style?: StyleProp<ViewStyle>;
};

/** A low-emphasis navigation affordance for tappable cards and rows. */
export function InlineActionLink({ label, onPress, style, ...props }: InlineActionLinkProps) {
  const content = <><AppText style={styles.label} variant="label">{label}</AppText><MaterialCommunityIcons color={colors.brand.primary} name="arrow-right" size={18} /></>;
  if (!onPress) return <View style={[styles.link, style]}>{content}</View>;
  return <Pressable accessibilityRole="link" style={[styles.link, style]} onPress={onPress} {...props}>
    {content}
  </Pressable>;
}

const styles = StyleSheet.create({
  label: { color: colors.brand.primary },
  link: { alignItems: 'center', alignSelf: 'flex-end', flexDirection: 'row', gap: spacing.xs, minHeight: 36, paddingHorizontal: spacing.xs },
});
