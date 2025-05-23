"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { selectFilteredTodos } from "@/lib/features/todos/selectors";
import {
  editTodo,
  removeTodo,
  selectAllTodos,
  toggleTodo,
} from "@/lib/features/todos/todoSlice";
import { Edit, Save, Trash, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TodoList() {
  const todos = useSelector(selectAllTodos);

  const filteredTodos = useSelector(selectFilteredTodos);

  const dispatch = useDispatch();

  // Ensure todos is always an array with proper logging for debugging
  useEffect(() => {
    if (!Array.isArray(todos)) {
      console.error("Todos is not an array:", todos);
    }
  }, [todos]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const handleEdit = (id: string, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleSaveEdit = (id: string) => {
    if (editText.trim()) {
      dispatch(editTodo({ id, text: editText }));
    }
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  if (!filteredTodos.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {Array.isArray(todos) && todos.length === 0
          ? "No todos yet. Add one to get started!"
          : `No ${filteredTodos} todos found.`}
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {filteredTodos.map((todo) => (
        <li
          key={todo.id}
          className={`flex items-center p-3 rounded-md border ${todo.completed ? "bg-muted/50" : "bg-background"}`}
        >
          <Checkbox
            checked={todo.completed}
            onCheckedChange={() => dispatch(toggleTodo(todo.id))}
            id={`todo-${todo.id}`}
            className="mr-3"
          />

          {editingId === todo.id ? (
            <div className="flex flex-1 gap-2">
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-1"
                autoFocus
              />
              <Button size="sm" onClick={() => handleSaveEdit(todo.id)}>
                <Save className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <>
              <label
                htmlFor={`todo-${todo.id}`}
                className={`flex-1 cursor-pointer ${todo.completed ? "line-through text-muted-foreground" : ""}`}
              >
                {todo.text}
              </label>

              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleEdit(todo.id, todo.text)}
                  disabled={todo.completed}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-destructive hover:text-destructive"
                  onClick={() => dispatch(removeTodo(todo.id))}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
