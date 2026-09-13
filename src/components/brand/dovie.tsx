import type { ImageSourcePropType } from 'react-native';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { cancelAnimation, Easing, ReduceMotion, useAnimatedStyle, useReducedMotion, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { Image } from '@/components/ui';

export type DoviePose = 'default' | 'welcome' | 'listening' | 'checkIn' | 'care' | 'encourage' | 'celebrate' | 'thinking' | 'rest' | 'privacy';
export type DovieMicroState = 'typing' | 'empty' | 'gentleAlert';
export type DovieAvatarVariant = 'default' | 'listening' | 'care' | 'rest';
export type DovieMotion = 'celebrate' | 'idle' | 'typing';

/** The only place that maps a semantic Dovie state to an asset file. */
export const DOVIE_POSES: Record<DoviePose, ImageSourcePropType> = {
  default: require('../../../assets/mascot/dovie/full/dovie-default.png'),
  welcome: require('../../../assets/mascot/dovie/full/dovie-welcome.png'),
  listening: require('../../../assets/mascot/dovie/full/dovie-listening.png'),
  checkIn: require('../../../assets/mascot/dovie/full/dovie-check-in.png'),
  care: require('../../../assets/mascot/dovie/full/dovie-care.png'),
  encourage: require('../../../assets/mascot/dovie/full/dovie-encourage.png'),
  celebrate: require('../../../assets/mascot/dovie/full/dovie-celebrate.png'),
  thinking: require('../../../assets/mascot/dovie/full/dovie-thinking.png'),
  rest: require('../../../assets/mascot/dovie/full/dovie-rest.png'),
  privacy: require('../../../assets/mascot/dovie/full/dovie-privacy.png'),
};

export const DOVIE_MICRO: Record<DovieMicroState, ImageSourcePropType> = {
  typing: require('../../../assets/mascot/dovie/micro/dovie-typing.png'),
  empty: require('../../../assets/mascot/dovie/micro/dovie-empty.png'),
  gentleAlert: require('../../../assets/mascot/dovie/micro/dovie-gentle-alert.png'),
};

export const DOVIE_AVATARS: Record<DovieAvatarVariant, ImageSourcePropType> = {
  default: require('../../../assets/mascot/dovie/avatar/dovie-avatar-default.png'),
  listening: require('../../../assets/mascot/dovie/avatar/dovie-avatar-listening.png'),
  care: require('../../../assets/mascot/dovie/avatar/dovie-avatar-care.png'),
  rest: require('../../../assets/mascot/dovie/avatar/dovie-avatar-rest.png'),
};

export const DOVIE_NAV_ICON = require('../../../assets/dovie-nav-icon.svg');

/** Static PNG modules used during launch so each screen can render Dovie immediately. */
export const DOVIE_PRELOAD_ASSETS = [...Object.values(DOVIE_POSES), ...Object.values(DOVIE_MICRO), ...Object.values(DOVIE_AVATARS), DOVIE_NAV_ICON].filter((source): source is number => typeof source === 'number');

type DovieImageProps<T extends string> = {
  accessibilityLabel?: string;
  decorative?: boolean;
  motion?: DovieMotion;
  size?: number;
  variant: T;
};

/** Motion is deliberately opt-in: small avatars, nav icons, and dense lists remain still. */
function MascotImage<T extends string>({ accessibilityLabel = 'Dovie', decorative = true, motion, size, source, variant: _variant }: DovieImageProps<T> & { source: ImageSourcePropType }) {
  const reduceMotion = useReducedMotion();
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  React.useEffect(() => {
    cancelAnimation(translateY);
    cancelAnimation(scale);
    translateY.set(0);
    scale.set(1);

    if (reduceMotion || !motion)
      return;

    if (motion === 'celebrate') {
      scale.set(withSequence(
        withTiming(1.08, { duration: 160, easing: Easing.bezier(0.23, 1, 0.32, 1), reduceMotion: ReduceMotion.System }),
        withTiming(1, { duration: 240, easing: Easing.bezier(0.23, 1, 0.32, 1), reduceMotion: ReduceMotion.System }),
      ));
      translateY.set(withSequence(
        withTiming(-8, { duration: 160, easing: Easing.bezier(0.23, 1, 0.32, 1), reduceMotion: ReduceMotion.System }),
        withTiming(0, { duration: 240, easing: Easing.bezier(0.23, 1, 0.32, 1), reduceMotion: ReduceMotion.System }),
      ));
    }
    else {
      const distance = motion === 'typing' ? 2 : 4;
      const duration = motion === 'typing' ? 650 : 1800;
      translateY.set(withRepeat(
        withSequence(
          withTiming(-distance, { duration, easing: Easing.inOut(Easing.ease), reduceMotion: ReduceMotion.System }),
          withTiming(0, { duration, easing: Easing.inOut(Easing.ease), reduceMotion: ReduceMotion.System }),
        ),
        -1,
      ));
    }

    return () => {
      cancelAnimation(translateY);
      cancelAnimation(scale);
    };
  }, [motion, reduceMotion, scale, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.get() }, { scale: scale.get() }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Image
        accessible={!decorative}
        accessibilityLabel={decorative ? undefined : accessibilityLabel}
        contentFit="contain"
        source={source}
        style={[styles.image, size ? { height: size, width: size } : styles.flexible]}
      />
    </Animated.View>
  );
}

export function Dovie({ pose = 'default', ...props }: Omit<DovieImageProps<DoviePose>, 'variant'> & { pose?: DoviePose }) {
  return <MascotImage {...props} source={DOVIE_POSES[pose]} variant={pose} />;
}

export function DovieAvatar({ variant = 'default', ...props }: Omit<DovieImageProps<DovieAvatarVariant>, 'variant'> & { variant?: DovieAvatarVariant }) {
  return <MascotImage {...props} source={DOVIE_AVATARS[variant]} variant={variant} />;
}

export function DovieMicro({ state, ...props }: Omit<DovieImageProps<DovieMicroState>, 'variant'> & { state: DovieMicroState }) {
  return <MascotImage {...props} motion={props.motion ?? (state === 'empty' ? 'idle' : undefined)} source={DOVIE_MICRO[state]} variant={state} />;
}

/** Compact monochrome head mark for the Dovie bottom-tab item. */
export function DovieNavIcon({ color, size = 24 }: { color: string; size?: number }) {
  return <Image contentFit="contain" source={DOVIE_NAV_ICON} style={{ height: size, tintColor: color, width: size }} />;
}

const styles = StyleSheet.create({
  flexible: { aspectRatio: 1, width: '100%' },
  image: { alignSelf: 'center' },
});
