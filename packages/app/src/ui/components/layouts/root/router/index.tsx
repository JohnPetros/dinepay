import { CalculatorPage } from '@/ui/components/pages/calculator'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <CalculatorPage />,
  },
  {
    path: 'about',
    element: <div>About</div>,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
