# Drive API
* this documentation is for v3 



* Create a dedicated Drive folder to store your application’s data so that the app cannot access all the user's content stored in Google Drive.

*   Integrate with the Google Drive UI


### Messages

Greetings I am currently going to get several GCP certifications. Like share Subscribe to my youtube channel as I do tutorials on the fundamentals and advanced concepts of GCP. Any advice for  education and career prospects will be appreciated .  https://www.youtube.com/channel/UCmqEX_zasOf3AQ9vnPkxtjg/


Greetings I have high interest in becoming a data engineer managing and working with IoT infrastructure. I would love a mentorship who can help me build my portiflio and gain the needed certifications and education. I also have a youtube channel as I do tutorials on the fundamentals and advanced concepts of GCP, please like share and subscribe at least if you dont have time to mentor. .  https://www.youtube.com/channel/UCmqEX_zasOf3AQ9vnPkxtjg/


###  Lab Building A Simple App That Can Access Google Drive

## Files and folders overview

* stored as a File resources


### Ownership

* single drive, one user owns
* shared drive, a organization owns

### File types

* everything is a file

* __Blob__ -  A file that contains text or binary content such as images, videos, and PDFs.

* __Folder__ - A container you can use to organize other types of files on Drive aka application/vnd.google-apps.folder

* __Shortcut__ -  A metadata-only file that points to another file on Google Drive aka application/vnd.google-apps.shortcut
 
* __Third-party shortcut__ -   A metadata-only file that links to content stored on a third-party storage system aka application/vnd.google-apps.drive-sdk

* __G Suite document__ -  G Suite application, such as Google Docs, Sheets, and Slides, creates aka application/vnd.google-apps.*app*

### File characteristics

* __File ID__ - A unique opaque ID for each file, they dont change

* __Metadata__ - This data includes the name, type, creation and modification times ,  capabilities,  capabilities ...

* __Permission__ - An access grant for a user, group, domain or the world to access a file or a folder hierarchy.

* __Content__ - The binary or text body of the file

* __Revision history__ - changes to file content

* __Thumbnail__ - A graphical icon for a file


### File organization

* The Drive API organizes files into storage locations, called spaces, and collections, called corpora.

* __Spaces__ - got the drive spaces for users, App data folder space - for apps not for users, and photos space, for peoples photos

* __Corpora__ -[corpora_anchor]
Collections of files used to narrow the scope of file and folder searches. like a bigquery partiton or cluster 
    * enum 
        * user, domain, drive, and allDrives


## File metadata
* reference [here](https://developers.google.com/drive/api/v3/reference/files#methods)
* use this reference for the rest of the readme

## Google Mime types
* [here](https://developers.google.com/drive/api/v3/mime-types)

## Create files 

* to create an empty file [refrence](https://developers.google.com/drive/api/v3/reference/files/create)
    files.create
    * this automatically uploades a file to google drive

### TypeScript

```ts
gapi.client.drive.files.create({
    name:'medi.PNG', //optional
    media: 'media',  //optional
    fields: 'id'     //optional
})
.then(function (a,b,c){	
    console.log(a)
})
```
### Upload thumbnails

* to upload a thumbnail 
    * contentHints.thumbnail
        * thumbnail.image to the URL-safe Base64-encoded image
        * thumbnail.mimeType to the appropriate type for the image format

* if drive can generate a thumbnail it ignores yours
* very annoying to upload thumbnails    


### TypeScript
```ts
/*  go to https://static.skillshare.com/uploads/project/413d60c0dac2da6c97f939829fd1a064/9d28e322 and covert to base64  using https://www.base64-image.de/, the replace the image var with the data url string, 
*/
image =`needed string data:base-64 [MIME/TYPE] ...`
image = btoa(image)
gapi.client.drive.files.create({
    // resource: fileMetadata,
    name: 'medi.PNG',
    media: 'media',
    fields: 'id',
    contentHints: {
        thumbnail: {
            image,
            mimeType: "image/jpg"
        },
    },
})
.then(function (a, b, c) {
    console.log(a)
})
```
    
## Upload File Data

* 3 types 
__Simple upload__ -  to quickly transfer a small media file (5 MB or less) without supplying metadata
__Multipart upload__ -  to quickly transfer a small file (5 MB or less) and metadata that describes the file, in a single request
__Resumable upload__ -  for large files (greater than 5 MB) and when there's a high chance of network interruption 
 

###  simple upload

#### TypeScript
```ts
fileUpload.files[0].text() //doesnt work for IE
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
```


### multipart upload 
    * this is the option you most likely want to start with
#### TypeScript
```ts
// console.log(img) 
fileUpload.files[0].text() //doesnt work for IE
    .then((pdf) => {
        var fileName = 'multipart.json';
        var contentType = 'application/json'
        var metadata = {
            'name': fileName,
            'mimeType': contentType
        };

        const boundary = 'xyz'
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";

        var multipartRequestBody =
            delimiter +
            'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
            JSON.stringify(metadata) +
            delimiter +
            'Content-Type: ' + contentType + '\r\n\r\n' +
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
    })
```




### to perform a resumable upload
1. Send the initial request and retrieve the resumable session URL
2. Upload the data and monitor upload state.
3. (optional) If upload is disturbed, resume the upload.

* the most i    


#### TypeScript
```ts

/// I can place the function call first  due to hoisting, if intimidated by the code just copy paste in  a lib in ur app and run the function call


resumable({ // the types for the args are in the paramaters for the function 
    http, 
    fileUpload,
    resumableError:'false'
})
function resumable(
	devObj: {
		http: HttpClient,
		fileUpload: HTMLInputElement 
		resumableError: String // true false as boolean
	}
) {


	let { http, fileUpload, resumableError } = devObj

	let fileSize = Math.round(fileUpload.files[0].size / 10)
	let newCap = 256 * 1024
	let fileName = fileUpload.files[0].name
	let headers = new HttpHeaders()
	headers = headers
		.set("Authorization", `Bearer ${gapi.auth.getToken().access_token}`)



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
			let headers = new HttpHeaders({
				"Content-Range": `bytes 0-${newCap}/${fileSize}`,
			})
			let fileContent = result[0]
			let resumableURL = result[1].headers.get('Location')
			console.log(fileSize)
			console.log(headers.get("Content-Range"))
			chunked({
				http,
				fileUpload,
				resumableError,
				url: resumableURL,
				fileContent,
				headers,
				fileSize,
				newCap,
				offset: 0
			})


		})


}


function chunked(devObj) {

	let { http, url, fileContent, headers, offset, fileSize, newCap, resumableError, fileUpload } = devObj

	http.put(
		url,
		fileContent.substring(offset, newCap + 1), // becuase of the error
		{ headers, observe: 'response' }
	)
		.pipe(
			catchError((error) => {
				return of(error) // angular http thinks 308 is an error, GCP drive API uses to indicate incomplete
			})
		)
		.subscribe((result) => {

			//you need to upload more chunks
			// if you dont know the positions do */fileSize
			// if you dont knwo the fileSize do offset-chunkSize/*
			//if you dont know both */*


			if (result.status === 200 || result.status === 200) {
				alert('file uploaded')
			}

			else if (result.status === 308) {
				let newOffset = parseInt(result.headers.get('Range').split("-")[1]) + 1
				let newCap = newOffset + (256 * 1024)
				newCap = newCap > fileSize ? fileSize - 1 : newCap
				let headers: any = new HttpHeaders({
					"Content-Range": `bytes ${newOffset}-${newCap}/${fileSize}`,
				})
				console.log(headers.get("Content-Range"))


				//cause a 4xx
				if (newOffset > 1000000 && resumableError === 'false') {
					headers = new HttpHeaders({
						"Content-Range": `bytes ${newOffset}-${newCap}/2`,
					})
					resumableError = 'true'
				}
				console.log(resumableError)
				//


				chunked({
					http,
					fileUpload,
					resumableError,
					url,
					fileContent,
					headers,
					fileSize,
					newCap,
					offset: newOffset
				})
			}


			//we get an error where we have to restart the upload
			else if(result.status === 400){


				resumable({
					http,
					fileUpload,
					resumableError
				})
				
				
			}
			//



		})


}





```

### Import to Google Docs types
* you can convert a file to a g suite doc
* to see if you can use the drive.about.get method fields parameter is required
__G Suite Doc__ - google sheets ,google slides, a google office document
* , specify the G Suite mimeType when creating the file.
* use ocrLanguage parameter to convert image words to text


### Define indexable text for unknown file types
* To allow content searches use contentHints.indexableText
    - API must be uploading a file of unknown mimeType
    * size is more than 128KiB.
    * no need to order words    
    * yr app should update the parameter every time
    



### [Lab Upload File Data using Google Drive API](./vids/Upload_File_Data/README.md)

## Create and populate folders

* folders are only files that contain metadata used to organize google drive

### Create a folder

* To create a folder, use the files.create method with the application/vnd.google-apps.folder MIME type and a title.
* make a post request to https://www.googleapis.com/drive/v3/files with that mimeType

#### TypeScript

```ts
let headers = new HttpHeaders()
headers = headers
    .set("Authorization", `Bearer ${gapi.auth.getToken().access_token}`)

http.post(
    "https://www.googleapis.com/drive/v3/files",
    { name: "My Folder", mimeType: "application/vnd.google-apps.folder" },
    { headers, observe: 'response' }
)	
.subscribe((result)=>{
    console.log(result)
})					
```

### Moving files between folders

* to move a file around use files.update with addParents removeParents
```ts
let headers = new HttpHeaders()
headers = headers
	.set("Authorization", `Bearer ${gapi.auth.getToken().access_token}`)

//get all the files in the drive
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
	//

})
//
```

### [Lab Working with Folders using Google Drive API](./vids/Working_With_Folders/README.md)


## Download files

### Download a file stored on Google Drive
* use files.get, with the parameter alt=media, to indicate a download is needed
* for REST API you use the fileId in the path and the alt=media as a query param

#### Typescript
```ts
let headers = new HttpHeaders()
headers = headers
	.set("Authorization", `Bearer ${gapi.auth.getToken().access_token}`)

//get all the files in the drive including in trash
http.get(
	"https://www.googleapis.com/drive/v3/files",
	{ headers, observe: 'response' }
)
.subscribe((result: any) => {

	let fileId = result.body.files[0].id
	http.get(
		"https://www.googleapis.com/drive/v3/files/" + fileId,
		{
			headers,
			observe:'response',
			responseType:'text',
			params:{
				alt:'media'
			}
		}
	)
	.subscribe((result:any)=>{
		console.log(result.body) // yr file content
	})

})

}
//
```

### Download a Google Workspace Document
* use the files.export method with the param alt.media
* with REST API make a GET to the "https://www.googleapis.com/drive/v3/files/" + fileId + "/export", url with alt=media and mimeType=[supported mime type] 

* for gSuite docs, the file extension is not included so heres a list 
* so it cannot be download as the original document, just as in the UI you must choose a different supported mimeType to download the  file in

* FIXME link is from [2012](https://fileinfo.com/help/google_drive_file_types)

|extension|type|desctiption|
|:------|:------:|------:|
|.gdoc|Google Drive Document||
|.gslides|Google Drive Presentation||
|.gsheet|drive spreadsheet||
|.gtable|Google Drive Fusion Table||
|.gdraw|Google Drive Drawing||
|.gform|	Google Drive Form|


#### Typescript
```ts
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
	.forEach((x:any,i)=>{
		if(x.name === "My_Gdoc_resume"){
			fileId = x.id
		}
	})

	http.get(
		"https://www.googleapis.com/drive/v3/files/" + fileId + "/export",
		{
			headers,
			observe:'response',
			responseType:'text',
			params:{
				alt:'media',
				mimeType:'application/pdf' 
			}
		}
	)
	.pipe(
		catchError((err)=>{
			console.log(err.error)
		})
	)
	.subscribe((result:any)=>{
		console.log(result) // yr file content
	})

})
```

### Partial Download
* whats important here is the Range header, sent in amount of bytes
* good for applications that store data in files and can be split by bytes
* if you error here it fails gracefully so make sure the numbers are correcct
```ts
// partial download here
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
//
```


## Search for files and folders
* use the files.list method
* REST API: http.get to https://www.googleapis.com/drive/v3/files/
### Search for all files and folders on the current user's My Drive

* use the files.list method
* use without any pararmeters
* REST API: http.get to https://www.googleapis.com/drive/v3/files/ with no parameters

#### Typescript
```ts
http.get(
	"https://www.googleapis.com/drive/v3/files",
	{ headers, observe: 'response' }
)
.subscribe((result: any) => {

})
```

## Search for specifc files
* we use the q prop in our params to find this
* the logic is setup where  q is the key
```
q: [query_term] [operator] [values]
```

__query_term__ - more like the key, a key on a sample resource file object
__operator__ - a comparison operator
__values__ - string or regex yr looking for

[examples](https://developers.google.com/drive/api/v3/search-files#query_string_examples)

[reference](https://developers.google.com/drive/api/v3/ref-search-terms#operators)

```ts
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
			fields: 'files(id, starred,name)', // not the focus but this is how you get different file properties
		}
	}
)
.subscribe((result: any) => {
	console.log(result)
})
```

## Search by corpora
* the files.list method default is 
```
corpora:user
```
to search different corpora choose from the enum earlier in this document
[here]()
__enum__ - comp sci term for "acceptable options"

# Issues with the DRIVE API 

* uploading file content that indicate an image specifcally jpegs seems to corrpt the file, XHR on the data is a bit corroupted, but getting the from HTMLInputElement file upload provides identical binary in the text editor, find how to modify the data before sending it to google drive
    *i got the api to react [here](https://stackoverflow.com/questions/63422138/how-to-upload-file-into-specific-folder-with-google-drive-api-and-python/64204197#64204197)

* Import to Google Docs types 
    *  im getting the needed gsuite doc, however the fileContent is not coming along

* Define indexable text for unknown file types
    * I just dont know how to setup the API call

* for some reason through web user interface, if you give the api key once, and you give an empty string again for the API key, the api key still works how should I go about reporting this

* viewersCanCopyContent = false still allows for download

* i dont get viewing files in the browser, can I just use embed how do I get the whole files reosurce object


[here](corpora_anchor)