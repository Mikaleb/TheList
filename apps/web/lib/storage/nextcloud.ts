"use client"

import type { Todo } from "@/lib/features/todos/todoSlice"

// Nextcloud API configuration
const NEXTCLOUD_URL = process.env.NEXT_PUBLIC_NEXTCLOUD_URL || ""
const NEXTCLOUD_USERNAME = process.env.NEXT_PUBLIC_NEXTCLOUD_USERNAME || ""
const NEXTCLOUD_PASSWORD = process.env.NEXT_PUBLIC_NEXTCLOUD_PASSWORD || ""
const NEXTCLOUD_FILE_PATH = "todos.json"

export const saveToNextcloud = async (todos: Todo[]): Promise<void> => {
  // Check if Nextcloud credentials are configured
  if (!NEXTCLOUD_URL || !NEXTCLOUD_USERNAME || !NEXTCLOUD_PASSWORD) {
    console.warn("Nextcloud credentials not configured. Using mock implementation.")
    mockSaveToNextcloud(todos)
    return
  }

  try {
    // In a real implementation, you would use the Nextcloud WebDAV API
    // to save the todos to a file on Nextcloud
    const response = await fetch(`${NEXTCLOUD_URL}/remote.php/dav/files/${NEXTCLOUD_USERNAME}/${NEXTCLOUD_FILE_PATH}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${NEXTCLOUD_USERNAME}:${NEXTCLOUD_PASSWORD}`)}`,
      },
      body: JSON.stringify(todos),
    })

    if (!response.ok) {
      throw new Error(`Failed to save to Nextcloud: ${response.statusText}`)
    }
  } catch (error) {
    console.error("Error saving to Nextcloud:", error)
    // Fallback to localStorage if Nextcloud save fails
    localStorage.setItem("nextcloud-todos-fallback", JSON.stringify(todos))
  }
}

export const loadFromNextcloud = async (): Todo[] => {
  // Check if Nextcloud credentials are configured
  if (!NEXTCLOUD_URL || !NEXTCLOUD_USERNAME || !NEXTCLOUD_PASSWORD) {
    console.warn("Nextcloud credentials not configured. Using mock implementation.")
    return mockLoadFromNextcloud()
  }

  try {
    // In a real implementation, you would use the Nextcloud WebDAV API
    // to load the todos from a file on Nextcloud
    const response = await fetch(`${NEXTCLOUD_URL}/remote.php/dav/files/${NEXTCLOUD_USERNAME}/${NEXTCLOUD_FILE_PATH}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${btoa(`${NEXTCLOUD_USERNAME}:${NEXTCLOUD_PASSWORD}`)}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to load from Nextcloud: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error loading from Nextcloud:", error)
    // Fallback to localStorage if Nextcloud load fails
    const fallbackData = localStorage.getItem("nextcloud-todos-fallback")
    if (fallbackData) {
      try {
        return JSON.parse(fallbackData)
      } catch (e) {
        console.error("Failed to parse fallback data:", e)
      }
    }
    return []
  }
}

// Mock implementations for when Nextcloud credentials are not configured
const mockSaveToNextcloud = (todos: Todo[]): void => {
  localStorage.setItem("mock-nextcloud-todos", JSON.stringify(todos))
}

const mockLoadFromNextcloud = (): Todo[] => {
  const storedTodos = localStorage.getItem("mock-nextcloud-todos")
  if (storedTodos) {
    try {
      return JSON.parse(storedTodos)
    } catch (error) {
      console.error("Failed to parse mock Nextcloud todos:", error)
    }
  }
  return []
}
