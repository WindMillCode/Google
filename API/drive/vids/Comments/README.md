# Comments in Google Drive API

## Task 1 Web Application 

* download the [web app](https://github.com/codequickie123/AngularDriveApp)
* head [here](docs.google.com) 
    Start a new Document > Blank 
    
* title it Commented_Document
* copy and paste this text no plagariusm I promise lol
```txt
Every polygon is either convex or concave. The difference between convex and concave polygons lies in the measures of their angles. For a polygon to be convex, all of its interior angles must be less than 180 degrees. Otherwise, the polygon is concave. Another way to thine diagonals of a convex polygon will all be in the interior of the polygon, whereas certain diagonals of a concave polygon will lie outside the polygon, on its exterior. Below in Part A are some convex polygons, and in Part B, some concave polygons. In the rest of this text, you can assume that every polygon discussed is convex.

Polygons can also be classified as equilateral, equiangular, or both. Equilateral polygons have congruent sides, like a rhombus. Equiangular polygons have congruent interior angles, like a rectangle. Wk oing diagonals of the polygon. This fact forms the basis for understanding why the interior angles of polygons add up to 180(n-2) degrees. The interior angles of a triangle always add up to 180 degrees. 
Squares have 3 sides. Their angles add up to 180 degrees. Their individual angles do not have to be equalThis can easily be proved by the congruence of alternate interior angles. Ff it is this: thhen a polygon is both equilateral and equiangular, it is called a regular polygon. A square is an exaxplore in the next section. Below are some examples of equiangular, equilateral, and regular polygons.

Quadrilaterals are prevalent shapes in the world, and thus have been classified carefully. The four sides of quadrilaterals naturally come in pairs, with opposite sides being thongles were there beforlled the bases of the trapezoid. A trapezoid's nonparallel sides are its legs. One of the most important parts of a trapezoid is its median. The median of a trapezoid is the segment that joins the midpoints of tlled the bases of the trapezoid. A trapezoid's nonparallel sides are its legs. One of the most important parts of a trapezoid is its median. The but now they can be measured.) So n-4 diagonals of a polygon create one triangle each, and one diagonal, the last one to be drawn, creates two trianse that don't share a vertex. Many quadrilaterals have pairs of opposite sides with no special relationships, but then again, some do.

A parallelogram has many interesting properties. Its opposite sides, in addition to being parallel, are congruent. The opposite angles of a parallelogram are also congruent. Consecutive angles of a parallelogrammple of a regular polygon. The center of a regular polygon is the point from which all the vertices of the polygon are equidistant. Regular polygons have special properties that we'll e, are supplementary. Also, the diagonals of a parallelogram bisect each other.

The parallel sides of a trapezoid are called the bases of the trapezoid. A trapezoid's nonparallel sides are itlled the bases of the trapezoid. A trapezoid's nonparallel sides are its legs. One of the most important parts of a trapezoid is its median. The median of a trapezoid is the segment that joins the midpoints of ts legs. One of the most important parts of a trapezoid is its median. The median of a trapezoid is the segment that joins the midpoints of the legs of the trapezoid. It is parallel to the bases, and is equal to half the sum of the length of the bases; its length is the average length of the bases.

Of all geometrical shapes, triangles are probably the most important. The most remarkable and important property of triangles is that any polygon can be split up into triangles simply by drawrom a given vertex of a polygon with n sides, (n-3) diagonals can be drawn. Every diagonal drawn from a single vertex of a polygon creates one triangle within the polygon, except for the last diagonal, which creates two triangles. For each triangle created withihe agles. This means that n-2 triangles can be drawn into a given n-sided polygon. This is why the sum of all interior angles of an n-sided polygon is always 180(n-2) degrees. See the figure below for how the process looks.

```

* then edit the document find and correct some grammar errors, not all were hear to code not learn grade school lol
* at the end of this lab your result should look like src/app/directive/comment.directive.final.ts

* in terminal 1
```bash
npx ng serve -c=comment --open=true
```

## Task 2 setup up credentials

open /src/app/directive/comment.directive.ts in your code editor
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

open /src/app/directive/comment.directive.ts in your code editor
* in load the auth SDK paste
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

        //lab setup
        let getAllFiles:[string,any] = [
            "https://www.googleapis.com/drive/v3/files",
            {
                headers,
                params:{
                    fields:'*',
                    pageSize:"100"
                }
            }
        ]

        let getAllComments : (any) => [string,any] = (devObj?):[string,any]=>{
            let {id} = devObj
            return [
                    "https://www.googleapis.com/drive/v3/files/"+id.file+"/comments",
                    {
                        headers,
                        params:{
                            fields:'*'
                        }
                    }
            ]
        }

        let getAllRevisions : (any) => [string,any] = (devObj?):[string,any]=>{
            let {id} = devObj
            return [
                "https://www.googleapis.com/drive/v3/files/"+id.file+"/revisions",
                {
                    headers,
                    params:{
                        fields:'*'
                    }
                }
            ]
        }

        let filterForFile:(any) => (any) = (devObj:{result: any, id: any}):any => {
            let {result,id} = devObj
            result.files
            .forEach((x: any, i) => {
                if (x.name === "Commented_Document") {
                    id.file = x.id;
                }
            });
            return id
        }
        //        

        // add an unanchored comment

        //

        // reply to a comment

        //

        //create an anchored comment

        //

        //resolve a comment

        //

        //delete a comment

        //

        //list all comments

        //


    })
    .catch(function (error) {
        console.log(error)
    })
});
//
```

## Task 4 Add an unanchored comment

open /src/environments/environment.drive.dev.ts

in 'replace comment object here' replace with this
```ts
comment:{
    unanchored:{
        create:true,
    },
    anchored:{
        create:false//doesnt work
    },
    reply:false,
    resolved:false, //doesnt work
    delete:false,
    list:false
}
```

* the difference between unanchored and anchored, anchored refers to a specific part in a file whether it a range for a video, section in an image, or parapgrah in an essay


open /src/app/directive/comment.directive.ts in your code editor

* in 'add an unanchored comment' replace with this code
```ts
if(env.comment.unanchored.create){
    http.get(...getAllFiles)
    .subscribe((result:any)=>{
        let id = filterForFile({
            result, id:{}
        });



        // add an unanchored comment
        http.post(
            "https://www.googleapis.com/drive/v3/files/"+id.file+"/comments",
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
        //



        .subscribe((result)=>{
            console.log(result)
        })

    })
}
```

## Task 5 Reply to a comment

* __reply__ any response(s) to the comment
* __discussion__ a collection of replies and the comment

open /src/environments/environment.drive.dev.ts

in 'replace comment object here' replace with this
```ts
comment:{
    unanchored:{
        create:false,
    },
    anchored:{
        create:false//doesnt work
    },
    reply:true,
    resolved:false, //doesnt work
    delete:false,
    list:false
}
```

open /src/app/directive/comment.directive.ts in your code editor

* in 'reply to a comment' replace with this code
```ts
if(env.comment.reply){

    // get the target file
    http.get(...getAllFiles)
    //
    .subscribe((result:any)=>{
        let id = filterForFile({
            result, id:{}
        });

        // get all comment from the file
        http.get(
            ...getAllComments({id})
        )
        //
        .subscribe((result:any)=>{
            id.comment = result.comments[0].id



            // reply to a comment
            http.post(
                "https://www.googleapis.com/drive/v3/files/"+id.file+"/comments/"+id.comment+"/replies",
                {
                    content:"Greetings teacher, where in parapgraph 2 it is a big paragraph are you looking at a differnt version"
                },
                {
                    headers,
                    params:{
                        fields:'*'
                    }
                }
            )
            //



            .subscribe((result)=>{
                console.log(result)
            })


        })

    })
}
```
## Task 6 Create an anchored comment (FIXME, not working)


open /src/environments/environment.drive.dev.ts

in 'replace comment object here' replace with this
```ts
comment:{
    unanchored:{
        create:false,
    },
    anchored:{
        create:true//doesnt work
    },
    reply:false,
    resolved:false, //doesnt work
    delete:false,
    list:false
}
```

* in 'create an anchored comment' replace with this code
```ts
if(env.comment.anchored.create){

    // get the target file
    http.get(...getAllFiles)
    //
    .subscribe((result:any)=>{
        let id = filterForFile({
            result, id:{}
        });

        //get a list of all revisions of the doc
        http.get(
            ...getAllRevisions({id})
        )
        //
        .subscribe((result:any)=>{
            id.revision = result.revisions[result.revisions.length-1].id
            console.log(result)




            //create an anchored comment
            http.post(
                "https://www.googleapis.com/drive/v3/files/"+id.file+"/comments",
                {
                    content:"This is the section do you see it now student",
                    anchor:JSON.stringify({
                        r:'head', // if you want the latest version use 'head' otherwise choose a number for an index in result.revisions to indicate the proper revision
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
            //




            .subscribe((result)=>{
                console.log(result)
            })
            //
        })
    })
}
```
## Task 7 Resolve a comment (FIXME not working)

open /src/environments/environment.drive.dev.ts

in 'replace comment object here' replace with this
```ts
comment:{
    unanchored:{
        create:false,
    },
    anchored:{
        create:false//doesnt work
    },
    reply:false,
    resolved:true, //doesnt work
    delete:false,
    list:false
}
```

* in 'resolve a comment' replace with this code
```ts
if(env.comment.resolved){

    // get the target file
    http.get(...getAllFiles)
    //
    .subscribe((result:any)=>{
        let id = filterForFile({
            result, id:{}
        });

        // get all comments
        http.get(
            ...getAllComments({id})
        )
        //
        .subscribe((result:any)=>{
            console.log(result)
            id.comment = result.comments[0].id //if you get an error make sure you have an anchored comment first


            //resolve a comment
            http.patch(
                "https://www.googleapis.com/drive/v3/files/"+id.file+"/comments/" + id.comment,
                {
                    resolved:true,
                    content:"should be resolved"
                },
                {
                    headers,
                    params:{
                        fields:"*",
                    }

                }
            )
            //



            .subscribe((result)=>{
                console.log(result)
            })
        })

    })
}
```


## ## Task 8 Delete A Comment 

open /src/environments/environment.drive.dev.ts

in 'replace comment object here' replace with this
```ts
comment:{
    unanchored:{
        create:false,
    },
    anchored:{
        create:false//doesnt work
    },
    reply:false,
    resolved:false, //doesnt work
    delete:true,
    list:false
}
```

* in 'delete a comment' replace with this code
```ts
if(env.comment.delete){

    // get the target file
    http.get(...getAllFiles)
    //
    .subscribe((result:any)=>{
        let id = filterForFile({
            result, id:{}
        });

        // get a comment from the file
        http.get(
            ...getAllComments({id})
        )
        //
        .subscribe((result:any)=>{
            id.comment = result.comments[0].id



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
        })
    })

}
```

## Task 9 List all Comments
* open /src/environments/environment.drive.dev.ts

in 'replace comment object here' replace with this
```ts
comment:{
    unanchored:{
        create:false,
    },
    anchored:{
        create:false//doesnt work
    },
    reply:false,
    resolved:false, //doesnt work
    delete:false,
    list:true
}
```

in 'list all comments' place the code
    * here we learn about the next page token this is the same logic for listing all files in google drive, in addition to asking for a bigger pageSize as well
    * deleted comments also show up here, their flag just has 'deleted:true' symbol 
        * includeDeleted:false to avoid, must include in every request
```ts
if(env.comment.list){
    // get the target file
    http.get(...getAllFiles)
    //
    .subscribe((result:any)=>{
        let id = filterForFile({
            result, id:{}
        });



        //list all comments
        http.get(
            "https://www.googleapis.com/drive/v3/files/"+id.file+"/comments",
            {
                headers,
                params:{
                    fields:"*",
                    includeDeleted:"false"

                }
            }
        )
        //
        .subscribe((result:any)=>{
            console.log(result)
            http.get(
                "https://www.googleapis.com/drive/v3/files/"+id.file+"/comments",
                {
                    headers,
                    params:{
                        fields:"*",
                        // to get more comments
                        pageToken:result.nextPageToken,
                        //
                        //to change amount of result:
                        pageSize:"30" //default 20

                    }
                }
            )
            .subscribe((result)=>{
                console.log(result)
            })
        })
        //




    })
}
```