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
client = bigquery.Client()
# 


class my_bigquery_client():

    # def __init__(self):


    # paste env object here
    env = {
        "create":True
    }
    #     

    def execute(self,name):
        # create a dataset
            # your_dataset will be the name of the dataset
        if(self.env.get("create")):
            dataset_id = "{}.{}".format(client.project,name)
            dataset_init = bigquery.Dataset(dataset_id)
            dataset_init.location = "US" # multi-region
            try:
                if(name == ""):
                    raise IndexError                
                dataset = client.create_dataset(dataset_init, timeout=30)
                return "Created dataset {}.{}".format(client.project, dataset.dataset_id).encode()
            except IndexError:
                return b"Please input a name"
            except BaseException as e:
                print("look here")
                print(e)
                return b"Dataset already exists choose another name"
            
        #

