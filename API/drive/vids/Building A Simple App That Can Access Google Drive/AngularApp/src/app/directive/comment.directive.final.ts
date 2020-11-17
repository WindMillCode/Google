

import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy } from '../customExports'
import { catchError, delay } from 'rxjs/operators'
import { environment as env} from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Directive({
    selector: '[appComment]'
})
export class CommentDirective {

    @Input() comment: any;
    extras: any;

    constructor(
        private el: ElementRef,
        private http: HttpClient,
        private renderer: Renderer2,
        private ryber: RyberService
    ) { }


    @HostListener('click') onClick() {


        if (this.extras?.confirm === 'true') {

            //accesing the drive API

            //paste credentials here
            let CLIENT_ID = env .googleDrive.clientId
            let API_KEY = env.googleDrive.apiKey
            var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
            var SCOPES = 'https://www.googleapis.com/auth/drive';
            //

            //scope access
            let http = this.http
            let ryber = this.ryber
            //



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
                                fields:'*'
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
                    //

                    // reply to a comment
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
                    //

                    //create an anchored comment
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
                                .subscribe((result)=>{
                                    console.log(result)
                                })
                                //
                            })
                        })
                    }
                    //

                    //resolve a comment
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
                    //

                    //delete a comment
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
                    //

                    //list all comments
                    if(env.comment.list){
                        // get the target file
                        http.get(...getAllFiles)
                        //
                        .subscribe((result:any)=>{
                            let id = filterForFile({
                                result, id:{}
                            });

                            //list all coments
                            http.get(
                                "https://www.googleapis.com/drive/v3/files/"+id.file+"/comments",
                                {
                                    headers,
                                    params:{
                                        fields:"*"

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
                        })
                    }
                    //


                })
                .catch(function (error) {
                    console.log(error)
                })
            });
            //

        }

    }



    ngOnInit() {
        this.extras = this.comment
        if (this.extras?.confirm === 'true') {
            console.log(env.comment)
            setTimeout(() => {
                this.el.nativeElement.click()
            }, 200)
        }
    }


    ngOnDestroy() {
        if (this.extras?.confirm === 'true') {
            Object.values(this)
                .forEach((x: any, i) => {
                    console.log(x instanceof Subscriber)
                    x.unsubscribe?.()
                })
        }
    }
}
