import sys
sys.path[0] += "\\site-packages"
from google.cloud import bigquery_datatransfer
from google.cloud import bigquery
import uuid
import datetime
import time
import pprint
import asyncio
import json
import datetime
import pytz
import time
import shapely
import shapely.geometry
import shapely.wkt
import geojson
pp = pprint.PrettyPrinter(indent=4, compact=True, width=1)
# end

# import and intalize the library
client = bigquery.Client()
#

class my_bigquery_client():

    def __init__(self):
        self.client = client
        self.bigquery = bigquery
        self.datetime = datetime
        self.pytz = pytz
        self.time = time 
        self.shapely = shapely
        self.geojson = geojson

    # paste env dictionary here
    env=  {
        "intro":False,
        "wkt":False,
        "geojson":True
    }
    #

    # setup
    dataset_names = [
        "GIS_Dataset",
    ]
    #


    def execute(self, data):

        #setup 
        client = self.client
        bigquery = self.bigquery
        datetime = self.datetime 
        pytz = self.pytz        
        time = self.time 
        shapely = self.shapely
        geojson = self.geojson 
        name = data.get("titleName") if data.get("titleName")  else "My_Target_Table"
        emails = data.get("emails") if data.get("emails") else ["data_analysts@example.com"]
        query = data.get("query")
        source_url = data.get("sourceURL")  if data.get("titleName") else "gs://cloud-samples-data/bigquery/us-states/us-states.csv"
        emails = data.get("emails")
        table = ""
        #

        # create a dataset first if needed
        dataset_main = self.make_dataset()
        table_id = "{}.{}".format(dataset_main[0], name) 
        #    

        #create a table if needed
        table= self.make_table(table_id)
        #
                

        #   use the geography point fn
        if(self.env.get("intro")):
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
        #

        # loading WKT data
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

        # loading GeoJSON data
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


        return "Check the backend env dictionary you did set it so the backend didnt do anything"


    def make_table(self,id,type=None,source_url=None):
        try:
            table_ref = bigquery.Table(
                id,
                schema=[
                    bigquery.SchemaField("geo", bigquery.SqlTypeNames.GEOGRAPHY),
                ]            
            )
            if(type == "load"):
                table_ref = bigquery.Table(id)
                job_config = bigquery.LoadJobConfig(
                    skip_leading_rows=1,
                    source_format=bigquery.SourceFormat.CSV,
                    schema=[
                        bigquery.SchemaField("name", bigquery.SqlTypeNames.STRING),
                        bigquery.SchemaField("post_abbr", bigquery.SqlTypeNames.STRING),
                    ],
                )

                job = client.load_table_from_uri(
                    [source_url],
                    table_ref,
                    job_config=job_config,
                )

                job.result()  # Waits for the job to complete.

                return  client.get_table(table_ref)  


            return client.create_table(table_ref)  # Make an API request.
        except BaseException:
            print("table exists")
            return client.get_table(id)
        # return"Created table {}.{}.{}".format(table.project, table.dataset_id, table.table_id)        

    def make_dataset(self):
        try:
            for dataset_main in self.dataset_names:  
                try:
                    dataset_id = self.make_dataset_id(dataset_main)
                    dataset_init = bigquery.Dataset(dataset_id)
                    dataset = client.create_dataset(dataset_init, timeout=30)
                except:
                    pass
        except BaseException:
            print("dataset exists")
        finally:
            # print(["{}.{}".format(client.project,self.make_dataset_id(dataset_main)) for dataset_main in self.dataset_names ])
            return [self.make_dataset_id(dataset_main) for dataset_main in self.dataset_names ]


    def make_dataset_id(self, name):
        if(name == ""):
            raise IndexError
        return "{}.{}".format(client.project, name)







