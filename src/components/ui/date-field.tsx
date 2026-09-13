import * as React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/design-system/tokens';
import { formatDateInput, parseDateInput } from '@/lib/date-input';
import { AppText } from './app-text';

export function formatDate(value: Date) {
  const day = String(value.getDate()).padStart(2, '0');
  const month = String(value.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}/${value.getFullYear()}`;
}

export function parseDate(value?: string) {
  return parseDateInput(value);
}

export function DateField({ accessibilityLabel, label, onChange, value }: { accessibilityLabel: string; label: string; value?: string; onChange: (value: string) => void }) {
  return <View style={styles.container}>
    <AppText style={styles.label} variant="label">{label}</AppText>
    <TextInput accessibilityLabel={accessibilityLabel} keyboardType="number-pad" maxLength={10} placeholder="DD MM YY" placeholderTextColor={colors.text.muted} style={styles.field} value={formatDateInput(value ?? '')} onChangeText={nextValue => onChange(formatDateInput(nextValue))} />
  </View>;
}

const styles = StyleSheet.create({
  container: { gap: spacing.xs },
  field: { backgroundColor: colors.surface.card, borderColor: colors.border.default, borderRadius: radius.md, borderWidth: 1, color: colors.text.primary, fontFamily: 'Quicksand_500Medium', fontSize: 16, minHeight: 52, paddingHorizontal: spacing.md },
  label: { color: colors.brand.primary },
});
