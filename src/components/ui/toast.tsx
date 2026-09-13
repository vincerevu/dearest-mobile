import { StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '@/design-system/tokens';
import { AppText } from './app-text';

type ToastProps = { message: string; tone?: 'success' | 'error' | 'info' };

export function Toast({ message, tone = 'success' }: ToastProps) {
  return <View accessibilityLiveRegion="polite" style={[styles.base, toneStyles[tone]]}><AppText color={tone === 'error' ? 'danger' : 'body'} variant="label">{message}</AppText></View>;
}

const styles = StyleSheet.create({ base: { borderRadius: radius.md, borderWidth: 1, paddingHorizontal: spacing.lg, paddingVertical: spacing.md } });
const toneStyles = StyleSheet.create({ error: { backgroundColor: '#FFF0F2', borderColor: '#F8BEC9' }, info: { backgroundColor: colors.surface.soft, borderColor: colors.border.default }, success: { backgroundColor: colors.mood.neutral.soft, borderColor: '#BDEBDA' } });
