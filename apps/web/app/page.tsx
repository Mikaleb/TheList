import TodoApp from "@/components/todo-app";

export default function Home() {
  return (
    <main className="max-w-4xl min-h-screen p-4 mx-auto md:p-8">
      <h1 className="mb-8 text-3xl font-bold text-center">The List</h1>
      <TodoApp />
    </main>
  );
}
