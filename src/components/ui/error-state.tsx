import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '@/design-system/tokens';
import { AppText } from './app-text';
import { Button } from './button';

export function ErrorState({ message, onRetry, title = 'Có lỗi xảy ra' }: { title?: string; message: string; onRetry: () => void }) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons accessibilityElementsHidden color={colors.danger} name="alert-circle-outline" size={36} />
      <AppText align="center" variant="headingMd">{title}</AppText>
      <AppText align="center" color="secondary">{message}</AppText>
      <Button label="Thử lại" onPress={onRetry} />
    </View>
  );
}
const styles = StyleSheet.create({ container: { alignItems: 'center', backgroundColor: colors.surface.soft, gap: spacing.md, padding: spacing.xxl } });
