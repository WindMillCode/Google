# Partitioned tables in Bigquery

<!-- ## [Youtube Walkthrough]() -->


* after the lab your file should look like template.final.py 
* if issues copy and paste from template.start.py


### Start the Angular App

* download the frontend [here](https://downgit.github.io/#/home?url=https://github.com/WindMillCode/Google/tree/master/API/bigquery/AngularApp)
open a terminal and head to project root and run this command
```ps1
npm install -s
npx ng serve -c=partitionedTable --open=true
```

### Setup the Python Backend 
* download the backend [here](https://github.com/WindMillCode/Google/tree/master/API/bigquery/vids/Python3/Partitioned_Tables)
in a terminal in the folder root
    * target makes it a local package, do not make it global, it might replace your packages
    * if you make a mistake or believe a corruption happened delete site-packages and try again
```ps1
pip install -r requirements.txt --upgrade --target .\site-packages
python .\tornado_server.py
```

* open table_schemas.py and in your code editor,


### Create a Time partitioned table
* use examples below to help make queries
```sql
_PARTITIONTIME >= "2018-01-29 00:00:00" AND _PARTITIONTIME < "2018-01-30 00:00:00"
_PARTITIONDATE BETWEEN '2016-01-01' AND '2016-01-02'
```

to refer to a parition also write the table name like so
```py
table_name$20160501
```

* in 'paste env dictionary here' replace
```py
    env=  {
        "create_time_partitioned":True,
        "integer_partitioned_table":False
    }
```

* in ' create time partitioned table' paste
```py
        if(self.env.get("create_time_partitioned")):
            try:

                table_ref = table_id
                schema = [
                    bigquery.SchemaField("name", "STRING"),
                    bigquery.SchemaField("post_abbr", "STRING"),
                    bigquery.SchemaField("date", "DATE"),
                ]
                table = bigquery.Table(table_ref, schema=schema)
                table.time_partitioning = bigquery.TimePartitioning(
                    type_=bigquery.TimePartitioningType.DAY,
                    field="date",  # name of column to use for partitioning
                    expiration_ms=7776000000,
                )  # 90 days

                table = client.create_table(table)

                return "Created table {}, partitioned on column {}".format(
                        table.table_id, table.time_partitioning.field
                    )
                        
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
        #
```


### Create Integer Partitioned Table

* in 'paste env dictionary here' replace
```py
    env=  {
        "create_time_partitioned":False,
        "integer_partitioned_table":True
    }
```

* in ' create integer partitioned table' paste
```py
        elif(self.env.get("integer_partitioned_table")):
            try:

                schema = [
                    bigquery.SchemaField("full_name", "STRING"),
                    bigquery.SchemaField("city", "STRING"),
                    bigquery.SchemaField("zipcode", "INTEGER"),
                ]

                table = bigquery.Table(table_id, schema=schema)
                table.range_partitioning = bigquery.RangePartitioning(
                    # To use integer range partitioning, select a top-level REQUIRED /
                    # NULLABLE column with INTEGER / INT64 data type.
                    field="zipcode",
                    range_=bigquery.PartitionRange(start=0, end=100000, interval=10),
                )
                table = client.create_table(table)  # Make an API request.
                return "Created table {}, partitioned on column {}".format(
                        table.table_id, table.range_partitioning.field
                    )
                                
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
        #
```

