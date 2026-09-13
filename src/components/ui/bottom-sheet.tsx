import type { PropsWithChildren } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { colors, radius, shadows, spacing } from '@/design-system/tokens';
import { AppText } from './app-text';
import { IconButton } from './icon-button';

type BottomSheetProps = PropsWithChildren<{
  visible: boolean;
  title?: string;
  onClose: () => void;
}>;

/** Cross-platform sheet fallback for Expo SDK 54. */
export function BottomSheet({ children, onClose, title, visible }: BottomSheetProps) {
  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.screen}>
        <Pressable accessibilityLabel="Đóng bảng chọn" style={styles.backdrop} onPress={onClose} />
        <View accessibilityViewIsModal style={styles.sheet}>
          <View style={styles.handle} />
          {title
            ? (
                <View style={styles.header}>
                  <AppText variant="headingMd">{title}</AppText>
                  <IconButton
                    accessibilityLabel="Đóng"
                    icon={<AppText color="secondary" variant="headingMd">×</AppText>}
                    tone="soft"
                    onPress={onClose}
                  />
                </View>
              )
            : null}
          <View style={styles.content}>{children}</View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { backgroundColor: 'rgba(23, 23, 25, 0.36)', ...StyleSheet.absoluteFillObject },
  content: { gap: spacing.md },
  handle: { alignSelf: 'center', backgroundColor: colors.border.default, borderRadius: radius.pill, height: 5, marginBottom: spacing.md, width: 42 },
  header: { alignItems: 'center', flexDirection: 'row', gap: spacing.md, justifyContent: 'space-between', marginBottom: spacing.lg },
  screen: { flex: 1, justifyContent: 'flex-end' },
  sheet: { backgroundColor: colors.background.primary, borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl, minHeight: 180, padding: spacing.xl, ...shadows.card },
});
