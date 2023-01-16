import { HStack, Text } from 'native-base'
import { useOrdersFileSystem } from '../hooks/useOrdersFileSystem'

interface PageIdentifierProps {
  title: string
  hasCount?: boolean
}

export function PageIdentifier({
  title,
  hasCount = false,
}: PageIdentifierProps) {
  const { orders } = useOrdersFileSystem()

  return (
    <HStack w="full" mt={8} alignItems="center" justifyContent="space-between">
      <Text
        fontWeight="bold"
        color="gray.100"
        fontSize="lg"
        fontStyle="uppercase"
      >
        {title}
      </Text>
      {hasCount && (
        <Text color="gray.100" fontSize="md">
          {orders.length}
        </Text>
      )}
    </HStack>
  )
}
