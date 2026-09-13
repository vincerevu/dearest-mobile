import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing } from '@/design-system/tokens';
import { SymptomChip } from './symptom-chip';

export type SymptomOption = { id: string; label: string; icon?: ReactNode };
type SymptomPickerProps = { options: ReadonlyArray<SymptomOption>; value: ReadonlyArray<string>; onChange: (value: string[]) => void };

export function SymptomPicker({ onChange, options, value }: SymptomPickerProps) {
  const toggle = (id: string) => onChange(value.includes(id) ? value.filter(item => item !== id) : [...value, id]);
  return <View accessibilityRole="none" style={styles.options}>{options.map(option => <SymptomChip key={option.id} icon={option.icon} label={option.label} selected={value.includes(option.id)} onPress={() => toggle(option.id)} />)}</View>;
}
const styles = StyleSheet.create({ options: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm } });
