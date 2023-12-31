import cors from "cors";
import express from "express";
import { CreateTaskController, DeleteTaskController, FindAllTasksController, UpdateTaskController } from "./controllers/task";
import { CreateUserController, LoginUserController } from "./controllers/user";
import { createTaskValidation, createUserValidation, loginUserValidation, updateTaskValidation } from "./middlewares";
import { authMiddleware } from "./middlewares/auth/auth";
import { TaskRepository } from "./repositories/task/task.repository";
import { UserRepository } from "./repositories/user/user.repository";
import { CreateTaskUseCase, DeleteTaskUseCase, FindAllTasksUseCase } from "./usecases/task";
import { UpdateTaskUseCase } from "./usecases/task/update/update-task.usecase";
import { CreateUserUseCase, LoginUserUseCase } from "./usecases/user";

const app = express();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "Hello World! Application is running!"
  });
})

export const userRepository = new UserRepository();

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

export const taskRepository = new TaskRepository();

app.post('/task/:userId/create', authMiddleware, createTaskValidation, (req, res) => {
  const createTaskUseCase = new CreateTaskUseCase(taskRepository);
  const createTaskController = new CreateTaskController(createTaskUseCase);
  return createTaskController.execute(req, res);
})

app.delete('/task/:userId/delete/:id', authMiddleware, (req, res) => {
  const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
  const deleteTaskController = new DeleteTaskController(deleteTaskUseCase);
  return deleteTaskController.execute(req, res);
})

app.get('/task/:userId', authMiddleware, (req, res) => {
  const findAllTasksUseCase = new FindAllTasksUseCase(taskRepository);
  const findAllTasksController = new FindAllTasksController(findAllTasksUseCase);
  return findAllTasksController.execute(req, res);
})

app.put('/task/:userId/update/:id', authMiddleware, updateTaskValidation, (req, res) => {
  const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
  const updateTaskController = new UpdateTaskController(updateTaskUseCase);
  return updateTaskController.execute(req, res);
})

app.listen(5001, () => {
  console.log("Server is running on port 5001");
})

