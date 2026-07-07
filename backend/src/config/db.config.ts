import mongoose from 'mongoose';
import './env';

export const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/igentech';
  const user = process.env.MONGODB_USER;
  const pass = process.env.MONGODB_PASS || process.env.MONGODB_PASSWORD;
  const authSource = process.env.MONGODB_AUTH_SOURCE || 'admin';

  let connectionUri = uri;
  if (user && pass) {
    const protocol = uri.startsWith('mongodb+srv://') ? 'mongodb+srv://' : 'mongodb://';
    const uriWithoutProtocol = uri.replace(protocol, '');
    
    if (!uriWithoutProtocol.includes('@')) {
      connectionUri = `${protocol}${encodeURIComponent(user)}:${encodeURIComponent(pass)}@${uriWithoutProtocol}`;
    }
    
    if (authSource && !connectionUri.includes('authSource=')) {
      const separator = connectionUri.includes('?') ? '&' : '?';
      connectionUri = `${connectionUri}${separator}authSource=${authSource}`;
    }
  }

  // Redacted URI for safe logging on Staging/Production VPS
  const redactedUri = connectionUri.replace(/:([^:@]+)@/, ':******@');
  console.log(`Connecting to MongoDB at URI: ${redactedUri}`);

  try {
    await mongoose.connect(connectionUri);
    console.log('Successfully connected to MongoDB.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
