import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Screen, ScreenHeader } from '@/components/layout';
import { AppText, Button, SelectionRow } from '@/components/ui';
import { colors, spacing } from '@/design-system/tokens';

type Role = 'partner' | 'user';
const options: { role: Role; title: string; description: string }[] = [
  { role: 'user', title: 'Tôi dùng Dearest cho mình', description: 'Theo dõi chu kỳ, check-in và những điều bạn muốn ghi lại.' },
  { role: 'partner', title: 'Tôi là Partner', description: 'Đồng hành và hỗ trợ người thân theo những quyền họ cho phép.' },
];

export function RoleSelectionScreen() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = React.useState<Role>('user');

  return (
    <Screen scroll>
      <View style={styles.stack}>
        <ScreenHeader title="" onBack={() => router.back()} />
        <View style={styles.intro}>
          <AppText variant="headingLg">
            Bạn đến với Dearest
            {'\n'}
            với vai trò nào?
          </AppText>
          <AppText color="secondary">Bạn có thể thay đổi lựa chọn này sau.</AppText>
        </View>
        <View accessibilityRole="radiogroup" style={styles.options}>
          {options.map(option => (
            <SelectionRow
              key={option.role}
              description={option.description}
              leading={<MaterialCommunityIcons color={colors.navigation.icon} name={option.role === 'user' ? 'account-outline' : 'account-heart-outline'} size={24} />}
              selected={selectedRole === option.role}
              title={option.title}
              onPress={() => setSelectedRole(option.role)}
            />
          ))}
        </View>
        <Button label="Tiếp tục" onPress={() => router.replace({ pathname: '/onboarding', params: { role: selectedRole } })} />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({ intro: { gap: spacing.sm }, options: { gap: 0 }, stack: { gap: spacing.xl } });
