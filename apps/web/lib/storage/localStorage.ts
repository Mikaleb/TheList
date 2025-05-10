"use client"

import type { Todo } from "@/lib/features/todos/todoSlice"

const STORAGE_KEY = "todos-nextjs-redux"

export const saveToLocalStorage = (todos: Todo[]): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

export const loadFromLocalStorage = (): Todo[] => {
  if (typeof window !== "undefined") {
    const storedTodos = localStorage.getItem(STORAGE_KEY)
    if (storedTodos) {
      try {
        return JSON.parse(storedTodos)
      } catch (error) {
        console.error("Failed to parse todos from localStorage:", error)
      }
    }
  }
  return []
}
