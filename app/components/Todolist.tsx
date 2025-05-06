"use client";

import { useState, useEffect } from "react";

export default function TodoList() {
  const [tasks, setTasks] = useState<{ task: string; completed: boolean }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  //load tasks
  useEffect(() => {
    const storedTasks = localStorage.getItem("my-todo-tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // untuk menyimpan tasks ke local storage
  useEffect(() => {
    localStorage.setItem("my-todo-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, { task: input.trim(), completed: false }]);
    setInput("");
  };

  const toggleComplete = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const clearAllTasks = () => {
    setTasks([]);
  };

  const startEdit = (index: number) => {
    setEditIndex(index);
    setEditText(tasks[index].task);
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditText("");
  };

  const saveEdit = () => {
    if (editText.trim() === "") return;
    const updatedTasks = [...tasks];
    updatedTasks[editIndex!].task = editText.trim();
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditText("");
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

      <div className="mb-4">
        <button
          onClick={clearAllTasks}
          className="bg-red-500 text-white px-4 py-1 rounded"
        >
          Hapus Semua
        </button>
      </div>

      <ul className="list-disc pl-5 space-y-2">
        {tasks.map((task, index) => (
          <li key={index} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(index)}
                className="accent-blue-500"
              />
              {editIndex === index ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="border px-2 py-1 rounded"
                />
              ) : (
                <span className={task.completed ? "line-through" : ""}>
                  {task.task}
                </span>
              )}
            </div>

            <div className="flex gap-2">
              {editIndex === index ? (
                <>
                  <button onClick={saveEdit} className="text-green-500 text-sm">
                    Simpan
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="text-gray-500 text-sm"
                  >
                    Batal
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEdit(index)}
                    className="text-blue-500 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(index)}
                    className="text-red-500 text-sm"
                  >
                    Hapus
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
