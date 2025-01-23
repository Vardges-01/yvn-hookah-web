import { createContext, useContext, useState } from 'react'

const CartContext = createContext(
    {
        isCartOpen: false, // Укажите значение по умолчанию
        setIsCartOpen: (isOpen: boolean) => { isOpen }, // Пустая функция для предотвращения ошибок
        cartItemsCount: 0,
        setCartItemsCount: (count: number) => { count },
    }
)

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItemsCount, setCartItemsCount] = useState(0)

  return (
      <CartContext.Provider value={{ isCartOpen, cartItemsCount, setIsCartOpen, setCartItemsCount }}>
      {children}
    </CartContext.Provider>
  )
}