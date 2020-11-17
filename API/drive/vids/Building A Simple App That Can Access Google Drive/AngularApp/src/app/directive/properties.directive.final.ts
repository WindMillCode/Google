

import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy } from '../customExports'
import { catchError, delay } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Directive({
    selector: '[appProperties]'
})
export class PropertiesDirective {

    @Input() properties: any;
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

                    //lab Setup
                    let createAFile:[string,any,any] = [
                        "https://www.googleapis.com/drive/v3/files",
                        { name: "My Properties" },
                        {  headers }
                    ]

                    let getAllFiles:[string,any] = [
                        "https://www.googleapis.com/drive/v3/files",
                        {  headers }
                    ]

                    let filterForFile:(any) => (any) = (devObj:{result: any, id: any}):any => {
                        let {result,id} = devObj
                        result.files
                        .forEach((x: any, i) => {
                            if (x.name === "My Properties") {
                                id.file = x.id;
                            }
                        });
                        return id
                    }
                    //

                    // creating properties
                    if(env.props.create.run){
                        http.post(...createAFile)
                        .subscribe((result:any)=>{
                            let id:any = {file:result.id}

                            //creating properties
                            http.patch(
                                "https://www.googleapis.com/drive/v3/files/"+id.file,
                                (()=>{
                                    if(env.props.create.all){
                                        return { properties:[{'a':'I can see you'},{'b':'yes I can'}]}
                                    }
                                    else if(env.props.create.solo){
                                        return { appProperties:[{'a':'I can see you'},{'b':'yes I can'}]}
                                    }

                                })(),
                                {
                                    headers,
                                    params:{
                                        fields:'properties,appProperties'
                                    }
                                }
                            )
                            //
                            .subscribe((result:any)=>{
                                console.log(result)

                            })


                        })
                    }
                    //

                    //thrid party app looking at properties
                    if(env.props.see.run){
                        http.get(...getAllFiles)
                        .subscribe((result:any)=>{
                            let id = filterForFile({result,id:{}})

                            // see the properties of a file belonging to another app
                            http.get(
                                "https://www.googleapis.com/drive/v3/files/"+id.file,
                                {
                                    headers,
                                    params:{
                                        fields:(()=>{
                                            if(env.props.see.all){
                                                return "properties"
                                            }
                                            else if(env.props.see.solo){
                                                return "appProperties"
                                            }
                                        })()
                                    }
                                }
                            )
                            //
                            .subscribe((result:any)=>{
                                console.log(result)
                                // delete the offending file to make the lab smoother
                                http.delete(
                                    "https://www.googleapis.com/drive/v3/files/"+id.file,
                                    {
                                        headers
                                    }
                                )
                                //
                                .subscribe((result:any)=>{
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
        this.extras = this.properties
        if (this.extras?.confirm === 'true') {
            console.log(env.props)
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

