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
        "create_clustered_table":False,
        "loading_clustered_table":False,
        "create_query_clustered_table":False,
        "query_clustered_table":False,
    }
    #

    # setup
    dataset_names = [
        "Clustered_Tables_Dataset"
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
        query = data.get("query")
        table = ""
        #

        # create a dataset first if needed
        dataset_main = self.make_dataset()
        table_id = "{}.{}".format(dataset_main, name) 
        #    

        #create a table if needed
        # table= self.make_table(table_id)
        #
                

        # create clustered table
        if(self.env.get("create_clustered_table")):
            try:
                table_id 

                schema = [
                    bigquery.SchemaField("full_name", "STRING"),
                    bigquery.SchemaField("city", "STRING"),
                    bigquery.SchemaField("zipcode", "INTEGER"),
                ]

                table = bigquery.Table(table_id, schema=schema)
                table.clustering_fields = ["city", "zipcode"]
                table = client.create_table(table)  # Make an API request.
                return "Created clustered table {}.{}.{} clustered by {}".format(
                        table.project, table.dataset_id, table.table_id,str(table.clustering_fields)
                    )

            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
        #

        # load clustered table
        elif(self.env.get("loading_clustered_table")):
            try:
                job_config = bigquery.LoadJobConfig(
                    skip_leading_rows=1,
                    source_format=bigquery.SourceFormat.CSV,
                    schema=[
                        bigquery.SchemaField("timestamp", bigquery.SqlTypeNames.TIMESTAMP),
                        bigquery.SchemaField("origin", bigquery.SqlTypeNames.STRING),
                        bigquery.SchemaField("destination", bigquery.SqlTypeNames.STRING),
                        bigquery.SchemaField("amount", bigquery.SqlTypeNames.NUMERIC),
                    ],
                    time_partitioning=bigquery.TimePartitioning(field="timestamp"),
                    clustering_fields=["origin", "destination"],
                )

                job = client.load_table_from_uri(
                    ["gs://cloud-samples-data/bigquery/sample-transactions/transactions.csv"],
                    table_id,
                    job_config=job_config,
                )

                job.result()  # Waits for the job to complete.

                table = client.get_table(table_id)  # Make an API request.
                return "Loaded {} rows and {} columns to {}".format(
                        table.num_rows, len(table.schema), table_id
                    )        
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
        #

        # create  clustered table from query
        elif(self.env.get("create_query_clustered_table")):
            try:
                sql = "SELECT * FROM `bigquery-public-data.samples.shakespeare`"
                cluster_fields = ["corpus"]

                job_config = bigquery.QueryJobConfig(
                    clustering_fields=cluster_fields, destination=table_id
                )

                # Start the query, passing in the extra configuration.
                query_job = client.query(sql, job_config=job_config)  # Make an API request.
                query_job.result()  # Wait for the job to complete.

                table = client.get_table(table_id)  # Make an API request.
                if table.clustering_fields == cluster_fields:
                    return "The destination table is written using the cluster_fields configuration."
                else:
                    return "The destination table was not written using the cluster_fields configuration"           
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'            
        #

        # 
        # querying clustered tables
        elif (self.env.get("query_clustered_table")):
            try:
                """ query 1
                    SELECT COUNT(corpus)  as corpus,word
                    FROM `bigquery-public-data.samples.shakespeare`
                    GROUP BY word


                    query 2
                    SELECT COUNT(corpus)  as corpus,word
                    FROM `gcp-data-certs.Clustered_Tables_Dataset.Tamarion` 
                    WHERE corpus > 3 
                    GROUP BY word
 
                """                
                job_config = bigquery.QueryJobConfig(dry_run=True, use_query_cache=False)

                # Start the query, passing in the extra configuration.
                query_job = client.query(
                    query,
                    job_config=job_config,
                )  # Make an API request.

                # A dry run query completes immediately.
                return "This query will process {} megabytes.".format(query_job.total_bytes_processed/1000000)                
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







