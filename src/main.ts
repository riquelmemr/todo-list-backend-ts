import express from "express";
import { CreateTaskController } from "./controllers/task/create/create-task.controller";
import { CreateUserController, LoginUserController } from "./controllers/user";
import { createTaskValidation, createUserValidation, loginUserValidation } from "./middlewares";
import { TaskRepository } from "./repositories/task/task.repository";
import { UserRepository } from "./repositories/user/user.repository";
import { CreateTaskUseCase } from "./usecases/task";
import { CreateUserUseCase, LoginUserUseCase } from "./usecases/user";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!"
  });
})

const userRepository = new UserRepository();

app.post("/user/create", createUserValidation, (req, res) => {
  const createUserUseCase = new CreateUserUseCase(userRepository);
  const createUserController = new CreateUserController(createUserUseCase);
  return createUserController.execute(req, res)
})

app.post('/user/login', loginUserValidation, (req, res) => {
  const loginUserUseCase = new LoginUserUseCase(userRepository);
  const loginUserController = new LoginUserController(loginUserUseCase);
  return loginUserController.execute(req, res)
})

const taskRepository = new TaskRepository();

app.post('/task/:userId/create', createTaskValidation, (req, res) => {
  const createTaskUseCase = new CreateTaskUseCase(userRepository, taskRepository);
  const createTaskController = new CreateTaskController(createTaskUseCase);
  return createTaskController.execute(req, res);
})

app.listen(5001, () => {
  console.log("Server is running on port 5001");
})

