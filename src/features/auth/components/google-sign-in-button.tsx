import * as React from 'react';
import { Button } from '@/components/ui';

export function GoogleSignInButton({ disabled, loading, onPress }: { onPress: () => void; disabled?: boolean; loading?: boolean }) {
  return <Button accessibilityLabel="Đăng nhập bằng Google" disabled={disabled} label="Tiếp tục với Google" loading={loading} variant="outline" onPress={onPress} />;
}
