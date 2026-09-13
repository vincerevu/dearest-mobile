let configuredClientId: string | null = null;

export type GoogleIdentity = { idToken: string; email?: string; name?: string };

export function configureGoogleSignIn(webClientId?: string) {
  if (!webClientId || configuredClientId === webClientId)
    return;
  const { GoogleSignin } = getGoogleModule();
  GoogleSignin.configure({ webClientId });
  configuredClientId = webClientId;
}

export async function signInWithGoogle(webClientId?: string): Promise<GoogleIdentity> {
  if (!webClientId)
    throw new Error('Google Sign-In chưa được cấu hình cho bản build này.');
  configureGoogleSignIn(webClientId);
  const { GoogleSignin, statusCodes } = getGoogleModule();
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const response = await GoogleSignin.signIn();
    if (response.type !== 'success' || !response.data.idToken)
      throw new Error('Không nhận được xác thực từ Google.');
    return { idToken: response.data.idToken, email: response.data.user.email, name: response.data.user.name ?? undefined };
  }
  catch (error: unknown) {
    if (typeof error === 'object' && error && 'code' in error && error.code === statusCodes.SIGN_IN_CANCELLED)
      throw new Error('Bạn đã hủy đăng nhập Google.');
    throw error;
  }
}

function getGoogleModule() {
  // Delayed require keeps Expo Go able to render the demo; the native module is
  // only loaded in a configured Development Client/production build.
  return require('@react-native-google-signin/google-signin') as {
    GoogleSignin: { configure: (config: { webClientId: string }) => void; hasPlayServices: (options: { showPlayServicesUpdateDialog: boolean }) => Promise<void>; signIn: () => Promise<{ type: string; data: { idToken: string | null; user: { email?: string; name?: string | null } } }> };
    statusCodes: { SIGN_IN_CANCELLED: string };
  };
}
