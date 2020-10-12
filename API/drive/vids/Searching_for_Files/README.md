# Searching For Files Using The Google Drive API

## Task 1 Web Application 

* download the [web app](https://github.com/codequickie123/AngularDriveApp)
* download the search_me [here](https://github.com/codequickie123/Google/tree/master/API/drive/vids/Searching_for_Files/search_me)


* at the end of this lab your result shoul dlook like src/app/directive/search.directive.final.ts

* in terminal 1
```bash
npx ng serve -c=search --open=true
```

## Task 2 setup up credentials

open /src/app/directive/search.directive.ts in your code editor
* in paste credentials here paste this code
```ts
let CLIENT_ID = environment .googleDrive.clientId
let API_KEY = environment.googleDrive.apiKey
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
var SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';
```

* in console.developers.google.com

credentials > CREATE CREDENTIALS > API KEY

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

open /src/app/directive/search.directive.ts in your code editor
* in load the auth SDK
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

    

        //get a list of all files
        //

        //search for specific files or folders
        //


    })
    .catch(function (error) {
        console.log(error)
    })
});
//
```


## Task 4 Get All Files



* in src/environmnent/environmnent.drive.dev.ts
    * replace search object
    ```ts
    search:{
		all:true,
		query:true
	},
    ```

open /src/app/directive/search.directive.ts in your code editor
* in get a list of all files paste this code    
    * we see in the files property we get all the files in the drive
```ts
if(environment.search.all){

    let headers = new HttpHeaders()
    headers = headers
        .set("Authorization", `Bearer ${gapi.auth.getToken().access_token}`)

    http.get(
        "https://www.googleapis.com/drive/v3/files",
        { headers, observe: 'response' }
    )
    .subscribe((result: any) => {
        console.log(result.body)

    })
}
```

## Task 5 Get specific files



* in src/environmnent/environmnent.drive.dev.ts
    * replace search object
    ```ts
    search:{
		all:true,
		query:true
	},
    ```



open /src/app/directive/search.directive.ts 
* in search for specific files or folders paste
    * pay attentiton to the q, this stands for query 
    * use these links to get at the queries u need  

[examples](https://developers.google.com/drive/api/v3/search-files#query_string_examples)

[reference](https://developers.google.com/drive/api/v3/ref-search-terms#operators)    
```ts
if(environment.search.query){

    let headers = new HttpHeaders()
    headers = headers
        .set("Authorization", `Bearer ${gapi.auth.getToken().access_token}`)

    http.get(
        "https://www.googleapis.com/drive/v3/files",
        {
            headers,
            observe: 'response',
            params:{
                q:"mimeType = 'image/gif'",
                fields: 'files(id, starred,name)',
            }
        }
    )
    .subscribe((result: any) => {
        console.log(result)

    })
}
```

* there is also __corpora__ indicating how the drive is setup, but these are for large business, just indicate user, domain, drive, and allDrives as the corpora property for the params object above