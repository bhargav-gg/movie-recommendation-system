const express = require('express');
const fs = require('fs');
const request = require('async-request')
const app = express();
const port = 3000;
require('dotenv').config()

const recommendations = JSON.parse(fs.readFileSync('../recommendations/recommendations.json'));
let movie_ids = Object.keys(recommendations);
movie_ids = movie_ids.map(Number);
const API_KEY = process.env.MOVIE_API_KEY;

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Home route
app.get('/', (req, res) => {
  res.render('index');
});

// Home route
app.get('/search', async (req, res) => {
    const query = req.query.query;

    console.log(query);

    let search_results = await request(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
    search_results = JSON.parse(search_results.body);
    search_results = search_results.results;

    let valid_search_results = [];

    for (let i = 0; i < search_results.length; i++) {
      if(movie_ids.includes(search_results[i].id)) {
        valid_search_results.push(search_results[i]);
      }
    }

    search_results = valid_search_results;

    res.render('search', { search_results, query });
});

// Define a route with a dynamic parameter
app.get('/movies/:movieId', async (req, res) => {
  const movieId = req.params.movieId;

    // Find the movie with the given ID
    const recommended_movies_ids = recommendations[movieId];

    let movie_info = await request(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
    movie_info = JSON.parse(movie_info.body);

    let recommended_movies_info = [];

    for (let i = 0; i < recommended_movies_ids.length; i++) {
        if(recommended_movies_ids[i] != 0) {
            let recommended_movie_info = await request(`https://api.themoviedb.org/3/movie/${recommended_movies_ids[i]}?api_key=${API_KEY}`);
            recommended_movie_info = JSON.parse(recommended_movie_info.body);
            recommended_movies_info.push(recommended_movie_info);
        }
    }


  res.render('movie', { movie_info, recommended_movies_info });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});