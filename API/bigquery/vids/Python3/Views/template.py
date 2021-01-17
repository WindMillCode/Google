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
        "create_view":False,
        "create_authorized_view":True
    }
    #

    # setup
    dataset_names = [
        "Views_Dataset"
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
        source_url = data.get("sourceURL")
        table = ""
        #

        # create a dataset first if needed
        dataset_main = self.make_dataset()
        table_id = "{}.{}".format(dataset_main, name) 
        #    

        #create a table if needed
        table= self.make_table(table_id,"load")
        #
                

        # create a view
        if(self.env.get("create_view")):
            try:
                view_id = "{}.{}".format(dataset_main, "My_View") 
                source_id = table_id
                view = bigquery.Table(view_id)

                view.view_query = query or f"SELECT name, post_abbr FROM `{source_id}` WHERE name LIKE 'W%'"

                # Make an API request to create the view.
                view = client.create_table(view)
                return f"Created {view.table_type}: {str(view.reference)}"              
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
        #

        # create an anuthorized
        if(self.env.get("create_authorized_view")):
            try:

                # To use a view, the analyst requires ACLs to both the view and the source
                # table. Create an authorized view to allow an analyst to use a view
                # without direct access permissions to the source table.
                view_dataset_id = dataset_main
                # Make an API request to get the view dataset ACLs.
                view_dataset = client.get_dataset(view_dataset_id)

                analyst_group_email = "data_analysts@example.com"
                access_entries = view_dataset.access_entries
                access_entries.append(
                    bigquery.AccessEntry("READER", "groupByEmail", analyst_group_email)
                )
                view_dataset.access_entries = access_entries

                # Make an API request to update the ACLs property of the view dataset.
                view_dataset = client.update_dataset(view_dataset, ["access_entries"])
                

                # Group members of "data_analysts@example.com" now have access to the view,
                # but they require access to the source table to use it. To remove this
                # restriction, authorize the view to access the source dataset.
                source_dataset_id =view_dataset_id
                # Make an API request to set the source dataset ACLs.
                source_dataset = client.get_dataset(source_dataset_id)

                view_reference = {
                    "projectId": client.project,
                    "datasetId": self.dataset_names[0],
                    "tableId": "my_authorized_view",
                }
                access_entries = source_dataset.access_entries
                access_entries.append(bigquery.AccessEntry(None, "view", view_reference))
                source_dataset.access_entries = access_entries

                # Make an API request to update the ACLs property of the source dataset.
                source_dataset = client.update_dataset(source_dataset, ["access_entries"])
                return f"""
                Access to view: {view_dataset.access_entries}")
                Access to source: {source_dataset.access_entries}
                """        
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
        #        



        return "Check the backend env dictionary you did set it so the backend didnt do anything"



    def make_table(self,id,type=None):
        try:
            table_ref = bigquery.Table(id)
            if(type == "load"):
                job_config = bigquery.LoadJobConfig(
                    skip_leading_rows=1,
                    source_format=bigquery.SourceFormat.CSV,
                    schema=[
                        bigquery.SchemaField("name", bigquery.SqlTypeNames.STRING),
                        bigquery.SchemaField("post_abbr", bigquery.SqlTypeNames.STRING),
                    ],
                )

                job = client.load_table_from_uri(
                    [source_url or "gs://cloud-samples-data/bigquery/us-states/us-states.csv"],
                    table_ref,
                    job_config=job_config,
                )

                job.result()  # Waits for the job to complete.

                return  client.get_table(table_ref)  # Make an API request.            
            return client.create_table(table_ref)  # Make an API request.
        except BaseException:
            print("table exists")
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







