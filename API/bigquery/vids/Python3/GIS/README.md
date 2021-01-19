# Bigquery GIS

<!-- ## [Youtube Walkthrough]() -->


* after the lab your file should look like template.final.py 
* if issues copy and paste from template.start.py


### Start the Angular App

* download the frontend [here](https://downgit.github.io/#/home?url=https://github.com/WindMillCode/Google/tree/master/API/bigquery/AngularApp)
open a terminal and head to project root and run this command
```ps1
npm install -s
npx ng serve -c=gis --open=true
```

### Setup the Python Backend 
* download the backend [here](https://downgit.github.io/#/home?url=https://github.com/WindMillCode/Google/tree/master/API/bigquery/vids/Python3/GIS)
in a terminal in the folder root
    * target makes it a local package, do not make it global, it might replace your packages
    * if you make a mistake or believe a corruption happened delete site-packages and try again
```ps1
pip install -r requirements.txt --upgrade --target .\site-packages
python .\tornado_server.py
```

* open template.py and in your code editor,
* open AngularApp\src\environments\environment.bigquery.dev.ts in your code editor


### GIS and GeoViz 

FILE: __environment.bigquery.dev.ts__
* iN 'update gis object here' paste
```ts
    gis:{
        intro:true
    }
```
    

FILE: __template.py__
* in 'paste env dictionary here' replace
```py
    env=  {
        "intro":True,
        "wkt":False,
        "geojson":False
    }
```

* in 'use the geography point fn' paste this code
```py
            try:
                schema = ["WKT","num_bikes_available"]
                """
                query = 
                SELECT
                ST_GeogPoint(longitude, latitude)  AS WKT,
                num_bikes_available
                FROM
                `bigquery-public-data.new_york.citibike_stations`
                WHERE num_bikes_available > 30
                LIMIT 10
                """                
                query_job = client.query(query)

                results = query_job.result()  # Waits for job to complete.
                return json.dumps({
                    "schema":[{"field":x} for x in schema],
                    "data":[
                        # Row values can be accessed by field name or index.
                        {
                            schema[0]:row[schema[0]],
                            schema[1]:row[schema[1]] 
                        }
                        for row in query_job
                    ]
                })           
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend' 
```

head to the [Biguery GeoViz Tool](https://bigquerygeoviz.appspot.com/)
* authorize the app to be allowed to work your bigquery acct
* in query paste, your query from the frontend also privde the projectID 
* hit run (can put any query you would like here)
* head to style
    * choose an option, if data-driven is off, the style will apply to the whole query result
    * when data-driven is on the 
    field represent s the column
    function decides how to express the domain range
    domain is the lowest to highest value in the field
    range represents the representation (size,color) to the domain,
    its best to play with the frontend to see how it works

### WKT
FILE: __environment.bigquery.dev.ts__
* iN 'update gis object here' paste
```ts
    gis:{
        intro:false
    }
```

FILE: __template__
* in 'paste env dictionary here' replace
```py
    env=  {
        "intro":False,
        "wkt":True,
        "geojson":False
    }
```

* in 'loading WKT data' 
```py
        elif(self.env.get("wkt")):
            try:

                # Use the Shapely library to generate WKT of a line from LAX to
                # JFK airports. Alternatively, you may define WKT data directly.
                my_geography = shapely.geometry.LineString(
                    [(-118.4085, 33.9416), (-73.7781, 40.6413)]
                )
                rows = [
                    # Convert data into a WKT string.
                    {"geo": shapely.wkt.dumps(my_geography)},
                ]

                #  table already exists and has a column
                # named "geo" with data type GEOGRAPHY.
                errors = client.insert_rows_json(table_id, rows)
                if errors:
                    raise RuntimeError(f"row insert failed: {errors}")
                else:
                    return f"wrote 1 row to {table_id} using WKT"                
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
        #
```

* query the table from the GIS_Dataset in your project

### GeoJSON
* in 'paste env dictionary here' replace
```py
    env=  {
        "intro":False,
        "wkt":False,
        "geojson":True
    }
```

* in 'loading GeoJSON data' paste
```py
        elif(self.env.get("geojson")):
            try:

                # Use the python-geojson library to generate GeoJSON of a line from LAX to
                # JFK airports. Alternatively, you may define GeoJSON data directly, but it
                # must be converted to a string before loading it into BigQuery.
                my_geography = geojson.LineString([(-118.4085, 33.9416), (-73.7781, 40.6413)])
                rows = [
                    # Convert GeoJSON data into a string.
                    {"geo": geojson.dumps(my_geography)}
                ]

                
                # named "geo" with data type GEOGRAPHY.
                errors = client.insert_rows_json(table_id, rows)
                if errors:
                    raise RuntimeError(f"row insert failed: {errors}")
                else:
                    return f"wrote 1 row to {table_id} using GeoJSON"              
            except BaseException as e:
                print('my custom error\n')
                print(e.__class__.__name__)
                print('\n')
                print(e)
                return 'an error occured check the output from the backend'
        #
```


* query the table from the GIS_Dataset in your project see the differnce




### Resources
* [challenge](https://cloud.google.com/bigquery/docs/gis-tutorial-hurricane)
* [understanding how bigquery GIS manages the geodata](https://cloud.google.com/bigquery/docs/gis-data#coordinate_systems_and_edges)