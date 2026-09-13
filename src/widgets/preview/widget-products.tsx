import { View } from 'react-native';
import { WidgetHeader, WidgetMascot, WidgetMessage, WidgetMetric, WidgetPrivacyIndicator, WidgetQuickAction, WidgetSurface } from './widget-preview-components';
import type { WidgetSnapshot } from '../contracts/widget-snapshot';

type Props = { snapshot: WidgetSnapshot; onPress?: () => void };
function Product({ snapshot, onPress }: Props) { const discreet = snapshot.privacyMode === 'discreet'; return <WidgetSurface><View><WidgetHeader title={snapshot.title ?? 'Dearest'} /><WidgetMascot compact /><WidgetMetric value={discreet ? '♡' : snapshot.metric ?? '—'} /><WidgetMessage>{discreet ? 'Một lời nhắn từ Dearest ♡' : snapshot.message ?? 'Mở Dearest để bắt đầu.'}</WidgetMessage><WidgetPrivacyIndicator mode={snapshot.privacyMode} />{onPress ? <WidgetQuickAction label={snapshot.actionLabel ?? 'Mở'} onPress={onPress} /> : null}</View></WidgetSurface>; }
export function DearestMiniWidget(props: Props) { return <Product {...props} />; }
export function DovieDailyWidget(props: Props) { return <Product {...props} />; }
export function CycleCountdownWidget(props: Props) { return <Product {...props} />; }
export function MoodCheckInWidget(props: Props) { return <Product {...props} />; }
export function GentleReminderWidget(props: Props) { return <Product {...props} />; }
export function PregnancyWeekWidget(props: Props) { return <Product {...props} />; }
export function PostpartumSupportWidget(props: Props) { return <Product {...props} />; }
export function PartnerSupportWidget(props: Props) { return <Product {...props} />; }
