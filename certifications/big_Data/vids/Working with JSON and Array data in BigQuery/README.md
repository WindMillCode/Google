# Working with JSON and Array data in BigQuery

## SQL Arrays

nav menu > bigquery > query editor 

* create an array
```sql
#standardSQL
SELECT
['raspberry', 'blackberry', 'strawberry', 'cherry'] AS fruit_array
```

* select an array
    * fruit array is an array
```sql
#standardSQL
SELECT person, fruit_array, total_cost FROM `data-to-insights.advanced.fruit_store`;
```


### Loading semi-structured JSON into BigQuery

nav menu > bigquery > resources > [project]  > CREATE DATASET 

|property|value|data|
|:------|:------:|------:|
|dataset ID|fruit_store||

CREATE DATASET

shopping_cart.json
```json
{
   "person":"sally",
   "fruit_array":[
      "raspberry",
      "blackberry",
      "strawberry",
      "cherry"
   ],
   "total_cost":"10.99"
},
{
   "person":"frederick",
   "fruit_array":[
      "orange",
      "apple"
   ],
   "total_cost":"5.55"
}
```

|property|value|data|
|:------|:------:|------:|
|Source > Create table from|Google Cloud STORAGE||
|Select file from GCS BUCKET|gs://data-insights-course/labs/optimizing-for-performance/shopping_cart.json||
|File format|JSONL||
|Destination > Table Name|"fruit_details||
|Schema > Auto Detect |[check]|

CREATE TABLE


## Creating your own arrays with ARRAY_AGG()


* see problems
    * dubplicate data in visitorId,
    * uniqure visitor id
    * which user looked at what
```sql
SELECT
  fullVisitorId,
  date,
  v2ProductName ,
  pageTitle 
  FROM `data-to-insights.ecommerce.all_sessions`
WHERE visitId = 1501570398
LIMIT 10
```


* answers many questions
```sql
SELECT
  fullVisitorId,
  date,
  ARRAY_AGG(v2ProductName) AS products_viewed,
  ARRAY_AGG(pageTitle) AS pages_viewed
  FROM `data-to-insights.ecommerce.all_sessions`
WHERE visitId = 1501570398
GROUP BY fullVisitorId,date
```

* get the length of an array also an aggregate 
```sql
SELECT
  fullVisitorId,
  date,
  ARRAY_LENGTH(ARRAY_AGG(v2ProductName)) AS products_viewed,
  ARRAY_AGG(pageTitle) AS pages_viewed
  FROM `data-to-insights.ecommerce.all_sessions`
WHERE visitId = 1501570398
GROUP BY fullVisitorId,date
```

* see how many unique items were viewed used distinct
```sql
SELECT
  fullVisitorId,
  date,
  ARRAY_LENGTH(ARRAY_AGG( DISTINCT v2ProductName)) AS products_viewed,
  ARRAY_AGG(pageTitle) AS pages_viewed
  FROM `data-to-insights.ecommerce.all_sessions`
WHERE visitId = 1501570398
GROUP BY fullVisitorId,date
```



## Querying datasets that already have ARRAYs

* some time you have to use UNNEST(), turn that ARRAY back into that repeated data problem
```sql
SELECT DISTINCT
  visitId,
  h.page.pageTitle
FROM `bigquery-public-data.google_analytics_sample.ga_sessions_20170801`,
UNNEST(hits) AS h
WHERE visitId = 1501570398

SELECT person, f, total_cost FROM `data-to-insights.advanced.fruit_store`,
UNNEST(fruit_array) AS f
```

## Introduction to STRUCTs

*  to select structs
    * can also remove the .*
```sql
SELECT
  visitId,
  totals.*,
  device.*
FROM `bigquery-public-data.google_analytics_sample.ga_sessions_20170801`
WHERE visitId = 1501570398
LIMIT 10
```

* to create a struct
```sql
#standardSQL
SELECT STRUCT("Rudisha" as name, [23.4, 26.3, 26.4, 26.1] as splits) AS runner
```

* challenge 
upload and make a table with this [json](gs://data-insights-course/labs/optimizing-for-performance/race_results.json) and identify the struct

use this json as the schema


```json
[
    {
        "name": "race",
        "type": "STRING",
        "mode": "NULLABLE"
    },
    {
        "name": "participants",
        "type": "RECORD",
        "mode": "REPEATED",
        "fields": [
            {
                "name": "name",
                "type": "STRING",
                "mode": "NULLABLE"
            },
            {
                "name": "splits",
                "type": "FLOAT",
                "mode": "REPEATED"
            }
        ]
    }
]
```