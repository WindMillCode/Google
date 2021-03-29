import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy } from '../customExports'
import { catchError, delay,first } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Directive({
    selector: '[appGoogleMaps]'
  })
  export class GoogleMapsDirective {

    @Input() googleMaps: any;
    extras: any;
    zChildren: any;
    subscriptions:Array<Subscription> = []

    constructor(
        private el: ElementRef,
        private http: HttpClient,
        private renderer2: Renderer2,
        private ryber: RyberService
    ) { }


    @HostListener('click') onClick() {


        if (this.extras?.confirm === 'true') {

            let {http,subscriptions} = this
            //communicate with the python backend
            let postRequest =http.post(
                "http://localhost:3005",
                {},
                {
                    responseType: 'text',
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



                    eventDispatcher({
                        event: 'resize',
                        element: window
                    })
                }

            })
            subscriptions.push(postRequest)
            //

        }

    }


    ngOnInit() {
        this.extras = this.googleMaps

        if (this.extras?.confirm === 'true') {
            if(env.directive?.googleMaps?.lifecycleHooks) console.log(this.extras.co + " " + this.extras.zSymbol+ ' googleMaps ngOnInit fires on mount')
            let {ryber,extras,zChildren,subscriptions} = this
            let {co} = extras

            let mainSubscription =ryber[co].metadata.zChildrenSubject
            .subscribe((result) => {

                this.zChildren = zChildren = ryber[co].metadata.zChildren

            })
            subscriptions.push(mainSubscription)

        }
    }


	ngOnDestroy() {
		if (this.extras?.confirm === 'true') {
            if(env.directive?.googleMaps?.lifecycleHooks) console.log(this.extras.co + " " + this.extras.zSymbol+ ' googleMaps ngOnDestroy fires on dismount')
			this.subscriptions
			.forEach((x: any, i) => {
				try{
					x.unsubscribe()
				}
				catch(e){}

			})
			delete this.subscriptions
		}
	}

}

