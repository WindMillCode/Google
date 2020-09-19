# Pub/Sub

 * if your system are down, Pub/Sub holds onto messages for 7 days
 * async and sync publisher
 * dont use for chat apps
 * messages may come out of order


# Cloud Shell

* to set the project 
```bash
gcloud config set project [PROJECT_ID]
```

* to get project id 
```bash
gcloud config get-value project
```


*to create a service acct with its private key
```bash
gcloud config set project qwiklabs-gcp-04-df6a67a77e11

export PROJECT=<your_project_name>

gcloud iam service-accounts create my-account --display-name my-account
gcloud projects add-iam-policy-binding $PROJECT --member=serviceAccount:my-account@$PROJECT.iam.gserviceaccount.com --role=roles/bigquery.admin
gcloud iam service-accounts keys create key.json --iam-account=my-account@$PROJECT.iam.gserviceaccount.com
export GOOGLE_APPLICATION_CREDENTIALS=key.json
```


## Big Query

* can stream data

## Big Table

* high performance applications
* __colossus__ where bigtable  stores data
* index with row key
* speed through simple
* nosql database
* you just want a quick scan, sorting = less performance 
* have identical data closer to each other
* if data is read more than others, colusses reorganizes for optimization


# Dataflow

## Dataflow Windowing

* 3 types fixed sliding and session
* in python late data is discarded  in java u can do something about late data