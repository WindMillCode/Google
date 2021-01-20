import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy } from '../customExports'
import { catchError, delay } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ScatterplotLayer } from '@deck.gl/layers';
import { GoogleMapsOverlay } from '@deck.gl/google-maps';


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

    constructor(
        private el: ElementRef,
        private http: HttpClient,
        private renderer: Renderer2,
        private ryber: RyberService
    ) { }


    @HostListener('click') onClick() {


        if (this.extras?.confirm === 'true') {




        }

    }

    ngOnInit() {
        this.extras = this.googleMaps
        console.log(this.extras)
        if (this.extras?.confirm === 'true') {


            combineLatest([
                env.googleMaps.scriptLoaded.subject,
                this.ryber[this.extras.co.valueOf()].metadata.zChildrenSubject
            ])
            .subscribe((result) => {
                // setup the maps integration
                let mapOptions = {
                    center: { lat: 40.75097, lng: -73.98765 },
                    zoom: 14,
                };
                let myMap = new google.maps.Map(this.el.nativeElement, mapOptions);
                //

                // communicate with the python backend for the map data from bigquery
                let data = {}
                this.http.post(
                    "http://localhost:3005",
                    data,
                    {
                        responseType: 'json',
                    }
                )
                .subscribe({


                    error: (error) => {


                        eventDispatcher({
                            event: 'resize',
                            element: window
                        })
                    },
                    next: (result: any) => {
                        console.log(result)

                        // setup layer operations
                        let layerOptions = {
                            id: 'scatter-plot',
                            data: result.data,
                            getPosition: d => [parseFloat(d.longitude), parseFloat(d.latitude)],
                            getRadius: d => parseInt(d.capacity),
                            stroked: true,
                            getFillColor: [255, 133, 27],
                            getLineColor: [255, 38, 27],
                            radiusMinPixels: 5,
                            radiusMaxPixels: 50
                        };
                        let scatterplotLayer = new ScatterplotLayer(layerOptions);
                        //

                        // apply visualization to Map
                        let googleMapsOverlay = new GoogleMapsOverlay({
                            layers: [scatterplotLayer]
                        });
                        googleMapsOverlay.setMap(myMap);
                        //
                        eventDispatcher({
                            event: 'resize',
                            element: window
                        })
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

