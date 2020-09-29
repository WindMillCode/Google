import {   Component, OnInit,Input,ViewChildren,AfterViewInit,Inject, OnDestroy,ChangeDetectorRef,ChangeDetectionStrategy, Renderer2} from '@angular/core';
import {   RyberService   } from '../ryber.service';
import {   fromEvent,interval, of,from, Observable,merge, Subject,BehaviorSubject, combineLatest } from 'rxjs';
import {   catchError,take,timeout,mapTo, debounceTime,distinctUntilChanged, debounce,first, ignoreElements    } from 'rxjs/operators';
import {   zChildren,getTextWidth,numberParse,
    xPosition,resize,componentBootstrap,deltaNode,
    eventDispatcher,dropdown,dragElement,stack,xContain,minMaxDelta,
    objectCopy,responsiveMeasure
} from '../customExports'
import {environment} from '../../environments/environment' 

@Component({
  selector: 'app-template',
  templateUrl: '../template.component.html',
  styleUrls: ['./template.component.css'], // useful we dont need to repeat ourcless in ngCss
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateComponent implements OnInit  , AfterViewInit, OnDestroy {

    @ViewChildren('myVal') templateMyElements: any; 

    constructor(
        public ryber: RyberService,
        private ref: ChangeDetectorRef,
        private renderer: Renderer2
    ) { }
    
    @Input() appTV:string | any;
    foo:any= {}
    typesES:string = 'headingES'
    CONumber:Generator = (function(){
        return function *generator() {
            var index = 0;
            while (true)
            yield index++;
        }()
    })()    
    

    ngOnInit():void {
        console.log(this.appTV+ 'ngOnInit fires on mount')
    }

    ngAfterViewInit(): void {
        console.log( this.appTV+ 'ngAfterViewInit fires one remount') 



//component with static zChild only
/*0  */if(this.appTV === 'formCO'+ this.CONumber.next().value){


            let zChild = this.zChildInit()
            let staticZKeys = this.staticZKeysGen(zChild)           
            // console.log(zChild)


            // drags elements for you 
            // this.toPlace(zChild)
            //

            // highlights
            // this.highlights(zChild,2)
            //            

            // giving inputHandle what it needs
            this.inputHandleSendData({
                inputZChild:zChild
            }) 
            // 

            this.ryber.appEvents({
                typesES:this.typesES,
                event:'resize',
                of:(
                    this.ryber['formCO10'].metadata[this.appTV] !== undefined ? 
                    this.ryber['formCO10'].metadata[this.appTV] :
                    fromEvent(window,'resize')
                )
                // .pipe()
                .subscribe((moving)=>{ 

                
                    // console.log(numberParse(getComputedStyle(zChild["&#8353"].element).width))

                    if(   numberParse(getComputedStyle(zChild["&#8353"].element).width) > 1200   ){
                        
                        //element management
                        {
                            // functionality 
                            {

                                //clean up
                                Object
                                .keys(zChild)
                                .slice(2)
                                .forEach((x,i)=>{
                                    
                                    zChild[x].css["width"] =  zChild[x].cssDefault["width"]
                                    zChild[x].css["height"] =  zChild[x].cssDefault["height"]
                                    zChild[x].css["font-size"] =  zChild[x].cssDefault["font-size"]
                                })
                                this.ref.detectChanges()
                                //

                                // //center title
                                // zChild["&#8354"].css["left"] = xPosition({
                                //     target:numberParse(zChild["&#8354"].css["width"]),
                                //     contain: numberParse(getComputedStyle(zChild["&#8353"].element).width)
                                // }).toString() + "px"
                                // this.ref.detectChanges()

                                stack({
                                    zChildKeys:[
                                        "&#8353",
                                        ...this.ryber[this.appTV.valueOf()].quantity[1][1].symbol[1],
                                        ...this.ryber[this.appTV.valueOf()].quantity[1][1].symbol[2]
                                    ],
                                    ref: this.ref, 
                                    zChild,
                                    spacing:[null,40,40], 
                                    keep: [
                                        ...Array.from(Array(0),(x,i)=> {
                                            return ["&#" + (8355 + i),"&#8354"]
                                        }),                                                                                                                                                                                         
                                    ],                            
                                    type:'keepSomeAligned',
                                    heightInclude:[null,'f',...Array.from(Array(14),(x,i)=> {return 't'})]
                                })
                                this.ref.detectChanges() 

                                // align options
                                let align = [
                                    // Array.from(Array(2),(x,i)=> {return "&#" +(8355 + i)}),
                                ]
                                xContain({
                                    preserve:{
                                        align:align,
                                        zChild,
                                        ref:this.ref,
                                        width:1085,
                                        left:90                                        
                                    },
                                    type:'preserve'
                                })          
                                this.ref.detectChanges()  
                                //             

                                //modyfying board height
                                // zChild["&#8353"].css["height"] = (
                                //     numberParse(zChild["&#8356"].css["top"]) + 
                                //     numberParse(zChild["&#8356"].css["height"]) + 
                                //     50 -
                                //     numberParse(zChild["&#8353"].css["top"]) 
                                // ).toString() + "px"
                                // this.ref.detectChanges()
                                //                                
                            }
                            //

                            //position 
                            {
                                stack({
                                    type:"yPosition",
                                    yPosition:{
                                        zChild,
                                        moving:{
                                            top:moving.boardTop,
                                            height:moving.boardHeight
                                        },
                                        ref:this.ref
                                    }
                                })
                            }
                            //

                            //moving 
                            {

                            }
                            //
                        }
                        //


                    }


                    else if(    numberParse(getComputedStyle(zChild["&#8353"].element).width) > 0  ){
                        

                        //element management
                        {
                            // functionality 
                            {

                                
                                //clean up

                                //

                                // same start  
                                Object
                                .keys(zChild)
                                .slice(2)
                                .forEach((x,i)=>{
                                    
                                    zChild[x].css["width"] = (
                                        .9 * numberParse(getComputedStyle(zChild["&#8353"].element).width) 
                                    ).toString() + "px"
                                    this.ref.detectChanges()
                                    zChild[x].css["left"] = xPosition({
                                        target:numberParse(zChild[x].css["width"]),
                                        contain: numberParse(getComputedStyle(zChild["&#8353"].element).width)
                                    }).toString() + "px"
                                })
                                this.ref.detectChanges()
                                // 

                             

                                //serveral targets
                                let fonts = [
                                    // ...Array.from(Array(2),(x,i)=> {return "&#" +(8355 + i)}),
                                ]
                                .forEach((x,i)=>{
                                    zChild[x].css["font-size"]  =(
                                        resize({
                                            default:numberParse(   zChild[x].cssDefault["font-size"]   ),
                                            containActual:numberParse(   getComputedStyle(   zChild["&#8353"].element   ).width   ),
                                            containDefault:540,
                                            type:'nonUniform',
                                            misc:[.052,.06],
                                            mediaQuery:[379,286,0] 
                                        })      
                                    ).toString() + "px" 
                                })
                                this.ref.detectChanges()    
                                //   

                                //responsive height
                                // let heightTargets = [8354,8355,8356,8357,8359,8360,8363] 
                                staticZKeys
                                .forEach((x,i)=> {
                                    zChild[x].css["height"] = null
                                    zChild[x].css["display"] = "table"
                                    this.ref.detectChanges()
                                    zChild[x].css["height"] =  (zChild[x].element.getBoundingClientRect().height).toString() + "px"
                                })
                                //                                
                                
                                stack({
                                    zChildKeys:[
                                        "&#8353",
                                        ...this.ryber[this.appTV.valueOf()].quantity[1][1].symbol[1],
                                        ...this.ryber[this.appTV.valueOf()].quantity[1][1].symbol[2]
                                    ],
                                    ref: this.ref, 
                                    zChild,
                                    spacing:20,
                                    type:'simpleStack',
                                    heightInclude:['t','f',...Array.from(Array(11),(x,i)=> {return "t"})]
                                })                                             
                                this.ref.detectChanges()   
                                
                                //modyfying board height
                                // zChild["&#8353"].css["height"] = (
                                //     numberParse(zChild["&#8356"].css["top"]) + 
                                //     numberParse(zChild["&#8356"].css["height"]) + 
                                //     50 -
                                //     numberParse(zChild["&#8353"].css["top"]) 
                                // ).toString() + "px"
                                // this.ref.detectChanges()
                                //                                  

                            }
                            //

                            //position 
                            {
                                stack({
                                    type:"yPosition",
                                    yPosition:{
                                        zChild,
                                        moving:{
                                            top:moving.boardTop,
                                            height:moving.boardHeight
                                        },
                                        ref:this.ref
                                    }
                                })
                            }
                            //

                            //moving 
                            {

                            }
                            //
                        }
                        //

                        
                    }                    
                    

                    // so you wont have to find the panel
                    this.currentScroll(zChild)
                    // 

                    //send moving data to next CO
                        // this.ryber[this.appTV].metadata.formCO10.next({
                        //     boardTop:zChild["&#8353"].css["top"],
                        //     boardHeight:zChild["&#8353"].css["height"]
                        // })   
                    //                    

                })
            })
            
            
        }


//component with dyanic zChild
/*3  */ if(this.appTV === 'formCO'+ this.CONumber.next().value){


            let zChild = this.zChildInit()
            let staticZKeys = this.staticZKeysGen(zChild)
            // console.log(zChild)
            

            // drags elements for you 
            // this.toPlace(zChild)
            //

            // highlights
            // this.highlights(zChild,2)
            //    
            
            // giving inputHandle what it needs
            this.inputHandleSendData({
                inputZChild:zChild
            }) 
            //             
   
            this.ryber.appEvents({
                typesES:this.typesES,
                event:'resize',
                of:(
                    this.ryber['formCO2'].metadata[this.appTV] !== undefined ? 
                    this.ryber['formCO2'].metadata[this.appTV] :
                    fromEvent(window,'resize')
                )
                // .pipe()
                .subscribe((moving)=>{ 

                    
                    // dynnamic element management bootstrap
                    let  {deltaNodeSite} = this.ryber[this.appTV.valueOf()].metadata
                    let  {houseMembers,current} = deltaNodeSite === undefined ? this.foo :deltaNodeSite
                    let group = houseMembers
                    if( deltaNodeSite !== undefined){
                        // console.log(deltaNodeSite,houseMembers)     
                        // console.log(zChild)   
                        this.inputHandleModifyName({
                            group,
                            inputZChild:zChild,
                            current
                        })                          
                    }
                    //          

                    // console.log(numberParse(getComputedStyle(zChild["&#8353"].element).width))

                    if(   numberParse(getComputedStyle(zChild["&#8353"].element).width) > 1200   ){
                        
                        // element management
                        {

                            // functionality 
                            {

                                //clean up
                                Object
                                .keys(zChild)
                                .slice(2)
                                .forEach((x,i)=>{
                                    
                                    zChild[x].css["width"] =  zChild[x].cssDefault["width"]
                                    zChild[x].css["height"] =  zChild[x].cssDefault["height"]
                                    zChild[x].css["font-size"] =  zChild[x].cssDefault["font-size"]
                                })
                                this.ref.detectChanges()
                                //

                                //center title
                                // zChild["&#8354"].css["left"] = xPosition({
                                //     target:numberParse(zChild["&#8354"].css["width"]),
                                //     contain: numberParse(getComputedStyle(zChild["&#8353"].element).width)
                                // }).toString() + "px"
                                // this.ref.detectChanges()
                                //

                                stack({
                                    zChildKeys:[
                                        "&#8353",
                                        ...this.ryber[this.appTV.valueOf()].quantity[1][1].symbol[1],
                                        ...this.ryber[this.appTV.valueOf()].quantity[1][1].symbol[2]
                                    ],
                                    ref: this.ref, 
                                    zChild,
                                    spacing:[null,40,40], 
                                    keep: [
                                        ...Array.from(Array(0),(x,i)=> {
                                            return ["&#" + (8355 + i),"&#8354"]
                                        }),                                                                                                                                                                                                                                                                         
                                    ],                            
                                    type:'keepSomeAligned',
                                    heightInclude:[null,'f',...Array.from(Array(14),(x,i)=> {return 't'})]
                                })
                                this.ref.detectChanges() 

                                // align options
                                let align = [
                                    // Array.from(Array(2),(x,i)=> {return "&#" +(8384 + i)}),
                                    // Array.from(Array(3),(x,i)=> {return "&#" +(8355 + i)}),
                                    // Array.from(Array(3),(x,i)=> {return "&#" +(8358 + i)}),
                                ]
                                xContain({
                                    preserve:{
                                        align:align,
                                        zChild,
                                        ref:this.ref,
                                        width:1085,
                                        left:90
                                    },
                                    type:'preserve'
                                })          
                                // this.ref.detectChanges()  
                                //            
                                
                                if(group !== undefined){
                                    group
                                    .symbols
                                    .forEach((x,i) => {
                                        // console.log(x)
                                
                                        // stack
                                        stack({
                                            zChildKeys:x,
                                            ref: this.ref, 
                                            zChild,
                                            spacing:[null,0,0,40,40,40], 
                                            keep: [
                                                ...Array.from(Array(2),(y,j)=> {
                                                    return [x[1+j],x[0]]
                                                }),
                                                ...Array.from(Array(3),(y,j)=> {
                                                    return [x[3+j],x[2]]
                                                })                                                                                                                                                                                                                                                                                                                                                                         
                                            ],                            
                                            type:'keepSomeAligned',
                                            heightInclude:[null,'f','f',...Array.from(Array(3),(x,i)=> {return 't'})]
                                        })  
                                        //
                                        
                                        //xAlign
                                        let align = [
                                            Array.from(Array(3),(y,j)=> {return x[0+j]}),
                                            Array.from(Array(3),(y,j)=> {return x[3+j]}),
                                        ]
                                        xContain({
                                            preserve:{
                                                align:align,
                                                zChild,
                                                ref:this.ref,
                                                width:1085,
                                                left:90
                                            },
                                            type:'preserve'
                                        })  
                                        this.ref.detectChanges()
                                        //
                                
                                    });
                                }

                                //modyfying board height

                                //                                
                            }
                            //

                            //position 
                            {
                                stack({
                                    type:"yPosition",
                                    yPosition:{
                                        zChild,
                                        moving:{
                                            top:moving.boardTop,
                                            height:moving.boardHeight
                                        },
                                        ref:this.ref
                                    }
                                })

                                    
                                // console.log(x)
                                // console.log(i)
                                let attach = this.dynamicPosition({
                                    deltaDiff:50,
                                    group,
                                    zChild,
                                    current,
                                    attachVal:"&#8360",
                                    zChildKeys:[
                                        ...Array.from(Array(2),(x,i)=> {return "&#" + (8384 + i)}),                                                    
                                    ]
                                })


                                
                                                                 

                                // position board
                                // zChild["&#8353"].css["height"] = (
                                //     numberParse(zChild["&#8385"].css["top"]) + 
                                //     numberParse(zChild["&#8385"].css["height"]) + 
                                //     50 -
                                //     numberParse(zChild["&#8353"].css["top"]) 
                                // ).toString() + "px"
                                // this.ref.detectChanges()    
                                //                                        
                                                              


                            }
                            //

                            //moving 
                            {

                            }
                            //
                        }
                        //
                       
                    }


                    else if(    numberParse(getComputedStyle(zChild["&#8353"].element).width) > 0  ){
                        

                        //element management
                        {
                            // functionality 
                            {

                                
                                //clean up

                                //

                                // console.log(zChild)
                                // console.log(this.ryber['formCO3'])
                                // same start
                                staticZKeys
                                .forEach((x,i)=>{
                                    zChild[x].css["width"] = (
                                        .9 * numberParse(getComputedStyle(zChild["&#8353"].element).width) 
                                    ).toString() + "px"
                                    this.ref.detectChanges()
                                    zChild[x].css["left"] = xPosition({
                                        target:numberParse(zChild[x].css["width"]),
                                        contain: numberParse(getComputedStyle(zChild["&#8353"].element).width)
                                    }).toString() + "px"
                                })
                                this.ref.detectChanges()
                                // 
  

                                //serveral targets
                                let fonts = [
                                    // ...Array.from(Array(6),(x,i)=> {return "&#" +(8355 + i)}),
                                ]
                                .forEach((x,i)=>{
                                    zChild[x].css["font-size"]  =(
                                        resize({
                                            default:numberParse(   zChild[x].cssDefault["font-size"]   ),
                                            containActual:numberParse(   getComputedStyle(   zChild["&#8353"].element   ).width   ),
                                            containDefault:540,
                                            type:'nonUniform',
                                            misc:[.052,.06],
                                            mediaQuery:[379,286,0] 
                                        })      
                                    ).toString() + "px" 
                                })
                                this.ref.detectChanges()    
                                //   

                                 //responsive height
                                // let heightTargets = [8354,8355,8356,8357,8359,8360,8363] 
                                staticZKeys
                                .forEach((x,i)=> {
                                    zChild[x].css["height"] = null
                                    zChild[x].css["display"] = "table"
                                    this.ref.detectChanges()
                                    zChild[x].css["height"] =  (zChild[x].element.getBoundingClientRect().height).toString() + "px"
                                })
                                // 
                                
                                stack({
                                    zChildKeys:[
                                        "&#8353",
                                        ...this.ryber[this.appTV.valueOf()].quantity[1][1].symbol[1],
                                        ...this.ryber[this.appTV.valueOf()].quantity[1][1].symbol[2]
                                    ],
                                    ref: this.ref, 
                                    zChild,
                                    spacing:20,
                                    type:'simpleStack',
                                    heightInclude:['t','f',...Array.from(Array(11),(x,i)=> {return "t"})]
                                })                                             
                                this.ref.detectChanges()   

                                if(group !== undefined){
                                    group
                                    .symbols
                                    .forEach((x,i) => {
                                        
                                
                                        // same start
                                        x
                                        .forEach((y,j)=>{
                                            zChild[y].css["width"] = (
                                                .9 * numberParse(getComputedStyle(zChild["&#8353"].element).width) 
                                            ).toString() + "px"
                                            this.ref.detectChanges()
                                            zChild[y].css["left"] = xPosition({
                                                target:numberParse(zChild[y].css["width"]),
                                                contain: numberParse(getComputedStyle(zChild["&#8353"].element).width)
                                            }).toString() + "px"
                                        })
                                        this.ref.detectChanges()
                                        // 
                                
                                        //serveral targets
                                        x
                                        .forEach((y,j)=>{
                                            zChild[y].css["font-size"]  =(
                                                resize({
                                                    default:numberParse(   zChild[y].cssDefault["font-size"]   ),
                                                    containActual:numberParse(   getComputedStyle(   zChild["&#8353"].element   ).width   ),
                                                    containDefault:540,
                                                    type:'nonUniform',
                                                    misc:[.052,.06],
                                                    mediaQuery:[379,286,0] 
                                                })      
                                            ).toString() + "px" 
                                        })
                                        this.ref.detectChanges()    
                                        //  
                                        
                                            //responsive height
                                        // let heightTargets = [8354,8355,8356,8357,8359,8360,8363] 
                                        x
                                        .forEach((y,j)=> {
                                            zChild[y].css["height"] = null
                                            zChild[y].css["display"] = "table"
                                            this.ref.detectChanges()
                                            zChild[y].css["height"] =  (zChild[y].element.getBoundingClientRect().height).toString() + "px"
                                        })
                                        //                                          
                                
                                    stack({
                                        zChildKeys:x,
                                        ref: this.ref, 
                                        zChild,
                                        spacing:20,
                                        type:'simpleStack',
                                        heightInclude:[null,'t',...Array.from(Array(11),(x,i)=> {return "t"})]
                                    })                                             
                                    this.ref.detectChanges()                                                              
                                
                                    })                                    
                                }
                                
                            
                            }
                            //

                            //position 
                            {
                                stack({
                                    type:"yPosition",
                                    yPosition:{
                                        zChild,
                                        moving:{
                                            top:moving.boardTop,
                                            height:moving.boardHeight
                                        },
                                        ref:this.ref
                                    }
                                })



                                let attach = this.dynamicPosition({
                                    deltaDiff:50,
                                    group,
                                    zChild,
                                    current,
                                    attachVal:"&#8360",
                                    zChildKeys:[
                                        ...Array.from(Array(2),(x,i)=> {return "&#" + (8384 + i)}),                                                    
                                    ],
                                    type:'custom',
                                    customFn:((devObj)=>{
                                        stack({
                                            zChildKeys:[
                                                devObj.attach,
                                                ...Array.from(Array(2),(x,i)=> {return "&#" + (8384 + i)}),                                                    
                                            ],
                                            ref: this.ref, 
                                            zChild,
                                            spacing:[null,40,40], 
                                            keep: [],                            
                                            type:'keepSomeAligned',
                                            heightInclude:[null,...Array.from(Array(14),(x,i)=> {return 't'})]
                                        })                                            
                                        this.ref.detectChanges()                                        
                                    })
                                })
                                
                                    
                                    // console.log(x)
                                    // console.log(i)

                                    //
                                
                                                             

                                //modyfying board height
                                // zChild["&#8353"].css["height"] = (
                                //     numberParse(zChild["&#8385"].css["top"]) + 
                                //     numberParse(zChild["&#8385"].css["height"]) + 
                                //     50 -
                                //     numberParse(zChild["&#8353"].css["top"]) 
                                // ).toString() + "px"
                                // this.ref.detectChanges()
                                //                                   
                            }
                            //

                            //moving 
                            {

                            }
                            //
                        }
                        //
                        
                        
                    }                    
                    


                    // so you wont have to find the panel
                    // this.currentScroll(zChild)
                    // 

                    //send moving data to the next CO
                    // this.ryber[this.appTV].metadata.formCO10.next({
                    //     boardTop:zChild["&#8353"].css["top"],
                    //     boardHeight:zChild["&#8353"].css["height"]
                    // })                       

                })
            })
            
            let group = 'your group here'
            this.ryber.appEvents({
                typesES:this.typesES,
                event:'click',
                of:fromEvent(zChild["&#8384"].element,'click')  
                .subscribe(()=>{
                    deltaNode({
                        intent:'add',
                        elements: Array.from(Array(6),((x,i)=>{return zChild["&#" +(8355 + i) ]})),
                        co:this.ryber[this.appTV.valueOf()],
                        subCO:1, //decide to use the number of the signature
                        group,
                        symbolDeltaStart:8410,
                    })                    
                    this.ref.detectChanges()
                    zChild = this.zChildInit()

                    this.inputHandleSendData({
                        inputZChild:zChild
                    }) 

                    eventDispatcher(({
                        event:'resize',
                        element:window
                    }))  
                    // console.log(zChild)         
                })              
            })       
            
            this.ryber.appEvents({
                typesES:this.typesES,
                event:'click',
                of:fromEvent(zChild["&#8385"].element,'click')  
                .subscribe(()=>{

                    
                    deltaNode({
                        intent:'minus',
                        co:this.ryber[this.appTV.valueOf()],
                        group,
                        hook:'prepare'
                    })       

                    //clean up then take out DOM
                    eventDispatcher(({
                        event:'resize',
                        element:window
                    }))  
                    //     
                    
                    deltaNode({
                        intent:'minus',
                        co:this.ryber[this.appTV.valueOf()],
                        group
                    })               
                          
                    
                    
                    this.ref.detectChanges()
                    zChild = this.zChildInit()                    
                    // console.log(zChild)         
                })              
            })     
            
            // eventDispatcher(({
            //     event:'click',
            //     element:zChild["&#8384"].element
            // }))              
            
        }         

        this.ryber.appViewComplete.next(
            (function(qq){
                qq.ryber.appViewCompleteArray.push(   qq.appTV   )
            })(this)
        )         
    }    

    ngOnDestroy(): void {
        console.log(this.appTV+ '  ngOnDestroy fires on dismount')
    }

    private inputHandleSendData(devObj:{
        inputZChild:zChildren,
    }):void{
        
        
        let {inputZChild} = devObj
        // subjects meeded for input handle to work
        Object
        .keys(inputZChild)
        .forEach((x,i)=>{
            if(inputZChild[x].extras !== undefined && inputZChild[x].extras !== null ){
                if( inputZChild[x].extras.appInputHandle !== undefined){
                    inputZChild[x].extras.appInputHandle.zSymbol = x
                }
            }
        })       
        this.ryber[this.appTV.valueOf()].metadata.zChildrenSubject.next(inputZChild)
        //      
    }

    private inputHandleModifyName(devObj:{
        group:any, // part of deltaNODE
        current:any,
        inputZChild:zChildren
    }):void{
        let {group,current,inputZChild} = devObj
        if(group !== undefined && current.intent === 'add' && current.hook === 'done'){
            group.symbols[current.count]
            .forEach((x,i)=>{
                if(inputZChild[x].extras.appInputHandle === undefined){
                    return
                }
                else if(inputZChild[x].extras.appInputHandle.name !== group.elements[0][i].extras.appInputHandle.name ){
                    return
                }                         
                inputZChild[x].extras.appInputHandle.name += "_" + current.count
            })
        }       
    }
    
    private dynamicPosition(devObj:{
        deltaDiff:number, // spacing between dynamics
        group:any,// deltaNode group
        zChild:zChildren,
        current:any // deltaNode current current
        attachVal:string //zChildKey
        zChildKeys:Array<string>
        type?:string
        customFn?:Function
    }):any{
        console.log(devObj)
        let {deltaDiff,group,zChild,current,attachVal,type,zChildKeys,customFn} = devObj
        let zChildMovingKeys = zChildKeys
        if(group !== undefined){
            group
            .symbols
            .forEach((x,i)=>{
                let {delta} = minMaxDelta({
                    items:group.elements[i],
                    min:(item)=>{
                        return numberParse(item.css["top"])
                    },
                    max:(item)=>{
                        return numberParse(item.css["top"]) + 
                        numberParse(item.css["height"])
                    }                                                            
                })    
                delta  += deltaDiff 
                x.forEach((y,j) => {
                    zChild[y].css["top"] = (
                        numberParse(group.elements[i][j].css["top"]) +
                        (
                            delta *
                            (i +1)
                        )
                    ).toString() + "px"
                })
                this.ref.detectChanges() 
                group.extras[i].positioned = 'true'    
            })  
            
            let i = (current.intent === 'minus' && current.hook === 'prepare') ?
            group.symbols.length-2 :
            group.symbols.length-1          
            
            let x = i !== -1 ? 
            group.symbols[i]:
            group.elements[0]      
            
            let attach =  (i !== -1 ? x[x.length-1] : attachVal)  
            zChildKeys.unshift(attach)

            
            if(type === 'stack' || type === undefined){
                stack({
                    zChildKeys:zChildMovingKeys,
                    ref: this.ref, 
                    zChild,
                    spacing:[null,40,40], 
                    keep: [
                        ...Array.from(zChildMovingKeys.slice(1,3),(y,j)=> {
                            return [y,attach]
                        }),                                                                                                                                                                                                                                                                          
                    ],                            
                    type:'keepSomeAligned',
                    heightInclude:[null,...Array.from(Array(14),(x,i)=> {return 't'})]
                })                                            
                this.ref.detectChanges()
            }

            else if(type === 'custom'){
                customFn({
                    attach
                })
            }
        }   
    }
    private zChildInit(devObj?): any {
        return componentBootstrap({
            appTV: this.appTV,
            myElements: this.templateMyElements._results,
            ryber: this.ryber,
            zProps: {
                extras: 'true',
                val:'true',
                quantity:'true'
            }
        });
    }    

    private staticZKeysGen(staticZChild:zChildren): Array<string>{
        return Object
        .entries(staticZChild)
        .filter((x:any,i)=>{ 
            return x[1].quantity === 3
        })
        .map((x,i)=>{return x[0]})
        .slice(2) 
    }    

    private toPlace (staticZChild:zChildren) : any{
        return  Object.keys(staticZChild)
        .filter((x,i)=>{  return x.match("&#") !== null })
        .slice(2)
        .forEach((x,i)=>{
            dragElement(staticZChild[x].element)
        })
    }

    private highlights (staticZChild:zChildren,amount:number): void{
        Array.from(Array(2),(x,i)=> {return "&#" +(8354 + i)})
        .forEach((x,i)=>{
            staticZChild[x].css["background-color"]= "red"
        })        
    }

    private currentScroll(staticZChild:zChildren,reverse?:number): void{
        let current = Object
        .keys(staticZChild)
        .reduce((acc,x,i,src)=>{
            if(i === reverse){
                acc = x
            }
            return acc
        })        
        scrollTo(0,numberParse(getComputedStyle(staticZChild[current === undefined ? "&#8353" :current].element).top)-30)
    }
}







