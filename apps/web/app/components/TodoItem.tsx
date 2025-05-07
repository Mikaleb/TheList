"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTodoStore } from "@/lib/store";

const Checkbox = CheckboxPrimitive.Root;
const CheckboxIndicator = CheckboxPrimitive.Indicator;

interface TodoItemProps {
  todo: {
    id: string;
    text: string;
    completed: boolean;
    createdAt: Date;
  };
}

export function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, deleteTodo } = useTodoStore();

  return (
    <div className="flex gap-4 items-center p-3 rounded-lg transition-colors hover:bg-gray-500/10">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => toggleTodo(todo.id)}
        className="h-5 w-5 shrink-0 rounded-lg border-gray-200 bg-white data-[state=checked]:bg-blue-500"
      >
        <CheckboxIndicator>
          <Check className="w-4 h-4" />
        </CheckboxIndicator>
      </Checkbox>
      <span
        className={cn(
          "flex-1 truncate text-sm font-medium transition-colors",
          todo.completed ? "line-through text-gray-500" : "text-gray-900"
        )}
      >
        {todo.text}
      </span>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="ml-auto text-gray-500 hover:text-gray-700"
        aria-label="Delete todo"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
}
