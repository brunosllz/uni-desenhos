import { Center, Text, Pressable, IPressableProps } from 'native-base'

interface Props extends IPressableProps {
  title: string
  isSelected: boolean
}

export function Option({ title, isSelected = false, ...rest }: Props) {
  return (
    <Pressable flex={1} h={9} {...rest}>
      <Center
        h="full"
        w="full"
        bgColor="gray.700"
        borderWidth={1}
        borderColor={isSelected ? "green.300" : "transparent"}
        rounded="sm"
      >
        <Text color={isSelected ? "green.300" : "gray.500"} fontFamily="heading" fontSize="xs">
          {title}
        </Text>
      </Center>
    </Pressable>
  )
}
