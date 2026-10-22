import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

const loadEnv = () => {
  const directories = [
    process.cwd(),
    path.resolve(process.cwd(), '..'),
    path.resolve(__dirname, '../..'),
    path.resolve(__dirname, '../../..'),
    path.resolve(__dirname, '../../../..')
  ];
  const paths = directories.flatMap(directory => [
    path.resolve(directory, '.env.local'),
    path.resolve(directory, '.env')
  ]);
  
  for (const envPath of paths) {
    if (fs.existsSync(envPath)) {
      dotenv.config({ path: envPath, override: true });
      return;
    }
  }
  
  dotenv.config({ override: true });
};

loadEnv();
