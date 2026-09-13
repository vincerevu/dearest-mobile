import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText, NavigationIconButton } from '@/components/ui';
import { spacing } from '@/design-system/tokens';

type ScreenHeaderProps = {
  title: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  onBack?: () => void;
};

export function ScreenHeader({ leading, onBack, title, trailing }: ScreenHeaderProps) {
  return (
    <View style={styles.base}>
      {onBack ? <View style={styles.side}>{leading ?? <NavigationIconButton accessibilityLabel="Quay lại" direction="back" onPress={onBack} />}</View> : <View style={styles.side}>{leading}</View>}
      <AppText align="center" numberOfLines={1} style={styles.title} variant="headingMd">{title}</AppText>
      <View style={styles.side}>{trailing}</View>
    </View>
  );
}
export const AppHeader = ScreenHeader;

const styles = StyleSheet.create({
  base: { alignItems: 'center', flexDirection: 'row', minHeight: 48 },
  side: { alignItems: 'center', justifyContent: 'center', minWidth: 44 },
  title: { flex: 1, paddingHorizontal: spacing.sm },
});
