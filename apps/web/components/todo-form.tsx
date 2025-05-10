"use client"

import type React from "react"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTodo } from "@/lib/features/todos/todoSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle } from "lucide-react"

export default function TodoForm() {
  const [text, setText] = useState("")
  const dispatch = useDispatch()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      dispatch(addTodo(text))
      setText("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
        className="flex-1"
      />
      <Button type="submit" disabled={!text.trim()}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Add
      </Button>
    </form>
  )
}
