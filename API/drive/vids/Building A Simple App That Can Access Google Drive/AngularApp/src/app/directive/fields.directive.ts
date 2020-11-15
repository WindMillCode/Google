import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy } from '../customExports'
import { catchError, delay } from 'rxjs/operators'
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Directive({
    selector: '[appFields]'
})
export class FieldsDirective {

    @Input() fields: any;
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
            var SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';
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

                    //fields fn
                    let getFields  =(devObj?)=>{
                        let headers = new HttpHeaders()
                        headers = headers
                            .set("Authorization", `Bearer ${gapi.auth.getToken().access_token}`)

                        http.get(
                            "https://www.googleapis.com/drive/v3/files",
                            {
                                headers,
                                observe: 'response',
                                params:{
                                    fields:devObj.fields
                                }
                            }
                        )
                        .subscribe((result: any) => {
                            console.log(result.body.files[0])

                        })
                    }
                    //



                    //get a list of all files
                    if(environment.fields.all){

                        getFields({
                            fields:"*"
                        })

                    }
                    //

                    //get a single field for a file
                    if(environment.fields.single){


                        getFields({
                            fields:"files(iconLink)"
                        })

                    }
                    //

                    //get a nested field for a file
                        // use either commeneted
                    if(environment.fields.nested){


                        getFields({
                            fields:"files(lastModifyingUser/displayName)"
                            //  fields:"files(lastModifyingUser(displayName))"
                        })

                    }
                    //

                    //get a nested resources by itself
                        // use either or
                    if(environment.fields.group){


                        getFields({
                            // fields:"files(capabilities)"
                            // fields:"files(capabilities/*)"
                            fields:"files(lastModifyingUser(*))"
                        })


                    }

                    //get multiple resources
                        // use either or
                    if(environment.fields.multiple){

                        getFields({
                            fields:"files(ownedByMe,hasThumbnail,capabilities(*))"
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
        this.extras = this.fields
        if (this.extras?.confirm === 'true') {
            console.log(environment.fields)
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


