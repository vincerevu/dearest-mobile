import { StyleSheet, View } from 'react-native';
import { Button } from '@/components/ui';
import { colors, spacing } from '@/design-system/tokens';

type CheckInActionsProps = { onSave: () => void; onSkip: () => void; saving?: boolean; disabled?: boolean };

export function CheckInActions({ disabled, onSave, onSkip, saving = false }: CheckInActionsProps) {
  return (
    <View style={styles.actions}>
      <Button className="flex-1" label="Bỏ qua" variant="outline" onPress={onSkip} />
      <Button className="flex-1" disabled={disabled} label="Lưu hôm nay" loading={saving} onPress={onSave} />
    </View>
  );
}
const styles = StyleSheet.create({ actions: { backgroundColor: colors.background.primary, flexDirection: 'row', gap: spacing.md, paddingHorizontal: spacing.xl, paddingVertical: spacing.md } });
