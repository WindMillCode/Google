import sys
import uuid
import datetime
import time
import pprint
import asyncio
pp = pprint.PrettyPrinter(indent=4,compact= True,width =1)

sys.path[0] += "\\site-packages"
# end


# import and intalize the library
from google.cloud import bigquery
from google.cloud import bigquery_datatransfer
client = bigquery.Client()
# 


class my_bigquery_client():

    # def __init__(self):


    # paste env dict here

    #     

    def execute(self,name):
        print("bigquery dataset server started")
        # create a dataset

        #

        # copy a dataset

        #

        # access control

        #

        # list all datasets

        #

        # metadata

        #

        # update dataset 

        #

        # delete dataset

        #    

    def make_dataset_id(self, name):
        if(name == ""):
            raise IndexError
        return "{}.{}".format(client.project,name)
        
    
