# Bigquery

## What is BigQuery?

* can use cli, REST ,Graphql??, SDK,and 3rd party tools to work with biguqery
* high powered way to deal with big data

## Installation
* install the cloud sdk [here](https://cloud.google.com/sdk/docs/install)

## Quickstart using the bq command-line tool


* To examine the schema of a specific table
```ps1
bq show bigquery-public-data:samples.shakespeare
```

* to get help
```ps1
bq help [command?]
```

* to run a query
    * always want to use standard sql, same with the REST API 

```ps1
bq query --use_legacy_sql=false 
'SELECT
   word,
   SUM(word_count) AS count
 FROM
   `bigquery-public-data`.samples.shakespeare
 WHERE
   word LIKE "%raisin%"
 GROUP BY
   word'
```


## Quickstart using Python SDK

* create a service acct [here](https://console.cloud.google.com/apis/credentials?project=gcp-data-certs)
* click create credentials 

|property|value|data|
|:------|:------:|------:|
|Service Acct Name|Bigquery_Learning||
|Role|Bigquery Admin||
||||
||||


* dont grant anyone access to the service acct j
* go back to the serice acct and create a key
* a json file downloads
* set the GOOGLE_APPLICATION_CREDENTIALS env var to the path of the json

* install the python sdk 
    might have to add .\site-packages to path to see the library
    - gcp doesnt ship as one library, it ships as seperate libraries
```vb
pip install --upgrade google-cloud-bigquery --target .\site-packages
```

* start the bigQuery client
```py
from google.cloud import bigquery
client = bigquery.Client()
```