# Sharing in Google Drive API

## Task 1 Web Application 

* download the [web app](https://github.com/codequickie123/AngularDriveApp)
* make a second gmail acct, open its email and drive in a different browser or an incognito browser
* at the end of this lab your result shoul dlook like src/app/directive/share.directive.final.ts

* in terminal 1
```bash
npx ng serve -c=share --open=true
```


## Task 2 setup up credentials

open /src/app/directive/share.directive.ts in your code editor
* in paste credentials here paste this code
```ts
let CLIENT_ID = environment .googleDrive.clientId
let API_KEY = environment.googleDrive.apiKey
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
var SCOPES = 'https://www.googleapis.com/auth/drive';
```

* in console.developers.google.com

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

open /src/app/directive/share.directive.ts in your code editor
* in load the auth SDK paste
    * replace the emailAddress text with the another gmail apart from the one you used to sign into app for this lab
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

                    //access token setup
                    let headers = new HttpHeaders()
                    headers = headers
                        .set("Authorization", `Bearer ${gapi.auth.getToken().access_token}`)
                    //

                    //secondary email
                    let emailAddress = "ERASE AND TYPE A SECOND GMAIL HERE NOT THE ONE YOUR USING RN]"
                    //

                    //create a permission

                    //


                    // list all permissions for a file

                    //

                    // charnge a permission

                    //

                    // revoke a permission

                    //

                    //transfer file ownership

                    //


                })
                .catch(function (error) {
                    console.log(error)
                })
            });
            
```

## Task 4 Create A Permission
open /src/environments/environment.drive.dev.ts

in 'replace share object here' replace with this
```ts
	share:{
		create:true,
		list:false,
		change:false,
		revoke:false,
		transfer:false,
	}
```


open /src/app/directive/share.directive.ts in your code editor

in 'create a permission' paste this code
* for the emailAddress, use another email other than the one your using so you can see the purpose of this demo 
```ts
if(environment.share.create){

    
    from(
        gapi.client.drive.files.create({
            name:'share.gdoc', //optional
            media: 'media',  //optional
            fields: 'id',     //optional
            mimeType:'application/vnd.google-apps.document'
        })
    )
    .subscribe((result:any)=>{
        console.log(result.result.id)
        let id = result.result.id
        http.post(
            "https://www.googleapis.com/drive/v3/files/"+id+"/permissions",
            {
                role:'reader',
                type:'user',
                emailAddress
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

## Task 5 List All Permissions
open /src/environments/environment.drive.dev.ts
 
in 'replace share object here' replace with this
```ts
	share:{
		create:false,
		list:true,
		change:false,
		revoke:false,
		transfer:false,
	}
```

open /src/app/directive/share.directive.ts in your code editor

in 'list all permissions for a file' paste this code
```ts
if(environment.share.list){

    
    from(
        gapi.client.drive.files.create({
            name:'listPermissions.txt', //optional
            media: 'media',  //optional
            fields: 'id'     //optional
        })
    )
    .subscribe((result:any)=>{
        let id = result.result.id
        http.post(
            "https://www.googleapis.com/drive/v3/files/"+id+"/permissions",
            {
                role:'reader',
                type:'user',
                emailAddress
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
}
```

## Task 6 Change a permission
open /src/environments/environment.drive.dev.ts
 
in 'replace share object here' replace with this
```ts
	share:{
		create:false,
		list:false,
		change:true,
		revoke:false,
		transfer:false,
	}
```

open /src/app/directive/share.directive.ts in your code editor

in 'change a permission' paste this code
    * so to properly inherit a permision, the parent folder must be shared with the target user then, the file created or moved to the target folder can inherit the permission, 
        * a side note if there is no permission, permission added then
```ts
                    if(environment.share.change){



                        // example setup
                        let role = 'reader'
                        //

                        //create a folder
                        http.post(
                            "https://www.googleapis.com/drive/v3/files",
                            { name: "My Shared  Folder", mimeType: "application/vnd.google-apps.folder" },
                            { headers, observe: 'response' }
                        )
                        //
                        .subscribe((result:any)=>{
                            console.log(result)
                            let id:any = {}
                            id.folder = result.body.id


                            // share the folder with another user
                            http.post(
                                "https://www.googleapis.com/drive/v3/files/"+id.folder+"/permissions",
                                {
                                    role,
                                    type:'user',
                                    emailAddress
                                },
                                {
                                    headers,
                                }
                            )
                            //
                            .subscribe((result)=>{


                                // create file in target folder
                                http.post(
                                    "https://www.googleapis.com/drive/v3/files",
                                    {
                                        parents:[id.folder],
                                        name: "My Shared File.txt"
                                    },
                                    { headers, observe: 'response' }
                                )
                                //
                                .subscribe((result:any)=>{
                                    console.log(result)
                                    id.file = result.body.id
                                    //look for the role
                                    http.get(
                                        "https://www.googleapis.com/drive/v3/files/"+id.file,
                                        {
                                            headers,
                                            params:{
                                                fields:'permissions(role,id), id'
                                            }
                                        }
                                    )
                                    //
                                    .subscribe((result:any)=>{

                                        console.log(result)
                                        // update the permission who has reader role
                                        result.permissions
                                        .forEach((x:any,i)=>{
                                            if(x.role === 'reader'){
                                                id.permission = x.id
                                            }
                                        })


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
                                        //

                                    })
                                    //

                                })


                            })
                        })
                        //


                    }
```

## Task 7 Revoke Permissions
open /src/environments/environment.drive.dev.ts
 
in 'replace share object here' replace with this
```ts
	share:{
		create:false,
		list:false,
		change:false,
		revoke:true,
		transfer:false,
	}
```

open /src/app/directive/share.directive.ts in your code editor

in 'revoke a permission' paste this code
    * you get no respoonse body if this is sucessful
```ts
if(environment.share.revoke){

    
    //create a folder
    http.post(
        "https://www.googleapis.com/drive/v3/files",
        { name: "My Revoked  Folder", mimeType: "application/vnd.google-apps.folder" },
        { headers, observe: 'response' }
    )
    //
    .subscribe((result:any)=>{

        let id:any ={}
        id.folder = result.body.id
        // share the folder with another user
        http.post(
            "https://www.googleapis.com/drive/v3/files/"+id.folder+"/permissions",
            {
                role:'reader',
                type:'user',
                emailAddress
            },
            {
                headers,
            }
        )
        //
        .subscribe((result:any)=>{

            id.permission = result.id
            //revoke read access to the user
            http.delete(
                "https://www.googleapis.com/drive/v3/files/"+id.folder+"/permissions/"+id.permission,
                {
                    headers,
                }
            )
            .subscribe((result)=>{
                console.log(result) //should be null if sucessful
            })
            //
        })
    })
}
```

## Task 8 Transfer File Ownership
open /src/environments/environment.drive.dev.ts
 
in 'replace share object here' replace with this
```ts
	share:{
		create:false,
		list:false,
		change:false,
		revoke:false,
		transfer:true,
	}
```

open /src/app/directive/share.directive.ts in your code editor

in 'transfer file ownership' paste this code
    * note that even though the response indicates an immediate action, in the UI 
    this can take up to an hour + to show
```ts
if(environment.share.transfer){

        
    //create a folder
    http.post(
        "https://www.googleapis.com/drive/v3/files",
        { name: "Transfer Ownership", mimeType: "application/vnd.google-apps.folder" },
        { headers }
    )
    //
    .subscribe((result:any)=>{
        let id:any = {
            folder:result.id
        }

        // transfer file ownership
        http.post(
            "https://www.googleapis.com/drive/v3/files/"+id.folder+"/permissions",
            {
                role:'owner',
                type:'user',
                emailAddress
            },
            {
                headers,
                params:{
                    transferOwnership:"true"
                }
            }
        )
        .subscribe((result)=>{

            // see that that former owner is now writer
            http.get(
                "https://www.googleapis.com/drive/v3/files/"+id.folder+"",
                {
                    headers,
                    params:{
                        fields:'permissions(role,displayName)'
                    }
                }
            )
            .subscribe((result)=>{
                console.log(result)
            })
            //
        })
        //
    })
}
```