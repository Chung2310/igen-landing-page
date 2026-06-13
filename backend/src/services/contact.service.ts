import Contact from '../models/contact.model';
import { IContact } from '../interfaces/contact.interface';
import { FilterQuery } from 'mongoose';

export class ContactService {
  static async createContact(contactData: Partial<IContact>): Promise<IContact> {
    const contact = new Contact(contactData);
    return await contact.save();
  }

  static async getContacts(query: {
    page: number;
    limit: number;
    status?: string;
    search?: string;
  }) {
    const { page, limit, status, search } = query;
    const filter: FilterQuery<IContact> = {};

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;

    const totalDocs = await Contact.countDocuments(filter);
    const docs = await Contact.find(filter)
      .sort({ createdAt: -1 })
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

  static async updateContactStatus(id: string, status: 'unread' | 'read' | 'replied'): Promise<IContact | null> {
    return await Contact.findByIdAndUpdate(id, { status }, { new: true });
  }
}
