import { Request, Response } from 'express'

import express from 'express'
const router = express.Router()

router.get('/', function (req: Request, res: Response) {
  const name = req.query.user;
  // const color = req.query.color || '#000';

  res.send(name);
})

export default router
