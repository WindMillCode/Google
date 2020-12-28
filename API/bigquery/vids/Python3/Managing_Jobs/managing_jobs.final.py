import sys
import uuid
import datetime
import time
import pprint
import asyncio
pp = pprint.PrettyPrinter(indent=4,compact= True,width =1)

sys.path[0] += "\\site-packages"
# end


# paste env object here
env = {
    "view":False,
    "list":False,
    "cancel":False,
    "repeat":True
}
# 

# import and intalize the library
from google.cloud import bigquery
client = bigquery.Client()
# 


# view job info
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
    # the job is limited, for pricing but you want to await a second 
    # or two for the job to register, then to client.get_job in production, 
    # these values last way long so you dont have to worry 


    job = client.get_job(job_id)  # API request

    # Print selected job properties
    print("Details for job {}:".format(job_id))
    print(
        "\tType: {}\n\tState: {}\n\tCreated: {}".format(
            job.job_type, job.state, job.created
        )
    )
# 


# list jobs
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
#

# cancel a job
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
# 

# repeat  job
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
    
#