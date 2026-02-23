"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Shield, User, Search } from "lucide-react"

type UserEntry = {
  id: string
  name: string | null
  email: string | null
  role: "ADMIN" | "USER"
  emailVerified: string | null
  createdAt: string
}

export function UsersManager() {
  const [users, setUsers] = useState<UserEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  async function fetchUsers() {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/users")
      if (res.ok) setUsers(await res.json())
    } catch {}
    setLoading(false)
  }

  async function toggleRole(userId: string, currentRole: string) {
    setUpdating(userId)
    try {
      const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN"
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      })
      if (res.ok) {
        setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, role: newRole as "ADMIN" | "USER" } : u))
      }
    } catch {}
    setUpdating(null)
  }

  useEffect(() => { fetchUsers() }, [])

  const filtered = users.filter((u) =>
    !search || (u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <Card className="border-primary-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-primary-900">User Management</CardTitle>
            <p className="text-primary-600 text-sm mt-1">Assign ADMIN or USER roles. Admins can access this dashboard.</p>
          </div>
          <Button variant="outline" size="sm" onClick={fetchUsers} className="border-primary-300">
            <RefreshCw className="w-4 h-4 mr-1" /> Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
            <input type="text" placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 py-2 border border-primary-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white" />
          </div>
          <div className="flex gap-3 text-sm">
            <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              <Shield className="w-3 h-3" />{users.filter((u) => u.role === "ADMIN").length} Admins
            </span>
            <span className="flex items-center gap-1 text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              <User className="w-3 h-3" />{users.filter((u) => u.role === "USER").length} Users
            </span>
          </div>
        </div>

        {loading ? (
          <div className="py-10 text-center text-primary-600">Loading users...</div>
        ) : filtered.length === 0 ? (
          <div className="py-10 text-center text-primary-600">No users found.</div>
        ) : (
          <div className="space-y-2">
            {filtered.map((user) => (
              <div key={user.id}
                className="flex items-center justify-between p-4 rounded-xl border border-primary-100 hover:bg-primary-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${user.role === "ADMIN" ? "bg-amber-600" : "bg-primary-600"}`}>
                    {user.name ? user.name[0].toUpperCase() : user.email?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div>
                    <div className="font-semibold text-primary-900">{user.name || "No name"}</div>
                    <div className="text-primary-600 text-sm">{user.email}</div>
                    <div className="text-primary-400 text-xs">Joined {new Date(user.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={user.role === "ADMIN" ? "bg-amber-100 text-amber-800 border-amber-300" : "bg-blue-100 text-blue-800 border-blue-300"}>
                    {user.role === "ADMIN" ? <><Shield className="w-3 h-3 mr-1" />Admin</> : <><User className="w-3 h-3 mr-1" />User</>}
                  </Badge>
                  {user.emailVerified && <Badge className="bg-green-100 text-green-800 border-green-300 text-xs">Verified</Badge>}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={updating === user.id}
                    onClick={() => toggleRole(user.id, user.role)}
                    className={`text-xs ${user.role === "ADMIN" ? "border-red-300 text-red-700 hover:bg-red-50" : "border-amber-300 text-amber-700 hover:bg-amber-50"}`}
                  >
                    {updating === user.id ? "Updating..." : user.role === "ADMIN" ? "Revoke Admin" : "Make Admin"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
          <strong>Role Definitions:</strong> <strong>ADMIN</strong> — full access to this dashboard, can manage all content, orders, users, blogs, and gallery. <strong>USER</strong> — customer/student account, can view their own orders and appointments in the user dashboard (/dashboard).
        </div>
      </CardContent>
    </Card>
  )
}
