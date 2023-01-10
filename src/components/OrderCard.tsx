import { HStack, Text, VStack, Pressable, Icon } from 'native-base'
import { Feather } from '@expo/vector-icons'

export function OrderCard() {
  return (
    <HStack
      bg="gray.700"
      rounded="sm"
      borderLeftWidth={8}
      borderColor="green.300"
      p={5}
      alignItems="center"
      justifyContent="space-between"
    >
      <VStack space={2} alignItems="flex-start">
        <Text color="gray.100" fontWeight="bold" fontSize="md">
          Ordem 47456
        </Text>

        <HStack space={2} alignItems="center">
          <Icon as={Feather} name="clock" color="gray.500" size="sm" />
          <Text color="gray.500" fontSize="sm">
            20/01/22 às 14h
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
      >
        <Icon as={Feather} name="trash-2" color="orange.500" size="lg" />
      </Pressable>
    </HStack>
  )
}
