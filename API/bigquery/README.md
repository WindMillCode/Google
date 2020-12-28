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

## Managing Jobs

* When a job is submitted, it can be in one of three states:

PENDING: scheduled
RUNNING
DONE: reported as SUCCESS or FAILURE (if the job completed with error

* It seems that with the python sdk you cant see the jobs
### Viewing job data

* permissions -  bigquery.jobs.get
* roles - bigquery.admin

* to view info 

#### Python
```py
job_id = "my_query_{}".format(uuid.uuid4())
query_job = bigquery.job.QueryJob(
    job_id,
    "SELECT country_name from `bigquery-public-data.utility_us.country_code_iso`",
    client
)
results = query_job.result()  

query_job = client.get_job(job_id)  # API request

# Print selected job properties
print("Details for job {} running in {}:".format(job_id, location))
print(
    "\tType: {}\n\tState: {}\n\tCreated: {}".format(
        job.job_type, job.state, job.created
    )
)
```

### Listing jobs
* goes back for  6 months
    * omit max_result to go back 6 months
#### Python
```py

from google.cloud import bigquery

import datetime

# Construct a BigQuery client object.
client = bigquery.Client()

print("Last 10 jobs:")
for job in client.list_jobs(max_results=10):  # API request(s)
    print("{}".format(job.job_id))

print("Last 10 jobs run by all users:")
for job in client.list_jobs(max_results=10, all_users=True):
    print("{} run by user: {}".format(job.job_id, job.user_email))   

print("Last 10 jobs done:")
for job in client.list_jobs(max_results=10, state_filter="DONE"):
    print("{}".format(job.job_id))   
```



### Cancelling  jobs
* permissions - bigquery.admin
* roles - bigquery.user, bigquery.jobUser

if  RUNNING or PENDING
* error if a job cant be canceled
```py
# TODO(developer): Uncomment the lines below and replace with your values.
# from google.cloud import bigquery
# client = bigquery.Client()
# job_id = 'bq-job-123x456-123y123z123c'  # replace with your job ID
# location = 'us'                         # replace with your location

job = client.cancel_job(job_id, location=location)
```


### Repeating A job

* __permissions__ -bigquery.jobs.create
* __roles__ - bigquery.user, bigquery.jobUser, bigquery.admin

* you cant use a job id to repeat a job, 

#### Python
```py
    # say if you didnt have the query details
    job_id = "my_query_{}".format(uuid.uuid4())
    query_job = bigquery.job.QueryJob(
        job_id,
        """
        SELECT start_station_name, FROM
        `bigquery-public-data.new_york_citibike.citibike_trips` LIMIT 10
        """
        ,
        client
    )    
    results = query_job.result() 
    query_job = client.get_job(job_id)
    print("Original query \n")
    for row in results:
        print(row.start_station_name)
    #


    # repeat the same query
    repeat_job = bigquery.job.QueryJob(
        "my_query_{}".format(uuid.uuid4()),
        query_job.query
        ,
        client
    )   
    # 

    print("Repeated query \n")
    results = repeat_job.result() 
    for row in results:
        print(row.start_station_name)  
```


### Issues 

* cancel a job, 
it seems bq jobs run sync only with result() , there is no way to do anything during a job, neither cancel or get it status
