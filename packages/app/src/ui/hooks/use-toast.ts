import { toast } from 'sonner'

export function useToast() {
  function success(message: string) {
    toast.success(message)
  }

  function error(message: string) {
    toast.error(message)
  }

  return {
    success,
    error,
  }
}
