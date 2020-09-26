# Data Engineering, Big Data, and Machine Learning on GCP

## Social network 

### Messages

Greetings I am currently going to get several GCP certifications. Like share Subscribe to my youtube channel as I do tutorials on the fundamentals and advanced concepts of GCP. Any advice for  education and career prospects will be appreciated .  https://www.youtube.com/channel/UCmqEX_zasOf3AQ9vnPkxtjg/



## Google Cloud Platform Big Data and Machine Learning Fundamentals


### Introduction to Google Cloud Platform

* project has over 1 billon users, growing userbase 
* 4 aspects ,  

![](images/fundamentals.PNG)

### Compute Power for Analytic and ML Workloads

* need lots of compute power
* google photos to stablize requires 1 billion data into the model
* __TPU__ - better CPU made for ML 

### Elastic Storage with Google Cloud Storage

* differ on speed and cost 
__project__ base level for using services
__zones__ physically organize resources and services
__folders__ - a bunch of projects, must have an organization
__organization__ - a bunch of folders

### Build on Google's Global Network

* 10 GBPS 



### Security: On-premise vs Cloud-native

### Lab Exploring a BigQuery Public Dataset

### Choosing the right approach

__Kubernetes__ - orchestrate code running in containers
__Cloud Functions__ - runs in reaction to event, new file hitting cloud storage

### What you can do with Google Cloud Platform
* use ML to recongize if a room is funrished 

### Key roles in a data-driven organization

### How businesses use recommendation systems

__Dataproc__ - managed env to run Apache Spark
* youtube is a recommendation system

### Introduction to machine learning

* core pieces of recommendation
    * data 
    * model
    * infrasturucture to use

* ml, let the model decide

### Challenge: ML for recommending housing rentals

* get ratings from all users
* training machine model to predict users rating for every house
* parameters
    * the users are most likely to take 
    * the users might not have anything in common to the user in questions, say target is art and sample like sports
    * is a house highly rated objectively
* how often and where will u will hold the data
* apache hadoop, 1000 of items 1000000 of users data done in a fault tolerant way

### Approach: Move from on-premise to Google Cloud Platform
* storage - global fs
* bigtable- sensor data
* bigquery - for ananlytics


![](images/types_of_storage.PNG)


### Demo: From zero to an Apache Spark job in 10 minutes or less

### Challenge: Utilizing and tuning on-premise clusters

* cloud dataproc autoscaling, for the varying needs of the job
* __PVM, Preemptible VM__   short lived vm for batch jobs and fault tolerant work. 80% cheaper than regular vm

### Move storage off-cluster with Google Cloud Storage
* shut down cluster resurces you dont need

### Lab: Recommend products using Cloud SQL and SparkML