# Classifying Images of Clouds in the Cloud with AutoML Vision

## Task 1. Set up AutoML Vision

cloud console

[enable the API](https://console.cloud.google.com/apis/api/automl.googleapis.com/overview?q=search&referrer=search&project=gcp-data-certs)

### Create a Cloud Storage bucket for your training data
in cloud shell
```sql
gcloud config set project gcp-data-certs


gsutil mb -p gcp-data-certs \
    -l us-central1 \
    gs://gcp-data-certs-vcm/
```

## Task 2. Upload training images to Cloud Storage


in cloud shell
```bash
gsutil -m cp -r gs://automl-codelab-clouds/* gs://gcp-data-certs-vcm/
gsutil ls gs://gcp-data-certs-vcm/
```

in  cloud ui 
nav menu > storage > browser  > gcp-data-certs-vcm


## Task 3. Create an AutoML Vision training dataset

* url to each image can help AutoML access each image to do training on
    * this file is data.csv

in cloud shell
```sh
gsutil cp gs://automl-codelab-metadata/data.csv .
head --lines=10 data.csv
sed -i -e "s/placeholder/gcp-data-certs-vcm/g" ./data.csv
head --lines=10 data.csv
gsutil cp ./data.csv gs://gcp-data-certs-vcm/
gsutil ls gs://gcp-data-certs-vcm/
```

nav menu > vision  > image classification > new dataset

|property|value|data|
|:------|:------:|------:|
|Dataset name|clouds||

CREATE DATASET

clouds  > import > Select a CSV file on Cloud Storage > BROWSE > [find data.csv]

CONTINUE 

* this takes a while

## Task 4. Inspect the images

* look around in the images tab
    * impt step, you have eyes you can better tes if your ML got it right or not

## Task 5. Train your model

train > start training

|property|value|data|
|:------|:------:|------:|
|Set your budget |8||
|Deploy model to 1 node after training.|[check]||

START TRAINING


