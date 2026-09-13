import type { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing } from '@/design-system/tokens';
import { ChatBubble } from './chat-bubble';

type SpeechBubbleProps = PropsWithChildren<{ message: string }>;

export function SpeechBubble({ children, message }: SpeechBubbleProps) {
  return (
    <View style={styles.wrapper}>
      <ChatBubble message={message} />
      {children ? <View style={styles.actions}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({ actions: { marginTop: spacing.md }, wrapper: { alignSelf: 'flex-start', maxWidth: '100%' } });
