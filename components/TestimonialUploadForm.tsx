import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { Star } from "lucide-react";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const MAX_MESSAGE_LENGTH = 300;

const formSchema = z.object({
  message: z.string()
    .min(10, "Message must be at least 10 characters long")
    .max(MAX_MESSAGE_LENGTH, `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters`),
  author: z.string().min(2, "Author name must be at least 2 characters long"),
  location: z.string().min(2, "Location must be at least 2 characters long"),
  rating: z.number().min(1).max(5, "Rating must be between 1 and 5"),
});

export function TestimonialUploadForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [messageLength, setMessageLength] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
      author: "",
      location: "",
      rating: 5,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await axios.post("/api/testimonials", values);
      toast.success("Testimonial uploaded successfully!");
      form.reset();
      setMessageLength(0);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary-800">Testimonial Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter the testimonial message..."
                  disabled={isLoading}
                  maxLength={MAX_MESSAGE_LENGTH}
                  onChange={(e) => {
                    setMessageLength(e.target.value.length);
                    field.onChange(e);
                  }}
                  value={field.value}
                  className="resize-none border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                />
              </FormControl>
              <FormDescription className="flex justify-end text-sm text-primary-600">
                {messageLength}/{MAX_MESSAGE_LENGTH} characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary-800">Author Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the author's name"
                  disabled={isLoading}
                  {...field}
                  className="border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary-800">Location</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the author's location"
                  disabled={isLoading}
                  {...field}
                  className="border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary-800">Rating</FormLabel>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Button
                    key={rating}
                    type="button"
                    variant="ghost"
                    size="icon"
                    className={`${
                      field.value >= rating ? "text-secondary-600" : "text-primary-300"
                    } hover:bg-primary-50 hover:text-secondary-700`}
                    onClick={() => form.setValue("rating", rating)}
                    disabled={isLoading}
                  >
                    <Star className="h-6 w-6 fill-current" />
                  </Button>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          disabled={isLoading || messageLength > MAX_MESSAGE_LENGTH} 
          className="w-full bg-primary-800 hover:bg-primary-900 text-primary-50"
        >
          Upload Testimonial
        </Button>
      </form>
    </Form>
  );
} 