import type { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText } from '@/components/ui';
import { spacing } from '@/design-system/tokens';

type CheckInSectionProps = PropsWithChildren<{ number: number; title: string; description?: string }>;

export function CheckInSection({ children, description, number, title }: CheckInSectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.header}><View style={styles.copy}><AppText variant="label">{title.toUpperCase()}</AppText>{description ? <AppText color="secondary" variant="label">{description}</AppText> : null}</View></View>
      {children}
    </View>
  );
}

export const CheckInHeader = CheckInSection;

const styles = StyleSheet.create({
  section: { gap: spacing.md },
  header: { flexDirection: 'row' },
  copy: { flex: 1, gap: spacing.xs },
});
