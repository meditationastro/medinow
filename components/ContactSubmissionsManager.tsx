"use client"

import { useEffect, useState, useCallback } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Download, Copy, Check } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ContactSubmission {
  id: string
  fullName: string
  email: string
  phone: string | null
  service: string
  message: string
  status: string
  createdAt: string
}

interface SubmissionDetailsModalProps {
  submission: ContactSubmission | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

function SubmissionDetailsModal({ submission, open, onOpenChange }: SubmissionDetailsModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  if (!submission) return null

  const details = [
    { label: "Full Name", value: submission.fullName },
    { label: "Email", value: submission.email },
    { label: "Phone", value: submission.phone || "Not provided" },
    { label: "Service", value: submission.service },
    { label: "Message", value: submission.message },
    { label: "Submitted On", value: format(new Date(submission.createdAt), "PPpp") },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto border-primary-200 bg-primary-50">
        <DialogHeader>
          <DialogTitle className="text-primary-900">Submission Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {details.map(({ label, value }) => (
            <div key={label} className="flex flex-col space-y-2">
              <div className="text-sm font-medium text-primary-700">{label}</div>
              <div className="flex items-start justify-between gap-2 p-2 rounded-md bg-white/80 border border-primary-200">
                <div className="flex-1 break-words text-primary-800">{value}</div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-primary-600 hover:text-primary-900 hover:bg-primary-100"
                  onClick={() => copyToClipboard(value, label)}
                >
                  {copiedField === label ? (
                    <Check className="h-4 w-4 text-success-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function ContactSubmissionsManager() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [filteredSubmissions, setFilteredSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null)
  const { status } = useSession()
  const router = useRouter()

  const fetchSubmissions = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/admin/contact-submissions")
      
      if (response.status === 401) {
        router.push("/auth/login")
        return
      }
      
      if (response.status === 403) {
        setError("You don't have permission to view contact submissions")
        return
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch submissions: ${response.statusText}`)
      }

      const data = await response.json()
      
      if (Array.isArray(data)) {
        setSubmissions(data)
        setFilteredSubmissions(data)
      } else {
        console.error("Expected array but got:", data)
        setError("Invalid data format received from server")
        setSubmissions([])
        setFilteredSubmissions([])
      }
    } catch (error) {
      console.error("Error fetching submissions:", error)
      setError(error instanceof Error ? error.message : "Failed to fetch submissions")
      setSubmissions([])
      setFilteredSubmissions([])
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login")
      return
    }
    fetchSubmissions()
  }, [status, router, fetchSubmissions])

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredSubmissions(submissions)
      return
    }

    const searchTermLower = searchTerm.toLowerCase()
    const filtered = submissions.filter((submission) =>
      submission.fullName.toLowerCase().includes(searchTermLower) ||
      submission.email.toLowerCase().includes(searchTermLower) ||
      submission.service.toLowerCase().includes(searchTermLower) ||
      submission.message.toLowerCase().includes(searchTermLower) ||
      (submission.phone && submission.phone.includes(searchTerm))
    )
    setFilteredSubmissions(filtered)
  }, [searchTerm, submissions])

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/contact-submissions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })
      
      if (response.status === 401) {
        router.push("/auth/login")
        return
      }
      
      if (response.status === 403) {
        setError("You don't have permission to update submissions")
        return
      }

      if (!response.ok) {
        throw new Error(`Failed to update status: ${response.statusText}`)
      }
      
      fetchSubmissions() // Refresh the list
    } catch (error) {
      console.error("Error updating status:", error)
      setError(error instanceof Error ? error.message : "Failed to update status")
    }
  }

  const exportToCSV = () => {
    const headers = ["Date", "Name", "Email", "Phone", "Service", "Message", "Status"]
    const csvData = filteredSubmissions.map((submission) => [
      format(new Date(submission.createdAt), "yyyy-MM-dd"),
      submission.fullName,
      submission.email,
      submission.phone || "",
      submission.service,
      submission.message.replace(/"/g, '""'), // Escape quotes in message
      submission.status,
    ])

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute(
      "download",
      `contact-submissions-${format(new Date(), "yyyy-MM-dd")}.csv`
    )
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-secondary-600 text-white"
      case "READ":
        return "bg-primary-600 text-white"
      case "RESPONDED":
        return "bg-success-500 text-white"
      default:
        return "bg-neutral-500 text-white"
    }
  }

  if (status === "loading" || loading) {
    return (
      <Card className="border-primary-200">
        <CardContent className="p-6">
          <div className="text-primary-700">Loading submissions...</div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border-primary-200">
        <CardContent className="p-6">
          <div className="text-red-500">Error: {error}</div>
          <button 
            onClick={() => fetchSubmissions()}
            className="mt-4 px-4 py-2 bg-primary-800 text-primary-50 rounded hover:bg-primary-900"
          >
            Retry
          </button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-primary-200">
      <CardHeader>
        <CardTitle className="text-primary-900">Contact Form Submissions</CardTitle>
        <CardDescription className="text-primary-700">View and manage contact form submissions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-primary-600" />
            <Input
              placeholder="Search by name, email, service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 border-primary-200 focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
          <Button
            onClick={exportToCSV}
            className="flex items-center gap-2 border-primary-200 text-primary-700 hover:bg-primary-50 hover:text-primary-900"
            variant="outline"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>

        {filteredSubmissions.length === 0 ? (
          <div className="text-center py-4 text-primary-600">
            {searchTerm ? "No matching submissions found" : "No submissions found"}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-primary-200">
                <TableHead className="text-primary-800">Date</TableHead>
                <TableHead className="text-primary-800">Name</TableHead>
                <TableHead className="text-primary-800">Email</TableHead>
                <TableHead className="text-primary-800">Service</TableHead>
                <TableHead className="text-primary-800">Status</TableHead>
                <TableHead className="text-primary-800">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubmissions.map((submission) => (
                <TableRow 
                  key={submission.id}
                  className="cursor-pointer hover:bg-primary-50/50 border-primary-200"
                  onClick={() => setSelectedSubmission(submission)}
                >
                  <TableCell className="text-primary-700">
                    {format(new Date(submission.createdAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell className="text-primary-800">{submission.fullName}</TableCell>
                  <TableCell className="text-primary-700">{submission.email}</TableCell>
                  <TableCell className="text-primary-700">{submission.service}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(submission.status)}>
                      {submission.status}
                    </Badge>
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <select
                      value={submission.status}
                      onChange={(e) => updateStatus(submission.id, e.target.value)}
                      className="rounded border border-primary-200 p-1 text-primary-800 bg-white focus:border-primary-500 focus:ring-primary-500"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="READ">Read</option>
                      <option value="RESPONDED">Responded</option>
                    </select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <SubmissionDetailsModal
          submission={selectedSubmission}
          open={!!selectedSubmission}
          onOpenChange={(open) => !open && setSelectedSubmission(null)}
        />
      </CardContent>
    </Card>
  )
} 