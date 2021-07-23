import { Filter, ObjectId } from 'mongodb';
import express from 'express';
import {
  getMatchesCollection,
  MatchHighlight,
  Match,
  createMatchesQuery,
} from './matches';

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

router.post('/matches/:matchId/highlights', async (request, response, next) => {
  try {
    const { timestamp, type, videoSrc } = request.body;
    const { matchId } = request.params;
    const matchIdIsInvalid = !ObjectId.isValid(matchId);
    const requestIsInvalid =
      typeof timestamp !== 'number' ||
      typeof type !== 'string' ||
      typeof videoSrc !== 'string';

    if (matchIdIsInvalid) {
      response.status(400).send('Invalid match id');
      return;
    }

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
    const result = await matchesCollection.findOneAndUpdate(
      { _id: new ObjectId(matchId) },
      { $push: { highlights: highlight } },
      { returnDocument: 'after' }
    );
    const { value: updatedMatch } = result;

    if (!updatedMatch) {
      response.status(404).send('Error pushing highlight: Match not found.');
      return;
    }
    response.status(200).json(updatedMatch);
  } catch (error) {
    next(error);
  }
});

type PaginatedMatches = {
  info: {
    total: number;
    itemsPerPage: number;
    page: number;
  };
  results: Match[];
};

router.get('/matches', async (request, response, next) => {
  try {
    const page = Number(request.query.page) || 1;
    const itemsPerPage = Number(request.query.itemsPerPage) || 10;
    const matchesCollection = getMatchesCollection();
    const query: Filter<Match> = createMatchesQuery(request.query);
    const cursor = matchesCollection.find(query).sort({ createdAt: -1 });
    const total = await cursor.count();
    const matches = await cursor
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .toArray();

    const paginatedMatches: PaginatedMatches = {
      info: {
        total: total,
        itemsPerPage: itemsPerPage,
        page: page,
      },
      results: matches,
    };
    response.status(200).json(paginatedMatches);
  } catch (error) {
    next(error);
  }
});

export default router;
