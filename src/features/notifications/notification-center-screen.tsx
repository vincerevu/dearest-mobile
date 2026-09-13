import { View } from 'react-native';
import { Screen, ScreenHeader } from '@/components/layout';
import { AppText, EmptyState } from '@/components/ui';
import { spacing } from '@/design-system/tokens';
import { NotificationList, type NotificationItem } from './components';

const notifications: NotificationItem[] = [
  { id: 'period', group: 'Hôm nay', icon: 'calendar-month-outline', message: 'Có thể kỳ kinh của cậu đã bắt đầu hôm nay.', title: 'Chu kỳ', unread: true },
  { id: 'check-in', group: 'Hôm nay', icon: 'dovie', message: 'Một check-in nhỏ sẽ giúp Dovie hiểu hôm nay hơn.', title: 'Dovie', unread: true },
  { id: 'rest', group: 'Hôm qua', icon: 'weather-night', message: 'Đã đến giờ nghỉ một chút rồi.', title: 'Nhắc nhẹ' },
];

export function NotificationCenterScreen() { return <Screen scroll><View style={{ gap: spacing.lg }}><ScreenHeader title="Thông báo" />{notifications.length ? <NotificationList items={notifications} /> : <EmptyState description="Các lời nhắc và cập nhật mới sẽ xuất hiện ở đây." title="Chưa có thông báo" />}</View></Screen>; }
