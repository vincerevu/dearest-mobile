import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { Screen, ScreenHeader } from '@/components/layout';
import { AppText, Card } from '@/components/ui';
import { spacing } from '@/design-system/tokens';

type Role = 'partner' | 'user';
const options: { role: Role; title: string; description: string }[] = [
  { role: 'user', title: 'Tôi dùng Dearest cho mình', description: 'Theo dõi chu kỳ, check-in và những điều bạn muốn ghi lại.' },
  { role: 'partner', title: 'Tôi là Partner', description: 'Đồng hành và hỗ trợ người thân theo những quyền họ cho phép.' },
];

export function RoleSelectionScreen() {
  const router = useRouter();
  return <Screen scroll><View style={styles.stack}><ScreenHeader title="Bạn đến với Dearest với vai trò nào?" onBack={() => router.back()} /><AppText color="secondary">Bạn có thể thay đổi lựa chọn này sau trong phần cài đặt.</AppText><View style={styles.options}>{options.map(option => <RoleCard key={option.role} {...option} onPress={() => router.replace({ pathname: '/onboarding', params: { role: option.role } })} />)}</View></View></Screen>;
}

function RoleCard({ description, onPress, role, title }: { description: string; onPress: () => void; role: Role; title: string }) { return <Pressable accessibilityLabel={title} accessibilityRole="button" onPress={onPress}><Card variant={role === 'user' ? 'soft' : 'default'}><View style={styles.option}><View style={styles.icon}><MaterialCommunityIcons color={role === 'user' ? '#F2506E' : '#6485A0'} name={role === 'user' ? 'human-female' : 'human-male'} size={42} /></View><View style={styles.copy}><AppText variant="headingMd">{title}</AppText><AppText color="secondary">{description}</AppText></View></View></Card></Pressable>; }

const styles = StyleSheet.create({ copy: { flex: 1, gap: spacing.xs }, icon: { alignItems: 'center', justifyContent: 'center', minWidth: 52 }, option: { alignItems: 'center', flexDirection: 'row', gap: spacing.md }, options: { gap: spacing.md }, stack: { gap: spacing.lg } });
