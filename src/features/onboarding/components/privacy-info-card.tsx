import { StyleSheet, View } from 'react-native';
import { AppText } from '@/components/ui';
import { colors, spacing } from '@/design-system/tokens';

export function PrivacyInfoCard({ message = 'Bạn luôn kiểm soát dữ liệu nào được dùng để cá nhân hóa trải nghiệm.' }: { message?: string }) {
  return (
    <View style={styles.content}>
      <AppText color="brand" variant="label">Riêng tư theo mặc định</AppText>
      <AppText color="secondary" variant="label">{message}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({ content: { backgroundColor: colors.surface.soft, borderColor: colors.brand.soft, borderRadius: 14, borderWidth: 1, gap: spacing.xs, padding: spacing.lg } });
