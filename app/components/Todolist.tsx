"use client";

import { useState, useEffect } from "react";

export default function TodoList() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [input, setInput] = useState("");

  // Load tasks from localStorage saat komponen pertama kali dimuat
  useEffect(() => {
    const storedTasks = localStorage.getItem("my-todo-tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Simpan tasks ke localStorage setiap kali ada perubahan
  useEffect(() => {
    localStorage.setItem("my-todo-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, input.trim()]);
    setInput("");
  };

  const deleteTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tambah tugas..."
          className="flex-grow border px-2 py-1 rounded"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Tambah
        </button>
      </div>

      <ul className="list-disc pl-5 space-y-2">
        {tasks.map((task, index) => (
          <li key={index} className="flex justify-between items-center">
            {task}
            <button
              onClick={() => deleteTask(index)}
              className="text-red-500 text-sm"
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
