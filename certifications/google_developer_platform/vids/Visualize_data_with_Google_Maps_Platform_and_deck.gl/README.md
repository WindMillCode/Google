# Loading Data into Bigquery

<!-- ## [Youtube Walkthrough]() -->


* after the lab your file should look like template.final.py 
* if issues head to Final Code Results and copy and paste the code to the respective files


### Start the Angular App

* download the frontend [here](https://downgit.github.io/#/home?url=https://github.com/WindMillCode/Google/tree/master/certifications/google_developer_platform/AngularApp)
open a terminal and head to project root and run this command
```ps1
npm install -s
npx ng serve -c=googleMaps--open=true
```

### Setup the Python Backend 
* download the backend [here](https://downgit.github.io/#/home?url=https://github.com/WindMillCode/Google/tree/master/certifications/google_developer_platform/vids/Visualize_data_with_Google_Maps_Platform_and_deck.gl)
in a terminal in the folder root
    * target makes it a local package, do not make it global, it might replace your packages
    * if you make a mistake or believe a corruption happened delete site-packages and try again
```ps1
pip install -r requirements.txt --upgrade --target .\site-packages
python .\tornado_server.py
```

* this lab assumes the fondational understanding of GCP
* if there are issues remove all datasets created from the lab and start again
* in your code editor open
* template.py,
* AngularApp\src\environments\environment.gdp.dev.ts 
* google-maps.directive.ts
* AngularApp\src\app\app.component.ts


### Setup Credientials
head to the [Cloud Developer Credentials](https://console.developers.google.com/apis/credentials)
* CREATE CREDENTIALS > RESTRICT KEY > SELECT API > Maps Javascript API 
* __DONT DELETE ANYHTING IN HERE YOU DIDNT CREATE__
* copy key in top left corner , CONFIRM


__FILE: environment.gdp.dev.ts__
* in 'paste googleMaps object here' paste  the API key in the open quotes btwn 
the APIKey property
```ts
 APIKey:"Your API Key Here",
```

### Async load the library
__FILE: app.component.ts__

* in 'googleMaps JS API setup' paste
    * we need to make sure the script is loaded and initalized before using it,
    * the script allows for a callback function it needs to see on the window object 
    * taking advantage we can use a subject  to provide async control as to when exactly the script is ready to use
```ts
        if(env.googleMaps.confirm === "true"){
            let googleMapsAPIURI = `https://maps.googleapis.com/maps/api/js?key=${env.googleMaps.APIKey}&callback=createMap`; //
            let script =this.renderer2.createElement('script');
            window.createMap = ()=>{
                env.googleMaps.scriptLoaded.subject.next(
                    (()=>{
                        env.googleMaps.scriptLoaded.flag = "true"
                        return "true"
                    })()
                )
            }
            script.src = googleMapsAPIURI;
            this.renderer2.appendChild(window.document.body, script);
        }
```

* how the variables were initalized look at line 10 
```ts

```

### Map Display
__FILE: google-maps.directive.ts__

* in 'import needed classes' paste this code
```ts
import { ScatterplotLayer } from '@deck.gl/layers';
import { GoogleMapsOverlay } from '@deck.gl/google-maps';
```

* in 'init the map display' paste this code 
    * this will display the map into nyc do not change the properties or you will defeat the purpose of the lab
```ts 
let mapOptions = {
    center: { lat: 40.75097, lng: -73.98765 },
    zoom: 14,
};
let myMap = new google.maps.Map(this.el.nativeElement, mapOptions);
```

### Retrieving Scatter Plot Data from Bigquery

#### Set Bigquery Credentials
* head to [Cloud Developer Credentials](https://console.developers.google.com/apis/credentials)
* __DONT DELETE ANYHTING IN HERE YOU DIDNT CREATE__
* create a service acct
* give it any name you please
* Grant this service account access to project 
    * add two roles 
    * Bigquery Admin
    * Service Acct Token Creator
* Done
* Hit the edit (pencil) icon on the service Acct
* Add Key > JSON
* download and create the env var "GOOGLE_APPLICATION_CREDENTIALS" to the path of the JSON credential file
__KEEP IT VERY SECURE OR RISK FINANCIAL RUIN ON GCP__
    * head to resoruces if your rather swap JSON credentials instead of replace your current GOOGLE_APPLICATION_CREDENTIALS

#### Query Bigquery for Needed data
__FILE: template.py__
* in  'query and return the required data' paste
    * it querires bigquery for citibike stations in nyc and not to affect your billing limits the results to 50
```py
        if(self.env.get("query_and_return")):
            try:
                schema = ["longitude","latitude","name","capacity"]
                query_job = client.query(
                    query if query else """
                    SELECT
                        longitude,
                        latitude,
                        name,
                        capacity
                    FROM
                        `bigquery-public-data.new_york_citibike.citibike_stations`
                    LIMIT 50
                    """
                )
                query_job.result()
                        

                return json.dumps({
                    "schema":[{"field":x} for x in schema     ],
                    "data":[
                        dict([
                            [schema[i],x]
                            for i,x in enumerate(row)
                        ])
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
```

#### Receive data and apply the scatter plot layer
__FILE: google-maps.directive.ts__
* in commuicate with the python backend we see we make a request to the tornado server runnning on port 3005, expecting JSON data with which we will help deck.gl format to create the scatter ploat

* in 'setup layer operations' paste
```ts
                        let layerOptions = {
                            id: 'scatter-plot',
                            data: result.data,
                            getPosition: d => [parseFloat(d.longitude), parseFloat(d.latitude)],
                            getRadius: d => parseInt(d.capacity),
                            stroked: true,
                            getFillColor: [255, 133, 27],
                            getLineColor: [255, 38, 27],
                            radiusMinPixels: 5,
                            radiusMaxPixels: 50
                        };
                        let scatterplotLayer = new ScatterplotLayer(layerOptions);
```

* in 'apply scatter plot visualization to Map' paste
```ts
    let googleMapsOverlay = new GoogleMapsOverlay({
        layers: [scatterplotLayer]
    });
    googleMapsOverlay.setMap(myMap);
```
###  Final Code results

#### template.py
```py
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

    # paste env dictionary here
    env=  {
        "query_and_return":True
    }
    #

    # setup
    dataset_names = [
        "googleMaps_Dataset",
    ]
    #


    def execute(self, data):

        #setup 
        client = self.client
        bigquery = self.bigquery
        datetime = self.datetime 
        pytz = self.pytz        
        time = self.time 
        name = data.get("titleName") if data.get("titleName")  else "My_Target_Table"
        emails = data.get("emails") if data.get("emails") else ["data_analysts@example.com"]
        query = data.get("query")
        source_url = data.get("sourceURL")  if data.get("titleName") else "gs://cloud-samples-data/bigquery/us-states/us-states.csv"
        emails = data.get("emails")
        table = ""
        #

        # create a dataset first if needed
        # dataset_main = self.make_dataset()
        # table_id = "{}.{}".format(dataset_main[0], name) 
        #    

        #create a table if needed
        # table= self.make_table(table_id,"load")
        #
                

        # query and return the required data
        if(self.env.get("query_and_return")):
            try:
                schema = ["longitude","latitude","name","capacity"]
                query_job = client.query(
                    query if query else """
                    SELECT
                        longitude,
                        latitude,
                        name,
                        capacity
                    FROM
                        `bigquery-public-data.new_york_citibike.citibike_stations`
                    LIMIT 50
                    """
                )
                query_job.result()
                        

                return json.dumps({
                    "schema":[{"field":x} for x in schema     ],
                    "data":[
                        dict([
                            [schema[i],x]
                            for i,x in enumerate(row)
                        ])
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




        return "Check the backend env dictionary you did set it so the backend didnt do anything"
```


#### google-maps.directive.ts
```ts
import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy } from '../customExports'
import { catchError, delay } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import needed classes
import { ScatterplotLayer } from '@deck.gl/layers';
import { GoogleMapsOverlay } from '@deck.gl/google-maps';
//

@Directive({
    selector: '[appGoogleMaps]'
})
export class GoogleMapsDirective {

    @Input() googleMaps: any;
    extras: any;
    zChildren: any;
    agGrid:any = {
        zSymbol:""
    }
    Subscription0:Subscription


    constructor(
        private el: ElementRef,
        private http: HttpClient,
        private renderer: Renderer2,
        private ryber: RyberService
    ) { }



    ngOnInit() {
        this.extras = this.googleMaps
        console.log(this.extras)
        if (this.extras?.confirm === 'true') {


            this.Subscription0 = combineLatest([
                env.googleMaps.scriptLoaded.subject,
                this.ryber[this.extras.co.valueOf()].metadata.zChildrenSubject
            ])
            .subscribe((result) => {


                // init the map display
                let mapOptions = {
                    center: { lat: 40.75097, lng: -73.98765 },
                    zoom: 14,
                };
                let myMap = new google.maps.Map(this.el.nativeElement, mapOptions);
                //

                // communicate with the python backend for the map data from bigquery

                this.http.post(
                    "http://localhost:3005",
                    {},
                    {
                        responseType: 'json',
                    }
                )
                .subscribe({


                    error: (error) => {


                        eventDispatcher({
                            event: 'resize',
                            element: window
                        })
                    },
                    next: (result: any) => {
                        console.log(result)

                        // setup layer operations
                        let layerOptions = {
                            id: 'scatter-plot',
                            data: result.data,
                            getPosition: d => [parseFloat(d.longitude), parseFloat(d.latitude)],
                            getRadius: d => parseInt(d.capacity),
                            stroked: true,
                            getFillColor: [255, 133, 27],
                            getLineColor: [255, 38, 27],
                            radiusMinPixels: 5,
                            radiusMaxPixels: 50
                        };
                        let scatterplotLayer = new ScatterplotLayer(layerOptions);
                        //

                        // apply scatter plot visualization to Map
                        let googleMapsOverlay = new GoogleMapsOverlay({
                            layers: [scatterplotLayer]
                        });
                        googleMapsOverlay.setMap(myMap);
                        //

                    }

                })
                //
                this.zChildren = this.ryber[this.extras.co.valueOf()].metadata.zChildren

            })

        }
    }


    ngOnDestroy() {
        if (this.extras?.confirm === 'true') {
            Object.values(this)
                .forEach((x: any, i) => {
                    if (x instanceof Subscriber) {
                        x.unsubscribe?.()
                    }

                })
        }
    }
}


```


#### app.component.ts
```ts
import { Component, OnInit, OnDestroy, ViewChildren, Inject, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, Renderer2 } from '@angular/core';
import { RyberService } from './ryber.service';
import { fromEvent, Subject, Observable, of, Subscription, interval, ReplaySubject, BehaviorSubject, combineLatest, merge } from 'rxjs';
import { eventDispatcher, esInit, coInit } from './customExports'
// import {   Router,RouterEvent } from '@angular/router';
import { catchError, take, timeout, debounceTime, tap, distinctUntilKeyChanged, distinct } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { environment as env} from 'src/environments/environment';

declare global {
    interface Window { Modernizr: any;createMap:any }
    // not let or else local to this file
    var gapi: any
    var google:any
    var Modernizr: any
    var SignaturePad: any
    var seeeb: any
    var faker: any
    var Pikaday: any
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    // styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    constructor(
        public ryber: RyberService,
        private ref: ChangeDetectorRef,
        private renderer2: Renderer2,
        private http: HttpClient
    ) { }

    title = 'AngularBigquery';
    CO$: Subscription

    ngOnInit() {
        if (env.lifecycleHooks) console.log('app ngOnInit fires on mount');


        //gapi && datepicker setup
        [
            "https://apis.google.com/js/api.js",
            // "https://code.jquery.com/ui/1.12.1/jquery-ui.js"
        ]
            .forEach((x, i) => {
                let s = this.renderer2.createElement('script');
                s.type = 'text/javascript';
                s.src = x
                this.renderer2.appendChild(window.document.head, s);
            })
        //


        //fake data setup
        if (!env.production) {
            const fakerScript = this.renderer2.createElement('script');
            fakerScript.type = 'text/javascript';
            fakerScript.src = "https://cdn.rawgit.com/Marak/faker.js/master/examples/browser/js/faker.js"; // Defines someGlobalObject
            this.renderer2.appendChild(window.document.body, fakerScript);
        }
        //

        // googleMaps JS API setup
        if(env.googleMaps.confirm === "true"){
            let googleMapsAPIURI = `https://maps.googleapis.com/maps/api/js?key=${env.googleMaps.APIKey}&callback=createMap`; //
            let script =this.renderer2.createElement('script');
            window.createMap = ()=>{
                env.googleMaps.scriptLoaded.subject.next(
                    (()=>{
                        env.googleMaps.scriptLoaded.flag = "true"
                        return "true"
                    })()
                )
            }
            script.src = googleMapsAPIURI;
            this.renderer2.appendChild(window.document.body, script);
        }
        //


        /* App Setup*/
        esInit(this.ryber, this.ryber.appCO0.metadata.ES)


        this.CO$ = merge(
            ...this.ryber.appCO0.metadata.CO.map((x, i) => {
                return this.ryber[x.valueOf()]
            })
        )
        .subscribe((coArray: any) => {
            coInit(
                this.ryber,
                coArray,
                ((devObj) => {
                    let { co } = devObj
                    co.metadata.formData = {}
                    co.metadata.refresh = {}
                    co.metadata.latch = {
                        updateZChild : new Subject<any>(),
                        zChild:{}
                    }
                    co.metadata.agGrid = {
                        zSymbol: new Subject<any>(),
                    }
                    co.metadata.zChildrenSubject = new Subject<any>()
                    .pipe(
                        tap((val) => {
                            co.metadata.zChildren = val.directivesZChild
                            co.metadata.zChildren$ = of(val.directivesZChild)
                        }),
                    )
                    co.metadata.ngAfterViewInitFinished = new Subject<any>()
                })
            )
        })

        // console.log(this.ryber)




        if (
            window.name !== '/' &&
            window.name !== '/home'
        ) {


            window.name = '/home'


        }


        if (this.ryber.appReloaded === 'true') {


            this.ryber.appCurrentNav = window.name


        }

        this.ryber.appViewComplete.subscribe(() => {


            if (window.name === '') {


                window.name = '/'


            }


            if (this.ryber.appReloaded !== 'true') {


                window.name = this.ryber.appCurrentNav


            }


            // async the navigation
            if (['/home', '/'].includes(this.ryber.appCurrentNav)) {



                this.routeDispatch({
                    arr: [...this.ryber["formCO"]].sort(),
                })



            }
            //




        })


        // console.log(location.pathname)
    }

    routeDispatch(
        devObj: {
            arr: Array<any>
        }
    ) {
        let { arr } = devObj
        arr = arr.sort()
        this.ryber.appViewCompleteArray = this.ryber.appViewCompleteArray.sort()
        if (
            arr
                .filter((x, i) => {
                    return this.ryber.appViewCompleteArray[i] !== x
                })
                .length === 0 &&
            arr.length === this.ryber.appViewCompleteArray.length
        ) {


            // console.log('dispatched')
            // window.onload  sometimes the elements dont resize prorply, dispatch when the window is fully loaded
            eventDispatcher({
                element: window,
                event: 'resize'
            })


            this.ryber.appViewCompleteArray = []


            if (this.ryber.appReloaded === 'true') {


                this.ryber.appReloaded = 'false'


            }


        }

    }

    ngOnDestroy() {
        if (env.lifecycleHooks) console.log('app ngOnDestroy fires on dismount')
        this.CO$.unsubscribe?.()
        this.ryber.appViewComplete.unsubscribe?.()
    }


}

```

#### environment.gdp.dev.ts
```ts

import {Subject} from 'rxjs'

export const environment: any = {
    production: false,
    url: 'Bigquery',
    inputHandle: {
        options: false,
        link: false,
        linkInit: false
    },
    cookie:{
        // permission:"allow",
        // confirm:"false"
    },
    component: {

        form: {
            panelView: -1, //should be a number use a positive number to view it
            lifecycleHooks: false,
            zChildView:-1,
            zChild:0,
            drag:[-1],
        },
        dialog: {
            panelView: -1,
			lifecycleHooks: true,
            zChildView:-1,
            zChild:-1
        },
        app: {}
    },
    submission: {
        fakeValues: false,
        optionsClicked: true,
        endUser: true,
        moreThanOne:false,
        click:false,
        play: false,
        invalidate: {
            any: false,
        }
    },
    testingAcct:{
		confirm:"false", //true for hubspot false for drive
		capybara: { // remove this if not doing unit or e2e tests impt
			main:"true",
			url:"gdp"
		}
    },
    sentry:{
        env:"gdp_development",
        defaultIntegrations:true,
        tracingOrigins:["localhost",/^\//]
    },

    // paste googleMaps object here
    googleMaps:{
        APIKey:"Your API Key Here",
        scriptLoaded:{
            flag:"false",
            subject: new Subject<any>()
        },
        confirm:"true",

    }
    //



};


```
### Resources
[google auth](https://google-auth.readthedocs.io/en/latest/index.html)