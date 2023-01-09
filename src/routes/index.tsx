import { createStackNavigator } from '@react-navigation/stack'
import { BarCode } from '../screens/BarCode'
import { Home } from '../screens/Home'

const { Navigator, Screen } = createStackNavigator()
export function Routes() {


  return (
    <Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen name='home' component={Home} />
      <Screen name='barCode' component={BarCode} />
    </Navigator>
  )
}

