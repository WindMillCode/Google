# Streaming Data Processing: Streaming Data Pipelines

## Task 1: Preparation

nav menu > compute engine > training vm > ssh

```bash
git clone https://github.com/GoogleCloudPlatform/training-data-analyst
source /training/project_env.sh
```


## Task 2: Create a BigQuery Dataset and Cloud Storage Bucket


Navigation menu > BigQuery > create dataset


|property|value|data|
|:------|:------:|------:|
|Dataset ID|demos||

create dataset

Navigation menu  click Storage > Browser.

|property|value|data|
|:------|:------:|------:|
|Name|[project ID]||
|Default storage class|Regional||
|Location|us-central1||


## Task 3: Simulate traffic sensor data into Pub/Sub

in vm [1]
```bash
/training/sensor_magic.sh
```

## Task 4: Launch Dataflow Pipeline

Navigation menu > APIs & Services > Dashboard > Google Dataflow API


in vm [2]

```bash
source /training/project_env.sh
cd ~/training-data-analyst/courses/streaming/process/sandiego
cat run_oncloud.sh

cd ~/training-data-analyst/courses/streaming/process/sandiego/src/main/java/com/google/cloud/training/dataanalyst/sandiego

cat AverageSpeeds.java

cd ~/training-data-analyst/courses/streaming/process/sandiego

./run_oncloud.sh $DEVSHELL_PROJECT_ID $BUCKET AverageSpeeds
```

[github view](https://github.com/GoogleCloudPlatform/training-data-analyst/blob/master/courses/streaming/process/sandiego/src/main/java/com/google/cloud/training/dataanalyst/sandiego/AverageSpeeds.java)


## Task 5: Explore the pipeline

answer these questions 
Find the GetMessages pipeline step in the graph, and then find the corresponding code in the AverageSpeeds.java file. This is the pipeline step that reads from the Pub/Sub topic. It creates a collection of Strings - which corresponds to Pub/Sub messages that have been read.

Do you see a subscription created?

How does the code pull messages from Pub/Sub?

Find the Time Window pipeline step in the graph and in code. In this pipeline step we create a window of a duration specified in the pipeline parameters (sliding window in this case). This window will accumulate the traffic data from the previous step until end of window, and pass it to the next steps for further transforms.

What is the window interval?

How often is a new window created?

Find the BySensor and AvgBySensor pipeline steps in the graph, and then find the corresponding code snippet in the AverageSpeeds.java file. This BySensor does a grouping of all events in the window by sensor id, while AvgBySensor will then compute the mean speed for each grouping.

Find the ToBQRow pipeline step in the graph and in code. This step simply creates a "row" with the average computed from previous step together with the lane information.

Find the BigQueryIO.Write in both the pipeline graph and in the source code. This step writes the row out of the pipeline into a BigQuery table. Because we chose the WriteDisposition.WRITE_APPEND write disposition, new records will be appended to the table.

Return to the BigQuery web UI tab. Refresh your browser.

Find your project name and the demos dataset you created. The small arrow to the left of the dataset name demos should now be active and clicking on it will reveal the average_speeds table.

It will take several minutes before the average_speeds table appears in BigQuery.

## Task 6: Determine throughput rates

nav menu > averagespeeds > dataflow > gET MESSAGES  NODE >  System Lag

__System Lag__ - is an important metric for streaming pipelines. It represents the amount of time data elements are waiting to be processed since they "arrived" in the input of the transformation step.

__Elements Added__ metric under output collections tells you how many data elements exited this step (for the Read PubSub Msg step of the pipeline it also represents the number of Pub/Sub messages read from the topic by the Pub/Sub IO connector).

compare elements added for different nodes

## Task 7: Review BigQuery output

nav menu > bigquery

to observe the output from the Dataflow job.

```sql
SELECT *
FROM `demos.average_speeds`
ORDER BY timestamp DESC
LIMIT 100
```

Find the last update to the table by running the following SQL.
```sql
SELECT
MAX(timestamp)
FROM
`demos.average_speeds`
```

to reference the state of the table at a previous point in time

```sql
SELECT *
FROM `demos.average_speeds`
FOR SYSTEM_TIME AS OF TIMESTAMP_SUB(CURRENT_TIMESTAMP, INTERVAL 10 MINUTE)
ORDER BY timestamp DESC
LIMIT 100
```

## Task 8: Observe and understand autoscaling

nav menu > dataflow > job metrics > auto scaling > more history

## Task 9: Refresh the sensor data simulation script

go to vm 1 this is the actual script



