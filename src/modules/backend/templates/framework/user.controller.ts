import { Request, Response } from 'express';

export const getUsers = async (req: Request, res: Response) => {
  res.json({ status: 'success', data: [{ id: 1, name: 'Muscle User' }] });
};
