import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy } from '../customExports'
import { catchError, delay } from 'rxjs/operators'
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PrintFilesDirective } from './print-files.directive';

@Directive({
    selector: '[appDownload]'
})
export class DownloadDirective {

    @Input() download: any;
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
            let CLIENT_ID = environment.googleDrive.clientId
            let API_KEY = environment.googleDrive.apiKey
            let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
            let SCOPES = `https://www.googleapis.com/auth/drive`;


            //scope access
            let http = this.http
            let ryber = this.ryber
            //



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


                        // download a file from Google drive
                        if (environment.download.drive) {


                            let headers = new HttpHeaders()
                            headers = headers
                                .set("Authorization", `Bearer ${gapi.auth.getToken().access_token}`)

                            //get all the files in the drive including in trash
                            http.get(
                                "https://www.googleapis.com/drive/v3/files",
                                { headers, observe: 'response' }
                            )
                                .subscribe((result: any) => {

                                    // download the file
                                    let fileId = result.body.files[0].id
                                    http.get(
                                        "https://www.googleapis.com/drive/v3/files/" + fileId,
                                        {
                                            headers,
                                            observe: 'response',
                                            responseType: 'text',
                                            params: {
                                                // fileId,
                                                alt: 'media'
                                            }
                                        }
                                    )
                                        .subscribe((result: any) => {
                                            console.log(result.body) // yr file content
                                        })
                                    //

                                })
                            //

                        }
                        //

                        // download a gSuite doc
                        if (environment.download.gSuite) {


                            let headers = new HttpHeaders()
                            headers = headers
                                .set("Authorization", `Bearer ${gapi.auth.getToken().access_token}`)

                            //get all the files in the drive including in trash
                            http.get(
                                "https://www.googleapis.com/drive/v3/files",
                                { headers, observe: 'response' }
                            )
                                .subscribe((result: any) => {

                                    let fileId = ""
                                    result.body.files
                                        .forEach((x: any, i) => {
                                            if (x.name === "My_Gdoc_resume") {
                                                fileId = x.id
                                            }
                                        })

                                    http.get(
                                        "https://www.googleapis.com/drive/v3/files/" + fileId + "/export",
                                        {
                                            headers,
                                            observe: 'response',
                                            responseType: 'text',
                                            params: {
                                                // fileId,
                                                alt: 'media',
                                                mimeType: 'application/pdf'
                                            }
                                        }
                                    )
                                        .pipe(
                                            catchError((err: any) => {
                                                console.log(err.error)
                                                return of([])
                                            })
                                        )
                                        .subscribe((result: any) => {
                                            console.log(result) // yr file content
                                        })

                                })

                        }
                        //

                        // partial download
                        if (environment.download.partial) {


                            let headers = new HttpHeaders()
                            headers = headers
                                .set("Authorization", `Bearer ${gapi.auth.getToken().access_token}`)


                            getAllFiles({
                                http,
                                headers,
                                fn:(devObj)=>{

                                    // if we find the file stop the outer loop
                                    let fileId
                                    let ans
                                    if(devObj.file.name==='partial.txt'){
                                        fileId = devObj.file.id
                                        ans = 'done'
                                    }
                                    //

                                    // download the file
                                    http.get(
                                        "https://www.googleapis.com/drive/v3/files/" + fileId,
                                        {
                                            headers:{
                                                "Authorization": `Bearer ${gapi.auth.getToken().access_token}`,
                                                "Range": "bytes=500-599"
                                            },
                                            observe: 'response',
                                            responseType: 'text',
                                            params: {
                                                // fileId,
                                                alt: 'media'
                                            }
                                        }
                                    )
                                    .subscribe((result: any) => {
                                        console.log(result.body) // yr file content
                                    })
                                    //

                                    return ans
                                }
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
        this.extras = this.download
        if (this.extras?.confirm === 'true') {
            console.log(environment.download)
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



function getAllFiles(devObj) {

    let {fn,http,headers} = devObj
    //get all the files in the drive including in trash
    http.get(
        "https://www.googleapis.com/drive/v3/files",
        { headers, observe: 'response' }
    )
    .subscribe((result: any) => {

        //filter for needed files
        try{
            result.body.files
            .forEach((x:any,i)=>{
                let ans = fn({
                    file:x
                })
                if(ans === 'done'){
                    throw('e')
                }
            })
        }
        catch(e){}
        //


    })
    //
}
