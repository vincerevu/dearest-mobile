import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing } from '@/design-system/tokens';
import { AppText } from './app-text';
import { Card } from './card';

type HealthSafetyNoticeProps = { title: string; message: string; icon?: ReactNode };

export function HealthSafetyNotice({ icon, message, title }: HealthSafetyNoticeProps) {
  return (
    <Card variant="warning">
      <View style={styles.content}>
        {icon}
        <View style={styles.copy}>
          <AppText variant="label">{title}</AppText>
          <AppText color="secondary" variant="label">{message}</AppText>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({ content: { flexDirection: 'row', gap: spacing.md }, copy: { flex: 1, gap: spacing.xs } });
