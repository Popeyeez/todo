"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState<{ id: string; name: string }[]>([]);

  async function createNewTask() {
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
  function loadTasks() {
    fetch("http://localhost:3000/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });
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
        <button className="btn btn-accent" onClick={createNewTask}>
          Add
        </button>
      </div>
      {tasks.map((task) => (
        <div className="card p-4 border border-base-300 mt-4" key={task.id}>
          {task.name}
        </div>
      ))}
    </div>
  );
}
