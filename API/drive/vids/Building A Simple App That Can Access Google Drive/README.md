# Building A Simple App That Can Access Google Drive

## Task 1 Web Application 

* download the [web app](https://github.com/codequickie123/Google/tree/master/API/drive/vids)

*  terminal 1 
```bash
npx ng serve -c=drive
```
open /src/app/directive/print-files.directive.ts in your code editor

at the end of this lab, the code should look like 
/src/app/directive/print-files.directive.final.ts





## Task 2 setup up credentials

* in credentials paste this code
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
||||
||||
||||


CREATE CREDENTIALS > API KEY

|property|value|data|
|:------|:------:|------:|
|Application type|Web Application||
|Authorized JavaScript origins|http://localhost:8000||
||||
||||

CREATE


copy and write down the client id 


* open /src/environments/environment.drive.dev.ts in your code editor
* FOR 'insert credentials here' map as needed

## Task 3 Connect to the API

open /src/app/directive/print-files.directive.ts in your code editor

* load the auth sdk
```ts
gapi.load('client:auth2', ()=>{
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    })
    .then(function () {


        // sign in if needed
        //

        //listen for sign in data
        //

        //regular function
    })
    .catch((e)=>{
        console.error(e.details)
    })

});	
			
```


* for sign in if needed
 ```ts
if(!gapi.auth2.getAuthInstance().isSignedIn.get()){
    gapi.auth2.getAuthInstance().signIn();
}
 ```

* listen for sign in data
 ```ts
gapi.auth2.getAuthInstance().isSignedIn.listen(()=>{
    gapi.client.drive.files.list({
        'pageSize': 10,
        'fields': "nextPageToken, files(id, name)"
    })
    .then(manifest({aT:appendTarget}));		
})	
 ```

* regular function
 ```ts
gapi.client.drive.files.list({
    'pageSize': 10,
    'fields': "nextPageToken, files(id, name)"
})
.then(manifest({aT:appendTarget}));	
 ```


## Task 4 get the Files and do as accordingly

* for function once files are in the app
```ts
function manifest(devObj) {

	return(response)=>{
		var files = response.result.files;
		console.log(files)

        // ui reaction
        //
        
	}
	
}   
```

* do as needed with the files metadata
    * in ui reaction
```ts
devObj.aT
.forEach((x:any,i)=>{
    console.log(files[i]?.name)
    x.innerText.item  = files[i]?.name === undefined ?  'None' :  files[i]?.name
})
eventDispatcher({
    element:window,
    event:"resize"
})
```


## Task 5 signout if needed

* in for sign out functionality 
```ts
this.pF_BSub = fromEvent(x[1].element,'click')
.subscribe(()=>{
    try{
        gapi.auth2.getAuthInstance().signOut();
        this.appendTarget
        .forEach((x:any,i)=>{
            x.innerText.item = "None"	
        })
        eventDispatcher({
            element:window,
            event:"resize"
        })									
    }
    catch(e){
        console.log(e)
    }
    console.log('signed out')
})
```





## TODO 

* use stackblitz for future applications