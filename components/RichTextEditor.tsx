"use client"

import { useEditor, EditorContent, Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Document from "@tiptap/extension-document"
import Paragraph from "@tiptap/extension-paragraph"
import Text from "@tiptap/extension-text"
import Heading from "@tiptap/extension-heading"
import BulletList from "@tiptap/extension-bullet-list"
import OrderedList from "@tiptap/extension-ordered-list"
import ListItem from "@tiptap/extension-list-item"
import { Bold, Italic, List, ListOrdered, Quote, Undo, Redo, Heading1, Heading2, Heading3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import "./RichTextEditor.css"
import ImageExtension from "@tiptap/extension-image"
import { Image as ImageIcon } from "lucide-react"
import React from "react"
import Placeholder from "@tiptap/extension-placeholder"

interface MenuBarProps {
  editor: Editor | null
}

const MenuBar = ({ editor }: MenuBarProps) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  if (!editor) {
    return null
  }

  const handleButtonClick = (action: () => boolean, type: string) => {
    console.log(`Attempting to toggle ${type}`)
    const result = action()
    console.log(`Toggle ${type} result:`, result)
  }

  // Image upload handler
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB')
      return
    }
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) throw new Error('Failed to upload image')
      const { url } = await res.json()
      editor.chain().focus().setImage({ src: url }).run()
    } catch (err) {
      alert('Failed to upload image')
    } finally {
      event.target.value = '' // reset input
    }
  }

  return (
    <div className="flex flex-wrap gap-2 p-2 bg-primary-50 rounded-t-lg border-b border-primary-200">
      {/* Image upload button */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />
      <Button
        size="sm"
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        title="Insert Image"
        type="button"
        className="border-primary-200 text-primary-700 hover:bg-primary-100 hover:text-primary-900"
      >
        <ImageIcon className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("bold") ? "default" : "outline"}
        onClick={() => handleButtonClick(() => editor.chain().focus().toggleBold().run(), "bold")}
        title="Bold"
        className={editor.isActive("bold") 
          ? "bg-primary-800 text-primary-50 hover:bg-primary-900" 
          : "border-primary-200 text-primary-700 hover:bg-primary-100 hover:text-primary-900"
        }
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("italic") ? "default" : "outline"}
        onClick={() => handleButtonClick(() => editor.chain().focus().toggleItalic().run(), "italic")}
        title="Italic"
        className={editor.isActive("italic") 
          ? "bg-primary-800 text-primary-50 hover:bg-primary-900" 
          : "border-primary-200 text-primary-700 hover:bg-primary-100 hover:text-primary-900"
        }
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("bulletList") ? "default" : "outline"}
        onClick={() => handleButtonClick(() => editor.chain().focus().toggleBulletList().run(), "bulletList")}
        title="Bullet List"
        className={editor.isActive("bulletList") 
          ? "bg-primary-800 text-primary-50 hover:bg-primary-900" 
          : "border-primary-200 text-primary-700 hover:bg-primary-100 hover:text-primary-900"
        }
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("orderedList") ? "default" : "outline"}
        onClick={() => handleButtonClick(() => editor.chain().focus().toggleOrderedList().run(), "orderedList")}
        title="Numbered List"
        className={editor.isActive("orderedList") 
          ? "bg-primary-800 text-primary-50 hover:bg-primary-900" 
          : "border-primary-200 text-primary-700 hover:bg-primary-100 hover:text-primary-900"
        }
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("blockquote") ? "default" : "outline"}
        onClick={() => handleButtonClick(() => editor.chain().focus().toggleBlockquote().run(), "blockquote")}
        title="Quote"
        className={editor.isActive("blockquote") 
          ? "bg-primary-800 text-primary-50 hover:bg-primary-900" 
          : "border-primary-200 text-primary-700 hover:bg-primary-100 hover:text-primary-900"
        }
      >
        <Quote className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("heading", { level: 1 }) ? "default" : "outline"}
        onClick={() => handleButtonClick(() => editor.chain().focus().toggleHeading({ level: 1 }).run(), "heading-1")}
        title="Heading 1"
        className={editor.isActive("heading", { level: 1 }) 
          ? "bg-primary-800 text-primary-50 hover:bg-primary-900" 
          : "border-primary-200 text-primary-700 hover:bg-primary-100 hover:text-primary-900"
        }
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("heading", { level: 2 }) ? "default" : "outline"}
        onClick={() => handleButtonClick(() => editor.chain().focus().toggleHeading({ level: 2 }).run(), "heading-2")}
        title="Heading 2"
        className={editor.isActive("heading", { level: 2 }) 
          ? "bg-primary-800 text-primary-50 hover:bg-primary-900" 
          : "border-primary-200 text-primary-700 hover:bg-primary-100 hover:text-primary-900"
        }
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("heading", { level: 3 }) ? "default" : "outline"}
        onClick={() => handleButtonClick(() => editor.chain().focus().toggleHeading({ level: 3 }).run(), "heading-3")}
        title="Heading 3"
        className={editor.isActive("heading", { level: 3 }) 
          ? "bg-primary-800 text-primary-50 hover:bg-primary-900" 
          : "border-primary-200 text-primary-700 hover:bg-primary-100 hover:text-primary-900"
        }
      >
        <Heading3 className="h-4 w-4" />
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        onClick={() => handleButtonClick(() => editor.chain().focus().undo().run(), "undo")}
        disabled={!editor.can().undo()}
        title="Undo"
        className="border-primary-200 text-primary-700 hover:bg-primary-100 hover:text-primary-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button 
        size="sm" 
        variant="outline" 
        onClick={() => handleButtonClick(() => editor.chain().focus().redo().run(), "redo")}
        disabled={!editor.can().redo()}
        title="Redo"
        className="border-primary-200 text-primary-700 hover:bg-primary-100 hover:text-primary-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Redo className="h-4 w-4" />
      </Button>
    </div>
  )
}

interface RichTextEditorProps {
  content?: string
  onChange?: (content: string) => void
  className?: string
  placeholder?: string
}

export function RichTextEditor({ content = "", onChange, className = "", placeholder = "Type your text here..." }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      BulletList.configure({
        keepMarks: true,
        keepAttributes: false,
      }),
      OrderedList.configure({
        keepMarks: true,
        keepAttributes: false,
      }),
      ListItem,
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      ImageExtension.configure({
        inline: false,
        allowBase64: false,
      }),
      Placeholder.configure({
        placeholder: placeholder,
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: "outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      console.log('Editor content updated:', html)
      onChange?.(html)
    },
  })

  return (
    <div className={`border border-primary-200 rounded-lg ${className}`}>
      <MenuBar editor={editor} />
      <div className="editor-content">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
} 