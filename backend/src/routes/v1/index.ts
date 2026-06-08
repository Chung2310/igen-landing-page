import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import authRoutes from './auth.route';
import articleRoutes from './article.route';
import contactRoutes from './contact.route';
import serviceRoutes from './service.route';
import uploadRoutes from './upload.route';

const router = Router();

// Health Check Endpoint: checks server and database state
router.get('/health', async (req: Request, res: Response) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Healthy' : 'Unhealthy';
  const statusCode = dbStatus === 'Healthy' ? 200 : 500;

  return res.status(statusCode).json({
    status: statusCode === 200 ? 'UP' : 'DOWN',
    timestamp: new Date().toISOString(),
    services: {
      server: 'Healthy',
      database: dbStatus,
    },
  });
});

// Register feature routes
router.use('/auth', authRoutes);
router.use('/articles', articleRoutes);
router.use('/contacts', contactRoutes);
router.use('/services', serviceRoutes);
router.use('/upload', uploadRoutes);

export default router;
