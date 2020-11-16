# The Application Data Folder

## Task 1 Web Application 

* download the [web app](https://github.com/codequickie123/AngularDriveApp)
* at the end of this lab your result shoul dlook like src/app/directive/adf.directive.final.ts

* in terminal 1
```bash
npx ng serve -c=adf --open=true
```


## Task 2 setup up credentials

open /src/app/directive/share.directive.ts in your code editor
* in paste credentials here paste this code
```ts
let CLIENT_ID = environment .googleDrive.clientId
let API_KEY = environment.googleDrive.apiKey
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
var SCOPES = 'https://www.googleapis.com/auth/drive.appdata';
```
* you need to make new api and oauth credentials, because on first login UI discusses the permissions the app is looking for in the scope, this doesn't happen again and would be a security issue to all of a sudden change behind the end users back

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

open /src/app/directive/share.directive.ts in your code editor
* in load the auth SDK paste
```ts
// load the auth SDK
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


        //Create a file in the application data folder

        //

        // list all files in the shared drive

        //



    })
    .catch(function (error) {
        console.log(error)
    })
});
//
```

## Task 4 View size of the Application Data Folder

in the drive UI 
Settings Icon > Settings > Manage Apps > Quickstart
hidden app data is the size of your application data folder

## Task 5 Create a file in the application data folder

open /src/environments/environment.drive.dev.ts

in 'replace adf object here' replace with this code 
```ts
	adf:{
		create:true,
		list:false
	}
```

open /src/app/directive/adf.directive.ts in your code editor
in 'Create a file in the application data folder' paster this code
* this seqence goes in the request body
```ts
if(environment.adf.create){
    http.post(
        "https://www.googleapis.com/drive/v3/files",
        {
            name: "config.json",
            parents:['appDataFolder']
        },
        { headers }
    )
    .subscribe((result)=>{
        console.log(result)
    })
}
```


## Task 6 list all files in the application data folder
open /src/environments/environment.drive.dev.ts

in 'replace adf object here' replace with this code 
```ts
	adf:{
        create:false,
		list:true
	}
```


open /src/app/directive/adf.directive.ts in your code editor

in 'list all files in the application data folder' paste this code
this property is actually a query param
```ts
if(environment.adf.list){


    http.get(
        "https://www.googleapis.com/drive/v3/files",
        {
            headers,
            params:{
                spaces:'appDataFolder',
            }
        }
    )
    .subscribe((result)=>{
        console.log(result)
    })


}
```