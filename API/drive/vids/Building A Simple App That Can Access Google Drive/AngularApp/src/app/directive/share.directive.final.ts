import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy } from '../customExports'
import { catchError, delay } from 'rxjs/operators'
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Directive({
    selector: '[appShare]'
})
export class ShareDirective {

    @Input() share: any;
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
            let CLIENT_ID = environment .googleDrive.clientId
            let API_KEY = environment.googleDrive.apiKey
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

                    //secondary email
                    let emailAddress = "[ENTER SECOND GMAIL HERE NOT THE ONE LOGGED INTO THE APPLICATION]"
                    //

                    //create a permission
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
                    //


                    // list all permissions for a file
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
                    //

                    // charnge a permission
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
                    //

                    // revoke a permission
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
                    //

                    //transfer file ownership
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
        this.extras = this.share
        if (this.extras?.confirm === 'true') {
            console.log(environment.share)
            this.el.nativeElement.click()
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
