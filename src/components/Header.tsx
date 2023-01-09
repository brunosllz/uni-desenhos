import {
  VStack,
  Text,
  HStack
} from 'native-base'

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <HStack
      w="full"
      h={32}
      alignItems="flex-end"
      px={6}
      pb={6}
      bg="gray.700"
    >
      <HStack w="full">
        <Text
          fontSize="xl"
          color="white"
        >
          {title}
        </Text>
      </HStack>
    </HStack>
  )
}