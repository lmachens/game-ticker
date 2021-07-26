import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import compression from 'compression';
import { connectToMongoDb } from './lib/db';
import router from './lib/router';
import helmet from 'helmet';
import cors from 'cors';
import { ensureMatchesIndexes, ensureMatchesSchema } from './lib/matches';

const { PORT, MONGODB_URI } = process.env;

if (typeof PORT !== 'string') {
  throw new Error('PORT is not set');
}

if (typeof MONGODB_URI !== 'string') {
  throw new Error('MONGODB_URI is not set');
}

const app = express();
app.use(helmet());

app.use(cors());

// Middleware (dependency) to automatically compress responses
app.use(compression());

// Middleware that parses json and looks at requests where the Content-Type header matches the type option.
app.use(express.json());

// Middleware to set CORS headers
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Serve API requests from the router
app.use('/api', router);

// All other requests could be used for static files, images, etc.
app.get('*', (_req, res) => {
  res.send('<h1>Welcome to the server</h1>');
});

connectToMongoDb(MONGODB_URI).then(async () => {
  console.log('Connected to MongoDB');
  await ensureMatchesIndexes();
  await ensureMatchesSchema();

  app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
});
