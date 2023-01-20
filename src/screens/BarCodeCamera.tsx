import { useState, useEffect } from 'react'
import { VStack, Text, View, useToast, Divider, HStack } from 'native-base'
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

export function BarCodeCamera() {
  const [hasPermission, setHasPermission] = useState(null)
  const [orders, setOrders] = useState<FetchOrderProps[]>([
    {
      ITEM: 'U900008',
      LINK: './ENGENHARIA/DESENHOS-FABRICA APONTAMENTO/EDITAVEIS/PORTA PINTADAA/U900008.PDF',
      MASC: '399#109#1011-COLOR SHINE MONROE',
    },
  ])
  const [scanned, setScanned] = useState(false)

  const toast = useToast()

  const onOpenDownloadScreenAnimation = useAnimationState({
    show: {
      opacity: 1,
    },
    hide: {
      opacity: 0,
    },
  })

  const { navigate, goBack } = useNavigation()

  useEffect(() => {
    async function getBarCodeScannerPermissions() {
      const { status } = await BarCodeScanner.requestPermissionsAsync()

      setHasPermission(status === 'granted')
    }

    getBarCodeScannerPermissions()
  }, [])

  let orderNumber = ''

  async function handleBarCodeScanned({ type, data: orderNumberData }) {
    setScanned(true)

    const response = await api.get(`/desenho/${orderNumberData}`)
    orderNumber = orderNumberData

    const orders = response.data

    const hasOrder = orders > 0

    if (!hasOrder) {
      toast.show({
        title: 'Não foi possível encontrar está ordem',
        placement: 'top',
        bgColor: 'red.500',
      })

      return setScanned(false)
    }

    onOpenDownloadScreenAnimation.transitionTo('show')
    setOrders(orders)
  }

  function handleScanAgain() {
    onOpenDownloadScreenAnimation.transitionTo('hide')
    setScanned(false)
  }
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

  return (
    <VStack flex={1} bg="gray.600">
      <VStack flex={1} justifyContent="space-between">
        {!scanned && (
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
          </>
        )}

        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
        />

        <View
          h="1/5"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
          w="full"
          zIndex={0}
        />
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
                orderNumber={orderNumber}
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
