import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  password: '12345',
  host: 'localhost',
  port: 5432,
  database: 'pern-earthday',
});

export default pool;
