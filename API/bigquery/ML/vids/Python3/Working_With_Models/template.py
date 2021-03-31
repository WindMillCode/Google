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
        self.uuid = uuid



    # setup
    dataset_names = [
        "bqml_tutorial",
    ]
    #


    def execute(self, data):

        #setup 
        client = self.client
        bigquery = self.bigquery
        datetime = self.datetime 
        pytz = self.pytz        
        time = self.time 
        uuid = self.uuid
        name = data.get("titleName") if data.get("titleName")  else "My_Source_Model"
        dest_name = data.get("destName") if data.get("destName")  else "My_Dest_Model"
        emails = data.get("emails") if data.get("emails") else ["data_analysts@example.com"]
        query = data.get("query")
        source_url = data.get("sourceURL")  if data.get("titleName") else "gs://cloud-samples-data/bigquery/us-states/us-states.csv"
        emails = data.get("emails")
        env = data.get("env")
        storage_buckets =  data.get("storageBuckets")
        models =  data.get("models")
        table = ""
        #

        # create a dataset first if needed
        dataset_main = self.make_dataset()
        # table_id = "{}.{}".format(dataset_main[0], name) 
        #    

        #create a table if needed
        # table= self.make_table(table_id,"load")
        #
                

        # list models
        if( env == "list_models"):
            try:
                models = client.list_models(dataset_main[0])  
                schema = [
                    "project",
                    "dataset_id",
                    "model_id"
                ]
                # for model in models:
                #     print(model.reference.project)
                result = {
                    "schema":[{"field":x} for x in schema],
                    "data":[
                        # Row values can be accessed by field name or index.
                        {
                            schema[0]:row.reference.project,
                            schema[1]:row.reference.dataset_id,
                            schema[2]:row.reference.model_id  
                        }
                        for row in models
                    ]
                }
                if(len(result["data"]) == 0):
                    result["data"] = [
                        {
                            schema[0]:"No",
                            schema[1]:"Models",
                            schema[2]:"Here"
                        }
                        for row in [None]
                    ]

                return json.dumps(result)                 
                
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print(e)
                return 'an error occured check the output from the backend'   
        #

        # get model metadata
        elif(env == "get_model_metadata"):
            try:
                model_id = "{}.{}".format(dataset_main[0], name) 
                model = client.get_model(model_id)
                

                return """\nModel id is {} 
                Model friendly name is {}
                Model created on {}
                Model location {}
                Model description {}""".format(model.model_id,model.friendly_name,model.created,model.location,model.description)
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print(e)
                return 'an error occured check the output from the backend'           
        #

        # update model metadata
        elif(env == "update_model_metadata"):
            try:
                model_id = "{}.{}".format(dataset_main[0], name) 
                model = client.get_model(model_id)  # Make an API request.
                model.description = query
                model = client.update_model(model, ["description"])  # Make an API request.

                full_model_id = "{}.{}.{}".format(model.project, model.dataset_id, model.model_id)
                return  "Updated model '{}' with description '{}'.".format(
                        full_model_id, model.description
                    )
                                
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'             
        #

        # copy a model
        elif(env == "copy_model"):
            try:
                
                job_config = bigquery.job.CopyJobConfig(
                    create_disposition  ="CREATE_IF_NEEDED",
                    write_disposition  ="WRITE_TRUNCATE",
                )
                job = bigquery.job.CopyJob(
                    job_config=job_config,
                    sources = [
                        bigquery.table.TableReference(
                            dataset_ref = client.get_dataset(dataset_main[0]),
                            table_id = name                    
                        )]
                    ,
                    destination = 
                        bigquery.table.TableReference(
                            dataset_ref = client.get_dataset(dataset_main[0]),
                            table_id = dest_name                
                        )
                    ,
                    client= client,
                    job_id = "my_copy_{}".format(uuid.uuid4())
                )
                job.result()  # Wait for the job to complete.
                return "A copy of the model created."             
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'        
        #

        # extract a model
        elif(env == "extract_model"):
            try:
                model_id = "{}.{}".format(dataset_main[0], name) 
                model = client.get_model(model_id)

                print(storage_buckets)
                job = bigquery.job.ExtractJob(
                    client= client,
                    job_id = "my_copy_{}".format(uuid.uuid4()),
                    source = model,
                    destination_uris = storage_buckets,
                    job_config= bigquery.job.ExtractJobConfig(
                        destination_format="ML_TF_SAVED_MODEL" # ML_TF_SAVED_MODEL or ML_XGBOOST_BOOSTER                        
                    )
                )
                job.result()
                return "model {} export has been completed".format(name)
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'            
        #

        # delete a model
        elif(env == "delete_model"):
            try:
                for name in models:
                    model_id = "{}.{}".format(dataset_main[0], name)
                    client.delete_model(model_id)  # Make an API request.
                return "Deleted all models as requested"          
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







