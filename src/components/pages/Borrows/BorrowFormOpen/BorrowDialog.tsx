import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useBorrowBookMutation } from "@/redux/api/borrowsApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import type { Book } from "../../BookPages/columns";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  book: Book;
};

export function BorrowDialog({ open, setOpen, book }: Props) {
  const [borrowBook, { isLoading }] = useBorrowBookMutation();
  const navigate = useNavigate();
  const { register, handleSubmit, setError, reset } = useForm({
    defaultValues: { quantity: 1, dueDate: "" },
  });

  const onSubmit = async (data: any) => {
    const qty = Number(data.quantity);
    const due = new Date(data.dueDate);

    if (qty <= 0)
      return setError("quantity", {
        type: "manual",
        message: "Quantity > 0 required",
      });
    if (qty > book.copies)
      return setError("quantity", {
        type: "manual",
        message: "Quantity exceeds available copies",
      });
    if (due <= new Date())
      return setError("dueDate", {
        type: "manual",
        message: "Due date must be in future",
      });

    const toastId = toast.loading("Processing borrow...");
    try {
      await borrowBook({
        book: book._id,
        quantity: qty,
        dueDate: due.toISOString(),
      }).unwrap();
      toast.update(toastId, {
        render: "Book borrowed successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      reset();
      setOpen(false);
      navigate("/borrow-summary");
    } catch (err) {
      toast.update(toastId, {
        render: err?.data?.message || "Failed to borrow",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Borrow "{book.title}"</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label>Quantity</label>
            <input
              type="number"
              {...register("quantity")}
              min={1}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label>Due Date</label>
            <input
              type="date"
              {...register("dueDate")}
              className="w-full border p-2 rounded"
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Processing..." : "Borrow"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
