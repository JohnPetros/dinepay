import { ReceiptsPage } from '@/ui/components/pages/receipts'
import { TipCalculatorPage } from '@/ui/components/pages/tip-calculator'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <TipCalculatorPage />,
  },
  {
    path: 'receipts',
    element: <ReceiptsPage />,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
