import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, View } from 'react-native';
import { DovieNavIcon } from '@/components/brand';
import { AppText } from '@/components/ui';
import { colors, spacing } from '@/design-system/tokens';

export type NotificationItem = { id: string; title: string; message: string; group: 'Hôm nay' | 'Hôm qua'; icon: keyof typeof MaterialCommunityIcons.glyphMap | 'dovie'; unread?: boolean };
export function NotificationList({ items }: { items: NotificationItem[] }) { const groups = [...new Set(items.map(item => item.group))]; return <View style={styles.stack}>{groups.map(group => <View key={group} style={styles.stack}><AppText color="muted" variant="label">{group.toUpperCase()}</AppText>{items.filter(item => item.group === group).map(item => <NotificationRow key={item.id} item={item} />)}</View>)}</View>; }
function NotificationRow({ item }: { item: NotificationItem }) { const color = item.unread ? colors.brand.primary : colors.text.muted; return <View style={[styles.row, item.unread && styles.unread]}>{item.icon === 'dovie' ? <DovieNavIcon color={color} size={30} /> : <MaterialCommunityIcons color={color} name={item.icon} size={24} />}<View style={styles.copy}><AppText variant="label">{item.title}</AppText><AppText color="secondary" variant="label">{item.message}</AppText></View>{item.unread ? <View style={styles.dot} /> : null}</View>; }
const styles = StyleSheet.create({ copy: { flex: 1, gap: spacing.xs }, dot: { backgroundColor: colors.brand.primary, borderRadius: 4, height: 8, width: 8 }, row: { alignItems: 'center', borderBottomColor: colors.border.soft, borderBottomWidth: StyleSheet.hairlineWidth, flexDirection: 'row', gap: spacing.md, minHeight: 68, paddingHorizontal: spacing.sm, paddingVertical: spacing.sm }, stack: { gap: spacing.sm }, unread: { backgroundColor: '#FFF7F8' } });
