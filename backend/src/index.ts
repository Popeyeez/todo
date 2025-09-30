import cors from "cors";
import express, { Request, Response, Application } from "express";
import { nanoid } from "nanoid";

const app: Application = express();
const port = 3000;

const tasks = [
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
  //app product to database

  const id = nanoid();
  const { name } = req.body;
  tasks.unshift({ id, name });
  res.status(201).send({ id });
});

app.delete("/tasks/:id", (req: Request, res: Response) => {
  const id = req.params;
  res.send([]);
});

app.put("/tasks/:id", (req: Request, res: Response) => {
  const id = req.params;
  res.send([]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
