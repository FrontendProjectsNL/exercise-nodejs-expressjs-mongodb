import { MongoClient, ServerApiVersion } from 'mongodb';

const uri =
  process.env.ATLAS_URI ||
  'mongodb+srv://EA2009:UTKgzg3Nmt2Olddl@cluster0.mb8kibd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster';
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // Connect the client to the server
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db('nextjs-mongodb').command({ ping: 1 });
  console.log('Pinged your deployment. You successfully connected to MongoDB!');
} catch (err) {
  console.error(err);
}

let db = client.db('nextjs-mongodb');

export default db;
