import dotenv from 'dotenv';
dotenv.config();

import app, { seedAdmin, seedServices, seedArticles } from './app';
import { connectDB } from './config/db.config';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Connect to Database
  await connectDB();

  // Seed default admin user
  await seedAdmin();

  // Seed default services
  await seedServices();

  // Seed default articles
  await seedArticles();

  // Start listening on 0.0.0.0 for Docker/external access
  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    console.log(`Swagger API Docs available at http://localhost:${PORT}/api-docs`);
  });
};

startServer();
