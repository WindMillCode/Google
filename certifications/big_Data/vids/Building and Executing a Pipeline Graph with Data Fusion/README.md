# Lab Building and Executing a Pipeline Graph with Data Fusion

cloud shell

## Task 1: Creating a Cloud Data Fusion instance

to enable datafusion 

```bash
gcloud services enable datafusion.googleapis.com
```

nav menu > datafusion > create an instance

|name|value|data|
|:------|:------:|------:|
|name|[give a name]||


create

click on the instance once created

note the service accout

go to [link](console.developers.google.com) > IAM & Admin > IAM > add

|name|value|data|
|:------|:------:|------:|
|New members|[noted service acct]||
|select a role|Cloud Data Fusion Service Account ||


Save

## Task 2: Loading the data


to create bucket and copy data to bucket in cloud shell,
and temp bucket
```bash
export BUCKET=$GOOGLE_CLOUD_PROJECT
gsutil mb gs://$BUCKET
gsutil cp gs://cloud-training/OCBL017/ny-taxi-2018-sample.csv gs://$BUCKET
gsutil mb gs://$BUCKET-temp
```

click [view instance]() link

under Google Cloud Storage, select Cloud Storage Default.
 click the bucket made for the project
Select ny-taxi-2018-sample.csv

## Task 3: Cleaning the data

body [column] > [down arrow] > Parse > CSV > 
[check] Set first row as header 
Apply

delete the body column

trip distance,total_amount [colummn] > [down arrow] >  Change data type > Float

trip distance,total_amount [colummn] > [down arrow] >  Filter  > Custom condition > >0.0

##  Task 4: Creating the pipeline

create a pipeline > batch pipeline
wrangler node > properties > output schema 
delete the extra column

## Task 5: Adding a data source

nav menu > big query [project id] > create dataset

|name|value|data|
|:------|:------:|------:|
|dataset ID |trips||

create dataset > more  > query settings

|name|value|data|
|:------|:------:|------:|
| Set a destination table for query results.| [checked]||
|Table name |zone_id_mapping||


to map geo id to geo name 
```sql
SELECT
  zone_id,
  zone_name,
  borough
FROM
  `bigquery-public-data.new_york_taxi_trips.taxi_zone_geom`
```

cloud datafusion UI 
source > bigquery > biquery node > properties

|name|value|data|
|:------|:------:|------:|
|Reference Name|zone_mapping||
| Dataset |trips||
|Table|zone_id_mapping||
|Temporary Bucket Name|[project name]-temp||

get schema

## Task 6: Joining two sources

datafusion ui > analytics > joiner 
connect wrangler and bigquery to joiner
joiner node > properties


|name|value|data|
|:------|:------:|------:|
|join type|Inner||
|Join condition|pickup_location_id -> Wrangler, zone_id -> bigquery||

GET SCHEMA 
output schema  
remove zone_id and pickup_location_id

## Task 7: Storing the output to BigQuery

datafusion ui > sink > biquery > bigquery sink node > propetries

|name|value|data|
|:------|:------:|------:|
|Reference name |bq_insert ||
|Dataset| trips||
|Temporary Bucket Name|[project name]-temp||
|Table|trips_pickup_name||

## Task 8: Deploying and running the pipeline

upper left-hand corner name the pipeline 
click OK 

deploy 
run to process data

for errors
logs > advanced errors

we have an error where we need to change the quota or request less,












