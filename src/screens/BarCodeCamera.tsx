import { useState, useEffect, useRef } from 'react'
import {
  VStack,
  Text,
  View,
  useToast,
  Divider,
  HStack,
  Spinner,
} from 'native-base'
import { StyleSheet } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { useNavigation } from '@react-navigation/native'
import { MotiView, useAnimationState } from 'moti'
import { FetchOrderProps } from '../contexts/OrdersFileSystemContext'
import { api } from '../lib/axios'

import { OrderCardDownload } from '../components/OrderCardDownload'
import { ButtonIcon } from '../components/ButtonIcon'
import { Loading } from '../components/Loading'
import { Button } from '../components/Button'

import { CaretLeft } from 'phosphor-react-native'
import { AxiosError } from 'axios'

export function BarCodeCamera() {
  const [hasPermission, setHasPermission] = useState(null)
  const [orders, setOrders] = useState<FetchOrderProps[]>([])
  const [onScanned, setonScanned] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()
  const orderNumberRef = useRef('')
  const { navigate, goBack } = useNavigation()

  const onOpenDownloadScreenAnimation = useAnimationState({
    show: {
      opacity: 1,
    },
    hide: {
      opacity: 0,
    },
  })

  async function handleBarCodeScanned({ type, data: orderNumberData }) {
    try {
      setonScanned(true)
      setIsLoading(true)

      const response = await api.get(`/desenho/${orderNumberData}`)

      orderNumberRef.current = orderNumberData

      const orders: FetchOrderProps[] = response.data
      const hasOrder = orders.length > 0

      if (!hasOrder) {
        toast.show({
          title: 'Não foi possível encontrar está ordem',
          placement: 'top',
          duration: 1500,
          bgColor: 'red.500',
        })
        setIsLoading(false)
        setonScanned(false)
        return
      }

      onOpenDownloadScreenAnimation.transitionTo('show')
      setOrders(orders)
      setIsLoading(false)
    } catch (error) {
      setonScanned(false)
      setIsLoading(false)

      if (error instanceof AxiosError) {
        return toast.show({
          title: 'Ocorreu um problema ao buscar a ordem',
          placement: 'top',
          duration: 1500,
          bgColor: 'red.500',
        })
      }

      return toast.show({
        title: 'Ocorreu um problema ao scannear a ordem',
        placement: 'top',
        duration: 1500,
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  function handleScanAgain() {
    onOpenDownloadScreenAnimation.transitionTo('hide')
    setonScanned(false)
    setIsLoading(false)
  }

  useEffect(() => {
    async function getBarCodeScannerPermissions() {
      const { status } = await BarCodeScanner.requestPermissionsAsync()

      setHasPermission(status === 'granted')
    }

    getBarCodeScannerPermissions()
  }, [])

  useEffect(() => {
    onOpenDownloadScreenAnimation.transitionTo('hide')
  }, [onOpenDownloadScreenAnimation])

  if (hasPermission === false) {
    return (
      <VStack
        flex={1}
        bg="gray.900"
        alignItems="center"
        justifyContent="center"
        space={3}
      >
        <Loading />
        <Text>Sem permissão de acessar a camera</Text>
      </VStack>
    )
  }

  if (isLoading) {
    return (
      <VStack
        flex={1}
        alignItems="center"
        justifyContent="center"
        bg="gray.900"
        space={2}
      >
        <Spinner color="green.500" />
        <Text color="white" fontSize="lg">
          Buscando ordem
        </Text>
      </VStack>
    )
  }

  return (
    <VStack flex={1} bg="gray.600">
      <VStack flex={1} justifyContent="space-between">
        {!onScanned && (
          <>
            <View
              h="1/5"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
              w="full"
              zIndex={0.5}
            />

            <ButtonIcon
              icon={CaretLeft}
              style={{
                position: 'absolute',
                top: getStatusBarHeight() + 32,
                left: 24,
                zIndex: 0.5,
              }}
              onPress={goBack}
            />

            <BarCodeScanner
              onBarCodeScanned={onScanned ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFill}
            />

            <View
              h="1/5"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
              w="full"
            />
          </>
        )}
      </VStack>

      <MotiView
        state={onOpenDownloadScreenAnimation}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          // zIndex: 5,
          paddingTop: getStatusBarHeight(),
          backgroundColor: '#29292E',
          paddingHorizontal: 24,
          paddingVertical: 50,
        }}
      >
        <Text color="gray.100" fontSize="lg" mt={12} fontWeight="bold">
          Download ordem
        </Text>
        <Divider bgColor="gray.500" mt={4} />
        <VStack flex={1} py={6}>
          {orders.map((order) => {
            return (
              <OrderCardDownload
                key={order.ITEM}
                orderData={order}
                orderNumber={orderNumberRef.current}
              />
            )
          })}
        </VStack>
        <HStack space={4}>
          <Button title="Ler Novamente" onPress={handleScanAgain} w="48%" />
          <Button
            title="Voltar para home"
            onPress={() => navigate('home')}
            w="48%"
            variant="secondary"
          />
        </HStack>
      </MotiView>
    </VStack>
  )
}
