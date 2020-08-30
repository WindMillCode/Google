# Data cerfitifications

## Social network 

### Messages

Greetings I am currently going to get several GCP certifications. Subscribe to my youtube channel as I do tutorials on the fundamentals and advanced concepts of GCP. Any advice for  education and career prospects will be appreciated .  https://www.youtube.com/channel/UCmqEX_zasOf3AQ9vnPkxtjg/

## Coursera 




### 1 
* need a lot of compute power for big data jobs 
* for stablizing a video, lot of data 
* talking petabytes
* google uses many data centers to get things done

#### Creating a VM on Compute Engine Tutorial

* data from USGS
* plot earthquake activity

##### Steps 
* console.cloud.google.com
* menu -> compute engine -> vm instances    

| name          | value           | data 
| :------------ |:---------------:| :-----:|
|       name        | earthquakevm                 |       |
|     region          |     us-east4( Northern Virginia)            |       |
|      zone         |     us-east4-c            |       |
|      machine type     |     n1-standard 1          |     1 vCPU 3.75 GB memory  |
|        space |   10 gb 
|        OS  |   Debian GNU/Linux 9 (stretch)  
| access scopes |   Allow full access to all Cloud APIs   
|firewall | no HTTP(S)
 
* wait for the vm to be up then you can ssh by scolling to the connect column
    * theres no software
    * u have root access
* install git
* in ssh 
    * apt-get install git
    * git clone
    * git clone https://www.github.com/GoogleCloudPlatform/training-data-analyst
    * cd  training-data-analyst/courses/bdml_fundamentals/demos/earthquakevm
        * ingest.sh, gets new earthquake data and deletes old data 
        * install_missing.sh - gets all needed python packages
    * ./install_missing.sh
    * head earthquakes.csv
    * to visualize the data
        ./transform.py  
* compute and storage are seperate get the generated .png off compute and on the storage


* console.cloud.google.com
* menu -> storage -> browser -> create bucket 

| name          | value           | data 
| :------------ |:---------------:| -----:|
|     name          |  earthquake-1589660299109               |       |
|     location type          |   multi-regional                 |       |


* in ssh 
    * gsutil ls gs://earthquake-1589660299109
        * should be empty
    * gsutil cp earthquakes.* gs://earthquake-1589660299109
* refresh bucket
    * files are not publick
* we dont need the vm anymore
    * menu -> compute engine -> vm instances    
    * select machine 
        * stop 
            * pay for disk but not compute
            * good if u installed a lot of software
        * delete
            * get rid of it
    * hit stop 
* make the data public
* menu -> storage -> browser -> bucket
* select all objects 
* permissions -> add 


| name          | value           | data 
| :------------ |:---------------:| -----:|
|  new memebers               |       allUsers          |       |
|        role          |      storage object viewer           |       |
|               |                 |       |

* objects -> column[public access] -> copy url
    * u have a warning sign because it was made public


#### Elastic Storage with google cloud storage

* need a place to store all data
* compute, and storage is seperate 
* getting data into storage and transforming for purpose

##### details

* four storage classes
    * different on access speed and cost
    standard storage - fastest 
    archive storage- least expensive
* if you want to use folders u must have an organization
* gsutil uses familiar linux cmd 

#### Networking

* google builds 1,000 of fiber optics with repeaters to connect the world
* has bandwith so big 100,000 can commuicate at 10gb/s

#### Security 
* on-prem, you are responsible for security
* gcp - google handles many lower layer security
* there DOS protection, data encryption
* BiqQuery
    * petabyte data encrypted with a data encryption key, encrypted with key encryption key
    * can limit team 

#### History of managing large scale data
* 2002  GFS - to deal with petabyte data


#### Google Cloud Public Datasets program
* access 1TB data/month at no cost
* dont need to worry abt licenses all data in one place
* you got the worlds data in one place



#### Getting Started with Google Cloud Platform and Qwiklabs Tutorial


* allows you to use gcp at no cost 
* using GCP console for bigquery data
* note the lab credentials
    open google console
    use another acct ,copy paste for the lab
    use the correct acct credentials
    dont click end lab till yr done

##### Questions

* how dont I need a table for the dataset       

##### Steps 

* menu -> bigQuery
* load public dataset USA Names into bigquery
    ADD DATA -> explore public datasets -> usa names
    VIEW DATASET 
        BigQuery opens in a new tab you can see the dataset in your resources tree
    
* in query editor 
    ```sql
    SELECT
    name, gender,
    SUM(number) AS total
    FROM
    `bigquery-public-data.usa_names.usa_1910_2013`
    GROUP BY
    name, gender
    ORDER BY
    total DESC
    LIMIT
    10    
    ```
    * you learn whether the query is valid, 
    * and the amnt of data needed to get it to run 

* create a custom table
    download babynames.zip 
    read the pdf 
    note the location of yob2014.txt
    * Resources -> [GCP Project ID]  -> cREATE DATASET

    | name          | value           | data 
    | :------------ |:---------------:| -----:|
    |      Dataset ID         |     babynames            |       |
    |        Data location,       |     United States (US)            |       |
    |     Default table expiration          |      [default]           |       |
    

    * babynames -> create table

    | name          | value           | data  |
    | :------------ |:---------------:| -----:|
    |     Source  Create table from:       |      Upload           |        |
    |     Source     Selecti File      | fakepath/yob2014.txt                |       |
    |     Source     File Format       |     CSV                 |       |
    | tABLE NAME |  names_2014|
    | schema  | name:string,gender:string,count:integer   | edit as text selected|  


    * babynames ->  names_2014  -> preview tab

* query the table 

    * in query editor 
    ```sql
    SELECT
    name, count
    FROM
    `babynames.names_2014`
    WHERE
    gender = 'M'
    ORDER BY count DESC LIMIT 5
    ```


#### Choosing the right approach

* compute engine- running individual code 
* GKE - contaierized code, docker stuff,  when u got a software architecture code
* app engine - long lived web apps
* cloud functions - execute code on event file on cloud storage
* storage -> ingest -> analyze -> ml -> serve 

#### What you can do with Google Cloud Platform

* use case, AutoML , customer can search for details like granite countertops
* uses ML to routing emails to the right mailbox
* kewpie sorted discolored food


#### Explore real customer solution architectures
* cloud.google.com/customers
* filter big data analytics and ml
* select use case that interests you
* questions 
    * barries and challenges customer faced
    * how GCP solved it
    * what was the business impact    

* bloomberg
    * 1 getting data from 100 of news sources, intrepret into something ppl can understand, 40 countries 170 languages
    *  2  GCP already had the tool, integration was easy
    *  3 business impact was fantastic it was an amazing feeling for them


#### Key roles in a data-driven organization


#### Introduction to machine learning
* recommadatin
    *data, model,infrastructure
    * learning from data in an automated way
    * who is the user like 
    * Cloud SQL , few gigs 
    * Cloud Spanner more SQL

![](./images/Capture.JPG)

#### From zero to an Apache Spark job in 10 minutes or less

##### Steps
 
navigation menu -> dataproc -> clusters 

create cluster

| name          | value           | data 
| :------------ |:---------------:| -----:|
|     name          |        cluster-af04         |       |
|      cluster mode         |   standard (1 master N workers)              |       |


create 

dataproc -> jobs

submit a job

| name          | value           | data 
| :------------ |:---------------:| -----:|
|    job ID           |  estimate-pi-digits               |       |
|        job type       |   spark                  |       |
|        main class or jar       |      org.apache.spark.examples.SparkPi      |   |  
|  arguments     | 10 | |
| jar files |  spark/examples/jars/spark-examples.jar   |


###### Issues 
we had to stop short early not allowed to select a cluster


#### Challenge: Utilizing and tuning on-premise clusters

*  a team uses 100% of the cluster for 2 jobs
* or a team a use 10 % for 4  jobs
 * GCP is dynamic with jobs and cluster resources
 * jobs get resources they need
 * store data off cluster 

#### Move storage off-cluster with Google Cloud Storage

#### Introduction to BigQuery

* petabyte-scale fully managed data warehouse
* work best working off its own storage
* managed with SQL  
* BigQuery support  ARRAY TYPES


###### Activity Practice Exploring BigQuery Public Datasets

1 dataset name 
    austin_bikeshare
2. 
    using this SQL 
```sql
SELECT COUNT(*) AS records
FROM bigquery-public-data.austin_bikeshare.bikeshare_stations;
```

there are 96 records

3. data quality concerns
    which bike stations are out of order 

4. 
    some insights I think I can find are exact location on planet earth
    alternstive names to train station

5.  I can join with austin_311 to see how many ppl called asking about bike station locations   

##### Demo: Analyzing lightning strikes with BigQuery GIS
* GCP Marketplace -> Datasets

![](./images/right_model_type.JPG)



* theres a historical right model
    * I want to forecast future sales
        * model - linear regiression
    * I want to classify something
        * logistic regression (2 classes)
        * multi-class more than 2
    * I want to recommend something
        * matrix factorization 

Use simple models
* Simple model to get to a benchmark,
* quicker to train 
__benchmark__ -  a good result from your data


#### Predicting customer lifetime value
* high value customer or not,
* future customer with new data but we have past data
* sometimes columns are not useful to the model
* model_type is the only required options for MODEL
__ML.WEIGHTS__ - how useful a column was from 0 not needed to 1 paramoount 


- __Lab__: Predict Visitor Purchases with a Classification Model with BigQuery ML





