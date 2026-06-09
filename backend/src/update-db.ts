import mongoose from 'mongoose';
import { connectDB } from './config/db.config';
import Service from './models/service.model';

const run = async () => {
  await connectDB();
  const services = await Service.find({});
  console.log('--- ALL SERVICES IN DB ---');
  for (const svc of services) {
    console.log(`- Slug: ${svc.slug} | Title: ${svc.title} | ID: ${svc._id}`);
  }
  console.log('--------------------------');
  await mongoose.disconnect();
};

run().catch(console.error);
