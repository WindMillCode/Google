# Running Apache Spark jobs on Cloud Dataproc

## Part 1: Lift and Shift

### Configure and start a Cloud Dataproc cluster

Navigation menu > IAM & Admin > IAM 

comfirm the default Service Account exisits

if not 

ADD 

|property|value|data|
|:------|:------:|------:|
|New members|xxxxxxxx-compute@developer.gserviceaccount.com||
||||
||||
||||


where xxxxxxxxxx is the project number found in 
cloud console > nav mwnu >home > dashboard > project info 
give it the Dataproc Admin role


nav menu > dataproc > CREATE CLUSTER

|property|value|data|
|:------|:------:|------:|
|name|sparktodp||
|Component gateway|[check]||
|Image > change|1.4 (Debian 10, Hadoop 2.9, Spark 2.4)
First released on 3/22/2019.||
|Optional components > Select component|Anaconda & Jupyter Notebook||
