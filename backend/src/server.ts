import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectToDatabase } from './config/db';

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

async function start() {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();


