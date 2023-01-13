import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { IconProps } from 'phosphor-react-native'
import { useTheme } from 'native-base'

interface Props extends TouchableOpacityProps {
  icon: React.FC<IconProps>
}

export function ButtonIcon({ icon: Icon, ...rest }: Props) {
  const { colors, sizes } = useTheme()

  return (
    <TouchableOpacity activeOpacity={0.7} {...rest}>
      <Icon color={colors.white} size={sizes[8]} weight="bold" />
    </TouchableOpacity>
  )
}
