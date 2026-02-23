"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Upload, Loader2,  } from "lucide-react"
import Image from "next/image"

export function GalleryUploadForm() {
  const [title, setTitle] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setImageUrl(data.url);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image");
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!title || !imageUrl) {
      toast.error("Please fill in all fields and upload an image");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add gallery image");
      }

      toast.success("Gallery image added successfully!");
      setTitle("");
      setImageUrl("");
    } catch (error) {
      toast.error("Failed to add gallery image");
      console.error("Error adding gallery image:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-primary-200">
      <CardHeader>
        <CardTitle className="text-primary-900">Add Gallery Image</CardTitle>
        <CardDescription className="text-primary-700">Upload new images to the gallery</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label className="text-primary-800">Image</Label>
          <div className="flex flex-col items-center gap-4">
            {imageUrl ? (
              <div className="relative w-96 h-64 rounded-lg overflow-hidden border border-primary-200">
                <Image
                  src={imageUrl}
                  alt="Gallery preview"
                  fill
                  className="object-cover"
                />
                <Button
                  variant="secondary"
                  className="absolute bottom-2 right-2 bg-secondary-100 text-secondary-700 hover:bg-secondary-200"
                  size="sm"
                  onClick={() => setImageUrl("")}
                >
                  Change
                </Button>
              </div>
            ) : (
              <div className="w-96 h-64 border-2 border-dashed border-primary-200 rounded-lg flex items-center justify-center hover:border-primary-300 transition-colors">
                <label className="cursor-pointer flex flex-col items-center gap-2">
                  {isUploading ? (
                    <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-primary-600" />
                      <span className="text-sm text-primary-700">Upload Image</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />
                </label>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="title" className="text-primary-800">Title</Label>
          <Input
            id="title"
            placeholder="Enter image title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-primary-200 focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
        <Button
          className="w-full bg-primary-800 hover:bg-primary-900 text-primary-50"
          size="lg"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add to Gallery"}
        </Button>
      </CardContent>
    </Card>
  )
} 