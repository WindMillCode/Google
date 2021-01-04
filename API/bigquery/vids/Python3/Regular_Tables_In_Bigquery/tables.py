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

    # paste env dict here
    env=  {
        "create": False,
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
        "export":True
    }
    #

    # setup
    dataset_names = [
        "Tables_Dataset"
    ]
    #


    def execute(self, data):

        #setup 
        client = self.client
        bigquery = self.bigquery
        datetime = self.datetime 
        pytz = self.pytz        
        time = self.time 
        name = data.get("tableName")
        emails = data.get("emails")
        table = ""
        #

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
        
        #

        # set table's IAM policy table

        #                        

        # get tables IAM policy table                        
        
        #

        # update table description
        
        #

        # update table expiration
        
        #

        # copy a single table
        
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







