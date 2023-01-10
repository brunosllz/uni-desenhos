import { Center, Text, Pressable, IPressableProps } from 'native-base'

interface Props extends IPressableProps {
  title: string
  isSelected: boolean
}

export function Option({ title, isSelected = false, ...rest }: Props) {
  return (
    <Pressable
      flex={1}
      h={9}
      bgColor="gray.700"
      _pressed={{ bgColor: 'gray.600' }}
      borderWidth={1}
      borderColor={isSelected ? 'green.300' : 'transparent'}
      rounded="sm"
      {...rest}
    >
      <Center h="full" w="full">
        <Text
          color={isSelected ? 'green.300' : 'gray.500'}
          fontFamily="heading"
          fontSize="xs"
        >
          {title}
        </Text>
      </Center>
    </Pressable>
  )
}
