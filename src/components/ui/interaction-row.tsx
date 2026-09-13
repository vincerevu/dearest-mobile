import type { ReactNode } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '@/design-system/tokens';
import { AppText } from './app-text';

type BaseRowProps = {
  title: string;
  description?: string;
  leading?: ReactNode;
  disabled?: boolean;
  onPress: () => void;
};

export function DisclosureRow({ description, disabled = false, leading, onPress, title, tone = 'default', value }: BaseRowProps & { value?: string; tone?: 'default' | 'danger' }) {
  return (
    <Pressable accessibilityLabel={title} accessibilityRole="button" accessibilityState={{ disabled }} disabled={disabled} style={({ pressed }) => [styles.row, pressed && styles.pressed, disabled && styles.disabled]} onPress={onPress}>
      {leading ? <View style={styles.leading}>{leading}</View> : null}
      <View style={styles.copy}>
        <AppText color={tone === 'danger' ? 'danger' : 'primary'} variant="label">{title}</AppText>
        {description ? <AppText color="secondary" variant="label">{description}</AppText> : null}
      </View>
      {value ? <AppText color="secondary" variant="label">{value}</AppText> : null}
      <MaterialCommunityIcons color={tone === 'danger' ? colors.danger : colors.navigation.chevron} name="chevron-right" size={22} />
    </Pressable>
  );
}

export function SelectionRow({ description, disabled = false, leading, onPress, selected, title }: BaseRowProps & { selected: boolean }) {
  return (
    <Pressable accessibilityLabel={title} accessibilityRole="radio" accessibilityState={{ checked: selected, disabled, selected }} disabled={disabled} style={({ pressed }) => [styles.row, selected && styles.selected, pressed && styles.pressed, disabled && styles.disabled]} onPress={onPress}>
      {leading ? <View style={styles.leading}>{leading}</View> : null}
      <View style={styles.copy}>
        <AppText variant="label">{title}</AppText>
        {description ? <AppText color="secondary" variant="label">{description}</AppText> : null}
      </View>
      <View accessibilityElementsHidden style={[styles.radio, selected && styles.radioSelected]}>{selected ? <View style={styles.radioDot} /> : null}</View>
    </Pressable>
  );
}

export function TextAction({ label, onPress, tone = 'brand' }: { label: string; onPress: () => void; tone?: 'brand' | 'neutral' | 'danger' }) {
  const color = tone === 'danger' ? 'danger' : tone === 'neutral' ? 'secondary' : 'brand';
  return <Pressable accessibilityLabel={label} accessibilityRole="button" hitSlop={8} style={({ pressed }) => [styles.textAction, pressed && styles.pressed]} onPress={onPress}><AppText color={color} variant="label">{label}</AppText></Pressable>;
}

const styles = StyleSheet.create({
  copy: { flex: 1, gap: spacing.xs },
  disabled: { opacity: 0.45 },
  leading: { alignItems: 'center', justifyContent: 'center' },
  pressed: { backgroundColor: colors.navigation.pressed },
  radio: { alignItems: 'center', borderColor: colors.navigation.chevron, borderRadius: radius.pill, borderWidth: 1.5, height: 22, justifyContent: 'center', width: 22 },
  radioDot: { backgroundColor: colors.brand.primary, borderRadius: radius.pill, height: 10, width: 10 },
  radioSelected: { borderColor: colors.brand.primary },
  row: { alignItems: 'center', borderBottomColor: colors.border.soft, borderBottomWidth: StyleSheet.hairlineWidth, flexDirection: 'row', gap: spacing.md, minHeight: 68, paddingHorizontal: spacing.xs, paddingVertical: spacing.md },
  selected: { backgroundColor: '#FFF9FA' },
  textAction: { alignSelf: 'flex-start', borderRadius: radius.sm, minHeight: 40, justifyContent: 'center', paddingHorizontal: spacing.xs },
});
