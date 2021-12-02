import { ObjectId } from "mongodb";
import { client } from "./index.js";
import bcrypt from'bcrypt';

async function getMovies() {
  return await client.db("test").collection("movies").find({}).toArray();
}
async function createMovies(data) {
  return await client.db("test").collection("movies").insertMany(data);
}

async function deleteMovieById(id) {
  return await client
    .db("test")
    .collection("movies")
    .deleteOne({ _id: ObjectId(id) });
}
async function UpdateMovieById(id, data) {
  return await client
    .db("test")
    .collection("movies")
    .updateOne({ _id: ObjectId(id) }, { $set: data });
}
async function getMovieById(id) {
  console.log("***", id);
  return await client
    .db("test")
    .collection("movies")
    .findOne({ _id: ObjectId(id) });
}

async function genPassword(password){
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  console.log(salt);
  const hashedPassword = await bcrypt.hash(password,salt);
  console.log(hashedPassword);
}

export {
  getMovies,
  createMovies,
  deleteMovieById,
  UpdateMovieById,
  getMovieById,
  genPassword,
};
