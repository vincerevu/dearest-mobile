import type { PressableProps, StyleProp, ViewStyle } from 'react-native';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors } from '@/design-system/tokens';
import { AppText } from './app-text';

type InlineActionLinkProps = Omit<PressableProps, 'children' | 'style'> & {
  label: string;
  style?: StyleProp<ViewStyle>;
};

/** @deprecated Use TextAction or DisclosureRow. */
export function InlineActionLink({ label, onPress, style, ...props }: InlineActionLinkProps) {
  const content = <AppText style={styles.label} variant="label">{label}</AppText>;
  if (!onPress)
    return <View style={[styles.link, style]}>{content}</View>;
  return (
    <Pressable accessibilityRole="link" style={[styles.link, style]} onPress={onPress} {...props}>
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  label: { color: colors.brand.primary },
  link: { alignItems: 'center', alignSelf: 'flex-start', flexDirection: 'row', minHeight: 36 },
});
