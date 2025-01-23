import { BrowserRouter } from 'react-router-dom'
import Router from './routes'
import Layout from './components/Layout/Layout'
import { CartProvider } from './context/CartContext'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <Layout>
            <Router />
          </Layout>
        </CartProvider>
      </BrowserRouter>
    </>
  )
}

export default App