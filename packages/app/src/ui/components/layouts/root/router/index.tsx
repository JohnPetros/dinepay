import { TipCalculatorPage } from '@/ui/components/pages/tip-calculator'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <TipCalculatorPage />,
  },
  {
    path: 'about',
    element: <div>About</div>,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
