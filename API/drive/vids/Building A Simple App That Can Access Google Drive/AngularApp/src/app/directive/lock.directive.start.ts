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


