import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { bookSchema, genreOptions, type BookFormData } from "@/lib/BookSchema";
import { useAddBookMutation } from "@/redux/api/booksCreateApi";
import { toast } from "react-toastify";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export default function AddBookForm() {
  const [addBook, { isLoading }] = useAddBookMutation();

  const form = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: genreOptions[0],
      isbn: "",
      description: "",
      copies: 0,
      available: true,
    },
  });

  const handleError = (error: unknown): string => {
    const apiError = error as FetchBaseQueryError & {
      data?: { message?: string };
    };

    return apiError?.data?.message || "Failed to add book. Please try again.";
  };

  async function onSubmit(values: BookFormData) {
    try {
      console.log("Submitting values:", values); // <-- Check this

      const res = await addBook(values);
      console.log("Server response:", res);
      // Success toast
      toast.success("Book added successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      // Reset the form
      form.reset({
        title: "",
        author: "",
        genre: genreOptions[0],
        isbn: "",
        description: "",
        copies: 0,
        available: true,
      });

      console.log("Server response:", res);
    } catch (error) {
      console.error("Error adding book:", error);

      // Error toast
      toast.error(handleError(error), {
        position: "top-right",
        autoClose: 4000,
      });
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add a New Book</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter book title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Author */}
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="Enter author's name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Genre */}
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="w-full border rounded px-3 py-2"
                  >
                    {genreOptions.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ISBN */}
          <FormField
            control={form.control}
            name="isbn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISBN</FormLabel>
                <FormControl>
                  <Input placeholder="Enter ISBN" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Optional description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Copies */}
          <FormField
            control={form.control}
            name="copies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Copies</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Number of copies"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <div className="flex">
            <Button
              className="bg-green-400 p-2 rounded-lg text-xl"
              type="submit"
              disabled={isLoading}
            >
              Add Book
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
