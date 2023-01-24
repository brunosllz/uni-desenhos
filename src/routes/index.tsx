import { createStackNavigator } from '@react-navigation/stack'
import { View } from 'native-base'
import { BarCodeCamera } from '../screens/BarCodeCamera'
import { Home } from '../screens/Home'
import { MyCodeCamera } from '../screens/MyCodeCamera'

const { Navigator, Screen } = createStackNavigator()
export function Routes() {
  return (
    <View flex={1} bg="gray.900">
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen name="home" component={Home} />
        <Screen name="barCodeCamera" component={BarCodeCamera} />
        <Screen name="myCodeCamera" component={MyCodeCamera} />
      </Navigator>
    </View>
  )
}
