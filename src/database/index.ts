import path from 'path';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

interface user {
  id: string;
  name: string;
}

interface DBSchema {
  user: user[];
}

const databaseFile = path.join(__dirname, './db.json');

const adapter = new FileSync<DBSchema>(databaseFile);

const db = low(adapter);

db.defaults().write();

export default db;
