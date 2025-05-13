"use client"

import type { Todo, StorageType } from "@/lib/features/todos/todoSlice"
import { saveToLocalStorage, loadFromLocalStorage } from "./localStorage"
import { saveToNextcloud, loadFromNextcloud } from "./nextcloud"

export const saveToStorage = (todos: Todo[], storageType: StorageType): void => {
  if (storageType === "localStorage") {
    saveToLocalStorage(todos)
  } else if (storageType === "nextcloud") {
    saveToNextcloud(todos)
  }
}

export const loadFromStorage = (storageType: StorageType): Todo[] => {
  if (storageType === "localStorage") {
    return loadFromLocalStorage()
  } else if (storageType === "nextcloud") {
    return loadFromNextcloud()
  }
  return []
}
