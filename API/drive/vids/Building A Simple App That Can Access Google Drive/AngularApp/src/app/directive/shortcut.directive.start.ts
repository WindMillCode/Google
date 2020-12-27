import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest, Subject } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy } from '../customExports'
import { catchError, delay } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Directive({
    selector: '[appShortcut]'
})

export class ShortcutDirective {

    @Input() shortcut: any;
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

            //

            //scope access
            let http = this.http
            let ryber = this.ryber
            let envSetup = this.envSetup
            let getShortcutFolder = this.getShortcutFolder
            let shortcutFiles:any = {
                sub:new Subject<any>()
            }
            //

            // load the auth SDK

            //

        }

    }

    private envSetup(devObj?) {
        let {http,headers} = devObj
        http.post(
            "https://www.googleapis.com/drive/v3/files",
            {
                name: "My Shortcut Folder",
                //to create a folder this must be included
                mimeType: "application/vnd.google-apps.folder"
                //
            },
            {
                headers,
                observe: 'response',
                params:{
                    fields: 'id, parents',
                }
            }
        )
        .subscribe((result) => {
            console.log(result);
            // return
            Array.from(fileUpload.files).forEach((x:any,i)=>{
                console.log(x)
                // return
                if(x.size <= 10244304){
                    let reader = new FileReader()
                    reader.readAsBinaryString(x)
                    reader.onload =(evt) => {

                        const boundary = '-------314159265358979323846';
                        const delimiter = "\r\n--" + boundary + "\r\n";
                        const close_delim = "\r\n--" + boundary + "--";


                        var contentType = x.type || 'application/octet-stream';
                        var metadata = {
                            'name': x.name,
                            'mimeType': contentType
                        };

                        var base64Data = btoa((reader.result as any));
                        var multipartRequestBody =
                            delimiter +
                            'Content-Type: application/json\r\n\r\n' +
                            JSON.stringify(metadata) +
                            delimiter +
                            'Content-Type: ' + contentType + '\r\n' +
                            'Content-Transfer-Encoding: base64\r\n' +
                            '\r\n' +
                            base64Data +
                            close_delim;



                        http.post(
                            "https://www.googleapis.com/upload/drive/v3/files",
                            multipartRequestBody,
                            {
                                headers:{
                                    'Content-Type': 'multipart/related; boundary=' + boundary,
                                    "Authorization": `Bearer ${gapi.auth.getToken().access_token}`
                                },
                                observe:'response',
                                params: {
                                    'uploadType': 'multipart',
                                    addParents:result.body.id,
                                    fields:'id, parents,name'
                                }
                            }
                        )
                        .pipe(
                            delay(2)
                        )
                        .subscribe((res)=>{
                            console.log(res)
                            http.patch(
                                "https://www.googleapis.com/drive/v3/files/"+res.body.id,
                                {},
                                {
                                    headers,
                                    params:{
                                        addParents:result.body.id,
                                        fields: '',
                                    }
                                }
                            )
                            .pipe(
                            catchError((error)=>{
                                return of(error)
                            })
                            ).subscribe((result:any)=>{

                            })
                        })

                    }
                }

            })
        });
        let fileUpload = document.querySelector("input[type='file']") as HTMLInputElement



    }

    private getShortcutFolder(devObj?) {
        let {http,headers,shortcutFiles} = devObj
        http.get(
            "https://www.googleapis.com/drive/v3/files",
            {
                headers,
                params:{
                    q:"name = 'My Shortcut Folder'",
                    fields: 'files(id, starred,name)', // not the focus but this is how you get different file properties
                }
            }
        )
        .pipe(
        catchError((error)=>{
            return of(error)
        })
        ).subscribe((result:any)=>{
            let parent = result.files[0]
            http.get(
                "https://www.googleapis.com/drive/v3/files",
                {
                    headers,
                    params:{
                        q: `'${parent.id}' in parents and trashed = false`,
                        fields: 'files(id, starred,name)', // not the focus but this is how you get different file properties
                    }
                }
            )
            .pipe(
            catchError((error)=>{
                return of(error)
            })
            ).subscribe((result:any)=>{
                shortcutFiles.sub.next(result)

            })
        })

    }


    ngOnInit(){
        this.extras = this.shortcut
        if (this.extras?.confirm === 'true') {
            console.log(env.shortcut)
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


