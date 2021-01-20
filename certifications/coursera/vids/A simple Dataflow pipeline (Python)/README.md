# A simple Dataflow pipeline (Python)

## Launch Google Cloud Shell Code Editor
activate the cloud shell then look for the pen icon

## Task 1. Preparation

cloud shell

```bash
git clone https://github.com/GoogleCloudPlatform/training-data-analyst
```

cloud editor 

File > Refresh > training-data-analyst 

create a cloud storage bucket 

|property|value|data|
|:------|:------:|------:|
|name |\<your unique bucket name (Project ID)>||
|Default storage class|	Multi-Regional||
|Location| \<Your location>||

nav > dataflow


## Task 2. Open Dataflow project

install apache beam 

```bash
cd ~/training-data-analyst/courses/data_analysis/lab2/python
pip3 -V  

```

the  output for the pip3 version should be 8.0 if not open another tab


```bash
./install_packages.sh
```

IF YOU ARE LOGGED OF OUT CLOUD SHELL DUE TO ACTIVTIVY RUN THE PREVIOUS BASH COMMANDS


## Task 3. Pipeline filtering

in cloud editor

view[ /training-data-analyst/courses/data_analysis/lab2/python/grep.py]()


## Task 4. Execute the pipeline locally

in cloud shell

```bash
cd ~/training-data-analyst/courses/data_analysis/lab2/python
python3 grep.py
cd /tmp
cat output[suffix as needed]
```

* Note: if you see an error that says "No handlers could be found for logger "oauth2client.contrib.multistore_file", ignore it

it works, it took the file and kept all the import statemenets
and lines with import keyword

## Task 5. Execute the pipeline on the cloud

```bash
cd ~/training-data-analyst/courses/data_analysis/lab2/javahelp/src/main/java/com/google/cloud/training/dataanalyst/javahelp

gsutil cp *.java gs://$BUCKET/javahelp
```

cloud editor 
file:grepc.py

replace PROJECT AND BUCKET as appropriate

then run 

```bash
python3 grepc.py
```

if console claims dataflow is not enabled 
console.developers.google.com > dashboard > enable apis & services > dataflow

examine the output from your cloud storage bucket 
[bucket name]/javahelp/output








