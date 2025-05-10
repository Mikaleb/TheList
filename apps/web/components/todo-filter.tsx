"use client";

import { useDispatch, useSelector } from "react-redux";
import { FilterTypeEnum, setFilter } from "@/lib/features/todos/todoSlice";
import type { RootState } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { selectAllTodos } from "@/lib/features/todos/todoSlice";
import { selectFilteredTodos } from "@/lib/features/todos/selectors";

export default function TodoFilter() {
  const todos = useSelector(selectAllTodos);
  const currentFilter = useSelector(selectFilteredTodos);
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
          variant={currentFilter === "all" ? "default" : "ghost"}
          size="sm"
          onClick={() => dispatch(setFilter("all"))}
        >
          All
        </Button>
        <Button
          variant={currentFilter === "active" ? "default" : "ghost"}
          size="sm"
          onClick={() => dispatch(setFilter("active"))}
        >
          Active
        </Button>
        <Button
          variant={currentFilter === "completed" ? "default" : "ghost"}
          size="sm"
          onClick={() => dispatch(setFilter("completed"))}
        >
          Completed
        </Button>
      </div>
    </div>
  );
}
