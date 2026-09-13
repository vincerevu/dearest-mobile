import type { PropsWithChildren } from 'react';
import type { ScrollViewProps, StyleProp, ViewStyle } from 'react-native';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '@/design-system/tokens';

type ScreenProps = PropsWithChildren<{
  scroll?: boolean;
  padded?: boolean;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: ScrollViewProps['contentContainerStyle'];
}>;

export function Screen({ children, contentContainerStyle, padded = true, scroll = false, style }: ScreenProps) {
  const content = <View style={[styles.root, padded && styles.content, style]}>{children}</View>;
  if (!scroll)
    return <SafeAreaView style={styles.safe}>{content}</SafeAreaView>;
  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={[padded && styles.content, contentContainerStyle]}>{children}</ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({ content: { padding: spacing.xl }, root: { flex: 1 }, safe: { backgroundColor: colors.background.primary, flex: 1 } });
