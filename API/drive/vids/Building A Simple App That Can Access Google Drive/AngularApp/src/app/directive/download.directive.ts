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

            //paste credentials here

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


// get our files

//
