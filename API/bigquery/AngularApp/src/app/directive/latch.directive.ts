import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren, Host } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy,ryberUpdate } from '../customExports'
import { catchError, delay } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Directive({
    selector: '[appLatch]'
})
export class LatchDirective {

    @Input() latch: any;
    extras: any;
    co:any;
    zChildren: any;

    constructor(
        private el: ElementRef,
        private http: HttpClient,
        private renderer: Renderer2,
        private ryber: RyberService
    ) { }

    @HostListener('blur',['$event']) onBlur(event){
        if(this.extras?.confirm === "true"){
            let {zChildren,co} = this
            let zChild = zChildren[this.extras.zSymbol]
            console.log(zChild.element.value)
            if(zChild.element.value === "REPEAT"){
                // try to add elements to the dom
                let symbol = ryberUpdate.call(this.ryber,{
                    co,
                    bool: 'div',
                    val: ' a_p_p_Nester a_p_p_ModeHandler',
                    css:{
                        height:"300px",
                        width:"300px",
                        "background-color":"lightgreen"
                    }
                })
                console.log(symbol)
                //
                eventDispatcher({
                    event:'resize',
                    element:window
                })
            }
        }
    }



    ngOnInit() {
        this.extras = this.latch
        if (this.extras?.confirm === 'true') {
            // console.log(this.extras)
            this.co = this.extras.co
            this.ryber[this.extras.co.valueOf()].metadata.zChildrenSubject
            .subscribe(()=>{
                this.zChildren = this.ryber[this.extras.co.valueOf()].metadata.zChildren
                // console.log(this.zChildren)
            })
            setTimeout(() => {
                // this.el.nativeElement.click()
            }, 200)
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

