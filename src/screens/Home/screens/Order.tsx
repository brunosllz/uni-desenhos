import { useState } from 'react'
import { VStack } from 'native-base'

import { OrderCard } from '../../../components/OrderCard'
import { EmptyOrderList } from '../../../components/EmptyOrderList'

export interface OrderProps {
  LINK: string
  ITEM: string
  MASC: string
}

export function Order() {
  const [orders, setOrders] = useState<OrderProps[]>([])

  return (
    <VStack flex={1} py={8}>
      {/* flatlist */}
      {orders ? (
        <EmptyOrderList />
      ) : (
        <VStack flex={1}>
          <OrderCard />
          <OrderCard />
        </VStack>
      )}
    </VStack>
  )
}
