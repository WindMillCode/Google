# Views in Bigquery

## [Youtube Walkthrough](https://youtu.be/Mn6wjxiwVWo)


* after the lab your file should look like template.final.py 
* if issues copy and paste from template.start.py


### Start the Angular App

* download the frontend [here](https://downgit.github.io/#/home?url=https://github.com/WindMillCode/Google/tree/master/API/bigquery/AngularApp)
open a terminal and head to project root and run this command
```ps1
npm install -s
npx ng serve -c=view --open=true
```

### Setup the Python Backend 
* download the backend [here](https://downgit.github.io/#/home?url=https://github.com/WindMillCode/Google/tree/master/API/bigquery/vids/Python3/Views)
in a terminal in the folder root
    * target makes it a local package, do not make it global, it might replace your packages
    * if you make a mistake or believe a corruption happened delete site-packages and try again
```ps1
pip install -r requirements.txt --upgrade --target .\site-packages
python .\tornado_server.py
```

* open table_schemas.py and in your code editor,


### Overview 
* a view is a subsection of a table resulting from a query 
* we will be using two datasets for the lab
        "Views_Dataset",
        "Authorized_Views_Dataset"
* in the frontend ui try to follow along with the steps if not sure leave empty
* if you seem  to have ruined the lab delete the two datasets and start again from create a View

### Create a View
*Up to 1,024 characters
*Letters (uppercase or lowercase), numbers, and underscores
* __permissions__ -bigquery.tables.create,bigquery.datasets.create
* __roles__ - bigquery.dataOwner,bigquery.admin



* in 'paste env dictionary here' replace
```py
    env=  {
        "create_view":True,
        "create_authorized_view":False,
        "list_views":False,
        "update_views":False
    }
```

* in 'create a view' paste
```py
        if(self.env.get("create_view")):
            try:
                view_id = "{}.{}".format(dataset_main[1], "My_View") 
                source_id = table_id
                view = bigquery.Table(view_id)

                view.view_query = query or f"SELECT name, post_abbr FROM `{source_id}` WHERE name LIKE 'W%'"

                # Make an API request to create the view.
                view = client.create_table(view)
                return f"Created {view.table_type}: {str(view.reference)}"              
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
        
```

### Create an authroized View
* you must provide an email 
* in 'paste env dictionary here' replace
```py
    env=  {
        "create_view":False,
        "create_authorized_view":True,
        "list_views":False,
        "update_views":False
    }
```

* in 'create an authorized view' paste
```py
        elif(self.env.get("create_authorized_view")):
            try:

                view_dataset_id = dataset_main[1]
                view_dataset = client.get_dataset(view_dataset_id)

                access_entries = view_dataset.access_entries
                for email in emails:                
                    access_entries.append(
                        bigquery.AccessEntry("READER", "userByEmail", email)
                    )
                view_dataset.access_entries = access_entries

                view_dataset = client.update_dataset(view_dataset, ["access_entries"])
                
                source_dataset_id = dataset_main[0]
                source_dataset = client.get_dataset(source_dataset_id)

                view_reference = {
                    "projectId": client.project,
                    "datasetId": self.dataset_names[0],
                    "tableId": name,
                }
                access_entries = source_dataset.access_entries
                access_entries.append(bigquery.AccessEntry(None, "view", view_reference))
                source_dataset.access_entries = access_entries

                # Make an API request to update the ACLs property of the source dataset.
                source_dataset = client.update_dataset(source_dataset, ["access_entries"])
                emailList = ""
                for email in emails:
                    emailList += email +", "
                return f"""
                Access to view : {emailList}, and the view has access to the source table, 
                which means who has access can use the view
                """        
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
        #  
```

### List views

* in 'paste env dictionary here' replace
```py
    env=  {
        "create_view":False,
        "create_authorized_view":False,
        "list_views":True,
        "update_views":False
    }
```

* in 'list views' paste
```py
        elif(self.env.get("list_views")):
            try:
                dataset_id = dataset_main[0]
                for view in ["view_1","view_2","view_3"]:
                    view_id = "{}.{}".format(dataset_main[0], view) 
                    source_id = table_id
                    view = bigquery.Table(view_id)

                    view.view_query = query or f"SELECT name, post_abbr FROM `{source_id}` WHERE name LIKE 'W%'"

                    # Make an API request to create the view.
                    view = client.create_table(view)                    
                tables = client.list_tables(dataset_id)  # Make an API request.

                print("Tables contained in '{}':".format(dataset_id))
                views = ""
                for table in tables:
                    if(table.table_type =="VIEW"):
                        views += table.table_id +" ,\n"
                return "List of views in the dataset {}".format(views)          
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
        # 
```


### Update View Query
* this is the one place biguqery allows you tube flexible

* in 'paste env dictionary here' replace
```py
    env=  {
        "create_view":False,
        "create_authorized_view":False,
        "list_views":False,
        "update_views":True
    }
```

* in 'update view query' paste
```py
        elif(self.env.get("update_views")):
            try:
                view_id = "{}.{}".format(dataset_main[1], "My_View") 
                source_id = table_id
                view = bigquery.Table(view_id)
                view.view_query = f"SELECT name FROM `{source_id}` WHERE name LIKE 'M%'"
                view = client.update_table(view, ["view_query"])
                return f"Updated {view.table_type}: {str(view.reference)}"                
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
        #
```