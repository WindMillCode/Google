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


    # paste env dict here
    env=  {
        "create": False,
        "getIAM":False,
        "setIAM":False,
        "updateDesc":False,
        "updateExpiration":False,
        "copySingle":False,
        "copyMultiple":False,
        "delete":False,
        "recover":False,
        "queryNONSQL":False,
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
        print("bigquery tables server running")
        #setup 
        name = data.get("tableName")
        emails = data.get("emails")
        table = ""
        try:
            table = client.get_table(table_id)    
        except:
            pass    
        # 

        # create a dataset first
        dataset_main = self.make_dataset()
        table_id = "{}.{}".format(dataset_main, name) 
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

        elif(self.env.get("setIAM")):
            try: 
                emails = set(["{}:{}".format(x[0],x[1]) for x in emails])
                print(emails)
                return "working"
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
                                      
        elif(self.env.get("getIAM")):
            try:            
                policy =client.get_iam_policy(table)
                return str(policy.bindings)
            except BaseException as e:
                print("\nlook here\n")
                print(e.__class__.__name__)  
                if(e.__class__.__name__ == "NotFound"):
                    return "Table does not exist please create the table by modifying the env and try again"                
                print("\n")
                print(e)
                return "an error occured check the output from the backend"     

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

        elif(self.env.get("queryNONSQL")):
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
                return 'an error occured check the output from the backend'            

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



