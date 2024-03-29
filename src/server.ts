import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import compression from 'compression';
import { connectToMongoDb } from './lib/db';
import router from './lib/router';
import helmet from 'helmet';
import { ensureMatchesIndexes, ensureMatchesSchema } from './lib/matches';
import {
  ensureHighlightsIndexes,
  ensureHighlightsSchema,
} from './lib/highlights';

const { PORT, MONGODB_URI, REQUEST_ORIGIN } = process.env;

if (typeof PORT !== 'string') {
  throw new Error('PORT is not set');
}

if (typeof MONGODB_URI !== 'string') {
  throw new Error('MONGODB_URI is not set');
}

if (typeof REQUEST_ORIGIN !== 'string') {
  throw new Error('REQUEST_ORIGIN is not set');
}

const app = express();
app.use(helmet());

// Middleware (dependency) to automatically compress responses
app.use(compression());

// Middleware that parses json and looks at requests where the Content-Type header matches the type option.
app.use(express.json());

// Middleware to set CORS headers
app.use((_req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    process.env.NODE_ENV === 'production' ? REQUEST_ORIGIN : '*'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
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
  await ensureHighlightsIndexes();
  await ensureHighlightsSchema();

  app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
});
