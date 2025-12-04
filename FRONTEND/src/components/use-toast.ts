import * as React from "react"

type Toast = {
  title?: string
  description?: string
}

export function useToast() {
  const [toast, setToast] = React.useState<Toast | null>(null)

  function showToast(data: Toast) {
    setToast(data)
    setTimeout(() => setToast(null), 3000)
  }

  return { toast, showToast }
}
