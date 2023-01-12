import { useCallback, forwardRef, useImperativeHandle, ReactNode } from 'react'
import { View } from 'native-base'
import { StyleSheet, Dimensions } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { GestureDetector, Gesture } from 'react-native-gesture-handler'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

type BottomSheetProps = {
  children: ReactNode
}
export type BottomSheetRefProps = {
  scrollTo: (destination: number) => void
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT / 1.5

export const BottomSheet = forwardRef<BottomSheetRefProps, BottomSheetProps>(
  ({ children }, ref) => {
    const translateY = useSharedValue(0)
    const context = useSharedValue({ y: 0 })

    const scrollTo = useCallback(
      (destination: number) => {
        'worklet'
        translateY.value = withSpring(destination, { damping: 50 })
      },
      [translateY],
    )

    useImperativeHandle(ref, () => ({ scrollTo }), [scrollTo])

    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translateY.value }
      })
      .onUpdate((event) => {
        translateY.value = event.translationY + context.value.y
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y)
      })
      .onEnd(() => {
        if (translateY.value > -SCREEN_HEIGHT / 2) {
          scrollTo(0)
        }

        if (translateY.value < -SCREEN_HEIGHT / 2) {
          scrollTo(MAX_TRANSLATE_Y)
        }
      })

    const rBottomSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [35, 15],
        Extrapolate.CLAMP,
      )

      return {
        borderRadius,
        transform: [{ translateY: translateY.value }],
      }
    })

    return (
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.container, rBottomSheetStyle]}>
          <View
            w={75}
            h={1}
            bg="gray.500"
            alignSelf="center"
            my={3}
            rounded="full"
          />
          {children}
        </Animated.View>
      </GestureDetector>
    )
  },
)

BottomSheet.displayName = 'BottomSheet'

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: '#29292E',
    paddingHorizontal: 24,
    position: 'absolute',
    top: getStatusBarHeight() + SCREEN_HEIGHT,
    borderRadius: 35,
  },
})
