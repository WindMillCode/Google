import os 
import sys

# 
# print(os.system("gcloud services list").split("\n"))
with  open("services.log","r") as f:
    for line in f:
        word = line.split(" ")
        os.system("gcloud services disable {} --force".format(word[0]))
