import { HStack, Text, VStack, Pressable, Icon } from 'native-base'
import { Feather } from '@expo/vector-icons'
import { OrderProps } from '../screens/Home/screens/Order'

interface OrderCardProps {
  order: OrderProps
}

export function OrderCardDownload({ order }: OrderCardProps) {
  return (
    <HStack
      bg="gray.700"
      rounded="sm"
      borderLeftWidth={8}
      borderColor="orange.500"
      p={5}
      alignItems="center"
      justifyContent="space-between"
      mb={3}
    >
      <VStack space={2} alignItems="flex-start">
        <Text color="gray.100" fontWeight="bold" fontSize="md">
          Item {order.ITEM}
        </Text>

        <HStack space={2} alignItems="center">
          {order.LINK.startsWith('CAMINHO') ? (
            <>
              <Icon as={Feather} name="x" color="red.500" size="sm" />
              <Text
                color="red.500"
                fontSize="sm"
                w="70%"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Não possui desenho
              </Text>
            </>
          ) : (
            <>
              <Icon as={Feather} name="check" color="green.500" size="sm" />
              <Text
                color="green.500"
                fontSize="sm"
                w="70%"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Possui desenho
              </Text>
            </>
          )}
        </HStack>
      </VStack>

      <Pressable
        p={4}
        rounded="full"
        bgColor="gray.600"
        disabled={order.LINK.startsWith('CAMINHO')}
        opacity={order.LINK.startsWith('CAMINHO') ? 0.5 : 1}
        _pressed={{
          bg: 'gray.500',
        }}
      >
        <Icon as={Feather} name="download" color="green.500" size="lg" />
      </Pressable>
    </HStack>
  )
}
