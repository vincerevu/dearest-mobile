import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import { DovieNavIcon } from '@/components/brand';
import { AppTabBar } from '@/components/layout';
import { colors } from '@/design-system/tokens';
import { translate } from '@/lib/i18n';

export default function V1TabLayout() {
  const tabConfig: Record<string, { dovie?: boolean; label: string; icon?: keyof typeof MaterialCommunityIcons.glyphMap }> = {
    index: { icon: 'heart-outline', label: translate('tabs.today') },
    journey: { icon: 'map-marker-path', label: 'Hành trình' },
    chat: { dovie: true, label: 'Dovie' },
    notifications: { icon: 'bell-outline', label: 'Thông báo' },
    me: { icon: 'account-circle-outline', label: 'Tôi' },
  };
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={({ navigation, state }) => (
        <AppTabBar
          tabs={state.routes.filter(route => tabConfig[route.name]).map((route) => {
            const config = tabConfig[route.name];
            return { badge: route.name === 'notifications', key: route.name, label: config.label, icon: active => config.dovie ? <DovieNavIcon color={active ? colors.brand.primary : colors.text.muted} size={28} /> : <MaterialCommunityIcons color={active ? colors.brand.primary : colors.text.muted} name={config.icon!} size={23} /> };
          })}
          value={state.routes[state.index].name}
          onChange={key => navigation.navigate(key)}
        />
      )}
    >
      <Tabs.Screen name="index" options={{ title: translate('tabs.today') }} />
      <Tabs.Screen name="journey" options={{ title: 'Hành trình' }} />
      <Tabs.Screen name="chat" options={{ title: 'Dovie' }} />
      <Tabs.Screen name="notifications" options={{ title: 'Thông báo' }} />
      <Tabs.Screen name="me" options={{ title: 'Tôi' }} />
      <Tabs.Screen name="calendar" options={{ href: null, title: translate('tabs.cycle') }} />
      <Tabs.Screen name="journal" options={{ href: null, title: translate('tabs.journal') }} />
      <Tabs.Screen name="explore" options={{ href: null, title: translate('tabs.explore') }} />
      <Tabs.Screen name="profile" options={{ href: null, title: translate('tabs.profile') }} />
      <Tabs.Screen name="settings" options={{ href: null, tabBarStyle: { display: 'none' }, title: translate('settings.title') }} />
    </Tabs>
  );
}
