import sys
sys.path[0] += "\\site-packages"
import os
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
        "batch":False,
        "stream":True
    }
    #

    # setup
    dataset_names = [
        "Loading_Dataset"
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
        
        # load batch data into bigquery
        if(self.env.get("batch")):
            try:
                job_config = bigquery.LoadJobConfig(
                    source_format=bigquery.SourceFormat.CSV, skip_leading_rows=1, autodetect=True,
                )            
            
                file_path =os.path.join(
                    os.getcwd(),
                    list(filter(lambda x: x == 'demographics.csv',os.listdir()))[0],
                )
                
                with open(file_path, "rb") as source_file:
                    job = client.load_table_from_file(source_file, table_id, job_config=job_config)  

                job.result()  

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

        # stream data into bigquery
        elif (self.env.get("stream")):
            try:
                # u means you have unicode strings
                errors = []
                for x in range(3):
                    rows_to_insert = [
                        {
                            u"First_name" : u"Latisha",u"Last_Name" : u"Eudy",u"Gender": u"LGBTQ",
                            u"Country" : u"Mexico",u"Age" : 52,u"Id":4424
                        },
                        {
                            u"First_name" : u"Manique",u"Last_Name" : u"Chrisa",u"Gender": u"Male",
                            u"Country" : u"Mexico",u"Age" : 52,u"Id":2424
                        }
                    ]

                    errors.extend( 
                        client.insert_rows_json(
                            table_id, 
                            rows_to_insert,
                            # to avoid  having ids sending comment this code  
                            # row_ids=[None for x in rows_to_insert ]
                            row_ids=[ind for ind,x in enumerate(rows_to_insert) ]
                        ) 
                    )
                print(errors)
                table = client.get_table(table_id)
                if errors == []:
                    return "There are now {} rows in the table".format(
                        table.num_rows, table_id
                    ) 
                else:
                    return "Encountered errors while inserting rows: {}".format(errors)             
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







