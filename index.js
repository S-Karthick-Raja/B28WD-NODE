    // const express = require('express'); //"type": "commonjs"
    import express from "express"; // "type": "module", (latest)
    import { MongoClient } from "mongodb";
    import dotenv from "dotenv"

    dotenv.config(); //ALL KEYS IT WILL PUT IN PROCESS;
    const app = express();

    // npm install --save-dev nodemon [to install nodemon]
    // npm run dev - to start the nodemon
    // npm start - to start the nodemon
    // "start": "node index.js",
    // "dev": "nodemon index.js",

    const PORT = 9000;
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

    const client = await createConnection();

    // HOW TO CONNECT DB TO NODE ENDS
    
    app.get('/', (request,response) => {
        response.send("Hello, !!!!!!");
    })

    // /movies - all the movies - done
    // /movies?language=english - only english movies - done
    // /movies?language=english&rating=8 - filter by language & rating
    // /movies?rating=8
    app.get('/movies', async (request,response) => {
        // request -> query params
        console.log(request.query);
        const {language, rating} = request.query;
        // console.log(language, rating);

        // let filterMovies = movies;
        // if (language){
        //     filterMovies = filterMovies.filter ((mv) => mv.language === language);
        // }
        // if (rating){
        //     // filterMovies = filterMovies.filter ((mv) => mv.rating === parseInt(rating));
        //     filterMovies = filterMovies.filter ((mv) => mv.rating === +rating);
        // }

        // db.movies.find({})
        const filterMovies = await getMovies(); //cursor to Array
        console.log(filterMovies);
        // cursor - pagination   1 2 3 4 5 6 next ->
        response.send(filterMovies);
    });

    app.post ("/movies", async (request, response) => {
        const data = request.body;
        // create movies - db.movies.insertMany(data)
        console.log(data)
        const result = await createMovies(data);
        response.send(result);
        
    })


    app.get('/movies/:id',async (request,response) => {
        console.log(request.params);
        const {id} = request.params;

    // HOW TO CONNECT DB TO NODE STARTS
        // db.movies.findOne({id:"102"})
        const movie = await getMovieById(id);

    // HOW TO CONNECT DB TO NODE ENDS

        // const movie = movies.filter((mv) => mv.id === id)[0];
        // const movie = movies.find((mv) => mv.id === id);
        console.log(movie);

        movie 
        ? response.send(movie) 
        : response.status(404).send({message: "matching movie not found"});
    })

    app.delete('/movies/:id',async (request,response) => {
        console.log(request.params);
        const {id} = request.params;

        const result = await deleteMovieById(id);

        console.log(result);

        result.deleteCount > 0 
        ? response.send(result) 
        : response.status(404).send({message: "matching movie not found"});
    })

    app.put ("/movies/:id", async (request, response) => {
        console.log(request.params);
        const {id} = request.params;
        const data = request.body;
        // create movies - db.movies.insertMany(data)
       
        const result = await UpdateMovieById(id, data);
        const movie = await getMovieById(id);

        response.send(movie); 
    })

    app.listen(PORT, ()=> console.log("App is started in", PORT))

async function getMovies() {
    return await client
        .db("test")
        .collection("movies")
        .find({})
        .toArray();
}

async function createMovies(data) {
    return await client.db("test").collection("movies").insertMany(data);
}

async function deleteMovieById(id) {
    return await client
        .db("test")
        .collection("movies")
        .deleteOne({ id: id });
}

async function UpdateMovieById(id, data) {
    return await client
        .db("test")
        .collection("movies")
        .updateOne({ id: id }, { $set: data });
}

async function getMovieById(id) {
    return await client
        .db("test")
        .collection("movies")
        .findOne({ id: id });
}

