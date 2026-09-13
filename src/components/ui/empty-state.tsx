import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '@/design-system/tokens';
import { AppText } from './app-text';
import { Button } from './button';

type EmptyStateProps = { title: string; description: string; actionLabel?: string; onAction?: () => void; icon?: ReactNode };

export function EmptyState({ actionLabel, description, icon, onAction, title }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      {icon ? <View accessibilityElementsHidden>{icon}</View> : null}
      <View style={styles.copy}>
        <AppText align="center" variant="headingMd">{title}</AppText>
        <AppText align="center" color="secondary">{description}</AppText>
      </View>
      {actionLabel && onAction ? <Button label={actionLabel} onPress={onAction} /> : null}
    </View>
  );
}
const styles = StyleSheet.create({ container: { alignItems: 'center', backgroundColor: colors.surface.soft, gap: spacing.lg, padding: spacing.xxl }, copy: { gap: spacing.sm } });
