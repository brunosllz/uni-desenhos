import { useState } from 'react'
import {
  VStack,
  HStack,
} from 'native-base'

import { Header } from '../components/Header'
import { Option } from '../components/Option'
import { Order } from './Order'
import { MyCode } from './MyCode'
import { PageIdentifier } from '../components/PageIdentifier'

export function Home() {
  const [optionsSelected, setOptionsSelected] = useState<'order' | 'myCode'>('order')

  return (
    <VStack
      flex={1}
      bg="gray.900"
    >
      <Header title='UNICASA' />
      <VStack
        flex={1}
        px={6}
      >
        {
          optionsSelected === "order"
            ? <PageIdentifier title='Ordens' hasCount />
            : <PageIdentifier title='Meu code' />
        }

        <HStack
          mt={4}
          space={4}
        >
          <Option
            title='ORDENS'
            isSelected={optionsSelected === "order"}
            onPress={() => setOptionsSelected('order')}
          />
          <Option
            title='MEU CODE'
            isSelected={optionsSelected === "myCode"}
            onPress={() => setOptionsSelected('myCode')}
          />
        </HStack>

        {
          optionsSelected === "order"
            ? <Order />
            : <MyCode />
        }
      </VStack>
    </VStack >
  )
}