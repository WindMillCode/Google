# Streaming Data Processing: Streaming Data Pipelines


## Overview

* Dataflow to collect traffic events from simulated GCP Pub/Sub
* process them by avergge
* store raw data in bigquery
* start, monitor, and optimize a dataflow pipeline


## Task 1: Preparation 

cloud shell 

gcloud config set project gcp-data-certification-288008

click authorize

```bash
git clone https://github.com/GoogleCloudPlatform/training-data-analyst & 
```

## Task 2: Create a BigQuery Dataset and Cloud Storage Bucket

### Create a BigQuery Dataset

```bash
bq  mk --dataset demos
```


### Create a cloud storage bucket 

nav menu > storage > create bucket

|property|value|data|
|:------|:------:|------:|
|name|[PROJECT ID]||
|Default Storage Class|Standard||
|Location-type|Region||
|Location|us-central1||
||||


## Task 3: Simulate traffic sensor data into Pub/Sub

* upload sensor_magic.sh into cloud storage bucket
    * if issues and you see /r in the erros use vscode and change the end of line sequence to LF and upload again
```bash
gsutil cp gs://gcp-data-certification-288008/sensor_magic.sh ./
sudo chmod 700 sensor_magic.sh
```

in cloud shell  #1 

```bash
pip3 install google-cloud-pubsub==1.4.3 &
./sensor_magic.sh
```


## Task 4: Launch Dataflow Pipeline

in console.cloud

search bar dataflow API
enable and create credentials

|property|value|data|
|:------|:------:|------:|
|Which API are you using?|Dataflow API||
|Are you planning to use this API with App Engine or Compute Engine?|No, I’m not using them||


what credentials do I need? 


|property|value|data|
|:------|:------:|------:|
|Service account name|dataflow||
|role|dataflow > dataflow admin||
|Key type > JSON|||

Continue


reame the .json to keys.json
upload the json to cloud storage


in shell 2

```bash
gsutil cp gs://gcp-data-certification-288008/keys.json ./
```


also create credentials if needed





in cloud shell 2 

* Run the Dataflow pipeline to read from PubSub and write into BigQuery.
* This script uses maven to build a Dataflow streaming pipeline in Java.
```bash
gcloud config set project gcp-data-certification-288008
cd ~/training-data-analyst/courses/streaming/process/sandiego
./run_oncloud.sh gcp-data-certification-288008 gcp-data-certification-288008 AverageSpeeds
```


in console.cloud

nav menu > dataflow API 

look for your dataflow job