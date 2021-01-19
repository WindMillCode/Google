# Querying External Tables In Bigquery

## [Youtube Walkthrough](https://youtu.be/vPpjEw6FFX4)


* after the lab your file should look like external_query.final.py 
* if issues copy and paste from external_query.start.py


### Start the Angular App

* download the frontend [here](https://downgit.github.io/#/home?url=https://github.com/codequickie123/Google/tree/master/API/bigquery/AngularApp)
open a terminal and head to project root and run this command
```ps1
npm install -s
npx ng serve -c=externalQuery --open=true
```

### Setup the Python Backend 
* download the backend [here](https://github.com/WindMillCode/Google/tree/master/API/bigquery/vids/Python3/Querying_External_Tables_in_BigQuery)
in a terminal in the folder root
    * target makes it a local package, do not make it global, it might replace your packages
    * if you make a mistake or believe a corruption happened delete site-packages and try again
```ps1
pip install -r requirements.txt --upgrade --target .\site-packages
python .\tornado_server.py
```

* open external_query.py and in your code editor,




* cancel and restart the tornado  server
### Query from cloud storage

* in 'paste env dictionary here' replace
```py
    env=  {
        "create_external_table":True,
        "create_temp_external_table":False,
        "drive_create_external_table":False,
        "drive_create_temp_external_table":False
    }
```

* in 'create external table' paste this code
```py
        if(self.env.get("create_external_table")):
            try:
                # Configure the external data source
                dataset_id = dataset_main
                table_id = "{}.{}".format(dataset_main, query) 
                schema = [
                    bigquery.SchemaField("name", "STRING"),
                    bigquery.SchemaField("post_abbr", "STRING"),
                ]
                table = bigquery.Table(table_id, schema=schema)
                external_config = bigquery.ExternalConfig("CSV")
                external_config.source_uris = [
                    "gs://cloud-samples-data/bigquery/us-states/us-states.csv"
                ]
                external_config.options.skip_leading_rows = 1  # optionally skip header row
                table.external_data_configuration = external_config

                # Create a permanent table linked to the GCS file
                table = client.create_table(table)  # API request

                # Example query to find states starting with 'W'
                sql = 'SELECT * FROM `{}` WHERE name LIKE "W%"'.format( table_id)

                query_job = client.query(sql)  # API request

                w_states = list(query_job)  # Waits for query to finish
                return "There are {} states with names starting with W. we pulled the data from us-states.csv in cloud storage".format(len(w_states))                
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
        #
```

#### Create Temp table
* we get this extra meta column _FILE_NAME, which is the url to the gs file

__FILE:  AngularApp\src\environments\environment.bigquery.dev.ts__
* in 'update external query object here'
```ts
    externalQuery:{
        createTempTable:true
    }
```

__FILE:  externalQuery.py__
* in ' paste env dictionary here' paste
```py
    env=  {
        "create_external_table":False,
        "create_temp_external_table":True,
        "drive_create_external_table":False,
        "drive_create_temp_external_table":False
    }
```
* in 'create temp external table' paste
```py
        elif(self.env.get("create_temp_external_table")):
            try:
                schema = ["filename","name"]
                # Configure the external data source and query job.
                external_config = bigquery.ExternalConfig("CSV")
                external_config.source_uris = [
                    "gs://cloud-samples-data/bigquery/us-states/us-states.csv"
                ]
                external_config.schema = [
                    bigquery.SchemaField("name", "STRING"),
                    bigquery.SchemaField("post_abbr", "STRING"),
                ]
                external_config.options.skip_leading_rows = 1
                table_id = "usa_states"
                job_config = bigquery.QueryJobConfig(table_definitions={table_id: external_config})

                # Example query to find states starting with 'W'.
                sql = """
                SELECT _FILE_NAME AS {},{} FROM `{}` WHERE name LIKE "W%"
                
                """.format(schema[0],schema[1],table_id)
                query_job = client.query(sql, job_config=job_config)  # Make an API request.
                query_job.result()
                return json.dumps({
                    "schema":[{"field":x} for x in schema],
                    "data":[
                        # Row values can be accessed by field name or index.
                        {
                            schema[0]:row[schema[0]],
                            schema[1]:row[schema[1]] 
                        }
                        for row in query_job
                    ]
                })
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
        #
```

### Query from Google Drive
* the docs are not as straightfoward

#### Drive Access
* google drive api doesnt have roles and perms they use scopes
* in 'import and intalize the library also give youself drive access' replace this code

```py
credentials = service_account.Credentials.from_service_account_file(
    os.environ.get("GOOGLE_APPLICATION_CREDENTIALS")
)

credentials = credentials.with_scopes(
    [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/bigquery",
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive.file"
    ]
)
client = bigquery.Client(credentials=credentials)
```

__FILE:  AngularApp\src\environments\environment.bigquery.dev.ts__
* in 'update external query object here'
```ts
    externalQuery:{
        createTempTable:false
    }
```

__FILE:  externalQuery.py__
* in ' paste env dictionary here' paste
```py
    env=  {
        "create_external_table":False,
        "create_temp_external_table":False,
        "drive_create_external_table":True,
        "drive_create_temp_external_table":False
    }
```
    

* in 'drive create external table' paste
```py
        elif(self.env.get("drive_create_external_table")):
            try:
                dataset_id = dataset_main

                # Configure the external data source.
                dataset = client.get_dataset(dataset_id)
                table_id = query
                schema = [
                    bigquery.SchemaField("name", "STRING"),
                    bigquery.SchemaField("post_abbr", "STRING"),
                ]
                table = bigquery.Table(dataset.table(table_id), schema=schema)
                external_config = bigquery.ExternalConfig("GOOGLE_SHEETS")
                # Use a shareable link or grant viewing access to the email address you
                # used to authenticate with BigQuery (this example Sheet is public).
                sheet_url = (
                    "https://docs.google.com/spreadsheets/d/1i_QCL-7HcSyUZmIbP9E6lO_T5u3HnpLe7dnpHaijg_E/edit?usp=sharing"
                )
                external_config.source_uris = [sheet_url]
                external_config.options.skip_leading_rows = 1  # Optionally skip header row.
                external_config.options.range = (
                    "us-states!A20:B49"  # Optionally set range of the sheet to query from.
                )
                table.external_data_configuration = external_config

                # Create a permanent table linked to the Sheets file.
                table = client.create_table(table)  # Make an API request.

                # Example query to find states starting with "W".
                sql = 'SELECT * FROM `{}.{}` WHERE name LIKE "W%"'.format(dataset_id, table_id)

                query_job = client.query(sql)  # Make an API request.

                # Wait for the query to complete.
                w_states = list(query_job)
                return "There are {} states with names starting with W in the selected range. this data came from google drive".format(
                        len(w_states)
                    )
                             
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
        #
```


#### Create Temp table
__FILE:  AngularApp\src\environments\environment.bigquery.dev.ts__
* in 'update external query object here'
```ts
    externalQuery:{
        createTempTable:true
    }
```

__FILE:  externalQuery.py__
* in ' paste env dictionary here' paste
```py
    env=  {
        "create_external_table":False,
        "create_temp_external_table":False,
        "drive_create_external_table":False,
        "drive_create_temp_external_table":True
    }
```

* in'drive create temp external table' paste
```py
        elif(self.env.get("drive_create_temp_external_table")):
            try:
                schema = ["name","post_abbr"]
                # Configure the external data source and query job.
                external_config = bigquery.ExternalConfig("GOOGLE_SHEETS")
                sheet_url = (
                    "https://docs.google.com/spreadsheets"
                    "/d/1i_QCL-7HcSyUZmIbP9E6lO_T5u3HnpLe7dnpHaijg_E/edit?usp=sharing"
                )
                external_config.source_uris = [sheet_url]
                external_config.schema = [
                    bigquery.SchemaField("name", "STRING"),
                    bigquery.SchemaField("post_abbr", "STRING"),
                ]
                external_config.options.skip_leading_rows = 1  # Optionally skip header row.
                external_config.options.range = (
                    "us-states!A20:B49"  # Optionally set range of the sheet to query from.
                )
                table_id = "usa_states"
                job_config = bigquery.QueryJobConfig(table_definitions={table_id: external_config})

                # Example query to find states starting with 'W'.
                sql = """
                SELECT * FROM `{}` WHERE name LIKE "W%"
                
                """.format(table_id)
                query_job = client.query(sql, job_config=job_config)  # Make an API request.
                query_job.result()
                [print(row) for row in query_job ]
                return json.dumps({
                    "schema":[{"field":x} for x in schema],
                    "data":[
                        # Row values can be accessed by field name or index.
                        {
                            schema[0]:row[schema[0]],
                            schema[1]:row[schema[1]] 
                        }
                        for row in query_job
                    ]
                })                
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
        #
```


### Resources 
[google auth](https://google-auth.readthedocs.io/en/latest/index.html)