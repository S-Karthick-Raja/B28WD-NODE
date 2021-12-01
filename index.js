// const express = require('express'); //"type": "commonjs"
import express from "express"; // "type": "module", (latest)
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { moviesRouter } from "./routes/movies.js";
import cors from "cors";
// import { getMovies, createMovies, getMovieById, deleteMovieById, UpdateMovieById } from "./helper.js";

dotenv.config(); //ALL KEYS IT WILL PUT IN PROCESS;
const app = express();

// npm install --save-dev nodemon [to install nodemon]
// npm run dev - to start the nodemon
// npm start - to start the nodemon
// "start": "node index.js",
// "dev": "nodemon index.js",

const PORT = process.env.PORT; //Heroku will auto assign available port

app.use(cors()); //cors-3rd party middleware
//

//middleware
app.use(express.json()); //every request in the app body is parsed as JSON
// express.json() - inbuilt middleware

// const movies = ;

// HOW TO CONNECT DB TO NODE STARTS
// const MONGO_url = "mongodb://localhost";

const MONGO_URL = process.env.MONGO_URL;
// mongodb+srv://karthick:<password>@cluster0.thfuy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect(); //promise
  console.log("Mongodb Connected");
  return client;
}

export const client = await createConnection();

// HOW TO CONNECT DB TO NODE ENDS

app.get("/", (request, response) => {
  response.send("Hello, ***");
});

// /movies - all the movies - done
// /movies?language=english - only english movies - done
// /movies?language=english&rating=8 - filter by language & rating
// /movies?rating=8

app.use("/movies", moviesRouter);

app.listen(PORT, () => console.log("App is started in", PORT));

// CICD - CONTINUOUS INTEGRATION CONTINUOUS DEPLOYMENT
