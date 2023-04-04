import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  user: 'postgres',
  password: 'zara5151',
  host: 'localhost',
  port: 5432,
  database: 'short_link',
});

export default pool;
