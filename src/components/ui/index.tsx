/* eslint-disable react-refresh/only-export-components */
import Svg from 'react-native-svg';
import { withUniwind } from 'uniwind';

export * from './app-text';
export * from './badge';
export * from './bottom-sheet';
export * from './button';
export * from './card';
export * from './checkbox';
export * from './checklist-task-row';
export * from './chip';
export { default as colors } from './colors';
export * from './confirm-dialog';
export * from './divider';
export * from './date-field';
export * from './empty-state';
export * from './error-state';
export * from './focus-aware-status-bar';
export * from './health-safety-notice';
export * from './icon-button';
export * from './inline-action-link';
export * from './image';
export * from './input';
export * from './list';
export * from './loading-overlay';
export * from './modal';
export * from './pagination-dots';
export * from './progress-bar';
export * from './search-field';
export * from './select';
export * from './selectable-card';
export * from './settings-list';
export * from './skeleton';
export * from './switch-row';
export * from './text';
export * from './text-area';
export * from './toast';
export * from './utils';

// V1 naming aliases: screens can use the specification's vocabulary while sharing one primitive implementation.
export { Button as PrimaryButton, Button as SecondaryButton } from './button';
export { Input as TextField } from './input';
export { Card as StatCard } from './card';
export { Badge as StatusBadge } from './badge';
export { ConfirmDialog as ModalConfirm } from './confirm-dialog';

// export base components from react-native
export {
  ActivityIndicator,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
export { SafeAreaView } from 'react-native-safe-area-context';

// Apply withUniwind to Svg to add className support
export const StyledSvg = withUniwind(Svg);
