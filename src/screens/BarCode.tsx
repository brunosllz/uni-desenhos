import { BarCodeScanner } from 'expo-barcode-scanner'
import { VStack, Text } from 'native-base'
import { useState, useEffect, useRef } from 'react'
import { StyleSheet, Button } from 'react-native'
import { BottomSheet, BottomSheetRefProps } from '../components/BottomSheet'
import { BottomSheetContent } from '../components/BottomSheet/BottomSheetContent'

export function BarCode() {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const BottomSheetRef = useRef<BottomSheetRefProps>(null)

  useEffect(() => {
    async function getBarCodeScannerPermissions() {
      const { status } = await BarCodeScanner.requestPermissionsAsync()

      setHasPermission(status === 'granted')
    }

    getBarCodeScannerPermissions()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    console.log(data)
    console.log(type)
    BottomSheetRef.current.scrollTo(-550)
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <VStack flex={1} justifyContent="center" bg="gray.500">
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}

      <BottomSheet ref={BottomSheetRef}>
        <BottomSheetContent />
      </BottomSheet>
    </VStack>
  )
}
