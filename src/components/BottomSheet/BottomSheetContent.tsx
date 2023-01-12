import { useState } from 'react'
import { Keyboard } from 'react-native'
import {
  VStack,
  HStack,
  Divider,
  ScrollView,
  Input,
  Icon,
  useToast,
} from 'native-base'
import { api } from '../../lib/axios'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '../Button'
import { OrderProps } from '../../screens/Home/screens/Order'
import { OrderCardDownload } from '../OrderCardDownload'
import { EmptyOrderDownloadList } from '../EmptyOrderDownloadList'

import { Feather } from '@expo/vector-icons'

export function BottomSheetContent() {
  const [orders, setOrders] = useState<OrderProps[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { handleSubmit, control } = useForm()
  const toast = useToast()

  async function handleSearchOrder(data: any) {
    try {
      setIsLoading(true)
      const response = await api.get(`/desenho/${data.order}`)

      const orders: OrderProps[] = response.data
      const hasOrders = orders.length > 0

      if (!hasOrders) {
        toast.show({
          title: 'Não foi possível encontrar está ordem',
          placement: 'top',
          bgColor: 'red.500',
        })
        return
      }

      Keyboard.dismiss()
      setOrders(orders)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      toast.show({
        title: 'Ocorreu um erro ao buscar a ordem, tente novamente!',
        placement: 'top',
        bgColor: 'red.500',
      })

      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
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
                keyboardType="numeric"
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
            disabled={isLoading}
            isLoading={isLoading}
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
