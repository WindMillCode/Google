# Streaming Data Processing Streaming Data Pipelines into Bigtable

## Task 1: Preparation

* sensor simulation

nav menu > compute engine > vm instances > training-vm > ssh

in  vm  shell [1] 

```bash
ls /training 
```

![](1.png)

if not wait 2-3 miniutes

```bash
git clone https://github.com/GoogleCloudPlatform/training-data-analyst
source /training/project_env.sh
cd ~/training-data-analyst/courses/streaming/process/sandiego
./install_quickstart.sh
```

## Task 2: Simulate traffic sensor data into Pub/Sub


in  vm  shell [1] 

```bash
/training/sensor_magic.sh
```

gear icon > New Connection to training-vm

in vm shell [2]

```bash
source /training/project_env.sh
```

Task 3: Launch Dataflow Pipeline


```bash
cd ~/training-data-analyst/courses/streaming/process/sandiego
nano run_oncloud.sh
./create_cbt.sh
./run_oncloud.sh $DEVSHELL_PROJECT_ID $BUCKET CurrentConditions --bigtable

```

## Task 4: Explore the pipeline

nav menu > dataflow

## Task 5: Query Bigtable data


in vm [2]

```bash
cd ~/training-data-analyst/courses/streaming/process/sandiego/quickstart
./quickstart.sh
```

wait to be in a hbase shell

repeat till you see some rows
```hbase
scan 'current_conditions', {'LIMIT' => 2}
```

```hbase
scan 'current_conditions', {'LIMIT' => 10, STARTROW => '15#S#1', ENDROW => '15#S#999', COLUMN => 'lane:speed'}

quit
```

## Cleanup

```bash
cd ~/training-data-analyst/courses/streaming/process/sandiego
./delete_cbt.sh
```

stop all jobs in dataflow

in vm [1]
ctrl-c 

bigquery
    delete the dataset

