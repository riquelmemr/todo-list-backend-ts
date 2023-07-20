import express from "express";
import { CreateUserController } from "./controllers/user";
import { createUserValidation } from "./middlewares/validations/create-user.validation";
import { UserRepository } from "./repositories/user/user.repository";
import { CreateUserUseCase } from "./usecases/user";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!"
  });
})

const userRepository = new UserRepository();

app.post("/users/create", createUserValidation, (req, res) => {
  const createUserUseCase = new CreateUserUseCase(userRepository);
  const createUserController = new CreateUserController(createUserUseCase);
  return createUserController.execute(req, res)
})

app.listen(5001, () => {
  console.log("Server is running on port 5001");
})

