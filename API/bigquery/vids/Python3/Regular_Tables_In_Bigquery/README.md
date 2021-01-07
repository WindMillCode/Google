## Tables and the Bigquery API (Python)

### [Youtube Walkthrough](https://youtu.be/GbjLNo98fNw)

* after the lab your file should look like tables.final.py 
* if issues copy and paste from tables.start.py

* __table__ contains individual records organized in rows. Each record is composed of columns (also called fields)
    * __native tables__ - tables in bq
    * __external tables__ - tables from external sources
    * __views__ - tables in memory, created for training a ml model training datasets are views
* __schema__ -defines columns,partitions clustters. ..

* limits - unique per dataset, must reside in same location, 

### An Aside 
* open up tornado_server.py
what allows live reload to take places as you edit tables.py is the module finder you can learn more of in resources, and from the ```__code__``` property on methods

* this code allows us to reload methods from classes let alone fuctions because
in memory, the actual code is stored seperately from the function reference meaning I cant simply make a method call from a new instance or function call, it would call the old code, dont get thrown away by the globals and IOLoop, what enables for this logic to work in the scenario, is that reload() did reload the module but there are extra steps to bring the new code into the current thread which can be found in the start_server function
```py
reload(tables)
my_bigquery_client_method_updated_code_ = tables.my_bigquery_client().execute.__code__
my_client.env = tables.my_bigquery_client().env
loading_error = False
```

* in python your variable are not the actual data, they serve as pointers to the actual data, (C logic the low level of Python). there are more steps than reload that make a python app the app you know. Here it means self is undefined and when you use reload, you must pass self as a argument to the method. this can be seen in the the post method of the MainHandler class
```py
def assign_me():
    pass  
assign_me.__code__ = my_bigquery_client_code  # need this interim step beccause for a deprecation you cant set my_client.execute.__code__,  because you need to pass self again to the method
my_client.execute = assign_me    
client.execute(client,data)
#  the method definition in the class def execute(self,data):

```
* also, if the class implements modules you must attach them to self before they get lost

```py
# file tables.py
# module code retainment
    def __init__(self):
        self.client = client # arguable if needed because mabye client is self . self is not client
        self.bigquery = bigquery
        self.datetime = datetime
        self.pytz = pytz
        self.time = time 
# 
```



### Quotas 
[load jobs](https://cloud.google.com/bigquery/quotas#load_jobs)
[export jobs](https://cloud.google.com/bigquery/quotas#export_jobs)
[querying](https://cloud.google.com/bigquery/quotas#query_jobs)
[copy](https://cloud.google.com/bigquery/quotas#copy_jobs)

### Pricing
* charged for how much data is stored in the tables, and queries you run against the table

### Start the Angular App

* download the frontend [here](https://downgit.github.io/#/home?url=https://github.com/codequickie123/Google/tree/master/API/bigquery/AngularApp)
open a terminal and head to project root and run this command
```ps1
npm install -s
npx ng serve -c=regularTables --open=true
```

### Setup the Python Backend 
* download the backend [here](https://downgit.github.io/#/home?url=https://github.com/codequickie123/Google/tree/master/API/bigquery/vids/Python3/Regular_Tables_In_Bigquery)
in a terminal in the folder root
    * target makes it a local package, do not make it global, it might replace your packages
    * if you make a mistake or believe a corruption happened delete site-packages and try again
```ps1
pip install -r requirements.txt --upgrade --target .\site-packages
python .\tornado_server.py
```

* open tables.py and in your code editor,
* open AngularApp/src/environments/environment.bigquery.dev.ts in your code editor





### Creating and using tables
* names upto 1024, and follow [General Category](https://wikipedia.org/wiki/Unicode_character_property#General_Category)
* anthings valid  table-01, ग्राहक, 00_お客様, étudiant
__permissions__ -  bigquery.tables.create,bigquery.tables.updateData,bigquery.jobs.create
__roles__ -bigquery.admin


* in 'paste env dict here' replace
```py
# file tables.py
    env=  {
        "create": True,
        "getIAM":False,
        "setIAM":False,
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
```

* in 'update tables object here' replace
```ts
// file :environment.bigquery.dev.ts
regularTables:{
    default:true,

    IAM:false,
    setIAM:false,

    browse:false,
    query:false
}
```

* in 'create a table'  paste
```py
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
```


### Table Access Control 

* google uses IAM policy table for granular access control, one person can read a column, another can read a table ...
* access control here can take 7 mins
* disable caching
* if you lost access to the table cant use FOR SYSTEM_TIME AS OF
    to regain access :)
* tables copied dont copy the ACL, manually do this
* __authorized_view__ - share query results with particular users and groups without giving them access to the underlying tables

more [here](https://cloud.google.com/bigquery/docs/table-access-controls-intro)

* __permissions__ -
    * bigquery.tables.setIamPolicy,
    * bigquery.tables.getIamPolicy
* __roles__ - 
    * bigquery.admin,
    * bigquery.dataOwner
* [IAM Policies](https://cloud.google.com/iam/docs/policies) play a impt part in this


#### Set a table IAM policy table
* in 'paste env dict here' replace
```py
# file tables.py
    env=  {
        "create": False,
        "setIAM":True,        
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
```

* in 'update tables object here' replace
```ts
// file :environment.bigquery.dev.ts
regularTables:{
    default:false,

    IAM:true,
    setIAM:true,

    browse:false,
    query:false
}
```

* in 'set tables IAM policy table; paster
```py
# file tables.py
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
```

#### Get a table IAM policy table
* in 'paste env dict here' replace
```py
# file tables.py
    env=  {
        "create": False,
        "setIAM":False,
        "getIAM":True,
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
```

* in 'update tables object here' replace
```ts
// file :environment.bigquery.dev.ts
regularTables:{
    default:false,

    IAM:true,
    setIAM:false,

    browse:false,
    query:false
}
```

* in 'get tables IAM policy table' paste
```py
# file: tables.py
        elif(self.env.get("getIAM")):
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
```


### Updating table properties

* __permissions__ - bigquery.tables.update,bigquery.tables.get
* __roles__ - bigquery.dataEditor,bigquery.dataOwner,bigquery.admin


#### Updating table descrption
* in 'paste env dict here' replace
```py
# file tables.py
    env=  {
        "create": False,
        "setIAM":False,
        "getIAM":False,
        "updateDesc":True,
        "updateExpiration":False,
        "copySingle":False,
        "copyMultiple":False,
        "delete":False,
        "recover":False,
        "querySDK":False,
        "querySQL":False,
        "export":False
    }
```

* in 'update tables object here' replace
```ts
// file :environment.bigquery.dev.ts
regularTables:{
    default:true,

    IAM:false,
    setIAM:false,

    browse:false,
    query:false
}
```

* in "update table description" paste
```py
# file tables.py
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
```

#### Updating table expireation
* in 'paste env dict here' replace
```py
# file tables.py
    env=  {
        "create": False,
        "setIAM":False,
        "getIAM":False,
        "updateDesc":False,
        "updateExpiration":True,
        "copySingle":False,
        "copyMultiple":False,
        "delete":False,
        "recover":False,
        "querySDK":False,
        "querySQL":False,
        "export":False
    }
```

* in 'update tables object here' replace
```ts
// file :environment.bigquery.dev.ts
regularTables:{
    default:true,

    IAM:false,
    setIAM:false,

    browse:false,
    query:false
}
```

* in "update table expiration" paste
```py
# file tables.py
        elif(self.env.get("updateExpiration")):
            try:
                assert table.expires is None

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
                if(e.__class__.__name__ =="NotFound"):
                    return "Table does not exist, set the env to create a create a new table or go into the UI from Tables_Dataset and make a table"       
                print("\n")
                print(e)
                return "an error occured check the output from the backend" 
```



###  Copying a table
    * this is also how you rename a table

* __permissions__ bigquery.tables.get,bigquery.tables.getData,bigquery.tables.create
* __roles__    - bigquery.admin

* subject to quota policy
* unique,
* to do anything fancy, no cros-region multi -table <-->, async pwa, you need GCP storage
* very restricted in cloud console, if not in cloud console, everything works, overwritting some fancy stuff

#### copy a single table
* in 'paste env dict here' replace
```py
# file tables.py
    env=  {
        "create": False,
        "setIAM":False,
        "getIAM":False,
        "updateDesc":False,
        "updateExpiration":False,
        "copySingle":True,
        "copyMultiple":False,
        "delete":False,
        "recover":False,
        "querySDK":False,
        "querySQL":False,
        "export":False
    }
```

* in 'update tables object here' replace
```ts
// file :environment.bigquery.dev.ts
regularTables:{
    default:true,

    IAM:false,
    setIAM:false,

    browse:false,
    query:false
}
```

* in 'copy a single table' paste
```py
# file tables.py
        elif(self.env.get("copySingle")):
            try:
                source_table_id = table_id
                destination_table_id = "{}.{}".format(dataset_main, "Copied_Table") 
                job = client.copy_table(source_table_id, destination_table_id)
                job.result()  # Wait for the job to complete.
                return "A copy of the table created to Copied_Table"               
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
```

#### copy multiple tables
* what happens is we end up with  one table

* if you have issue, you must export the table to storage and import it again

* in 'paste env dict here' replace
```py
# file tables.py
    env=  {
        "create": False,
        "setIAM":False,
        "getIAM":False,
        "updateDesc":False,
        "updateExpiration":False,
        "copySingle":False,
        "copyMultiple":True,
        "delete":False,
        "recover":False,
        "querySDK":False,
        "querySQL":False,
        "export":False
    }
```

* in 'update tables object here' replace
```ts
// file :environment.bigquery.dev.ts
regularTables:{
    default:true,

    IAM:false,
    setIAM:false,

    browse:false,
    query:false
}
```

* in 'copy  multiple tables' paste
```py
# file:tables.py
        elif(self.env.get("copyMultiple")):
            try:
                table_ids = [
                    table_id,
                    "bigquery-public-data.census_utility.fips_codes_states"
                ]
                dest_table_id = "{}.{}".format(dataset_main, "Merged_Table") 
                job = client.copy_table(table_ids, dest_table_id)  
                job.result()  # Wait for the job to complete.
                return "The tables {} have been appended to {}".format(table_ids, dest_table_id)            
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend' 
```


### Deleting tables
* __permissions__  -  bigquery.tables.delete,bigquery.tables.get
* __roles__ - bigquery.dataOwner,bigquery.dataEditor,bigquery.admin

#### to delete a table
* in 'paste env dict here' replace
```py
# file tables.py
    env=  {
        "create": False,
        "setIAM":False,
        "getIAM":False,
        "updateDesc":False,
        "updateExpiration":False,
        "copySingle":False,
        "copyMultiple":False,
        "delete":True,
        "recover":False,
        "querySDK":False,
        "querySQL":False,
        "export":False
    }
```

* in 'update tables object here' replace
```ts
// file :environment.bigquery.dev.ts
regularTables:{
    default:true,

    IAM:false,
    setIAM:false,

    browse:false,
    query:false
}
```

* in 'delete a table' paste
```py
# file tables.py
        elif(self.env.get("delete")):
            try:
                client.delete_table(table_id, not_found_ok=False)  # Make an API request.
                return "Deleted table '{}'.".format(table_id)           
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                if(e.__class__.__name__ == "NotFound"):
                    return "Could not find table with name {} to delete".format(table_id)                
                return 'an error occured check the output from the backend'  
```

#### to recover a deleted table
* in 'paste env dict here' replace
```py
# file tables.py
    env=  {
        "create": False,
        "setIAM":False,
        "getIAM":False,
        "updateDesc":False,
        "updateExpiration":False,
        "copySingle":False,
        "copyMultiple":False,
        "delete":False,
        "recover":True,
        "querySDK":False,
        "querySQL":False,
        "export":False
    }
```

* in 'update tables object here' replace
```ts
// file :environment.bigquery.dev.ts
regularTables:{
    default:true,

    IAM:false,
    setIAM:false,

    browse:false,
    query:false
}
```

```py
# file tables.py
        elif(self.env.get("recover")):
            try:     
                recovered_table_id = "{}.{}".format(dataset_main, "Recovered_Table") 
                snapshot_epoch = int(time.time() * 1000) # current time in milliseconds
                client.delete_table(table_id)
                snapshot_table_id = "{}@{}".format(table_id, snapshot_epoch)
                job = client.copy_table(
                    snapshot_table_id,
                    recovered_table_id,
                    # Must match the source and destination tables location.
                    location="US",
                )        
                job.result()
                return "Copied data from deleted table {} to {}".format(table_id, recovered_table_id)                        
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                if(e.__class__.__name__ == "NotFound"):
                    return "Choose a table that was not deleted"                  
                return 'an error occured check the output from the backend'
```


### Browsing table data

* to browse table data
* __permissions__ - bigquery.tables.getData
* __roles__ - bigquery.dataViewer,bigquery.dataEditor,bigquery.dataOwner,bigquery.admin

#### Query Using the SDK
* in 'paste env dict here' replace
```py
# file tables.py
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
        "querySDK":True,
        "querySQL":False,
        "export":False
    }
```

* in 'update tables object here' replace
```ts
// file :environment.bigquery.dev.ts
regularTables:{
    default:false,

    IAM:false,
    setIAM:false,

    browse:true,
    query:false
}
```

* in query using the SDK
```py
# file tables.py
        elif(self.env.get("querySDK")):
            try:

                table_id = "bigquery-public-data.census_utility.fips_codes_states"
                action = data.get("browse")
                print(action)
                # Download all rows from a table.
                if(action =="All Rows"):
                    rows_iter = client.list_rows(table_id)  
                    print(rows_iter)
                    return "Was able to receive all rows check terminal for output"

                # Iterate over rows to make the API requests to fetch row data.
                elif(action =="Count Rows"):
                    rows_iter = client.list_rows(table_id)  
                    rows = list(rows_iter)
                    return "Downloaded {} rows from table {}".format(len(rows), table_id)

                # Download at most 10 rows.
                elif(action =="10 Rows"):
                    rows_iter = client.list_rows(table_id, max_results=10)
                    rows = list(rows_iter)    
                    schema_column_names = [field.to_api_repr().get("name") for field in rows_iter.schema]
                    result_data = {
                        "rows":[[[schema_column_names[index] ,value] for index,value in enumerate(list(row))] for row in rows] , 
                        "schema":[field.to_api_repr().get("name") for field in rows_iter.schema]
                    }
                    return json.dumps(result_data)

                # Specify selected fields to limit the results to certain columns.
                elif(action =="Selected Fields"):                
                    table = client.get_table(table_id)  # Make an API request.
                    fields = table.schema[:2]  # First two columns.
                    rows_iter = client.list_rows(table_id, selected_fields=fields, max_results=10)
                    rows = list(rows_iter)
                    print("Selected {} columns from table {}.".format(len(rows_iter.schema), table_id))
                    print("Downloaded {} rows from table {}".format(len(rows), table_id))

                # Print row data in tabular format.
                elif(action =="Pretty Print"): 
                    table = client.get_table(table_id) 
                    rows = client.list_rows(table, max_results=10)
                    format_string = "{!s:<16} " * len(rows.schema)
                    field_names = [field.name for field in rows.schema]
                    print(format_string.format(*field_names))  # Prints column headers.
                    for row in rows:
                        print(format_string.format(*row))  # Prints row data. 

                else:
                    return "please choose a browsing action"   

                return "Sucess check the server output in the terminal"            
            
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'

```

#### query using SQL (preferred)
* in 'paste env dict here' replace
```py
# file tables.py
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
        "querySQL":True,
        "export":False
    }
```

* in 'update tables object here' replace
```ts
// file :environment.bigquery.dev.ts
regularTables:{
    default:false,

    IAM:false,
    setIAM:false,

    browse:true,
    query:true
}
```

* in 'query using SQL' paste
```py
# file tables.py
        elif(self.env.get("querySQL")):
            try:
                query_job = client.query(
                    """
                    SELECT
                    CONCAT(
                        'https://stackoverflow.com/questions/',
                        CAST(id as STRING)) as url,
                    view_count,
                    tags
                    FROM `bigquery-public-data.stackoverflow.posts_questions`
                    WHERE tags like '%google-bigquery%'
                    ORDER BY view_count DESC
                    LIMIT 10"""
                )

                results = query_job.result()  # Waits for job to complete.
                rows = list(results)    
                schema_column_names = [field.to_api_repr().get("name") for field in results.schema]
                result_data = {
                    "rows":[[[schema_column_names[index] ,value] for index,value in enumerate(list(row))] for row in rows] , 
                    "schema":[field.to_api_repr().get("name") for field in results.schema]
                }
                return json.dumps(result_data)             
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
```


### Exporting Data
* __permissions__ - bigquery.tables.export,bigquery.jobs.create,storage.objects.create,storage.objects.delete
* __roles__ - bigquery.admin AND storage.objectAdmin,storage.admin
* to export table data
    * bigquery can only do 1GB, use wildcard to export to multiple files
    * on export to cloud storage
    * arrays and structs (repreated and nested) only for Avro and JSON
    * GZIP
    * make sure everything in the same region



* in terminal 
```ps1
python
import uuid
uuid.uuid4()
```
* give the service acct used for this lab storage.objectAdmin role
console.developers.google.com -> IAM & Admin -> IAM -> Pencil Icon -> Add Storage Object Admin role
* [create a storage bucket here](https://console.cloud.google.com/storage)
enable the API

|property|value|data|
|:------|:------:|------:|
|name|export_table_bucket_[uuid_value]||
|location|closest region/zone/multi-region||
|storage class|standard||
|Access cotnrol|unfomrm||


* in 'paste env dict here' replace
```py
# file tables.py
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
```

* in 'update tables object here' replace
```ts
// file :environment.bigquery.dev.ts
regularTables:{
    default:true,

    IAM:false,
    setIAM:false,

    browse:false,
    query:false
}
```

* in ' export the table' paste
```py
# file tables.py
        elif(self.env.get("export")):
            try:
                bucket_name = name
                project = "bigquery-public-data"
                dataset_id = "samples"
                table_id = "shakespeare"

                destination_uri = "gs://{}/{}".format(bucket_name, "shakespeare.csv")
                dataset_ref = bigquery.DatasetReference(project, dataset_id)
                table_ref = dataset_ref.table(table_id)

                extract_job = client.extract_table(
                    table_ref,
                    destination_uri,
                    job_config= bigquery.job.ExtractJobConfig(
                        destination_format="CSV",
                        # default CSV, NEWLINE_DELIMITED_JSON or AVRO
                        # compression = bigquery.Compression.GZIP
                    ),
                    location="US",
                )  # API request
                extract_job.result()  # Waits for job to complete.
                return "Exported {}:{}.{} to {}".format(project, dataset_id, table_id, destination_uri) 


            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                if(e.__class__.__name__ == "NotFound"):
                    return(str(e))  
                elif(e.__class__.__name__ == "Forbidden"):
                    return("You do not have access to this storage bucket, Please make sure the bucket is TYPED CORRECTLY FOR YOUR SECURITY. You dont want this attempt to succeed and send data to a hackers bucket")                           
                return 'an error occured check the output from the backend' 
```



### Accessing historical data using time traveL
* the query
```sql
SELECT *
FROM `mydataset.mytable`
  FOR SYSTEM_TIME AS OF TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 HOUR);
```

### Resources

[tornado web framework](https://www.tornadoweb.org/en/stable/web.html)
[google IAM](https://googleapis.dev/python/google-api-core/1.23.0/iam.html?highlight=iam#module-google.api_core.iam)
[google bigquery](https://googleapis.dev/python/bigquery/latest/index.html)
[module finder](https://github.com/codequickie123/custom_vids/tree/master/watchdog_python_file_watcher)

