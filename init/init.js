import { MongoClient } from 'mongodb';
import fs from 'fs/promises';

const uri = 'mongodb://localhost:27017';
const dbName = 'app';

const client = new MongoClient(uri, {
  useUnifiedTopology: true,
});

async function main() {
  try {
    console.log("🟡 Connecting to Mongo...");
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('products');

    const data = JSON.parse(await fs.readFile('./products.json', 'utf-8'));

    // Only insert if collection is empty
    const count = await collection.countDocuments();
    if (count === 0) {
      console.log("📦 Inserting initial data...");
      await collection.insertMany(data);
    } else {
      console.log("✅ Collection already has data");
    }
  } catch (e) {
    console.error("🔥 Error:", e);
  } finally {
    await client.close();
    console.log("🔌 Disconnected from Mongo");
  }
}

main();
