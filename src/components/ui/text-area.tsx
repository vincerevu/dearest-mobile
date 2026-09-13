import type { TextInputProps } from 'react-native';
import * as React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { colors, spacing } from '@/design-system/tokens';
import { AppText } from './app-text';

type TextAreaProps = TextInputProps & { label?: string; error?: string; helper?: string };

export function TextArea({ error, helper, label, onBlur: onBlurProp, onFocus: onFocusProp, style, ...props }: TextAreaProps) {
  const hint = error ?? helper;
  const [focused, setFocused] = React.useState(false);
  return (
    <View style={styles.container}>
      {label ? <AppText variant="label" style={styles.label}>{label}</AppText> : null}
      <TextInput
        accessibilityLabel={props.accessibilityLabel ?? label}
        multiline
        onBlur={(event) => {
          setFocused(false);
          onBlurProp?.(event);
        }}
        onFocus={(event) => {
          setFocused(true);
          onFocusProp?.(event);
        }}
        placeholderTextColor={colors.text.muted}
        style={[styles.input, focused && styles.inputFocused, Boolean(error) && styles.inputError, style]}
        textAlignVertical="top"
        {...props}
      />
      {hint ? <AppText color={error ? 'danger' : 'muted'} variant="label" style={styles.hint}>{hint}</AppText> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.sm },
  label: { color: colors.text.body },
  input: { backgroundColor: colors.surface.card, borderColor: '#EEE7E8', borderRadius: 14, borderWidth: 1, color: colors.text.body, fontFamily: 'Quicksand_500Medium', fontSize: 16, lineHeight: 24, minHeight: 88, padding: spacing.md },
  inputFocused: { borderColor: colors.brand.primary, borderWidth: 2 },
  inputError: { borderColor: colors.danger, borderWidth: 2 },
  hint: { marginLeft: spacing.xs },
});
