import { VStack, Text, useTheme, HStack, Divider } from 'native-base'
import { Check } from 'phosphor-react-native'

const codeTypes = [
  'CODE_128',
  'CODE_39',
  'CODE_93',
  'CODABAR',
  'DATA_MATRIX',
  'EAN_13',
  'EAN_8',
  'ITF',
  'QR_CODE',
  'UPC_A',
  'UPC_E',
  'PDF417',
  'AZTEC',
]

export function MyCode() {
  const { colors } = useTheme()
  return (
    <VStack flex={1} py={8}>
      <VStack flex={1} bg="gray.700" mb={8} p={6} space={3}>
        <VStack>
          <Text color="gray.100">
            Com o <Text fontWeight="bold">MEU CODE</Text> é possível consultar o
            código de barra/QRCode e o seu tipo.
          </Text>
        </VStack>

        <Divider />

        <VStack>
          <Text color="gray.100">Tem suporte aos tipos:</Text>
          {codeTypes.map((codeType) => {
            return (
              <HStack key={codeType} alignItems="center" space={2} w="full">
                <Check color={colors.green[500]} size={16} weight="bold" />
                <Text color="gray.100">{codeType}</Text>
              </HStack>
            )
          })}
        </VStack>
      </VStack>
    </VStack>
  )
}
