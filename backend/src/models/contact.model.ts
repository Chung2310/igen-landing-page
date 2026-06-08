import { Schema, model } from 'mongoose';
import { IContact } from '../interfaces/contact.interface';

const contactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['unread', 'read', 'replied'],
      default: 'unread',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Contact = model<IContact>('Contact', contactSchema);
export default Contact;
