# Loading Data into Bigquery

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

* open loading.py and in your code editor,


### Batch load
* always try to gzip your data 

* in 'paste env dictionary here' replace
```py
    env=  {
        "batch":True,
        "stream":False
    }
```

in 'load batch data into bigquery' paste
```py
        if(self.env.get("batch")):
            try:
                job_config = bigquery.LoadJobConfig(
                    source_format=bigquery.SourceFormat.CSV, skip_leading_rows=1, autodetect=True,
                )            
            
                file_path =os.path.join(
                    os.getcwd(),
                    list(filter(lambda x: x == 'demographics.csv',os.listdir()))[0],
                )
                
                with open(file_path, "rb") as source_file:
                    job = client.load_table_from_file(source_file, table_id, job_config=job_config)  

                job.result()  

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

### Batch Stream
* supply insertId, so bigquery can dedupe the rows with the same row, not 100% guaranteed
* use sql to get unique rows and place the data in another table
* with streaming data you dont get to work with it quickly
* in 'paste env dictionary here' replace
```py
    env=  {
        "batch":False,
        "stream":True
    }
```

* in 'stream data into bigquery' paste
```py
        elif (self.env.get("stream")):
            try:
                # u means you have unicode strings
                errors = []
                for x in range(3):
                    rows_to_insert = [
                        {
                            u"First_name" : u"Latisha",u"Last_Name" : u"Eudy",u"Gender": u"LGBTQ",
                            u"Country" : u"Mexico",u"Age" : 52
                        },
                        {
                            u"First_name" : u"Manique",u"Last_Name" : u"Chrisa",u"Gender": u"Male",
                            u"Country" : u"Mexico",u"Age" : 52
                        }
                    ]

                    errors.extend( 
                        client.insert_rows_json(
                            table_id, 
                            rows_to_insert,
                            # to avoid  having ids sending comment this code  
                            # row_ids=[None for x in rows_to_insert ]
                            row_ids=[ind for ind,x in enumerate(rows_to_insert) ]
                        ) 
                    )
                print(errors)
                if errors == []:
                    return "There are now {} rows in the table".format(
                        table.num_rows, table_id
                    ) 
                else:
                    return "Encountered errors while inserting rows: {}".format(errors)             
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
        
```


### Resources
* [source formats](https://googleapis.dev/python/bigquery/latest/generated/google.cloud.bigquery.job.SourceFormat.html#google.cloud.bigquery.job.SourceFormat)
* [load sources](https://googleapis.dev/python/bigquery/latest/generated/google.cloud.bigquery.client.Client.html#google.cloud.bigquery.client.Client.load_table_from_dataframe) and scroll down form there