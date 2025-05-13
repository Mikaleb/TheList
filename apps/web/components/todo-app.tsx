"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import TodoList from "@/components/todo-list";
import TodoForm from "@/components/todo-form";
// import StorageSelector from "@/components/storage-selector"
import { initializeStore } from "@/lib/features/todos/todoSlice";
import TodoFilter from "@/components/todo-filter";

export default function TodoApp() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Initialize the store with data from the current storage
    store.dispatch(initializeStore());
  }, []);

  if (!isClient) {
    return (
      <div className="animate-pulse p-4 bg-muted rounded-md">Loading...</div>
    );
  }

  return (
    <Provider store={store}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        {/* <StorageSelector /> */}
        <TodoForm />
        <TodoList />
        <TodoFilter />
      </div>
    </Provider>
  );
}
