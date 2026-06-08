import { Schema, model } from 'mongoose';
import { IArticle } from '../interfaces/article.interface';

const articleSchema = new Schema<IArticle>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    thumbnail: {
      type: String,
      default: '',
    },
    author: {
      type: String,
      required: true,
      default: 'iGen Admin',
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
      index: true,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Article = model<IArticle>('Article', articleSchema);
export default Article;
