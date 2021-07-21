import express from 'express';
import { getMatchesCollection, Match } from './matches';

const router = express.Router();

router.post('/matches', async (req, res, next) => {
  try {
    const { username, gameId } = req.body;

    if (typeof username !== 'string' || typeof gameId !== 'number') {
      res.status(400).send('Invalid payload');
      return;
    }

    const match: Match = {
      gameId: gameId,
      username: username,
      createdAt: new Date(),
      highlights: [],
    };

    const inserted = await getMatchesCollection().insertOne(match);
    if (!inserted.acknowledged) {
      res.status(500).send('Error inserting match');
      return;
    }
    res.status(200).json(match);
  } catch (error) {
    next(error);
  }
});

export default router;
