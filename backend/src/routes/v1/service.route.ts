import { Router } from 'express';
import { ServiceController } from '../../controllers/service.controller';
import { authenticate, requireAdmin } from '../../middlewares/auth.middleware';
import { validateBody, validateQuery, validateParams } from '../../middlewares/validation.middleware';
import {
  createServiceSchema,
  updateServiceSchema,
  serviceQuerySchema,
  serviceIdSchema,
  serviceSlugSchema,
} from '../../validations/service.validation';

const router = Router();

// Public routes
router.get('/', validateQuery(serviceQuerySchema), ServiceController.getServices);
router.get('/:slug', validateParams(serviceSlugSchema), ServiceController.getServiceBySlug);

// Admin-only routes
router.post(
  '/',
  authenticate,
  requireAdmin,
  validateBody(createServiceSchema),
  ServiceController.createService
);

router.patch(
  '/:id',
  authenticate,
  requireAdmin,
  validateParams(serviceIdSchema),
  validateBody(updateServiceSchema),
  ServiceController.updateService
);

router.delete(
  '/:id',
  authenticate,
  requireAdmin,
  validateParams(serviceIdSchema),
  ServiceController.deleteService
);

export default router;
