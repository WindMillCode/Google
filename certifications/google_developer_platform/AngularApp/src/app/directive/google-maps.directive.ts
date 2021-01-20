import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy } from '../customExports'
import { catchError, delay } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import needed classes
//

@Directive({
    selector: '[appGoogleMaps]'
})
export class GoogleMapsDirective {

    @Input() googleMaps: any;
    extras: any;
    zChildren: any;
    agGrid:any = {
        zSymbol:""
    }
    Subscription0:Subscription


    constructor(
        private el: ElementRef,
        private http: HttpClient,
        private renderer: Renderer2,
        private ryber: RyberService
    ) { }



    ngOnInit() {
        this.extras = this.googleMaps
        console.log(this.extras)
        if (this.extras?.confirm === 'true') {


            this.Subscription0 = combineLatest([
                env.googleMaps.scriptLoaded.subject,
                this.ryber[this.extras.co.valueOf()].metadata.zChildrenSubject
            ])
            .subscribe((result) => {


                // init the map display

                //

                // communicate with the python backend for the map data from bigquery

                this.http.post(
                    "http://localhost:3005",
                    {},
                    {
                        responseType: 'json',
                    }
                )
                .subscribe({


                    error: (error) => {

                        let errorZChild = document.querySelector(".f_o_r_m_error") as HTMLElement
                        errorZChild.innerText = "Check the terminal where the backend is runnning for any messages"
                        eventDispatcher({
                            event: 'resize',
                            element: window
                        })
                    },
                    next: (result: any) => {
                        console.log(result)

                        // setup layer operations

                        //

                        // apply scatter plot visualization to Map

                        //

                    }

                })
                //
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

