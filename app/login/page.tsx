"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LockIcon } from "lucide-react"

export default function LoginPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { isAuthenticated, login } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const success = login(password)

    if (!success) {
      setError("Incorrect password")
      // Close tab after 3 seconds if password is incorrect
      setTimeout(() => {
        window.close()
      }, 3000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900">
      <Card className="w-[350px] backdrop-blur-sm bg-white/10 border-white/20 text-white">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-white/10">
              <LockIcon className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Secure Notes</CardTitle>
          <CardDescription className="text-white/70">Enter the password to access your notes</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              {error && <p className="text-red-300 text-sm">{error} - Closing tab in 3 seconds...</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-white/10 hover:bg-white/20">
              Unlock
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
