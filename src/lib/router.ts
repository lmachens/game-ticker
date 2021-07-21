import { ObjectId } from 'bson';
import express from 'express';
import { getMatchesCollection, MatchHighlight, Match } from './matches';

const router = express.Router();

router.post('/matches', async (request, response, next) => {
  try {
    const { username, gameId } = request.body;

    if (typeof username !== 'string' || typeof gameId !== 'number') {
      response.status(400).send('Invalid payload');
      return;
    }

    const match: Match = {
      gameId: gameId,
      username: username,
      createdAt: new Date(),
      highlights: [],
    };

    const matchesCollection = await getMatchesCollection();
    const inserted = await matchesCollection.insertOne(match);
    if (!inserted.acknowledged) {
      response.status(500).send('Error inserting match');
      return;
    }
    response.status(200).json(match);
  } catch (error) {
    next(error);
  }
});

router.post('/matches/:id/highlights', async (request, response, next) => {
  try {
    const { timestamp, type, videoSrc } = request.body;
    const { id } = request.params;
    const requestIsInvalid =
      typeof timestamp !== 'number' ||
      typeof type !== 'string' ||
      typeof videoSrc !== 'string';

    if (requestIsInvalid) {
      response.status(400).send('Invalid payload');
      return;
    }

    const highlight: MatchHighlight = {
      timestamp,
      type,
      videoSrc,
    };

    const matchesCollection = await getMatchesCollection();
    const inserted = await matchesCollection.updateOne(
      { _id: ObjectId.createFromHexString(id) },
      { $push: { highlights: highlight } }
    );

    if (!inserted.matchedCount) {
      response.status(404).send('Error pushing highlight: Match not found.');
      return;
    }
    response.status(200).json(highlight);
  } catch (error) {
    next(error);
  }
});

router.get('/matches', async (_request, response, next) => {
  try {
    const matchesCollection = await getMatchesCollection();
    const matches = await matchesCollection.find({}).toArray();

    response.status(200).json(matches);
  } catch (error) {
    next(error);
  }
});

export default router;
