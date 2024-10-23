import { MongoClient, ServerApiVersion } from "mongodb";

const url = process.env.DATABASE_URL;
// console.log(url);
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    deprecationErrors: true,
  },
});
export async function database_connection(pos_collections) {
  try {
    await client.connect();
    const db = await client.db("pos_system");
    const collection = pos_collections.map((element) => {
      return db.collection(element);
    });

    // Send a ping to confirm a successful connection
    return collection;
  } catch (error) {
    console.error(
      "Error occurred while connecting to MongoDB Atlas...\n",
      error,
    );
  }
}
