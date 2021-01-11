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
    zSymbols:Array<string /*zSymbol*/>
    newZChildren:Subscription
    templateMyElements:any

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
            if(zChild.element.value === "REPEAT"){

                if(this.zSymbols === undefined){
                    console.log("adding elements")
                    // try to add elements to the dom
                        //  the first element, should be the element we want to toggle out
                    this.zSymbols = [
                        ryberUpdate.call(this.ryber,{
                            co,
                            bool: 'div',
                            val: 'mode-handler a_p_p_Nester',
                            css:{
                                height:"300px",
                                width:"300px",
                                "background-color":"lightgreen"
                            },
                            extras:{
                                judima:{
                                    format:"false"
                                },
                                component:{
                                    left:"50"
                                }
                            }
                        })
                    ]
                    console.log(this.zSymbols,this.ryber[co])

                }


            }

            //FIXME, ViewChildren has not changed yet it somehow manages to fire
            else{
                console.log("trying to trigger")
                // this.templateMyElements.notifyOnChanges()
            }
            //trigger directivesSendData
            //let component.ts know that we have a new zChild
            this.ryber[co].metadata.latch.updateZChild.next({
                zSymbol:this.zSymbols
            })
            //
            //

        }
    }



    ngOnInit() {
        this.extras = this.latch
        if (this.extras?.confirm === 'true') {
            // console.log(this.extras)
            // console.log(this.ryber)
            this.co = this.extras.co
            this.newZChildren = this.ryber[this.extras.co.valueOf()].metadata.zChildrenSubject
            .subscribe((devObj)=>{
                if(devObj.templateMyElements !== undefined){
                    this.templateMyElements = devObj.templateMyElements
                }
                this.zChildren = this.ryber[this.extras.co.valueOf()].metadata.zChildren
                // console.log(this.zChildren)


                //FIX ME css and cssDefault keep getting updated
                if(this.zSymbols !== undefined){
                    if(this.zChildren[this.extras.zSymbol].element.value === "REPEAT"){
                        this.zSymbols
                        .forEach((x:any,i)=>{
                            this.zChildren[x].css.display =
                            this.zChildren[x].cssDefault.display === undefined ?
                            "block":
                            this.zChildren[x].cssDefault.display
                        })
                    }

                    //hide the item from the dom
                        //FIX ME for nested, get the TLD
                    else if(this.zSymbols !== undefined){
                        this.zSymbols
                        .forEach((x:any,i)=>{
                            this.zChildren[x].css.display = "none"
                        })

                    }
                    //

                }
                //
            })
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

