import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login/Login.jsx'
import Signin from './pages/Signin/Signin.jsx'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { MyStore } from './app/Mystore.jsx'
import Layout from './components/Layout/Layout.jsx'
import { useTranslation } from 'react-i18next'
import Home from './pages/Home/Home.jsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'




function App() {

  const routes = createBrowserRouter([
    {
      path: "/", element: <ProtectedRoute>
        <Layout />
      </ProtectedRoute>, children: [
        {
          index: true, element: <Home />
        }
      ]
    },
    {
      path: "/auth", element: <Layout />, children: [
        {
          path: "login", element: <Login />
        },
        {
          path: "signin", element: <Signin />
        },


      ]
    }


  ])
  const { i18n } = useTranslation()
  return (
    <>
      <section className={`app ${i18n.language === 'ar' ? 'arapic' : 'english'} `}>
        <Provider store={MyStore}>
          <RouterProvider router={routes} />
          <Toaster />
        </Provider>
      </section>
    </>
  )
}

export default App

