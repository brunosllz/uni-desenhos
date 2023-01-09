import { VStack, Icon } from 'native-base'

import { Button } from '../components/Button'
import { OrderCard } from '../components/OrderCard'

import { Feather } from '@expo/vector-icons'

export function Order() {
  return (
    <VStack
      flex={1}
      py={8}
    >
      {/* flatlist */}
      <VStack
        flex={1}
      >
        <OrderCard />
      </VStack>

      <Button
        title='Scanear'
        leftIcon={
          <Icon as={Feather} name="camera" color="gray.100" size="md" />
        }
      />
    </VStack>
  )
}