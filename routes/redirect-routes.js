import { Router } from 'express';
import { redirectController } from '../controllers/redirect-controllers.js';

const router = Router();

router.get('/:code', redirectController);

export { router as redirectRouter };
