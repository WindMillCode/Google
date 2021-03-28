import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy } from '../customExports'
import { catchError, delay, subscribeOn,first } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Directive({
    selector: '[appSection]'
})
export class SectionDirective {

    @Input() section: any;
    extras: any
    zChildren: Array<any>
    subscriptions: Array<any> = []

    constructor(
        private ryber: RyberService
    ) { }

    ngOnInit() {
        this.extras = this.section
        if (this.extras?.confirm === 'true') {
            let {ryber,extras,zChildren,subscriptions}= this
            let {co} = extras

            let getZChildren = ryber[co].metadata.zChildrenSubject
            .pipe(first())
            .subscribe(()=>{
                this.zChildren =zChildren = ryber[co].metadata.zChildren
                // this is the reference board for the whole app
                ryber.appCO0.metadata.ryber.sectionDefault.app.custom.board = zChildren["&#8353"]
                //
            })
            let mediaQueryChange = fromEvent(window,'resize')
            .subscribe(()=>{
                if(
                    numberParse(getComputedStyle(zChildren["&#8353"].element).width) >=
                    ryber.appCO0.metadata.ryber.sectionDefault.app.width.value){
                        ryber.appCO0.metadata.ryber.sectionDefault.app.width.mediaQuery = "desktop"

                }
                else{
                    ryber.appCO0.metadata.ryber.sectionDefault.app.width.mediaQuery = "mobile"
                }
            })
            subscriptions.push(...[getZChildren,mediaQueryChange])
        }
    }

	ngOnDestroy() {
		if (this.extras?.confirm === 'true') {
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
