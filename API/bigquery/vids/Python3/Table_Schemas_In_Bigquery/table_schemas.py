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
        "create": False,
        "repeated":False,
        "autodetect1":False,
        "add_column":True,
    }
    #

    # setup
    dataset_names = [
        "Table_Schema_Dataset"
    ]
    #


    def execute(self, data):

        #setup 
        client = self.client
        bigquery = self.bigquery
        datetime = self.datetime 
        pytz = self.pytz        
        time = self.time 
        name = data.get("titleName")
        emails = data.get("emails")
        table = ""
        #

        # create a dataset first if needed
        dataset_main = self.make_dataset()
        table_id = "{}.{}".format(dataset_main, name) 
        #    

        #create a table if needed
        table= self.make_table(table_id)
        #
                

        # create a Table schema
        if(self.env.get("create")):
            try:
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
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'             
        #

        # repeated fields
        elif (self.env.get("repeated")):
            try:
                client.delete_table(table_id, not_found_ok=True)
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

                table = bigquery.Table(table_id,schema=schema)   
                table = client.create_table(table) 
                return "Created table {}".format(table.full_table_id) 
                
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'        
        #

        # auto detect json,csv
        elif(self.env.get("autodetect1")):
            try:
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
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
        #        
        
        

        # add column
        elif(self.env.get("add_column")):
            try:
                original_schema = table.schema
                new_schema = original_schema[:]  # Creates a copy of the schema.
                new_schema.append(bigquery.SchemaField("phone", "STRING"))

                table.schema = new_schema
                table = client.update_table(table, ["schema"])  # Make an API request.

                if len(table.schema) == len(original_schema) + 1 == len(new_schema):
                    return "A new column has been added."
                else:
                    return "The column has not been added." 

            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
        #         
        #

        return "Check the backend env dictionary you did set it so the backend didnt do anything"


    def make_table(self,id):
        try:
            table_ref = bigquery.Table(id)
            return client.create_table(table_ref)  # Make an API request.
        except BaseException:
            "table exists"
            return client.get_table(id)
        # return"Created table {}.{}.{}".format(table.project, table.dataset_id, table.table_id)        

    def make_dataset(self):
        try:
            dataset_main = self.dataset_names[0]      
            dataset_id = self.make_dataset_id(dataset_main)
            dataset_init = bigquery.Dataset(dataset_id)
            dataset = client.create_dataset(dataset_init, timeout=30)
        except BaseException:
            print("dataset exists")
        finally:
            return "{}.{}".format(client.project,dataset_main)


    def make_dataset_id(self, name):
        if(name == ""):
            raise IndexError
        return "{}.{}".format(client.project, name)







