import sys
sys.path[0] += "\\site-packages"
from google.cloud import bigquery_datatransfer
from google.cloud import bigquery
import uuid
import datetime
import time
import pprint
import asyncio
import json
import datetime
import pytz
import time
pp = pprint.PrettyPrinter(indent=4, compact=True, width=1)
# end

# import and intalize the library
client = bigquery.Client()
#

class my_bigquery_client():

    def __init__(self):
        self.client = client
        self.bigquery = bigquery
        self.datetime = datetime
        self.pytz = pytz
        self.time = time 

    # paste env dictionary here
    env=  {
        "query_and_return":True
    }
    #

    # setup
    dataset_names = [
        "googleMaps_Dataset",
    ]
    #


    def execute(self, data):

        #setup 
        client = self.client
        bigquery = self.bigquery
        datetime = self.datetime 
        pytz = self.pytz        
        time = self.time 
        name = data.get("titleName") if data.get("titleName")  else "My_Target_Table"
        emails = data.get("emails") if data.get("emails") else ["data_analysts@example.com"]
        query = data.get("query")
        source_url = data.get("sourceURL")  if data.get("titleName") else "gs://cloud-samples-data/bigquery/us-states/us-states.csv"
        emails = data.get("emails")
        table = ""
        #

        # create a dataset first if needed
        # dataset_main = self.make_dataset()
        # table_id = "{}.{}".format(dataset_main[0], name) 
        #    

        #create a table if needed
        # table= self.make_table(table_id,"load")
        #
                

        # query and return the required data
        if(self.env.get("query_and_return")):
            try:
                schema = ["longitude","latitude","name","capacity"]
                query_job = client.query(
                    query if query else """
                    SELECT
                        longitude,
                        latitude,
                        name,
                        capacity
                    FROM
                        `bigquery-public-data.new_york_citibike.citibike_stations`
                    LIMIT 50
                    """
                )
                query_job.result()
                        

                return json.dumps({
                    "schema":[{"field":x} for x in schema     ],
                    "data":[
                        dict([
                            [schema[i],x]
                            for i,x in enumerate(row)
                        ])
                        for row in query_job
                    ]
                })                    
                
                
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
        #




        return "Check the backend env dictionary you did set it so the backend didnt do anything"








