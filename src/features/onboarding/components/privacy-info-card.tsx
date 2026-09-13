import { StyleSheet, View } from 'react-native';
import { AppText, Card } from '@/components/ui';
import { colors, spacing } from '@/design-system/tokens';

export function PrivacyInfoCard({ message = 'Bạn luôn kiểm soát dữ liệu nào được dùng để cá nhân hóa trải nghiệm.' }: { message?: string }) {
  return (
    <Card style={styles.card} variant="soft">
      <View style={styles.content}>
        <AppText color="brand" variant="label">Riêng tư theo mặc định</AppText>
        <AppText color="secondary" variant="label">{message}</AppText>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({ card: { borderColor: colors.brand.soft }, content: { gap: spacing.xs } });
