import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import { AppTabBar } from '@/components/layout';
import { colors } from '@/design-system/tokens';

const config = { me: { icon: 'account-circle-outline', label: 'Tôi' }, support: { icon: 'hand-heart-outline', label: 'Hỗ trợ' }, today: { icon: 'heart-outline', label: 'Hôm nay' } } as const;
export default function PartnerTabs() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={({ navigation, state }) => <AppTabBar tabs={state.routes.map(route => ({ key: route.name, label: config[route.name as keyof typeof config].label, icon: active => <MaterialCommunityIcons color={active ? colors.brand.primary : colors.text.muted} name={config[route.name as keyof typeof config].icon} size={23} /> }))} value={state.routes[state.index].name} onChange={key => navigation.navigate(key)} />}>
      <Tabs.Screen name="today" />
      <Tabs.Screen name="support" />
      <Tabs.Screen name="me" />
    </Tabs>
  );
}
