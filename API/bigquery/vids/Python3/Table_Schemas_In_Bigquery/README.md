## Tables Schemas in Bigquery (Python)

<!-- ### [Youtube Walkthrough]() -->

* after the lab your file should look like table_schemas.final.py 
* if issues copy and paste from table_schemas.start.py


### Start the Angular App

* download the frontend [here](https://downgit.github.io/#/home?url=https://github.com/codequickie123/Google/tree/master/API/bigquery/AngularApp)
open a terminal and head to project root and run this command
```ps1
npm install -s
npx ng serve -c=tableSchemas --open=true
```


### Setup the Python Backend 
* download the backend [here]()
in a terminal in the folder root
    * target makes it a local package, do not make it global, it might replace your packages
    * if you make a mistake or believe a corruption happened delete site-packages and try again
```ps1
pip install -r requirements.txt --upgrade --target .\site-packages
python .\tornado_server.py
```

* open table_schemas.py and in your code editor,



### Create a Table Schema

* in 'paste env dictionary here' replace
```py
    env=  {
        "create": True,
        "repeated":False,
        "autodetect1":False,
        "add_column":False,
    }
```

* in 'create a Table schema' paste
```py
        if(self.env.get("create")):
            try:
                job_config = bigquery.LoadJobConfig(
                    schema=[
                        bigquery.SchemaField("name", "STRING"),
                        bigquery.SchemaField("post_abbr", "STRING"),
                    ],
                    source_format=bigquery.SourceFormat.NEWLINE_DELIMITED_JSON,
                )
                uri = "gs://cloud-samples-data/bigquery/us-states/us-states.json"   

                load_job = client.load_table_from_uri(
                    uri,
                    table_id,
                    location="US",  # Must match the destination dataset location.
                    job_config=job_config,
                )  # Make an API request.

                load_job.result()  # Waits for the job to complete.

                destination_table = client.get_table(table_id)
                return "Loaded {} rows.".format(destination_table.num_rows)             
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'     
        
```

### Repeated Fields

* in 'paste env dictionary here' replace
```py
    env=  {
        "create": False,
        "repeated":True,
        "autodetect1":False,
        "add_column":False,
    }
```

* in 'repeated fields' paste
```py
        elif (self.env.get("repeated")):
            try:
                client.delete_table(table_id, not_found_ok=True)
                schema = [
                    bigquery.SchemaField("id", "STRING", mode="NULLABLE"),
                    bigquery.SchemaField("first_name", "STRING", mode="NULLABLE"),
                    bigquery.SchemaField("last_name", "STRING", mode="NULLABLE"),
                    bigquery.SchemaField("dob", "DATE", mode="NULLABLE"),
                    bigquery.SchemaField(
                        "addresses",
                        "RECORD",
                        mode="REPEATED",
                        fields=[
                            bigquery.SchemaField("status", "STRING", mode="NULLABLE"),
                            bigquery.SchemaField("address", "STRING", mode="NULLABLE"),
                            bigquery.SchemaField("city", "STRING", mode="NULLABLE"),
                            bigquery.SchemaField("state", "STRING", mode="NULLABLE"),
                            bigquery.SchemaField("zip", "STRING", mode="NULLABLE"),
                            bigquery.SchemaField("numberOfYears", "STRING", mode="NULLABLE"),
                        ],
                    ),
                ]     

                table = bigquery.Table(table_id,schema=schema)   
                table = client.create_table(table) 
                return "Created table {}".format(table.full_table_id) 
                
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
```

### Auto-detect 


* in 'paste env dictionary here' replace
```py
    env=  {
        "create": False,
        "repeated":False,
        "autodetect1":True,
        "add_column":False,
    }
```


in 'auto detect json,csv' paste
```py

        elif(self.env.get("autodetect1")):
            try:
                job_config = bigquery.LoadJobConfig(
                    autodetect=True, source_format=bigquery.SourceFormat.NEWLINE_DELIMITED_JSON
                )
                uri = "gs://cloud-samples-data/bigquery/us-states/us-states.json"
                load_job = client.load_table_from_uri(
                    uri, table_id, job_config=job_config
                )  # Make an API request.
                load_job.result()  # Waits for the job to complete.
                destination_table = client.get_table(table_id)
                return "Loaded {} rows.".format(destination_table.num_rows)               
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
        #
```

### Add Column


* in 'paste env dictionary here' replace
```py
    env=  {
        "create": False,
        "repeated":False,
        "autodetect1":False,
        "add_column":True,
    }
```

* in 'add column' paste
```py
        elif(self.env.get("add_column")):
            try:
                original_schema = table.schema
                new_schema = original_schema[:]  # Creates a copy of the schema.
                new_schema.append(bigquery.SchemaField("phone", "STRING"))

                table.schema = new_schema
                table = client.update_table(table, ["schema"])  # Make an API request.

                if len(table.schema) == len(original_schema) + 1 == len(new_schema):
                    return "A new column has been added."
                else:
                    return "The column has not been added." 

            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
        # 
```