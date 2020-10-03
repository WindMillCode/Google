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
