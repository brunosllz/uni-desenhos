import { FlatList, VStack } from 'native-base'

import { OrderCard } from '../../../components/OrderCard'
import { EmptyOrderList } from '../../../components/EmptyOrderList'
import { useOrdersFileSystem } from '../../../hooks/useOrdersFileSystem'

export function Order() {
  const { orders } = useOrdersFileSystem()

  const hasOrders = orders.length > 0

  return (
    <VStack flex={1} py={8}>
      {hasOrders ? (
        <VStack flex={1}>
          <FlatList
            data={orders}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 50 }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return <OrderCard order={item} />
            }}
          />
        </VStack>
      ) : (
        <EmptyOrderList />
      )}
    </VStack>
  )
}
