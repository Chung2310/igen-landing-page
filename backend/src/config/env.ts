import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

const loadEnv = () => {
  const paths = [
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), '../.env'),
    path.resolve(__dirname, '../../.env'),
    path.resolve(__dirname, '../../../.env'),
    path.resolve(__dirname, '../../../../.env')
  ];
  
  for (const envPath of paths) {
    if (fs.existsSync(envPath)) {
      dotenv.config({ path: envPath, override: true });
      return;
    }
  }
  
  dotenv.config({ override: true });
};

loadEnv();
