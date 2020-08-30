#### Lab: Product Recommendations using Cloud SQL and Spark


##### Steps
nav menu -> STORAGE > SQL 
create instance 
choose MySQL

| name          | value           | data 
| :------------ |:---------------:| -----:|
|    instance ID           | rentals                 |       |
|         root password      |  BananaBowl7368                 |       |
|               |                 |       |

create 
connect to this instance - > connect using cloud shell 
cmd 
```
gcloud sql connect rentals --user=root --quiet
```
    enter passwd after whitelist
mysql
```sql 
SHOW DATABASES;
``` 
copy and paste rentals.sql hit enter make sure you see 
recommandation_spark 
in the db list 
```sql
USE recommendation_spark;
SHOW TABLES;
```

make sure there 3 tables

```sql    
SELECT * FROM Accommodation;
```    

__Stage Data in Google Cloud Storage__

nav menu > storage > browser
create bucket

| name          | value           | data 
| :------------ |:---------------:| -----:|
|      name         | 	[YOUR PROJECT ID HERE]                |       |

create
upload accomodation and rating to the new bucket using upload files

__Loading Data from Google Cloud Storage into Cloud SQL tables__

nav menu > SQL > rentals > import

| name          | value           | data 
| :------------ |:---------------:| -----:|
|       browse        |  project name > accomodation.csv               |       |
|     format of import           |        csv          |       |
|        database       |    recommendation_spark                |       |
|Table |Accommodation | |

import

| name          | value           | data 
| :------------ |:---------------:| -----:|
|       browse        |  project name > rating.csv               |       |
|     format of import           |        csv          |       |
|        database       |    recommendation_spark                |       |
|Table |Rating | |

import

__Explore Cloud SQL data__
if you closed the shell open it again
```sql 
USE recommendation_spark;
SELECT * FROM Rating
LIMIT 15;    
```
to see how many ratings in the table
```sql
SELECT COUNT(*) AS num_ratings
FROM Rating;
``` 

 average rating across all reviews?
 ```sql 
 SELECT
    COUNT(userId) AS num_ratings,
    COUNT(DISTINCT userId) AS distinct_user_ratings,
    MIN(rating) AS worst_rating,
    MAX(rating) AS best_rating,
    AVG(rating) AS avg_rating
FROM Rating;
```

to see the mode of reviews of theuser who left the most reviews
```sql
SELECT
    userId,
    COUNT(rating) AS num_ratings
FROM Rating
GROUP BY userId
ORDER BY num_ratings DESC; 
```

__Generating housing recommendations with Machine Learning using Cloud Dataproc__

__Lanuch Dataproc__
nav menu -> sql 

| name          | value           | data 
| :------------ |:---------------:| -----:|
|location               |[RENTAL COLUMN VALUE LOCATION HERE]               |       |

nav menu -> dataproc > create cluster 

| name          | value           | data 
| :------------ |:---------------:| -----:|
|       name        | rentals                 |       |
|        region       |global                 |       |
|zone|  [RENTAL COLUMN VALUE LOCATION HERE]                   |       |
| master node >machine type | n1-standard-2 | 
| worker nodes >machine type | n1-standard-2 | 
| total worker nodes | 2 | 


in bash shell
 replace CLUSTER, ZONE AND NWORKERS as needed
```bash 
echo "Authorizing Cloud Dataproc to connect with Cloud SQL"
CLUSTER=rentals
CLOUDSQL=rent
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

hit yes
wait for 

```
Patching Cloud SQL instance...done.
``` 

get the public IP addr from SQL page 
104.197.238.198 


__Run ML model__

```
gsutil cp gs://cloud-training/bdml/v2.0/model/train_and_apply.py train_and_apply.py
cloudshell edit train_and_apply.py
```

modify line 30 and 33 as needed which is the SQL ip and root SQL passwd

copy .py to gcloud storage
```
gsutil cp train_and_apply.py gs://$DEVSHELL_PROJECT_ID
```

nav menu -> dataproc -> jobs

submit jobs 

| name          | value           | data 
| :------------ |:---------------:| -----:|
| job type              |pySpark                 |       |
|   Main python file            |   gs://[YOUR PROJECT ID HERE]/train_and_apply.py             |       |
|               |                 |       |

submit
wait for the status to turn to succeded
login in to the cloudSQL shell 

to see how many recommendations the model made
```sql
SELECT COUNT(*) AS count FROM Recommendation;
```


find recommendations for a user
```sql
SELECT
    r.userid,
    r.accoid,
    r.prediction,
    a.title,
    a.location,
    a.price,
    a.rooms,
    a.rating,
    a.type
FROM Recommendation as r
JOIN Accommodation as a
ON r.accoid = a.id
WHERE r.userid = 10;
```







