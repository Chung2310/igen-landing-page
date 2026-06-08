import { Router } from 'express';
import { ContactController } from '../../controllers/contact.controller';
import { authenticate, requireAdmin } from '../../middlewares/auth.middleware';
import { validateBody, validateQuery, validateParams } from '../../middlewares/validation.middleware';
import { createContactSchema, updateContactStatusSchema, contactQuerySchema, idParamSchema } from '../../validations/contact.validation';

const router = Router();

// Public route to submit contact form
router.post('/', validateBody(createContactSchema), ContactController.createContact);

// Admin-only routes
router.get(
  '/',
  authenticate,
  requireAdmin,
  validateQuery(contactQuerySchema),
  ContactController.getContacts
);

router.patch(
  '/:id/status',
  authenticate,
  requireAdmin,
  validateParams(idParamSchema),
  validateBody(updateContactStatusSchema),
  ContactController.updateContactStatus
);

export default router;
