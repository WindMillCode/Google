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
        "create_time_partitioned":False,
        "integer_partitioned_table":True
    }
    #

    # setup
    dataset_names = [
        "Partitioned_Tables_Dataset"
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
        # table= self.make_table(table_id)
        #
                

        # craete time parttitoned table
        if(self.env.get("create_time_partitioned")):
            try:

                table_ref = table_id
                schema = [
                    bigquery.SchemaField("name", "STRING"),
                    bigquery.SchemaField("post_abbr", "STRING"),
                    bigquery.SchemaField("date", "DATE"),
                ]
                table = bigquery.Table(table_ref, schema=schema)
                table.time_partitioning = bigquery.TimePartitioning(
                    type_=bigquery.TimePartitioningType.DAY,
                    field="date",  # name of column to use for partitioning
                    expiration_ms=7776000000,
                )  # 90 days

                table = client.create_table(table)

                return "Created table {}, partitioned on column {}".format(
                        table.table_id, table.time_partitioning.field
                    )
                        
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
        #        
        #

        # create integer partitioned table
        elif(self.env.get("integer_partitioned_table")):
            try:

                schema = [
                    bigquery.SchemaField("full_name", "STRING"),
                    bigquery.SchemaField("city", "STRING"),
                    bigquery.SchemaField("zipcode", "INTEGER"),
                ]

                table = bigquery.Table(table_id, schema=schema)
                table.range_partitioning = bigquery.RangePartitioning(
                    # To use integer range partitioning, select a top-level REQUIRED /
                    # NULLABLE column with INTEGER / INT64 data type.
                    field="zipcode",
                    range_=bigquery.PartitionRange(start=0, end=100000, interval=10),
                )
                table = client.create_table(table)  # Make an API request.
                return "Created table {}, partitioned on column {}".format(
                        table.table_id, table.range_partitioning.field
                    )
                                
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'        
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







