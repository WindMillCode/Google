## Running jobs with Google Bigquery API


* after the lab your file should look like running_job.final.py 
* if issues copy and paste from running_job.start.py


* __Permissions__ bigquery.jobs.create permission
* __roles__ - bigquery.user, bigquery.jobUser, bigquery.admin

### Running jobs programmatically
* in ' paste env object here' replace
```py
env = {
    "run":True,
    "createID":False
}
```

* in run a job paste
```py
if(env.get("run")):
    # RUN A job this can be load extract ...
    query_job = client.query(
        "SELECT country_name from `bigquery-public-data.utility_us.country_code_iso`",
        location="US",
        job_config=bigquery.QueryJobConfig(
            labels={"example-label": "example-value"}, maximum_bytes_billed=1000000
        )
    )  
    

    print("Started job: {}".format(query_job.job_id))
```


### Generating a job ID 

* good to genereate a job ID on jobs inseert
* must be  (a-z, A-Z) (0-9), underscores (_) - max 1024
* use symbolic prefix and timestamp daily_import_job_1447971251
* use [GUID mODULE](https://docs.python.org/2/library/uuid.html#module-uuid) 
    * here we use uuid.uuid4(), it fills those requirements


* in ' paste env object here' replace
```py
env = {
    "run":False,
    "createID":True
}
```

* in create UUID paste
```py
if(env.get("createID")):
    
    # use python native UUID library
    query_job = bigquery.job.QueryJob(
        "my_query_{}".format(uuid.uuid4()),
        "SELECT country_name from `bigquery-public-data.utility_us.country_code_iso`",
        client
    )
    print("Started job: {}".format(query_job.job_id))
```