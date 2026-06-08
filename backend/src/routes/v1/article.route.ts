import { Router } from 'express';
import { ArticleController } from '../../controllers/article.controller';
import { authenticate, requireAdmin } from '../../middlewares/auth.middleware';
import { validateBody, validateQuery, validateParams } from '../../middlewares/validation.middleware';
import { createArticleSchema, updateArticleSchema, articleQuerySchema } from '../../validations/article.validation';
import { idParamSchema } from '../../validations/contact.validation';

const router = Router();

// Public routes
router.get('/', validateQuery(articleQuerySchema), ArticleController.getArticles);
router.get('/:slug', ArticleController.getArticleBySlug);

// Admin-only routes
router.post(
  '/',
  authenticate,
  requireAdmin,
  validateBody(createArticleSchema),
  ArticleController.createArticle
);

router.patch(
  '/:id',
  authenticate,
  requireAdmin,
  validateParams(idParamSchema),
  validateBody(updateArticleSchema),
  ArticleController.updateArticle
);

router.delete(
  '/:id',
  authenticate,
  requireAdmin,
  validateParams(idParamSchema),
  ArticleController.deleteArticle
);

export default router;
