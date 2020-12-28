# Bigquery

## Messages
 how-to-guides should be in order of coming from the surface (database) to the core (jobs). Not most important concepts, how can we understand the important concepts if the construction to see it is abstract and kept for later

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

* make a query
```py
query_job = client.query(
    """
    SELECT
      CONCAT(
        'https://stackoverflow.com/questions/',
        CAST(id as STRING)) as url,
      view_count
    FROM `bigquery-public-data.stackoverflow.posts_questions`
    WHERE tags like '%google-bigquery%'
    ORDER BY view_count DESC
    LIMIT 10"""
)

results = query_job.result()  # Waits for job to complete.
for row in results:
    print("{} : {} views".format(row.url, row.view_count))
```


* [predefined roles and permissions](https://cloud.google.com/bigquery/docs/access-control)
* [https://cloud.google.com/bigquery/pricing](https://cloud.google.com/bigquery/pricing)

## Introduction to BigQuery jobs

* __Permissions__ bigquery.jobs.create permission
* __roles__ - bigquery.user, bigquery.jobUser, bigquery.admin

### Running jobs programmatically

#### Python
```py
from google.cloud import bigquery

# Construct a BigQuery client object.
client = bigquery.Client()

query_job = client.query(
    "SELECT country_name from `bigquery-public-data.utility_us.country_code_iso`",
    # Explicitly force job execution to be routed to a specific processing
    # location.
    location="US",
    # Specify a job configuration to set optional job resource properties.
    job_config=bigquery.QueryJobConfig(
        labels={"example-label": "example-value"}, maximum_bytes_billed=1000000
    ),
    # The client libraries automatically generate a job ID. Override the
    # generated ID with either the job_id_prefix or job_id parameters.
    job_id_prefix="code_sample_",
)  # Make an API request.

print("Started job: {}".format(query_job.job_id))
```

### Generating a job ID 

* good to genereate a job ID on jobs inseert
* must be  (a-z, A-Z) (0-9), underscores (_) - max 1024
* use symbolic prefix and timestamp daily_import_job_1447971251
* use [GUID mODULE](https://docs.python.org/2/library/uuid.html#module-uuid) 
