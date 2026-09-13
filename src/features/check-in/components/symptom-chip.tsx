import type { ReactNode } from 'react';
import type { PressableProps } from 'react-native';
import { Chip } from '@/components/ui';

type SymptomChipProps = Omit<PressableProps, 'children' | 'style'> & {
  label: string;
  icon?: ReactNode;
  selected?: boolean;
};

/** A multi-select symptom control; the parent owns its selected state. */
export function SymptomChip({ icon, label, selected = false, ...props }: SymptomChipProps) {
  return <Chip accessibilityRole="checkbox" icon={icon} label={label} selected={selected} {...props} />;
}
