import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, View } from 'react-native';
import { IconButton } from '@/components/ui';
import { colors, radius } from '@/design-system/tokens';

export function HomeHeaderActions({ hasUnread = false, onNotifications, onProfile }: { hasUnread?: boolean; onNotifications: () => void; onProfile: () => void }) {
  return <View style={styles.actions}><View><IconButton accessibilityLabel={hasUnread ? 'Thông báo mới' : 'Thông báo'} icon={<MaterialCommunityIcons color={colors.brand.primary} name="bell-outline" size={25} />} style={styles.iconButton} onPress={onNotifications} />{hasUnread ? <View accessibilityLabel="Có thông báo chưa đọc" style={styles.badge} /> : null}</View><IconButton accessibilityLabel="Hồ sơ và cài đặt" icon={<MaterialCommunityIcons color={colors.brand.primary} name="account-circle-outline" size={26} />} style={styles.iconButton} onPress={onProfile} /></View>;
}

const styles = StyleSheet.create({ actions: { flexDirection: 'row', gap: 4 }, badge: { backgroundColor: colors.brand.primary, borderColor: colors.surface.card, borderRadius: radius.pill, borderWidth: 2, height: 10, position: 'absolute', right: 7, top: 5, width: 10 }, iconButton: { backgroundColor: 'transparent' } });
