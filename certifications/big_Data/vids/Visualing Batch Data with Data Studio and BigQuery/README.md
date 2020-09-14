# Visualing Batch Data with Data Studio and BigQuery 


## Task 1: Creating a data source in Data Studio

[GOOGLE DATA STUDIO](https://datastudio.google.com/) > REPORTS > Start with a Template > Blank Report 

Google Connectors > BigQuery

Authorize, Sign and Allow as needed > 
Public Datasets

|property|value|data|
|:------|:------:|------:|
|Billing Project|[your project here]||
|Public Dataset|austin_bikeshare|
|Table|bikeshare_trips||

now you see bigquery data in your data studio

## Task 2: Creating a bar chart using a calculated field

* delete the report by right-click > context menu > delete

Add a chart > bar  > Column chart

Right side pane > Data > Dimension  >  [click on the given one] > Default group  > start_station_id
Right side pane > Data >  Metric > [record count] > start_station_id
Right side pane > Data >  Metric >  start_station_id, sum flag > count
Right side pane > Style  > Bar Chart > (click) Show data labels



## Task 3: Creating a chart using a custom query

 Start with a Template > Blank Report 

Google Connectors > BigQuery > Custom Query

|property|value|data|
|:------|:------:|------:|
|Billing Project|[your project here]||
|CUSTOM QUERY|look in the sql snippet below|

```sql
SELECT
    COUNT(start_station_id) as amount_start_times,COUNT(end_station_id) as amount_end_times,
FROM `bigquery-public-data.austin_bikeshare.bikeshare_trips`
WHERE start_station_id=3798 


SELECT
    COUNT(start_station_id)
FROM `bigquery-public-data.austin_bikeshare.bikeshare_trips`
WHERE start_station_id =

    
```



## Task 4: Viewing your query history

nav menu > bigquery > query history