import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { spacing } from '@/design-system/tokens';
import { AppText } from './app-text';
import { Button } from './button';
import { Card } from './card';

type ConfirmDialogProps = { visible: boolean; title: string; message: string; confirmLabel: string; destructive?: boolean; loading?: boolean; onCancel: () => void; onConfirm: () => void };

export function ConfirmDialog({ confirmLabel, destructive = false, loading = false, message, onCancel, onConfirm, title, visible }: ConfirmDialogProps) {
  return (
    <Modal transparent visible={visible} onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onCancel} />
        <Card padding="lg" style={styles.dialog}>
          <View style={styles.copy}>
            <AppText variant="headingMd">{title}</AppText>
            <AppText color="secondary">{message}</AppText>
          </View>
          <View style={styles.actions}>
            <Button label="Hủy" variant="outline" onPress={onCancel} />
            <Button label={confirmLabel} loading={loading} variant={destructive ? 'destructive' : 'default'} onPress={onConfirm} />
          </View>
        </Card>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({ actions: { gap: spacing.sm }, backdrop: { ...StyleSheet.absoluteFillObject }, copy: { gap: spacing.sm }, dialog: { gap: spacing.xl, width: '88%' }, overlay: { alignItems: 'center', backgroundColor: 'rgba(23, 23, 25, 0.36)', flex: 1, justifyContent: 'center' } });
