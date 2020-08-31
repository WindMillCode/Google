# Create a Streaming Data Pipeline for a Real-Time Dashboard with Cloud Dataflow

## Overview 
monitor performance of taxi fleet in real time 

nav menu > Pub/Sub
nav menu > dataflow 

confirm that they are enabled

## Create a Cloud Pub/Sub Topic

using this [dataset](https://data.cityofnewyork.us/) well get streaming soon

## Create a BigQuery dataset

we will do command line this time
nav menu > BigQuery
look for the terminal icon top right corner of the screen

will make the taxirides dataset and the realtime table for the dataset
```bash
bq mk taxirides

bq mk \
--time_partitioning_field timestamp \
--schema ride_id:string,point_idx:integer,latitude:float,longitude:float,\
timestamp:timestamp,meter_reading:float,meter_increment:float,ride_status:string,\
passenger_count:integer -t taxirides.realtime
```

## Create a Cloud Storage Bucket

nav menu > stroage

| name          | value           | data 
| :------------ |:---------------:| -----:|
|        name       | [gcp project id]                |       |
|      default storage class         | multi-regional                 |       |
|               |                 |       |


## Set up a Cloud Dataflow Pipeline

nav menu > dataflow
 CREATE JOB FROM TEMPLATE.

 | name          | value           | data 
 | :------------ |:---------------:| -----:|
 |    job name           |   streaming-taxi-pipeline                |       |
 |     Dataflow template           |      Pub/Sub Topic to BigQuery            |       |
 |       Cloud Pub/Sub input topic        |    projects/pubsub-public-data/topics/taxirides-realtime             |       |
 | BigQuery output table|    [>>]myprojectid[<<]:taxirides.realtime |
 | Temporary Location| gs://[>>]mybucket[<<]/tmp/ |

 run job

 if you have issues
 keep trying to run the job or add permissions and roles for the service acct in question

 enable the cloud pub/sub api although if you get to the dashboard without enabling the API  you might want to remport it to google

> console.developers.google.com  > IAM  > members > find the service account Dataflow is complaining about >

 give it the specifc Role its complaining about, if it still fails to work, make it Owner so the service acct has full access to all resources


## Analyze the Taxi Data Using BigQuery

nav menu > big query 

in query editor
```sql
SELECT * FROM taxirides.realtime LIMIT 10
```

run this over and your will see how dataflow and Pub/Sub work with realtime data

## Perform aggregations on the stream for reporting


key metrics per minute for every taxi dropoff
```sql

WITH streaming_data AS (

SELECT
  timestamp,
  TIMESTAMP_TRUNC(timestamp, HOUR, 'UTC') AS hour,
  TIMESTAMP_TRUNC(timestamp, MINUTE, 'UTC') AS minute,
  TIMESTAMP_TRUNC(timestamp, SECOND, 'UTC') AS second,
  ride_id,
  latitude,
  longitude,
  meter_reading,
  ride_status,
  passenger_count
FROM
  taxirides.realtime
WHERE ride_status = 'dropoff'
ORDER BY timestamp DESC
LIMIT 100000

)

# calculate aggregations on stream for reporting:
SELECT
 ROW_NUMBER() OVER() AS dashboard_sort,
 minute,
 COUNT(DISTINCT ride_id) AS total_rides,
 SUM(meter_reading) AS total_revenue,
 SUM(passenger_count) AS total_passengers
FROM streaming_data
GROUP BY minute, timestamp
```

## Create a Real-Time Dashboard

explore data > w/ data studio 
if you get prompt ooops click save
no thanks in preferences
refresh tab

look the the UI for the following settings 

| name          | value           | data 
| :------------ |:---------------:| -----:|
|    Chart type           |     column chart            |       |
|    dimension           |      dashboard_sort           |       |
|        Drill down       |    dashboard_sort (Make sure that Drill down option is turned ON.)             |       |
|Dimension| dashboard_sort, minute|
|Metric| SUM() total_rides, SUM() total_passengers, SUM() total_revenue (If Record Count is present then, mouse over Record Count and click the (x) to remove it.)|
|Sort|dashboard_sort Ascending (latest rides first)|

hit save

refresh for latest analyzed data 


## Stop the Cloud Dataflow job

nav menu > dataflow
menu icon > stop > cancel
