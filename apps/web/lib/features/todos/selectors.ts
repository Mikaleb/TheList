import { FilterTypeEnum, selectAllTodos } from "@/lib/features/todos/todoSlice";
import { RootState } from "@/lib/store";
import { createSelector } from "@reduxjs/toolkit";

// Selector for filter value
export const selectFilter = (state: RootState) => state.todos.filter;

// Memoized selector for filtered todos
export const selectFilteredTodos = createSelector(
  [selectAllTodos, selectFilter],
  (todos, filter) => {
    if (filter === FilterTypeEnum.active)
      return todos.filter((todo) => !todo.completed);
    if (filter === FilterTypeEnum.completed)
      return todos.filter((todo) => todo.completed);
    return todos;
  }
);
