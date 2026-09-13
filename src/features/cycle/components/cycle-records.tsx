import { Pressable, StyleSheet, View } from 'react-native';
import { AppText, Card } from '@/components/ui';
import { colors, spacing } from '@/design-system/tokens';

export type CycleRecordItemModel = { id: string; dateLabel: string; title: string; detail?: string; source?: 'actual' | 'predicted' };

export function CycleRecordItem({ item, onPress }: { item: CycleRecordItemModel; onPress?: () => void }) {
  return (
    <Pressable accessibilityRole="button" style={({ pressed }) => [styles.item, pressed && styles.pressed]} onPress={onPress}>
      <View style={[styles.dot, item.source === 'predicted' && styles.predicted]} />
      <View style={styles.copy}>
        <AppText variant="label">{item.title}</AppText>
        {item.detail ? <AppText color="secondary" variant="label">{item.detail}</AppText> : null}
      </View>
      <AppText color="muted" variant="label">{item.dateLabel}</AppText>
    </Pressable>
  );
}

export function CycleRecordList({ items, onPressItem }: { items: CycleRecordItemModel[]; onPressItem?: (item: CycleRecordItemModel) => void }) {
  return <Card padding="sm"><View>{items.map(item => <CycleRecordItem key={item.id} item={item} onPress={() => onPressItem?.(item)} />)}</View></Card>;
}

const styles = StyleSheet.create({ copy: { flex: 1, gap: spacing.xs }, dot: { backgroundColor: colors.cycle.actual, borderRadius: 999, height: 10, width: 10 }, item: { alignItems: 'center', flexDirection: 'row', gap: spacing.md, minHeight: 60, paddingHorizontal: spacing.sm }, predicted: { backgroundColor: colors.cycle.predicted, borderColor: colors.brand.primary, borderWidth: 1 }, pressed: { opacity: 0.7 } });
