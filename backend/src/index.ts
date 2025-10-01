import cors from "cors";
import express, { Request, Response, Application } from "express";
import { nanoid } from "nanoid";

const app: Application = express();
const port = 3000;

let tasks = [
  { id: nanoid(), name: "MacBook" },
  { id: nanoid(), name: "iMac" },
];

app.use(cors());
app.use(express.json());

app.get("/tasks", (req: Request, res: Response) => {
  //Anything
  res.send(tasks);
});

app.post("/tasks", (req: Request, res: Response) => {
  const id = nanoid();
  const { name } = req.body;
  if (!name) {
    res.status(400).send({ message: "name cant be empty" });
    return;
  }

  tasks.unshift({ id, name });
  res.status(201).send({ id });
});

app.delete("/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const newTasks = tasks.filter((task) => task.id !== id);
  tasks = newTasks;
  res.sendStatus(204);
});

app.put("/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const { name } = req.body;

  const index = tasks.findIndex((task) => task.id === id);
  tasks[index].name = name;

  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
