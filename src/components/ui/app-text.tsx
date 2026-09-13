import type { PropsWithChildren } from 'react';
import type { StyleProp, TextProps, TextStyle } from 'react-native';
import { StyleSheet, Text } from 'react-native';
import { colors } from '@/design-system/tokens';

type AppTextProps = PropsWithChildren<TextProps & {
  variant?: 'display' | 'headingLg' | 'headingMd' | 'body' | 'label' | 'metric';
  color?: 'primary' | 'body' | 'secondary' | 'muted' | 'brand' | 'inverse' | 'danger';
  align?: TextStyle['textAlign'];
  style?: StyleProp<TextStyle>;
}>;

export function AppText({ align, children, color = 'primary', style, variant = 'body', ...props }: AppTextProps) {
  return <Text maxFontSizeMultiplier={1.3} style={[styles.base, styles[variant], colorStyles[color], align && { textAlign: align }, style]} {...props}>{children}</Text>;
}

const styles = StyleSheet.create({
  base: { fontFamily: 'Quicksand_500Medium' },
  display: { fontFamily: 'Nunito_800ExtraBold', fontSize: 40, lineHeight: 48 },
  headingLg: { fontFamily: 'Nunito_800ExtraBold', fontSize: 32, lineHeight: 40 },
  headingMd: { fontFamily: 'Nunito_800ExtraBold', fontSize: 24, lineHeight: 30 },
  body: { fontSize: 16, lineHeight: 24 },
  label: { fontFamily: 'Quicksand_600SemiBold', fontSize: 14, lineHeight: 20 },
  metric: { fontFamily: 'Nunito_800ExtraBold', fontSize: 32, lineHeight: 38 },
});

const colorStyles = StyleSheet.create({ primary: { color: colors.text.primary }, body: { color: colors.text.body }, secondary: { color: colors.text.secondary }, muted: { color: colors.text.muted }, brand: { color: colors.brand.primary }, inverse: { color: colors.text.inverse }, danger: { color: colors.danger } });
