import { createContext, useContext } from 'react'

export const DirectContext = createContext({ direct: false })
export const useDirectContext = () => useContext(DirectContext)