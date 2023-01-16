import { HStack, Text, VStack, Pressable, Icon } from 'native-base'
import { FSOrderProps } from '../contexts/OrdersFileSystemContext'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Feather } from '@expo/vector-icons'
import { useOrdersFileSystem } from '../hooks/useOrdersFileSystem'

interface OrderCardProps {
  order: FSOrderProps
}

export function OrderCard({ order }: OrderCardProps) {
  const { readOrderDraw, deleteOrderDraw } = useOrdersFileSystem()

  async function handleReadOrderDraw() {
    await readOrderDraw(order.uri)
  }

  async function handleDeleteOrderDraw() {
    await deleteOrderDraw(order.uri)
  }

  const slipOderUri = order.uri.split('-')

  return (
    <Pressable
      onPress={handleReadOrderDraw}
      bg="gray.700"
      mb={3}
      _pressed={{ bg: 'gray.600' }}
    >
      <HStack
        rounded="sm"
        borderLeftWidth={8}
        borderColor="green.300"
        p={5}
        alignItems="center"
        justifyContent="space-between"
      >
        <VStack space={2} alignItems="flex-start">
          <Text color="gray.100" fontWeight="bold" fontSize="md">
            Ordem {slipOderUri[1]}
          </Text>

          <HStack space={2} alignItems="center">
            <Icon as={Feather} name="clock" color="gray.500" size="sm" />
            <Text
              color="gray.500"
              fontSize="sm"
              w="70%"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {format(order.date, "dd/MM/yy 'às' H'h'", { locale: ptBR })}
            </Text>
          </HStack>
        </VStack>

        <Pressable
          p={4}
          rounded="full"
          bgColor="gray.600"
          _pressed={{
            bg: 'gray.500',
          }}
          onPress={handleDeleteOrderDraw}
        >
          <Icon as={Feather} name="trash-2" color="orange.500" size="lg" />
        </Pressable>
      </HStack>
    </Pressable>
  )
}
