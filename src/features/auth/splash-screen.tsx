import { useRouter } from 'expo-router';
import * as React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Dovie, DearestLogo } from '@/components/brand';
import { Screen } from '@/components/layout';
import { AppText, Button, FocusAwareStatusBar } from '@/components/ui';
import { colors, spacing } from '@/design-system/tokens';

/** In-app loading screen shown after the native launch screen has dismissed. */
export function SplashScreen() {
  const router = useRouter(); const [ready, setReady] = React.useState(false); const hasNavigated = React.useRef(false);
  const continueToLogin = React.useCallback(() => { if (hasNavigated.current) return; hasNavigated.current = true; router.navigate('/login'); }, [router]);
  React.useEffect(() => { const readyTimer = setTimeout(() => setReady(true), 900); const navigationTimer = setTimeout(continueToLogin, 1400); return () => { clearTimeout(readyTimer); clearTimeout(navigationTimer); }; }, [continueToLogin]);
  return <Screen><FocusAwareStatusBar /><View style={styles.content}><DearestLogo subtitle="Dịu dàng cùng nhịp của bạn" /><Dovie decorative pose="welcome" size={180} /><View style={styles.loading}>{ready ? <Button label="Tiếp tục" onPress={continueToLogin} /> : <><ActivityIndicator color={colors.brand.primary} /><AppText color="secondary" variant="label">Đang chuẩn bị không gian riêng của bạn…</AppText></>}</View></View></Screen>;
}

const styles = StyleSheet.create({ content: { alignItems: 'center', flex: 1, gap: spacing.xxl, justifyContent: 'center' }, loading: { alignItems: 'center', gap: spacing.sm } });
