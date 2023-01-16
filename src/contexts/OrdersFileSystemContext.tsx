import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useCallback,
} from 'react'
import {
  documentDirectory,
  downloadAsync,
  getContentUriAsync,
} from 'expo-file-system'
import { startActivityAsync } from 'expo-intent-launcher'
import { api } from '../lib/axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'

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
    orderNumber: number,
  ) => Promise<void>
  readOrderDraw: (orderUri: string) => Promise<void>
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

  async function downloadOrderDraw(
    order: FetchOrderProps,
    orderNumber: number,
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

      setOrders((state) => {
        return [orderDownloaded, ...state]
      })

      setIsDownload(false)
    } catch (error) {
      console.log(error)
      setIsDownload(false)
    } finally {
      setIsDownload(false)
    }
  }

  async function readOrderDraw(orderUri: string) {
    getContentUriAsync(
      `file:///data/user/0/host.exp.exponent/files/ExperienceData/%2540brunosllz%252Fbar-code/${orderUri}.pdf`,
    ).then((orderUri) => {
      startActivityAsync('android.intent.action.VIEW', {
        data: orderUri,
        flags: 1,
        type: 'application/pdf',
      })
    })
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
      value={{ downloadOrderDraw, isDownload, orders, readOrderDraw }}
    >
      {children}
    </OrdersFileSystemContext.Provider>
  )
}
