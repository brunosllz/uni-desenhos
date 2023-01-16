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
import { FetchOrderProps } from '../../contexts/OrdersFileSystemContext'

import { Button } from '../Button'
import { OrderCardDownload } from '../OrderCardDownload'
import { EmptyOrderDownloadList } from '../EmptyOrderDownloadList'

import { Feather } from '@expo/vector-icons'

interface SearchOrderFormData {
  orderNumber: string
}

export function BottomSheetContent() {
  const [orders, setOrders] = useState<FetchOrderProps[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  const { handleSubmit, control, getValues } = useForm<SearchOrderFormData>({
    defaultValues: { orderNumber: '' },
  })

  async function handleSearchOrder(data: SearchOrderFormData) {
    try {
      setIsLoading(true)
      const response = await api.get(`/desenho/${data.orderNumber}`)

      const orders: FetchOrderProps[] = response.data
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
            name="orderNumber"
            rules={{
              required: {
                value: true,
                message: 'Você precisa informar o número da ordem',
              },
            }}
            render={({ field: { onChange, value }, formState: { errors } }) => {
              const hasError = !!errors.orderNumber?.message

              return (
                <Input
                  flex={1}
                  placeholder="Número da ordem"
                  placeholderTextColor="gray.500"
                  keyboardType="numeric"
                  color="gray.100"
                  h={12}
                  bgColor="gray.900"
                  borderWidth={1}
                  borderColor={hasError ? 'red.500' : 'transparent'}
                  _focus={{
                    borderWidth: 1,
                    borderColor: hasError ? 'red.500' : 'green.700',
                  }}
                  onChangeText={onChange}
                  value={value}
                />
              )
            }}
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
              return (
                <OrderCardDownload
                  key={order.ITEM}
                  order={order}
                  orderNumber={getValues('orderNumber')}
                />
              )
            })
          ) : (
            <EmptyOrderDownloadList />
          )}
        </ScrollView>
      </VStack>
    </VStack>
  )
}
