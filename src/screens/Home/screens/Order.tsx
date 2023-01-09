import { useState } from 'react'
import { VStack, Icon } from 'native-base'

import { Button } from '../../../components/Button'
import { OrderCard } from '../../../components/OrderCard'

import { Feather } from '@expo/vector-icons'
import { EmptyOrderList } from '../../../components/EmptyOrderList'
import { useNavigation } from '@react-navigation/native'

export function Order() {
  const [orders, setOrders] = useState(true)
  const { navigate } = useNavigation()

  function handleNavigateBarCode() {
    navigate('barCode')
  }

  return (
    <VStack
      flex={1}
      py={8}
    >
      {/* flatlist */}
      {
        !orders ? (
          <EmptyOrderList />
        ) : (
          <VStack
            flex={1}
          >
            <OrderCard />
          </VStack>
        )
      }

      <Button
        title='Scanear'
        leftIcon={
          <Icon as={Feather} name="camera" color="gray.100" size="md" />
        }
        onPress={handleNavigateBarCode}
      />
    </VStack>
  )
}