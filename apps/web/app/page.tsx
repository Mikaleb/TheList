import TodoApp from "@/components/todo-app"

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Todo App</h1>
      <TodoApp />
    </main>
  )
}
