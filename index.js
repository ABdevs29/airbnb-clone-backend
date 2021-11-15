import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(cors());

async function createConnection() {
  const MONGO_URL = process.env.MONGO_URL;
  const client = new MongoClient(MONGO_URL);

  await client.connect();
  console.log("Mongo server has connected");
  return client;
}

createConnection();

app.get("/", (request, response) => {
  response.send("Hello World");
});

app.get("/hotels", async (request, response) => {
  const client = await createConnection();

  const hotels = await client
    .db("get-inn-hotels")
    .collection("hotels")
    .find({})
    .toArray();

  response.send(hotels);
});

app.listen(PORT, () => console.log("Server has started at ", PORT));
