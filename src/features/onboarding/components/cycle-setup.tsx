import { StyleSheet, View } from 'react-native';
import { Dovie } from '@/components/brand';
import { AppText, Chip, DateField, Input } from '@/components/ui';
import { spacing } from '@/design-system/tokens';

export type CycleRegularity = 'regular' | 'irregular' | 'unsure';

export function CycleSetupForm({ cycleLength, lastPeriodDate, periodLength, regularity, onCycleLengthChange, onLastPeriodDateChange, onPeriodLengthChange, onRegularityChange }: {
  lastPeriodDate: string; cycleLength: string; periodLength: string; regularity: CycleRegularity | undefined;
  onLastPeriodDateChange: (value: string) => void; onCycleLengthChange: (value: string) => void; onPeriodLengthChange: (value: string) => void; onRegularityChange: (value: CycleRegularity) => void;
}) {
  return <View style={styles.stack}>
    <DateField accessibilityLabel="Nhập ngày kỳ gần nhất" label="Ngày kỳ gần nhất" value={lastPeriodDate} onChange={onLastPeriodDateChange} />
    <Input accessibilityLabel="Chu kỳ trung bình" keyboardType="number-pad" label="Chu kỳ trung bình (ngày)" placeholder="Ví dụ: 28" value={cycleLength} onChangeText={onCycleLengthChange} />
    <Input accessibilityLabel="Số ngày hành kinh" keyboardType="number-pad" label="Số ngày hành kinh" placeholder="Ví dụ: 4" value={periodLength} onChangeText={onPeriodLengthChange} />
    <View style={styles.stack}><AppText variant="headingMd">Chu kỳ thường...</AppText><View style={styles.chips}>
      <Chip label="Khá đều" selected={regularity === 'regular'} onPress={() => onRegularityChange('regular')} />
      <Chip label="Không đều" selected={regularity === 'irregular'} onPress={() => onRegularityChange('irregular')} />
      <Chip label="Mình chưa chắc" selected={regularity === 'unsure'} onPress={() => onRegularityChange('unsure')} />
    </View></View>
    <View style={styles.helper}><Dovie decorative pose="listening" size={56} /><AppText color="secondary" style={styles.helperCopy} variant="label">Không cần chính xác tuyệt đối. Bạn có thể thay đổi các thông tin này sau.</AppText></View>
  </View>;
}

const styles = StyleSheet.create({ chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }, helper: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm }, helperCopy: { flex: 1 }, stack: { gap: spacing.md } });
