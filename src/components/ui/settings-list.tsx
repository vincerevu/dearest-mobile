import type { ReactNode } from 'react';
import * as React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors, spacing } from '@/design-system/tokens';
import { AppText } from './app-text';

type SettingsListRowProps = {
  label: string;
  description?: string;
  onPress?: () => void;
  trailing?: ReactNode;
  tone?: 'default' | 'danger';
};

/** A light-weight settings row. It is only interactive when an action is supplied. */
export function SettingsListRow({ description, label, onPress, tone = 'default', trailing }: SettingsListRowProps) {
  const content = <><View style={styles.copy}><AppText color={tone === 'danger' ? 'danger' : 'primary'} variant="label">{label}</AppText>{description ? <AppText color="secondary" variant="label">{description}</AppText> : null}</View>{trailing}{onPress ? <MaterialCommunityIcons color={tone === 'danger' ? colors.danger : colors.brand.primary} name="chevron-right" size={22} /> : null}</>;
  if (onPress) return <Pressable accessibilityLabel={label} accessibilityRole="button" style={({ pressed }) => [styles.row, pressed && styles.pressed]} onPress={onPress}>{content}</Pressable>;
  return <View style={styles.row}>{content}</View>;
}

export function SettingsListSection({ children, title }: { title: string; children: ReactNode }) {
  return <View style={styles.section}><AppText color="muted" style={styles.sectionTitle} variant="label">{title}</AppText><View style={styles.rows}>{children}</View></View>;
}

const styles = StyleSheet.create({ copy: { flex: 1, gap: 2 }, pressed: { opacity: 0.68 }, row: { alignItems: 'center', borderBottomColor: colors.border.soft, borderBottomWidth: StyleSheet.hairlineWidth, flexDirection: 'row', gap: spacing.md, minHeight: 64, paddingHorizontal: spacing.lg }, rows: { borderTopColor: colors.border.soft, borderTopWidth: StyleSheet.hairlineWidth }, section: { gap: spacing.xs }, sectionTitle: { fontSize: 12, letterSpacing: 0.6, paddingHorizontal: spacing.lg } });
