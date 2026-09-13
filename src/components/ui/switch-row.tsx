import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from './app-text';
import { colors, spacing } from '@/design-system/tokens';

type SwitchRowProps = { label: string; description?: string; value: boolean; disabled?: boolean; onValueChange: (value: boolean) => void };

export function SwitchRow({ description, disabled = false, label, onValueChange, value }: SwitchRowProps) {
  return (
    <View style={[styles.row, disabled && styles.disabled]}>
      <View style={styles.copy}>
        <AppText variant="label">{label}</AppText>
        {description ? <AppText color="secondary" variant="label">{description}</AppText> : null}
      </View>
      <Pressable
        accessibilityLabel={label}
        accessibilityRole="switch"
        accessibilityState={{ checked: value, disabled }}
        disabled={disabled}
        style={({ pressed }) => [styles.toggle, value && styles.toggleOn, pressed && !disabled && styles.pressed]}
        onPress={() => onValueChange(!value)}
      >
        <View style={[styles.thumb, value && styles.thumbOn]} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  copy: { flex: 1, gap: spacing.xs },
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.76 },
  row: { alignItems: 'center', flexDirection: 'row', gap: spacing.lg, minHeight: 56 },
  thumb: { backgroundColor: colors.surface.card, borderRadius: 999, height: 22, marginLeft: 3, width: 22 },
  thumbOn: { marginLeft: 23 },
  toggle: { backgroundColor: colors.border.default, borderRadius: 999, height: 28, justifyContent: 'center', width: 48 },
  toggleOn: { backgroundColor: colors.brand.primary },
});
