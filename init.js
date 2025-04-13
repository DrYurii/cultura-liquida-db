import { MongoClient } from 'mongodb';
import fs from 'fs/promises';

const username = process.env.MONGO_INITDB_ROOT_USERNAME;
const password = process.env.MONGO_INITDB_ROOT_PASSWORD;
const dbName = process.env.MONGO_INITDB_DATABASE;
const host = process.env.MONGO_HOST || 'localhost'; // or injected by Render

const uri = `mongodb://${username}:${password}@${host}:27017/${dbName}?authSource=admin`;

const client = new MongoClient(uri);

async function main() {
  try {
    console.log("🔌 Connecting to Mongo...");
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('products');

    const data = JSON.parse(await fs.readFile('products.json', 'utf-8'));

    const count = await collection.countDocuments();
    if (count === 0) {
      console.log("📦 Inserting products...");
      await collection.insertMany(data);
    } else {
      console.log("✅ Products already exist. Skipping insert.");
    }
  } catch (err) {
    console.error("💥 Failed:", err);
  } finally {
    await client.close();
    console.log("🔒 Disconnected.");
  }
}

main();
