import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy } from '../customExports'
import { catchError, delay } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Directive({
    selector: '[appAgGrid]'
})
export class AgGridDirective {

    @Input() agGrid: any;
    extras: any;
    zChildren: any;
    subscriptions:Array<Subscription> = []

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
        this.extras = this.agGrid
        if (this.extras?.confirm === 'true') {

            let {ryber,extras,subscriptions} = this
            subscriptions.push(
                ryber[extras.co].metadata.zChildrenSubject
                .subscribe(() => {
                    this.zChildren = ryber[extras.co].metadata.zChildren
                    ryber[extras.co].metadata.agGrid.zSymbol.next(extras.zSymbol)

                })
            )

        }
    }


    ngOnDestroy() {
        if (this.extras?.confirm === 'true') {
            if(env.directive.agGrid?.lifecycleHooks) console.log(this.extras.co + " " + this.extras.zSymbol+ ' agGrid ngOnDestroy fires on dismount')
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

