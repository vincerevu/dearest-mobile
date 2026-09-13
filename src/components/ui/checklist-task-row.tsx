import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '@/design-system/tokens';
import { AppText } from './app-text';

type ChecklistTaskRowProps = { completed: boolean; description: string; onToggle: () => void; title: string };

/** A tappable checklist item; it intentionally does not use a CTA button. */
export function ChecklistTaskRow({ completed, description, onToggle, title }: ChecklistTaskRowProps) {
  return <Pressable accessibilityLabel={title} accessibilityRole="checkbox" accessibilityState={{ checked: completed }} style={({ pressed }) => [styles.row, completed && styles.completed, pressed && styles.pressed]} onPress={onToggle}><MaterialCommunityIcons color={completed ? colors.brand.primary : colors.text.muted} name={completed ? 'check-circle' : 'checkbox-blank-circle-outline'} size={26} /><View style={styles.copy}><AppText variant="label">{title}</AppText><AppText color="secondary" variant="label">{completed ? 'Đã hoàn thành' : description}</AppText></View></Pressable>;
}

const styles = StyleSheet.create({ completed: { backgroundColor: colors.surface.soft, borderColor: colors.border.soft }, copy: { flex: 1, gap: spacing.xs }, pressed: { opacity: 0.72 }, row: { alignItems: 'flex-start', backgroundColor: colors.surface.card, borderColor: colors.border.default, borderRadius: radius.md, borderWidth: 1, flexDirection: 'row', gap: spacing.md, minHeight: 72, padding: spacing.md } });
