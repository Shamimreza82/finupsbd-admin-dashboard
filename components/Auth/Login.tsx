/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "sonner"


export default function LoginFrom() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
 const router = useRouter()





  const mutation = useMutation({
    mutationFn: async ({ email, password }: { email: string, password: string }) => {
      return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, { email, password })
    },
    onSuccess: (data) => {
      console.log('Login successful:', data)
      toast.success(data?.data?.message || "Login successfull")
      router.push("/dashboard")
      // Invalidate any queries that might need refresh after login
      // You can also redirect or show a toast here


    },
    onError: (error: any) => {
      console.error('Login failed:', error)
      toast.error(error.response?.data?.message || error.message)
    },
  })






  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempt:", { email, password })
    mutation.mutate({ email, password })

  }



  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Admin Service</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="shamimrezabd67@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full mt-4" disabled={mutation.isPending}>
              {mutation.isPending ? 'Signing In...' : 'Sign In'}
            </Button>
            <div className="text-center text-sm text-gray-600">
              {"Don't have an account? "}
              <a href="#" className="text-blue-600 hover:underline font-medium">
                Sign up
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
