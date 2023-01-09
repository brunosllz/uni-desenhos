import { HStack, Text } from 'native-base'

interface PageIdentifierProps {
  title: string
  hasCount?: boolean
}

export function PageIdentifier({ title, hasCount = false }: PageIdentifierProps) {
  return (
    <HStack
      w="full"
      mt={8}
      alignItems="center"
      justifyContent="space-between"
    >
      <Text
        fontWeight="bold"
        color="gray.100"
        fontSize="lg"
      >
        {title}
      </Text>
      {
        hasCount && (
          <Text
            color="gray.100"
            fontSize="md"
          >
            0
          </Text>
        )
      }
    </HStack>
  )
}