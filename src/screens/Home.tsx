import { VStack, Text } from 'native-base'

export function Home() {
  return (
    <VStack
      flex={1}
      alignItems="center"
      justifyContent="center"
    >
      <Text>
        Hello World!
      </Text>
    </VStack>
  )
}