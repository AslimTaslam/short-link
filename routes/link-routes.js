import { Router } from 'express';
import { auth } from '../middleware/auth-middleware.js';
import {
  createLinkController,
  getLinksController,
  getLinkController,
  deleteLinkController,
} from '../controllers/link-controllers.js';

const router = Router();

//Create link
router.post('/generate', auth, createLinkController);

//Get links
router.get('/', auth, getLinksController);

//Get a link
router.get('/:code', auth, getLinkController);

//Delete a link
router.delete('/:code', auth, deleteLinkController);

export { router as linkRouter };
