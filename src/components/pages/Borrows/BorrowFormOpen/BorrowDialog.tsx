import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useBorrowBookMutation } from "@/redux/api/borrowsApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import type { Book } from "../../BookPages/columns";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type BorrowFormData = {
  quantity: number;
  dueDate: string; // using string because HTML date input returns string
};

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  book: Book;
};

export function BorrowDialog({ open, setOpen, book }: Props) {
  const [borrowBook, { isLoading }] = useBorrowBookMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<BorrowFormData>({
    defaultValues: { quantity: 1, dueDate: "" },
  });

  const onSubmit: SubmitHandler<BorrowFormData> = async (data) => {
    const qty = Number(data.quantity);
    const due = new Date(data.dueDate);

    // Validation
    if (qty <= 0) {
      setError("quantity", {
        type: "manual",
        message: "Quantity must be greater than 0",
      });
      return;
    }

    if (qty > book.copies) {
      setError("quantity", {
        type: "manual",
        message: "Quantity exceeds available copies",
      });
      return;
    }

    if (due <= new Date()) {
      setError("dueDate", {
        type: "manual",
        message: "Due date must be in the future",
      });
      return;
    }

    // API Call
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
      const error = err as FetchBaseQueryError & {
        data?: { message?: string };
      };
      toast.update(toastId, {
        render: error?.data?.message || "Failed to borrow",
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
              {...register("quantity", { valueAsNumber: true })}
              min={1}
              className="w-full border p-2 rounded"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity.message}</p>
            )}
          </div>

          <div>
            <label>Due Date</label>
            <input
              type="date"
              {...register("dueDate")}
              className="w-full border p-2 rounded"
            />
            {errors.dueDate && (
              <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
            )}
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
