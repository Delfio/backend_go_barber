import { Router } from 'express';
import CreatedUserService from '../service/CreateUserService';

const usersRouter = Router();


usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createdUser = new CreatedUserService();

    const user = await createdUser.execute({ name, email, password });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({
      error: err.message,
    });
  }
});

export default usersRouter;
