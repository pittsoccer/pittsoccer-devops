// app.mjs
// we are in ES6, use this.
import 'dotenv/config';
import express from 'express'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
// import * as fs from 'node.fs';
import { MongoClient, ServerApiVersion } from 'mongodb'; //https://github.com/barrycumbie/fantastic-barnacle-devops/blob/710ae66df1a9edd530b3edc1aebc5de8d84f8c0b/app.mjs#L8C1-L8C57

const app = express();
const uri = process.env.MONGO_URI;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// const files = fs.readFile();


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


// middlewares aka endpoints aka 'get to slash' {http verb} to slash {your name ur endpoint}
app.get('/', (req, res) => {
  res.send('Hello World: dev') // string response
  res.sendFile('index.html') // <= this don't work w/o imports, assign, and arguments
  res.sendFile(join(__dirname, 'public', 'index.html')) // <= this works
})

// start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})