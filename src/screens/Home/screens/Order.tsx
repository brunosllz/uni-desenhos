import { useState } from 'react'
import { VStack, Icon } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import { Button } from '../../../components/Button'
import { OrderCard } from '../../../components/OrderCard'
import { EmptyOrderList } from '../../../components/EmptyOrderList'

import { Feather } from '@expo/vector-icons'

interface Order {
  LINK: string
  ITEM: string
  MASC: string
}

export function Order() {
  const [orders, setOrders] = useState<Order[]>([])
  const { navigate } = useNavigation()

  function handleNavigateBarCode() {
    navigate('barCode')
  }

  return (
    <VStack flex={1} py={8}>
      {/* flatlist */}
      {!orders ? (
        <EmptyOrderList />
      ) : (
        <VStack flex={1}>
          <OrderCard />
        </VStack>
      )}

      <Button
        title="Scanear"
        leftIcon={
          <Icon as={Feather} name="camera" color="gray.100" size="md" />
        }
        onPress={handleNavigateBarCode}
      />
    </VStack>
  )
}
