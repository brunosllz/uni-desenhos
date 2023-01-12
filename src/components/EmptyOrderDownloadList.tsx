import { VStack, Text, Icon } from 'native-base'
import { Feather } from '@expo/vector-icons'

export function EmptyOrderDownloadList() {
  return (
    <VStack
      flex={1}
      alignItems="center"
      justifyContent="center"
      my="1/4"
      space={4}
    >
      <Icon as={Feather} name="file-text" color="gray.500" size="5xl" />
      <Text color="gray.100" fontSize="lg" textAlign="center">
        Busque pelo desenho para {'\n'} que possa fazer o download
      </Text>
    </VStack>
  )
}
