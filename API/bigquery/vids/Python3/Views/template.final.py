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
        "create_authorized_view":False,
        "list_views":False,
        "update_views":True
    }
    #

    # setup
    dataset_names = [
        "Views_Dataset",
        "Authorized_Views_Dataset"
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
        dataset_main = self.make_dataset()
        table_id = "{}.{}".format(dataset_main[0], name) 
        #    

        #create a table if needed
        table= self.make_table(table_id,"load")
        #
                

        # create a view
        if(self.env.get("create_view")):
            try:
                view_id = "{}.{}".format(dataset_main[1], "My_View") 
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

        # create an anuthorized view
        elif(self.env.get("create_authorized_view")):
            try:

                view_dataset_id = dataset_main[1]
                view_dataset = client.get_dataset(view_dataset_id)

                access_entries = view_dataset.access_entries
                for email in emails:                
                    access_entries.append(
                        bigquery.AccessEntry("READER", "userByEmail", email)
                    )
                view_dataset.access_entries = access_entries

                view_dataset = client.update_dataset(view_dataset, ["access_entries"])
                
                source_dataset_id = dataset_main[0]
                source_dataset = client.get_dataset(source_dataset_id)

                view_reference = {
                    "projectId": client.project,
                    "datasetId": self.dataset_names[0],
                    "tableId": name,
                }
                access_entries = source_dataset.access_entries
                access_entries.append(bigquery.AccessEntry(None, "view", view_reference))
                source_dataset.access_entries = access_entries

                # Make an API request to update the ACLs property of the source dataset.
                source_dataset = client.update_dataset(source_dataset, ["access_entries"])
                emailList = ""
                for email in emails:
                    emailList += email +", "
                return f"""
                Access to view : {emailList}, and the view has access to the source table, 
                which means who has access can use the view
                """        
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
        #   
         
        # list views
        elif(self.env.get("list_views")):
            try:
                dataset_id = dataset_main[0]
                for view in ["view_1","view_2","view_3"]:
                    view_id = "{}.{}".format(dataset_main[0], view) 
                    source_id = table_id
                    view = bigquery.Table(view_id)

                    view.view_query = query or f"SELECT name, post_abbr FROM `{source_id}` WHERE name LIKE 'W%'"

                    # Make an API request to create the view.
                    view = client.create_table(view)                    
                tables = client.list_tables(dataset_id)  # Make an API request.

                print("Tables contained in '{}':".format(dataset_id))
                views = ""
                for table in tables:
                    if(table.table_type =="VIEW"):
                        views += table.table_id +" ,"
                return "List of views in the dataset {}".format(views)          
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
        #      

        # update view query
        elif(self.env.get("update_views")):
            try:
                view_id = "{}.{}".format(dataset_main[1], "My_View") 
                source_id = table_id
                view = bigquery.Table(view_id)


                view.view_query = f"SELECT name FROM `{source_id}` WHERE name LIKE 'M%'"


                view = client.update_table(view, ["view_query"])
                return f"Updated {view.table_type}: {str(view.reference)}"                
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
        #


        return "Check the backend env dictionary you did set it so the backend didnt do anything"


    def make_table(self,id,type=None,source_url=None):
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
                    [source_url],
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
            for dataset_main in self.dataset_names:  
                try:
                    dataset_id = self.make_dataset_id(dataset_main)
                    dataset_init = bigquery.Dataset(dataset_id)
                    dataset = client.create_dataset(dataset_init, timeout=30)
                except:
                    pass
        except BaseException:
            print("dataset exists")
        finally:
            # print(["{}.{}".format(client.project,self.make_dataset_id(dataset_main)) for dataset_main in self.dataset_names ])
            return [self.make_dataset_id(dataset_main) for dataset_main in self.dataset_names ]


    def make_dataset_id(self, name):
        if(name == ""):
            raise IndexError
        return "{}.{}".format(client.project, name)







