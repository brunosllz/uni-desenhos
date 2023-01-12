import { useState } from 'react'
import { VStack, ScrollView } from 'native-base'

import { OrderProps } from '../../screens/Home/screens/Order'

import { OrderCardDownload } from '../OrderCardDownload'

export function BottomSheetContentDownload() {
  const [orders, setOrders] = useState<OrderProps[]>([])

  return (
    <VStack space={6} paddingX={4} paddingY={6} rounded="md">
      <VStack>
        <ScrollView>
          {orders.map((order) => {
            return <OrderCardDownload key={order.ITEM} order={order} />
          })}
        </ScrollView>
      </VStack>
    </VStack>
  )
}
