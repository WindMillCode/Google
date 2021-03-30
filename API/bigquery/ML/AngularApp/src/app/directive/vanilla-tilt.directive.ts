import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest, merge } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy } from '../customExports'
import { catchError, delay,first } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SlicePipe } from '@angular/common';


@Directive({
    selector: '[appVanillaTilt]'
})
export class VanillaTiltDirective {

    @Input() vanillaTilt: any;
    extras: any;
    zChildren: any;
    subscriptions:Array<Subscription> = []

    constructor(
        private el: ElementRef,
        private http: HttpClient,
        private renderer2: Renderer2,
        private ryber: RyberService
    ) { }



    ngOnInit() {

        this.extras = this.vanillaTilt

        if (this.extras?.confirm === 'true') {

            if(env.directive?.vanillaTilt?.lifecycleHooks) console.log(this.extras.co + " " + this.extras.zSymbol+ ' vanillaTilt ngOnInit fires on mount')
            let {ryber,extras,zChildren,subscriptions,el} = this
            let {co} = extras


            // wait for vanilla tilt to load
            let {scripts} =this.ryber.appCO0.metadata

            scripts =  scripts .filter((x:any,i)=>{
                return x.name === "vanillaTilt"
            })
            let loadedScripts = Array.from(
                scripts.filter((x:any,i)=>{
                    return x.loaded !== "true"
                }),
                (x:any,i)=>{return fromEvent(x.element,"load")}
            )
            subscriptions.push(
                combineLatest([
                    ryber[co].metadata.zChildrenSubject,
                ...loadedScripts,

                ])
                .pipe(
                    first()
                )
                .subscribe((result:any)=>{

                    this.zChildren = zChildren = ryber[co].metadata.zChildren
                    let ref = result[0].ref
                    VanillaTilt.init(el.nativeElement,{
                        perspective:500
                    })
                    let tiltOthers = (e:any)=>{
                        Object.values(zChildren)
                        .slice(2)
                        .forEach((x:any,i)=>{
                            x.css["will-change"] = el.nativeElement.style["will-change"]
                            x.css["transform"] =   el.nativeElement.style["transform"]

                        })
                        ref.detectChanges()
                        // if(e instanceof MouseEvent){
                        //     console.log(el.nativeElement.style["transform"])
                        // }
                    }
                    subscriptions.push(

                        fromEvent(el.nativeElement,"tiltChange")
                        .subscribe(tiltOthers),
                        fromEvent(el.nativeElement,"mouseout")
                        .pipe(
                            delay(50)
                        )
                        .subscribe(tiltOthers)
                    )

                })
            )
			//



        }
    }


	ngOnDestroy() {
		if (this.extras?.confirm === 'true') {
            if(env.directive?.vanillaTilt?.lifecycleHooks) console.log(this.extras.co + " " + this.extras.zSymbol+ ' vanillaTilt ngOnDestroy fires on dismount')
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

