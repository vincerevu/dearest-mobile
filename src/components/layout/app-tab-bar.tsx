import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from '@/components/ui';
import { colors, spacing } from '@/design-system/tokens';

export type AppTabItem = {
  key: string;
  label: string;
  icon: (active: boolean) => ReactNode;
  badge?: boolean;
};

type AppTabBarProps = {
  tabs: AppTabItem[];
  value: string;
  onChange: (key: string) => void;
};

export function AppTabBar({ onChange, tabs, value }: AppTabBarProps) {
  return (
    <View accessibilityRole="tablist" style={styles.base}>
      {tabs.map((tab) => {
        const active = tab.key === value;
        return (
          <Pressable
            key={tab.key}
            accessibilityLabel={tab.label}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            style={({ pressed }) => [styles.tab, pressed && styles.pressed]}
            onPress={() => onChange(tab.key)}
          >
            <View style={styles.icon}>{tab.icon(active)}{tab.badge ? <View accessibilityLabel="Có thông báo chưa đọc" style={styles.badge} /> : null}</View>
            <AppText adjustsFontSizeToFit color={active ? 'brand' : 'muted'} minimumFontScale={0.72} numberOfLines={1} style={styles.label} variant="label">{tab.label}</AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

export const BottomTabBar = AppTabBar;
export function BottomTabItem({ active, icon, label, onPress }: { active: boolean; icon: ReactNode; label: string; onPress: () => void }) {
  return <Pressable accessibilityLabel={label} accessibilityRole="tab" accessibilityState={{ selected: active }} style={styles.tab} onPress={onPress}><View style={styles.icon}>{icon}</View><AppText adjustsFontSizeToFit color={active ? 'brand' : 'muted'} minimumFontScale={0.72} numberOfLines={1} style={styles.label} variant="label">{label}</AppText></Pressable>;
}

const styles = StyleSheet.create({
  badge: { backgroundColor: colors.brand.primary, borderColor: colors.surface.card, borderRadius: 6, borderWidth: 1.5, height: 8, position: 'absolute', right: -5, top: -3, width: 8 },
  base: { backgroundColor: colors.surface.card, borderTopColor: colors.border.soft, borderTopWidth: 1, flexDirection: 'row', paddingBottom: spacing.sm, paddingTop: spacing.md },
  icon: { height: 24, justifyContent: 'center' },
  pressed: { opacity: 0.68 },
  label: { alignSelf: 'stretch', fontSize: 12, lineHeight: 16, textAlign: 'center' },
  tab: { alignItems: 'center', flex: 1, gap: spacing.xs, minHeight: 48, minWidth: 0, paddingHorizontal: 2 },
});
