# Properties in Google Drive API


## Task 1 Web Application 

* download the [web app](https://github.com/codequickie123/AngularDriveApp)


* at the end of this lab your result should look like src/app/directive/properties.directive.final.ts

* in terminal 1
```bash
npx ng serve -c=props --open=true
```

## Task 2 setup up credentials

open /src/app/directive/properties.directive.ts in your code editor
* in paste credentials here paste this code
```ts
let CLIENT_ID = env.googleDrive.clientId
let API_KEY = env.googleDrive.apiKey
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
var SCOPES = 'https://www.googleapis.com/auth/drive';
```

* in console.developers.google.com

copy and write down the API KEY

RESTRICT KEY 

|property|value|data|
|:------|:------:|------:|
|API restrictions > Restrict Key > |Google Drive API||

CREATE CREDENTIALS > API KEY

|property|value|data|
|:------|:------:|------:|
|Application type|Web Application||
|Authorized JavaScript origins|http://localhost:8000||

CREATE


copy and write down the client id 


* open /src/environments/environment.drive.dev.ts in your code editor
* FOR 'insert credentials here' map as needed

### Possible Errors

*if you run into error 
    * clear the browser cache
    * GCP went and corrputed the credentials behind your back, and wont display the mistake in the UI, delete and make new credentials again

## Task 3 Connect to the API

open /src/app/directive/properties.directive.ts in your code editor
* in load the auth SDK paste
```ts
gapi.load('client:auth2', () => {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    })
    .then(function () {

        // sign in if needed
        if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
            gapi.auth2.getAuthInstance().signIn();
        }
        //

        //access token setup
        let headers = new HttpHeaders()
        headers = headers
            .set("Authorization", `Bearer ${gapi.auth.getToken().access_token}`)
        //

        //lab Setup
        let createAFile:[string,any,any] = [
            "https://www.googleapis.com/drive/v3/files",
            { name: "My Properties" },
            {  headers }
        ]

        let getAllFiles:[string,any] = [
            "https://www.googleapis.com/drive/v3/files",
            {  headers }
        ]

        let filterForFile:(any) => (any) = (devObj:{result: any, id: any}):any => {
            let {result,id} = devObj
            result.files
            .forEach((x: any, i) => {
                if (x.name === "My Properties") {
                    id.file = x.id;
                }
            });
            return id
        }
        //

    // creating Properties

    //

    //thrid party app looking at properties

    //

    })
    .catch(function (error) {
        console.log(error)
    })
});
//
```

## Task 4 Creating properties and Understanding the Meaning of the "App"
open /src/environments/environment.drive.dev.ts

in 'replace properties object here' replace with this
```ts
props:{
    create:{
        run:true,
        all:true,
        solo:false
    },
    see:{
        run:false,
        all:false,
        solo:false
    },
}
```


open /src/app/directive/properties.directive.ts in your code editor
in 'creating properties' paste this code
    * we see that there are 2 property, but the ui reports only one update, this is the case
    you need batch requests or make several API requests to update as needed
```ts
if(env.props.create.run){
    http.post(...createAFile)
    .subscribe((result:any)=>{
        let id:any = {file:result.id}




        //creating properties
        http.patch(
            "https://www.googleapis.com/drive/v3/files/"+id.file,
            
            //IIFE
            (()=>{
                if(env.props.create.all){
                    return { properties:[{'a':'I can see you'},{'b':'yes I can'}]}
                }
                else if(env.props.create.solo){
                    return { appProperties:[{'a':'I cant see the props no hacking today'},{'b':'yes I can'}]}
                }

            })(),
            //

            {
                headers,
                params:{
                    fields:'properties,appProperties'
                }
            }
        )
        //





        .subscribe((result:any)=>{
            console.log(result)

        })


    })
}
```

* take a look at IIFE,
__Immediately-invoked Function Expression__   - js/ts apps can get heavy and we dont want to write bulky code for simple acts. in the iife we see is this lab we chose whether we want to focus on regular properties or app properties, without ever having to look at that logic again

* we here have created a property for all apps to see we can demonstrate this but first we need to understand the app entity

### The App Entity is  a GCP Project
* drive API apps are google projects in the GCP  platform, when you use an API KEY and OAuth and credentials etc, from another project you are by defintion using another app

* so all we need to do is create another project and we have a second app 

* head to https://console.cloud.google.com/
* click on your project name
* click on New Project
* head to console.developers.google.com
* head [here](https://console.cloud.google.com/apis/api/drive.googleapis.com/overview) 
link: https://console.cloud.google.com/apis/api/drive.googleapis.com/overview
and enable the drive API
* make an API Key and OAuth in step 2 of this project but dont edit environment.drive.dev.ts yet 
* replace 'insert credentials here' like so
```ts
// apiKey:"api key from first app",
// clientId:"client id from first  app"

//second app
apiKey:"api key from second app",
clientId:"client id from second app"
//
```

* confirm by heading back to the application and realizing that you need to sign in again,
* congrats now your using a different App

## Task 5, see the the properties from the second app
open /src/environments/environment.drive.dev.ts

in 'replace properties object here' replace with this
```ts
props:{
    create:{
        run:false,
        all:false,
        solo:false
    },
    see:{
        run:true,
        all:true,
        solo:false
    },
}
```

open /src/app/directive/properties.directive.ts in your code editor
in 'thrid party app looking at properties' paste this code
```ts
if(env.props.see.run){
    http.get(...getAllFiles)
    .subscribe((result:any)=>{
        let id = filterForFile({result,id:{}})




        // see the properties of a file belonging to another app
        http.get(
            "https://www.googleapis.com/drive/v3/files/"+id.file,
            {
                headers,
                params:{
                    fields:(()=>{
                        if(env.props.see.all){
                            return "properties"
                        }
                        else if(env.props.see.solo){
                            return "appProperties"
                        }
                    })()
                }
            }
        )
        //




        .subscribe((result:any)=>{
            console.log(result)
            // delete the offending file to make the lab smoother
            http.delete(
                "https://www.googleapis.com/drive/v3/files/"+id.file,
                {
                    headers
                }
            )
            //
            .subscribe((result:any)=>{
                console.log(result)
            })
        })
    })

}
```
* another IIFE, whats going on here once again the 2nd app wants to look at properties not app properties
* as a result we see the properties, app developers may not want this however

## Task 6 Creating app properties so only your app can see them
open /src/environments/environment.drive.dev.ts

* replace 'insert credentials here' like so
```ts
apiKey:"api key from first app",
clientId:"client id from first  app"

//second app
// apiKey:"api key from second app",
// clientId:"client id from second app"
//
```

in 'replace properties object here' replace with this
```ts
props:{
    create:{
        run:true,
        all:false,
        solo:true
    },
    see:{
        run:false,
        all:false,
        solo:false
    },
}
```

* in the ui web app we have made a file that has properties only your app can see 'appProperties', in the dev console


* replace 'insert credentials here' like so
```ts
// apiKey:"api key from first app",
// clientId:"client id from first  app"

//second app
apiKey:"api key from second app",
clientId:"client id from second app"
//
```

in 'replace properties object here' replace with this
```ts
props:{
    create:{
        run:false,
        all:false,
        solo:false
    },
    see:{
        run:true,
        all:false,
        solo:true
    },
}
```

* now in the 2nd app we cannot see appProperties 