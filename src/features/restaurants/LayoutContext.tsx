import React, { createContext, useState, ReactNode } from "react"

interface LayoutContextType {
  isMobileMenuOpen: boolean
  setMobileMenuOpen: (isOpen: boolean) => void
  toggleMobileMenu: () => void
}

export const LayoutContext = createContext<LayoutContextType>({
  isMobileMenuOpen: false,
  setMobileMenuOpen: () => {},
  toggleMobileMenu: () => {},
})

interface LayoutProviderProps {
  children: ReactNode
}

const MyLayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen)
  }

  const values: LayoutContextType = {
    isMobileMenuOpen,
    setMobileMenuOpen,
    toggleMobileMenu,
  }

  return <LayoutContext.Provider value={values}>{children}</LayoutContext.Provider>
}

export default MyLayoutProvider
