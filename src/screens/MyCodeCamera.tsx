import { useCallback, useEffect, useState } from 'react'
import { HStack, View, Text, useTheme, VStack } from 'native-base'
import { Dimensions, Linking, StyleSheet } from 'react-native'
import { Camera, useCameraDevices } from 'react-native-vision-camera'

import {
  useScanBarcodes,
  BarcodeFormat,
  Point,
} from 'vision-camera-code-scanner'

import { ButtonIcon } from '../components/ButtonIcon'
import { CaretLeft } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'

import { Polygon, Svg } from 'react-native-svg'

export function MyCodeCamera() {
  const [frameWidth, setFrameWidth] = useState(1280)
  const [frameHeight, setFrameHeight] = useState(720)

  const { colors } = useTheme()
  const { goBack } = useNavigation()

  const [frameProcessor, barcodes] = useScanBarcodes(
    [BarcodeFormat.CODE_128, BarcodeFormat.CODE_39, BarcodeFormat.CODE_93],
    { checkInverted: true },
  )

  const devices = useCameraDevices()
  const device = devices.back

  const getFrameSize = () => {
    let width, height

    if (
      frameWidth > frameHeight &&
      Dimensions.get('window').width > Dimensions.get('window').height
    ) {
      width = frameWidth
      height = frameHeight
    } else {
      width = frameHeight
      height = frameWidth
    }

    return [width, height]
  }

  function getViewBox() {
    const frameSize = getFrameSize()
    const viewBox = '0 0 ' + frameSize[0] + ' ' + frameSize[1]
    return viewBox
  }

  const getPointsData = (barcodePoints: Point[]) => {
    const barcodeCoordinate = barcodePoints
      .map((point) => `${point.x},${point.y}`)
      .join(' ')

    return barcodeCoordinate
  }

  const takePermissionsForAccessCamera = useCallback(async () => {
    const permission = await Camera.requestCameraPermission()

    if (permission === 'denied') {
      await Linking.openSettings()
    }
  }, [])

  useEffect(() => {
    takePermissionsForAccessCamera()
  }, [takePermissionsForAccessCamera])

  return !device ? (
    <View />
  ) : (
    <View flex={1}>
      <ButtonIcon
        icon={CaretLeft}
        style={{ position: 'absolute', top: 74, left: 24, zIndex: 1 }}
        onPress={goBack}
      />
      <Camera
        style={{ flex: 1 }}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        frameProcessorFps={2}
      />
      <Svg
        style={[StyleSheet.absoluteFill]}
        viewBox={getViewBox()}
        preserveAspectRatio="xMidYMid slice"
      >
        {barcodes.map((barcode, idx) => (
          <Polygon
            key={idx}
            points={getPointsData(barcode.cornerPoints)}
            fill={colors.green[500]}
            stroke={colors.green[700]}
            opacity="0.5"
            strokeWidth="2"
          />
        ))}
      </Svg>

      <HStack position="absolute" top={100} w="full" paddingX={6} py={6}>
        <VStack
          bg="gray.700"
          flex={1}
          justifyContent="center"
          alignItems="center"
          py={4}
          px={4}
          space={2}
          rounded="lg"
        >
          <Text fontSize="lg" fontWeight="bold" color="gray.100">
            Tipo:{' '}
            {barcodes.length > 0 ? (
              BarcodeFormat[barcodes[0].format]
            ) : (
              <Text color="gray.500">CODE_39</Text>
            )}
          </Text>
          <Text fontSize="lg" fontWeight="bold" color="gray.100">
            Código:{' '}
            {barcodes.length > 0 ? (
              barcodes[0].rawValue
            ) : (
              <Text color="gray.500">315720294</Text>
            )}
          </Text>
        </VStack>
      </HStack>

      <HStack
        position="absolute"
        bottom={15}
        w="full"
        alignItems="center"
        justifyContent="center"
        py={6}
      >
        <Text fontSize="lg" fontWeight="bold" color="white">
          Aproxime do código de barras
        </Text>
      </HStack>
    </View>
  )
}
