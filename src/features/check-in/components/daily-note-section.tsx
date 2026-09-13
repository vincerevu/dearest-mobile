import type { TextInputProps } from 'react-native';
import { TextArea } from '@/components/ui';

export function DailyNoteSection(props: TextInputProps) {
  return <TextArea maxLength={500} placeholder="Viết một dòng về hôm nay..." {...props} />;
}
