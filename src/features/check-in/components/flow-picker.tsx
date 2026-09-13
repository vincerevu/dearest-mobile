import { StyleSheet, View } from 'react-native';
import { spacing } from '@/design-system/tokens';
import { FlowOption } from './flow-option';

export type FlowValue = 0 | 1 | 2 | 3 | 4;
const labels: Record<FlowValue, string> = { 0: 'Không có', 1: 'Ít', 2: 'Vừa', 3: 'Nhiều', 4: 'Rất nhiều' };

export function FlowPicker({ onChange, value }: { value?: FlowValue; onChange: (value: FlowValue) => void }) {
  return <View accessibilityRole="radiogroup" style={styles.options}>{([0, 1, 2, 3] as const).map(level => <FlowOption key={level} label={labels[level]} level={level} selected={value === level} style={styles.option} onPress={() => onChange(level)} />)}</View>;
}
const styles = StyleSheet.create({ options: { flexDirection: 'row', gap: spacing.sm }, option: { flex: 1, minWidth: 0 } });
