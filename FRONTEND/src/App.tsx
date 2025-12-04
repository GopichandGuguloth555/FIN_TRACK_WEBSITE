import { Toast } from "./components/ui/toast"
import { useToast } from "./components/use-toast"

function App() {
  const { toast, showToast } = useToast()

  return (
    <>
      <button
        className="bg-black text-white p-3 rounded-md"
        onClick={() => showToast({ title: "Saved!", description: "Your expense was added." })}
      >
        Test Toast
      </button>

      {toast && <Toast title={toast.title} description={toast.description} />}
    </>
  )
}

export default App
