import { useState, useEffect, useRef } from 'react'
import { VStack, Text, View } from 'native-base'
import { StyleSheet } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { getStatusBarHeight } from 'react-native-status-bar-height'

import { BottomSheet, BottomSheetRefProps } from '../components/BottomSheet'
import { BottomSheetContentDownload } from '../components/BottomSheet/BottomSheetContentDownload'
import { ButtonIcon } from '../components/ButtonIcon'

import { CaretLeft, CaretUp, Repeat } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'

export function BarCode() {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [cameraExposure, setCameraExposure] = useState<
    'vertical' | 'horizontal'
  >('vertical')
  const BottomSheetRef = useRef<BottomSheetRefProps>(null)

  const { navigate } = useNavigation()

  useEffect(() => {
    async function getBarCodeScannerPermissions() {
      const { status } = await BarCodeScanner.requestPermissionsAsync()

      setHasPermission(status === 'granted')
    }

    getBarCodeScannerPermissions()
  }, [])

  function handleBarCodeScanned({ type, data }) {
    setScanned(true)
    console.log(data)
    console.log(type)
    BottomSheetRef.current.scrollTo(-550)
  }

  function handleChangeCameraExposure() {
    if (cameraExposure === 'vertical') {
      return setCameraExposure('horizontal')
    }

    setCameraExposure('vertical')
  }

  function handleBack() {
    navigate('home')
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <VStack flex={1} bg="gray.600">
      <VStack
        flex={1}
        justifyContent="space-between"
        flexDirection={cameraExposure === 'vertical' ? 'column' : 'row'}
      >
        <View
          h={cameraExposure === 'vertical' ? '1/5' : 'full'}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
          w={cameraExposure === 'vertical' ? 'full' : '1/5'}
          zIndex={0.6}
        />
        <ButtonIcon
          icon={cameraExposure === 'vertical' ? CaretLeft : CaretUp}
          style={{
            position: 'absolute',
            top: getStatusBarHeight() + 32,
            left: cameraExposure === 'vertical' ? 24 : null,
            right: cameraExposure === 'vertical' ? null : 24,
            zIndex: 2,
          }}
          onPress={handleBack}
        />

        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        <ButtonIcon
          icon={Repeat}
          style={{
            backgroundColor: 'gray',
            padding: 16,
            borderRadius: 99999,
            position: 'absolute',
            bottom: 24,
            right: '43%',
            zIndex: 1.5,
            transform: [
              { rotate: cameraExposure === 'vertical' ? '0deg' : '90deg' },
            ],
          }}
          onPress={handleChangeCameraExposure}
        />

        <View
          h={cameraExposure === 'vertical' ? '1/5' : 'full'}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
          w={cameraExposure === 'vertical' ? 'full' : '1/5'}
          zIndex={0.6}
        />
      </VStack>
      <BottomSheet ref={BottomSheetRef}>
        <BottomSheetContentDownload />
      </BottomSheet>
    </VStack>
  )
}
