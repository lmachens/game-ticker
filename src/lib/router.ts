import express from 'express';

const router = express.Router();

type Match = {
  _id?: string;
  gameId: number;
  username: string;
  createdAt: Date;
  highlights: {
    timestamp: number;
    type: string;
    videoSrc: string;
  }[];
};

router.post('/matches', async (req, res) => {
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

  res.status(200).json(match);
});

export default router;
