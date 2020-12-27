import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest, Subject } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy } from '../customExports'
import { catchError, delay } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Directive({
    selector: '[appLock]'
  })
export class LockDirective {

    @Input() lock: any;
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
            var SCOPES = 'https://www.googleapis.com/auth/drive.appdata';
            //

            //scope access
            let http = this.http
            let ryber = this.ryber
            let getFile = this.getFile
            let target:any = {
                sub:new Subject<any>()
            }
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

                    //lock a file
                    if(env.lock.create){

                        getFile({http,headers,target})
                        target.sub
                        .pipe(
                        catchError((error)=>{
                            return of(error)
                        })
                        )
                        .subscribe((result:any)=>{
                            console.log(result)
                            target.file = result[0]
                            http.patch(
                                "https://www.googleapis.com/drive/v3/files/"+result.id,
                                {
                                    contentRestrictions:[
                                        {"readOnly": "true"}
                                    ]
                                },
                                {
                                    headers
                                }
                            )
                            .pipe(
                            catchError((error)=>{
                                return of(error)
                            })
                            ).subscribe((result:any)=>{
                                console.log(result)
                            })
                        })
                    }
                    //

                    if(env.lock.delete){
                        //unlock a file
                        getFile({http,headers,target})
                        target.sub
                        .pipe(
                        catchError((error)=>{
                            return of(error)
                        })
                        )
                        .subscribe((result:any)=>{
                            console.log(result)
                            result.forEach((x:any,i)=>{
                                if(x.contentRestrictions?.[0].readOnly){
                                    http.patch(
                                        "https://www.googleapis.com/drive/v3/files/"+x.id,
                                        {
                                            contentRestrictions:[
                                                {"readOnly": "false"}
                                            ]
                                        },
                                        {
                                            headers
                                        }
                                    )
                                    .pipe(
                                    catchError((error)=>{
                                        return of(error)
                                    })
                                    ).subscribe((result:any)=>{
                                        console.log(result)
                                    })
                                }
                            })
                        })
                        //
                    }



                })
                .catch(function (error) {
                    console.log(error)
                })
            });
            //

        }

    }


    private getFile(devObj?) {
        let {http,headers,target,q} = devObj
        http.get(
            "https://www.googleapis.com/drive/v3/files",
            {
                headers,
                params:{
                    q:q === undefined? "":q,
                    fields: 'files(id, contentRestrictions,name)', // not the focus but this is how you get different file properties
                }
            }
        )
        .pipe(
        catchError((error)=>{
            return of(error)
        })
        ).subscribe((result:any)=>{
            target.sub.next(result.files)
        })

    }


    ngOnInit(){
        this.extras = this.lock
        if (this.extras?.confirm === 'true') {
            console.log(env.lock)
            setTimeout(() => {
                // this.el.nativeElement.click()
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


