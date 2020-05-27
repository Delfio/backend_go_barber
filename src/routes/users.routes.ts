import { Router } from 'express';
import multer from 'multer';
import CreatedUserService from '../service/CreateUserService';
import ensurdAuthenticated from '../middleware/ensureAuthenticated';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

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

usersRouter.patch('/avatar', ensurdAuthenticated, upload.single('avatar'), async (req, res) => res.json({ ok: true }));

export default usersRouter;
