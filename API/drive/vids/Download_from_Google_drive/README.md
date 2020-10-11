# Downloading Files with Google Drive API

## Task 1 Web Application 

* download the [web app](https://github.com/codequickie123/AngularDriveApp)
* download the folders in a seperate folder [here](https://github.com/codequickie123/Google/tree/master/API/drive/vids/Download_from_Google_drive)


* at the end of this lab your result shoul dlook like src/app/directive/download.directive.final.ts

* in terminal 1
```bash
npx ng serve -c=download --open=true
```

## Task 2 setup up credentials

open /src/app/directive/download.directive.ts in your code editor
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

open /src/app/directive/download.directive.ts in your code editor
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


        // download a file from Google drive
        //

        // download a gSuite doc
        //

        // partial download
        //


    })
    .catch(function (error) {
        console.log(error)
    })
});
//
```

## Task 3 Select all files from Google Drive

* in get our files paste this code
    * we make a get request to the url to get all our files
    * to filter for the ones we need we use a forEach and the end dev gives a function which is provided each file resource object one by one
```ts
function getAllFiles(devObj) {

    let {fn,http,headers} = devObj
    //get all the files in the drive including in trash
    http.get(
        "https://www.googleapis.com/drive/v3/files",
        { headers, observe: 'response' }
    )
    .subscribe((result: any) => {

        //filter for needed files
        try{
            result.body.files
            .forEach((x:any,i)=>{
                let ans = fn({
                    file:x
                })
                if(ans === 'done'){
                    throw('e')
                }
            })
        }
        catch(e){}
        //


    })
    //
}
```

## Task 4 Download a regular file

* upload download_me.txt to google drive
* open /src/environment/environment.drive.dev.ts
* in replace download object here paste
```ts
download:{
	drive:true,
	gSuite:false,
	partial:false
},
```

* open /src/app/directive/download.directive.ts

* in download a file from Google drive paste 
```ts
if (environment.download.drive) {


    let headers = new HttpHeaders()
    headers = headers
        .set("Authorization", `Bearer ${gapi.auth.getToken().access_token}`)

    getAllFiles({
        http,
        headers,
        fn:(devObj)=>{

            // if we find the file stop the outer loop
            let fileId
            let ans
            if(devObj.file.name==='download_me.txt'){
                fileId = devObj.file.id
                ans = 'done'

                // download the file
                //
            }
            //

            return ans
        }
    })

}
```

* in download the file paste
    * we make a get request with the target fileId
```ts
http.get(
    "https://www.googleapis.com/drive/v3/files/" + fileId,
    {
        headers:{
            "Authorization": `Bearer ${gapi.auth.getToken().access_token}`,
        },
        observe: 'response',
        responseType: 'text',
        params: {
            // fileId,
            alt: 'media'
        }
    }
)
.subscribe((result: any) => {
    console.log(result.body) // yr file content
})
```

* make a folder and replace the download_me.txt, for Folder1
* whats the error we get
* rmbr folders are a way to organize files in google drive they are not meant for anything else, get all files with the parent set to the target parent id as needed

## Task 5 Download a gSuite doc


* go to this [site](https://docs.google.com)
* click on any resume options and name it My_Gdoc_resume, 
* in google drive make sure you see it

* open /src/environment/environment.drive.dev.ts
* in replace download object here paste
```ts
download:{
	drive:false,
	gSuite:true,
	partial:false
},
```

* for download a gSuite doc paste this code
    * we cant download it as is if you going into the UI for the gSuite doc and download, you cant there either so it makes sense
```ts
if (environment.download.gSuite) {


    let headers = new HttpHeaders()
    headers = headers
        .set("Authorization", `Bearer ${gapi.auth.getToken().access_token}`)

    //get all the files in the drive including in trash
    http.get(
        "https://www.googleapis.com/drive/v3/files",
        { headers, observe: 'response' }
    )
    .subscribe((result: any) => {

        let fileId = ""
        result.body.files
            .forEach((x: any, i) => {
                if (x.name === "My_Gdoc_resume") {
                    fileId = x.id
                }
            })

        // this is an export
        //

    })

}
```

* for this is an export paste
    * pay attention to the mimeType, here is what you can change
    * try
        * application/msword
        * application/vnd.oasis.opendocument.text
        * application/zip
    * for a list of commom [mime types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)
```ts
http.get(
    "https://www.googleapis.com/drive/v3/files/" + fileId + "/export",
    {
        headers,
        observe: 'response',
        responseType: 'text',
        params: {
            // fileId,
            alt: 'media',
            mimeType: 'application/pdf'
        }
    }
)
.pipe(
    catchError((err: any) => {
        console.log(err.error)
        return of([])
    })
)
.subscribe((result: any) => {
    console.log(result.body) // yr file content
})
```

## Task 6 Partial Download
* upload partial.txt to google drive

* open /src/environment/environment.drive.dev.ts
* in replace download object here paste
```ts
download:{
	drive:false,
	gSuite:false,
	partial:true
},
```

* partial means that we dont want the whole file we want a piece, google allows for this in bytes so you have to understand how to divide yr files to bytes in your application
* for partial download paste this code
```ts
if (environment.download.partial) {


    let headers = new HttpHeaders()
    headers = headers
        .set("Authorization", `Bearer ${gapi.auth.getToken().access_token}`)

    getAllFiles({
        http,
        headers,
        fn:(devObj)=>{

            // if we find the file stop the outer loop
            let fileId
            let ans
            if(devObj.file.name==='partial.txt'){
                fileId = devObj.file.id
                ans = 'done'

                // partial download here
                //                
            }
            //



            return ans
        }
    })
}
```

* for partial download here paste
    * the important part is the Range header, play with it
        * negative numbers
        * bigger than the file size
        * several requests with different chunks
```ts
http.get(
    "https://www.googleapis.com/drive/v3/files/" + fileId,
    {
        headers:{
            "Authorization": `Bearer ${gapi.auth.getToken().access_token}`,
            "Range": "bytes=500-599"
        },
        observe: 'response',
        responseType: 'text',
        params: {
            // fileId,
            alt: 'media'
        }
    }
)
.subscribe((result: any) => {
    console.log(result.body) // yr file content
})
```

