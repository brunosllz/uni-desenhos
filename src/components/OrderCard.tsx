import { HStack, Text, VStack, Pressable, Icon } from 'native-base'
import { Feather } from '@expo/vector-icons'

interface OrderCardProps {
  icon?: 'download' | 'trash-2'
  variant?: 'primary' | 'secondary'
}

export function OrderCard({
  icon = 'trash-2',
  variant = 'primary',
}: OrderCardProps) {
  return (
    <HStack
      bg="gray.700"
      rounded="sm"
      borderLeftWidth={8}
      borderColor={variant === 'primary' ? 'green.300' : 'orange.500'}
      p={5}
      alignItems="center"
      justifyContent="space-between"
      mb={3}
    >
      <VStack space={2} alignItems="flex-start">
        <Text color="gray.100" fontWeight="bold" fontSize="md">
          Ordem 474564
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
        <Icon
          as={Feather}
          name={icon}
          color={variant === 'primary' ? 'orange.500' : 'green.500'}
          size="lg"
        />
      </Pressable>
    </HStack>
  )
}
