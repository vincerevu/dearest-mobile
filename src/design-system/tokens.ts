import type { ViewStyle } from 'react-native';

export const colors = {
  background: { primary: '#FFFDFD', secondary: '#FFF8F8' },
  surface: { card: '#FFFFFF', soft: '#FFF4F5' },
  border: { default: '#F3E4E6', soft: '#F5EBED' },
  text: { primary: '#171719', body: '#251615', secondary: '#71777B', muted: '#858C91', inverse: '#FFFFFF' },
  brand: { primary: '#F2506E', action: '#FF4D77', rose: '#F43768', soft: '#F9E1E7' },
  cycle: { actual: '#F43768', predicted: '#F9E1E7', fertile: '#FFD9AD', today: '#F2506E' },
  energy: { low: '#EF5B47', medium: '#FFBD36', good: '#54D46A' },
  mood: {
    happy: { accent: '#F7A600', soft: '#FFF4D6' },
    neutral: { accent: '#21A982', soft: '#E5F8F0' },
    sad: { accent: '#577EE5', soft: '#E9EEFF' },
    irritated: { accent: '#F05252', soft: '#FFE8E5' },
    tired: { accent: '#9B63E5', soft: '#F0E8FF' },
  },
  provenance: { actual: '#FCE5EA', calculated: '#F7EEF0', aiInsight: '#FFF0D9' },
  warning: { background: '#FFFAF0', border: '#F4CB77' },
  navigation: { icon: '#737B80', chevron: '#A1A6AA', pressed: '#FFF4F5' },
  danger: '#D93654',
} as const;

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32 } as const;
export const radius = { sm: 12, md: 18, lg: 24, xl: 28, pill: 999 } as const;

export const shadows = {
  card: {
    shadowColor: '#DC96A0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 2,
  } satisfies ViewStyle,
} as const;
