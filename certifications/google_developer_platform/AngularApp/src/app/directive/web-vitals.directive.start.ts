import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy } from '../customExports'
import { catchError, delay } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Directive({
    selector: '[appWebVitals]'
})
export class WebVitalsDirective {

    @Input() webVitals: any;
    extras: any;
    zChildren: any;
    agGrid: any = {
        zSymbol: ""
    }

    constructor(
        private el: ElementRef,
        private http: HttpClient,
        private renderer: Renderer2,
        private ryber: RyberService
    ) { }




    ngOnInit() {
        this.extras = this.webVitals
        console.log(this.extras)
        if (this.extras?.confirm === 'true') {

            // adding scripts

            this.ryber.appCO0.metadata.scripts.push(
                ...this.ryber.appAddScripts({
                    scripts:[
                        // send the data to google analytics

                        //

                        // sample web -vitals

                        //
                    ].filter((x:any,i)=>{
                        return x !== null
                    })
                })
            )
            //





            combineLatest([
                this.ryber[this.extras.co.valueOf()].metadata.zChildrenSubject
            ])
            .subscribe((result) => {
                console.log(result)
                this.zChildren = this.ryber[this.extras.co.valueOf()].metadata.zChildren

            })

        }
    }


    ngOnDestroy() {
        if (this.extras?.confirm === 'true') {
            Object.values(this)
            .forEach((x: any, i) => {
                if (x instanceof Subscriber) {
                    x.unsubscribe?.()
                }

            })
        }
    }
}


