import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { colors, radius, spacing } from '@/design-system/tokens';

type SearchFieldProps = { value: string; onChangeText: (value: string) => void; placeholder?: string; onClear?: () => void };

export function SearchField({ onChangeText, onClear, placeholder = 'Tìm kiếm', value }: SearchFieldProps) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons color={colors.text.muted} name="magnify" size={22} />
      <TextInput accessibilityLabel={placeholder} placeholder={placeholder} placeholderTextColor={colors.text.muted} style={styles.input} value={value} onChangeText={onChangeText} />
      {value ? <Pressable accessibilityLabel="Xóa tìm kiếm" accessibilityRole="button" hitSlop={spacing.sm} onPress={onClear ?? (() => onChangeText(''))}><MaterialCommunityIcons color={colors.text.secondary} name="close-circle" size={20} /></Pressable> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', backgroundColor: colors.surface.card, borderColor: colors.brand.soft, borderRadius: radius.pill, borderWidth: 1.5, flexDirection: 'row', gap: spacing.sm, minHeight: 48, paddingHorizontal: spacing.lg },
  input: { color: colors.text.body, flex: 1, fontFamily: 'Quicksand_500Medium', fontSize: 16, paddingVertical: spacing.sm },
});
