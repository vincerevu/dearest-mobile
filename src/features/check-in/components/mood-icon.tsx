import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Angry, Neutral, Sad, Sleepy } from 'healthicons-react-native/filled-24px';
import { colors } from '@/design-system/tokens';

type Mood = 'happy' | 'neutral' | 'sad' | 'irritated' | 'tired';
type MoodIconProps = { active?: boolean; mood: Mood; size?: number };

/** Health Icons are decorative; the adjacent Vietnamese label carries the meaning. */
export function MoodIcon({ active = true, mood, size = 40 }: MoodIconProps) {
  const props = { height: size, width: size };
  const iconColor = active ? colors.mood[mood].accent : colors.text.muted;
  switch (mood) {
    case 'happy':
      return <MaterialCommunityIcons color={iconColor} name="emoticon-happy-outline" size={size} />;
    case 'sad':
      return <Sad color={iconColor} {...props} />;
    case 'irritated':
      return <Angry color={iconColor} {...props} />;
    case 'tired':
      return <Sleepy color={iconColor} {...props} />;
    default:
      return <Neutral color={iconColor} {...props} />;
  }
}
