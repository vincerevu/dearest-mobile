import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, View } from 'react-native';
import { Dovie, type DoviePose } from '@/components/brand';
import { AppText, Button } from '@/components/ui';
import { colors, radius, spacing } from '@/design-system/tokens';

export type HomeDovieState = 'default' | 'care' | 'rest' | 'encourage';

const poseByState: Record<HomeDovieState, DoviePose> = { default: 'default', care: 'care', rest: 'rest', encourage: 'encourage' };

export function HomeDovieBanner({ actionLabel, message, onPress, size = 82, state = 'default', title = 'Dovie ở đây cùng bạn', summary }: { title?: string; message: string; state?: HomeDovieState; actionLabel?: string; onPress?: () => void; size?: number; summary?: { mood: string; energy: string } }) {
  return <View style={styles.hero}><View style={styles.row}><Dovie decorative motion="idle" pose={poseByState[state]} size={size} /><View style={styles.copy}><AppText variant="headingMd">{title}</AppText>{summary ? <><View style={styles.summary}><View style={styles.metric}><MaterialCommunityIcons color={colors.mood.neutral.accent} name="emoticon-neutral-outline" size={20} /><AppText>{summary.mood}</AppText></View><View style={styles.metric}><MaterialCommunityIcons color={colors.energy.medium} name="lightning-bolt-outline" size={20} /><AppText>Năng lượng {summary.energy}</AppText></View></View><AppText color="secondary" variant="label">Mình đã ghi lại rồi nhé</AppText></> : <AppText color="secondary">{message}</AppText>}{actionLabel && onPress ? <Button label={actionLabel} size="sm" variant="secondary" onPress={onPress} /> : null}</View></View></View>;
}

const styles = StyleSheet.create({ copy: { flex: 1, gap: spacing.sm }, hero: { backgroundColor: colors.surface.soft, borderColor: colors.border.default, borderRadius: radius.lg, borderWidth: 1, minHeight: 132, padding: spacing.xl }, metric: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm }, row: { alignItems: 'center', flexDirection: 'row', gap: spacing.md }, summary: { gap: spacing.xs } });
