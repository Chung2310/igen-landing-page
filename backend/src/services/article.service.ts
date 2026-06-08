import Article from '../models/article.model';
import { IArticle } from '../interfaces/article.interface';

export class ArticleService {
  static async createArticle(articleData: Partial<IArticle>): Promise<IArticle> {
    const existing = await Article.findOne({ slug: articleData.slug });
    if (existing) {
      throw new Error('Đường dẫn bài viết (slug) đã tồn tại.');
    }
    // Generate excerpt from content if empty or missing
    if (articleData.content && (!articleData.excerpt || articleData.excerpt.trim() === '')) {
      const text = articleData.content.replace(/<[^>]*>/g, ' ');
      const cleanedText = text.replace(/\s+/g, ' ').trim();
      articleData.excerpt = cleanedText.length > 150 ? cleanedText.substring(0, 147) + '...' : cleanedText;
    }
    const article = new Article(articleData);
    return await article.save();
  }

  static async getArticles(query: {
    page: number;
    limit: number;
    category?: string;
    status?: string;
    search?: string;
  }) {
    const { page, limit, category, status, search } = query;
    const filter: any = {};

    if (category) {
      filter.category = category;
    }

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;

    const totalDocs = await Article.countDocuments(filter);
    const docs = await Article.find(filter)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalDocs / limit);

    return {
      docs,
      totalDocs,
      limit,
      page,
      totalPages,
    };
  }

  static async getArticleBySlug(slug: string): Promise<IArticle | null> {
    return await Article.findOne({ slug });
  }

  static async getArticleById(id: string): Promise<IArticle | null> {
    return await Article.findById(id);
  }

  static async updateArticle(id: string, updateData: Partial<IArticle>): Promise<IArticle | null> {
    if (updateData.slug) {
      const existing = await Article.findOne({ slug: updateData.slug, _id: { $ne: id } });
      if (existing) {
        throw new Error('Đường dẫn bài viết (slug) đã tồn tại.');
      }
    }
    // Generate excerpt from content if content is updated and excerpt is empty or missing
    if (updateData.content && (!updateData.excerpt || updateData.excerpt.trim() === '')) {
      const text = updateData.content.replace(/<[^>]*>/g, ' ');
      const cleanedText = text.replace(/\s+/g, ' ').trim();
      updateData.excerpt = cleanedText.length > 150 ? cleanedText.substring(0, 147) + '...' : cleanedText;
    }
    return await Article.findByIdAndUpdate(id, updateData, { new: true });
  }

  static async deleteArticle(id: string): Promise<IArticle | null> {
    return await Article.findByIdAndDelete(id);
  }
}
