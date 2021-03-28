import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy } from '../customExports'
import { catchError, delay,first } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Directive({
    selector: '[appNavigation]'
})
export class NavigationDirective {


    @Input() navigation: any;
    extras: any;
    zChildren: any;
    subscriptions:Array<Subscription> = []
    groups :any ={}


    constructor(
        private el: ElementRef,
        private http: HttpClient,
        private renderer2: Renderer2,
        private ryber: RyberService
    ) { }

    ngOnInit() {
        this.extras = this.navigation

        if (this.extras?.confirm === 'true' && this.extras.type === "body") {
            let {ryber,extras,zChildren,subscriptions} = this
            let {co} = extras
            let {groups} = this.groups = ryber[co].metadata.navigation


            let mainSubscription =ryber[co].metadata.zChildrenSubject
            .pipe(first())
            .subscribe((result) => {

                this.zChildren = zChildren = ryber[co].metadata.zChildren

                // organize the groupings
                extras.group
                .forEach((x:any,i)=>{
                    groups[x.name] = {
                        type:x.type,
                        targets:[]
                    }
                })
                //

                // gather all objects to respective navigation groups
                Object.values(zChildren)
                .forEach((x:any,i)=>{
                    let zChildNavigation = x?.extras?.appNavigation
                    groups?.[zChildNavigation?.group]?.targets.push(zChildNavigation.zSymbol)
                })
                //

                // sorting the elements associated to respetive groups
                Object.entries(groups)
                .forEach((x:any,i)=>{
                    let key = x[0]
                    let val = x[1]

                    // click on the link to navigate
                    if(val.type ==="direct_link"){

                        val.targets
                        .forEach((y:any,j)=>{
                            let anchorEvent = fromEvent(
                                zChildren[y].element,
                                "click"
                            )
                            .subscribe((result:any)=>{
                                // change the path
                                ryber.appCO0.metadata.navigation.full.navigated = "true"
                                ryber.appCurrentNav = "/"+zChildren[y].extras.appNavigation.group
                                //
                            })
                            subscriptions.push(anchorEvent)

                        })
                    }
                    //
                })
                //

            })
            subscriptions.push(mainSubscription)

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
