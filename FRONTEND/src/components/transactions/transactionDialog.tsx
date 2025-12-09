import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddTransactionDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-brand-purpleDark hover:bg-brand-purpleDarker text-white">
          + Add Transaction
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white rounded-panel p-6 max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-brand-purpleDark">
            Add Transaction
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 flex flex-col gap-3">
          <Input placeholder="Title" />
          <Input placeholder="Amount (e.g. 500 or -200)" />

          <Input placeholder="Category" />
          <Input placeholder="Date" type="date" />

          <Button className="mt-3 bg-brand-purpleDark hover:bg-brand-purpleDarker text-white">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
