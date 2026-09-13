import { StyleSheet, View } from 'react-native';
import { spacing } from '@/design-system/tokens';
import { EnergyOption } from './energy-option';

export type EnergyValue = 'low' | 'medium' | 'good';
const labels: Record<EnergyValue, string> = { low: 'Thấp', medium: 'Vừa', good: 'Tốt' };

export function EnergyPicker({ onChange, value }: { value?: EnergyValue; onChange: (value: EnergyValue) => void }) {
  return <View accessibilityRole="radiogroup" style={styles.options}>{(['low', 'medium', 'good'] as const).map(level => <EnergyOption key={level} label={labels[level]} level={level} selected={value === level} onPress={() => onChange(level)} />)}</View>;
}
const styles = StyleSheet.create({ options: { flexDirection: 'row', gap: spacing.sm } });
