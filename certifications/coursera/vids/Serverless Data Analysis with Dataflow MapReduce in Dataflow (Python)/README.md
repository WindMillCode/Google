# Serverless Data Analysis with Dataflow: MapReduce in Dataflow (Python)

## Task 1. Review Preparations

install apache beam
```bash
git clone https://github.com/GoogleCloudPlatform/training-data-analyst
cd training-data-analyst/courses/data_analysis/lab2/python
sudo ./install_packages.sh
```

## Task 2. Identify Map and Reduce operations

in cloud editor 
view is_popular.py

## Task 3. Execute the pipeline

cd ~/training-data-analyst/courses/data_analysis/lab2/python
python3 ./is_popular.py
cd /tmp 
look for any output-* files

## Task 4. Use command line parameters

python3 ./is_popular.py --output_prefix=/tmp/myoutput