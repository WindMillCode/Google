

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
