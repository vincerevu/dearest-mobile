import { StyleSheet, View } from 'react-native';
import { DovieAvatar, type DovieAvatarVariant } from '@/components/brand';
import { AppText, Button, Card } from '@/components/ui';
import { spacing } from '@/design-system/tokens';

export function SuggestionBasisLabel({ label }: { label: string }) {
  return (
    <AppText color="secondary" variant="label">
      Dựa trên:
      {label}
    </AppText>
  );
}
export function SuggestionHeroCard({ title, description, basis }: { title: string; description: string; basis?: string }) {
  return (
    <Card variant="soft">
      <View style={styles.stack}>
        <AppText variant="headingMd">{title}</AppText>
        <AppText color="secondary">{description}</AppText>
        {basis ? <SuggestionBasisLabel label={basis} /> : null}
      </View>
    </Card>
  );
}
export function SuggestionReasonCard({ title, reason }: { title: string; reason: string }) {
  return (
    <Card>
      <View style={styles.stack}>
        <AppText variant="label">{title}</AppText>
        <AppText color="secondary">{reason}</AppText>
      </View>
    </Card>
  );
}
export function SelfCareSuggestionCard({ title, description, actionLabel, onPress }: { title: string; description: string; actionLabel?: string; onPress?: () => void }) {
  return (
    <Card accessibilityLabel={actionLabel ?? title} onPress={onPress}>
      <View style={styles.stack}>
        <AppText variant="headingMd">{title}</AppText>
        <AppText color="secondary">{description}</AppText>
      </View>
    </Card>
  );
}
export function SelfCareSuggestionGrid({ children }: { children: React.ReactNode }) { return <View style={styles.grid}>{children}</View>; }
export function DovieSuggestionBanner({ message, onPress, variant = 'care' }: { message: string; onPress?: () => void; variant?: Extract<DovieAvatarVariant, 'care' | 'rest'> }) { return <Card variant="soft"><View style={styles.banner}><DovieAvatar decorative size={56} variant={variant} /><View style={styles.stack}><AppText variant="label">Dovie nhắn bạn</AppText><AppText color="secondary">{message}</AppText>{onPress ? <Button label="Tâm sự cùng Dovie" size="sm" variant="secondary" onPress={onPress} /> : null}</View></View></Card>; }
export function RefreshSuggestionButton({ onPress }: { onPress: () => void }) {
  return <Button label="Làm mới gợi ý" variant="outline" onPress={onPress} />;
}
export function AcceptSuggestionButton({ onPress }: { onPress: () => void }) {
  return <Button label="Thử ngay" onPress={onPress} />;
}
const styles = StyleSheet.create({ banner: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm }, grid: { gap: spacing.md }, stack: { flex: 1, gap: spacing.sm } });
