"use client"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"
import { saveToStorage, loadFromStorage } from "@/lib/storage/storageConnector"

export interface Todo {
  id: string
  text: string
  completed: boolean
}

export type StorageType = "localStorage" | "nextcloud"

interface TodoState {
  items: Todo[]
  storageType: StorageType
  filter: "all" | "active" | "completed"
}

const initialState: TodoState = {
  items: [],
  storageType: "localStorage",
  filter: "all",
}

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: uuidv4(),
        text: action.payload,
        completed: false,
      }
      state.items.push(newTodo)
      saveToStorage(state.items, state.storageType)
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.items.find((todo) => todo.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
        saveToStorage(state.items, state.storageType)
      }
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload)
      saveToStorage(state.items, state.storageType)
    },
    editTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const todo = state.items.find((todo) => todo.id === action.payload.id)
      if (todo) {
        todo.text = action.payload.text
        saveToStorage(state.items, state.storageType)
      }
    },
    setStorageType: (state, action: PayloadAction<StorageType>) => {
      state.storageType = action.payload
      // Load todos from the new storage type
      state.items = loadFromStorage(action.payload)
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.items = action.payload
    },
    initializeStore: (state) => {
      state.items = loadFromStorage(state.storageType)
    },
    setFilter: (state, action: PayloadAction<"all" | "active" | "completed">) => {
      state.filter = action.payload
    },
  },
})

export const { addTodo, toggleTodo, removeTodo, editTodo, setStorageType, setTodos, initializeStore, setFilter } =
  todoSlice.actions

export default todoSlice.reducer
