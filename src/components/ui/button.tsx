/* eslint-disable better-tailwindcss/no-unknown-classes */
import type { PressableProps, View } from 'react-native';
import type { VariantProps } from 'tailwind-variants';
import * as React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { tv } from 'tailwind-variants';
import { colors } from '@/design-system/tokens';

const button = tv({
  slots: {
    container: 'my-2 flex min-h-12 flex-row items-center justify-center rounded-full px-6',
    label: 'font-quicksand text-base font-semibold',
    indicator: 'h-6 text-white',
  },

  variants: {
    variant: {
      default: {
        container: 'bg-primary-500',
        label: 'text-white',
        indicator: 'text-white',
      },
      secondary: {
        container: 'bg-primary-50',
        label: 'text-primary-700',
        indicator: 'text-primary-700',
      },
      outline: {
        container: 'border border-primary-500 bg-white',
        label: 'text-primary-700',
        indicator: 'text-primary-700',
      },
      destructive: {
        container: 'bg-danger-600',
        label: 'text-white',
        indicator: 'text-white',
      },
      ghost: {
        container: 'bg-transparent',
        label: 'text-primary-700 underline',
        indicator: 'text-primary-700',
      },
      link: {
        container: 'bg-transparent',
        label: 'text-primary-700',
        indicator: 'text-primary-700',
      },
    },
    size: {
      default: {
        container: 'h-10 px-4',
        label: 'text-base',
      },
      lg: {
        container: 'h-12 px-8',
        label: 'text-xl',
      },
      sm: {
        container: 'h-8 px-3',
        label: 'text-sm',
        indicator: 'h-2',
      },
      icon: { container: 'size-9' },
    },
    disabled: {
      true: {
        container: 'bg-neutral-200',
        label: 'text-neutral-600',
        indicator: 'text-neutral-500',
      },
    },
    fullWidth: {
      true: {
        container: '',
      },
      false: {
        container: 'self-center',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    disabled: false,
    fullWidth: true,
    size: 'default',
  },
});

type ButtonVariants = VariantProps<typeof button>;
type Props = {
  label?: string;
  loading?: boolean;
  className?: string;
  textClassName?: string;
} & ButtonVariants & Omit<PressableProps, 'disabled'>;

export function Button({ ref, label: text, loading = false, variant = 'default', disabled = false, size = 'default', className = '', testID, textClassName = '', ...props }: Props & { ref?: React.RefObject<View | null> }) {
  const styles = React.useMemo(
    () => button({ variant, disabled, size }),
    [variant, disabled, size],
  );
  const indicatorColor = disabled
    ? colors.text.muted
    : variant === 'default' || variant === 'destructive'
      ? colors.text.inverse
      : colors.brand.primary;

  return (
    <Pressable
      disabled={disabled || loading}
      className={styles.container({ className })}
      {...props}
      ref={ref}
      testID={testID}
    >
      {props.children
        ? (
            props.children
          )
        : (
            <>
              {loading
                ? (
                    <ActivityIndicator
                      color={indicatorColor}
                      size="small"
                      className={styles.indicator()}
                      testID={testID ? `${testID}-activity-indicator` : undefined}
                    />
                  )
                : (
                    <Text
                      testID={testID ? `${testID}-label` : undefined}
                      className={styles.label({ className: textClassName })}
                    >
                      {text}
                    </Text>
                  )}
            </>
          )}
    </Pressable>
  );
}
