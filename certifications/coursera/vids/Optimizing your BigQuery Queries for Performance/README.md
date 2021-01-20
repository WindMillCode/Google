# Optimizing your BigQuery Queries for Performance

nav menu > big quuery 

##  Minimize I/O

### Be purposeful in SELECT

```sql
SELECT
  bike_id,
  duration
FROM
  `bigquery-public-data`.london_bicycles.cycle_hire
ORDER BY
  duration DESC
LIMIT
  1
``` 

SELECT * 
takes longer

### Reduce data being read

```sql
SELECT
  MIN(start_station_name) AS start_station_name,
  MIN(end_station_name) AS end_station_name,
  APPROX_QUANTILES(duration, 10)[OFFSET (5)] AS typical_duration,
  COUNT(duration) AS num_trips
FROM
  `bigquery-public-data`.london_bicycles.cycle_hire
WHERE
  start_station_id != end_station_id
GROUP BY
  start_station_id,
  end_station_id
ORDER BY
  num_trips DESC
LIMIT
  10
```

 *  We can reduce the I/O overhead of the query if we do the filtering and grouping using the station name rather than the station id

```sql
SELECT
  start_station_name,
  end_station_name,
  APPROX_QUANTILES(duration, 10)[OFFSET(5)] AS typical_duration,
  COUNT(duration) AS num_trips
FROM
  `bigquery-public-data`.london_bicycles.cycle_hire
WHERE
  start_station_name != end_station_name
GROUP BY
  start_station_name,
  end_station_name
ORDER BY
  num_trips DESC
LIMIT
  10
```


### Reduce number of expensive computations
* find the total distance traveled by each bicycle in our dataset.

* A naive way to do this would be to find the distance traveled in each trip undertaken by each bicycle and sum them up:


```sql
WITH
  trip_distance AS (
SELECT
  bike_id,
  ST_Distance(ST_GeogPoint(s.longitude,
      s.latitude),
    ST_GeogPoint(e.longitude,
      e.latitude)) AS distance
FROM
  `bigquery-public-data`.london_bicycles.cycle_hire,
  `bigquery-public-data`.london_bicycles.cycle_stations s,
  `bigquery-public-data`.london_bicycles.cycle_stations e
WHERE
  start_station_id = s.id
  AND end_station_id = e.id )
SELECT
  bike_id,
  SUM(distance)/1000 AS total_distance
FROM
  trip_distance
GROUP BY
  bike_id
ORDER BY
  total_distance DESC
LIMIT
  5
```

* precompute the distances between all pairs of stations
```sql
WITH
  stations AS (
SELECT
  s.id AS start_id,
  e.id AS end_id,
  ST_Distance(ST_GeogPoint(s.longitude,
      s.latitude),
    ST_GeogPoint(e.longitude,
      e.latitude)) AS distance
FROM
  `bigquery-public-data`.london_bicycles.cycle_stations s,
  `bigquery-public-data`.london_bicycles.cycle_stations e ),
trip_distance AS (
SELECT
  bike_id,
  distance
FROM
  `bigquery-public-data`.london_bicycles.cycle_hire,
  stations
WHERE
  start_station_id = start_id
  AND end_station_id = end_id )
SELECT
  bike_id,
  SUM(distance)/1000 AS total_distance
FROM
  trip_distance
GROUP BY
  bike_id
ORDER BY
  total_distance DESC
LIMIT
  5
```


## Cache results of previous queries

### Cache intermediate results

|property|value|data|
|:------|:------:|------:|
|Dataset ID |mydataset||
|Data location|European Union (EU)||

Create dataset

in query editor

```sql
CREATE OR REPLACE TABLE
  mydataset.typical_trip AS
SELECT
  start_station_name,
  end_station_name,
  APPROX_QUANTILES(duration, 10)[OFFSET (5)] AS typical_duration,
  COUNT(duration) AS num_trips
FROM
  `bigquery-public-data`.london_bicycles.cycle_hire
GROUP BY
  start_station_name,
  end_station_name
```


Use the table created to find days when bicycle trips are much longer than usual:
```sql
SELECT
  EXTRACT (DATE
  FROM
    start_date) AS trip_date,
  APPROX_QUANTILES(duration / typical_duration, 10)[OFFSET(5)] AS ratio,
  COUNT(*) AS num_trips_on_day
FROM
  `bigquery-public-data`.london_bicycles.cycle_hire AS hire
JOIN
  mydataset.typical_trip AS trip
ON
  hire.start_station_name = trip.start_station_name
  AND hire.end_station_name = trip.end_station_name
  AND num_trips > 10
GROUP BY
  trip_date
HAVING
  num_trips_on_day > 10
ORDER BY
  ratio DESC
LIMIT
  10
```
Use the WITH clause to find days when bicycle trips are much longer than usual

```sql
WITH
typical_trip AS (
SELECT
  start_station_name,
  end_station_name,
  APPROX_QUANTILES(duration, 10)[OFFSET (5)] AS typical_duration,
  COUNT(duration) AS num_trips
FROM
  `bigquery-public-data`.london_bicycles.cycle_hire
GROUP BY
  start_station_name,
  end_station_name )
SELECT
  EXTRACT (DATE
  FROM
    start_date) AS trip_date,
  APPROX_QUANTILES(duration / typical_duration, 10)[
OFFSET
  (5)] AS ratio,
  COUNT(*) AS num_trips_on_day
FROM
  `bigquery-public-data`.london_bicycles.cycle_hire AS hire
JOIN
  typical_trip AS trip
ON
  hire.start_station_name = trip.start_station_name
  AND hire.end_station_name = trip.end_station_name
  AND num_trips > 10
GROUP BY
  trip_date
HAVING
  num_trips_on_day > 10
ORDER BY
  ratio DESC
LIMIT
10
```
### Accelerate queries with BI Engine

## Efficient joins

### Denormalization

to create a denormalized table 
```sql
CREATE OR REPLACE TABLE
  mydataset.london_bicycles_denorm AS
SELECT
  start_station_id,
  s.latitude AS start_latitude,
  s.longitude AS start_longitude,
  end_station_id,
  e.latitude AS end_latitude,
  e.longitude AS end_longitude
FROM
  `bigquery-public-data`.london_bicycles.cycle_hire AS h
JOIN
  `bigquery-public-data`.london_bicycles.cycle_stations AS s
ON
  h.start_station_id = s.id
JOIN
  `bigquery-public-data`.london_bicycles.cycle_stations AS e
ON
  h.end_station_id = e.id
```

### Avoid self-joins of large tables

more > query setttings >processiong lcoation
US

```sql
SELECT
  name,
  number AS num_babies
FROM
  `bigquery-public-data`.usa_names.usa_1910_current
WHERE
  gender = 'M'
  AND year = 2015
  AND state = 'MA'
ORDER BY
  num_babies DESC
LIMIT
  5
```



What are the most common names assigned to both male and female babies in the country over all the years in the dataset?

read the input table twice and do a self join

```sql
WITH
male_babies AS (
SELECT
  name,
  number AS num_babies
FROM
  `bigquery-public-data`.usa_names.usa_1910_current
WHERE
  gender = 'M' ),
female_babies AS (
SELECT
  name,
  number AS num_babies
FROM
  `bigquery-public-data`.usa_names.usa_1910_current
WHERE
  gender = 'F' ),
both_genders AS (
SELECT
  name,
  SUM(m.num_babies) + SUM(f.num_babies) AS num_babies,
  SUM(m.num_babies) / (SUM(m.num_babies) + SUM(f.num_babies)) AS frac_male
FROM
  male_babies AS m
JOIN
  female_babies AS f
USING
  (name)
GROUP BY
  name )
SELECT
  *
FROM
  both_genders
WHERE
  frac_male BETWEEN 0.3
  AND 0.7
ORDER BY
  num_babies DESC
LIMIT
  5
```

recast the query to read the input only once and avoid the self-join completely

```sql
WITH
all_babies AS (
SELECT
  name,
  SUM(
  IF
    (gender = 'M',
      number,
      0)) AS male_babies,
  SUM(
  IF
    (gender = 'F',
      number,
      0)) AS female_babies
FROM
  `bigquery-public-data.usa_names.usa_1910_current`
GROUP BY
  name ),
both_genders AS (
SELECT
  name,
  (male_babies + female_babies) AS num_babies,
  SAFE_DIVIDE(male_babies,
    male_babies + female_babies) AS frac_male
FROM
  all_babies
WHERE
  male_babies > 0
  AND female_babies > 0 )
SELECT
  *
FROM
  both_genders
WHERE
  frac_male BETWEEN 0.3
  AND 0.7
ORDER BY
  num_babies DESC
LIMIT
  5
```

### Reduce data being joined

```sql
WITH
all_names AS (
SELECT
  name,
  gender,
  SUM(number) AS num_babies
FROM
  `bigquery-public-data`.usa_names.usa_1910_current
GROUP BY
  name,
  gender ),
male_names AS (
SELECT
  name,
  num_babies
FROM
  all_names
WHERE
  gender = 'M' ),
female_names AS (
SELECT
  name,
  num_babies
FROM
  all_names
WHERE
  gender = 'F' ),
ratio AS (
SELECT
  name,
  (f.num_babies + m.num_babies) AS num_babies,
  m.num_babies / (f.num_babies + m.num_babies) AS frac_male
FROM
  male_names AS m
JOIN
  female_names AS f
USING
  (name) )
SELECT
  *
FROM
  ratio
WHERE
  frac_male BETWEEN 0.3
  AND 0.7
ORDER BY
  num_babies DESC
LIMIT
  5
```

trim data before a join 

```sql
WITH
all_names AS (
SELECT
  name,
  gender,
  SUM(number) AS num_babies
FROM
  `bigquery-public-data`.usa_names.usa_1910_current
GROUP BY
  name,
  gender ),
male_names AS (
SELECT
  name,
  num_babies
FROM
  all_names
WHERE
  gender = 'M' ),
female_names AS (
SELECT
  name,
  num_babies
FROM
  all_names
WHERE
  gender = 'F' ),
ratio AS (
SELECT
  name,
  (f.num_babies + m.num_babies) AS num_babies,
  m.num_babies / (f.num_babies + m.num_babies) AS frac_male
FROM
  male_names AS m
JOIN
  female_names AS f
USING
  (name) )
SELECT
  *
FROM
  ratio
WHERE
  frac_male BETWEEN 0.3
  AND 0.7
ORDER BY
  num_babies DESC
LIMIT
  5
```

### Use a window function instead of a self-join

```sql
SELECT
  bike_id,
  start_date,
  end_date,
  TIMESTAMP_DIFF( start_date, LAG(end_date) OVER (PARTITION BY bike_id ORDER BY start_date), SECOND) AS time_at_station
FROM
  `bigquery-public-data`.london_bicycles.cycle_hire
LIMIT
  5
```

compute the average time that a bicycle is unused at each station and rank stations by that measure:

```sql
WITH
unused AS (
  SELECT
    bike_id,
    start_station_name,
    start_date,
    end_date,
    TIMESTAMP_DIFF(start_date, LAG(end_date) OVER (PARTITION BY bike_id ORDER BY start_date), SECOND) AS time_at_station
  FROM
    `bigquery-public-data`.london_bicycles.cycle_hire )
SELECT
  start_station_name,
  AVG(time_at_station) AS unused_seconds
FROM
  unused
GROUP BY
  start_station_name
ORDER BY
  unused_seconds ASC
LIMIT
  5
```
### Join with precomputed values

*  create a denormalized table with distances between stations and then compute the average pace:


```sql
WITH
  denormalized_table AS (
  SELECT
    start_station_name,
    end_station_name,
    ST_DISTANCE(ST_GeogPoint(s1.longitude,
        s1.latitude),
      ST_GeogPoint(s2.longitude,
        s2.latitude)) AS distance,
    duration
  FROM
    `bigquery-public-data`.london_bicycles.cycle_hire AS h
  JOIN
    `bigquery-public-data`.london_bicycles.cycle_stations AS s1
  ON
    h.start_station_id = s1.id
  JOIN
    `bigquery-public-data`.london_bicycles.cycle_stations AS s2
  ON
    h.end_station_id = s2.id ),
  durations AS (
  SELECT
    start_station_name,
    end_station_name,
    MIN(distance) AS distance,
    AVG(duration) AS duration,
    COUNT(*) AS num_rides
  FROM
    denormalized_table
  WHERE
    duration > 0
    AND distance > 0
  GROUP BY
    start_station_name,
    end_station_name
  HAVING
    num_rides > 100 )
SELECT
  start_station_name,
  end_station_name,
  distance,
  duration,
  duration/distance AS pace
FROM
  durations
ORDER BY
  pace ASC
LIMIT
  5
```



*  use the cycle_stations table to precompute the distance between every pair of stations (this is a self-join) and then join it with the reduced-size table of average duration between stations

```sql
WITH
  distances AS (
  SELECT
    a.id AS start_station_id,
    a.name AS start_station_name,
    b.id AS end_station_id,
    b.name AS end_station_name,
    ST_DISTANCE(ST_GeogPoint(a.longitude,
        a.latitude),
      ST_GeogPoint(b.longitude,
        b.latitude)) AS distance
  FROM
    `bigquery-public-data`.london_bicycles.cycle_stations a
  CROSS JOIN
    `bigquery-public-data`.london_bicycles.cycle_stations b
  WHERE
    a.id != b.id ),
  durations AS (
  SELECT
    start_station_id,
    end_station_id,
    AVG(duration) AS duration,
    COUNT(*) AS num_rides
  FROM
    `bigquery-public-data`.london_bicycles.cycle_hire
  WHERE
    duration > 0
  GROUP BY
    start_station_id,
    end_station_id
  HAVING
    num_rides > 100 )
SELECT
  start_station_name,
  end_station_name,
  distance,
  duration,
  duration/distance AS pace
FROM
  distances
JOIN
  durations
USING
  (start_station_id,
    end_station_id)
ORDER BY
  pace ASC
LIMIT
  5
```

## Avoid overwhelming a worker

* to overwhelm a worker 
```sql
SELECT
  rental_id,
  ROW_NUMBER() OVER(ORDER BY end_date) AS rental_number
FROM
  `bigquery-public-data.london_bicycles.cycle_hire`
ORDER BY
  rental_number ASC
LIMIT
  5
```

* to extract the date from the rentals and then sort trips within each day

```sql
WITH
  rentals_on_day AS (
  SELECT
    rental_id,
    end_date,
    EXTRACT(DATE
    FROM
      end_date) AS rental_date
  FROM
    `bigquery-public-data.london_bicycles.cycle_hire` )
SELECT
  rental_id,
  rental_date,
  ROW_NUMBER() OVER(PARTITION BY rental_date ORDER BY end_date) AS rental_number_on_day
FROM
  rentals_on_day
ORDER BY
  rental_date ASC,
  rental_number_on_day ASC
LIMIT
  5
```

### Data skew

to overwhelm a worker with ARRAY_AGG
```sql
SELECT
  repo_name,
  ARRAY_AGG(STRUCT(author,
      committer,
      subject,
      message,
      trailer,
      difference,
      encoding)
  ORDER BY
    author.date.seconds)
FROM
  `bigquery-public-data.github_repos.commits`,
  UNNEST(repo_name) AS repo_name
GROUP BY
  repo_name
```

to a single worker to sort a significant fraction of 750GB:
```sql
SELECT
  author.tz_offset,
  ARRAY_AGG(STRUCT(author,
      committer,
      subject,
      message,
      trailer,
      difference,
      encoding)
  ORDER BY
    author.date.seconds)
FROM
  `bigquery-public-data.github_repos.commits`
GROUP BY
  author.tz_offset
```

* If you do require sorting all the data, use more granular keys (i.e. distribute the group’s data over more workers) and then aggregate the results corresponding to the desired key

```sql
SELECT
  repo_name,
  author.tz_offset,
  ARRAY_AGG(STRUCT(author,
      committer,
      subject,
      message,
      trailer,
      difference,
      encoding)
  ORDER BY
    author.date.seconds)
FROM
  `bigquery-public-data.github_repos.commits`,
  UNNEST(repo_name) AS repo_name
GROUP BY
  repo_name,
  author.tz_offset
```

## Approximate aggregation functions

* find unique ## of github repos
```sql
SELECT
  COUNT(DISTINCT(repo_name)) AS num_repos
FROM
  `bigquery-public-data`.github_repos.commits,
  UNNEST(repo_name) AS repo_name
```

* to approximate 
```sql
SELECT
  APPROX_COUNT_DISTINCT(repo_name) AS num_repos
FROM
  `bigquery-public-data`.github_repos.commits,
  UNNEST(repo_name) AS repo_name
```