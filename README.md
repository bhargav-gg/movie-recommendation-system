# Steps

1. Download ml-latest and ml-latest-small from https://grouplens.org/datasets/movielens/latest/ and unzip to `model/data`
2. Install all imported Python libraries and run `main.ipynb` to train model and generate results for each movie
3. Create your own .env file in `app/src/.env` to store the API key you got from TMDB (https://developer.themoviedb.org/reference/intro/getting-started)--name it `MOVIE_API_KEY`
4. Install all NPM packages and run `node index.js` in `app/src`.
5. The application will then open up in `localhost:3000`.