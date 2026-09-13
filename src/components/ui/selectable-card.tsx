import type { ReactNode } from 'react';
import type { PressableProps, StyleProp, ViewStyle } from 'react-native';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors, radius, shadows, spacing } from '@/design-system/tokens';
import { AppText } from './app-text';

type SelectableCardProps = Omit<PressableProps, 'children' | 'style'> & {
  label: string;
  description?: string;
  illustration?: ReactNode;
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function SelectableCard({ accessibilityLabel, description, disabled, illustration, label, selected = false, style, ...props }: SelectableCardProps) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      accessibilityState={{ disabled: Boolean(disabled), selected }}
      disabled={disabled}
      style={({ pressed }) => [styles.base, selected && styles.selected, disabled && styles.disabled, pressed && !disabled && styles.pressed, style]}
      {...props}
    >
      {illustration ? <View style={styles.illustration}>{illustration}</View> : null}
      <View style={styles.copy}>
        <AppText variant="headingMd">{label}</AppText>
        {description ? <AppText color="secondary" variant="label">{description}</AppText> : null}
      </View>
      {selected ? <CheckBadge /> : null}
    </Pressable>
  );
}

function CheckBadge() {
  return <View accessibilityLabel="Đã chọn" style={styles.check}><Svg height={14} width={14} viewBox="0 0 16 16"><Path d="m3 8 3 3 7-7" fill="none" stroke="#FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.25} /></Svg></View>;
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', backgroundColor: colors.surface.card, borderColor: colors.border.default, borderRadius: radius.lg, borderWidth: 1, flexDirection: 'row', gap: spacing.md, minHeight: 76, padding: spacing.lg, ...shadows.card },
  selected: { borderColor: colors.brand.action, borderWidth: 2 },
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.78 },
  illustration: { alignItems: 'center', justifyContent: 'center' },
  copy: { flex: 1, gap: spacing.xs },
  check: { alignItems: 'center', backgroundColor: colors.brand.action, borderRadius: radius.pill, height: 24, justifyContent: 'center', width: 24 },
});
