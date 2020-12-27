# Creating Shortcuts with Google Drive API

## Task 1 Web Application 

* download the [web app](https://github.com/codequickie123/AngularDriveApp)


* at the end of this lab your result shoul dlook like src/app/directive/shortcut.directive.final.ts

* if you ruin the lab copy and paste the contents of shortcut.directive.start.ts

* in terminal 1
```bash
npx ng serve -c=shortcut --open=true
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
        

        //create a shortcut

        //

        //serch for  a shortcut

        //


    })
    .catch(function (error) {
        console.log(error)
    })
});
//
```

## Task 4 create a shortcut
in environment.drive.dev.ts in //replace shortcut object here replace with this code
```ts
    shortcut:{
        create:true,
        search:false
    },
```

in shortcut.directive.ts

in 'create a shortcut' paste this code
```ts
if (env.shortcut.create) {

    //comment  or delete once My Shortcut Folder is created
    // envSetup({http, headers});
    //

    // choose a file for shortcut
    //

    //make the shortcut, check the root folder once done

    //

}
```

* for the code in 'comment  once My Shortcut Folder is created'
uncomment and start the app, 
upload sample files from your desktop and allow the app to crete My Shortcut Folder in Google Drive. Within the file you should see the files you have uploaded 
* after comment or delete the line'envSetup({http, headers});'

* in 'choose a file for shortcut' paste this code
    * this will have the app choose a random file to make a short cut from
```ts
getShortcutFolder({http, headers,shortcutFiles});
```

* in 'make the shortcut, check the root folder once done' paste this code
    * this is how to make a shortcut
```ts
shortcutFiles.sub
.pipe(
catchError((error)=>{
    return of(error)
})
).subscribe((result:any)=>{
    console.log(result)
    shortcutFiles.file = result.files[Math.floor(Math.random()*(result.files.length))]
    http.post(
        "https://www.googleapis.com/drive/v3/files",
        {
            name: "My Shortcut",
            //to create a folder this must be included
            mimeType: "application/vnd.google-apps.shortcut",
            'shortcutDetails':{
                targetId:shortcutFiles.file.id
            }
            //
        },
        { headers, observe: 'response' }
    )
    .subscribe((result) => {
        console.log(result)
    })
})
```

## Task 5 search for a shortcut
in environment.drive.dev.ts in //replace shortcut object here replace with this code
```ts
    shortcut:{
        create:false,
        search:true
    },
```

in shortcut.directive.ts


* in serach for a shortcut paste this code
```ts
if(env.shortcut.search){


    http.get(
        "https://www.googleapis.com/drive/v3/files",
        {
            headers,
            params:{
                q:"mimeType='application/vnd.google-apps.shortcut'",
                //AND shortcutDetails.targetMimeType = ‘application/vnd.google-apps.spreadsheet’ // for more detail
                fields: 'files(id, shortcutDetails,name)',
            }
        }
    )
    .subscribe((result: any) => {
        console.log(result)
    })
}
```