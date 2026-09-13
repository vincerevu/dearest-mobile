import { StyleSheet, View } from 'react-native';
import { AppText, Card } from '@/components/ui';
import { colors, spacing } from '@/design-system/tokens';

type ChatBubbleProps = {
  message: string;
  sender?: 'dovie' | 'you';
  timestamp?: string;
};

export function ChatBubble({ message, sender = 'dovie', timestamp }: ChatBubbleProps) {
  const isMine = sender === 'you';

  return (
    <View style={[styles.wrapper, isMine && styles.mine]}>
      <Card padding="md" style={[styles.bubble, isMine ? styles.myBubble : styles.dovieBubble]}>
        <AppText color={isMine ? 'inverse' : 'body'}>{message}</AppText>
      </Card>
      {timestamp ? <AppText align={isMine ? 'right' : 'left'} color="muted" style={styles.timestamp} variant="label">{timestamp}</AppText> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  dovieBubble: { backgroundColor: colors.surface.card, borderColor: colors.border.default },
  bubble: { maxWidth: '100%' },
  mine: { alignSelf: 'flex-end' },
  myBubble: { backgroundColor: colors.brand.primary, borderColor: colors.brand.primary },
  timestamp: { marginTop: spacing.xs },
  wrapper: { alignSelf: 'flex-start', maxWidth: '84%' },
});
