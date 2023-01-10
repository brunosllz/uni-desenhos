import { useState } from 'react'
import { VStack, Icon, HStack } from 'native-base'
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

      <HStack space={3}>
        <Button
          title="Scanear"
          w="80%"
          leftIcon={
            <Icon as={Feather} name="camera" color="gray.100" size="md" />
          }
          onPress={handleNavigateBarCode}
        />
        <Button
          title=""
          w="18%"
          leftIcon={
            <Icon as={Feather} name="search" color="gray.100" size="md" />
          }
          onPress={() => { }}
        />
      </HStack>
    </VStack>
  )
}
