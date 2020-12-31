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

* grab biguqery lib and all needed modlues [here](https://cloud.google.com/python/docs/reference)
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
pip install --upgrade google-cloud-bigquery google-cloud-bigquery-datatransfer --target .\site-packages
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


### Lab [Running Jobs with Bigquery](./vids/Python3/Running_Jobs/README.md)

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

### Lab [Managing Jobs With Google Bigquery API](./vids/Python3/Managing_Jobs/README.md)
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


## Datasets
* __dataset__ - op-level containers that are used to organize and control access to your tables and views. 

* limitation
    * cant change location
    * All tables that are referenced in a query must be stored in datasets in the same location.
    * copy table, source dest same location
    * dataset names unique for each project
    [quotas and limits](https://cloud.google.com/bigquery/quotas#dataset_limits)
* You are not charged for creating, updating, or deleting a dataset.

### Dataset locations 
* region and multi-region which contain 2 or more regions
* __regions__ 

![](\images\dataset_regions.PNG)

* __multi-regions__ - EU,US
* try to keep your application running in the same region or u pay for it

### Creating datasets

* name unique,1024 characters,case-sensitive, no spaces or special chars
__permissions__ - bigquery.datasets.create
__roles__ - bigquery.dataEditor, bigquery.dataOwner, bigquery.user,bigquery.admin

#### Python
```py
# create a dataset
    name = "" # enter  a name for the dataset
    dataset_id = "{}.{}".format(client.project,name)
    dataset_init = bigquery.Dataset(dataset_id)
    dataset_init.location = "US" # multi-region
    try:
        if(name == ""):
            raise IndexError                
        dataset = client.create_dataset(dataset_init, timeout=30)
        return "Created dataset {}.{}".format(client.project, dataset.dataset_id).encode()
    except IndexError:
        return b"Please input a name"
    except BaseException as e:
        return b"Dataset already exists choose another name"   
#
```

### Copying Datasets
* this feature is in beta
* need to enable [BigQuery Data Transfer Service](https://cloud.google.com/bigquery/docs/enable-transfer-service)
* make a destination dataset in a supported [region](https://cloud.google.com/bigquery/docs/copying-datasets#supported_regions) rmbr unique names each GCP project
* if you overwrite tables both tables must have same partition schema
* if schedule is not given once, every 24 hours

* __permissions__ - bigquery.transfers.update,bigquery.tables.list
* __roles__ - bigquery.admin, serviceacct.tokenCreator

* to copy a dataset
    * try not to run this too many times

* to view in UI 
    * look for Transfers
    * to delete click the menu icon on the target dataset
    * to immediately execute  click on display 
        * top right click more

* There is no charge for dataset copying during the beta period.
    * bigquery compresses the data for copy across regions pricing may be less

#### Python 

```ps1
pip install --upgrade google-cloud-bigquery google-cloud-bigquery-datatransfer --target .\site-packages
```

```py
from google.cloud import bigquery_datatransfer

transfer_client = bigquery_datatransfer.DataTransferServiceClient()

destination_project_id = "my-destination-project"
destination_dataset_id = "my_destination_dataset"
source_project_id = "my-source-project"
source_dataset_id = "my_source_dataset"
transfer_config = bigquery_datatransfer.TransferConfig(
    destination_dataset_id=destination_dataset_id,
    display_name="Your Dataset Copy Name",
    data_source_id="cross_region_copy",
    params={
        "source_project_id": source_project_id,
        "source_dataset_id": source_dataset_id,
    },
    # schedule="every 24 hours",
)
transfer_config = transfer_client.create_transfer_config(
    parent=transfer_client.common_project_path(destination_project_id),
    transfer_config=transfer_config,
)
print(f"Created transfer config: {transfer_config.name}")
```








### Controlling access to datasets
* access control only happens on update , cant do it with create

__permissions__ -  bigquery.datasets.update,bigquery.datasets.get
__roles__ - bigquery.dataOwner,bigquery.admin

* to control access to a dataset

#### Python

```py
name = ""
try:
    dataset_id =  "{}.{}".format(client.project,name)
    dataset = client.get_dataset(dataset_id) 
    entry = bigquery.AccessEntry(
        role="READER",
        entity_type="userByEmail",
        entity_id="sample.bigquery.dev@gmail.com",
    )   

    entries = list(dataset.access_entries)
    entries.append(entry)
    dataset.access_entries = entries
    dataset = client.update_dataset(dataset, ["access_entries"]) 
    full_dataset_id = "{}.{}".format(dataset.project, dataset.dataset_id)
    return "Updated dataset '{}' with modified user permissions.".format(full_dataset_id).encode()
except BaseException as e:
    print("\nlook here\n")
    print(e)
    return "An error occured"
```

### Listing datasets
* if you see deleted datasets, wait 6 hours

* __permissions__ - bigquery.datasets.get
* __roles__ - bigquery.user, bigquery.metadataViewer,bigquery.dataViewer,bigquery.dataOwner,bigquery.dataEditor,bigquery.admin


* to list 

#### Python
```py
try:
    datasets = list(client.list_datasets())
    project = client.project
    value = "datasets in project {}".format(project)
    if datasets:
        print("Datasets in project {}:".format(project))
        for dataset in datasets:
            value += "\n{}".format(dataset.dataset_id)
        return value.encode()
    else:
        return "{} project does not contain any datasets.".format(project).encode()
except BaseException as e:
    print("\nlook here\n")
    print(e)
    return "An error occured".encode()  
```

### Getting information about datasets

* __permissions__ - bigquery.datasets.get
* __roles__ - bigquery.user, bigquery.metadataViewer,bigquery.dataViewer,bigquery.dataOwner,bigquery.dataEditor,bigquery.admin

* get dataset metadata

#### Python
```py
name = "" # enter dataset name
value ="Metadata:\n"
try:
    # get the dataset friendly name
    dataset_id = "{}.{}".format(client.project,name)
    dataset = client.get_dataset(dataset_id) 
    full_dataset_id = "{}.{}".format(dataset.project, dataset.dataset_id)
    value += "{}: {}\n".format("Friendly Name",dataset.friendly_name)
    # 

    # more properties
    value += "{}: {}\n".format("Description",dataset.description)
    value += "Labels:\n"
    labels = dataset.labels
    if labels:
        for label, value in labels.items():
            value += "\n{}: {}".format(label, value)
    else:
        value += "\tDataset has no labels defined.\n"
    #

    # View tables
    value += "Tables:"
    tables = list(client.list_tables(dataset))
    if tables:
        for table in tables:
            value += "\n{}:".format(table.table_id)
    else:
        value += "\tDataset does not have tables.\n"
    #

    return value


except BaseException as e:
    print("\nlook here\n")
    print(e)
    return "An error occured"    
```

### Updating dataset properties

* __permissions__ - bigquery.datasets.get
* __roles__ - bigquery.dataOwner,bigquery.admin

* to update things
    * can set default table expiration time at the dataset level
    * to get granaular change the default table expiration on the table
    * console cant set default partition expiration, however the table value overrides the dataset value
    * for dataset accress control refer to the access control section
        * Google Account email: Grants an individual Google Account access to the dataset.
        * Google Group: Grants all members of a Google group access to the dataset.
        * Google Apps Domain: Grants all users and groups in a Google domain access to the dataset.
        * Service account: Grants a service account access to the dataset.
        * Anybody: Enter allUsers to grant access to the general public.
        * All Google accounts: Enter allAuthenticatedUsers to grant access to any user signed in to a Google Account.
        Authorized views: Grants an authorized view access to the dataset.  
  
            

#### Python

[full resource](https://googleapis.dev/python/bigquery/latest/generated/google.cloud.bigquery.dataset.Dataset.html#google.cloud.bigquery.dataset.Dataset)
```py
# update dataset
def make_dataset_id(self, name):
    if(name == ""):
        raise IndexError
    return "{}.{}".format(client.project,name)

name = "" # enter dataset name 
# update dataset description
dataset_id = self.make_dataset_id(name)
dataset = client.get_dataset(dataset_id)  # Make an API request.
print(dataset)
dataset.description = "Updated description."
dataset = client.update_dataset(dataset, ["description"])  # Make an API request.

full_dataset_id = "{}.{}".format(dataset.project, dataset.dataset_id)
value += "Updated dataset '{}' with description '{}'.\n".format(
        full_dataset_id, dataset.description
    )
#

# update default table expiration 
dataset.default_table_expiration_ms = 24 * 60 * 60 * 1000  # In milliseconds means in 24 hours
dataset = client.update_dataset(
    dataset, ["default_table_expiration_ms"]
)
value += "Updated dataset '{}' with table expiration '{}'.\n".format(
        full_dataset_id, dataset.default_table_expiration_ms
    )                                
#

# update default partition expiration 
dataset.default_partition_expiration_ms = 24 * 60 * 60 * 1000  # In milliseconds means in 24 hours
dataset = client.update_dataset(
    dataset, ["default_partition_expiration_ms"]
)    
value += "Updated dataset '{}' with table partition expiration '{}'.\n".format(
        full_dataset_id, dataset.default_partition_expiration_ms
    )                              
#    
return value
```

### Managing Datasets

* to move datasets, you would export the data to the cloud bucket in your region
* you would move the data to the target region, 
* make a dataset in the target region and do a load job

* to delete a dataset
* __permissions__ - bigquery.datasets.delete, bigquery.tables.delete 
* __roles__ -   bigquery.dataOwner, bigquery.admin

* to delete a dataset

#### Python
```py

client.delete_dataset(
    dataset_id, delete_contents=True, not_found_ok=False
)  

print("Deleted dataset '{}'.".format(dataset_id))
```

### Availability and durability
* say google cloud goes down
    Machine-level, Zonal(one region),Regional(many regions)

__soft failure__ - software or power issue , data is safe
__hard failure__ - mother nature or crime, data is compromised

* back up yr data off cloud

### Lab [Datasets with Google Bigquery API](./vids/Python3/Datasets_in_Bigquery/README.md)

## Tables

* __table__ contains individual records organized in rows. Each record is composed of columns (also called fields)
    * __native tables__ - tables in bq
    * __external tables__ - tables from external sources
    * __views__ - tables in memory, created for training a ml model training datasets are views
* __schema__ -defines columns,partitions clustters. ..

* limits - unique per dataset, must reside in same location, 

### Quotas 
[load jobs](https://cloud.google.com/bigquery/quotas#load_jobs)
[export jobs](https://cloud.google.com/bigquery/quotas#export_jobs)
[querying](https://cloud.google.com/bigquery/quotas#query_jobs)
[copy](https://cloud.google.com/bigquery/quotas#copy_jobs)

### Pricing
* charged for how much data is stored in the tables, and queries you run against the table


### Creating and using tables
* names upto 1024, and follow [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category)
* anthings valid  table-01, ग्राहक, 00_お客様, étudiant
__permissions__ -  bigquery.tables.create,bigquery.tables.updateData,bigquery.jobs.create
__roles__ -bigquery.admin

#### Python
```py
try:
    # create a dataset first
    dataset_main = self.make_dataset()
    #
                    
    # make a table
    table_id = "{}.{}.{}".format(client.project, dataset_main, name)
    schema = [
        bigquery.SchemaField("full_name", "STRING", mode="REQUIRED"),
        bigquery.SchemaField("age", "INTEGER", mode="REQUIRED"),
    ]

    table = bigquery.Table(table_id, schema=schema)
    table = client.create_table(table)  # Make an API request.
    return"Created table {}.{}.{}".format(table.project, table.dataset_id, table.table_id)
    #
except BaseException as e:
    print("\nlook here\n")
    print(e.__class__.__name__)
    if(e.__class__.__name__ == "Conflict"):
        return "Table already exists in that dataset choose a different name"
    print("\n")
    print(e)
    return "an error occured check the output from the backend"  
```

### Table Access Control 

* google uses IAM policy table for granular access control, one person can read a column, another can read a table ...
* access control here can take 7 mins
* disable caching
* if you lost access to the table cant use FOR SYSTEM_TIME AS OF
    to regain access :)
* tables copied dont copy the ACL, manually do this
* __authorized_view__ - share query results with particular users and groups without giving them access to the underlying tables

more [here](https://cloud.google.com/bigquery/docs/table-access-controls-intro)

* __permissions__ -
    * bigquery.tables.setIamPolicy,
    * bigquery.tables.getIamPolicy
* __roles__ - 
    * bigquery.admin,
    * bigquery.dataOwner
* [IAM Policies](https://cloud.google.com/iam/docs/policies) play a part in this
    * impt to know about this table


* a sample IAM policy table
    * alice@example.com has been granted the role BigQuery Data Owner (roles/bigquery.dataOwner).
    * bob@example.com has been granted the role BigQuery Data Viewer (roles/bigquery.dataViewer).
```json
{
  "bindings":[
    {
      "members":[
        "user:alice@example.com"
      ],
      "role":"roles/bigquery.dataOwner"
    },
    {
      "members":[
        "user:bob@example.com"
      ],
      "role":"roles/bigquery.dataViewer"
    }
  ],
  "etag":"ABAC",
  "version":1
}
```
* view a tables IAM policy

#### Python
```py
```

* test if a user has certain access [here](https://cloud.google.com/iam/docs/testing-permissions)

* set tables IAM policy

#### Python
```py
```

* get tables IAM policy

#### Python
```py
```


pip install --upgrade google-cloud-bigquery google-cloud-bigquery-datatransfer tornado --target .\site-packages


### Issues 

* cancel a job, 
it seems bq jobs run sync only with result() , there is no way to do anything during a job, neither cancel or get it status

* copy datset 
* fail to mention need to install google-cloud-bigquery-datatransfer