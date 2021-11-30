import express from "express";
import {
    getMovies,
    createMovies,
    deleteMovieById,
    UpdateMovieById,
    getMovieById,
} from "../helper.js";

const router = express.Router();

router
    .route("/")
    .get( async (request,response) => {
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
    })
    .post ( async (request, response) => {
    const data = request.body;
    // create movies - db.movies.insertMany(data)
    console.log(data)
    const result = await createMovies(data);
    response.send(result);
    
});

router
    .route("/:id")
    .get(async (request,response) => {
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
    .delete(async (request,response) => {
    console.log(request.params);
    const {id} = request.params;

    const result = await deleteMovieById(id);

    console.log(result);

    result.deleteCount > 0 
    ? response.send(result) 
    : response.status(404).send({message: "matching movie not found"});
})
    .put ( async (request, response) => {
    console.log(request.params);
    const {id} = request.params;
    const data = request.body;
    // create movies - db.movies.insertMany(data)
   
    const result = await UpdateMovieById(id, data);
    const movie = await getMovieById(id);

    response.send(movie); 
});

export const moviesRouter = router;