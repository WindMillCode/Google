# Upload File Data using Google Drive API

## Task 1 Web Application 

* download the [web app](https://github.com/codequickie123/AngularDriveApp)
* download the test files [here](https://github.com/codequickie123/Google/tree/master/API/drive/vids/Upload_File_Data) to upload or get 2 files 1 smaller than 5mb and one bigger than 5mb
    * place in a seperate folder 


*  terminal 1 
```bash
cd [root of project folder]
npx ng serve -c=upload --open=true
```

open devTools in the browser


at the end of this lab, the code should look like 
/src/app/directive/upload.directive.final.ts



## Task 2 setup up credentials

open /src/app/directive/upload.directive.ts in your code editor
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

open /src/app/directive/upload.directive.ts in your code editor
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
    

        // simple upload 
        //


        // multipart upload 
        //	

        // resumable upload 
        //		
        




    })
    .catch(function (error) {
        console.log(error)
    })
});
```


## Task 4 perform a simple upload 


open /src/app/directive/upload.directive.ts in your code editor

* in simple upload paste
```ts
if (environment.upload.simple) {
    fileUpload.files[0].text() 
    .then((text) => {

        gapi.client.request({
            'path': 'https://www.googleapis.com/upload/drive/v3/files',
            'method': 'POST',
            'params': { 'uploadType': 'media' },
            'headers': {
                'Content-Type': 'application/json',
                'Content-Length': fileUpload.files[0].size
            },
            'body': text
        }).execute((a) => {
            console.log(a)
        })
    })
}
```

* open /src/environments/environment.drive.dev.ts in your code editor
* in replace upload object here
```ts
upload:{
    simple:true,
    multipart:false,
    resumable:false
},
```

* now upload simple.ts.json and check your drive

## Task 5 perform a multipart upload

* good when you need to add metadata to files

* open /src/environments/environment.drive.dev.ts in your code editor
* in replace upload object here
```ts
upload:{
    simple:false,
    multipart:true,
    resumable:false
},
```
open /src/app/directive/upload.directive.ts in your code editor

* in multipart upload  paste
```ts
if (environment.upload.multipart) {


    // console.log(img) 
    fileUpload.files[0].text() //doesnt work for IE
        .then((pdf) => {
            var fileName = 'multipart.json';
            var contentType , uploadContentType = 'application/json'
            var metadata = {
                'name': fileName,
                'mimeType': contentType
            };


            // preparing the multipart body
            //


        })



}
```

* in preparing the multipart body paste
```ts
            const boundary = 'xyz'
            const delimiter = "\r\n--" + boundary + "\r\n";
            const close_delim = "\r\n--" + boundary + "--";

            var multipartRequestBody =
                delimiter +
                'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
                JSON.stringify(metadata) +
                delimiter +
                'Content-Type: ' + uploadContentType + '\r\n\r\n' +
                pdf +
                close_delim;

            gapi.client.request({
                'path': 'https://www.googleapis.com/upload/drive/v3/files',
                'method': 'POST',
                'params': { 'uploadType': 'multipart' },
                'headers': {
                    'Content-Type': 'multipart/related; boundary=' + boundary
                },
                'body': multipartRequestBody
            }).execute((a) => {
                console.log(a)
            })
```

* upload the multipart.ts.json or a file smaller than 5mb

## Task 6 perform a resumable upload

* good for files > 5mb


* open /src/environments/environment.drive.dev.ts in your code editor
* in replace upload object here
```ts
upload:{
    simple:false,
    multipart:false,
    resumable:true
},
```

* in resumable upload paste
```ts
if (environment.upload.resumable) {

    
    resumable({
        http,
        fileUpload,
        resumableError: 'false'
    })


}
```

* in tell google were going to have a resumable session uplaoad
```ts
function resumable(
	devObj: {
		http: HttpClient,
		fileUpload: HTMLInputElement 
		resumableError: String // true false as boolean
	}
) {

	// we need a lot of info about the file and we need to setup our data to support GCP resumable requires
	//


	// make a post request (as well get the file content) to get the resumable session URL
	combineLatest([
		from(fileUpload.files[0].text()),
		http.post(
			"https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable",
			{ name: "resumable.txt", mimeType: "text/plain" },
			{ headers, observe: 'response' }
		)
	])
	.pipe(
		catchError((error) => {
			console.error(error)
			return of([])
		})
	)
	.subscribe((result) => {

        //starting the upload
        //
		
		//indicate where we are in the upload
		console.log(headers.get("Content-Range"))
		//

		chunked({
			http,
			fileUpload,
			resumableError,
			url: resumableURL,
			fileContent,
			headers,
			fileSize,
			chunk,
			offset: 0
		})


	})
	//


}
```

* in  we need a lot of info about the file and we need to setup our data to support GCP resumable requires paste
    * we need the full fileSize so the driveAPI can section accordinly
    * the chunks that shold be sent are in 256 kB blocks, that is the API requirement
    * however if the file is not > 5mb and the api allows for resumable, we indicate the end range is fileSize - 1
    * if were not using the SDK always have to include the access token for yr Oauth 2.0 apps
```ts
    let { http, fileUpload, resumableError } = devObj
    let fileSize = Math.round(fileUpload.files[0].size )
    let chunk = 256 * 1024
    chunk = chunk > fileSize ? fileSize - 1 : chunk
    let fileName = fileUpload.files[0].name
    let headers = new HttpHeaders()
    headers = headers
        .set("Authorization", `Bearer ${gapi.auth.getToken().access_token}`)
```

* in starting the upload paste this code    
    * if you dont know the file size replace ${fileSize} with *
	*  if you dont knwo the fileSize do offset-chunkSize/*
	* if you dont know both */*		
    * we need the  resumableURL we get this from the location header in the response
    * the fileContent is the data we will send
```ts
let headers = new HttpHeaders({
    "Content-Range": `bytes 0-${chunk}/${fileSize}`,
})
let fileContent = result[0]
let resumableURL = result[1].headers.get('Location')

```

* in your upload session paste
```ts
function chunked(devObj) {

	let { http, url, fileContent, headers, offset, fileSize, chunk, resumableError, fileUpload } = devObj

	http.put(
		url,
		fileContent.substring(offset, chunk + 1), // becuase of the error
		{ headers, observe: 'response' }
    )   
    // send all responses to the subscribbe callback

    //
    .subscribe((result) => {


        // the file has finished uploading

        // 

        //you need to upload more chunks
        //


        //we get an error where we have to restart the upload
        //



    })


}
```

* in  send all responses to the subscribbe callback paste
    * angular thinks 308 is an error, for Google API its not so you need to pipe and pass the error on  to be dealt with 
    * we need to pipe any way because in subscribe call back we handle all the HTTP status codes
```ts
		.pipe(
			catchError((error) => {
				return of(error) // angular http thinks 308 is an error, GCP drive API uses to indicate incomplete
			})
		)
```

### Handling different responses

* this calls for complex algorthims, however if you know yr langauge control flow well you can shorten yr code
__control flow__ the algorithms and data structures your programming language has in place to provide soltuions for everyday coding problems

* in you need to upload more chunks paste this code
    * we need to update the offset to start at the next chunk of the file we'll send 
    * we use the response Range paramter to indicate where we are in the upload useful control flow if bytes went missing
    * the total chunk repersented by chunk cannot be greater than the file size, the drive does not want this
    * we cause a 4xx error to show what we do when we come across an error
    * there can be 4xx 5xx error in production come across and handle appropriately
```ts
if (result.status === 308) {
    let newOffset = parseInt(result.headers.get('Range').split("-")[1]) + 1
    let chunk = newOffset + (256 * 1024)
    chunk = chunk > fileSize ? fileSize - 1 : chunk
    let headers: any = new HttpHeaders({
        "Content-Range": `bytes ${newOffset}-${chunk}/${fileSize}`,
    })
    console.log(headers.get("Content-Range"))


    //cause a 4xx
    if (newOffset > 1000000 && resumableError === 'false') {
        headers = new HttpHeaders({
            "Content-Range": `bytes ${newOffset}-${chunk}/2`,
        })
        resumableError = 'true'
    }
    //


    chunked({
        http,
        fileUpload,
        resumableError,
        url,
        fileContent,
        headers,
        fileSize,
        chunk,
        offset: newOffset
    })
}
```

* in we get an error where we have to restart the upload paste
    * we get errors where we need to continue the upload or just see what happened with the chunks and update accodingly, 
    * practically we want to see if the chunks got uploaded properly or well get a corrupted file our endusers wont understand, you want to find a library that can help 
    * however if the app is not that serious go  ahead and restart the session
    * also if the upload has be stuck and it has been a week the resumable session URL experies one week so u need a new one
```ts
		if(result.status === 400){


			resumable({
				http,
				fileUpload,
				resumableError
			})
			
			
		}
```

*  for the file has finished uploading paste
    * make a component pop up, interact with the user, here in this simple app we just provide an alert
```ts
if (result.status === 200 || result.status === 201) {
    alert('file uploaded')
}
```

* go ahead and upload resumable.txt from the app or a file bigger than 5mb
