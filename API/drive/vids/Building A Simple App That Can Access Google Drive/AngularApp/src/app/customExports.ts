import {RyberService} from './ryber.service'
import {defer} from 'rxjs'
import { Observable, of, Subject, Subscription } from "rxjs";
import { ChangeDetectorRef } from '@angular/core';
import { environment } from 'src/environments/environment';

declare global {
    interface Object { fromEntries: any; }
}




export class zChildren {
    element:  HTMLElement;
    css:Object | any;
    cssDefault?:Object;
    bool?:string;
    innerText?:null | string;
    link?:string;
    quantity?:any;
    mouseover?:any;
    mouseout?:any;
    Ielement?:any;
    symbol?:Symbol|String
}

export class componentObject { // not final
    quantity: any[]; 
    generator?: Generator;
    metadata?: Object | any; 
    init?:any 
}

// let final:any = {}; 





function wait(   ms   ){
    var start = new Date().getTime();
    var end = start;
    while(   end < start + ms   ) {
      end = new Date().getTime();
    }
}

export function flatDeep(arr, d = 1) { // polyfill for arr.flat
    return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
                 : arr.slice();
};


export function asyncData<T>(data: T) {
    return defer(() => Promise.resolve(data));
}

export function asyncError<T>(errorObject: any) {
    return defer(() => Promise.reject(errorObject));
}  

// The RxJS defer() operator returns an observable. 
// It takes a factory function that returns either a promise or an observable. 
// When something subscribes to defer's observable,
//  it adds the subscriber to a new observable created with that factory.


// The defer() operator transforms the Promise.resolve() into a new observable that, 
// like HttpClient, emits once and completes. 
// Subscribers are unsubscribed after they receive the data value.




export function componentBootstrap(   
    devObj:{
        appElement?:zChildren,
        appTV:any,
        css?:Object | any,
        bool?:string,
        cssDefault?:Object,
        classes?:Array<string>,
        myElements?:Element[],
        ryber?:RyberService,
        symbol?:String | Symbol,
        zProps?: any
    }
){


    if(   devObj.zProps === undefined   ){


        devObj.zProps = {}


    }


    devObj.classes = devObj.ryber[devObj.appTV].quantity[1].map((x,i) => {
        // return x.val.flat(Infinity)[0]
        return flatDeep(x.val,Infinity)[0]
    })
   
    let appZChild = {
        element: document.querySelector('[class=' + devObj.appTV + '],[id^="root"]') as HTMLElement,
        css: devObj.ryber[devObj.appTV].quantity[0][0].ngCss[0][0],
        bool: devObj.ryber[devObj.appTV].quantity[0][0].bool[0][0],
        cssDefault: devObj.ryber[devObj.appTV].quantity[0][0].ngCssDefault[0][0],
        symbol: devObj.ryber[devObj.appTV].quantity[0][0].symbol[0][0],
        // metadata:appMetadata,
        extras: devObj.zProps.extras === 'true' ?  
        ( devObj.ryber[devObj.appTV].quantity[0][0].extras !== undefined  ? 
            devObj.ryber[devObj.appTV].quantity[0][0].extras[0][0] 
            : undefined) 
        : undefined,
        val: devObj.zProps.val === 'true' ?  
            ( devObj.ryber[devObj.appTV].quantity[0][0].val !== undefined  ? 
                devObj.ryber[devObj.appTV].quantity[0][0].val[0][0] 
                : undefined) 
            : undefined,   
        quantity: devObj.zProps.quantity === 'true' ?  
            ( devObj.ryber[devObj.appTV].quantity[0][0].quantity !== undefined  ? 
                devObj.ryber[devObj.appTV].quantity[0][0].quantity[0][0] 
                : undefined) 
            : undefined,                     
    }
    let zChild = {"&#8352":appZChild}

    let zGrid = {
        a:0, 
        b:0, 
    }  
    let zCheckpoint = devObj.myElements.length === 1 ? [0] : [0,1] 
    zCheckpoint.map((y:any,j:any)=>{
        zGrid.a = 0;
        // console.log(devObj.myElements.length === 1 ? devObj.myElements : devObj.myElements.slice(y,zCheckpoint[j+1]));
        (function(){
            return devObj.myElements.length === 1 ? devObj.myElements : devObj.myElements.slice(y,zCheckpoint[j+1])
        })().map((x:any,i:any)=>{  
            while(   
                devObj.ryber[devObj.appTV].quantity[1][j].quantity[zGrid.a][zGrid.b] === undefined &&   
                zGrid.b +1 > devObj.ryber[devObj.appTV].quantity[1][j].quantity[zGrid.a].length
            ){  
                zGrid.a +=1
                

                if(   devObj.ryber[devObj.appTV].quantity[1][j].quantity[zGrid.a][zGrid.b] === undefined   ){


                    zGrid.b = 0


                }


            }
            // console.log(zGrid,j,i)
            // console.log(devObj.ryber[devObj.appTV].quantity[1][j].bool[zGrid.a][zGrid.b] )
            // console.log(x.nativeElement.className.split(" ")[0] === devObj.ryber[devObj.appTV].quantity[1][j].val[zGrid.a][zGrid.b] )
            let zClassTarget = devObj.ryber[devObj.appTV].quantity[1][j].val[zGrid.a][zGrid.b].split(" ")[0]

            while(
                x.nativeElement.className.split(" ")
                .reduce((acc,x,i)=>{
                    if(x === zClassTarget ){
                        acc = false
                    }
                    return acc
                },true)  &&
                devObj.ryber[devObj.appTV].quantity[1][j].val[zGrid.a][zGrid.b] !== undefined
            ){
                
                // console.log(zClassTarget)
                zGrid.b += 1

                if(
                    devObj.ryber[devObj.appTV].quantity[1][j].val[zGrid.a+1] !== undefined
                ){

                     
                    for(   let i in devObj.ryber[devObj.appTV].quantity[1][j].val[zGrid.a+1]   ){


                        if(   x.nativeElement.className.split(" ")[0] === devObj.ryber[devObj.appTV].quantity[1][j].val[zGrid.a+1][i]   ){


                            zGrid.a += 1
                            zGrid.b = parseInt(i)
                            break
                            
                            
                        }


                    }


                }

            }


            if(   
                x.nativeElement.className.split(" ")
                .reduce((acc,x,i)=>{
                    if(x === zClassTarget ){
                        acc = true
                    }
                    return acc
                },false)  &&
                (   
                    devObj.ryber[devObj.appTV].quantity[1][j].bool[zGrid.a][zGrid.b] !== 'false'   
                    // true                      
                )    
            ){               



                zChild[devObj.ryber[devObj.appTV].quantity[1][j].symbol[zGrid.a][zGrid.b]] = {
                    element:x.nativeElement as HTMLElement,
                    css:devObj.ryber[devObj.appTV].quantity[1][j].ngCss[zGrid.a][zGrid.b],
                    innerText: devObj.ryber[devObj.appTV].quantity[1][j].text[zGrid.a][zGrid.b],
                    bool:devObj.ryber[devObj.appTV].quantity[1][j].bool[zGrid.a][zGrid.b],
                    cssDefault:devObj.ryber[devObj.appTV].quantity[1][j].ngCssDefault[zGrid.a][zGrid.b],
                    extras: devObj.zProps.extras === 'true' ?  
                        ( devObj.ryber[devObj.appTV].quantity[1][j].extras !== undefined  ? 
                            devObj.ryber[devObj.appTV].quantity[1][j].extras[zGrid.a][zGrid.b] 
                            : undefined) 
                        : undefined,
                    val: devObj.zProps.val === 'true' ?  
                        ( devObj.ryber[devObj.appTV].quantity[1][j].val !== undefined  ? 
                            devObj.ryber[devObj.appTV].quantity[1][j].val[zGrid.a][zGrid.b] 
                            : undefined) 
                        : undefined,  
                    quantity: devObj.zProps.quantity === 'true' ?  
                        ( devObj.ryber[devObj.appTV].quantity[1][j].quantity !== undefined  ? 
                            devObj.ryber[devObj.appTV].quantity[1][j].quantity[zGrid.a][zGrid.b] 
                            : undefined) 
                        : undefined,                                                
                }
                // console.log(zChild)
                

                if(   
                    devObj.ryber[devObj.appTV].quantity[1][j].quantity[zGrid.a][zGrid.b+1] === undefined   
                      
                ){


                    zGrid.a += 1
                    zGrid.b = 0       
                    
                    
                }


                
                else if(   true   ){


                    zGrid.b += 1       
                    
                    
                }


            }
            
            
            else if(
                devObj.ryber[devObj.appTV].quantity[1][j].bool[zGrid.a][zGrid.b] === 'false' 
            ){


                if(   devObj.ryber[devObj.appTV].quantity[1][j].quantity[zGrid.a][zGrid.b+1] === undefined   ){


                    zGrid.a += 1
                    zGrid.b = 0       
                    
                    
                }


                
                else if(   true   ){


                    zGrid.b += 1       
                    // 
                    
                }
                
                
            }
            

        })
        
    })   
    // zChild.forEach((x,i)=>{
    //     console.log(x.symbol)
    // }) 
    return zChild  
}
/* test 
1. if I can take anything away from the middle
2. if I can take from a non first subcomponent
3. if I can take from the end of any subcomponent 
4. if I can take several at a time 
5. if you can cancel the end element of a subcomponent element and the beginning element of the next at the same time
work on 2 and 3
*/

/*
desc
zProps, zChild optional props 
 */

/* this function helps calculate 
the css top of items in a dropdown when those 
options do not have the same height

if fn is irregularWords
    - that meansn you have a dropdown but the words are not the same length so that can word wrap 
    this fn deals with all of that, 
    - for the heightDiff we are working on this but 
    you must know at what pixel length the browser will word wrap and if if you have 
    and your x padding will play a role, your y padding is needed alse because it determines the height
*/ 
export function dropdown(   devObj:{
    font?:Array<any>, 
    heightVal?: number,
    heightDiff? : number,
    stringAssembly?: Array<string>,
    paddingy:Array<number>,
    fn:'irregularWords' 
}   ){

    
    if(devObj.fn === 'irregularWords'){


        let finalVal = devObj.heightVal 
        let  extender = devObj.stringAssembly.length != 1  ?  (()=>{
            let multiFinal = 1    
            let controlK = 0                   
            devObj.stringAssembly.forEach((y,j)=>{ 
                

                if(j === controlK || controlK === 0 ){ 


                    let k = j 
                    let testingString= ''
                    while(k != devObj.stringAssembly.length){
                        testingString += devObj.stringAssembly[k] + " "  
                        
                        
                        if(
                            Math.ceil(
                                getTextWidth({
                                    elementText:testingString.slice(0,-1),
                                    font: devObj.font.join(" ")
                                })/devObj.heightDiff 
                            )  >  1 
                        ){
                            // console.log('get j == to',k)
                            controlK = k 
                            break 
                        }      
                        
                        
                        k += 1         

                    }
                    testingString = testingString.slice(0,-1)


                    console.log(
                        testingString,
                        getTextWidth({
                            elementText:testingString,
                            font: devObj.font.join(" ") 
                        }),
                        devObj.heightDiff,
                        Math.ceil(
                            getTextWidth({
                                elementText:testingString,
                                font: devObj.font.join(" ") 
                            })/devObj.heightDiff 
                        )                                                
                    )


                    if(
                        Math.ceil(
                            getTextWidth({
                                elementText:testingString,
                                font: devObj.font.join(" ") 
                            })/devObj.heightDiff 
                        ) > 1                                                                            
                    ){
                        multiFinal += 1
                    }    


                }
                
                
            })
            return multiFinal
            
        })() : 1   
        devObj.heightVal += (
            (
                16 * extender
            ) + (
                devObj.paddingy.length == 1 ? 
                devObj.paddingy[0] * 2 :
                devObj.paddingy[0] + devObj.paddingy[1]
                )
        ) 
        return [finalVal,devObj.heightVal]


    }

}


export function getTextWidth(   devObj:{elementText:string,font:string}   ){
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    ctx.font = devObj.font;  // This can be set programmaticly from the element's font-style if desired
    return ctx.measureText(devObj.elementText).width;
}

export function eventDispatcher(   devObj:{event:string,element:HTMLElement | Window | Element}   ){
    
    try {
        let event0= new Event(devObj.event)   
        devObj.element.dispatchEvent(event0)  
        // console.log(event0)
    } 
    catch(e){
        let eventLegacy = document.createEvent("Event");
        eventLegacy.initEvent(devObj.event, false, true);       
        devObj.element.dispatchEvent(eventLegacy)
    }  
}

export function numberParse(   dimension:any   ){
    dimension = parseFloat(dimension.split("p")[0])
    return dimension;
}

export function resize(   devObj:any   ){
    // console.log(   devObj   )
    let result = null


    if(   devObj.misc === undefined   ){
        devObj.misc = [.12]
    }
    

    if(   devObj.type === 'direct'   ){


        result = 
        (
            devObj.default -
            (
                devObj.containDefault   -
                devObj.containActual    
            ) * 
            devObj.misc[0]
        )


    }


    if(   devObj.type === 'nonUniform'   ){


        try{ 
            devObj.mediaQuery.slice(1)
            .forEach((x,i) => {
                if(x < devObj.containActual){
                    result = 
                    (
                        devObj.default -
                        (
                            devObj.containDefault   -
                            devObj.containActual    
                        ) * 
                        devObj.misc[i]
                    )  
                    throw(null)
                    // throw('got my result')              
                }
            })
        }
        catch(e){

        }



    }
    

    else if(   devObj.type !== 'direct' ){


        result = (
            devObj.default *
            (
                (   
                    (  
                        devObj.containActual  /
                        devObj.containDefault   
                    ) -
                    devObj.misc[0]   
                ) 
            )
        ) 


    }

    return result = result > devObj.default  ? 
        devObj.default :
        result      
}


export function xPosition(devObj){


    if(   devObj.containPos === undefined   ){


        devObj.containPos = .5
        
        
    }


    if(   devObj.targetPos === undefined   ){

        
        devObj.targetPos = .5
        
        
    }
    
    return (    
        (   devObj.contain*devObj.containPos   ) -  
        (   devObj.target*devObj.targetPos   )   
    ) ; 
}

export function include (devObj){
    let i = devObj.index
    
    if(   devObj.include !== undefined   ){
        if (typeof(devObj.include) === 'string'){


            if(   devObj.include === 'f'){ // for false
                return 0
            }

            else{
                return devObj.item   
            }
        }

        else{ // FIXME check to see if array 


            if(   devObj.include[i] === 'f'){
                return 0
            }

            else{
                return devObj.item   
            }
        }
    }                     
    return  devObj.item   
}

export function minMaxDelta(devObj){ 
    /*calculates the 1d dimenensions of an entry of objects */
    let delta:any = {
        min:Infinity,
        max:0,
    }    
    devObj.items.forEach((x,i)=>{
        let myMin = devObj.min(x)
        let myMax = devObj.max(x)
        if( myMin < delta.min){
            delta.min = myMin 
        }
        if( myMax > delta.max){
            delta.max = myMax
        }
    })
    delta.delta = delta.max-delta.min
    return delta
}

function appGenerateSelector(   devObj   ){
    var a = 0;
    var string = '';
    while(   a!==devObj.times   ){
        string += devObj.val +a+','
        a+=1
    }
    return string.slice(0,-1)
}

export function numDigits(
    devObj:{
        x:number
    }
) {  
    devObj.x = Number(String(devObj.x).replace(/[^0-9]/g, ''));
    return Math.max(Math.floor(Math.log10(Math.abs(devObj.x))), 0) + 1;
}


export function objectCopy(obj){
    return JSON.parse(   JSON.stringify(   obj  )   )
}

export function dragElement(elmnt) { // use this code dragElement(zChild.element);
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
    elmnt.onmousedown = dragMouseDown;
  
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
}

export function isDate(date) {
    // @ts-ignore
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}



// Init Funtions

export function esInit (qq,eventSubscriptions){
    eventSubscriptions.forEach((b)=>{
        let es = qq[b.valueOf()]
        Object.keys(es).forEach((x,i)=>{
            es[x.valueOf()].generator = (function(){
                return function *generator() {
                    var index = 0;
                    while (true)
                    yield (index++).toString();
                }()
            })()
        })            
    })
}


export function coInit (a,componentObjects,additional?) {
    
    componentObjects.forEach((x,i)=>{
        let co = a[x.valueOf()]
        
        // giving a subject representation so components can send data to each component
        componentObjects.forEach((c)=>{
            co.metadata[c.valueOf()] = new Subject<any>()
        }) 
        //

        //init the subCO data for the app element
        co.quantity[0].push(
            objectCopy(
                {
                    signature:"app",
                    quantity:[[3]],
                    bool:[["true"]], 
                    val:[
                        [
                            x
                            .valueOf()
                            .split("CO")[0]
                            .split("")
                            .join("_")+"_App"
                        ]
                    ], 
                    text:[
                            []
                    ],
                    symbol:[["&#8352"]],
                    metadata:{// deprecated use directives and the subCO extras instead
                        mouseover:[ 
                            [],
                            [],
                            []
                        ],
                        mouseout:[
                            [],
                            [],
                            []
                        ]                            
                    },
                    ngCss:[
                        [
                            {
                                
                                top:"0px",
                                width:"100%",
                                "z-index":componentObjects.length - i
                            }
                        ]                         
                    ],                  
                    extras:[
                        [],
                        [],
                        []                         
                    ]
                } 
            )
        )
        //

        // additional things you want to do for all components
        if(additional !== undefined){
            additional({
                co
            })
        }
        //        

        //providing for cssDefaults
        co.quantity
        .forEach((y,j)=>{
            co.quantity[j]
            .forEach((z,k)=>{
                z.text
                .forEach((w,h)=>{
                    w.forEach((xx,ii)=>{
                        w[ii] = {item:xx}
                    })
                })
                z.ngCssDefault = objectCopy( z.ngCss)
            })
        })
        //

        // dont delete yet make sure abovce code block works
        // for(let i = 0; i !== co.quantity.length; i++){
        //     for(let j = 0; j !== co.quantity[i].length; j++){
        //         co.quantity[i][j].text.forEach((z,k)=>{
        //             z.forEach((w,h)=>{
        //                 z[h] = {item:w}
        //             })
        //         })            
        //         co.quantity[i][j].ngCssDefault = objectCopy(   co.quantity[i][j].ngCss   )   
        //     }                    
        // }
        //
        //



    })

}

// ryber function
export function ryberUpdate(
    devObj:{
        co:string,
        type?:string,
        css?:any | CSSRuleList,
        extras?:any,
        bool?:string,
        text?:string,
        val?:string,
        signature?:string,
        spot?:number,
        symbolStart?:Array<number>
    }
){
    let {co,type,css,extras,bool,text,val,signature,symbolStart,spot}= devObj
    
    
    let ryber = this
    if(ryber[co.valueOf()] === undefined){
        let bodySymbol = "&#8353"
        if(   symbolStart === undefined){
            symbolStart = [8354,8384]   
        }

        else if(   symbolStart[1] === undefined){
            symbolStart[1] = 8384   
        }        
        let generator = { 
            1:function *generator() {
                var index = symbolStart[0];
                while (true)
                yield index++;
            }(),
            2:function *generator() {
                var index = symbolStart[1];
                while (true)
                yield index++;
            }()
        }
        ryber[co.valueOf()] = objectCopy(
            { 
                metadata:{
                },        
                quantity:[
                    [],
                    [
                        {
                            signature:"containing",
                            quantity:[[3]],
                            bool:[["div"]], 
                            val:[
                                [
                                    co
                                    .valueOf()
                                    .split("CO")[0]
                                    .split("")
                                    .join("_")+"_Board"                                    
                                ],
                            ],  
                            text:[
                                [],
                            ],
                            symbol:[[bodySymbol]],
                            ngCss:[
                                [
                                    (()=>{
                                           if(css !== undefined){
                                               css.width = "100%" //must always be set to this value
                                               return css
                                           } 
                                            
                                            return {
                                                height:"400px",
                                                width:"100%",
                                                "z-index":"1",
                                                "background-color":"rgb(255, 241, 204)",
                                                top:"0px"                                
                                            }
                                    })(),                                                                                                      
                                ]                    
                            ],                  
                            extras:[
                                [
                                    (
                                        extras !== undefined ? extras: {}
                                    ),                                    
                                ],
                                [],
                                []                      
                            ]
                        },                      
                        ...Array.from(Array(1),()=> {
                            return {
                                signature:(signature !== undefined  ? signature: ""),
                                quantity:[
                                    [],
                                    [],
                                    []
                                ],
                                bool:[
                                    [],
                                    [],
                                    []
                                ], 
                                val:[
                                    [],
                                    [],
                                    []
                                ], 
                                text:[
                                    [],
                                    [],
                                    []
                                ],
                                symbol:[
                                    [],
                                    [],
                                    []
                                ],                            
                                ngCss:[
                                    [],
                                    [],
                                    []                   
                                ],      
                                extras:[
                                    [],
                                    [],
                                    []                      
                                ]
                        }})                                                                                                                                                                                                                   
                    ]
                ],       
            }            
        )
        ryber[co.valueOf()].generator = generator
        return bodySymbol
    }

    else if(type === undefined){
        type = 'add'
    }
    
    if(type === 'add'){
        let index = 1
        let subCO = ryber[co.valueOf()].quantity[1][1]
        
        // validating bool
        if(bool === undefined){
            bool = "p"
        }

        else if(
            ['div','img','b','embed','video','audio','mat-spinner']
            .includes(bool)
        ){
            index = 2
        }

        else if(
            ![
                ...Array.from(Array(6),(x,i)=>{return 'h'+(i+1)}),
                'a',
                'p',
                'code',
                'span',
                'strong',
                'i',
                'ta',
                'date',
                'c',
                'l',
                'f',
                'u'
            ]
            .includes(bool)
        ){
            bool = 'p'
            index = 1
        }        
        //

        //validating val
        if(val === undefined){
            val = co
                .valueOf()
                .split("CO")[0]
                .split("")
                .join("_")
                
            if(subCO.val[index].length === 0){
                val += "_Heading"  
            }

            else {
                val += "_Item"  
            }            
        }

        else{
            val = co
            .valueOf()
            .split("CO")[0]
            .split("")
            .join("_") + "_" + val

        }
        //

        //valdidating signature
        if(subCO.signature !== undefined && signature === undefined){
            signature = subCO.signature
        }
        //

        //validating css
        if( css === undefined){
            css = {
                "z-index":3
            }
            if( css["z-index"] === undefined){
                css["z-index"] = 3
            }
        }
        //        

        // adding the zChild
            subCO.quantity[index].push(3)

            let symbol = ryber[co.valueOf()].generator[index].next().value
            if( spot === undefined   ){
                subCO.text[index].push(text)
                subCO.val[index].push(val)
                subCO.bool[index].push(bool)
                subCO.ngCss[index].push(css)
                subCO.extras[index].push(extras)
                subCO.symbol[index].push(
                    "&#" + symbol
                )
            }

            else{
                subCO.text[index]  .splice(spot,0,text)
                subCO.val[index]   .splice(spot,0,val)
                subCO.bool[index]  .splice(spot,0,bool)
                subCO.ngCss[index] .splice(spot,0,css)
                subCO.extras[index].splice(spot,0,extras)
                subCO.symbol[index].splice(spot,0,
                    "&#" + symbol
                )                
            }
            subCO.signature = signature
        //
        // console.log(bool,index)
        // console.log(subCO)
        return "&#" + symbol
    }

}
//

//Action functions

export function stack(   
    devObj:{
        zChildKeys?:Array<string>, // the zChild keys
        ref?:ChangeDetectorRef,
        zChild?:any,
        spacing?:Array<number> | number,
        xAlign?:Array<string> | string,
        type:string,
        keep?:any,
        zChildCss?:string,
        heightInclude?: Array<string> | string,
        start?: number,
        yPosition?:{
            zChild:any,
            moving:{
                top:string
                height:string
            },
            ref:ChangeDetectorRef
        }
         
    } 
){

    if(devObj.zChildCss === undefined){
        devObj.zChildCss = 'true'
    }

    if(devObj.zChildKeys !== undefined){
        devObj
        .zChildKeys = devObj
        .zChildKeys
        .filter((x,i)=>{
            return devObj.zChild[x] !== undefined
        })
        // return
    }  

    if(devObj.type === 'simpleStack'){

        devObj
        .zChildKeys
        .forEach((x,i)=>{


            if( i === 0){

                if(   devObj.start !== undefined   ){

                    devObj.zChild[x].css['top'] = devObj.start.toString() + "px"
                }    
                return 
            } 
            
            let prev = devObj.zChildKeys[i-1]
            devObj.zChild[x].css['top'] =  (

                (
                    devObj.zChildCss === 'true' ? 
                    (
                        numberParse(      devObj.zChild[prev].css['top']   ) +
                        include({
                            item:numberParse(      devObj.zChild[prev].css['height']   ),
                            include:devObj.heightInclude,
                            index:i  
                        })
                                        
                    ):
                    (
                        numberParse(   getComputedStyle(   devObj.zChild[prev].element   )['top']   ) +
                        include({
                            item:numberParse(   getComputedStyle(   devObj.zChild[prev].element   )['height']   ),
                            include:devObj.heightInclude,
                            index:i  
                        })                    
                        
                    ) 
                )
                +
                (
                    typeof(devObj.spacing) === 'number' ?  
                    devObj.spacing : 
                    (
                        devObj.spacing[i] === undefined ?
                        devObj.spacing[devObj.spacing.length-1] :
                        devObj.spacing[i]
                    )
                    
                )
            ).toString() + "px"

            if(   devObj.xAlign !== undefined   ){
                devObj.zChild[x].css['left'] = typeof(devObj.xAlign) === 'string' ?  
                devObj.xAlign :
                (
                    devObj.xAlign[i] === null ? 
                    devObj.zChild[x].css['left'] :
                    devObj.xAlign[i]
                )
            }
            devObj.ref.detectChanges()

        })


    }


    else if(devObj.type === 'keepSomeAligned'){

        if( devObj.keep === undefined){
            devObj.keep = []
        }
        // devObj.keep = Object.fromEntries(devObj.keep)
        // console.log(devObj.keep)
        let keep  = {}
        devObj
        .keep
        .forEach((x,i)=>{
            keep[x[0].valueOf()] = x[1]
        })
        devObj
        .zChildKeys
        .forEach((x,i)=>{

            
            // console.log("firing",x)

            if( i === 0){

                if(   devObj.start !== undefined   ){

                    devObj.zChild[x].css['top'] =  devObj.start.toString() + "px"

                }
                return 
            } 
          
            let prev = devObj.zChildKeys[i-1]
            devObj.zChild[x].css['top'] = (

                (
                    devObj.zChildCss === 'true' ? 
                    (
                        numberParse(      devObj.zChild[keep[x.valueOf()] !== undefined ? keep[x.valueOf()] : prev].css['top']   ) +
                        include({
                            item:numberParse(      devObj.zChild[keep[x.valueOf()] !== undefined ? keep[x.valueOf()] : prev].css['height']   ) ,
                            include:devObj.heightInclude,
                            index:i  
                        })                   
                    ):                
                    (
                        numberParse(   getComputedStyle(   devObj.zChild[keep[x.valueOf()] !== undefined ? keep[x.valueOf()] :  prev].element   )['top']   ) +
                        include({
                            item:numberParse(   getComputedStyle(   devObj.zChild[keep[x.valueOf()] !== undefined ? keep[x.valueOf()] :  prev].element   )['height']   ),
                            include:devObj.heightInclude,
                            index:i  
                        })   
                    )
                )
                +
                (
                    typeof(devObj.spacing) === 'number' ?  
                    devObj.spacing : 
                    (
                        devObj.spacing[i] === undefined ?
                        devObj.spacing[devObj.spacing.length-1] :
                        devObj.spacing[i]
                    )
                )



            ).toString() + "px"   
            if(   devObj.xAlign !== undefined   ){
                devObj.zChild[x].css['left'] = typeof(devObj.xAlign) === 'string' ?  
                devObj.xAlign :
                (
                    devObj.xAlign[i] === null ? 
                    devObj.zChild[x].css['left'] :
                    devObj.xAlign[i]
                )
            }
            
            // console.log(devObj)
            devObj.ref.detectChanges()
            
        })


    }   


    else if(devObj.type === 'yPosition'){
        // ussually for the position part of the media query
        let {zChild,moving,ref}= devObj.yPosition
        let diff = -1 *(
            numberParse(zChild["&#8353"].css["top"]) -
            (
            numberParse(moving.top) +
            numberParse(moving.height)
            )
        )      
        
        zChild["&#8353"].css["top"] = (
            numberParse(moving.top) +
            numberParse(moving.height)
        ).toString() + "px"
        ref.detectChanges()  

        Object.keys(zChild)
        .slice(2)
        .forEach((x,i)=>{
            zChild[x].css["top"] = (
                numberParse(zChild[x].css["top"]) +
                diff 
            ).toString() + "px"
        })
        ref.detectChanges()
    }
    
    
}

/*
the parts must be equal to the measure to begin with
stops where its supposed to stop to change functionality
    points: array of xcoords where action should change
    action array represent each part of the ration
        k -keep part must stay the same length
        c - part must shrink or grow according to the measure
*/
export function xContain(
    devObj:{
        measure?:zChildren | number,
        parts?: Array<zChildren>,
        type:string,
        stops?: any,
        debug? :string  | boolean
        preserve?:{
            align:Array<string> | Array<string>[] 
            zChild:zChildren[]
            ref:ChangeDetectorRef,
            targetPos?:Array<number>,
            containPos?:Array<number>
            type?:string
            width?:number
            left?:number
        }
    }
){

/* changing flex ratio according to needs of dev
    / to explain how the browser sees ratios
    / 1100 = totoal_width+ length
    / 90 + 540 + 650 + 1100 == 1100
    / where x % 2 ==0 is left and ==1 width
    /1.  you must think that change in front affects change in back but chnage in back has nothing to  do with change in front
    / [ 90 , 540 , 650, 1100 ]
        if i take 40 from total and only the last changes my array is
            [ 90 , 540 , 650, 1060 ]
            however if first changes
            [ 50 , 500 , 610, 1060 ]
            if the second changes
            [ 90 , 500 , 610, 1060 ]
        if I take 80 from total and I want my 2nd and 3rd to to change
            [ 90 , 500 , 570, 1020 ]
        if I take 80 from total and I want my 1nd and 2rd to to change
            [ 50 , 460 , 570, 1020 ] 
        if you find the differences  x!= 0 ? [x] - [x-1] : [x] - 0, you will see the dimensions
            of what you needed to stay the same stay the same
        best to use partsTotal and recalate the whole because you might not have gotten it the same but itdowns not
        matter to the fn
    if the total were the same, a decrease in one part would be increas in others so with that rule
        [ 90 , 540 , 650, 1100 ] and I wanted the 3rd to shrink
        [90 , 540 , 550, 1100 ] 
        550 - 540 = 10 
        1100 - 550 = 550 
        see the deifference but browsers look at it like 1, thats what this function does

    */
    {
        
        if(devObj.type === 'preserve'){


            if( devObj.preserve.targetPos === undefined){
                devObj.preserve.targetPos = []
            }
            if( devObj.preserve.containPos === undefined){
                devObj.preserve.containPos = []
            }         
            devObj
            .preserve
            .align
            .forEach((x,i)=>{
                

                // grab the length of the 3 options
                let OptionsFlex:any = {
                    first:
                    (
                          devObj.preserve.type === 'center' ? 
                        (
                        numberParse(devObj.preserve.zChild[x[x.length-1 ]].cssDefault["left"]) +
                        numberParse(devObj.preserve.zChild[x[x.length-1 ]].cssDefault["width"]) -
                        numberParse(devObj.preserve.zChild[x[0]].cssDefault["left"])
                        ):
                        devObj.preserve.width
                    )
                } 
                //
        
                // resize as the left get rezie in the beginning val of src
                    // here we take adnavntage of xPosition to make a fake length
                    // to learn how to center better
                if(devObj.preserve.type !== 'center'){
                    x.push(null)
                }
                
                OptionsFlex.lefts = x
                .reduce((acc,y,j,src)=>{
                    if(j !== 0 && y !== null){
                        acc.push(
                            numberParse( devObj.preserve.zChild[y].cssDefault["left"] ) -
                            numberParse( devObj.preserve.zChild[src[j-1]].cssDefault["left"] )
                        )
                    }   
                    
                    else if(j === 0 && y !== null && devObj.preserve.type!== 'center'){
                        acc.push(
                            // 0
                            0,
                            numberParse( devObj.preserve.zChild[y].cssDefault["left"] )
                        )
                    }                       
                    
                    if(j !== 0 && devObj.preserve.type!== 'center'){
                        
                        devObj.preserve.zChild[src[j-1]].css["left"]  =  
                        acc
                        .slice(0,j+2)
                        .reduce((accc,z,k)=>{
                            if(k ===1 ){
                                return accc - devObj.preserve.left
                            }
                            return accc + z
                        },0).toString() + "px" 
                    }    
                    
                    else{
                        
                        devObj.preserve.zChild[src[j]].css["left"]  =  
                        acc
                        .slice(0,j+2)
                        .reduce((accc,z,k)=>{
                            return accc + z
                        },0).toString() + "px" 
                    }  
                    return acc
                },[
                    xPosition({
                        target:1262.67 - (devObj.preserve.left *2),
                        // target:OptionsFlex.first,
                        contain: numberParse(getComputedStyle(devObj.preserve.zChild["&#8353"].element).width),
                        targetPos: devObj.preserve.targetPos[i] !== undefined ? devObj.preserve.targetPos[i] :.5,
                        containPos: devObj.preserve.containPos[i] !== undefined ? devObj.preserve.containPos[i] :.5
                    })
                    // devObj.preserve.left
                ])     
                
                devObj.preserve.ref.detectChanges()           
                //

                if(devObj.debug === true || devObj.debug === 'true'){
                    console.log(OptionsFlex.lefts)
                }    

                
            })

            devObj
            .preserve
            .align
            .forEach((x,i)=>{
                x.pop()
            })            

        
        
            
            return 
        }

        //getting the approriate ratios
        devObj.stops.ratio.forEach((x,i)=>{
            devObj.stops.ratio[i] = x.map((y,j)=>{return y/devObj.stops.points[i]})  
        })
        //

        let dims = ['left','width']
        let  calcr =[] // calcualted ratios


        try{
            devObj.stops.points.slice(1).forEach((x,i)=>{

                let total  = typeof(devObj.measure) === 'number'? devObj.measure :  numberParse(   getComputedStyle(devObj.measure.element).width   ) +
                numberParse(   getComputedStyle(devObj.measure.element).left   ) // FIXME  make this an array so I can be more dynamic
                if( total > x ){
                    
                    let diff:any = {
                        acc:0,
                        cumul : [],
                        newCumul : [],
                        vals : []                        
                    }
                    let partsTotal = 0
                    let start = devObj.stops.points[i]
                    devObj.stops.ratio[i].forEach((y,j)=>{    
                            // console.log(y, dims[j %  dims.length],Math.floor(j/2))
                
                        let zChild = devObj.parts[Math.floor(j/2)]
                        let cssVal = dims[j %  dims.length]
                        let real = start * y
                        partsTotal += real  // partsTotal should be always greater than total
                        // console.log(start)

                        diff.cumul.push(diff.cumul.length !== 0 ? diff.cumul[j-1] + real: real )
                        calcr.push({                     
                            zChild,
                            cssVal
                        }) 
                
                
                    })
                    diff.delta = (partsTotal - total)/  devObj.stops.actions[i].reduce((y, j) => y + (j === 'c'), 0)
                    devObj.stops.actions[i].forEach((y,j)=>{


                        if(   y === 'c'   ){


                            diff.acc += diff.delta 
                            // if(devObj.stops.control !== undefined){
                            //     diff.acc *=  devObj.stops.control[i][j]
                            // }


                        }

                        if(devObj.stops.control !== undefined){
                            diff.acc *=  devObj.stops.control[i][j]
                        }                        


                        diff.newCumul.push(diff.cumul[j] - diff.acc)
                        diff.vals.push(diff.newCumul.length %  2 === 1 ? diff.newCumul[j] :
                            diff.newCumul[j] - diff.newCumul[j-1] )
                        calcr[j].zChild.css[calcr[j].cssVal.valueOf()] =  (diff.vals[j]).toString() + "px"


                    })   
                    
                    if(devObj.debug === 'true'){
                    console.log(
                        calcr,'\n',
                        total,'\n',diff,devObj.stops.actions[i],
                        partsTotal,start,diff.newCumul.map((x,i)=>{
                            return i === 0 ?  x -0 : parseFloat(   (x - diff.newCumul[i-1]).toFixed(0)   )
                        })
                    )   
                    }                 
                    throw('error')


                }


            })
        }   
        catch(e){}

    }
    //
}

/*
helps the app make an element responsive when the 
browser fails to indicate
    // something has to be done about getComputedStyle
*/
export function responsiveMeasure(
    devObj:{
        item:{
            target:zChildren[],
            prop:string[]
        },
        values:Array<Array<[number,number]>>| any,
        measure:{
            target:HTMLElement,
            prop:string
        }
    }
){
    devObj.item.target.forEach((x,i)=>{

        devObj.values[i].forEach((y,j)=>{
            

            if(   
                numberParse(getComputedStyle(devObj.measure.target)[devObj.measure.prop.valueOf()])   <
                y[0]         
            ){
                // console.log(y)
                x.css[
                    devObj.item.prop[i] === undefined ? 
                    devObj.item.prop[devObj.item.prop.length-1].valueOf() :
                    devObj.item.prop[i].valueOf() 
                    
                ] = y[1].toString()+"px"      
                // dont we need change  detection   
            }          
        })
    })
}

/* deals with adding and removing elements from the DOM
    parameters
        symbolDeltaStart - number where all you static elements end and your dynamic elements begin
        intent - add, add elements to the DOM
                - subtract subract elements from the DOM
    data
    elements to copy and organize,
    elements to move
    * if you add function make sure the ask for vars in their parameters, 
        DO NOT HAVE THEM BUILT IN to the function or it will lose its reference
*/


export function deltaNode
(
    devObj?:{
        intent:string,
        type?:any, 
        group?:string | any, //name of delta setup I got going
        elements?:zChildren[], // entries of elements to be added
        moving?:{
            entry:zChildren[],
            type: string,
            distance?:number 
        },
        co?:Partial<componentObject>,
        subCO?: number | string,
        symbolDeltaStart?:number,
        hook?:string

        position?:{
            group:any,
            symbols:string[],
            index:number,
            stackSpacing:number,
            zChild:zChildren[],
            positionFn:(value: string, index: number, array: string[]) => void 
        },
        features?:any,
        move?:{
            group:any,
            zChild:zChildren[],
            toMove:Function | zChildren[] |  any 
            // (any) => Array<zChildren> when we understand this better
            moveFn:(value: string, index: number, array: string[]) => void,
            moveFnPost?:Function,
            heightGetter? : Function             
        }
    }
){
    // console.log(devObj.intent + " an entry")

    let min= (item)=>{
        return numberParse(getComputedStyle(item).top)
    }
    let max =(item)=>{
        return numberParse(getComputedStyle(item).top) +
        numberParse(getComputedStyle(item).height)
    }

    
    if(   devObj.intent ==='add' && devObj.hook !== 'prepare'   ){


        //make a storage facility for the management of added and removed elements once
        if(devObj.co.metadata.deltaNodeSite === undefined){
            devObj.co.metadata.deltaNodeSite = {
                symOpt : function *generator(a) {
                    var index = a
                    while (true)
                    yield index++;
                }(devObj.symbolDeltaStart)                
            }
        } 
        let {deltaNodeSite} = devObj.co.metadata
        //

        //access the right subCO
        let subCO = devObj.co.quantity[1][devObj.subCO.valueOf()]
        //

        // specify the amnt of times addded in totol, the group of elements to add mabye the action
        // we might need to get them on the DOM first
        if(   deltaNodeSite[devObj.group.valueOf()] === undefined){
            deltaNodeSite[devObj.group.valueOf()] = {
                elements:[devObj.elements],
                intent:[devObj.intent], 
                hook:['done'],
                subCO:[devObj.subCO],
                count:0,
                display:['no'],
                symbols:[[]],
                extras:[{}]
            }
        }
        else if(   deltaNodeSite[devObj.group.valueOf()] !== undefined){
            deltaNodeSite[devObj.group.valueOf()].elements.push(devObj.elements)
            deltaNodeSite[devObj.group.valueOf()].intent.push(devObj.intent)
            deltaNodeSite[devObj.group.valueOf()].hook.push('done')
            deltaNodeSite[devObj.group.valueOf()].subCO.push(devObj.subCO)
            deltaNodeSite[devObj.group.valueOf()].count += 1
            deltaNodeSite[devObj.group.valueOf()].display.push('no')
            deltaNodeSite[devObj.group.valueOf()].symbols.push([])
            deltaNodeSite[devObj.group.valueOf()].extras.push({})
        }
        // console.log(deltaNodeSite)
        let {count} = deltaNodeSite[devObj.group.valueOf()]
        deltaNodeSite.current ={count}
        deltaNodeSite.current.group = devObj.group	        
        deltaNodeSite.current.intent = devObj.intent    
        deltaNodeSite.current.hook = 'done'
        //

        //get the items on the DOM
        /*
            the val must be modifed because of the way componentBootStrap is set up, if it sees val[0]
            again, catastrophe
            we use _[x], it should work, if we split by _ we can still get the meaningful name for data assortment
        */
        deltaNodeSite[devObj.group.valueOf()].elements.forEach((x,i)=>{
            // console.log(
            //     x,
            //     deltaNodeSite[devObj.group.valueOf()].display[i]
            // )           
            // adding each element one by one to the DOM 
                // block represent the whole group elements to be added at one time
                    // say one click event or one loop
            if(deltaNodeSite[devObj.group.valueOf()].display[i] !== 'yes'){
                x.forEach((y,j)=>{
                    let sym = "&#"+ deltaNodeSite.symOpt.next().value
                    let deltaIndex = y.extras.deltaIndex
                    subCO.bool[deltaIndex.valueOf()].push(y.bool)
                    let  myExtras = objectCopy(y.extras)
                    if(myExtras.delta  === undefined){
                        myExtras.delta = {}
                    }
                    myExtras.delta.duplicate = "true"
                    myExtras.delta.index = i
                    subCO.extras[deltaIndex.valueOf()].push(objectCopy(myExtras))
                    subCO.symbol[deltaIndex.valueOf()].push(sym)
                    deltaNodeSite[devObj.group.valueOf()].symbols[i].push(sym)
                    subCO.ngCss[deltaIndex.valueOf()].push(objectCopy(y.css))
                    subCO.ngCssDefault[deltaIndex.valueOf()].push(objectCopy(y.cssDefault))
                    subCO.quantity[deltaIndex.valueOf()].push(2)
                    subCO.text[deltaIndex.valueOf()].push(objectCopy(y.innerText))
                    subCO.val[deltaIndex.valueOf()].push(
                        y.val.split(" ")
                        .reduce((acc,z,k,src)=>{
                            if(k === 0){
                                acc += z+"_"+i+ " "
                            }
                            else if(k === src.length -1){
                                acc += z
                            }
                            else{
                                acc += z + " "
                            }
                            return acc
                        },"")
                    ) 
                })
            }
            deltaNodeSite[devObj.group.valueOf()].display[i] = 'yes'
            //
            // console.log(subCO)
        })
        //

    }

    else if(   devObj.intent === 'minus' && devObj.hook !== 'prepare'   ){


        //check for deltaManagement  and needed tools
        if(devObj.co.metadata.deltaNodeSite === undefined){
            return
        }
        if(devObj.co.metadata.deltaNodeSite[devObj.group.valueOf()] === undefined){
            return
        }
        let {deltaNodeSite} = devObj.co.metadata
        let {count,subCO} = deltaNodeSite[devObj.group.valueOf()]
        deltaNodeSite.current ={
            count,
            group:devObj.group,
            intent:devObj.intent,
            hook:'done'
        }
        // deltaNodeSite.current.group = devObj.group
        // deltaNodeSite.current.intent = devObj.intent  
        // deltaNodeSite.current.hook = 'done'         
        //

        //access the right subCO
        let deltaSubCO = devObj.co.quantity[1][subCO[count.valueOf()]]
        //

        //take the items from the subCO and the DOM
        deltaNodeSite[devObj.group.valueOf()].symbols[count]
        .forEach((x,i)=>{
            //find where the symbol and all of its data is and properly remove it
            let sub0 = null 
            let sub1 = null 
            // find the right index
            try{
                deltaSubCO.symbol.forEach((y,j)=>{
                    if(y.indexOf(x)!== -1){
                        sub0 = j,
                        sub1 = y.indexOf(x)
                        throw('e')
                    }
                })
            }
            //

            //remove from subCO
                // not a straightfoward subCO so inspect here if removing elements go wrong
                // should be a whole other function for adding and removing
            catch(e){
                Object.keys(deltaSubCO).forEach((z,k)=>{
                    try{
                        if(z !== "quantity"){
                            deltaSubCO[z.valueOf()][sub0].splice(sub1,1)
                        }
                    }
                    catch(e){
                    }
                })    
                deltaSubCO.quantity[sub0].splice(sub1,1)            
            }
            //
        })
        // 

        // take the items out of deltaMangement
        deltaNodeSite[devObj.group.valueOf()].hook[count] = "done" 
        deltaNodeSite[devObj.group.valueOf()].intent[count] = "minus"
        deltaNodeSite[devObj.group.valueOf()].display[count] = "no"
        
        if(count === 0 ){
            delete deltaNodeSite[devObj.group.valueOf()] 
        }
        else if(count !== 0){
            
            Object.keys(deltaNodeSite[devObj.group.valueOf()]).forEach((x,i)=>{
                try{
                    deltaNodeSite[devObj.group.valueOf()][x.valueOf()].splice(count,1)
                    // deltaNodeSite[devObj.group.valueOf()][x.valueOf()] = 
                    // deltaNodeSite[devObj.group.valueOf()][x.valueOf()].slice(0,count)
                    // .concat(deltaNodeSite[devObj.group.valueOf()][x.valueOf()].slice(count+1))
                }
                catch(e){}
            })
            deltaNodeSite[devObj.group.valueOf()].count -= 1
        }
        //

    }

    else if(   devObj.hook === 'prepare'   ){


        let {deltaNodeSite} = devObj.co.metadata
        if(deltaNodeSite[devObj.group.valueOf()] === undefined){
            return
        }        
        let {count,subCO} = deltaNodeSite[devObj.group.valueOf()]
        deltaNodeSite.current ={count}
        deltaNodeSite.current.group = devObj.group
        deltaNodeSite.current.intent = devObj.intent
        deltaNodeSite.current.hook = devObj.hook           
        //

        //access the right subCO
        let deltaSubCO = devObj.co.quantity[1][subCO[count.valueOf()]]
        //

        deltaNodeSite[devObj.group.valueOf()].hook[count] = devObj.hook
        deltaNodeSite[devObj.group.valueOf()].intent[count] = devObj.intent 
               

    }


}


export function sCG(devObj?):string{
    let {start,distance}= devObj
    let column = start.charCodeAt(0) + distance
    let alphabet = "Z".charCodeAt(0) -"A".charCodeAt(0) +1
    let char = ""
    if(Math.floor  (  (column -"A".charCodeAt(0)) /alphabet ) +( "A".charCodeAt(0) - 1) >= 65){
       char += String.fromCharCode(Math.floor  (  (column -"A".charCodeAt(0)) /alphabet) +( "A".charCodeAt(0) - 1)  )
    }
    char += String.fromCharCode(  ((column -"A".charCodeAt(0)) % alphabet) + ( "A".charCodeAt(0) )     )
    return char
}  