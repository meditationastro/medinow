import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"

interface Appointment {
  id: string
  name: string
  email: string
  phone: string
  sessionType: string
  preferredDate: string
  preferredTime: string
  dateOfBirth?: string
  timeOfBirth?: string
  placeOfBirth?: string
  message?: string
  status: string
  createdAt: string
}

export function AppointmentManager() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      const response = await fetch("/api/appointments", {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })
      if (!response.ok) {
        throw new Error("Failed to fetch appointments")
      }
      const data = await response.json()
      setAppointments(data)
    } catch (error) {
      console.error("Error fetching appointments:", error)
      toast.error("Failed to load appointments")
    } finally {
      setIsLoading(false)
    }
  }

  const updateAppointmentStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/appointments/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error("Failed to update appointment status")
      }

      toast.success("Appointment status updated successfully")
      fetchAppointments() 
    } catch (error) {
      console.error("Error updating appointment status:", error)
      toast.error("Failed to update appointment status")
    }
  }

  const handleRowClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsDialogOpen(true)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-primary font-medium">Loading appointments...</div>
      </div>
    )
  }

  return (
    <>
      <Card className="border-primary/20 shadow-lg">
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary/5 border-primary/20">
                  <TableHead className="text-primary font-semibold">Name</TableHead>
                  <TableHead className="text-primary font-semibold">Email</TableHead>
                  <TableHead className="text-primary font-semibold">Phone</TableHead>
                  <TableHead className="text-primary font-semibold">Session Type</TableHead>
                  <TableHead className="text-primary font-semibold">Date & Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow 
                    key={appointment.id}
                    className="cursor-pointer hover:bg-primary/5 border-primary/10 transition-colors"
                    onClick={() => handleRowClick(appointment)}
                  >
                    <TableCell className="font-medium text-primary/80">{appointment.name}</TableCell>
                    <TableCell className="text-primary/70">{appointment.email}</TableCell>
                    <TableCell className="text-primary/70">{appointment.phone}</TableCell>
                    <TableCell className="text-primary/80">{appointment.sessionType}</TableCell>
                    <TableCell className="text-primary/70">
                      {new Date(appointment.preferredDate).toLocaleDateString()} at{" "}
                      {appointment.preferredTime}
                    </TableCell>
                   
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl border-primary/20 bg-primary-50">
          <DialogHeader>
            <DialogTitle className="text-primary font-semibold">Appointment Details</DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-1 text-primary">Name</h4>
                  <p className="text-primary/80">{selectedAppointment.name}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-primary">Email</h4>
                  <p className="text-primary/80">{selectedAppointment.email}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-primary">Phone</h4>
                  <p className="text-primary/80">{selectedAppointment.phone}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-primary">Session Type</h4>
                  <p className="text-primary/80">{selectedAppointment.sessionType}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-primary">Preferred Date</h4>
                  <p className="text-primary/80">{new Date(selectedAppointment.preferredDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-primary">Preferred Time</h4>
                  <p className="text-primary/80">{selectedAppointment.preferredTime}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-primary">Status</h4>
                  <p className="text-primary/80">{selectedAppointment.status}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-primary">Created At</h4>
                  <p className="text-primary/80">{new Date(selectedAppointment.createdAt).toLocaleString()}</p>
                </div>
                {selectedAppointment.dateOfBirth && (
                  <div>
                    <h4 className="font-semibold mb-1 text-primary">Date of Birth</h4>
                    <p className="text-primary/80">{selectedAppointment.dateOfBirth}</p>
                  </div>
                )}
                {selectedAppointment.timeOfBirth && (
                  <div>
                    <h4 className="font-semibold mb-1 text-primary">Time of Birth</h4>
                    <p className="text-primary/80">{selectedAppointment.timeOfBirth}</p>
                  </div>
                )}
                {selectedAppointment.placeOfBirth && (
                  <div>
                    <h4 className="font-semibold mb-1 text-primary">Place of Birth</h4>
                    <p className="text-primary/80">{selectedAppointment.placeOfBirth}</p>
                  </div>
                )}
              </div>
              {selectedAppointment.message && (
                <div>
                  <h4 className="font-semibold mb-1 text-primary">Message</h4>
                  <p className="whitespace-pre-wrap text-primary/80 bg-primary/5 p-3 rounded-lg border border-primary/10">{selectedAppointment.message}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
