# Drive API
* this documentation is for v3 



* Create a dedicated Drive folder to store your application’s data so that the app cannot access all the user's content stored in Google Drive.

*   Integrate with the Google Drive UI


### Messages

Greetings I am currently going to get several GCP certifications. Like share Subscribe to my youtube channel as I do tutorials on the fundamentals and advanced concepts of GCP. Any advice for  education and career prospects will be appreciated .  https://www.youtube.com/channel/UCmqEX_zasOf3AQ9vnPkxtjg/


Greetings I have high interest in becoming a data engineer managing and working with IoT infrastructure. I would love a mentorship who can help me build my portiflio and gain the needed certifications and education. I also have a youtube channel as I do tutorials on the fundamentals and advanced concepts of GCP, please like share and subscribe at least if you dont have time to mentor. .  https://www.youtube.com/channel/UCmqEX_zasOf3AQ9vnPkxtjg/


###  [Lab Building A Simple App That Can Access Google Drive](API\drive\vids\Building A Simple App That Can Access Google Drive\README.md)

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
 
* check OUT
	files.arrayBuffer()
	FileReader.readAsBinaryString()

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
let reader = new FileReader()
reader.readAsBinaryString(fileUpload.files[0])
reader.onload =(evt) => {

	const boundary = '-------314159265358979323846';
	const delimiter = "\r\n--" + boundary + "\r\n";
	const close_delim = "\r\n--" + boundary + "--";

	let fileData:any = fileUpload.files[0]
	var contentType = fileData.type || 'application/octet-stream';
	var metadata = {
		'name': fileData.fileName,
		'mimeType': contentType
	};

	var base64Data = btoa((reader.result as any));
	var multipartRequestBody =
		delimiter +
		'Content-Type: application/json\r\n\r\n' +
		JSON.stringify(metadata) +
		delimiter +
		'Content-Type: ' + contentType + '\r\n' +
		'Content-Transfer-Encoding: base64\r\n' +
		'\r\n' +
		base64Data +
		close_delim;



	http.post(
		"https://www.googleapis.com/upload/drive/v3/files",
		multipartRequestBody,
		{
			headers:{
				'Content-Type': 'multipart/related; boundary=' + boundary,
				"Authorization": `Bearer ${gapi.auth.getToken().access_token}`
			},
			observe:'response',
			params: {
				'uploadType': 'multipart'
			}
		}
	)
	.subscribe((result)=>{
		console.log(result)
	})


}
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
    
### Pregenereate ID

as an addition say if you need to send the link out to another endpoint and dont have time to wait for a resumable network you can use pregenerated ids instead

the link will look like this 
```
https://drive.google.com/file/d/[ID goes here]/view?usp=sharing
```



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
		{  },
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


### [Lab Downloading Files with Google Drive API](./vids/Download_from_Google_drive/README.md)


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

### Search for specifc files
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

* to get files in a specifc folder
```ts
`'${parent.id}' in parents and trashed = false`,
```

### Search by corpora
* the files.list method default is 
```
corpora:user
```
to search different corpora choose from the enum earlier in this document
[here]()
__enum__ - comp sci term for "acceptable options"


## Return specific fields for a file

* when you ask the API for a file, it only gives a few default fields
* to get the desired fields use the fields object

### Fetching the fields of a nested resource

* TO DO IT 

in REST API  params
__permissions.get__ with __fields=role__ or __fields=*__.
__files.get__ with __fields=files(role)__ or __fields=permissions/role__.
__files.get__ with __fields=files(permissions)__ to imply all fields of the nested resource.
__changes.list__ with __fields=changes(file(permissions(role)))__.

### Formatting rules for the fields parameter

* for more than one field use comma seperated fields
* use / to get to fields nested in other fields
* when you have a.id & b.id access the desired one using __b(id)__
* use an __*__ as a select all wildcard

* sucess 200
* fail 400

### [Lab Fields](./vids/Drive_Fields/README.md)


## Share files, folders and drives

* when it comes to sharing files in google drive, they have this permissions object to get this done
* to share anything you need __role=writer__
* to add a member to a shared drive __role=organizer__

a complete list of roles [here](https://developers.google.com/drive/api/v3/ref-roles)

### Permission propagation

* when you move a file from one folder to another, the file picks up the permission from a new folder
* to remove inherited permissions in a shared drive the changes must take place on the the previous owner
* inherited permissions in my drive can be overridden 

### Capabilities 

* they actually determine what a user can do to an item
* the difference, permissions are what you can change, capabilities is what GCP goes by to determine an allowed action

### Create a permission

* need the type and role
* __type__ - the who (user,group,domain,anyone)
* __role__ - reader,writer,organizer 
* a complete list of roles [here](https://developers.google.com/drive/api/v3/ref-roles)

* type === user,group must provide an emailAddr
* type === domain must provide a domain as well

#### Typescript
```ts
//create a permission
if(environment.share.create){

	
	from(
		gapi.client.drive.files.create({
			name:'share.txt', //optional
			media: 'media',  //optional
			fields: 'id'     //optional
		})
	).subscribe((result:any)=>{
		console.log(result.result.id)
		let id = result.result.id
		http.post(
			"https://www.googleapis.com/drive/v3/files/"+id+"/permissions",
			{
				role:'reader',
				type:'user',
				emailAddress:"NycDailyDeliveries@gmail.com"
			},
			{
				headers,
			}
		).subscribe((result)=>{
			console.log(result)
		})
	})
}

```

### List Permissions
* to list permissions
	* if you want to see what a user is allowed to do ask for capabilities in the fields params
	* for review on fields [here](#return-specific-fields-for-a-file)

#### Typescript
```ts
from(
	gapi.client.drive.files.create({
		name:'listPermissions.txt', //optional
		media: 'media',  //optional
		fields: 'id'     //optional
	})
).subscribe((result:any)=>{
	let id = result.result.id
	http.post(
		"https://www.googleapis.com/drive/v3/files/"+id+"/permissions",
		{
			role:'reader',
			type:'user',
			emailAddress:"yourEmailHere@gmail.com"
		},
		{
			headers,
		}
	)
	.subscribe((result)=>{

		http.get(
			"https://www.googleapis.com/drive/v3/files/"+id+"/permissions",
			{
				headers,
			}
		)
		.subscribe((result)=>{
			console.log(result)
		})
	})
})
```

### Determine the role 

* before you can change permissions you need to determine the role and the entity behind it, especially for items in shared drive
* to do this make a GET request asking for the permissions fields in 
* we will go over this in the lab for the seciton


### Change permissions

* to change permission, you must change  the role

#### Typescript

```ts
http.patch(
	"https://www.googleapis.com/drive/v3/files/"+id.file+"/permissions/"+id.permission,
	{
		role:'commenter',
		// expirationTime: provide a datetime here
	},
	{
		headers,
	}
)
.subscribe((result)=>{
	console.log(result)
})
```

### Revoke access to a file or folder

* when you start sharing, the item is in your shared drive, for the other shared to the item goes to share drive
* to revoke access

#### Typescript
```ts
	http.delete(
		"https://www.googleapis.com/drive/v3/files/"+id.folder+"/permissions/"+id.permission,
		{
			headers,
		}
	)
	.subscribe((result)=>{
		console.log(result) //should be null if sucessful
	})
```

* in My Drive you can delete inherited permissions
* in shared drive inherited permissions cant be revoked, you must update the permission on the parent instead

### Transfer File Ownership
* same logic, if something is in your shared drive you do not own it
* to transfer file ownership

#### Typescript
```ts
http.post(
	"https://www.googleapis.com/drive/v3/files/"+id.folder+"/permissions",
	{
		role:'owner',
		type:'user',
		emailAddress:"yourEmailHere@gmail.com"
	},
	{
		headers,
		params:{
			transferOwnership:"true"
		}
	}
)
```


## Store application-specific data

* __application data folder__ - store app specific data, config files things users should not touch
* when the app is uninstalled, the folder is deleted

### Application data folder scope

* need https://www.googleapis.com/auth/drive.appdata

### Viewing amount of storage used by application data folder
 in a phone or tablet
* Settings Icon > Settings > Manage Apps >  
* you see the amount of data if its hidden that the application data folder

### Create a file in the application data folder

* specify  appDataFolder in the parents property for creating a file

#### Typescript
```ts
http.post(
	"https://www.googleapis.com/drive/v3/files",
	{ 
		name: "config.json",
		parents:['appDataFolder']
	},
	{ headers }
)
```

### Search for files in the application data folder
 set the spaces field to appDataFolder and use the files.list method.

#### Typescript
```ts
http.get(
	"https://www.googleapis.com/drive/v3/files",
	{ 
		headers,
		params:{
			spaces:'appDataFolder' 
		}
	}
)
```

### [Lab The Application Data Folder](.\vids\Applicaton_Data_Folder\README.md)

## Manage File Metadata

### Specifying file names and extensions

* if there is no file extension the API tries to make one based on its mime type

### Saving indexable text

* if the file doesnt have text, its a good idea to supply indexable text so in search results it can be found

### Uploading thumbnails

* if drive cant make a thumbnail you can provide one
* done using contentHints.thumbnail object in the requst body
* Set contentHints.thumbnail.image to the URL-safe Base64-encoded image (see RFC 4648 section 5)
* Set contentHints.thumbnail.mimeType to the appropriate type for the image format
* upload thumbnails every time the files changes, unfortunaltely

## Add comments and replies

* __comments__ user-provided feedback on a file
* __anchored comment__ - associated with a specific location in a specifc version of the doc
* __unanchored comment__ - plainly associaedd wih the doc
* __replies__ - reponses to a commment
* __discussion__ a coment with a bunch of replies

### Add an unanchored comment
* the fields query param is required
* only the person who created the comment can delete the comment
#### Typescript
```ts
http.post(
	"https://www.googleapis.com/drive/v3/files/"+fileId+"/comments",
	{
		content:"On paragraph 2 you wrote a square has 3 sides that should be a triangle"
	},
	{
		headers,
		params:{
			fields:'*'
		}
	}
)
.subscribe((result)=>{
	console.log(result)
})
```

### Add a reply to a comment
* to add a reply to a comment

#### Typescript
```ts
http.post(
	"https://www.googleapis.com/drive/v3/files/"+id.file+"/comments/"+id.comment+"/replies",
	{as
		content:"Greetings teacher, where in parapgraph 2 it is a big paragraph are you looking at a differnt version"
	},
	{
		headers,
		params:{
			fields:'*'
		}
	}
)
subscribe((result)=>{
	console.log(result)
})
```

### Add an anchored comment 

* __anchor__ - file revision and region of a file a cooment is referring to its JSON
* recommended to use anchors in documents where the position doesnt change, like images and read only files

* call revisions.list method to see which revision you want to  add the comment to,
* call comments create with a request body of content and anchor a JSON string with the r prop for the revision id, or 'head' for the latest revision and a for the regio of the document you are referring to 

#### Define a region

* __region(a)__ JSON array containing region classifiers specifying the format and location to which a comment is anchored. it can be a 
* __region classifiers__ - a as a two-dimensional rectangle for an image, a line of text in a document, a time duration in a video, and so on a list [here](https://developers.google.com/drive/api/v3/manage-comments#classifers)

* a typical anchor on an essay
```json
    {
      'r': revisionId,
      'a': [
      {
        'line':
        {
          'n': 12,   // start at line 12 go for 3 lines
          'l': 3,
        }
      },
      {
        'line':
        {
          'n': 18, // just highlight line 18
          'l': 1,
        }
      }]
    }
```

* to create an anchored comment

#### Typescript
```ts
http.post(
	"https://www.googleapis.com/drive/v3/files/"+id.file+"/comments",
	{
		content:"This is the section do you see it now student",
		anchor:JSON.stringify({
			r:'head', // if you want the latest version otherwise chooses the revision as needed
			'a': [
				{
					'line':
					{
					'n': 14,
					'l': 1,
					}
				},
			]
		})
	},
	{
		headers,
		params:{
			fields:'*'
		}
	}
)
.subscribe((result)=>{
	console.log(result)
})
```

### Resolve a comment
* to resolve a comment , aka the student make the change the teacher requested
use comment.update method set the resolved prop to true

#### Typescript
```ts
//resolve a comment
http.patch(
	"https://www.googleapis.com/drive/v3/files/"+id.file+"/comments/" + id.comment,
	{
		resolved:"true",
		content:""
	},
	{
		headers,
		params:{
			fields:"*"
		}

	}
)
//
.subscribe((result)=>{
	console.log(result)
})
```

### Delete a comment

* to delete a comment
#### Typescript
```ts
// delete a comment
http.delete(
	"https://www.googleapis.com/drive/v3/files/"+id.file+"/comments/"+id.comment,
	{
		headers
	}
)
//
.subscribe((result)=>{
	console.log(result)
})
```

### List Comments
* to list all comment

#### Typescript
```ts
http.get(
	"https://www.googleapis.com/drive/v3/files/"+id.file+"/comments",
	{
		headers,
		params:{
			fields:"*"

		}
	}
)
```


### [Lab Comments in Google Drive API](./vids/Comments/README.md)

## Add custom file properties

* __Custom file properties__ -  key/value pairs used to store custom metadata for a file
* to add props everyone can use the properties on the files resource
* to add props only your app can see use  appProperties
* Property and app property keys may contain only the letters a-z and A-Z, the numbers 0-9, and the characters .!@$%^&*()-_/

* max of 100 custom props per file
* max 30 public/private props per file
* max 124 bytes per prop
* this updates one at a time, you have to send mutliple api requests or a batch requests for several prop updates

#### Typescript
```ts
let propsForAllToSee = false
let propsOnlyMyAppCanSee = true
http.patch(
	"https://www.googleapis.com/drive/v3/files/"+id.file,
	// An IIFE, now yr a better coder
	(()=>{
		if(propsForAllToSee){
			return { properties:[{'a':'I can see you'},{'b':'yes I can'}]}
		}
		else if(propsOnlyMyAppCanSee){
			return { appProperties:[{'a':'I can see you'},{'b':'yes I can'}]}
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
.subscribe((result:any)=>{
	console.log(result)

})
```


## Create a shortcut to a Drive file
* __mime-type__ - application/vnd.google-apps.shortcut 
* __targetId__ pointing to the target folder,  targetMimeType
* only one parent
* to break, target must be deleted, or user lose access
* shortcut thumbnails do not change with target mimeType change

* to create a shortcut

#### Typescript
```ts
http.post(
    "https://www.googleapis.com/drive/v3/files",
    {
        name: "My Folder",
        //to create a folder this must be included
        mimeType: "application/vnd.google-apps.shortcut",
        'shortcutDetails':{
            targetId:file.id
        }
        //
    },
    { headers, observe: 'response' }
)
.subscribe((result) => {
    console.log(result)
})
```


* to search for a shortcut
```ts
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
```

### Lab  [Creating Shortcuts with Google Drive API](vids\Creating_Shortcuts\README.md)

# Issues with the DRIVE API 



* Import to Google Docs types 
    *  im getting the needed gsuite doc, however the fileContent is not coming along

* Define indexable text for unknown file types
    * I just dont know how to setup the API call

* for some reason through web user interface, if you give the api key once, and you give an empty string again for the API key, the api key still works how should I go about reporting this

* viewersCanCopyContent = false still allows for download

* i dont get viewing files in the browser, can I just use embed how do I get the whole files reosurce object
v

* transfer file ownership
	* it seems to take a while to get this done

* permissions batch updartes
	not availble in browser SDK or REST API
## Comments

* comments ,reply resouce, there is no  resources just the content prop in the response body

* what is meant by htmlContent, I just get string ready to be inserted into html, not colorful html that can display a div, meaningful html 

* define a region link heads to the wrong part of the doc

* the REST API to create an anchored comment still creates an unanchored comment
according to this ,where the id is a gdoc file 
```ts
http.post(
	"https://www.googleapis.com/drive/v3/files/"+id.file+"/comments",
	{
		content:"This is the section do you see it now student",
		anchor:JSON.stringify({
			r:'head', // if you want the latest version otherwise chooses the revision as needed
			'a': [
				{
					'line':
					{
					'n': 14,
					'l': 1,
					}
				},
			]
		})
	},
	{
		headers,
		params:{
			fields:'*'
		}
	}
)
.subscribe((result)=>{
	console.log(result)
})
```

* where is the resolved property on the comments resource is it phased out,refer to comments.list