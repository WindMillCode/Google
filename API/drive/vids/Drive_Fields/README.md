# Fields in Google Drive API 

## Task 1 Web Application 

* download the [web app](https://github.com/codequickie123/AngularDriveApp)
* file fields metadata [here](https://developers.google.com/drive/api/v3/reference/files)

* at the end of this lab your result shoul dlook like src/app/directive/fields.directive.final.ts

* in terminal 1
```bash
npx ng serve -c=fields --open=true
```

## Task 2 setup up credentials

open /src/app/directive/fields.directive.ts in your code editor
* in paste credentials here paste this code
```ts
let CLIENT_ID = environment .googleDrive.clientId
let API_KEY = environment.googleDrive.apiKey
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
var SCOPES = 'https://www.googleapis.com/auth/drive';
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

open /src/app/directive/fields.directive.ts in your code editor
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

        //fields fn

        //


    })
    .catch(function (error) {
        console.log(error)
    })
});
//
```


## Task 4 Fields fn



open /src/app/directive/fields.directive.ts in your code editor
* in __fields fn__ files paste this code    
* we will focus on files, for other endpoints more setup is required beyond the scope of this lab
```ts
let getFields  =(devObj?)=>{
    let headers = new HttpHeaders()
    headers = headers
        .set("Authorization", `Bearer ${gapi.auth.getToken().access_token}`)

    http.get(
        "https://www.googleapis.com/drive/v3/files",
        {
            headers,
            observe: 'response',
            params:{
                fields:devObj.fields
            }
        }
    )
    .subscribe((result: any) => {
        console.log(result.body.files[0])

    })
}
```


## Task 5 explore and make various requests



* in src/environmnent/environmnent.drive.dev.ts
    * replace fields object
    ```ts
	fields:{
		all:false,
		single:false,
		nested:false,
		group:false,
		multiple:true
	}
    ```

open /src/app/directive/files.directive.ts in your code editor
* as you can see this lab is very repetitive 
* there is a fn getFields, and the fields arg passed to the fn 
is required for the params in the rest API call REST API
* the subject are direct as intended so you dont not have to use the result as needed
```ts
                    //get a list of all files
                    if(environment.fields.all){

                        getFields({
                            fields:"*"
                        })

                    }
                    //

                    //get a single field for a file
                    if(environment.fields.single){


                        getFields({
                            fields:"files(iconLink)"
                        })

                    }
                    //

                    //get a nested field for a file
                        // use either commeneted
                    if(environment.fields.nested){


                        getFields({
                            fields:"files(lastModifyingUser/displayName)"
                            //  fields:"files(lastModifyingUser(displayName))"
                        })

                    }
                    //

                    //get a nested resources by itself
                        // use either or
                    if(environment.fields.group){


                        getFields({
                            // fields:"files(capabilities)"
                            // fields:"files(capabilities/*)"
                            fields:"files(capabilities(*))"
                        })


                    }

                    //get multiple resources
                        // use either or
                    if(environment.fields.multiple){


                        getFields({
                            fields:"files(ownedByMe,hasThumbnail,capabilities(*))"
                        })


                    }
                    //
```
