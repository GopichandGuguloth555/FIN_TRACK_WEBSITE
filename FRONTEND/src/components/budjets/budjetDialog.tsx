import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddBudgetDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-brand-purpleDark hover:bg-brand-purpleDarker text-white">
          + Add Budget
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white rounded-panel p-6 max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-brand-purpleDark">
            Add Budget
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 flex flex-col gap-3">
          <Input placeholder="Category" />
          <Input placeholder="Monthly Limit (₹)" type="number" />
          <Input placeholder="Month" />

          <Button className="mt-3 bg-brand-purpleDark hover:bg-brand-purpleDarker text-white">
            Save Budget
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
