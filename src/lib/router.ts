import express from 'express';
import { ObjectId } from 'mongodb';
import { getMatchesCollection, Match, MatchHighlight } from './matches';

const router = express.Router();
const { isValid } = ObjectId;

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

router.post('/matches/:id/highlights', async (req, res, next) => {
  const id = req.params.id;
  const { timestamp, type, videoSrc } = req.body;

  if (!isValid(id)) {
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

  const newHighlight: MatchHighlight = {
    timestamp,
    type,
    videoSrc,
  };

  try {
    const result = await getMatchesCollection().findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $push: { highlights: newHighlight } }
    );

    if (!result) {
      res.status(404).send("didn't found match to update");
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/matches', async (_req, res, next) => {
  try {
    const data = await getMatchesCollection().find({});
    const result = await data.toArray();

    if (!result.length) {
      res.status(404).send('no matches found');
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
