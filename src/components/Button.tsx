import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base'

interface Props extends IButtonProps {
  title: string
}

export function Button({ title, ...rest }: Props) {
  return (
    <ButtonNativeBase
      w="full"
      h={14}
      rounded="sm"
      fontSize="md"
      bg="green.500"
      _pressed={{
        bg: "green.700",
      }}
      _loading={{
        _spinner: { color: 'white' },
      }}
      {...rest}
    >
      <Text
        fontSize="sm"
        fontFamily="bold"
        textTransform="uppercase"
        color="gray.100"
      >
        {title}
      </Text>
    </ButtonNativeBase>
  )
}
