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
* get a tables IAM policy

#### Python
```py
        table = client.get_table(table_id)
        policy =client.get_iam_policy(table)
        return str(policy.bindings)
```

* test if a user has certain access [here](https://cloud.google.com/iam/docs/testing-permissions)

* set tables IAM policy

#### Python
```py
    table = client.get_table(table_id)
    emails = set(["{}:{}".format(x[0],x[1]) for x in emails])
    print(emails)
    return "working"
    policy =client.get_iam_policy(table)
    policy.bindings = [
        {
            "role": "roles/owner",
            # "members": {user, serviceAccount} # this is a python set
            "members":emails
        },
        {
            "role": "roles/editor",
            "members": {"allAuthenticatedUsers"}
        },
        {
            "role": "roles/viewer",
            "members": {"allUsers"},
            # "condition": {  # doesnt work  all the time 
            #     "title": "request_time",
            #     "description": "Requests made before 2021-01-01T00:00:00Z",
            #     "expression": "request.time < timestamp("2021-01-01T00:00:00Z")"
            # }                        
        }
    ]  
    client.set_iam_policy(table,policy) 
    return "IAM policy sucessfully created/updated" 
```

### Updating table properties

* __permissions__ - bigquery.tables.update,bigquery.tables.get
* __roles__ - bigquery.dataEditor,bigquery.dataOwner,bigquery.admin

* update table desc

#### Python
```py
assert table.description == "Original description."
table.description = "Updated description."

table = client.update_table(table, ["description"])  # API request

assert table.description == "Updated description."
```

* update table expiration time

#### Python
```py
import datetime
import pytz

assert table.expires is None

# set table to expire 5 days from now
expiration = datetime.datetime.now(pytz.utc) + datetime.timedelta(days=5)
table.expires = expiration
table = client.update_table(table, ["expires"])  # API request

# expiration is stored in milliseconds
margin = datetime.timedelta(microseconds=1000)
assert expiration - margin <= table.expires <= expiration + margin
```

* copying a table
    * this is also how you rename a table

* __permissions__ bigquery.tables.get,bigquery.tables.getData,bigquery.tables.create
* __roles__    - bigquery.admin

* subject to quota policy
* unique,
* to do anything fancy, no cros-region multi -table <-->, async pwa, you need GCP storage
* very restricted in cloud console, if not in cloud console, everything works, overwritting some fancy stuff

* copy a single table
    * if you repeat overwrites the table
#### Python 
```py
source_table_id = table_id
destination_table_id = "{}.{}".format(dataset_main, "Copied_Table") 
job = client.copy_table(source_table_id, destination_table_id)
job.result()  # Wait for the job to complete.
return "A copy of the table created."   
```

* copy many tables
#### Python 
```py
table_ids = [
    table_id,
    "bigquery-public-data.census_utility.fips_codes_states"
]
dest_table_id = "{}.{}".format(dataset_main, "Merged_Table") 
job = client.copy_table(table_ids, dest_table_id)  
job.result()  # Wait for the job to complete.
return "The tables {} have been appended to {}".format(table_ids, dest_table_id)   
```

### Deleting tables
* __permissions__  -  bigquery.tables.delete,bigquery.tables.get
* __roles__ - bigquery.dataOwner,bigquery.dataEditor,bigquery.admin

* to delete a table
#### Python
```py
client.delete_table(table_id, not_found_ok=True)  # Make an API request.
print("Deleted table '{}'.".format(table_id))
```
    
* to restore a deleted table
#### Python
```py
recovered_table_id = "{}.{}".format(dataset_main, "Recovered_Table") 
snapshot_epoch = int(time.time() * 1000) # current time in milliseconds
client.delete_table(table_id)
snapshot_table_id = "{}@{}".format(table_id, snapshot_epoch)
job = client.copy_table(
    snapshot_table_id,
    recovered_table_id,
    # Must match the source and destination tables location.
    location="US",
)        
job.result()
return "Copied data from deleted table {} to {}".format(table_id, recovered_table_id) 
```

### Managing table data

* to browse table data
* __permissions__ - bigquery.tables.getData
* __roles__ - bigquery.dataViewer,bigquery.dataEditor,bigquery.dataOwner,bigquery.admin

#### Python
```py

table_id = "bigquery-public-data.census_utility.fips_codes_states"
action = data.get("browse")
print(action)
# Download all rows from a table.
if(action =="All Rows"):
    rows_iter = client.list_rows(table_id)  
    print(rows_iter)
    return "Was able to receive all rows check terminal for output"

# Iterate over rows to make the API requests to fetch row data.
elif(action =="Count Rows"):
    rows_iter = client.list_rows(table_id)  
    rows = list(rows_iter)
    return "Downloaded {} rows from table {}".format(len(rows), table_id)

# Download at most 10 rows.
elif(action =="10 Rows"):
    rows_iter = client.list_rows(table_id, max_results=10)
    rows = list(rows_iter)    
    schema_column_names = [field.to_api_repr().get("name") for field in rows_iter.schema]
    result_data = {
        "rows":[[[schema_column_names[index] ,value] for index,value in enumerate(list(row))] for row in rows] , 
        "schema":[field.to_api_repr().get("name") for field in rows_iter.schema]
    }
    print(result_data)
    return json.dumps(result_data)

# Specify selected fields to limit the results to certain columns.
elif(action =="Selected Fields"):                
    table = client.get_table(table_id)  # Make an API request.
    fields = table.schema[:2]  # First two columns.
    rows_iter = client.list_rows(table_id, selected_fields=fields, max_results=10)
    rows = list(rows_iter)
    print("Selected {} columns from table {}.".format(len(rows_iter.schema), table_id))
    print("Downloaded {} rows from table {}".format(len(rows), table_id))

# Print row data in tabular format.
elif(action =="Pretty Print"): 
    table = client.get_table(table_id) 
    rows = client.list_rows(table, max_results=10)
    format_string = "{!s:<16} " * len(rows.schema)
    field_names = [field.name for field in rows.schema]
    print(format_string.format(*field_names))  # Prints column headers.
    for row in rows:
        print(format_string.format(*row))  # Prints row data. 

else:
    return "please choose a browsing action"   

return "Sucess check the server output in the terminal"  
```

* to query table data

* __interactive__- executed ASAP
* __batch__ - executed when resources are availble

#### Python
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

* to export table data
    * bigquery can only do 1GB, use wildcard to export to multiple files
    * on export to cloud storage
    * arrays and structs (repreated and nested) only for Avro and JSON
    * GZIP
    * make sure everything in the same region

* __permissions__ - bigquery.tables.export,bigquery.jobs.create,storage.objects.create,storage.objects.delete
* __roles__ - bigquery.admin AND storage.objectAdmin,storage.admin
* [Optional] The exported file format. Possible values include CSV, NEWLINE_DELIMITED_JSON or AVRO for tables and ML_TF_SAVED_MODEL or ML_XGBOOST_BOOSTER for models, default is CSV

#### Python
* create a storage bucket
in cloud console
navigation > storage
enable the API

|property|value|data|
|:------|:------:|------:|
|name|export_table_bucket_[choose any number]||
|location|northamerical-northeast1||
|storage class|standard||
|Access cotnrol|unfomrm||

* give the service acct storage.objectAdmin role
```py
    bucket_name = name
    project = "bigquery-public-data"
    dataset_id = "samples"
    table_id = "shakespeare"

    destination_uri = "gs://{}/{}".format(bucket_name, "shakespeare.csv")
    dataset_ref = bigquery.DatasetReference(project, dataset_id)
    table_ref = dataset_ref.table(table_id)

    extract_job = client.extract_table(
        table_ref,
        destination_uri,
        job_config= bigquery.job.ExtractJobConfig(
            destination_format="CSV",
            # default CSV, NEWLINE_DELIMITED_JSON or AVRO
            # compression = bigquery.Compression.GZIP
        ),        
        location="US",
    )  # API request

    extract_job.result()  # Waits for job to complete.
    return "Exported {}:{}.{} to {}".format(project, dataset_id, table_id, destination_uri) 
```


### Accessing historical data using time traveL
* the query
```sql
SELECT *
FROM `mydataset.mytable`
  FOR SYSTEM_TIME AS OF TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 HOUR);
```

* restore  a table from the a previous data
    * refer to recover a table in delete a table


### Lab [Regular Tables in Bigquery (Python)](./vids/Python3/Regular_Tables_in_Bigquery/README.md)

## Table Schemas 

### Specifying a schema

* specify or use auto detection
* need column name and data type
* colum names cant be prefixed with "_TABLE_","_FILE_","_PARTITION"
* case-sensitive, Column1 === column1
* max 1024




Name|Data type|Description
|:------|:------:|:------|
|Integer                 |INT64|        Numeric values without fractional components |
|Floating point          |FLOAT64|        Approximate numeric values with fractional components |
|Numeric                 |NUMERIC|        Exact numeric values with fractional components |
|BigNumeric (Preview)    |BIGNUMERIC|        Exact numeric values with fractional components |
|Boolean                 |BOOL|        TRUE or FALSE (case insensitive) |
|String                  |STRING|        Variable-length character (Unicode) data |
|Bytes                   |BYTES|        Variable-length binary data |
|Date                    |DATE|        A logical calendar date |
|Date/Time               |DATETIME|        "A year, month, day, hour, minute, second, and subsecond" |
|Time                    |TIME|        "A time, independent of a specific date" |
|Timestamp               |TIMESTAMP|        "An absolute point in time, with microsecond precision" |
|Struct (Record)         |STRUCT|        Container of ordered fields each with a type (required) and field name (optional) |
|Geography               |GEOGRAPHY|        "A pointset on the Earth's surface (a set of points, lines and polygons on the WGS84 reference spheroid, with geodesic edges)" |


Mode | Description |
|:------|:------:|
Nullable | Column allows NULL values (default) |
Required | NULL values are not allowed |
Repeated | Column contains an array of values of the specified type |

* custom schema
    * if you repeat,it doesnt get mad if the table exists it appended the loaded data

#### Python
```py
job_config = bigquery.LoadJobConfig(
    schema=[
        bigquery.SchemaField("name", "STRING"),
        bigquery.SchemaField("post_abbr", "STRING"),
    ],
    source_format=bigquery.SourceFormat.NEWLINE_DELIMITED_JSON,
)
uri = "gs://cloud-samples-data/bigquery/us-states/us-states.json"   

load_job = client.load_table_from_uri(
    uri,
    table_id,
    location="US",  # Must match the destination dataset location.
    job_config=job_config,
)  # Make an API request.

load_job.result()  # Waits for the job to complete.

destination_table = client.get_table(table_id)
return "Loaded {} rows.".format(destination_table.num_rows) 
```

### Specifying nested and repeated columns
* cant be over 15 levels

* create nested rows

#### JSON 
```json
[
    {
        "name": "id",
        "type": "STRING",
        "mode": "NULLABLE"
    },
    {
        "name": "first_name",
        "type": "STRING",
        "mode": "NULLABLE"
    },
    {
        "name": "last_name",
        "type": "STRING",
        "mode": "NULLABLE"
    },
    {
        "name": "dob",
        "type": "DATE",
        "mode": "NULLABLE"
    },
    {
        "name": "addresses",
        "type": "RECORD",
        "mode": "REPEATED",
        "fields": [
            {
                "name": "status",
                "type": "STRING",
                "mode": "NULLABLE"
            },
            {
                "name": "address",
                "type": "STRING",
                "mode": "NULLABLE"
            },
            {
                "name": "city",
                "type": "STRING",
                "mode": "NULLABLE"
            },
            {
                "name": "state",
                "type": "STRING",
                "mode": "NULLABLE"
            },
            {
                "name": "zip",
                "type": "STRING",
                "mode": "NULLABLE"
            },
            {
                "name": "numberOfYears",
                "type": "STRING",
                "mode": "NULLABLE"
            }
        ]
    }
]
```

#### Python
```py
# from google.cloud import bigquery
# client = bigquery.Client()
# project = client.project
# dataset_ref = bigquery.DatasetReference(project, 'my_dataset')

schema = [
    bigquery.SchemaField("id", "STRING", mode="NULLABLE"),
    bigquery.SchemaField("first_name", "STRING", mode="NULLABLE"),
    bigquery.SchemaField("last_name", "STRING", mode="NULLABLE"),
    bigquery.SchemaField("dob", "DATE", mode="NULLABLE"),
    bigquery.SchemaField(
        "addresses",
        "RECORD",
        mode="REPEATED",
        fields=[
            bigquery.SchemaField("status", "STRING", mode="NULLABLE"),
            bigquery.SchemaField("address", "STRING", mode="NULLABLE"),
            bigquery.SchemaField("city", "STRING", mode="NULLABLE"),
            bigquery.SchemaField("state", "STRING", mode="NULLABLE"),
            bigquery.SchemaField("zip", "STRING", mode="NULLABLE"),
            bigquery.SchemaField("numberOfYears", "STRING", mode="NULLABLE"),
        ],
    ),
]
table_ref = dataset_ref.table("my_table")
table = bigquery.Table(table_ref, schema=schema)
table = client.create_table(table)  # API request

print("Created table {}".format(table.full_table_id))
```

### Using schema auto-detection
* Avro, Parquet, and ORC formats, or with Firestore export files or Datastore export files are not auto detected. the have a soruce schema file
* define if you want to use a schema or not
* if bigquery does not recongize as a DATE,TIME or TIMESTAMP, it will say its a string
* with json,csv

#### Python
```py
job_config = bigquery.LoadJobConfig(
    autodetect=True, source_format=bigquery.SourceFormat.NEWLINE_DELIMITED_JSON
)
uri = "gs://cloud-samples-data/bigquery/us-states/us-states.json"
load_job = client.load_table_from_uri(
    uri, table_id, job_config=job_config
)  # Make an API request.
load_job.result()  # Waits for the job to complete.
destination_table = client.get_table(table_id)
return "Loaded {} rows.".format(destination_table.num_rows)  
```

### Modifying table schemas

#### Manually adding an empty column
* cant add one with mode=REQUIRED
* for RECORDS, try to see if you can add a struct or aray, and try to add to that struct


##### Python
```py

original_schema = table.schema
new_schema = original_schema[:]  # Creates a copy of the schema.
new_schema.append(bigquery.SchemaField("phone", "STRING"))

table.schema = new_schema
table = client.update_table(table, ["schema"])  # Make an API request.

if len(table.schema) == len(original_schema) + 1 == len(new_schema):
    print("A new column has been added.")
else:
    print("The column has not been added.")
```

#### Add a column in a sdk append job

```py


# Retrieves the destination table and checks the length of the schema
table_id = "my_table"
table_ref = dataset_ref.table(table_id)
table = client.get_table(table_ref)
print("Table {} contains {} columns.".format(table_id, len(table.schema)))


job_config = bigquery.LoadJobConfig()
job_config.write_disposition = bigquery.WriteDisposition.WRITE_APPEND
job_config.schema_update_options = [
    bigquery.SchemaUpdateOption.ALLOW_FIELD_ADDITION
]

job_config.schema = [
    bigquery.SchemaField("full_name", "STRING", mode="REQUIRED"),
    bigquery.SchemaField("age", "INTEGER", mode="NULLABLE"),
]
job_config.source_format = bigquery.SourceFormat.CSV
job_config.skip_leading_rows = 1

with open(filepath, "rb") as source_file:
    job = client.load_table_from_file(
        source_file,
        table_ref,
        location="US",  # Must match the destination dataset location.
        job_config=job_config,
    )  # API request

job.result()  # Waits for table load to complete.
print(
    "Loaded {} rows into {}:{}.".format(
        job.output_rows, dataset_id, table_ref.table_id
    )
)

# Checks the updated length of the schema
table = client.get_table(table)
print("Table {} now contains {} columns.".format(table_id, len(table.schema)))
```

#### Add a column in a SQL append job

```py

table = client.get_table(table_id)  # Make an API request.
print("Table {} contains {} columns".format(table_id, len(table.schema)))

# Configures the query to append the results to a destination table,
# allowing field addition.
job_config = bigquery.QueryJobConfig(
    destination=table_id,
    schema_update_options=[bigquery.SchemaUpdateOption.ALLOW_FIELD_ADDITION],
    write_disposition=bigquery.WriteDisposition.WRITE_APPEND,
)

# Start the query, passing in the extra configuration.
query_job = client.query(

    'SELECT "Timmy" as full_name, 85 as age, "Blue" as favorite_color;',
    job_config=job_config,
)  
query_job.result()  # Wait for the job to complete.

table = client.get_table(table_id)  # Make an API request.
print("Table {} now contains {} columns".format(table_id, len(table.schema)))
```


####  Relaxing a column's mode
* only change from REQUIRED TO NULLABLE

##### Python
```py

original_schema = [
    bigquery.SchemaField("full_name", "STRING", mode="REQUIRED"),
    bigquery.SchemaField("age", "INTEGER", mode="REQUIRED"),
]

dataset_ref = bigquery.DatasetReference(project, dataset_id)
table_ref = dataset_ref.table(table_id)
table = bigquery.Table(table_ref, schema=original_schema)
table = client.create_table(table)
assert all(field.mode == "REQUIRED" for field in table.schema)


relaxed_schema = [
    bigquery.SchemaField("full_name", "STRING", mode="NULLABLE"),
    bigquery.SchemaField("age", "INTEGER", mode="NULLABLE"),
]
table.schema = relaxed_schema
table = client.update_table(table, ["schema"])

assert all(field.mode == "NULLABLE" for field in table.schema)
```

* using SDK
#### Python
```py

# Retrieves the destination table and checks the number of required fields
table_id = "my_table"
table_ref = dataset_ref.table(table_id)
table = client.get_table(table_ref)
original_required_fields = sum(field.mode == "REQUIRED" for field in table.schema)
# In this example, the existing table has 3 required fields.
print("{} fields in the schema are required.".format(original_required_fields))

# Configures the load job to append the data to a destination table,
# allowing field relaxation
job_config = bigquery.LoadJobConfig()
job_config.write_disposition = bigquery.WriteDisposition.WRITE_APPEND
job_config.schema_update_options = [
    bigquery.SchemaUpdateOption.ALLOW_FIELD_RELAXATION
]
# In this example, the existing table contains three required fields
# ('full_name', 'age', and 'favorite_color'), while the data to load
# contains only the first two fields.
job_config.schema = [
    bigquery.SchemaField("full_name", "STRING", mode="REQUIRED"),
    bigquery.SchemaField("age", "INTEGER", mode="REQUIRED"),
]
job_config.source_format = bigquery.SourceFormat.CSV
job_config.skip_leading_rows = 1

with open(filepath, "rb") as source_file:
    job = client.load_table_from_file(
        source_file,
        table_ref,
        location="US",  # Must match the destination dataset location.
        job_config=job_config,
    )  # API request

job.result()  # Waits for table load to complete.
print(
    "Loaded {} rows into {}:{}.".format(
        job.output_rows, dataset_id, table_ref.table_id
    )
)

# Checks the updated number of required fields
table = client.get_table(table)
current_required_fields = sum(field.mode == "REQUIRED" for field in table.schema)
print("{} fields in the schema are now required.".format(current_required_fields))
```

* using SQL
```py
# Retrieves the destination table and checks the number of required fields.
table = client.get_table(table_id)  # Make an API request.
original_required_fields = sum(field.mode == "REQUIRED" for field in table.schema)

# In this example, the existing table has 2 required fields.
print("{} fields in the schema are required.".format(original_required_fields))

# Configures the query to append the results to a destination table,
# allowing field relaxation.
job_config = bigquery.QueryJobConfig(
    destination=table_id,
    schema_update_options=[bigquery.SchemaUpdateOption.ALLOW_FIELD_RELAXATION],
    write_disposition=bigquery.WriteDisposition.WRITE_APPEND,
)

# Start the query, passing in the extra configuration.
query_job = client.query(
    # In this example, the existing table contains 'full_name' and 'age' as
    # required columns, but the query results will omit the second column.
    'SELECT "Beyonce" as full_name;',
    job_config=job_config,
)  # Make an API request.
query_job.result()  # Wait for the job to complete.

# Checks the updated number of required fields.
table = client.get_table(table_id)  # Make an API request.
current_required_fields = sum(field.mode == "REQUIRED" for field in table.schema)
print("{} fields in the schema are now required.".format(current_required_fields))
```

### Manually changing table schemas

#### Changing a column's name
* you need to make a new table

#### Changing a column's data type
* you need to make a new table

#### Deleting a column
* you need to make a new table








pip install --upgrade google-cloud-bigquery google-cloud-bigquery-datatransfer tornado watchdog --target .\site-packages


### Issues 

* cancel a job, 
it seems bq jobs run sync only with result() , there is no way to do anything during a job, neither cancel or get it status

* copy datset 
* fail to mention need to install google-cloud-bigquery-datatransfer

* follow up on gitter.im on getting css vars to values