import pg from "pg";
import "dotenv/config";
import fs from "node:fs";

const { Pool } = pg;

const databaseServer = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 5432, 
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  max: 10, 
  connectionTimeoutMillis: 10000, 
  idleTimeoutMillis: 30000, 
  
  ssl: {
    rejectUnauthorized: true, 
    ca: fs.readFileSync("./ca.pem", "utf8"),
  },
});

databaseServer.on("error", (err) => {
  console.error("Unexpected background PostgreSQL pool client error:", err.message);
});

export default databaseServer;