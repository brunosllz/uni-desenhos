import { useState, useRef } from 'react'
import {
  VStack,
  HStack,
  useTheme,
  Icon,
  Input,
  Text,
  Divider,
  ScrollView,
} from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { Header } from '../../components/Header'
import { Option } from '../../components/Option'
import { Order } from './screens/Order'
import { MyCode } from './screens/MyCode'
import { PageIdentifier } from '../../components/PageIdentifier'
import { BottomSheet, BottomSheetRefProps } from '../../components/BotttomSheet'
import { Button } from '../../components/Button'

import { Feather } from '@expo/vector-icons'
import { OrderCard } from '../../components/OrderCard'

export function Home() {
  const [optionsSelected, setOptionsSelected] = useState<'order' | 'myCode'>(
    'order',
  )
  const BottomSheetRef = useRef<BottomSheetRefProps>(null)
  const { colors } = useTheme()
  const { navigate } = useNavigation()

  function handleNavigateBarCode() {
    navigate('barCode')
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
            w="80%"
            leftIcon={
              <Icon as={Feather} name="camera" color="gray.100" size="md" />
            }
            onPress={handleNavigateBarCode}
          />
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
        </HStack>
      </VStack>

      <BottomSheet ref={BottomSheetRef}>
        <VStack space={6} paddingX={4} paddingY={6} rounded="md">
          <VStack space={4}>
            <Text fontSize="lg" color="gray.100" fontWeight="bold">
              Busque pelo desenho
            </Text>

            <HStack space={2}>
              <Input
                flex={1}
                placeholder="Número da ordem"
                placeholderTextColor="gray.500"
                color="gray.100"
                h={12}
                bgColor="gray.900"
                borderWidth={0}
                _focus={{
                  borderWidth: 1,
                  borderColor: 'green.700',
                }}
              />
              <Button
                title=""
                w={14}
                h={12}
                leftIcon={
                  <Icon as={Feather} name="search" color="gray.100" size="sm" />
                }
              />
            </HStack>
            <Divider />
          </VStack>

          <ScrollView>
            <OrderCard icon="download" variant="secondary" />
            <OrderCard icon="download" variant="secondary" />
          </ScrollView>
        </VStack>
      </BottomSheet>
    </GestureHandlerRootView>
  )
}
