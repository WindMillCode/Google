# Getting Started With the Python SDK in BigQuery

* after the lab your file should look like start.final.py 

* create a service acct [here](https://console.cloud.google.com/apis/credentials?project=gcp-data-certs)
* click create credentials 

|property|value|data|
|:------|:------:|------:|
|Service Acct Name|Bigquery_Learning||
|Role|Bigquery Admin||
||||
||||


* dont grant anyone access to the service acct j
* go back to the serice acct and create a key
* a json file downloads
* set the GOOGLE_APPLICATION_CREDENTIALS env var to the path of the json


* install the python sdk 
    might have to add .\site-packages to path to see the library
    - gcp doesnt ship as one library, it ships as seperate libraries
```vb
pip install --upgrade google-cloud-bigquery --target .\site-packages
```

* in 'modify sys.path so you can see the modules'  paste this coe
```py
import sys
sys.path[0] += "\\site-packages"
```

* in 'import and intalize the client' paste this code
```py 
from google.cloud import bigquery
client = bigquery.Client()
```


* make a query
```py
query_job = client.query(
    """
    SELECT
      CONCAT(
        'https://stackoverflow.com/questions/',
        CAST(id as STRING)) as url,
      view_count
    FROM `bigquery-public-data.stackoverflow.posts_questions`
    WHERE tags like '%google-bigquery%'
    ORDER BY view_count DESC
    LIMIT 10"""
)
```
* in 'see the query' paste this code
```py
results = query_job.result()  # Waits for job to complete.
for row in results:
    print("{} : {} views".format(row.url, row.view_count))
```
