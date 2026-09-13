import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { Dovie, DovieMicro } from '@/components/brand';
import { Screen, ScreenHeader, SectionHeader } from '@/components/layout';
import { AppText, Card, EmptyState, InlineActionLink } from '@/components/ui';
import { spacing } from '@/design-system/tokens';
import { todayKey, useCoreStore } from '@/features/core/use-core-store';

const MIN_CHECK_INS = 3;

export function InsightsScreen() {
  const router = useRouter();
  const checkIns = useCoreStore(state => Object.values(state.checkIns));
  const enoughEvidence = checkIns.length >= MIN_CHECK_INS;

  return <Screen scroll><View style={styles.stack}>
    <ScreenHeader title="Những điều Dovie nhận thấy" onBack={() => router.back()} />
    {enoughEvidence ? <>
      <Dovie decorative pose="thinking" size={140} />
      <AppText variant="headingMd">Từ những điều cậu đã ghi nhận</AppText>
      <AppText color="secondary">Đây là quan sát ban đầu, không phải kết luận y khoa.</AppText>
      <Card accessibilityLabel="Xem dữ liệu dùng cho insight" variant="soft" onPress={() => router.push('/insights/check-in-pattern')}><View style={styles.card}><AppText variant="headingMd">Nhịp check-in của cậu</AppText><AppText color="secondary">Dovie đang dựa trên {checkIns.length} check-in do cậu tự ghi nhận.</AppText><InlineActionLink label="Xem dữ liệu" /></View></Card>
    </> : <EmptyState actionLabel="Check-in hôm nay" description={`Cần ít nhất ${MIN_CHECK_INS} check-in để Dovie đưa ra một quan sát có cơ sở. Cứ ghi nhận theo nhịp của cậu nhé.`} icon={<DovieMicro decorative size={96} state="empty" />} onAction={() => router.push(`/check-in/${todayKey()}`)} title="Chưa đủ dữ liệu" />}
  </View></Screen>;
}

export function InsightDetailScreen() {
  const router = useRouter();
  const checkIns = useCoreStore(state => Object.values(state.checkIns));
  return <Screen scroll><View style={styles.stack}>
    <ScreenHeader title="Chi tiết insight" onBack={() => router.back()} />
    <Dovie decorative pose="thinking" size={140} />
    <SectionHeader title="Điều đã ghi nhận" />
    <AppText>Cậu đã hoàn thành {checkIns.length} check-in trong dữ liệu hiện có.</AppText>
    <SectionHeader title="Điều này có thể gợi ý" />
    <AppText color="secondary">Ghi nhận đều đặn hơn sẽ giúp các quan sát sau phản ánh nhịp của cậu rõ hơn. Dovie không xem đây là chẩn đoán.</AppText>
    <SectionHeader title="Dữ liệu dùng cho insight này" />
    <Card variant="soft"><View style={styles.card}><AppText variant="label">USER_REPORTED</AppText><AppText>{checkIns.length} check-in</AppText><AppText color="secondary">Không dùng nội dung nhật ký khi cậu chưa cho phép.</AppText></View></Card>
  </View></Screen>;
}

const styles = { card: { gap: spacing.sm }, stack: { gap: spacing.lg } } as const;
