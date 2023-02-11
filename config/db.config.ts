import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  password: '123',
  host: 'localhost',
  port: 5432,
  database: 'pern-earthday',
});

// export  pool;
