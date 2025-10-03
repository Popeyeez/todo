import cors from "cors";
import express, { Request, Response, Application } from "express";
import { nanoid } from "nanoid";
import fs from "node:fs";

const app: Application = express();
const port = 3000;

let tasks = [
  { id: nanoid(), name: "MacBook" },
  { id: nanoid(), name: "iMac" },
];
app.use(cors());
app.use(express.json());

function getTasks() {
  const data = fs.readFileSync("data.txt", "utf8");
  const tasks = JSON.parse(data);
  return tasks;
}
function writeTasks(tasks: { id: string; name: string }[]) {
  fs.writeFile("data.txt", JSON.stringify(tasks), (err) => {
    if (err) {
      console.error(err);
    } else {
      //file success
    }
  });
}

app.get("/tasks", (req: Request, res: Response) => {
  const tasks = getTasks();
  res.send(tasks);
});

app.post("/tasks", (req: Request, res: Response) => {
  const id = nanoid();
  const { name } = req.body;
  if (!name) {
    res.status(400).send({ message: "name cant be empty" });
    return;
  }
  const tasks = getTasks();
  tasks.unshift({ id, name });
  writeTasks(tasks);
  res.status(201).send({ id });
});

app.delete("/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  const tasks = getTasks();

  const newTasks = tasks.filter((task: { id: string }) => task.id !== id);
  writeTasks(newTasks);
  res.sendStatus(204);
});
app.delete("/tasks", (req: Request, res: Response) => {
  const newTasks: [] = [];
  writeTasks(newTasks);

  res.sendStatus(204);
});

app.put("/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const { name } = req.body;
  const tasks = getTasks();
  const index = tasks.findIndex((task: { id: string }) => task.id === id);
  tasks[index].name = name;
  writeTasks(tasks);

  res.sendStatus(204);
});

app.patch("/tasks/:id/check", (req: Request, res: Response) => {
  const id = req.params.id;
  const { name } = req.body;
  const tasks = getTasks();
  const index = tasks.findIndex((task: { id: string }) => task.id === id);
  tasks[index].isCompleted = !tasks[index].isCompleted;
  writeTasks(tasks);

  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
