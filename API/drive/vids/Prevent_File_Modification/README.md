# Prevent File Modification with Google Drive API

## Task 1 Web Application 

* download the [web app](https://github.com/codequickie123/AngularDriveApp)


* at the end of this lab your result shoul dlook like src/app/directive/lock.directive.final.ts

* if you ruin the lab copy and paste the contents of lock.directive.start.ts

* in terminal 1
```bash
npx ng serve -c=lock --open=true
```

## Task 2 setup up credentials

open /src/app/directive/fields.directive.ts in your code editor
* in paste credentials here paste this code
```ts
let CLIENT_ID = env .googleDrive.clientId
let API_KEY = env.googleDrive.apiKey
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

        let headers = new HttpHeaders()
        headers = headers.set("Authorization", `Bearer ${gapi.auth.getToken().access_token}`)
        

        //lock  file

        //

        //unlock a file

        //


    })
    .catch(function (error) {
        console.log(error)
    })
});
//
```

## Task 4 lock a file
* If there are no files in your google drive make a new gdoc in your google drive
    * If need be, replace result.id with the id of the gdoc 
in environment.drive.dev.ts in //replace lock object here replace with this code
```ts
lock:{
    create:true,
    delete:false
},
```

in lock.directive.ts

in 'create a lock' paste this code
```ts
if (env.lock.create) {

    getFile({http,headers,target})
    target.sub
    .pipe(
    catchError((error)=>{
        return of(error)
    })
    )
    .subscribe((result:any)=>{
        console.log(result)
        target.file = result[0]
        http.patch(
            "https://www.googleapis.com/drive/v3/files/"+result.id,
            {
                contentRestrictions:[
                    {"readOnly": "true"}
                ]
            },
            {
                headers
            }
        )
        .pipe(
        catchError((error)=>{
            return of(error)
        })
        ).subscribe((result:any)=>{
            console.log(result)
        })
    })

}
```



## Task 5 unlock a file 
in environment.drive.dev.ts in //replace lock object here replace with this code
```ts
    lock:{
        create:false,
        delete:true
    },
```

in lock.directive.ts


* in  'unlock a file' paste this code
```ts
if(env.lock.delete){

    getFile({http,headers,target})
    target.sub
    .pipe(
    catchError((error)=>{
        return of(error)
    })
    )
    .subscribe((result:any)=>{
        console.log(result)
        result.forEach((x:any,i)=>{
            if(x.contentRestrictions?.[0].readOnly){
                http.patch(
                    "https://www.googleapis.com/drive/v3/files/"+x.id,
                    {
                        contentRestrictions:[
                            {"readOnly": "false"}
                        ]
                    },
                    {
                        headers
                    }
                )
                .pipe(
                    catchError((error)=>{
                        return of(error)
                    })
                )
                .subscribe(
                    (result:any)=>{
                        console.log(result)
                    }
                )
            }
        })
    })

}
```