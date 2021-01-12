import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren, Host,ChangeDetectorRef } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest, Observable } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy,ryberUpdate,xContain,stack, zChildren } from '../customExports'
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
    moveWithTarget:Subscription
    templateMyElements:any
    ref:ChangeDetectorRef

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
                    // try to add elements to the dom
                        //  the first element, should be the element we want to toggle out
                    this.zSymbols = [
                        ryberUpdate.call(this.ryber,{
                            co,
                            bool: 'div',
                            val: 'mode-handler a_p_p_Nester',
                            css:{
                                height:"600px",
                                width: "1200px",
                                border:"5px dotted lightgreen",
                                "z-index":zChildren[this.extras.zSymbol].css["z-index"] + 1,
                                "display":"flex"
                            },
                            extras:{
                                judima:{
                                    format:"false"
                                },
                                appNest: {
                                    confirm:"true",
                                    co,
                                    nestGroup:"modeQuestions" + this.extras.zSymbol,
                                    nest:"A1",
                                }
                            }
                        }),
                        ryberUpdate.call(this.ryber,{
                            co,
                            bool: 'b',
                            text:'Add Input',
                            val: 'add-value a_p_p_Button',
                            css:{
                                "z-index":zChildren[this.extras.zSymbol].css["z-index"] + 1,
                                "height":"100px",
                                "width":"200px"
                            },
                            extras:{
                                judima:{
                                    format:"false"
                                },
                                appNest: {
                                    confirm:"true",
                                    co,
                                    nestGroup:"modeQuestions" + this.extras.zSymbol,
                                    nestUnder:"A1",
                                    nest:"B1",
                                }
                            }
                        }),
                        ryberUpdate.call(this.ryber,{
                            co,
                            bool: 'b',
                            text:'Remove Input',
                            val: 'remove-value a_p_p_Button',
                            css:{
                                "z-index":zChildren[this.extras.zSymbol].css["z-index"] + 1,
                                "height":"100px",
                                "width":"200px"
                            },
                            extras:{
                                judima:{
                                    format:"false"
                                },
                                appNest: {
                                    confirm:"true",
                                    co,
                                    nestGroup:"modeQuestions" + this.extras.zSymbol,
                                    nestUnder:"A1",
                                    nest:"B1",
                                }
                            }
                        })
                    ]
                    // console.log(this.zSymbols,this.ryber[co])

                }

            }

            //FIXME, ViewChildren has not changed yet it somehow manages to fire
            else{
                // console.log("trying to trigger")
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
                if(devObj.ref !== undefined){
                    this.ref = devObj.ref
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
            this.moveWithTarget = this.ryber[this.co].metadata.ngAfterViewInitFinished
            .pipe(
                catchError((error)=>{
                    return of(error)
                }),
            ).subscribe((result:any)=>{
                // attempt to place element in stack
                if(this.zSymbols !== undefined){
                    let align = [[this.extras.zSymbol,this.zSymbols[0]]]
                    //FIX ME, make more responsive for several TLD
                    this.zChildren[this.zSymbols[0]].css.top =(
                        numberParse(this.zChildren[this.extras.zSymbol].css.top) +
                        numberParse(this.zChildren[this.extras.zSymbol].css.height)
                    ).toString() + "px"
                    this.zChildren[this.zSymbols[0]].css.left =this.zChildren[this.extras.zSymbol].css.left
                    this.ref.detectChanges()
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

