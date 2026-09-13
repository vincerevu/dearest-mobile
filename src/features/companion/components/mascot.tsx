import { DovieAvatar, type DovieAvatarVariant } from '@/components/brand';

type MascotProps = { size?: number; variant?: DovieAvatarVariant };

export function Mascot({ size = 88, variant = 'default' }: MascotProps) {
  return <DovieAvatar accessibilityLabel="Dovie" decorative={false} size={size} variant={variant} />;
}
