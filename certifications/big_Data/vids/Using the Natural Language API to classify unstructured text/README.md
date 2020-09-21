# Using the Natural Language API to classify unstructured text

cloud shell

nav menu > natural  

## Task 2: Create an API Key

nav > api & services  > credentials > create credentials > API Key

|property|value|data|
|:------|:------:|------:|
|api key|     ||
||||
||||
||||

cloud shell

```bash
export API_KEY=<YOUR_API_KEY>
```

## Task 3: Classify a news article

cloud shell

file request.json
```nano
{
  "document":{
    "type":"PLAIN_TEXT",
    "content":"A Smoky Lobster Salad With a Tapa Twist. This spin on the Spanish pulpo a la gallega skips the octopus, but keeps the sea salt, olive oil, pimentón and boiled potatoes."
  }
}
```

```sh
curl "https://language.googleapis.com/v1/documents:classifyText?key=${API_KEY}"  -s -X POST -H "Content-Type: application/json" --data-binary @request.json


curl "https://language.googleapis.com/v1/documents:classifyText?key=AIzaSyDDg6NA_bd3NZNjc6JtSu20W_WN256Hqb8"  -s -X POST -H "Content-Type: application/json" --data-binary @request.json
```

## Task 4: Classifying a large text dataset

sample text
```bash
gsutil cat gs://cloud-training-demos-text/bbc_dataset/entertainment/001.txt
```

## Task 5: Creating a BigQuery table for our categorized text data

nav menu > big query

Create Dataset


|property|value|data|
|:------|:------:|------:|
|dataset ID| news_classification_dataset||



click  + icon to create a table 

|property|value|data|
|:------|:------:|------:|
|Create From:|empty table||
|Name your table|article_data||
|Add field| article_text with type STRING, category with type STRING, and confidence with type FLOAT.|

CREATE TABLE

## Task 6: Classifying news data and storing the result in BigQuery


to create a service acct with its private key
```bash
gcloud config set project qwiklabs-gcp-04-df6a67a77e11

export PROJECT=<your_project_name>

gcloud iam service-accounts create mys-account --display-name mys-account
gcloud projects add-iam-policy-binding $PROJECT --member=serviceAccount:my-account@$PROJECT.iam.gserviceaccount.com --role=roles/bigquery.admin
gcloud iam service-accounts keys create key.json --iam-account=my-account@$PROJECT.iam.gserviceaccount.com
export GOOGLE_APPLICATION_CREDENTIALS=key.json
```



in your own shell 

https://cloud.google.com/python/references/libraries

pip3 install google-cloud-bigquery
pip3 install google-cloud-storage
pip3 install google-cloud-language

 


classify-text.py
```python
from google.cloud import storage, language, bigquery


# Set up our GCS, NL, and BigQuery clients
storage_client = storage.Client()
nl_client = language.LanguageServiceClient()
# TODO: replace YOUR_PROJECT with your project id below
bq_client = bigquery.Client(project='gcp-data-certification-288008')

dataset_ref = bq_client.dataset('news_classification_dataset')
dataset = bigquery.Dataset(dataset_ref)
table_ref = dataset.table('article_data') # Update this if you used a different table name
table = bq_client.get_table(table_ref)

# Send article text to the NL API's classifyText method
def classify_text(article):
        response = nl_client.classify_text(
                document=language.types.Document(
                        content=article,
                        type=language.enums.Document.Type.PLAIN_TEXT
                )
        )
        return response

rows_for_bq = []
files = storage_client.bucket('cloud-training-demos-text').list_blobs()
print("Got article files from GCS, sending them to the NL API (this will take ~2 minutes)...")

# Send files to the NL API and save the result to send to BigQuery
for file in files:
        if file.name.endswith('txt'):
                article_text = file.download_as_string()
                nl_response = classify_text(article_text)
                if len(nl_response.categories) > 0:
                        rows_for_bq.append((str(article_text), str(nl_response.categories[0].name), str(nl_response.categories[0].confidence)))

print("Writing NL API article data to BigQuery...")
# Write article text + category data to BQ
errors = bq_client.insert_rows(table, rows_for_bq)
assert errors == []
```

check table data ended up in bigquery

nav menu biguqery
in query editor
```sql
SELECT * FROM `news_classification_dataset.article_data`
```

## Task 7: Analyzing categorized news data in BigQuery


First, see which categories were most common in the dataset.

```sql
SELECT
  category,
  COUNT(*) c
FROM
  `news_classification_dataset.article_data`
GROUP BY
  category
ORDER BY
  c DESC
```

* return all articles that got NL score greater than 90 

```sql
SELECT
  article_text,
  category
FROM `news_classification_dataset.article_data`
WHERE cast(confidence as float64) > 0.9
```