# modify sys.path so you can see the modules
import sys
sys.path[0] += "\\site-packages"
# 


# import and intalize the client
from google.cloud import bigquery
client = bigquery.Client()
# 


# make a query
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
# 

# see the query
results = query_job.result()  # Waits for job to complete.
for row in results:
    print("{} : {} views".format(row.url, row.view_count))
# 