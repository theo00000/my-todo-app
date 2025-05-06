import TodoList from "./components/Todolist";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">To-Do List</h1>
        <TodoList />
      </div>
    </main>
  );
}
