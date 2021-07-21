import express from 'express';
import { ObjectId } from 'mongodb';
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

type Highlight = {
  timestamp: number;
  type: string;
  videoSrc: string;
};

router.post('/matches/:id/highlights', async (req, res, next) => {
  const id = req.params.id;
  const { timestamp, type, videoSrc } = req.body;

  if (typeof Number(id) !== 'number') {
    res.status(400).send('Invalid match id');
    return;
  }

  if (
    typeof timestamp !== 'number' ||
    typeof type !== 'string' ||
    typeof videoSrc !== 'string'
  ) {
    res.status(400).send('Invalid payload');
    return;
  }

  const newHighlight: Highlight = {
    timestamp,
    type,
    videoSrc,
  };

  try {
    const updated = await getMatchesCollection().updateOne(
      { _id: new ObjectId(id) },
      { $push: { highlights: newHighlight } }
    );

    if (!updated.acknowledged || updated.modifiedCount === 0) {
      res.status(404).send('match identifier incorrect');
      return;
    }

    const result = await getMatchesCollection().findOne({
      _id: new ObjectId(id),
    });
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

export default router;
