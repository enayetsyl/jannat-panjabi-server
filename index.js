const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()

app.use(cors());
app.use(express.json());



const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ktgpsav.mongodb.net/?retryWrites=true&w=majority`;

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

    const panjabiCollection = client.db('jannatPanjabiDB').collection("panjabi")
    const reviewCollection = client.db('jannatPanjabiDB').collection("reviews")
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    // get all panjabi route
    app.get('/panjabi', async(req, res) => {
      const result = await panjabiCollection.find().toArray();
      res.send(result)
    })
    // get review route
    app.get('/reviews', async(req, res) => {
      const result = await reviewCollection.find().toArray()
      res.send(result)
    })

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send("Panjabi server is ready")
})

app.listen(port, () => {
  console.log((`server is running on PORT: ${port}`))
})