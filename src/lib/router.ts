import { ObjectId } from 'mongodb';
import express from 'express';
import { getMatchesCollection, createMatchesQuery } from './matches';
import type {
  Match,
  MatchHighlight,
  PaginatedMatches,
  PaginatedMatchHighlights,
} from '../types';
import { createHighlightsQuery, getHighlightsCollection } from './highlights';

const router = express.Router();

router.post('/matches', async (request, response, next) => {
  try {
    const { username, gameId } = request.body;

    if (typeof username !== 'string' || typeof gameId !== 'number') {
      response.status(400).send('Invalid payload');
      return;
    }

    const match: Omit<Match, '_id'> = {
      gameId: gameId,
      username: username,
      createdAt: new Date(),
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

router.get('/matches/:matchId', async (request, response, next) => {
  try {
    const { matchId } = request.params;
    const matchIdIsInvalid = !ObjectId.isValid(matchId);
    if (matchIdIsInvalid) {
      response.status(400).send('Invalid match id');
      return;
    }

    const matchesCollection = await getMatchesCollection();
    const match = await matchesCollection.findOne({
      _id: new ObjectId(matchId),
    });
    if (!match) {
      response.status(404).send('Match not found');
      return;
    }
    response.status(200).json(match);
  } catch (error) {
    next(error);
  }
});

router.get('/matches', async (request, response, next) => {
  try {
    const page = Number(request.query.page) || 1;
    const itemsPerPage = Number(request.query.itemsPerPage) || 10;
    const matchesCollection = getMatchesCollection();
    const query = createMatchesQuery(request.query);
    const cursor = matchesCollection.find(query).sort({ createdAt: -1 });
    const totalPromise = cursor.count();
    const matchesPromise = cursor
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .toArray();
    const [total, matches] = await Promise.all([totalPromise, matchesPromise]);

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

router.post('/highlights', async (request, response, next) => {
  try {
    const { timestamp, events, videoSrc, matchId, username, avatar } =
      request.body;

    const matchIdIsInvalid = !ObjectId.isValid(matchId);
    const requestIsInvalid =
      typeof timestamp !== 'number' ||
      !Array.isArray(events) ||
      !events.every((event) => typeof event === 'string') ||
      typeof videoSrc !== 'string';

    if (matchIdIsInvalid) {
      response.status(400).send('Invalid match id');
      return;
    }

    if (requestIsInvalid) {
      response.status(400).send('Invalid payload');
      return;
    }

    const highlight: Omit<MatchHighlight, '_id'> = {
      matchId: new ObjectId(matchId),
      timestamp,
      events,
      videoSrc,
      createdAt: new Date(),
      username,
      avatar,
    };

    const highlightsCollection = await getHighlightsCollection();
    const inserted = await highlightsCollection.insertOne(highlight);
    if (!inserted.acknowledged) {
      response.status(500).send('Error inserting highlight');
      return;
    }
    response.status(200).json(highlight);
  } catch (error) {
    next(error);
  }
});

router.get('/highlights', async (request, response, next) => {
  try {
    const page = Number(request.query.page) || 1;
    const itemsPerPage = Number(request.query.itemsPerPage) || 10;
    const highlightsCollection = getHighlightsCollection();
    const query = createHighlightsQuery(request.query);
    const cursor = highlightsCollection.find(query).sort({ createdAt: -1 });
    const totalPromise = cursor.count();
    const highlightsPromise = cursor
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .toArray();
    const [total, highlights] = await Promise.all([
      totalPromise,
      highlightsPromise,
    ]);

    const paginatedHighlights: PaginatedMatchHighlights = {
      info: {
        total: total,
        itemsPerPage: itemsPerPage,
        page: page,
      },
      results: highlights,
    };
    response.status(200).json(paginatedHighlights);
  } catch (error) {
    next(error);
  }
});

export default router;
