import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useCallback,
} from 'react'
import {
  deleteAsync,
  documentDirectory,
  downloadAsync,
  getContentUriAsync,
} from 'expo-file-system'
import { startActivityAsync } from 'expo-intent-launcher'
import { api } from '../lib/axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
import { useToast } from 'native-base'

export interface FetchOrderProps {
  LINK: string
  ITEM: string
  MASC: string
}

export interface FSOrderProps {
  id: string
  uri: string
  date: Date
}

interface OrderFileSystemContextProviderProps {
  children: ReactNode
}

interface OrderFileSystemContextProps {
  downloadOrderDraw: (
    order: FetchOrderProps,
    orderNumber: string,
  ) => Promise<void>
  readOrderDraw: (orderUri: string) => Promise<void>
  deleteOrderDraw: (orderUri: string) => Promise<void>
  isDownload: boolean
  orders: FSOrderProps[]
}

export const OrdersFileSystemContext = createContext(
  {} as OrderFileSystemContextProps,
)

export function OrderFileSystemContextProvider({
  children,
}: OrderFileSystemContextProviderProps) {
  const [isDownload, setIsDownload] = useState(false)
  const [orders, setOrders] = useState<FSOrderProps[]>([])
  const toast = useToast()

  async function downloadOrderDraw(
    order: FetchOrderProps,
    orderNumber: string,
  ) {
    try {
      setIsDownload(true)
      const response = await api.post('/files', { link: order.LINK })
      const orderUri = `${order.ITEM}-${orderNumber}`

      await downloadAsync(
        `${process.env.BASE_API_URL}/files/download/${response.data.id}`,
        `${documentDirectory}${orderUri}.pdf`,
        {},
      )

      const orderDownloaded = {
        id: String(uuid.v4()),
        uri: orderUri,
        date: new Date(),
      }

      const orderExists = orders.find((order) => order.uri === orderUri)

      if (orderExists) {
        return toast.show({
          title: 'Você já realizou o download deste ordem!',
          placement: 'top',
          bgColor: 'red.500',
        })
      }

      setOrders((state) => {
        return [orderDownloaded, ...state]
      })

      toast.show({
        title: 'Download concluído!',
        placement: 'top',
        bgColor: 'green.500',
      })

      setIsDownload(false)
    } catch (error) {
      console.log(error)

      toast.show({
        title: 'Não foi possível fazer o download, tente novamente!',
        placement: 'top',
        bgColor: 'red.500',
      })
      setIsDownload(false)
    } finally {
      setIsDownload(false)
    }
  }

  async function readOrderDraw(orderUri: string) {
    try {
      const fileUri = await getContentUriAsync(
        `${documentDirectory}${orderUri}.pdf`,
      )

      await startActivityAsync('android.intent.action.VIEW', {
        data: fileUri,
        flags: 1,
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteOrderDraw(orderUri: string) {
    try {
      const deletedOrders = orders.filter((order) => order.uri !== orderUri)
      await deleteAsync(`${documentDirectory}${orderUri}.pdf`)

      await AsyncStorage.setItem(
        '@barcode:orders',
        JSON.stringify(deletedOrders),
      )

      setOrders(deletedOrders)
      toast.show({
        title: 'Ordem deletada!',
        placement: 'top',
        bgColor: 'green.500',
      })
    } catch (error) {
      toast.show({
        title: 'Não foi possível deletar a ordem, tente novamente!',
        placement: 'top',
        bgColor: 'red.500',
      })
      console.log(error)
    }
  }

  const loadingOrders = useCallback(async () => {
    const findOrders = await AsyncStorage.getItem('@barcode:orders')

    if (!findOrders) {
      return
    }

    const ParseOrders = JSON.parse(findOrders)

    setOrders(ParseOrders)
  }, [])

  useEffect(() => {
    async function SaveDownloadOrderDraw() {
      const JSONOrders = JSON.stringify(orders)
      await AsyncStorage.setItem('@barcode:orders', JSONOrders)
    }

    SaveDownloadOrderDraw()
  }, [orders])

  useEffect(() => {
    loadingOrders()
  }, [loadingOrders])

  return (
    <OrdersFileSystemContext.Provider
      value={{
        isDownload,
        orders,
        downloadOrderDraw,
        readOrderDraw,
        deleteOrderDraw,
      }}
    >
      {children}
    </OrdersFileSystemContext.Provider>
  )
}
