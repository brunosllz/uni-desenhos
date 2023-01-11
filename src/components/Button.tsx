import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base'

interface Props extends IButtonProps {
  title: string
  variant?: 'primary' | 'secondary'
}

export function Button({ title, variant = 'primary', ...rest }: Props) {
  return (
    <ButtonNativeBase
      w="full"
      h={14}
      rounded="sm"
      fontSize="md"
      bg={variant === 'primary' ? 'green.500' : 'gray.500'}
      _pressed={{
        bg: variant === 'primary' ? 'green.700' : 'gray.600',
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
