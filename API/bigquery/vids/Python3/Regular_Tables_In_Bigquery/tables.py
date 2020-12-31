import sys
sys.path[0] += "\\site-packages"


from google.cloud import bigquery_datatransfer
from google.cloud import bigquery
import uuid
import datetime
import time
import pprint
import asyncio
pp = pprint.PrettyPrinter(indent=4, compact=True, width=1)


# end


# import and intalize the library
client = bigquery.Client()
#


class my_bigquery_client():

    # def __init__(self):

    # paste env dict here
    env=  {
        "create": False,
        "getIAM":True,
        "setIAM":False
    }
    #

    # setup
    dataset_names = [
        "Tables_Dataset"
    ]
    #

    def execute(self, name):
        print("bigquery tables server started")
        # create a dataset first
        dataset_main = self.make_dataset()
        table_id = "{}.{}".format(dataset_main, name) 
        #    
            
        # create a table       
        if(self.env.get("create")):
            try:  
                table_id = "{}.{}.{}".format(client.project, dataset_main, name)
                schema = [
                    bigquery.SchemaField("full_name", "STRING", mode="REQUIRED"),
                    bigquery.SchemaField("age", "INTEGER", mode="REQUIRED"),
                ]

                table = bigquery.Table(table_id, schema=schema)
                table = client.create_table(table)  # Make an API request.
                return"Created table {}.{}.{}".format(table.project, table.dataset_id, table.table_id)
                
            except BaseException as e:
                print("\nlook here\n")
                print(e.__class__.__name__)
                if(e.__class__.__name__ == "Conflict"):
                    return "Table already exists in that dataset choose a different name"
                print("\n")
                print(e)
                return "an error occured check the output from the backend" 

        if(self.env.get("setIAM")):
            try: 
                table = client.get_table(table_id)
                user = "user:shieldmousetower734@gmail.com"
                # admin_group = "group:admins@groups.example.com" # if you have an admin group copy as needed
                serviceAccount = "serviceAccount:bigquery-learning@gcp-data-certs.iam.gserviceaccount.com"
                policy =client.get_iam_policy(table)
                policy.bindings = [
                    {
                        "role": "roles/owner",
                        "members": {user, serviceAccount} # this is a python set
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
                                      
                            

        if(self.env.get("getIAM")):
            try:            
                table = client.get_table(table_id)
                policy =client.get_iam_policy(table)
                print(policy.bindings)
                return policy.bindings
            except BaseException as e:
                print("\nlook here\n")
                print(e.__class__.__name__)  
                if(e.__class__.__name__ == "NotFound"):
                    return "Table does not exist please create the table by modifying the env and try again"                
                print("\n")
                print(e)
                return "an error occured check the output from the backend"                             
                
                
            




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



