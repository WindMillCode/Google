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


    # paste env object here
    env = {
        "create":False,
        "copy":False,
        "access_control":False,
        "list":False,
        "metadata":False,
        "update":False,
        "delete":True
    }
    #     

    def execute(self,name):
        # create a dataset
        if(self.env.get("create")):
            dataset_id = self.make_dataset_id(name)
            dataset_init = bigquery.Dataset(dataset_id)
            dataset_init.location = "US" # multi-region
            try:
                if(name == ""):
                    raise IndexError                
                dataset = client.create_dataset(dataset_init, timeout=30)
                return "Created dataset {}.{}".format(client.project, dataset.dataset_id)
            except IndexError:
                return "Please input a name"
            except BaseException as e:
                print("\nlook here\n")
                print(e)
                return "Dataset already exists choose another name"   
        #

        # copy a dataset
        elif(self.env.get("copy")):
            transfer_client = bigquery_datatransfer.DataTransferServiceClient()


            # create a source dataset
            source_project_id = client.project
            source_dataset_id = "my_source_dataset"              
            dataset_id = self.make_dataset_id(source_dataset_id)
            dataset_init = bigquery.Dataset(dataset_id)        
            try:                
                dataset = client.create_dataset(dataset_init, timeout=30)  
            except BaseException as e:
                print("") #no-op
            # 

            try:
                destination_project_id = client.project
                destination_dataset_id = name
                if(name == ""):
                    raise IndexError                                    
                transfer_config = bigquery_datatransfer.TransferConfig(
                    destination_dataset_id=destination_dataset_id,
                    display_name="Your Dataset Copy Name",
                    data_source_id="cross_region_copy",
                    params={
                        "source_project_id": source_project_id,
                        "source_dataset_id": source_dataset_id,
                    },
                    # schedule="from ",
                )            
                transfer_config = transfer_client.create_transfer_config(
                    parent=transfer_client.common_project_path(destination_project_id),
                    transfer_config=transfer_config,
                )     
                return "Created transfer config: {}".format(transfer_config.name) 
            except BaseException as e:
                print("\nlook here\n")
                print(e)  
                return "Was not able to make a copy mabye check the terminal where the python server is running"
        #

        # access control
        elif(self.env.get("access_control")):
            try:
                dataset_id =  self.make_dataset_id(name)
                dataset = client.get_dataset(dataset_id) 
                entry = bigquery.AccessEntry(
                    role="READER",
                    entity_type="userByEmail",
                    entity_id="sample.bigquery.dev@gmail.com",
                )   

                entries = list(dataset.access_entries)
                entries.append(entry)
                dataset.access_entries = entries
                dataset = client.update_dataset(dataset, ["access_entries"]) 
                full_dataset_id = "{}.{}".format(dataset.project, dataset.dataset_id)
                return "Updated dataset '{}' with modified user permissions.".format(full_dataset_id)
            except BaseException as e:
                print("\nlook here\n")
                print(e)
                return "An error occured"
        #

        # list all datasets
        elif(self.env.get("list")):
            try:
                datasets = list(client.list_datasets())
                project = client.project
                value = "datasets in project {}".format(project)
                if datasets:
                    for dataset in datasets:
                        value += "\n{}".format(dataset.dataset_id)
                    return value
                else:
                    return "{} project does not contain any datasets.".format(project)
            except BaseException as e:
                print("\nlook here\n")
                print(e)
                return "An error occured"                    
        #

        # metadata
        elif(self.env.get("metadata")):
            value ="Metadata:\n"
            try:
                # get the dataset friendly name
                dataset_id = self.make_dataset_id(name)
                dataset = client.get_dataset(dataset_id) 
                full_dataset_id = "{}.{}".format(dataset.project, dataset.dataset_id)
                value += "{}: {}\n".format("Friendly Name",dataset.friendly_name)
                # 

                # more properties
                value += "{}: {}\n".format("Description",dataset.description)
                value += "Labels:\n"
                labels = dataset.labels
                if labels:
                    for label, value in labels.items():
                        value += "\n{}: {}".format(label, value)
                else:
                    value += "\tDataset has no labels defined.\n"
                #

                # View tables
                value += "Tables:"
                tables = list(client.list_tables(dataset))
                if tables:
                    for table in tables:
                        value += "\n{}:".format(table.table_id)
                else:
                    value += "\tDataset does not have tables.\n"
                #

                return value


            except BaseException as e:
                print("\nlook here\n")
                print(e)
                return "An error occured"                
        #

        # update dataset 
        elif(self.env.get("update")):

            value = ""
            try:
                # update dataset description
                dataset_id = self.make_dataset_id(name)
                dataset = client.get_dataset(dataset_id)  # Make an API request.
                print(dataset)
                dataset.description = "Updated description."
                dataset = client.update_dataset(dataset, ["description"])  # Make an API request.

                full_dataset_id = "{}.{}".format(dataset.project, dataset.dataset_id)
                value += "Updated dataset '{}' with description '{}'.\n".format(
                        full_dataset_id, dataset.description
                    )
                #

                # update default table expiration 
                dataset.default_table_expiration_ms = 24 * 60 * 60 * 1000  # In milliseconds means in 24 hours
                dataset = client.update_dataset(
                    dataset, ["default_table_expiration_ms"]
                )
                value += "Updated dataset '{}' with table expiration '{}'.\n".format(
                        full_dataset_id, dataset.default_table_expiration_ms
                    )                                
                #

                # update default partition expiration 
                dataset.default_partition_expiration_ms = 24 * 60 * 60 * 1000  # In milliseconds means in 24 hours
                dataset = client.update_dataset(
                    dataset, ["default_partition_expiration_ms"]
                )    
                value += "Updated dataset '{}' with table partition expiration '{}'.\n".format(
                        full_dataset_id, dataset.default_partition_expiration_ms
                    )                              
                #    
                return value

            except IndexError:
                return "Provide the dataset name"  
            except BaseException as e:
                print("\nlook here\n")
                print(e)
                return "An error occured"    
        # 

        # delete dataset
        elif(self.env.get("delete")):
            try:
                dataset_id = self.make_dataset_id(name)
                client.delete_dataset(
                    dataset_id, delete_contents=True, not_found_ok=False
                )  

                return "Deleted dataset '{}'.".format(dataset_id)   
            except IndexError:
                return "Provide the dataset name"    
            except BaseException as e:
                print("\nlook here\n")
                print(e.__class__.__name__)
                if(e.__class__.__name__ == "NotFound"):
                    return "Could not find dataset with name {} to delete".format(dataset_id)
                return "An error occured"                      

        #      

    def make_dataset_id(self, name):
        if(name == ""):
            raise IndexError
        return "{}.{}".format(client.project,name)
        
    
