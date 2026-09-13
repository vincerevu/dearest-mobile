import { Pressable, StyleSheet, View } from 'react-native';
import { AppText, SwitchRow } from '@/components/ui';
import { colors, radius, spacing } from '@/design-system/tokens';

export function NotificationSettingRow(props: { label: string; description?: string; value: boolean; onValueChange: (value: boolean) => void }) { return <SwitchRow {...props} />; }
export function ReminderTimePicker({ label = 'Giờ nhắc', value, onPress }: { label?: string; value: string; onPress: () => void }) { return <Pressable accessibilityLabel={`${label}: ${value}`} accessibilityRole="button" style={({ pressed }) => [styles.row, pressed && styles.pressed]} onPress={onPress}><AppText variant="label">{label}</AppText><View style={styles.time}><AppText color="brand" variant="label">{value}</AppText></View></Pressable>; }
const styles = StyleSheet.create({ pressed: { opacity: 0.75 }, row: { alignItems: 'center', borderColor: colors.border.default, borderRadius: radius.md, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', minHeight: 56, paddingHorizontal: spacing.lg }, time: { backgroundColor: colors.brand.soft, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.sm } });
