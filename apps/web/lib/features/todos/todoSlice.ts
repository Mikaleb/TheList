"use client";

import {
  createSlice,
  createEntityAdapter,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { saveToStorage, loadFromStorage } from "@/lib/storage/storageConnector";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export type StorageType = "localStorage" | "nextcloud";

export enum FilterTypeEnum {
  all,
  completed,
  pending,
}

// Define filter type
export type FilterType = "all" | "active" | "completed";

// Use createEntityAdapter for normalized state
const todosAdapter = createEntityAdapter<Todo>();

// Extended state with metadata like filter and storageType
interface TodosState {
  ids: string[];
  entities: Record<string, Todo>;
  storageType: StorageType;
  filter: FilterType;
}

const initialState = todosAdapter.getInitialState({
  storageType: "localStorage",
  filter: "all",
} as TodosState);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // Add new todo
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: uuidv4(),
        text: action.payload,
        completed: false,
      };
      todosAdapter.addOne(state, newTodo);
      saveToStorage(
        todosAdapter.getSelectors().selectAll(state),
        state.storageType
      );
    },

    // Toggle completion status
    toggleTodo: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const todo = state.entities[id];
      if (todo) {
        todosAdapter.updateOne(state, {
          id,
          changes: { completed: !todo.completed },
        });
        saveToStorage(
          todosAdapter.getSelectors().selectAll(state),
          state.storageType
        );
      }
    },

    // Remove todo
    removeTodo: (state, action: PayloadAction<string>) => {
      todosAdapter.removeOne(state, action.payload);
      saveToStorage(
        todosAdapter.getSelectors().selectAll(state),
        state.storageType
      );
    },

    // Edit todo text
    editTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const { id, text } = action.payload;
      const todo = state.entities[id];
      if (todo) {
        todosAdapter.updateOne(state, { id, changes: { text } });
        saveToStorage(
          todosAdapter.getSelectors().selectAll(state),
          state.storageType
        );
      }
    },

    // Set storage type and load data
    setStorageType: (state, action: PayloadAction<StorageType>) => {
      state.storageType = action.payload;
      const loadedTodos = loadFromStorage(action.payload);
      todosAdapter.setAll(state, loadedTodos);
    },

    // Replace all todos (e.g., on init or sync)
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      todosAdapter.setAll(state, action.payload);
    },

    // Initialize store by loading from current storage
    initializeStore: (state) => {
      const loadedTodos = loadFromStorage(state.storageType);
      todosAdapter.setAll(state, loadedTodos);
    },

    // Set current filter
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },
  },
});

// Export selectors from adapter for easy access
export const {
  selectAll: selectAllTodos,
  selectById: selectTodoById,
  selectIds: selectTodoIds,
} = todosAdapter.getSelectors((state: any) => state.todos);

// Export actions and reducer
export const {
  addTodo,
  toggleTodo,
  removeTodo,
  editTodo,
  setStorageType,
  setTodos,
  initializeStore,
  setFilter,
} = todoSlice.actions;

export default todoSlice.reducer;
