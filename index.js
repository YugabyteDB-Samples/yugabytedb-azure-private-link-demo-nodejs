require("dotenv").config();
const { Client } = require("@yugabytedb/pg");
async function main() {
  const dbhost = process.env.DB_HOST;
  const dbusername = process.env.DB_USERNAME;
  const dbpassword = process.env.DB_PASSWORD;
  const base64cert = process.env.DB_CERTIFICATE;

  const ybclient = new Client({
    database: "yugabyte",
    host: dbhost,
    user: dbusername,
    port: 5433,
    password: dbpassword,
    max: 10,
    idleTimeoutMillis: 0,
    ssl: {
      rejectUnauthorized: true,
      ca: atob(base64cert),
      servername: dbhost,
    },
  });
  console.log("Establishing connection with YugabyteDB Managed...");
  await ybclient.connect();
  console.log("Connected successfully.");
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
