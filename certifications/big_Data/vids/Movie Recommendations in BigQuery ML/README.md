# Movie Recommendations in BigQuery ML

nav menu > bigquery

## Task 1: Get MovieLens Data

cloud shell 

```bash
bq --location=EU mk --dataset movies
```


setup dataset
```bash
 bq load --source_format=CSV \
 --location=EU \
 --autodetect movies.movielens_ratings \
 gs://dataeng-movielens/ratings.csv




  bq load --source_format=CSV \
 --location=EU   \
 --autodetect movies.movielens_movies_raw \
 gs://dataeng-movielens/movies.csv
```

## Task 2: Explore the Data

nav menu > bigquery > query editor 


* to count the amnt of unique users, amnt of unique movies and totalRatings, (each row is a rating here)
```sql
SELECT
  COUNT(DISTINCT userId) numUsers,
  COUNT(DISTINCT movieId) numMovies,
  COUNT(*) totalRatings
FROM
  movies.movielens_ratings
```


to parse thise string

- "Adventure|Children|Fantasy"
```sql
CREATE OR REPLACE TABLE
  movies.movielens_movies AS
SELECT
  * REPLACE(SPLIT(genres, "|") AS genres)
FROM
  movies.movielens_movies_raw
```

## Task 3: Collaborative Filtering

* high level stuff you will pay dearly for this do not run

```sql
CREATE OR REPLACE MODEL
  movies.movie_recommender
OPTIONS
  (model_type='matrix_factorization',
    user_col='userId',
    item_col='movieId',
    rating_col='rating',
    l2_reg=0.2,
    num_factors=16) AS
SELECT
  userId,
  movieId,
  rating
FROM
  movies.movielens_ratings
```

## Task 4: Making Recommendations

* find the best comedy movies to recommend to the user whose userId is 903. 
```sql
SELECT
  *
FROM
  ML.PREDICT(MODEL `cloud-training-prod-bucket.movies.movie_recommender`,
    (
    SELECT
      movieId,
      title,
      903 AS userId
    FROM
      `movies.movielens_movies`,
      UNNEST(genres) g
    WHERE
      g = 'Comedy' ))
ORDER BY
  predicted_rating DESC
LIMIT
  5  
```

* this happens to yield the same set of movies -- the top predicted ratings didn’t include any of the movies the user has already seen
```sql
SELECT
  *
FROM
  ML.PREDICT(MODEL `cloud-training-prod-bucket.movies.movie_recommender`,
    (
    WITH
      seen AS (
      SELECT
        ARRAY_AGG(movieId) AS movies
      FROM
        movies.movielens_ratings
      WHERE
        userId = 903 )
    SELECT
      movieId,
      title,
      903 AS userId
    FROM
      movies.movielens_movies,
      UNNEST(genres) g,
      seen
    WHERE
      g = 'Comedy'
      AND movieId NOT IN UNNEST(seen.movies) ))
ORDER BY
  predicted_rating DESC
LIMIT
  5
```

* We wish to get more reviews for movieId=96481 which has only one rating and we wish to send coupons to the 100 users who are likely to rate it the highest. Identify those users using:
```sql
SELECT
  *
FROM
  ML.PREDICT(MODEL `cloud-training-prod-bucket.movies.movie_recommender`,
    (
    WITH
      allUsers AS (
      SELECT
        DISTINCT userId
      FROM
        movies.movielens_ratings )
    SELECT
      96481 AS movieId,
      (
      SELECT
        title
      FROM
        movies.movielens_movies
      WHERE
        movieId=96481) title,
      userId
    FROM
      allUsers ))
ORDER BY
  predicted_rating DESC
LIMIT
  100
```