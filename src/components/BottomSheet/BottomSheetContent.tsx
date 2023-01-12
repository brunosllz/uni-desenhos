import { useState } from 'react'
import { VStack, HStack, Divider, ScrollView, Input, Icon } from 'native-base'
import { api } from '../../lib/axios'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '../Button'
import { OrderProps } from '../../screens/Home/screens/Order'

import { Feather } from '@expo/vector-icons'
import { EmptyOrderDownloadList } from '../EmptyOrderDownloadList'
import { OrderCardDownload } from '../OrderCardDownload'

export function BottomSheetContent() {
  const [orders, setOrders] = useState<OrderProps[]>([])

  const { handleSubmit, control } = useForm()

  async function handleSearchOrder(data: any) {
    const response = await api.get(`/desenho/${data.order}`)

    setOrders(response.data)
  }

  const hasOrder = orders.length > 0

  return (
    <VStack space={6} paddingX={4} paddingY={6} rounded="md">
      <VStack space={4}>
        <HStack space={3}>
          <Controller
            control={control}
            name="order"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
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
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Button
            title=""
            w={14}
            h={12}
            leftIcon={
              <Icon as={Feather} name="search" color="gray.100" size="sm" />
            }
            onPress={handleSubmit(handleSearchOrder)}
          />
        </HStack>
        <Divider bgColor="gray.500" />
      </VStack>

      <VStack>
        <ScrollView>
          {hasOrder ? (
            orders.map((order) => {
              return <OrderCardDownload key={order.ITEM} order={order} />
            })
          ) : (
            <>
              <EmptyOrderDownloadList />
            </>
          )}
        </ScrollView>
      </VStack>
    </VStack>
  )
}
