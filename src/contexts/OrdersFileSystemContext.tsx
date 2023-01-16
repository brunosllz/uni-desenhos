import { createContext, ReactNode, useState } from 'react'
import { documentDirectory, downloadAsync } from 'expo-file-system'
import { api } from '../lib/axios'
import { OrderProps } from '../screens/Home/screens/Order'

interface OrderFileSystemContextProviderProps {
  children: ReactNode
}

interface OrderFileSystemContextProps {
  downloadOrderDraw: (order: OrderProps) => Promise<void>
  isDownload: boolean
}

export const OrdersFileSystemContext = createContext(
  {} as OrderFileSystemContextProps,
)

export function OrderFileSystemContextProvider({
  children,
}: OrderFileSystemContextProviderProps) {
  const [isDownload, setIsDownload] = useState(false)

  async function downloadOrderDraw(order: OrderProps) {
    try {
      setIsDownload(true)
      const response = await api.post('/files', { link: order.LINK })

      const download = await downloadAsync(
        `${process.env.BASE_API_URL}/files/download/${response.data.id}`,
        `${documentDirectory}${order.MASC}.pdf`,
        {},
      )

      const { uri } = download
      console.log('uri: ', uri)

      setIsDownload(false)
    } catch (error) {
      console.log(error)
      setIsDownload(false)
    } finally {
      setIsDownload(false)
    }
  }

  return (
    <OrdersFileSystemContext.Provider value={{ downloadOrderDraw, isDownload }}>
      {children}
    </OrdersFileSystemContext.Provider>
  )
}
