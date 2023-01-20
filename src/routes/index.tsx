import { createStackNavigator } from '@react-navigation/stack'
import { BarCodeCamera } from '../screens/BarCodeCamera'
import { Home } from '../screens/Home'
import { MyCodeCamera } from '../screens/MyCodeCamera'

const { Navigator, Screen } = createStackNavigator()
export function Routes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="home" component={Home} />
      <Screen name="barCodeCamera" component={BarCodeCamera} />
      <Screen name="myCodeCamera" component={MyCodeCamera} />
    </Navigator>
  )
}
