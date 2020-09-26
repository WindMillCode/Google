# Lab: Recommend products using Cloud SQL and SparkML

## Task 1. Create a Cloud SQL instance 

enable API if needed
nav menu > SQL > CREATE INSTANCE > mysql



|property|value|data|
|:------|:------:|------:|
|Instance ID|rentals||
|Root password|BananaBubble732||
|Database version|MySQL 5.7||
|Public IP addr|[get the result from the overview page once created  [34.71.16.19]|

CREATE
 
wait for the instance to finish


in cloud shell 1

* to log in 
```sh
gcloud config set project 	[type project id here]
gcloud sql connect rentals --user=root --quiet
```

enter password as needed

* do you best to keep this open as it takes a long time to log in
* to create 3 tables for our project
    * one table for infromation on each lisiting in our hosuing market
    * one table for the rating a user gave a listing
    * one table for the prediction the ML  will make when a new user comes to the site to see houses for the first time

```sql
CREATE DATABASE IF NOT EXISTS recommendation_spark;

USE recommendation_spark;

DROP TABLE IF EXISTS Recommendation;
DROP TABLE IF EXISTS Rating;
DROP TABLE IF EXISTS Accommodation;

CREATE TABLE IF NOT EXISTS Accommodation
(
  id varchar(255),
  title varchar(255),
  location varchar(255),
  price int,
  rooms int,
  rating float,
  type varchar(255),
  PRIMARY KEY (ID)
);

CREATE TABLE  IF NOT EXISTS Rating
(
  userId varchar(255),
  accoId varchar(255),
  rating int,
  PRIMARY KEY(accoId, userId),
  FOREIGN KEY (accoId)
    REFERENCES Accommodation(id)
);

CREATE TABLE  IF NOT EXISTS Recommendation
(
  userId varchar(255),
  accoId varchar(255),
  prediction float,
  PRIMARY KEY(userId, accoId),
  FOREIGN KEY (accoId)
    REFERENCES Accommodation(id)
);

SHOW DATABASES;
```


##  Task 2. Stage data in Cloud Storage


in cloud shell 2

```bash
# "Creating bucket: gs://[type project id here]"
gsutil mb gs://[type project id here]

# "Copying data to our storage from public dataset"
gsutil cp gs://cloud-training/bdml/v2.0/data/accommodation.csv gs://[type project id here]
gsutil cp gs://cloud-training/bdml/v2.0/data/rating.csv gs://[type project id here]


# "View some sample data"
gsutil cat gs://[type project id here]/accommodation.csv
```

* if you get an error upload 
[accommodation.csv]()
and 
[rating.csv]()
here

## Task 3. Load data from Cloud Storage into Cloud SQL tables

in cloud console 

nav menu > SQL > rentals

### Import accommodation data

import

|property|value|data|
|:------|:------:|------:|
|Source > Choose the file you'd like to import data from| gs:// [your bucket name] / accomodation.csv||
|Indicate the format of the file you’re importing |CSV||
|Destination > database|mysql||
|Destination > table|Accommodation||


### Import user rating data

import

|property|value|data|
|:------|:------:|------:|
|Source > Choose the file you'd like to import data from| gs://[your bucket name] / rating.csv||
|Indicate the format of the file you’re importing |CSV||
|Destination > database|mysql||
|Destination > table|Rating||


## Task 4. Explore Cloud SQL data

* Query the ratings data:
```sql
USE recommendation_spark;

SELECT * FROM Rating
LIMIT 15;
```

* Use a SQL aggregation function to count the number of rows 
```sql
SELECT COUNT(*) AS num_ratings
FROM Rating;
```

* some statistics
```sql
SELECT
    COUNT(userId) AS num_ratings,
    COUNT(DISTINCT userId) AS distinct_user_ratings,
    MIN(rating) AS worst_rating,
    MAX(rating) AS best_rating,
    AVG(rating) AS avg_rating
FROM Rating;
```


* which users have provided the most ratings.
```sql
SELECT
    userId,
    COUNT(rating) AS num_ratings
FROM Rating
GROUP BY userId
ORDER BY num_ratings DESC;
``` 


## Task 5. Launch Dataproc

in cloud console

nav menu > sql >configuration 
* take note of location 
us-central1-a

nav menu > dataproc

* enable API if needed
CREATE CLUSTER

|property|value|data|
|:------|:------:|------:|
|Name|rentals||
|Region|us-central1||
|Zone|[location of cloud SQL instalnce||
|Master node > Machine type  |n1-standard-2||
|Worker nodes> Machine type  |n1-standard-2||
|Worker nodes> Nodes|2||
||||
||||

in cloud shell


* to authorize Cloud Dataproc to connect with Cloud SQL
    * replace constansts as needed
```bash
CLUSTER=rentals
CLOUDSQL=rentals
ZONE=us-central1-a
NWORKERS=2

machines="$CLUSTER-m"
for w in `seq 0 $(($NWORKERS - 1))`; do
   machines="$machines $CLUSTER-w-$w"
done

echo "Machines to authorize: $machines in $ZONE ... finding their IP addresses"
ips=""
for machine in $machines; do
    IP_ADDRESS=$(gcloud compute instances describe $machine --zone=$ZONE --format='value(networkInterfaces.accessConfigs[].natIP)' | sed "s/\['//g" | sed "s/'\]//g" )/32
    echo "IP address of $machine is $IP_ADDRESS"
    if [ -z  $ips ]; then
       ips=$IP_ADDRESS
    else
       ips="$ips,$IP_ADDRESS"
    fi
done

echo "Authorizing [$ips] to access cloudsql=$CLOUDSQL"
gcloud sql instances patch $CLOUDSQL --authorized-networks $ips
```




## Task 6. Run the ML model on Dataproc

* Copy over the model code
```bash
gsutil cp gs://cloud-training/bdml/v2.0/model/train_and_apply.py train_and_apply.py
cloudshell edit train_and_apply.py
```

for the code under # MAKE EDITS HERE

|property|value|data|
|:------|:------:|------:|
|CLOUDSQL_INSTANCE_IP |IP from earlier for your cloud SQL instance||
|CLOUDSQL_DB_NAME|recommendation_spark||
|CLOUDSQL_USER|root||
|CLOUDSQL_PWD|[password from earlier]||


File > Save
Close

```bash
gsutil cp train_and_apply.py gs://[type project id here]
```
nav menu > dataproc > rentals submit job

|property|value|data|
|:------|:------:|------:|
|Job type|PySpark ||
| Main python file|gs://[type project id here]/train_and_apply.py||


submit job

* it takes a while

## Task 7. Explore inserted rows with SQL

* look at which 5  listings the ML model thinks will best match with a user
```sql
SELECT * from Recommendation
```

* look at the titles for the recommended listing
```sql
SELECT
    r.userId,
    r.prediction,
    a.title
FROM Recommendation as r
JOIN Accommodation as a
ON r.accoId = a.id
```


