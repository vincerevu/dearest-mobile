import { Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import { Quicksand_500Medium, Quicksand_600SemiBold } from '@expo-google-fonts/quicksand';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@react-navigation/native';
import { Asset } from 'expo-asset';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { DOVIE_PRELOAD_ASSETS } from '@/components/brand';
import { useThemeConfig } from '@/components/ui/use-theme-config';
import { hydrateAuth } from '@/features/auth/use-auth-store';

import { APIProvider } from '@/lib/api';
import { loadSelectedTheme } from '@/lib/hooks/use-selected-theme';
// Import  global CSS file
import '../global.css';

export { ErrorBoundary } from 'expo-router';

// eslint-disable-next-line react-refresh/only-export-components
export const unstable_settings = {
  initialRouteName: 'splash',
};

hydrateAuth();
loadSelectedTheme();
// Keep the native launch screen up only until the app fonts are ready. The
// in-app /splash route takes over immediately afterwards.
void SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ duration: 250, fade: true });

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Nunito_800ExtraBold,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
  });
  const [assetsReady, setAssetsReady] = React.useState(false);

  React.useEffect(() => {
    void Asset.loadAsync(DOVIE_PRELOAD_ASSETS).catch(() => undefined).finally(() => setAssetsReady(true));
  }, []);

  React.useEffect(() => {
    if ((fontsLoaded || fontError) && assetsReady) {
      SplashScreen.hide();
    }
  }, [assetsReady, fontError, fontsLoaded]);

  if ((!fontsLoaded && !fontError) || !assetsReady) {
    return null;
  }

  return (
    <Providers>
      <Stack>
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="role" options={{ headerShown: false }} />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="check-in/[date]" options={{ headerShown: false }} />
        <Stack.Screen name="suggestions/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="insights/index" options={{ headerShown: false }} />
        <Stack.Screen name="insights/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="journal/new" options={{ headerShown: false }} />
        <Stack.Screen name="journal/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="article/[slug]" options={{ headerShown: false }} />
        <Stack.Screen name="settings/notifications" options={{ headerShown: false }} />
        <Stack.Screen name="settings/privacy" options={{ headerShown: false }} />
        <Stack.Screen name="settings/dovie" options={{ headerShown: false }} />
        <Stack.Screen name="settings/widgets" options={{ headerShown: false }} />
        <Stack.Screen name="settings/account" options={{ headerShown: false }} />
        <Stack.Screen name="settings/life-stage" options={{ headerShown: false }} />
        <Stack.Screen name="settings/cycle" options={{ headerShown: false }} />
        <Stack.Screen name="partner/index" options={{ headerShown: false }} />
        <Stack.Screen name="partner/invite" options={{ headerShown: false }} />
        <Stack.Screen name="partner/sharing" options={{ headerShown: false }} />
        <Stack.Screen name="partner/connection" options={{ headerShown: false }} />
        <Stack.Screen name="partner/support" options={{ headerShown: false }} />
        <Stack.Screen name="(partner-tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="life-stage/index" options={{ headerShown: false }} />
        <Stack.Screen name="life-stage/transition" options={{ headerShown: false }} />
        <Stack.Screen name="life-stage/plan" options={{ headerShown: false }} />
        <Stack.Screen name="cycle/edit" options={{ headerShown: false }} />
      </Stack>
    </Providers>
  );
}

function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useThemeConfig();
  return (
    <GestureHandlerRootView
      style={styles.container}
      // eslint-disable-next-line better-tailwindcss/no-unknown-classes
      className={theme.dark ? `dark` : undefined}
    >
      <KeyboardProvider>
        <ThemeProvider value={theme}>
          <APIProvider>
            <BottomSheetModalProvider>
              {children}
              <FlashMessage position="top" />
            </BottomSheetModalProvider>
          </APIProvider>
        </ThemeProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
