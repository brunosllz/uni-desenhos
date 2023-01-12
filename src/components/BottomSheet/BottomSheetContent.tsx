import { useState } from 'react'
import { VStack, HStack, Divider, ScrollView, Input, Icon } from 'native-base'

import { Button } from '../Button'
import { OrderCard } from '../OrderCard'
import { OrderProps } from '../../screens/Home/screens/Order'

import { Feather } from '@expo/vector-icons'
import { EmptyOrderDownloadList } from '../EmptyOrderDownloadList'

export function BottomSheetContent() {
  const [orders, setOrders] = useState<OrderProps[]>([])

  return (
    <VStack space={6} paddingX={4} paddingY={6} rounded="md">
      <VStack space={4}>
        <HStack space={2}>
          <Input
            flex={1}
            placeholder="Número da ordem"
            placeholderTextColor="gray.500"
            color="gray.100"
            h={12}
            bgColor="gray.900"
            borderWidth={0}
            _focus={{
              borderWidth: 1,
              borderColor: 'green.700',
            }}
          />
          <Button
            title=""
            w={14}
            h={12}
            leftIcon={
              <Icon as={Feather} name="search" color="gray.100" size="sm" />
            }
          />
        </HStack>
        <Divider bgColor="gray.500" />
      </VStack>

      <VStack>
        <ScrollView>
          {orders ? (
            <>
              <EmptyOrderDownloadList />
            </>
          ) : (
            <>
              <OrderCard icon="download" variant="secondary" />
              <OrderCard icon="download" variant="secondary" />
            </>
          )}
        </ScrollView>
      </VStack>
    </VStack>
  )
}
