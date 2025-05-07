"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store/store";
import { TodoItem } from "@components/TodoItem";
import { addTodo, clearCompleted } from "@/lib/store/features/todo/todoSlice";

export default function Home() {
  const [newTodo, setNewTodo] = useState("");
  const todos = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo.trim()));
      setNewTodo("");
    }
  };

  const handleClearCompleted = () => {
    dispatch(clearCompleted());
  };

  return (
    <div className="flex flex-col justify-center py-6 min-h-screen bg-gray-50 sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="mx-auto max-w-md">
            <div className="divide-y divide-gray-200">
              <div className="py-8 space-y-4 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="mb-8 text-3xl font-bold text-gray-900">
                  Todo App
                </h1>

                <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new todo..."
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Add
                  </button>
                </form>

                <div className="space-y-2">
                  {todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                  ))}
                </div>

                {todos.some((todo) => todo.completed) && (
                  <button
                    onClick={handleClearCompleted}
                    className="px-4 py-2 mt-4 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Clear Completed
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
