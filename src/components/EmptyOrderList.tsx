import { VStack, Text } from 'native-base'
import EmptyLogo from '../assets/empty-logo.svg'

export function EmptyOrderList() {
  return (
    <VStack
      flex={1}
      alignItems="center"
      justifyContent="center"
      mb={8}
      space={2}
    >
      <EmptyLogo />
      <Text color="gray.500" fontSize="lg">
        Você ainda não tem {'\n'}ordens para visualizar
      </Text>
    </VStack>
  )
}
