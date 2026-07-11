import pg from "pg";
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const { Pool } = pg;

// 1. Identify the absolute path for local execution on Fedora
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const localCertPath = path.resolve(__dirname, "ca.pem");

// 2. Route the file read based on the environment
// Render automatically sets NODE_ENV=production.
const caCertPath = process.env.NODE_ENV === "production"
  ? "/etc/secrets/ca.pem" 
  : localCertPath;

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
    ca: fs.readFileSync(caCertPath, "utf8"),
  },
});

databaseServer.on("error", (err) => {
  console.error("Unexpected background PostgreSQL pool client error:", err.message);
});

export default databaseServer;