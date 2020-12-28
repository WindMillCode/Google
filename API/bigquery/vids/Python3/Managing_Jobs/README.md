# Managing Jobs With Google Bigquery API

* after the lab your file should look like managing_jobs.final.py
* if issues copy and paste from managing_jobs.start.py


### Viewing job data
* in ' paste env object here' replace
```py
env = {
    "view":True,
    "list":False,
    "cancel":False,
    "repeat":False
}
```

* in 'view job info' paste
    * we to run result() with the job before we can do anything it
    * creating a job alone does not sen it to bigquery
```py
if(env.get("view")):
    job_id = "my_query_{}".format(uuid.uuid4())
    query_job = bigquery.job.QueryJob(
        job_id,
        """
        SELECT
        start_station_name,
        FROM
        `bigquery-public-data.new_york_citibike.citibike_trips`
        LIMIT
        10        
        """
        ,
        client
    )

    results = query_job.result()  # Waits for job to complete, 
    job = client.get_job(job_id)  # API request

    # Print selected job properties
    print("Details for job {}:".format(job_id))
    print(
        "\tType: {}\n\tState: {}\n\tCreated: {}".format(
            job.job_type, job.state, job.created
        )
    )
```


### Listing jobs
* goes back for  6 months
    * omit max_result to go back 6 months
* in ' paste env object here' replace
```py
env = {
    "view":False,
    "list":True,
    "cancel":False,
    "repeat":False
}
```

* in 'list jobs' paste
```py
if(env.get("list")):
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
* if you can figure how to get this to cancel properly 

* in ' paste env object here' replace
```py
env = {
    "view":False,
    "list":False,
    "cancel":True,
    "repeat":False
}
```

* in ' cancel a job' paste
```py
if(env.get("cancel")):

    async def main():
        time.sleep(5)
        client.cancel_job(job_id) 

    job_id = "my_query_{}".format(uuid.uuid4())
    query_job = bigquery.job.QueryJob(
        job_id,
        """
        SELECT
        start_station_name,
        FROM
        `bigquery-public-data.new_york_citibike.citibike_trips`
        LIMIT
        10
        """
        ,
        client
    )    
    # asyncio.run()
    main()
    results = query_job.result()  # Waits for job to complete.

    print(query_job.cancelled()) 
```

### Reapting Jobs
* we cant take a job Id and repeat a job, we get the job, and recreate the arguments from the object we get back


* in ' paste env object here' replace
```py
env = {
    "view":False,
    "list":False,
    "cancel":False,
    "repeat":True
}
```

* in 'repeat  job'
```py
if(env.get("repeat")):

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

    #
    
#
```

* in 'repeat the same query' paste this code
```py
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