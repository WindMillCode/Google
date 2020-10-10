# Working with Files in Gooogle Drive API

## Task 1 Web Application 

* download the [web app](https://github.com/codequickie123/AngularDriveApp)

* at the end of this lab your result shoul dlook like src/app/directive/folders.directive.final.ts

## Task 2 setup up credentials

open /src/app/directive/files.directive.ts in your code editor
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


## Task 3 Connect to the API

open /src/app/directive/folders.directive.ts in your code editor
* in load the auth SDK
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
    

        //create a folder
        //


        //move files around
        //	
        

    })
    .catch(function (error) {
        console.log(error)
    })
});
```


## Task 4 Create a folder

* open src/environment/environment.drive.dev.ts 

in replace folders object here paste
```ts
	folders:{
		create:true,
		moveFiles:false
	},
```

* open /src/app/directive/folders.directive.ts in your code editor
in create a folder paste
* the important part is the mimeType in the the json for the the request body 
    it must be  "application/vnd.google-apps.folder" for a folder to be created
```ts
    if (environment.folders.create) {


        let headers = new HttpHeaders()
        headers = headers
            .set("Authorization", `Bearer ${gapi.auth.getToken().access_token}`)

        http.post(
            "https://www.googleapis.com/drive/v3/files",
            {
                name: "My Folder",
                //to create a folder this must be included
                mimeType: "application/vnd.google-apps.folder"
                //
            },
            { headers, observe: 'response' }
        )
            .subscribe((result) => {
                console.log(result)
            })


    }
```

open yr drive to see the folder

## Task 5 Move files around folders

* open src/environment/environment.drive.dev.ts 

in replace folders object here paste
```ts
	folders:{
		create:false,
		moveFiles:true
	},
```


in your google drive
    * make 2 folders named Folder1 and Folder2
    * in Folder1 make a file multipart.json 

* open /src/app/directive/folders.directive.ts in your code editor
in move files around folders paste
```ts
if (environment.folders.moveFiles) {


    // to move anything you need Id
    //

    let headers = new HttpHeaders()
    headers = headers
        .set("Authorization", `Bearer ${gapi.auth.getToken().access_token}`)

    //get all the files in the drive including in trash
    //


}
```

* in to move anything you need Id paste
    * even if 2 folders have the same, every item in google drive has it own id to unique identify it, use these to perform operations other than create
```ts
    let folders = {
        a: { id: '' },
        b: { id: '' },
        target: { id: '' }
    }
```

* in get all the files in the drive
    * this includes files in the trash 
    * now we have our files what we do next is identify the files by metadata, in this case name
    but for you application identify as needed
```ts
    http.get(
        "https://www.googleapis.com/drive/v3/files",
        { headers, observe: 'response' }
    )
    .subscribe((result: any) => {

        //gather the ids
        result.body.files
        .forEach((x: any, i) => {
            if (x.name === 'multipart.json') {
                folders.target.id = x.id
            }

            else if (x.name === 'Folder1') {
                folders.a.id = x.id
            }

            else if (x.name === 'Folder2') {
                folders.b.id = x.id
            }
        })

        console.log(folders)        
        //


        // move the file from a to b
        //

    })
```

* in move the file from a to b paste
    * this is a HTTP PATCH request, if u havent seen it its protocol used to modify a ressouce, in this case we use the id, to modify the directory tree of the file, 
    * notice if we have a bigger directory tree, we dont need the whole directory, just the target parent directory id
```ts
http.patch(
    `https://www.googleapis.com/drive/v3/files/${folders.target.id}`,
    { fields: 'id, parents', addParents: folders.b.id },
    {
        headers,
        observe: 'response' ,
        params:{
            fields: 'id, parents',
            addParents: folders.b.id,
            removeParents:folders.a.id
        }
    }
)
.subscribe((result) => {
    console.log(result)
})
```



