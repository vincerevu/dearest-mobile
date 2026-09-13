import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { AppText } from './app-text';
import { colors, radius, spacing } from '@/design-system/tokens';

export function LoadingOverlay({ label = 'Đang lưu...' }: { label?: string }) {
  return (
    <View accessibilityLiveRegion="polite" style={styles.overlay}>
      <View style={styles.panel}>
        <ActivityIndicator color={colors.brand.primary} />
        <AppText variant="label">{label}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({ overlay: { alignItems: 'center', backgroundColor: 'rgba(255, 253, 253, 0.7)', justifyContent: 'center', ...StyleSheet.absoluteFillObject }, panel: { alignItems: 'center', backgroundColor: colors.surface.card, borderRadius: radius.md, gap: spacing.md, padding: spacing.xl } });
