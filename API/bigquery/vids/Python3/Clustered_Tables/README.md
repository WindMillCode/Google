# Clustered Tables in Bigquery

## [Youtube Walkthrough](https://youtu.be/ecJJjxuZXFI)


* after the lab your file should look like template.final.py 
* if issues copy and paste from template.start.py


### Start the Angular App

* download the frontend [here](https://downgit.github.io/#/home?url=https://github.com/WindMillCode/Google/tree/master/API/bigquery/AngularApp)
open a terminal and head to project root and run this command
```ps1
npm install -s
npx ng serve -c=clusteredTable --open=true
```

### Setup the Python Backend 
* download the backend [here](https://github.com/WindMillCode/Google/tree/master/API/bigquery/vids/Python3/Clustered_Tables)
in a terminal in the folder root
    * target makes it a local package, do not make it global, it might replace your packages
    * if you make a mistake or believe a corruption happened delete site-packages and try again
```ps1
pip install -r requirements.txt --upgrade --target .\site-packages
python .\tornado_server.py
```

* open template.py and in your code editor,


### Create a clustered table
* good for filter and aggregate queries

* using sql
```sql
-- Set up a table with clustering.
CREATE TABLE myDataset.data (column1 INT64, column2 INT64)
PARTITION BY _PARTITIONDATE
CLUSTER BY column1, column2;

-- This query returns 1 for column1 and 2 for column2.
SELECT column_name, clustering_ordinal_position
FROM myDataset.INFORMATION_SCHEMA.COLUMNS;
```

* in 'paste env dictionary here' replace
```py
    env=  {
        "create_clustered_table":True,
        "loading_clustered_table":False,
        "create_query_clustered_table":False,
        "query_clustered_table":False,
    }
```

* in 'create clustered table' paste
```py
        if(self.env.get("create_clustered_table")):
            try:
                table_id 

                schema = [
                    bigquery.SchemaField("full_name", "STRING"),
                    bigquery.SchemaField("city", "STRING"),
                    bigquery.SchemaField("zipcode", "INTEGER"),
                ]

                table = bigquery.Table(table_id, schema=schema)
                table.clustering_fields = ["city", "zipcode"]
                table = client.create_table(table)  # Make an API request.
                return "Created clustered table {}.{}.{} clustered by {}".format(
                        table.project, table.dataset_id, table.table_id,str(table.clustering_fields)
                    )

            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
        #
```

### Create Cluster table from a load job
* in 'paste env dictionary here' replace
```py
    env=  {
        "create_clustered_table":False,
        "loading_clustered_table":True,
        "create_query_clustered_table":False,
        "query_clustered_table":False,
    }
```

* in 'load clustered table' paste
```py
        elif(self.env.get("loading_clustered_table")):
            try:
                job_config = bigquery.LoadJobConfig(
                    skip_leading_rows=1,
                    source_format=bigquery.SourceFormat.CSV,
                    schema=[
                        bigquery.SchemaField("timestamp", bigquery.SqlTypeNames.TIMESTAMP),
                        bigquery.SchemaField("origin", bigquery.SqlTypeNames.STRING),
                        bigquery.SchemaField("destination", bigquery.SqlTypeNames.STRING),
                        bigquery.SchemaField("amount", bigquery.SqlTypeNames.NUMERIC),
                    ],
                    time_partitioning=bigquery.TimePartitioning(field="timestamp"),
                    clustering_fields=["origin", "destination"],
                )

                job = client.load_table_from_uri(
                    ["gs://cloud-samples-data/bigquery/sample-transactions/transactions.csv"],
                    table_id,
                    job_config=job_config,
                )

                job.result()  # Waits for the job to complete.

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
```

### Create  clustered table from query
* in 'paste env dictionary here' replace
```py
    env=  {
        "create_clustered_table":False,
        "loading_clustered_table":False,
        "create_query_clustered_table":True,
        "query_clustered_table":False,
    }
```

```py
        elif(self.env.get("create_query_clustered_table")):
            try:
                sql = "SELECT * FROM `bigquery-public-data.samples.shakespeare`"
                cluster_fields = ["corpus"]

                job_config = bigquery.QueryJobConfig(
                    clustering_fields=cluster_fields, destination=table_id
                )

                # Start the query, passing in the extra configuration.
                query_job = client.query(sql, job_config=job_config)  # Make an API request.
                query_job.result()  # Wait for the job to complete.

                table = client.get_table(table_id)  # Make an API request.
                if table.clustering_fields == cluster_fields:
                    return "The destination table is written using the cluster_fields configuration."
                else:
                    return "The destination table was not written using the cluster_fields configuration"           
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'            
        #
```

### querying clustered tables
* in 'paste env dictionary here' replace
```py
    env=  {
        "create_clustered_table":False,
        "loading_clustered_table":False,
        "create_query_clustered_table":False,
        "query_clustered_table":True,
    }
```

* in 'querying clusterred tables' paste
```py
        elif (self.env.get("query_clustered_table")):
            try:
                """ query 1
                    SELECT COUNT(corpus)  as corpus,word
                    FROM `bigquery-public-data.samples.shakespeare`
                    GROUP BY word


                    query 2
                    SELECT COUNT(corpus)  as corpus,word
                    FROM `gcp-data-certs.Clustered_Tables_Dataset.Tamarion` 
                    WHERE corpus > 3 
                    GROUP BY word
 
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

