import sys
import uuid
import pprint
pp = pprint.PrettyPrinter(indent=4,compact= True,width =1)

sys.path[0] += "\\site-packages"
# end


# paste env object here
env = {
    "run":False,
    "createID":True
}
# 

# import and intalize the library
from google.cloud import bigquery
client = bigquery.Client()
# 


# run a job
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
# 

# create UUID 
if(env.get("createID")):
    
    # use python native UUID library
    query_job = bigquery.job.QueryJob(
        "my_query_{}".format(uuid.uuid4()),
        "SELECT country_name from `bigquery-public-data.utility_us.country_code_iso`",
        client
    )
    print("Started job: {}".format(query_job.job_id))
# 
