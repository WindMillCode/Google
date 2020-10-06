# Drive API

* Create a dedicated Drive folder to store your application’s data so that the app cannot access all the user's content stored in Google Drive.

*   Integrate with the Google Drive UI

* for some reason through web user interface, if you give the api key once, and you give an empty string again for the API key, the api key still works how should I go about reporting this

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

* __Corpora__ - 
Collections of files used to narrow the scope of file and folder searches. like a bigquery partiton or cluster 
    * enum 
        * user, domain, drive, and allDrives


## File metadata
* reference [here](https://developers.google.com/drive/api/v3/reference/files#methods)
* use this reference for the rest of the readme

## Create files 

* to create an empty file [refrence](https://developers.google.com/drive/api/v3/reference/files/create)
    files.create
    * this automatically uploades a file to google drive

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
 

* to perform a simple upload
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


* to perfrom a multipart upload 
    * this is the option you most likely want to start with
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


* to perform a resumable upload
1. Send the initial request and retrieve the resumable session UR
2. Upload the data and monitor upload state.
3. (optional) If upload is disturbed, resume the upload.


### Lab Upload File Data


# Issues with the DRIVE API 

* uploading file content that indicate an image specifcally jpegs seems to corrpt the file, XHR on the data is a bit corroupted, but getting the from HTMLInputElement file upload provides identical binary in the text editor, find how to modify the data before sending it to google drive
    *i got the api to react [here](https://stackoverflow.com/questions/63422138/how-to-upload-file-into-specific-folder-with-google-drive-api-and-python/64204197#64204197)