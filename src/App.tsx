import { BrowserRouter } from 'react-router-dom'
import Router from './routes'
import Layout from './components/Layout/Layout'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Router />
        </Layout>
      </BrowserRouter>
    </>
  )
}

export default App