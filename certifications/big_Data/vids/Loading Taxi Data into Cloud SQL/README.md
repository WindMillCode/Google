# Loading Taxi Data into Google Cloud SQL


## Create a Cloud SQL instance

in cloud shell
```bash
gcloud config set project gcp-data-certs

gcloud sql instances create taxi \
    --tier=db-n1-standard-1 --activation-policy=ALWAYS

gcloud sql users set-password root --host % --instance taxi \
 --password Passw0rd    


gcloud sql instances patch taxi --authorized-networks $(wget -qO - http://ipecho.net/plain)/32

```


yr sql ip 
```bash
$(gcloud sql instances describe \
taxi --format="value(ipAddresses.ipAddress)")
```

yr cloud shell ip
```bash
 $(wget -qO - http://ipecho.net/plain)/32
```


* login
```bash
gcloud sql connect rentals --user=root --quiet
```

in mysql cli 


```sql
create database if not exists bts;
use bts;

drop table if exists trips;

create table trips (
  vendor_id VARCHAR(16),		
  pickup_datetime DATETIME,
  dropoff_datetime DATETIME,
  passenger_count INT,
  trip_distance FLOAT,
  rate_code VARCHAR(16),
  store_and_fwd_flag VARCHAR(16),
  payment_type VARCHAR(16),
  fare_amount FLOAT,
  extra FLOAT,
  mta_tax FLOAT,
  tip_amount FLOAT,
  tolls_amount FLOAT,
  imp_surcharge FLOAT,
  total_amount FLOAT,
  pickup_location_id VARCHAR(16),
  dropoff_location_id VARCHAR(16)
);
```

## Add data to Cloud SQL instance

* copy yr external csv data to cloud storage

in shell 2 

```bash
gsutil cp gs://cloud-training/OCBL013/nyc_tlc_yellow_trips_2018_subset_1.csv trips.csv-1
gsutil cp gs://cloud-training/OCBL013/nyc_tlc_yellow_trips_2018_subset_2.csv trips.csv-2
```

* import data
```bash
mysqlimport --local --host=$(gcloud sql instances describe \
taxi --format="value(ipAddresses.ipAddress)") --user=root --password \
--ignore-lines=1 --fields-terminated-by=',' bts trips.csv-*
```

## Checking for data integrity

* do some queries to make sure the data is valid

* is this a good thing i have trips where my customers travel nowhere
```sql
select count(*) from trips where trip_distance = 0;
```


* is this a good thing that customers arent paying anything for the trip or my driver is paying them
```sql
select count(*) from trips where fare_amount < 0;
```

