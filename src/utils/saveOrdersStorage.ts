import AsyncStorage from '@react-native-async-storage/async-storage'
import { FSOrderProps } from '../contexts/OrdersFileSystemContext'

export async function saveOrderStorage(order: FSOrderProps) {
  const findOrders = await AsyncStorage.getItem('@barcode:orders')

  if (!findOrders) {
    await AsyncStorage.setItem('@barcode:orders', JSON.stringify([order]))
    return
  }

  const ordersParse = JSON.parse(findOrders)

  const ordersSave = [order, ...ordersParse]

  await AsyncStorage.setItem('@barcode:orders', JSON.stringify(ordersSave))
}
