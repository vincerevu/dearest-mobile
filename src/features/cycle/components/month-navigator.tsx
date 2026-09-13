import { StyleSheet, View } from 'react-native';
import { AppText, NavigationIconButton } from '@/components/ui';

type MonthNavigatorProps = { label: string; onNext: () => void; onPrevious: () => void };

export function MonthNavigator({ label, onNext, onPrevious }: MonthNavigatorProps) {
  return (
    <View style={styles.container}>
      <NavigationIconButton accessibilityLabel="Tháng trước" direction="back" onPress={onPrevious} />
      <AppText variant="headingMd">{label}</AppText>
      <NavigationIconButton accessibilityLabel="Tháng sau" direction="next" onPress={onNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
});
