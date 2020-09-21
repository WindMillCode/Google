# Running AI models on Kubeflow

## What You'll Build

ml model 

gcloud config set project qwiklabs-gcp-02-4213d9ea90dd

## Enable Boost mode

cloud shell 
menu icon > boost cloud shell

## Download the project files to Cloud Shell

```bash
git clone https://github.com/GoogleCloudPlatform/training-data-analyst
cd training-data-analyst/courses/data-engineering/kubeflow-examples
```

### Setting Environment Variables


* set the project var
    * if u get errorr just grab the project id from  here

![](project_id.PNG)

```bash
export PROJECT_ID=$(gcloud config list project --format "value(core.project)")
gcloud config set project $PROJECT_ID
```



* set the zone 

```bash
export ZONE=us-central1-a
gcloud config set compute/zone $ZONE
```

* set the working dir of the project

```bash
cd ./mnist
export WORKING_DIR=$PWD
```

### Installing Kustomize

* too install
```bash
mkdir $WORKING_DIR/bin
wget https://storage.googleapis.com/cloud-training/dataengineering/lab_assets/kubeflow-resources/kustomize_2.0.3_linux_amd64 -O $WORKING_DIR/bin/kustomize
chmod +x $WORKING_DIR/bin/kustomize
PATH=$PATH:${WORKING_DIR}/bin
```

### Install kfctl

```bash
wget -P /tmp https://storage.googleapis.com/cloud-training/dataengineering/lab_assets/kubeflow-resources/kfctl_v1.0-0-g94c35cf_linux.tar.gz
tar -xvf /tmp/kfctl_v1.0-0-g94c35cf_linux.tar.gz -C ${WORKING_DIR}/bin
```

### Enabling the API

* toenable Google Kubernetes Engine (GKE) API 
```bash
gcloud services enable container.googleapis.com
```

## Create a cluster

* to create an application directory with local config files and enable APIs for your project,

```bash
export KUBEFLOW_USERNAME=student-02-a2af4e986416@qwiklabs.net
export KUBEFLOW_PASSWORD=s8B3nVXY9
export CONFIG_URI=https://storage.googleapis.com/cloud-training/dataengineering/lab_assets/kubeflow-resources/kfctl_gcp_basic_auth.v1.0.1.yaml
export KF_NAME=kubeflow
export KF_DIR=${WORKING_DIR}/${KF_NAME}
```

* To generate the files used to create the deployment, including a cluster and service accounts

```bash
mkdir -p ${KF_DIR}
cd ${KF_DIR}
kfctl build -V -f ${CONFIG_URI}
``` 

* To use the generated files to create all the objects in your project, run this command:

```bash
sed -i 's/n1-standard-8/n1-standard-4/g' gcp_config/cluster-kubeflow.yaml

sed -i 's/1.14/1.15.12-gke.2/g' gcp_config/cluster-kubeflow.yaml

export CONFIG_FILE=${KF_DIR}/kfctl_gcp_basic_auth.v1.0.1.yaml

kfctl apply -V -f ${CONFIG_FILE}
```

nav menu >  Deployment Manager > 

nav menu >  Kubernetes Engine >

you should see things

* to use gcloud to fetch its credentials so you can communicate with it using kubectl
```bash
gcloud container clusters get-credentials ${KF_NAME} --zone ${ZONE} --project ${PROJECT_ID}
```

* Switch to the kubeflow namespace
```bash
kubectl config set-context $(kubectl config current-context) --namespace=kubeflow
```

* to  view all the Kubeflow resources deployed on the cluster
```bash
kubectl get all
```

## Training

### Setting up a Storage Bucket

```bash
# bucket name can be anything, but must be unique across all projects
BUCKET_NAME=${KF_NAME}-${PROJECT_ID}

# create the GCS bucket
gsutil mb gs://${BUCKET_NAME}/
```

### Building the Container

* To deploy the code to Kubernetes, 
you have to first build it into a container image:
```bash
# set the path on GCR you want to push the image to
IMAGE_PATH=us.gcr.io/$PROJECT_ID/kubeflow-train

# build the tensorflow model into a container image
# image is tagged with its eventual path on GCR, but it stays local for now
docker build $WORKING_DIR -t $IMAGE_PATH -f $WORKING_DIR/Dockerfile.model
```

* test to see if image is working locally 
```bash
docker run -it $IMAGE_PATH
```

shloud see this 
![](oCGGqYljOzqsTK5lxqT5NpqWGiq+8SGysglydaHr084=.png)

* push to google cloud container registry (GCR)
```bash
# allow docker to access our GCR registry
gcloud auth configure-docker --quiet

docker push $IMAGE_PATH
```

NAV MENU > container registry
items are there


## Training on the Cluster

```bash
cd $WORKING_DIR/training/GCS
```

* set a unique name for the training run

```bash
kustomize edit add configmap mnist-map-training \
    --from-literal=name=my-train-1
```


*  set some default training parameters
```bash
kustomize edit add configmap mnist-map-training \
    --from-literal=trainSteps=200
kustomize edit add configmap mnist-map-training \
    --from-literal=batchSize=100
kustomize edit add configmap mnist-map-training \
    --from-literal=learningRate=0.01
```

* configure the manifest to use your custom bucket and training imag
```bash
kustomize edit set image training-image=${IMAGE_PATH}:latest
kustomize edit add configmap mnist-map-training \
    --from-literal=modelDir=gs://${BUCKET_NAME}/my-model
kustomize edit add configmap mnist-map-training \
    --from-literal=exportDir=gs://${BUCKET_NAME}/my-model/export
```

* the credentials needed to authenticate as this service account within our cluster:
```bash
kubectl describe secret user-gcp-sa
```

* to use GCP in kubernetes container must set the  GOOGLE_APPLICATION_CREDENTIALS env var to put to keys.json credential file generated for the service acct
* this keys.json is known as user-gcp-sa.json
```bash
kustomize edit add configmap mnist-map-training \
    --from-literal=secretName=user-gcp-sa
kustomize edit add configmap mnist-map-training \
    --from-literal=secretMountPath=/var/secrets
kustomize edit add configmap mnist-map-training \
    --from-literal=GOOGLE_APPLICATION_CREDENTIALS=/var/secrets/user-gcp-sa.json
```

* Lastly, update the base config files to use this style of authentication
```sh
sed -i 's/default-editor/kf-user/g' ../**/*
```

* use Kustomize to build the new customized YAML file:
```bash
kustomize build .
```

* pipe this YAML manifest to kubectl to deploy the training job to the cluster. The training will take approximately 45 to 60 minutes
```bash
kustomize build . | kubectl apply -f -
```

* there should be a new tf-job on the cluster called my-train-1-chief-0. Use kubectl to access information about the job.
```bash
kubectl describe tfjob
```

* to see logs
```bash
kubectl logs -f my-train-1-chief-0
```

* when training is complete take a look 
    * keep refreshing or wait for the logs to see it end
```bash
gsutil ls -r gs://${BUCKET_NAME}/my-model/export
```

## Serving
* to put it in a server so it can be used to handle requests. To do this, move into the "serving/GCS" directory     

* name the service
```bash
kustomize edit add configmap mnist-map-serving \
    --from-literal=name=mnist-service
```

* , point the server at the trained model in your GCP bucket:
```bash
kustomize edit add configmap mnist-map-serving \
    --from-literal=modelBasePath=gs://${BUCKET_NAME}/my-model/export
```

* Lastly, update the base config files to use this style of authentication 
```bash
sed -i 's/default-editor/kf-user/g' ../**/*
```

*  Now, deploy the server to the cluster:
```bash
kustomize build . | kubectl apply -f -
```

* to see info about service
```bash
kubectl describe service mnist-service
```

##  Deploying the UI

* web front end manifests:
```bash
cd $WORKING_DIR/front
```

* deploy
```bash
kustomize build . | kubectl apply -f -
```

* to connect in the browser
```bash
kubectl port-forward svc/web-ui 8080:80
```

html icon previw on port 8080