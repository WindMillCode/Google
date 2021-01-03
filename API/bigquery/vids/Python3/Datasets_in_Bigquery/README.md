## Datasets with Google Bigquery API

* after the lab your file should look like dataset.final.py 
* if issues copy and paste from dataset.start.py
### [Youtube Walkthrough](https://www.youtube.com/watch?v=KMC1pfl4EZ8)
### Start the Angular App

* download the frontend [here](https://downgit.github.io/#/home?url=https://github.com/codequickie123/Google/tree/master/API/bigquery/AngularApp)
open a terminal and head to project root and run this command
```ps1
npm install -s
npx ng serve -c=dataset --open=true
```

### Setup the Python Backend 
* download the backend [here](https://downgit.github.io/#/home?url=https://github.com/codequickie123/Google/tree/master/API/bigquery/vids/Python3/Datasets_in_Bigquery)

in a terminal in the folder root
    * target makes it a local package, do not make it global, it might replace your packages
    * if you make a mistake or believe a corruption happened delete site-packages and try again
```ps1
pip install google-cloud-bigquery google-cloud-bigquery-datatransfer --target .\site-packages
python build_server.py
```
* open dataset.py in your code editor

### Create a dataset 
* __permissions__ - bigquery.datasets.create
* __roles__ - bigquery.dataEditor, bigquery.dataOwner, bigquery.user,bigquery.admin
 * name unique,1024 characters,case-sensitive, no spaces or special chars

* in ' paste env dict here' replace
```py 
env = {
    "create":True,
    "copy":False,
    "access_control":False,
    "list":False,
    "metadata":False,
    "update":False,
    "delete":False
}
```

* in create a dataset paste this code
   
```py
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
                if(e.__class__.__name__ == "BadRequest"):
                    return "name must be unique 1024 characters, no spaces or special chars"
                return "Dataset already exists choose another name"      
```

### Copying Datasets
* this feature is in beta
* need to enable [BigQuery Data Transfer Service](https://cloud.google.com/bigquery/docs/enable-transfer-service)
* make a destination dataset in a supported [region](https://cloud.google.com/bigquery/docs/copying-datasets#supported_regions) rmbr unique names each GCP project
* if you overwrite tables both tables must have same partition schema
* if schedule is not given once, every 24 hours
    * schedule [syntax](https://cloud.google.com/appengine/docs/flexible/python/scheduling-jobs-with-cron-yaml#cron_yaml_The_schedule_format)

* __permissions__ - bigquery.transfers.update,bigquery.tables.list
* __roles__ - bigquery.admin, serviceacct.tokenCreator

* in ' paste env dict here' replace
```py 
env = {
    "create":False,
    "copy":True,
    "access_control":False,
    "list":False,
    "metadata":False,
    "update":False,
    "delete":False
}
```

* in 'copy a dataset' paste this code
```py
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
```

### Controlling access to datasets
* access control only happens on update , cant do it with create
[full property resource](https://googleapis.dev/python/bigquery/latest/generated/google.cloud.bigquery.dataset.AccessEntry.html#google.cloud.bigquery.dataset.AccessEntry)
[more](https://cloud.google.com/bigquery/docs/reference/rest/v2/datasets#Dataset)
__permissions__ -  bigquery.datasets.update,bigquery.datasets.get
__roles__ - bigquery.dataOwner,bigquery.admin
        * Google Account email: Grants an individual Google Account access to the dataset.
        * Google Group: Grants all members of a Google group access to the dataset.
        * Google Apps Domain: Grants all users and groups in a Google domain access to the dataset.
        * Service account: Grants a service account access to the dataset.
        * Anybody: Enter allUsers to grant access to the general public.
        * All Google accounts: Enter allAuthenticatedUsers to grant access to any user signed in to a Google Account.
        Authorized views: Grants an authorized view access to the dataset. 


* in ' paste env dict here' replace
```py 
env = {
    "create":False,
    "copy":False,
    "access_control":True,
    "list":False,
    "metadata":False,
    "update":False,
    "delete":False
}
```

* in 'access control' paste
```py
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
```

### Listing datasets
* if you see deleted datasets, wait 6 hours

* __permissions__ - bigquery.datasets.get
* __roles__ - bigquery.user, bigquery.metadataViewer,bigquery.dataViewer,bigquery.dataOwner,bigquery.dataEditor,bigquery.admin


* in ' paste env dict here' replace
```py 
env = {
    "create":False,
    "copy":False,
    "access_control":False,
    "list":True,
    "metadata":False,
    "update":False,
    "delete":False
}
```

* in 'list all datsets' paste
```py
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
```

### Getting information about datasets

* __permissions__ - bigquery.datasets.get
* __roles__ - bigquery.user, bigquery.metadataViewer,bigquery.dataViewer,bigquery.dataOwner,bigquery.dataEditor,bigquery.admin

* in ' paste env dict here' replace
```py 
env = {
    "create":False,
    "copy":False,
    "access_control":False,
    "list":False,
    "metadata":True,
    "update":False,
    "delete":False
}
```

* in 'metadata' paste
```py
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
```
### Updating dataset properties

* __permissions__ - bigquery.datasets.get
* __roles__ - bigquery.dataOwner,bigquery.admin
[full property resources](https://googleapis.dev/python/bigquery/latest/generated/google.cloud.bigquery.dataset.Dataset.html)
* to update things
    * can set default table expiration time at the dataset level
    * to get granaular change the default table expiration on the table
    * console cant set default partition expiration, however the table value overrides the dataset value

* in ' paste env dict here' replace
```py 
env = {
    "create":False,
    "copy":False,
    "access_control":False,
    "list":False,
    "metadata":False,
    "update":True,
    "delete":False
}
```

* in 'update dataset' paste
```py
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
```



###  Delete a Dataset
* __permissions__ - bigquery.datasets.delete, bigquery.tables.delete 
* __roles__ -   bigquery.dataOwner, bigquery.admin

* in ' paste env dict here' replace
```py 
env = {
    "create":False,
    "copy":False,
    "access_control":False,
    "list":False,
    "metadata":False,
    "update":False,
    "delete":True
}
```

* in 'delete dataset' paste
```py
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
```