import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy } from '../customExports'
import { catchError, delay } from 'rxjs/operators'
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Directive({
    selector: '[appSearch]'
})
export class SearchDirective {

    @Input() search: any;
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
			let CLIENT_ID = environment.googleDrive.clientId
			let API_KEY = environment.googleDrive.apiKey
			let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
			let SCOPES = `https://www.googleapis.com/auth/drive`;
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


                    //get a list of all files
                    if(environment.search.all){

                        let headers = new HttpHeaders()
                        headers = headers
                            .set("Authorization", `Bearer ${gapi.auth.getToken().access_token}`)

                        http.get(
                            "https://www.googleapis.com/drive/v3/files",
                            { headers, observe: 'response' }
                        )
                        .subscribe((result: any) => {
                            console.log(result)

                        })
                    }
                    //


                    //search for specific files or folders
                    if(environment.search.query){

                        let headers = new HttpHeaders()
                        headers = headers
                            .set("Authorization", `Bearer ${gapi.auth.getToken().access_token}`)

                        http.get(
                            "https://www.googleapis.com/drive/v3/files",
                            {
                                headers,
                                observe: 'response',
                                params:{
                                    q:"mimeType = 'image/gif'",
                                    fields: 'files(id, starred,name)',
                                }
                            }
                        )
                        .subscribe((result: any) => {
                            console.log(result)

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
        this.extras = this.search
        if (this.extras?.confirm === 'true') {
            console.log(environment.search)
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




