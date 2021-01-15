# Querying Native Tables in Bigquery

<!-- ## [Youtube Walkthrough]() -->


* after the lab your file should look like loading.final.py 
* if issues copy and paste from loading.start.py


### Start the Angular App

* download the frontend [here](https://downgit.github.io/#/home?url=https://github.com/codequickie123/Google/tree/master/API/bigquery/AngularApp)
open a terminal and head to project root and run this command
```ps1
npm install -s
npx ng serve -c=loading --open=true
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

* open native_query.py and in your code editor,
* open AngularApp/src/environments/environment.bigquery.dev.ts in your code editor

* for the front end copy the query and paste into the frontend textbox like so
![](./needed_media/copy_paste_sql.gif)


### Interactive Queries
* these execute immedialtely
__FILE:environment.bigquery.dev.ts__
* in 'update native query object here' paste
```ts
nativeQuery:{
    interactive:true,
    parameterized:false
}
```

__FILE:native_query.py__
* in 'paste env dictionary here' replace
```py
    env=  {
        "interactive":True,
        "batch":False,
        "dry_run":False,
        "permanent_table":False,
        "cache_enable/disable":False,
        "parameterized":False,
        "array_parameterized":False,
        "timestamp_parameterized":False,
        "struct_parameterized":False,
        "mutliple_by_wildcard":False,
        "scheduled":False,
        "scheduled_status":False,
        "scheduled_delete":False
    }
```

* in 'an interactive query' paste
```py
        if(self.env.get("interactive")):
            try:
                 
                """
                    query =
                    SELECT name, SUM(number) as total_people
                    FROM `bigquery-public-data.usa_names.usa_1910_2013`
                    WHERE state = 'TX'
                    GROUP BY name, state
                    ORDER BY total_people DESC
                    LIMIT 20
                """
                query_job = client.query(query)  # Make an API request.

                
                return json.dumps({
                    "schema":[{"field":x} for x in ["Name","Count"]],
                    "data":[
                        # Row values can be accessed by field name or index.
                        {
                            "Name":row[0],
                            "Count":row["total_people"] 
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
        
```

### Batch Queries
* wait for resurces to be availble 
* these execute immedialtely
__FILE:environment.bigquery.dev.ts__
* in 'update native query object here' paste
```ts
nativeQuery:{
    interactive:false,
    parameterized:false
}
```

__FILE:native_query.py__
* in 'paste env dictionary here' replace
```py
    env=  {
        "interactive":False,
        "batch":True,
        "dry_run":False,
        "permanent_table":False,
        "cache_enable/disable":False,
        "parameterized":False,
        "array_parameterized":False,
        "timestamp_parameterized":False,
        "struct_parameterized":False,
        "mutliple_by_wildcard":False,
        "scheduled":False,
        "scheduled_status":False,
        "scheduled_delete":False
    }
```

* in 'a batch query' paste
```py
        elif(self.env.get("batch")):
            try:
                job_config = bigquery.QueryJobConfig(
                    # Run at batch priority, which won't count toward concurrent rate limit.
                    priority=bigquery.QueryPriority.BATCH
                )

                """
                    query =
                    SELECT corpus
                    FROM `bigquery-public-data.samples.shakespeare`
                    GROUP BY corpus;
                """

                # Start the query, passing in the extra configuration.
                query_job = client.query(query, job_config=job_config)  # Make an API request.

                query_job = client.get_job(
                    query_job.job_id, location=query_job.location
                )  # Make an API request.

                return "Job {} is currently in state {}".format(query_job.job_id, query_job.state)             
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'       
        # 
```

### Dry run
* helps to avoid making the mistake of running costly queries
* changes the amount of columns to see the difference
* in 'paste env dictionary here' replace
```py
    env=  {
        "interactive":False,
        "batch":False,
        "dry_run":True,
        "permanent_table":False,
        "cache_enable/disable":False,
        "parameterized":False,
        "array_parameterized":False,
        "timestamp_parameterized":False,
        "struct_parameterized":False,
        "mutliple_by_wildcard":False,
        "scheduled":False,
        "scheduled_status":False,
        "scheduled_delete":False
    }
```

* in 'a dry run' paste
```py
        elif (self.env.get("dry_run")):
            try:
                """ query
                    
                    SELECT name, COUNT(*) as name_count 
                    FROM `bigquery-public-data.usa_names.usa_1910_2013` 
                    WHERE state = 'WA' 
                    GROUP BY name
                """                
                job_config = bigquery.QueryJobConfig(dry_run=True, use_query_cache=False)

                # Start the query, passing in the extra configuration.
                query_job = client.query(
                    query,
                    job_config=job_config,
                )  # Make an API request.

                # A dry run query completes immediately.
                return "This query will process {} megabytes.".format(query_job.total_bytes_processed/1000000)                
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
        #
```

### Permanent Tables
* when you make a table, bigquery makes an anomymous dataset starting with _ hidden from  the UI, to store the results, avaible for 24 hrs

* in 'paste env dictionary here' replace
```py
    env=  {
        "interactive":False,
        "batch":False,
        "dry_run":False,
        "permanent_table":True,
        "cache_enable/disable":False,
        "parameterized":False,
        "array_parameterized":False,
        "timestamp_parameterized":False,
        "struct_parameterized":False,
        "mutliple_by_wildcard":False,
        "scheduled":False,
        "scheduled_status":False,
        "scheduled_delete":False
    }
```

* in 'write to a permanent table' paste
```py
        elif(self.env.get("permanent_table")):
            try:
                 
                """ query
                SELECT corpus
                FROM `bigquery-public-data.samples.shakespeare`
                GROUP BY corpus;
                """                
                job_config = bigquery.QueryJobConfig(destination=table_id)
                # Start the query, passing in the extra configuration.
                query_job = client.query(query, job_config=job_config)  # Make an API request.

                # fr queries that return massive results using legacy SQL
                # job_config = bigquery.QueryJobConfig(
                #     allow_large_results=True, destination=table_id, use_legacy_sql=True
                # )
                
                query_job.result()  # Wait for the job to complete.

                return "Query results loaded to the table {}".format(table_id)           
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
        #
```

### Query caching
* its tempting to make use_query_cache=True, but this is not the guaranteed way,
when you uncomment true do 2x, so the reuslts can be cached 
* in 'paste env dictionary here' replace
```py
    env=  {
        "interactive":False,
        "batch":False,
        "dry_run":False,
        "permanent_table":False,
        "cache_enable/disable":True,
        "parameterized":False,
        "array_parameterized":False,
        "timestamp_parameterized":False,
        "struct_parameterized":False,
        "mutliple_by_wildcard":False,
        "scheduled":False,
        "scheduled_status":False,
        "scheduled_delete":False
    }
```

* in 'query caching paste' 
```py
        elif (self.env.get("cache_enable/disable")):
            try:
                """ query

                    SELECT corpus
                    FROM `bigquery-public-data.samples.shakespeare`
                    GROUP BY corpus;
                """                
                job_config = bigquery.QueryJobConfig(
                    use_query_cache=False # to disable
                    # createDisposition="CREATE_NEVER"  # to enable
                )
                query_job = client.query(query, job_config=job_config)  # Make an API request.
                query_job.result()
                return "was this query cached? {}".format(query_job.cache_hit)
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
```

### Parameterized
* this is to prevent SQL injection, where the server delegates the query
* you say use a string, but remember it's better to let bigquery know that you are trying to protect information rather than the server be unaware of a master query that can circumvent format strings
__FILE:environment.bigquery.dev.ts__
* in 'update native query object here' paste
```ts
nativeQuery:{
    interactive:false,
    parameterized:true
}
```

__FILE:native_query.py__
* in 'paste env dictionary here' replace
```py
    env=  {
        "interactive":False,
        "batch":False,
        "dry_run":False,
        "permanent_table":False,
        "cache_enable/disable":False,
        "parameterized":True,
        "array_parameterized":False,
        "timestamp_parameterized":False,
        "struct_parameterized":False,
        "mutliple_by_wildcard":False,
        "scheduled":False,
        "scheduled_status":False,
        "scheduled_delete":False
    }
```

in 'regular parameterized paste'
```py
        elif(self.env.get("parameterized")):
            try:
                """ query = 
                 
                     SELECT word, word_count
                     FROM `bigquery-public-data.samples.shakespeare`
                     WHERE corpus = @corpus
                     AND word_count >= @min_word_count
                     ORDER BY word_count DESC;
                 """
                job_config = bigquery.QueryJobConfig(
                    query_parameters=[
                        bigquery.ScalarQueryParameter("corpus", "STRING", "romeoandjuliet"),
                        bigquery.ScalarQueryParameter("min_word_count", "INT64", 250),
                    ]
                )
                query_job = client.query(query, job_config=job_config)  # Make an API request.

                return json.dumps({
                    "schema":[{"field":x} for x in ["word","word_count"]],
                    "data":[
                        # Row values can be accessed by field name or index.
                        {
                            "word":row["word"],
                            "word_count":row["word_count"] 
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
* for the examples change the env as provided and paste code as provided
#### Array 
```py
        elif(self.env.get("array_parameterized")):
            try:
                schema = ["name","count"]
                """query = 
                    
                    SELECT name, sum(number) as count
                    FROM `bigquery-public-data.usa_names.usa_1910_2013`
                    WHERE gender = @gender
                    AND state IN UNNEST(@states)
                    GROUP BY name
                    ORDER BY count DESC
                    LIMIT 10;
                 """
                job_config = bigquery.QueryJobConfig(
                    query_parameters=[
                        bigquery.ScalarQueryParameter("gender", "STRING", "M"),
                        bigquery.ArrayQueryParameter("states", "STRING", ["WA", "WI", "WV", "WY"]),
                    ]
                )
                query_job = client.query(query, job_config=job_config)  # Make an API request.

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

#### Timestamp
```py
        elif(self.env.get("timestamp_parameterized")):
            try:
                schema = ["date","f0_"]
                """query = 
                    
                    SELECT TIMESTAMP_ADD(@ts_value, INTERVAL 1 HOUR);
                 """
                job_config = bigquery.QueryJobConfig(
                    query_parameters=[
                        bigquery.ScalarQueryParameter(
                            "ts_value",
                            "TIMESTAMP",
                            datetime.datetime(2016, 12, 7, 8, 0, tzinfo=pytz.UTC),
                        )
                    ]
                )
                query_job = client.query(query, job_config=job_config)  # Make an API request.    
                return json.dumps(
                    {
                        "schema":[{"field":x} for x in schema],
                        "data":[
                            # Row values can be accessed by field name or index.
                            {
                                "date":row[0].strftime("%m/%d/%Y, %H:%M:%S"),
                                schema[1]:row[schema[1]] 
                            }
                            for row in query_job
                        ]
                    },
                    default=str
                )
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'            
        #
```

#### Struct
```py
        elif(self.env.get("struct_parameterized")):
            
            try:
                schema = ["s"]
                """ query = 
                SELECT @struct_value AS s;
                """
                job_config = bigquery.QueryJobConfig(
                    query_parameters=[
                        bigquery.StructQueryParameter(
                            "struct_value",
                            bigquery.ScalarQueryParameter("x", "INT64", 1),
                            bigquery.ScalarQueryParameter("y", "STRING", "foo"),
                        )
                    ]
                )
                query_job = client.query(query, job_config=job_config)  # Make an API request.
                return json.dumps({
                    "schema":[{"field":x} for x in schema],
                    "data":[
                        # Row values can be accessed by field name or index.
                        {
                            schema[0]:str(row[schema[0]]),
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

### Wildcard
* make sure your table prefix in this case "bigquery-public-data.noaa_gsod.gsod194", longer prefix perform better so use 
gsod194* instead of gsod****
__FILE:environment.bigquery.dev.ts__
* in 'update native query object here' paste
```ts
nativeQuery:{
    interactive:false,
    parameterized:false
}
```

__FILE:native_query.py__
* in 'paste env dictionary here' replace
```py
    env=  {
        "interactive":False,
        "batch":False,
        "dry_run":False,
        "permanent_table":False,
        "cache_enable/disable":False,
        "parameterized":False,
        "array_parameterized":False,
        "timestamp_parameterized":False,
        "struct_parameterized":False,
        "mutliple_by_wildcard":True,
        "scheduled":False,
        "scheduled_status":False,
        "scheduled_delete":False
    }
```

* in 'wildcard' paste
```py
        elif (self.env.get("mutliple_by_wildcard")):
            try:
                job_config = bigquery.QueryJobConfig(dry_run=True, use_query_cache=False)
                # replace the asterick with a number or change the table suffixes to see the amount of data used
                """ query
                
                SELECT
                max,
                ROUND((max-32)*5/9,1) celsius,
                mo,
                da,
                year
                FROM
                `bigquery-public-data.noaa_gsod.gsod194*` 
                WHERE
                max != 9999.9 # code for missing data
                AND ( _TABLE_SUFFIX = '0'
                    OR _TABLE_SUFFIX = '4' )
                ORDER BY
                max DESC 
                """
                # Start the query, passing in the extra configuration.
                query_job = client.query(
                    query,
                    job_config=job_config,
                )  # Make an API request.


                return "This query will process {} megabytes.".format(query_job.total_bytes_processed/1000000)                
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
        # 
```

### Scheduled Query
* when using bigquery datatranfer,we see the dataset and table names are standalone
* in 'paste env dictionary here' replace
```py
    env=  {
        "interactive":False,
        "batch":False,
        "dry_run":False,
        "permanent_table":False,
        "cache_enable/disable":False,
        "parameterized":False,
        "array_parameterized":False,
        "timestamp_parameterized":False,
        "struct_parameterized":False,
        "mutliple_by_wildcard":False,
        "scheduled":True,
        "scheduled_status":False,
        "scheduled_delete":False
    }
```

* in 'scheduled query' paste
```py
        elif(self.env.get("scheduled")):
            try:
                # Use standard SQL syntax for the query.
                """ query = 
                
                SELECT
                CURRENT_TIMESTAMP() as current_time,
                @run_time as intended_run_time,
                @run_date as intended_run_date,
                17 as some_integer
                """

                transfer_client = bigquery_datatransfer.DataTransferServiceClient()
                
                project_id = client.project
                dataset_id = self.dataset_names[0]
                # This service account will be used to execute the scheduled queries. Omit
                # this request parameter to run the query as the user with the credentials
                # associated with this client. remember roles and permissions
                # service_account_name = "abcdef-test-sa@abcdef-test.iam.gserviceaccount.com"


                parent = transfer_client.common_project_path(project_id)

                transfer_config = bigquery_datatransfer.TransferConfig(
                    destination_dataset_id=dataset_id,
                    display_name="Your Scheduled Query Name",
                    data_source_id="scheduled_query",
                    params={
                        "query": query,
                        "destination_table_name_template": "your_table_{run_date}",
                        "write_disposition": "WRITE_APPEND",
                        "partitioning_field": "",
                    },
                    schedule="every 24 hours",
                )

                transfer_config = transfer_client.create_transfer_config(
                    bigquery_datatransfer.CreateTransferConfigRequest(
                        parent=parent,
                        transfer_config=transfer_config,
                        # service_account_name=service_account_name,
                    )
                )

                return "Created scheduled query '{}'".format(transfer_config.name)       
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
        # 
```

### Check Schedule Status
* to see in the UI click on 'Scheduled Queries' in the dashboard
* in 'paste env dictionary here' replace
```py
    env=  {
        "interactive":False,
        "batch":False,
        "dry_run":False,
        "permanent_table":False,
        "cache_enable/disable":False,
        "parameterized":False,
        "array_parameterized":False,
        "timestamp_parameterized":False,
        "struct_parameterized":False,
        "mutliple_by_wildcard":False,
        "scheduled":False,
        "scheduled_status":True,
        "scheduled_delete":False
    }
```

* in 'check schedule status' paste
```py
        elif(self.env.get("scheduled_status")):
            try:
                transfer_client = bigquery_datatransfer.DataTransferServiceClient()
                project_id = client.project
                parent = transfer_client.common_project_path(project_id)

                configs = transfer_client.list_transfer_configs(parent=parent)
                result = "Got the following configs:"
                for config in configs:
                    result += f"\n\tID: {config.name}, Schedule: {config.schedule}"      
                return result   
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'            
        #
```

### Manual runs
* good when you have issues and you would like to immediately execute a query
* in beta code might soon change
* copy the scheduled query id and use in the textbox

* in 'paste env dictionary here' replace
```py
env=  {
    "interactive":False,
    "batch":False,
    "dry_run":False,
    "permanent_table":False,
    "cache_enable/disable":False,
    "parameterized":False,
    "array_parameterized":False,
    "timestamp_parameterized":False,
    "struct_parameterized":False,
    "mutliple_by_wildcard":False,
    "scheduled":False,
    "scheduled_status":False,
    "scheduled_delete":False,
    "manual_run":True
}
```

* in 'manual runs'
```py
        elif (self.env.get("manual_run")):
            try:
                transfer_client = bigquery_datatransfer.DataTransferServiceClient()
                transfer_config_name = query
                now = datetime.datetime.now(datetime.timezone.utc)
                start_time = now - datetime.timedelta(days=5)
                end_time = now - datetime.timedelta(days=2)

                # Some data sources, such as scheduled_query only support daily run.
                # Truncate start_time and end_time to midnight time (00:00AM UTC).
                start_time = datetime.datetime(
                    start_time.year, start_time.month, start_time.day, tzinfo=datetime.timezone.utc
                )
                end_time = datetime.datetime(
                    end_time.year, end_time.month, end_time.day, tzinfo=datetime.timezone.utc
                )

                response = transfer_client.schedule_transfer_runs(
                    parent=transfer_config_name,
                    start_time=start_time,
                    end_time=end_time,
                )

                result = "Started transfer runs:"
                for run in response.runs:
                    result += f"\n\tbackfill: {run.run_time} run: {run.name}"    
                return result        
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
        # 
```

### Delete runs
* copy the scheduled query id and use in the textbox
* in 'paste env dictionary here' replace
```py
env=  {
    "interactive":False,
    "batch":False,
    "dry_run":False,
    "permanent_table":False,
    "cache_enable/disable":False,
    "parameterized":False,
    "array_parameterized":False,
    "timestamp_parameterized":False,
    "struct_parameterized":False,
    "mutliple_by_wildcard":False,
    "scheduled":False,
    "scheduled_status":False,
    "scheduled_delete":True,
    "manual_run":False
}
```

* in 'delete scheduled query' paste
```py
elif(self.env.get("scheduled_delete")):
    try:
        import google.api_core.exceptions
        transfer_client = bigquery_datatransfer.DataTransferServiceClient()
        transfer_config_name = query
        transfer_client.delete_transfer_config(name=transfer_config_name)
        return f"Deleted transfer config: {transfer_config_name}"
    except google.api_core.exceptions.NotFound:
        return "Transfer config not found"                            
    except BaseException as e:
        print('my custom error\n')
        print(e.__class__.__name__)
        print('\n')
        print(e)
        return 'an error occured check the output from the backend'            
#
```