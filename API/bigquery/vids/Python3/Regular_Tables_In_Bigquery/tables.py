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

    # paste env dict here
    env=  {
        "create": True,
        "setIAM":False,        
        "getIAM":False,
        "updateDesc":False,
        "updateExpiration":False,
        "copySingle":False,
        "copyMultiple":False,
        "delete":False,
        "recover":False,
        "querySDK":False,
        "querySQL":False,
        "export":False
    }
    #

    # setup
    dataset_names = [
        "Tables_Dataset"
    ]
    #


    def execute(self, data):


        print(self)
        print("data")
        print(data)
        print("bigquery tables server running")
        pp.pprint(self.env)
        #setup 
        client = self.client
        bigquery = self.bigquery
        env =self.env
        name = data.get("tableName")
        emails = data.get("emails")
        table = ""

        # create a dataset first
        dataset_main = self.make_dataset()
        table_id = "{}.{}".format(dataset_main, name) 
        #    
                
        try:
            table = client.get_table(table_id)    
        except:
            pass    
        # 


        # create a table       
        if(self.env.get("create")):
            try:  
                table_id = "{}.{}.{}".format(client.project, dataset_main, name)
                schema = [
                    # uncommeont after copyMultiple
                    # bigquery.SchemaField("full_name", "STRING", mode="REQUIRED"),
                    # bigquery.SchemaField("age", "INTEGER", mode="REQUIRED"),
                    bigquery.SchemaField("state_fips_code", "STRING", mode="NULLABLE"),
                    bigquery.SchemaField("state_postal_abbreviation", "STRING", mode="NULLABLE"),
                    bigquery.SchemaField("state_name", "STRING", mode="NULLABLE"),
                    bigquery.SchemaField("state_gnisid", "STRING", mode="NULLABLE"),                    
                ]

                table = bigquery.Table(table_id, schema=schema)
                table = client.create_table(table)  # Make an API request.
                return"Created table {}.{}.{}".format(table.project, table.dataset_id, table.table_id)
                
            except BaseException as e:
                print("\nlook here\n")
                print(e.__class__.__name__)
                print("\n")
                print(e)   
                print("\n")                             
                if(e.__class__.__name__ == "Conflict"):
                    return "Table already exists in that dataset choose a different name"
                if(e.__class__.__name__ == "BadRequest"):
                    return "You failed to provide a table name"                    
                return "an error occured check the output from the backend"         
 
        #

        # set table's IAM policy table
        elif(self.env.get("setIAM")):
            try: 
                emails = set(["{}:{}".format(x[0],x[1]) for x in emails])
                print(emails)
                policy =client.get_iam_policy(table)
                policy.bindings = [
                    {
                        "role": "roles/owner",
                        # "members": {user, serviceAccount} # this is a python set
                        "members":emails
                    },
                    {
                        "role": "roles/editor",
                        "members": {"allAuthenticatedUsers"}
                    },
                    {
                        "role": "roles/viewer",
                        "members": {"allUsers"},
                        # "condition": {  # doesnt work  all the time 
                        #     "title": "request_time",
                        #     "description": "Requests made before 2021-01-01T00:00:00Z",
                        #     "expression": "request.time < timestamp("2021-01-01T00:00:00Z")"
                        # }                        
                    }
                ]  
                client.set_iam_policy(table,policy) 
                return "IAM policy sucessfully created/updated"   
            except BaseException as e:
                print("\nlook here\n")
                print(e.__class__.__name__)            
                print("\n")
                print(e)
                return "an error occured check the output from the backend"         
        #                           

        # get tables IAM policy table                        
        if(self.env.get("getIAM")):
            try:            
                policy =client.get_iam_policy(table)
                for x in policy.bindings:
                    x["members"] = list( x.get("members"))
                # print(pp)
                print(policy.bindings)
                # print(bindings)
                return json.dumps(policy.bindings)
            except BaseException as e:
                print("\nlook here\n")
                print(e.__class__.__name__)  
                if(e.__class__.__name__ == "NotFound"):
                    return "Table does not exist please create the table by modifying the env and try again"                
                print("\n")
                print(e)
                return "an error occured check the output from the backend"         
        # 

        # update table description
        elif(self.env.get("updateDesc")):  
            try:
                table.description = "Updated description."
                table = client.update_table(table, ["description"])  # API request
                assert table.description == "Updated description."  
                return "table description is now {}".format("Updated description")                                
            except BaseException as e:
                print("\nlook here\n")
                print(e.__class__.__name__)   
                if(e.__class__.__name__ =="NotFound"):
                    return "Table does not exist, set the env to create a create a new table or go into the UI from Tables_Dataset and make a table"       
                print("\n")
                print(e)
                return "an error occured check the output from the backend"  
        #      

        # update table expiration
        elif(self.env.get("updateExpiration")):
            try:
                # assert table.expires is None

                # set table to expire 5 days from now
                expiration = datetime.datetime.now(pytz.utc) + datetime.timedelta(days=5)
                table.expires = expiration
                table = client.update_table(table, ["expires"])  # API request

                # expiration is stored in milliseconds
                margin = datetime.timedelta(microseconds=1000)
                assert expiration - margin <= table.expires <= expiration + margin 
                return "table to expire 5 days from now"               

            except BaseException as e:
                print("my custom error\n")
                print(e.__class__.__name__)   
                print("\n")
                print(e)                
                if(e.__class__.__name__ =="NotFound"):
                    return "Table does not exist, set the env to create a create a new table or go into the UI from Tables_Dataset and make a table"       
                return "an error occured check the output from the backend" 
        #

        # copy a single table
        elif(self.env.get("copySingle")):
            try:
                source_table_id = table_id
                destination_table_id = "{}.{}".format(dataset_main, "Copied_Table") 
                job = client.copy_table(source_table_id, destination_table_id)
                job.result()  # Wait for the job to complete.
                return "A copy of the table created."               
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'        
        
        #

        # copy  multiple tables

        #

        # delete a table

        #

        # recover a table

        # 

        #  query using the SDK
        
        #
        
        # query using SQL

        # 

        # export the table

        #          

    def make_dataset(self):
        try:
            dataset_main = self.dataset_names[0]      
            dataset_id = self.make_dataset_id(dataset_main)
            dataset_init = bigquery.Dataset(dataset_id)
            dataset = client.create_dataset(dataset_init, timeout=30)
        except BaseException:
            "dataset exists"
        finally:
            return dataset_main


    def make_dataset_id(self, name):
        if(name == ""):
            raise IndexError
        return "{}.{}".format(client.project, name)







