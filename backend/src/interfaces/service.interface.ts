import { Document } from 'mongoose';

export interface IService extends Document {
  title: string;
  slug: string;
  shortDesc: string;
  description: string;
  icon: string;
  thumbnail: string;
  category: string;
  features: string[];
  status: 'active' | 'inactive';
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
