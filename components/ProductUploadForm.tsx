"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X, Upload, Loader2 } from "lucide-react"
import Image from "next/image"
import { RichTextEditor } from "@/components/RichTextEditor"

const PRODUCT_CATEGORIES = [
  "MEDITATION_TOOLS",
  "CRYSTALS",
  "BOOKS",
  "ACCESSORIES",
  "DIGITAL_PRODUCTS",
  "ASTROLOGY_TOOLS",
] as const

type Version = {
  title: string
  price: number
}

const validateImageDimensions = (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = document.createElement('img');
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      URL.revokeObjectURL(img.src); // Clean up
      resolve(Math.abs(aspectRatio - 1) < 0.01); // Allow small deviation
    };
    img.src = URL.createObjectURL(file);
  });
};

export function ProductUploadForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState<string>("")
  const [versions, setVersions] = useState<Version[]>([{ title: "", price: 0 }])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  const handleAddVersion = () => {
    setVersions([...versions, { title: "", price: 0 }])
  }

  const handleRemoveVersion = (index: number) => {
    setVersions(versions.filter((_, i) => i !== index))
  }

  const handleVersionChange = (index: number, field: keyof Version, value: string) => {
    const newVersions = [...versions];
    if (field === "price") {
      // Allow empty string for price input
      newVersions[index][field] = value === "" ? 0 : parseFloat(value) || 0;
    } else {
      newVersions[index][field] = value;
    }
    setVersions(newVersions);
  };

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

    // Validate aspect ratio
    const isValidRatio = await validateImageDimensions(file);
    if (!isValidRatio) {
      toast.error("Please upload a square image (1:1 aspect ratio)");
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
    if (!title || !description || !category || versions.some(v => !v.title) || !imageUrl) {
      toast.error("Please fill in all required fields and upload an image");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          image: imageUrl,
          versions,
          category,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      toast.success("Product created successfully!");
      setTitle("");
      setDescription("");
      setCategory("");
      setVersions([{ title: "", price: 0 }]);
      setImageUrl("");
    } catch (error) {
      toast.error("Failed to create product");
      console.error("Error creating product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-primary-200">
      <CardHeader>
        <CardTitle className="text-primary-900">Add New Product</CardTitle>
        <CardDescription className="text-primary-700">Create and publish new products to the shop</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label className="text-primary-800">Product Image</Label>
          <div className="flex flex-col items-center gap-4">
            {imageUrl ? (
              <div className="relative w-48 h-48 rounded-lg overflow-hidden border border-primary-200">
                <Image
                  src={imageUrl}
                  alt="Product preview"
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
              <div className="w-48 h-48 border-2 border-dashed border-primary-200 rounded-lg flex items-center justify-center hover:border-primary-300 transition-colors">
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
            placeholder="Enter product title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-primary-200 focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description" className="text-primary-800">Description</Label>
          <RichTextEditor
            content={description}
            onChange={(value) => setDescription(value)}
            placeholder="Describe your product in detail. You can use formatting options like bold, italic, lists, and headings to make your description more engaging..."
          />
        </div>
        <div className="space-y-2">
          <Label className="text-primary-800">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="border-primary-200 focus:border-primary-500 focus:ring-primary-500">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="border-primary-200 bg-primary-100">
              {PRODUCT_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat} className="text-primary-800 hover:bg-primary-50 focus:bg-primary-50">
                  {cat.replace(/_/g, " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-primary-800">Versions</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddVersion}
              className="border-primary-200 text-primary-700 hover:bg-primary-50 hover:text-primary-900"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Version
            </Button>
          </div>
          {versions.map((version, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="flex-1 space-y-2">
                <Label className="text-primary-800">Version Title</Label>
                <Input
                  placeholder="e.g., Basic, Premium"
                  value={version.title}
                  onChange={(e) => handleVersionChange(index, "title", e.target.value)}
                  className="border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label className="text-primary-800">Price</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={version.price || ""}
                  onChange={(e) => handleVersionChange(index, "price", e.target.value)}
                  className="border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              {versions.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="mt-8 text-primary-600 hover:text-primary-900 hover:bg-primary-50"
                  onClick={() => handleRemoveVersion(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
        <Button
          className="w-full bg-primary-800 hover:bg-primary-900 text-primary-50"
          size="lg"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Product"}
        </Button>
      </CardContent>
    </Card>
  )
} 