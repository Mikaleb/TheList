import { createSelector } from "@reduxjs/toolkit";
import { selectAllTodos } from "@/lib/features/todos/todoSlice";
import { RootState } from "@/lib/store";

// Selector for filter value
const selectFilter = (state: RootState) => state.todos.filter;

// Memoized selector for filtered todos
export const selectFilteredTodos = createSelector(
  [selectAllTodos, selectFilter],
  (todos, filter) => {
    if (filter === "active") return todos.filter((todo) => !todo.completed);
    if (filter === "completed") return todos.filter((todo) => todo.completed);
    return todos;
  }
);
