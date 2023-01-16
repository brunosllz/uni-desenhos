import { useContext } from 'react'
import { OrdersFileSystemContext } from '../contexts/OrdersFileSystemContext'

export function useOrdersFileSystem() {
  const context = useContext(OrdersFileSystemContext)

  return context
}
