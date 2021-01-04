import { Request, Response } from 'express';
import { nanoid } from 'nanoid';

import db from '../database/index';

export default {
  async index(request: Request, response: Response) {
    const users = await db.get('users').value();
    return response.json(users);
  },
  async show(request: Request, response: Response) {
    try {
      const user = await db
        .get('users')
        .find({ id: request.params.id })
        .value();
      return response.json(user);
    } catch (error) {
      return response.status(404).json({ message: error });
    }
  },
  async create(request: Request, response: Response) {
    try {
      const user = {
        id: nanoid(8),
        ...request.body,
      };
      await db.get('users').push(user).write();

      return response.json(user);
    } catch (error) {
      return response.status(500).json({ message: error });
    }
  },
  async update(request: Request, response: Response) {
    try {
      await db
        .get('users')
        .find({ id: request.params.id })
        .assign(request.body)
        .write();

      return response.json(db.get('users').find({ id: request.params.id }));
    } catch (error) {
      return response.status(500).json({ message: error });
    }
  },
  async delete(request: Request, response: Response) {
    try {
      await db.get('users').remove({ id: request.params.id }).write();
      return response.sendStatus(200);
    } catch (error) {
      return response.status(404).send(error);
    }
  },
};
