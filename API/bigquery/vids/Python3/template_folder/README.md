# Loading Data into Bigquery

<!-- ## [Youtube Walkthrough]() -->


* after the lab your file should look like loading.final.py 
* if issues copy and paste from loading.start.py


### Start the Angular App

* download the frontend [here](https://downgit.github.io/#/home?url=https://github.com/codequickie123/Google/tree/master/API/bigquery/AngularApp)
open a terminal and head to project root and run this command
```ps1
npm install -s
npx ng serve -c=loading --open=true
```

### Setup the Python Backend 
* download the backend [here]()
in a terminal in the folder root
    * target makes it a local package, do not make it global, it might replace your packages
    * if you make a mistake or believe a corruption happened delete site-packages and try again
```ps1
pip install -r requirements.txt --upgrade --target .\site-packages
python .\tornado_server.py
```

* open table_schemas.py and in your code editor,


### Task 1 

* in 'paste env dictionary here' replace
```py
    env=  {
        "create": True,
        "repeated":False,
        "autodetect1":False,
        "add_column":False,
    }
```
