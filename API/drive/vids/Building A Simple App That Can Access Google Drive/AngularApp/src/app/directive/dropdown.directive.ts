import {Directive, ElementRef, HostListener,Input,Renderer2} from '@angular/core';
import {fromEvent,Subject,ReplaySubject,BehaviorSubject, Subscription}  from "rxjs"
import {RyberService} from '../ryber.service'
import {deltaNode,eventDispatcher, numberParse,objectCopy} from '../customExports'
import { timestamp, distinctUntilChanged,distinctUntilKeyChanged, debounce, debounceTime } from 'rxjs/operators';


@Directive({
  selector: '[appDropDown]'
})
export class DropDownDirective {
    @Input() dropDown: any;
    @Input() extend:any;
    zChild:any
    co:any
    extras:any
    dropDownClick:string = 'false'
    group:any 
    ddSub:Subscription
    ddOptionSub:Subscription


    constructor(
        private el:ElementRef,
        private renderer: Renderer2,
        private ryber:RyberService
    ) { }

    @HostListener('click') onClick() {

        if(this.extras?.confirm === 'true'){ 
            // console.log(this.extras)
            // console.log(this.dropDownClick)
            // console.log(this.zChild)
            // console.log("click")

   

            // console.log(this.group)

            if(this.dropDownClick === 'open'){
                this.extras.options.symbols
                .forEach((y,j)=>{
                    this.renderer
                    .setStyle(
                        this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].element,
                        "width",
                        "0px"
                    )
                    this.renderer
                    .setStyle(
                        this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].element,
                        "height",
                        "0px" 
                    )
                    this.renderer
                    .setStyle(
                        this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].element,
                        "opacity",
                        0
                    ) 
                    this.renderer
                    .setStyle(
                        this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].element,
                        "top",
                        this.ryber[this.extras.co.valueOf()].metadata.zChildren[this.zChild[0]].css["top"]
                    ) 
                    this.renderer
                    .setStyle(
                        this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].element,
                        "z-index",
                        this.ryber[this.extras.co.valueOf()].metadata.zChildren[this.zChild[0]].css["z-index"] -1
                    )                      
                    this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].css["width"] = "0px"
                    this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].css["height"] = "0px"
                    this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].css["opacity"] = 0
                    this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].css["top"] = this.ryber[this.extras.co.valueOf()].metadata.zChildren[this.zChild[0]].css["top"]
                    this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].css["z-index"] = this.ryber[this.extras.co.valueOf()].metadata.zChildren[this.zChild[0]].css["z-index"] -1

                })                        
                this.dropDownClick = 'close'

            }

            else if(this.dropDownClick === 'close'){

                let vals = {
                    width:this.ryber[this.extras.co.valueOf()].metadata.zChildren[this.zChild[0]].css["width"],
                    height:this.ryber[this.extras.co.valueOf()].metadata.zChildren[this.zChild[0]].css["height"],
                    opacity:(this.ryber[this.extras.co.valueOf()].metadata.zChildren[this.zChild[0]].css["opacity"] === undefined ? 1 : this.ryber[this.extras.co.valueOf()].metadata.zChildren[this.zChild[0]].css["opacity"]),
                    top:"",
                    left:         this.ryber[this.extras.co.valueOf()].metadata.zChildren[this.zChild[0]].css["left"],
                    "z-index":        this.ryber[this.extras.co.valueOf()].metadata.zChildren[this.zChild[0]].css["z-index"]                       
                }
                this.extras.options.symbols
                .forEach((y,j)=>{

                    this.renderer
                    .setStyle(
                        this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].element,
                        "width",
                        vals["width"] 
                    )
                    this.renderer
                    .setStyle(
                        this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].element,
                        "height",
                        vals["height"] 
                    )
                    this.renderer
                    .setStyle(
                        this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].element,
                        "opacity",
                        vals["opacity"]
                    ) 
                    vals.top =                         (
                        numberParse(this.ryber[this.extras.co.valueOf()].metadata.zChildren[this.zChild[0]].css["top"]) + 
                        (
                            numberParse(this.ryber[this.extras.co.valueOf()].metadata.zChildren[this.zChild[0]].css["height"]) *
                            (j+1)-
                            (10*j)
                        )
                    ).toString() + "px"
                    this.renderer
                    .setStyle(
                        this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].element,
                        "top",
                        vals["top"]
                    ) 
                    this.renderer
                    .setStyle(
                        this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].element,
                        "left",
                        vals["left"]
                    ) 
                    this.renderer
                    .setStyle(
                        this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].element,
                        "z-index",
                        vals["z-index"] 
                    )                                                
                    this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].css["width"] = vals["width"]
                    this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].css["height"] = vals["height"]
                    this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].css["opacity"] = vals["opacity"]
                    this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].css["top"] = vals["top"]
                    this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].css["left"] = vals["left"]         
                    this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].css["z-index"] = vals["z-index"]                                                                                         
                })                  
                this.dropDownClick = 'open'    
            }            

                       
        }

        else if(this.extras?.confirm ==="prepare"){

            // console.log(this.extras.zSymbol)


            if(this.ryber[this.extras.co.valueOf()].metadata.zChildren[this.extras.zSymbol].innerText.item  !== this.el.nativeElement.innerHTML){
                this.ryber[this.extras.co.valueOf()].metadata.zChildren[this.extras.zSymbol].innerText.item = this.el.nativeElement.innerHTML
                this.ryber[this.extras.co.valueOf()].metadata.zChildren[this.extras.zSymbol].extras.appDropDown.selectVal = this.el.nativeElement.innerHTML
            }

            else{
                this.ryber[this.extras.co.valueOf()].metadata.zChildren[this.extras.zSymbol].innerText.item  = this.extras.truSelectVal
                this.ryber[this.extras.co.valueOf()].metadata.zChildren[this.extras.zSymbol].extras.appDropDown.selectVal = this.extras.truSelectVal
            }

            
            // eventDispatcher({
            //     element:this.ryber[this.extras.co.valueOf()].metadata.zChildren[this.extras.zSymbol].element,
            //     event:"click"
            // })
            setTimeout(()=>{
                this.ryber[this.extras.co.valueOf()].metadata.zChildren[this.extras.zSymbol].element.click()
            })

        }

        //this is causing a glitch refer to pikaday on how to do this stuff
        eventDispatcher({
            element:window,
            event:'resize'
        })       
        //  

    }


    ngOnInit(){
        this.extras = this.dropDown        
        if(this.extras?.confirm === 'true'){
            
            this.co = this.ryber[this.extras.co.valueOf()]
            this.extras.confirm = 'prepare'
            this.ddSub = this.ryber[this.extras.co.valueOf()].metadata.zChildrenSubject
            .subscribe((a)=>{
                this.zChild = [
                    this.extras.zSymbol,
                    this.ryber[this.extras.co.valueOf()].metadata.zChildren[this.extras.zSymbol]
                ]
                
                if(this.ryber.appCO0.metadata.appDropDown === undefined){
                    this.ryber.appCO0.metadata.appDropDown = {
                        gen:(function(){
                            return function *generator() {
                                var index = 0;
                                while (true)
                                yield (index++).toString();
                            }()
                        })()
                    } 
                }
                
                // running the modification once to differenate between the select and options
                if(this.ryber[this.extras.co.valueOf()].metadata.coDropDown === undefined){
                    this.ryber[this.extras.co.valueOf()].metadata.coDropDown = {
                        init:'false'
                    }
                }
                //

                let  {appDropDown} = this.ryber.appCO0.metadata
                this.group = this.extras.group = "dropDownGroup"+appDropDown.gen.next().value 
                               
                this.extras.change = "dropdowns"
                this.ryber[this.extras.co.valueOf()].metadata.zChildren[this.extras.zSymbol].innerText.item = this.extras.truSelectVal
                this.extras.selectVal = this.ryber[this.extras.co.valueOf()].metadata.zChildren[this.extras.zSymbol].innerText.item
                let multipleGroupHold = this.extras.multipleGroup
                delete this.extras.multipleGroup
                deltaNode({
                    intent:'add',
                    elements: Array.from(Array(this.extras.values.length),()=>{
                        return this.zChild[1]
                    }),
                    co:this.ryber[this.extras.co.valueOf()],
                    subCO:1, //decide to use the number of the signature
                    group:this.group,
                    symbolDeltaStart:8410,
                })   
                this.extras.multipleGroup    = multipleGroupHold
                this.extras.change = 'modified'  
                this.dropDownClick = "close"      

                // console.log(this.ddSub)
                // console.log(this.ryber[this.extras.co.valueOf()].metadata.zChildrenSubject)
                // console.log(this.extras.zSymbol)
                this.ddSub.unsubscribe()
            })  
            

            this.ddOptionSub = fromEvent(window,'resize')
            .subscribe(()=>{

                setTimeout(()=>{

                
                    if(this.dropDownClick === 'close'){
                        this.extras.options?.symbols
                        .forEach((y,j)=>{
                            this.renderer
                            .setStyle(
                                this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].element,
                                "width",
                                "0px"
                            )
                            this.renderer
                            .setStyle(
                                this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].element,
                                "height",
                                "0px" 
                            )
                            this.renderer
                            .setStyle(
                                this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].element,
                                "opacity",
                                0
                            ) 
                            this.renderer
                            .setStyle(
                                this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].element,
                                "top",
                                this.ryber[this.extras.co.valueOf()].metadata.zChildren[this.zChild[0]].css["top"]
                            ) 
                            this.renderer
                            .setStyle(
                                this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].element,
                                "z-index",
                                this.ryber[this.extras.co.valueOf()].metadata.zChildren[this.zChild[0]].css["z-index"] -1
                            )                      
                            this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].css["width"] = "0px"
                            this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].css["height"] = "0px"
                            this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].css["opacity"] = 0
                            this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].css["top"] = this.ryber[this.extras.co.valueOf()].metadata.zChildren[this.zChild[0]].css["top"]
                            this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].css["z-index"] = this.ryber[this.extras.co.valueOf()].metadata.zChildren[this.zChild[0]].css["z-index"] -1
        
                        })                        
                        // this.dropDownClick = 'close'
        
                    }
        

                    else if(this.dropDownClick === 'open'){
        
                        let vals = {
                            width:this.ryber[this.extras.co.valueOf()].metadata.zChildren[this.zChild[0]].css["width"],
                            height:this.ryber[this.extras.co.valueOf()].metadata.zChildren[this.zChild[0]].css["height"],
                            opacity:(this.ryber[this.extras.co.valueOf()].metadata.zChildren[this.zChild[0]].css["opacity"] === undefined ? 1 : this.ryber[this.extras.co.valueOf()].metadata.zChildren[this.zChild[0]].css["opacity"]),
                            top:"",
                            left:         this.ryber[this.extras.co.valueOf()].metadata.zChildren[this.zChild[0]].css["left"],
                            "z-index":        this.ryber[this.extras.co.valueOf()].metadata.zChildren[this.zChild[0]].css["z-index"]                       
                        }
                        this.extras.options?.symbols
                        .forEach((y,j)=>{
        
                            this.renderer
                            .setStyle(
                                this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].element,
                                "width",
                                vals["width"] 
                            )
                            this.renderer
                            .setStyle(
                                this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].element,
                                "height",
                                vals["height"] 
                            )
                            this.renderer
                            .setStyle(
                                this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].element,
                                "opacity",
                                vals["opacity"]
                            ) 
                            vals.top =                         (
                                numberParse(this.ryber[this.extras.co.valueOf()].metadata.zChildren[this.zChild[0]].css["top"]) + 
                                (
                                    numberParse(this.ryber[this.extras.co.valueOf()].metadata.zChildren[this.zChild[0]].css["height"]) *
                                    (j+1)-
                                    (10*j)
                                )
                            ).toString() + "px"
                            this.renderer
                            .setStyle(
                                this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].element,
                                "top",
                                vals["top"]
                            ) 
                            this.renderer
                            .setStyle(
                                this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].element,
                                "left",
                                vals["left"]
                            ) 
                            this.renderer
                            .setStyle(
                                this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].element,
                                "z-index",
                                vals["z-index"] 
                            )                                                
                            this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].css["width"] = vals["width"]
                            this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].css["height"] = vals["height"]
                            this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].css["opacity"] = vals["opacity"]
                            this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].css["top"] = vals["top"]
                            this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].css["left"] = vals["left"]         
                            this.ryber[this.extras.co.valueOf()].metadata.zChildren[y].css["z-index"] = vals["z-index"]                                                                                         
                        })                  
                        // this.dropDownClick = 'open'    
                    }    


                },100)             

            })            

        }   



    }



    ngOnDestroy(){
      
        if(this.extras?.confirm === 'true'){            
            this.ddOptionSub?.unsubscribe?.()
        }
        
    }

}

