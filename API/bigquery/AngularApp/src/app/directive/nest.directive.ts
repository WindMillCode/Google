import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy } from '../customExports'
import { catchError, delay,first } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Directive({
    selector: '[appNest]'
})
export class NestDirective {

    @Input() nest: any;
    extras: any;
    zChildren: any;
    nestZChildren:any ={}

    constructor(
        private el: ElementRef,
        private http: HttpClient,
        private renderer2: Renderer2,
        private ryber: RyberService
    ) { }


    ngOnInit() {
        this.extras = this.nest
        // return
        // console.log(this.extras?.confirm)
        if (this.extras?.confirm === 'true' ) {
            // console.log(this.extras)
            let nestInit = () => {
                // console.log('fire')

                //gather all elements involved in the nesting operation
                this.zChildren = this.ryber[this.extras.co.valueOf()].metadata.zChildren
                Object.entries(this.zChildren)
                .forEach((x:any,i)=>{
                    if(x[1].extras?.appNest?.nestGroup ===this.extras.nestGroup ){
                        // this.nestZChildren[x[0]] = {
                        //     zChild:x[1],
                        //     appNest:x[1].extras.appNest
                        // }

                        //actual nesting
                            // this happens only once, should continue to happen if application
                            // requires element to have new parents
                            // set the order so it doesnt follow template order
                            // FIX ME, figure better logic for the order, should be flex-order


                        if(x[1].extras.appNest.nest === this.extras.nestUnder){
                            // so the children elements can be added along as well
                                //FIXME, needs to be compared to multipleGroupTop, not its parent
                            if(x[1].extras.multipleGroup !== undefined){
                                this.zChildren[this.extras.zSymbol].extras.multipleGroup =
                                x[1].extras.multipleGroup
                            }
                            //
                            this.renderer2.appendChild(
                                x[1].element,
                                this.el.nativeElement
                            )
                            this.renderer2.setStyle(
                                this.el.nativeElement,
                                "position",
                                "static"
                            )
                            // this.renderer2.setStyle(
                            //     this.el.nativeElement,
                            //     "order",
                            //     this.extras.nestCount
                            // )

                            this.extras.newBoard= x[0]
                        }
                        //

                        //the zChildren now need to have their parent as the board

                        //
                    }
                })


            }

            this.ryber[this.extras.co.valueOf()].metadata.zChildrenSubject
            .pipe(first())
            .subscribe(nestInit)

        }
    }


    ngOnDestroy() {
        if (this.extras?.confirm === 'true') {
            Object.values(this)
            .forEach((x: any, i) => {
                if(x instanceof Subscriber){
                    x.unsubscribe?.()
                }

            })
        }
    }
}

