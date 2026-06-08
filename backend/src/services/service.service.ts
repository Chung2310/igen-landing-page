import Service from '../models/service.model';
import { IService } from '../interfaces/service.interface';

export class ServiceService {
  static async createService(data: Partial<IService>): Promise<IService> {
    // Check duplicate slug
    if (data.slug) {
      const existing = await Service.findOne({ slug: data.slug });
      if (existing) {
        throw new Error('Đường dẫn sản phẩm (slug) đã tồn tại.');
      }
    }
    const service = new Service(data);
    return await service.save();
  }

  static async getServices(query: {
    page: number;
    limit: number;
    category?: string;
    status?: string;
    search?: string;
  }) {
    const { page, limit, category, status, search } = query;
    const filter: Record<string, unknown> = {};

    if (category) filter.category = category;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { shortDesc: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;
    const totalDocs = await Service.countDocuments(filter);
    const docs = await Service.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return {
      docs,
      totalDocs,
      limit,
      page,
      totalPages: Math.ceil(totalDocs / limit),
    };
  }

  static async getServiceBySlug(slug: string): Promise<IService | null> {
    return await Service.findOne({ slug });
  }

  static async getServiceById(id: string): Promise<IService | null> {
    return await Service.findById(id);
  }

  static async updateService(
    id: string,
    updateData: Partial<IService>
  ): Promise<IService | null> {
    if (updateData.slug) {
      const existing = await Service.findOne({ slug: updateData.slug, _id: { $ne: id } });
      if (existing) {
        throw new Error('Đường dẫn sản phẩm (slug) đã tồn tại.');
      }
    }
    return await Service.findByIdAndUpdate(id, updateData, { new: true });
  }

  static async deleteService(id: string): Promise<IService | null> {
    return await Service.findByIdAndDelete(id);
  }
}
