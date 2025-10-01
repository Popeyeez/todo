"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState<{ id: string; name: string }[]>([]);

  async function createNewTask() {
    if (newTask) {
      await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newTask }),
      });
      loadTasks();
      setNewTask("");
    }
  }

  function loadTasks() {
    fetch("http://localhost:3000/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });
  }

  async function deleteTask(id: string) {
    if (confirm("Delete?")) {
      await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
      });
      loadTasks();
    }
  }

  async function editTask(task: { id: string; name: string }) {
    const newName = prompt("Edit", task.name);
    if (newName) {
      await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName }),
      });
      loadTasks();
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);
  return (
    <div className="m-8">
      <div className="flex">
        <input
          className="input mr-4 border-2"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          disabled={!newTask}
          className="btn btn-accent"
          onClick={createNewTask}
        >
          Add
        </button>
      </div>

      {tasks.map((task) => (
        <div
          className="card p-4 border border-base-300 mt-4 w-100"
          key={task.id}
        >
          <div className="flex items-center gap-2">
            <input onChange={""} type="checkbox"></input>

            <div className="flex-1"> {task.name} </div>
            <button onClick={() => editTask(task)} className="btn btn-ghost">
              Edit
            </button>

            <button
              onClick={() => deleteTask(task.id)}
              className="btn btn-error btn-soft"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
