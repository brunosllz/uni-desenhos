import { VStack, Text } from 'native-base'

export function MyCode() {
  return (
    <VStack flex={1} py={8}>
      <VStack flex={1} bg="gray.700" mb={8} p={6}>
        <Text color="gray.100">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo et
          numquam distinctio ad vitae ullam tempore rem non odio, ab consequatur
          impedit. Voluptates harum repellendus, sed perspiciatis consequuntur
          optio excepturi?
        </Text>
      </VStack>
    </VStack>
  )
}
