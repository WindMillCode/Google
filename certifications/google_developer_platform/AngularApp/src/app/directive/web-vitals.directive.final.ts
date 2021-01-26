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
                        {
                            name:"gtag",
                            src:"https://www.googletagmanager.com/gtag/js?id=G-L1N65K3SE4",
                            defer:"true",
                            placement:{
                                insertBefore:{
                                    parent:document.documentElement,
                                    sibling:document.body
                                }
                            }
                        },
                        {
                            name:"gtag-setup",
                            defer:"true",
                            innerText:`
                            window.dataLayer = window.dataLayer || [];

                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());

                            gtag('config', 'G-L1N65K3SE4');
                            `,
                            placement:{
                                insertBefore:{
                                    parent:document.documentElement,
                                    sibling:document.body
                                }
                            }
                        },
                        //

                        // sample web -vitals
                        {
                            name:"Web Vitals",
                            type:"module",
                            async:"true",
                            innerText:`
                                import {getCLS, getFID, getLCP} from 'https://unpkg.com/web-vitals?module';

                                getCLS(console.log);
                                getFID(console.log);
                                getLCP(console.log);

                                // send the data to web ananlytics
                                function sendToGoogleAnalytics({name, delta, id}) {
                                    gtag('event', name, {
                                      event_category: 'Web Vitals',
                                      value: Math.round(name === 'CLS' ? delta * 1000 : delta),
                                      event_label: id,
                                      non_interaction: true,
                                    });
                                }

                                getCLS(sendToGoogleAnalytics);
                                getFID(sendToGoogleAnalytics);
                                getLCP(sendToGoogleAnalytics);
                                //
                            `,
                            insertion:{
                                appendChild:document.body
                            }
                        },
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


