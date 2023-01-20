import { useState, useRef } from 'react'
import { VStack, HStack, useTheme, Icon } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { Header } from '../../components/Header'
import { Option } from '../../components/Option'
import { Order } from './screens/Order'
import { MyCode } from './screens/MyCode'
import { PageIdentifier } from '../../components/PageIdentifier'
import { BottomSheet, BottomSheetRefProps } from '../../components/BottomSheet'
import { Button } from '../../components/Button'

import { Feather } from '@expo/vector-icons'
import { BottomSheetOrderContent } from '../../components/BottomSheet/BottomSheetOrderContent'

export function Home() {
  const [optionsSelected, setOptionsSelected] = useState<'order' | 'myCode'>(
    'order',
  )
  const BottomSheetRef = useRef<BottomSheetRefProps>(null)
  const { colors } = useTheme()
  const { navigate } = useNavigation()

  function handleNavigateBarCode() {
    navigate('barCodeCamera')
  }

  function handleNavigateMyCode() {
    navigate('myCodeCamera')
  }

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: colors.gray[900],
      }}
    >
      <Header title="UNICASA" />
      <VStack flex={1} px={6}>
        {optionsSelected === 'order' ? (
          <PageIdentifier title="Ordens" hasCount />
        ) : (
          <PageIdentifier title="Meu code" />
        )}

        <HStack mt={4} space={4}>
          <Option
            title="ORDENS"
            isSelected={optionsSelected === 'order'}
            onPress={() => setOptionsSelected('order')}
          />
          <Option
            title="MEU CODE"
            isSelected={optionsSelected === 'myCode'}
            onPress={() => setOptionsSelected('myCode')}
          />
        </HStack>

        {optionsSelected === 'order' ? <Order /> : <MyCode />}

        <HStack space={3} mb={8}>
          <Button
            title="Scanear"
            w={optionsSelected === 'order' ? '80%' : 'full'}
            leftIcon={
              <Icon as={Feather} name="camera" color="gray.100" size="md" />
            }
            onPress={
              optionsSelected === 'order'
                ? handleNavigateBarCode
                : handleNavigateMyCode
            }
          />
          {optionsSelected === 'order' && (
            <Button
              title=""
              variant="secondary"
              w="18%"
              leftIcon={
                <Icon as={Feather} name="search" color="gray.100" size="md" />
              }
              onPress={() => {
                BottomSheetRef.current.scrollTo(-550)
              }}
            />
          )}
        </HStack>
      </VStack>

      <BottomSheet ref={BottomSheetRef}>
        <BottomSheetOrderContent />
      </BottomSheet>
    </GestureHandlerRootView>
  )
}
