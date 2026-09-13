import { useRouter } from 'expo-router';
import * as React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { Dovie, DearestLogo } from '@/components/brand';
import { Screen } from '@/components/layout';
import { AppText, Button, FocusAwareStatusBar } from '@/components/ui';
import { colors, radius, spacing } from '@/design-system/tokens';
import { useAuthStore } from './use-auth-store';

export function LoginScreen() {
  const router = useRouter();
  const signIn = useAuthStore.use.signIn();
  const [email, setEmail] = React.useState('ngoc@dearest.app');
  const [password, setPassword] = React.useState('dearest-demo');
  const enterDemo = () => {
    signIn({ access: 'demo-session', refresh: '' });
    router.replace('/role');
  };

  return (
    <Screen padded={false}>
      <FocusAwareStatusBar />
      <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', default: undefined })} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.content}>
            <DearestLogo subtitle="Dịu dàng cùng nhịp của bạn" />
            <Dovie decorative pose="welcome" size={120} />
            <View style={styles.copy}><AppText align="center" variant="headingMd">Chào mừng bạn</AppText><AppText align="center" color="secondary">Đây là bản demo. Đăng nhập để chọn trải nghiệm phù hợp với bạn.</AppText></View>
            <LoginField label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
            <LoginField label="Mật khẩu" value={password} onChangeText={setPassword} secureTextEntry />
            <Button disabled={!email.trim() || !password.trim()} label="Đăng nhập" onPress={enterDemo} />
            <AppText align="center" color="muted" variant="label">Bản demo: bạn có thể dùng thông tin có sẵn hoặc nhập bất kỳ email nào.</AppText>
            <AppText align="center" color="muted" variant="label">Bằng việc tiếp tục, bạn đồng ý rằng Dearest chỉ sử dụng dữ liệu theo các quyền bạn chọn.</AppText>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

function LoginField({ label, ...props }: React.ComponentProps<typeof TextInput> & { label: string }) { return <View style={styles.field}><AppText variant="label">{label}</AppText><TextInput accessibilityLabel={label} placeholderTextColor={colors.text.muted} style={styles.input} {...props} /></View>; }

const styles = StyleSheet.create({ content: { gap: spacing.md, maxWidth: 460, padding: spacing.xl, width: '100%' }, copy: { gap: spacing.xs }, field: { gap: spacing.xs }, flex: { flex: 1 }, input: { backgroundColor: colors.surface.card, borderColor: colors.border.default, borderRadius: radius.md, borderWidth: 1, color: colors.text.primary, fontFamily: 'Quicksand_500Medium', fontSize: 16, minHeight: 50, paddingHorizontal: spacing.md }, scroll: { alignItems: 'center', flexGrow: 1, justifyContent: 'center', paddingVertical: spacing.xl } });
