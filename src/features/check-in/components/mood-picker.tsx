import { StyleSheet, View } from 'react-native';
import { spacing } from '@/design-system/tokens';
import { MoodIcon } from './mood-icon';
import { MoodOption } from './mood-option';

export type MoodValue = 'happy' | 'neutral' | 'sad' | 'irritated' | 'tired';
const options: ReadonlyArray<{ label: string; value: MoodValue }> = [
  { label: 'Vui', value: 'happy' },
  { label: 'Bình thường', value: 'neutral' },
  { label: 'Cáu nhẹ', value: 'irritated' },
  { label: 'Mệt', value: 'tired' },
];

export function MoodPicker({ onChange, value }: { value?: MoodValue; onChange: (value: MoodValue) => void }) {
  const selected = value ?? 'neutral';
  return <View accessibilityRole="radiogroup" style={styles.options}>{options.map(option => <MoodOption key={option.value} illustration={<MoodIcon active={selected === option.value} mood={option.value} size={32} />} label={option.label} mood={option.value} selected={selected === option.value} onPress={() => onChange(option.value)} />)}</View>;
}
const styles = StyleSheet.create({ options: { flexDirection: 'row', gap: spacing.sm } });
