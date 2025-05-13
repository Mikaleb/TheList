"use client";

import { Button } from "@/components/ui/button";
import { selectFilter } from "@/lib/features/todos/selectors";
import {
  FilterTypeEnum,
  selectAllTodos,
  setFilter,
} from "@/lib/features/todos/todoSlice";
import { useDispatch, useSelector } from "react-redux";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export default function TodoFilter() {
  const todos = useSelector(selectAllTodos);
  const currentFilter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const itemsLeft = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-4 border-t text-sm">
      <div className="mb-3 sm:mb-0">
        <span>
          {itemsLeft} {itemsLeft === 1 ? "item" : "items"} left
        </span>
      </div>

      <div className="flex space-x-2">
        <Button
          variant={currentFilter === FilterTypeEnum.all ? "default" : "ghost"}
          size="sm"
          onClick={() => dispatch(setFilter(FilterTypeEnum.all))}
        >
          All
        </Button>
        <Button
          variant={
            currentFilter === FilterTypeEnum.active ? "default" : "ghost"
          }
          size="sm"
          onClick={() => dispatch(setFilter(FilterTypeEnum.active))}
        >
          Active
        </Button>
        <Button
          variant={
            currentFilter === FilterTypeEnum.completed ? "default" : "ghost"
          }
          size="sm"
          onClick={() => dispatch(setFilter(FilterTypeEnum.completed))}
        >
          Completed
        </Button>
      </div>
    </div>
  );
}
