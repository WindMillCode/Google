# Creating a VM on Compute Engine Tutorial

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

