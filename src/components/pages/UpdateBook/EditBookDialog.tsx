import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateBookMutation } from "@/redux/api/booksCreateApi";
import { bookSchema, type BookFormData, genreOptions } from "@/lib/BookSchema";
import type { Book } from "../BookPages/columns";

type EditBookDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  book: Book;
};

export function EditBookDialog({ open, setOpen, book }: EditBookDialogProps) {
  const [updateBook, { isLoading }] = useUpdateBookMutation();

  const form = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: book?.title || "",
      author: book?.author || "",
      genre: (book?.genre as BookFormData["genre"]) || genreOptions[0],
      isbn: book?.isbn || "",
      description: book?.description || "",
      copies: book?.copies || 0,
      available: book?.available ?? true,
    },
  });

  const handleSubmit = async (values: BookFormData) => {
    const toastId = toast.loading("Updating book...");
    try {
      await updateBook({ id: book._id, updatedData: values }).unwrap();
      toast.update(toastId, {
        render: "Book updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      setOpen(false);
    } catch (err) {
      toast.update(toastId, {
        render: "Failed to update book!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
          <DialogDescription>
            Update the book details and click save when done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input {...form.register("title")} />
          </div>
          <div>
            <Label>Author</Label>
            <Input {...form.register("author")} />
          </div>
          <div>
            <Label>Genre</Label>
            <select
              {...form.register("genre")}
              className="w-full border rounded p-2"
            >
              {genreOptions.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>ISBN</Label>
            <Input {...form.register("isbn")} />
          </div>
          <div>
            <Label>Description</Label>
            <Input {...form.register("description")} />
          </div>
          <div>
            <Label>Copies</Label>
            <Input
              type="number"
              {...form.register("copies", { valueAsNumber: true })}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
