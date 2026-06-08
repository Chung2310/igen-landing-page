import { Router } from 'express';
import { AuthController } from '../../controllers/auth.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { validateBody } from '../../middlewares/validation.middleware';
import { registerSchema, loginSchema } from '../../validations/auth.validation';

const router = Router();

router.post('/register', validateBody(registerSchema), AuthController.register);
router.post('/login', validateBody(loginSchema), AuthController.login);
router.post('/refresh-token', AuthController.refreshToken);
router.post('/logout', AuthController.logout);
router.get('/me', authenticate, AuthController.getMe);

export default router;
