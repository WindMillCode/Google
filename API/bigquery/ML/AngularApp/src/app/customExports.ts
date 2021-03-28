import {RyberService} from './ryber.service'
import {defer} from 'rxjs'
import { Observable, of, Subject, Subscription } from "rxjs";
import { ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';

declare global {
    interface Object { fromEntries: any; }
}



// type zSymbol =`\$\#${number}${number}${number}${number}${number| ''}`
export class zChildText {
    item:string
}

export class zChildren {
    element:  HTMLElement;
    css:Object | any;
    cssDefault?:Object;
    bool?:string;
    innerText?:null | string | zChildText ;
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
    // sectionDefault props must be numbers
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


// export function asyncData<T>(data: T) {
//     return defer(() => Promise.resolve(data));
// }

// export function asyncError<T>(errorObject: any) {
//     return defer(() => Promise.reject(errorObject));
// }

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
        zProps?: any,
    }
){

	let {ryber,appTV,zProps} = devObj


    if(   zProps === undefined   ){


        zProps = {}


    }


    devObj.classes = ryber[appTV].quantity[1].map((x,i) => {
        // return x.val.flat(Infinity)[0]
        return flatDeep(x.val,Infinity)[0]
    })


    let zChild = {}


	ryber[appTV].quantity
	.forEach((x:any,i)=>{
		x
		.forEach((y:any,j)=>{
			y.symbol
			.forEach((z:any,k)=>{
				z
				.forEach((w:any,h)=>{
					if(y.quantity[k][h] === null){
						return
					}
					let utf8Symbol = String.fromCharCode(+w.split("&#")[1])


					zChild[w] ={
						element:(
							w === "&#8352"?
							document.querySelector('[class=' + appTV + '],[id^="root"]') as HTMLElement:
							document.querySelector(`.${appTV} .${utf8Symbol}`)
						),
						css:y.ngCss[k][h],
						cssDefault:y.ngCssDefault[k][h],
						bool:y.bool[k][h],
						innerText: y.text[k][h],
						// symbol:w,
						extras:zProps.extras === 'true' ? y.extras[k][h] : null,
						val:zProps.val === 'true' ? y.val[k][h] : null,
						quantity:zProps.quantity === 'true' ? y.quantity[k][h] : null,

					}
                    zProps.symbol === "true" ? zChild[w].symbol = w : null
				})
			})

		})
	})
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
	let {type,items } =devObj
	if(type === "identify"){
		let delta:any = {
			min:{value:Infinity,key:null},
			max:{value:0,key:null},
		}
		items.forEach((x,i)=>{
			let myMin = devObj.min(x)
			let myMax = devObj.max(x)
			if( myMin.value < delta.min.value){
				delta.min = myMin
			}
			if( myMax.value > delta.max.value){
				delta.max = myMax
			}
		})
		delta.delta ={value: delta.max.value-delta.min.value}
		return delta
	}
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




export function numDigits(
    devObj:{
        x:number
    }
) {
    devObj.x = Number(String(devObj.x).replace(/[^0-9]/g, ''));
    return Math.max(Math.floor(Math.log10(Math.abs(devObj.x))), 0) + 1;
}

// soft copy utility fn
    // much more complicated because a needed fn got deleted on JSON.parse(JSON.stringify)
export function objectCopy(obj){
    let serialized = JSON.stringify(obj, function(k,v){
        //special treatment for function types
        if(typeof v === "function")
            return v.toString();//we save the function as string
        return v;
    });

    let compileFunction = function(str){
        //find parameters
        let pstart = str.indexOf('('), pend = str.indexOf(')');
        let params = str.substring(pstart+1, pend);
        params = params.trim();

        //find function body
        let bstart = str.indexOf('{'), bend = str.lastIndexOf('}');
        str = str.substring(bstart+1, bend);

        return Function(params, str);
    }

    let revivedObj = JSON.parse(serialized, function(k,v){
        // there is probably a better way to determ if a value is a function string
        if(typeof v === "string" && v.indexOf("function") !== -1)
            return compileFunction(v);
        return v;
    });

    return revivedObj
}

// export function objectCopy(obj){
//     return {...obj }
// }

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
            co.metadata[c.valueOf()] = {
				movingSubject:new Subject<any>(),
			}
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
                    ]
                }
            )
        )
        //

        // additional things you want to do for all components
        if(additional instanceof Function){
            additional({
                co
            })
        }
        //

        //providing for cssDefaults and text
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

    })

}

// ryber function
export function ryberUpdate(
    devObj:{
        co:string,
        type?:string,
        css?:any | CSSRuleList,
        cssDefault?:any |CSSRuleList
        extras?:any,
        bool?:string,
        text?:any | zChildText | string,
        val?:string,
        signature?:string,
        spot?:number,
		symbolStart?:Array<number>,
		symbol:string,
		quantity?:number
    }
):string {
	let {symbol,co,type,css,cssDefault,extras,bool,text,val,signature,spot,quantity}= devObj
	quantity = quantity ?? 3

    let ryber = this
    if(ryber[co.valueOf()] === undefined){
		let bodySymbol = "&#8353"
		let utf8Symbol = String.fromCharCode(+bodySymbol.split("&#")[1])

            let symbolStart = [8354,8448,8592,9472]
			let symbolEnd = [8383,8526,8702,10174]


        let generator = {
            1:function *generator() {
				var index = symbolStart[0];

				while (true){
					if(symbolEnd.indexOf(index)!== -1){
						index = symbolStart[symbolEnd.indexOf(index)+1]

					}
					yield index++;
				}
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
                            bool:[["divBoard"]],
                            val:[
                                [
                                    co
                                    .valueOf()
                                    .split("CO")[0]
                                    .split("")
									.join("_")+"_Board a_p_p_Board " +
									utf8Symbol,
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
											// components are allowed to have different sizes should be percentages only
                                            // css.width = "100%" //must always be set to this value
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
                            ]
                        },
                        ...Array.from(Array(1),()=> {
                            return {
                                signature:(signature !== undefined  ? signature: ""),
                                quantity:[
                                    [],
                                    [],
                                ],
                                bool:[
                                    [],
                                    [],
                                ],
                                val:[
                                    [],
                                    [],
                                ],
                                text:[
                                    [],
                                    [],
                                ],
                                symbol:[
                                    [],
                                    [],
                                ],
                                ngCss:[
                                    [],
                                    [],
                                ],
                                extras:[
                                    [],
                                    [],
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
        //

		//validating val
		let judimaCssIdentifier = co
		.valueOf()
		.split("CO")[0]
		.split("")
		.join("_")
        if(val === undefined){
            val = judimaCssIdentifier

            if(subCO.val[index].length === 0){
                val += "_Heading"
            }

            else {
                val += "_Item"
            }
        }

        else{

			if(symbol !== undefined){
				let utf8Symbol  = String.fromCharCode(+symbol.split("&#")[1])

				val = val.replace(
					new RegExp(utf8Symbol),
					""
				)
			}


			val = val.replace(
				new RegExp(judimaCssIdentifier+ "_" ),
				""
			)
            val = judimaCssIdentifier + "_" + val

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


			symbol = "&#" + ryber[co.valueOf()].generator[index].next().value
			let utf8Symbol = String.fromCharCode(+symbol.split("&#")[1])
            if( spot === undefined   ){
				subCO.quantity[index].push(quantity)
                subCO.text[index].push(text)
                subCO.val[index].push(val + " " + utf8Symbol)
                subCO.bool[index].push(bool)
				subCO.ngCss[index].push(css)
				if(cssDefault){
					subCO.ngCssDefault[index].push(cssDefault)
				}
                subCO.extras[index].push(extras)
                subCO.symbol[index].push(
                     symbol
                )
            }

            else{
				subCO.quantity[index].splice(spot,0,quantity)
                subCO.text[index]  .splice(spot,0,text)
                subCO.val[index]   .splice(spot,0,val + " " + utf8Symbol)
                subCO.bool[index]  .splice(spot,0,bool)
				subCO.ngCss[index] .splice(spot,0,css)
				if(cssDefault){
					subCO.ngCssDefault[index].splice(spot,0,cssDefault)
				}
                subCO.extras[index].splice(spot,0,extras)
                subCO.symbol[index].splice(spot,0,
                    symbol
                )
            }
            subCO.signature = signature
        //
        // console.log(bool,index)
        // console.log(subCO)
        return  symbol
	}

	if(type === "remove"){

		let {symbol} = devObj
		let subCO = ryber[co.valueOf()].quantity[1][1]
		let targetIndex = subCO.symbol[1].indexOf(symbol)
		subCO.quantity[1][targetIndex] = null
		subCO.ngCss[1][targetIndex] = null
		subCO.ngCssDefault[1][targetIndex] = null
		subCO.extras[1][targetIndex] = null
		subCO.symbol[1][targetIndex] = null
		subCO.val[1][targetIndex] = null
		subCO.text[1][targetIndex] = null
		subCO.bool[1][targetIndex] = "false"

	}

}

export let ryberUpdateFactory = (devObj?) => {
	return (zConsist) => {
		return ryberUpdate.call(devObj.ryber, zConsist)
	}
}

export let  ryberPerfect = (devObj)=> {
	let {co,exclude} = devObj
	co.quantity
	.forEach((y, j) => {
		co.quantity[j]
		.forEach((z, k) => {
			z.text
			.forEach((w, h) => {
				w.forEach((xx, ii) => {
					if (!(w[ii]?.hasOwnProperty("item"))) {
						w[ii] = { item: xx };
					}
				});
			});
			// remember we just cant overwrite the cssDefaults find the missing
			// cssDefault
			if(exclude?.includes("cssDefault")){

				z.ngCss
				.forEach((w: any, h) => {
					w.forEach((xx: any, ii) => {
						if (z.ngCssDefault[h]?.[ii] === undefined) {
							z.ngCss[h][ii] = { ...{ left: "0px", top: "0px" }, ...xx };
							z.ngCssDefault[h].splice(ii, 0, objectCopy(z.ngCss[h][ii]));
						}
					});
				});
			}



		});
	});
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
		options?:any,
        yPosition?:{
            zChild:any,
            moving:{
                top:string
                height:string
            },
            ref:ChangeDetectorRef,
			ryber?:RyberService,
			appTV?:string,
            mediaQuery?:string
        }

    }
){

    let {ref,options,zChild,zChildCss,type}= devObj

    if(zChildCss === undefined){
        zChildCss = 'true'
    }


    if(type === 'simpleStack'){

		let {spacing} = devObj
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
                    zChildCss === 'true' ?
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
                    typeof(spacing) === 'number' ?
                    spacing :
                    (
                        spacing[i] === undefined ?
                        spacing[spacing.length-1] :
                        spacing[i]
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

    else if(type === 'keepSomeAligned'){

        let {zChildKeys,start,spacing} = devObj
        if( devObj.keep === undefined){
            devObj.keep = []
        }
        let keep = Object.fromEntries(devObj.keep)

        devObj
        .zChildKeys
        .forEach((x,i)=>{


            // console.log("firing",x)

            if( i === 0){

                if(   devObj.start !== undefined   ){

                    devObj.zChild[x].css['top'] =  start.toString() + "px"

                }
                return
            }

            let prev = devObj.zChildKeys[i-1]

            zChild[x].css['top'] = (

                (
                    zChildCss === 'true' ?(()=>{
						let value1 =  (
                            numberParse(      devObj.zChild[keep[x.valueOf()] !== undefined ? keep[x.valueOf()] : prev].css['top']   ) +
                            include({
                                item:numberParse(      devObj.zChild[keep[x.valueOf()] !== undefined ? keep[x.valueOf()] : prev].css['height']   ) ,
                                include:devObj.heightInclude,
                                index:i
                            })
                        )

                        return value1
                    })()
                    :
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
                    (()=>{

                        return typeof(spacing) === 'number' ?
                        spacing :
                        (
                            spacing[i] === undefined ?
                            spacing[spacing.length-1] :
                            spacing[i]
                        )
                    })()
                )




            ).toString() + "px"
			if(
				options?.overlapFix?.confirm === "true" &&
				zChild[x]?.extras?.judima?.stack?.overlapFix !== "false"
			){

				// determine all zChildren of the previous row
					// the while loop finds when keep[x-n] !== keep[x], giving us the
					// indictor for all the keys reverseLookup needs in order to work
				let ii = i
				while(keep[zChildKeys[i]] === keep[zChildKeys[ii--]]){
					// console.log(ii)
				}
				let reverseLookup = zChildKeys.slice(0,i+1).reverse()
				reverseLookup = reverseLookup
				.filter((y,j)=>{
					return keep[zChildKeys[ii]] === keep[reverseLookup[j]]
				})
				//


				// console.log(x,keep[x],reverseLookup)



				//determine if there is any overlapping occuring
				let overlapping = reverseLookup
				.filter((y:any,j)=>{
					return (
						numberParse(zChild[x].css.top) -
						(
							numberParse(zChild[y].css.top) +
							numberParse(zChild [y].css.height)
						)
					)<= 0
				})
				//

				// replace the keep[x] and devObj with the one that clears the highest gap
				// console.log({x,overlapping,top:zChild[x].extras?.component?.top})
				if(
					overlapping.length > 0 &&
					!reverseLookup.includes("&#8353") &&
					zChild[x].extras?.component?.top === undefined
				){

					let delta = minMaxDelta({
						type:"identify",
						items:reverseLookup,
						min:(item)=>{
							return {
								key:item,
								value:
								(numberParse(zChild[item].css.top) +
								numberParse(zChild [item].css.height) )
							}
						},
						max:(item)=>{
							return {
								key:item,
								value:
								(numberParse(zChild[item].css.top) +
								numberParse(zChild [item].css.height) )
							}
						}
					})
					keep[x] = delta.max.key
					options.overlapFix.flag= "true"
					// console.log(delta,keep[x])
				}
				//



				//

			}
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
            ref.detectChanges()

        })
		return {
			keep:Object.entries(keep),
			overlapFixFlag:options.overlapFix.flag
		}


    }

    else if(devObj.type === 'yPosition'){
        // ussually for the position part of the media query
		let {zChild,moving,ref,ryber,appTV,mediaQuery}= devObj.yPosition

		if(zChild["&#8353"].extras?.judima?.moving?.type === "custom" && mediaQuery !== "mobile"){

			let {point,target,coordinates} =  zChild["&#8353"].extras.judima.moving
			let diff
			switch (point) {
				case "right":
					let topDiff = (
						numberParse(ryber[target].metadata.board.top) -
						numberParse(zChild["&#8353"].css["top"]) +
                        coordinates.y
					)
					// console.log(ryber[target].metadata.board)
					let leftDiff =  - ryber[appTV].metadata.board.xPosition +
                    numberParse(ryber[target].metadata.board.width) +
                    ryber[target].metadata.board.diff.left -
                    ryber[target].metadata.board.xPosition +
                    coordinates.x
                    // console.log(leftDiff)
					diff = {
						left:leftDiff,
						top:topDiff
					}
					zChild["&#8353"].css["top"] = ryber[target].metadata.board.top
					Object.keys(zChild)
					.slice(2)
					.forEach((x,i)=>{
						["top"]
						.forEach((y:any,j)=>{
							zChild[x].css[y] = (
								numberParse(zChild[x].css[y]) +
								diff[y]
							).toString() + "px"
						})


					})
					ref.detectChanges()


					Object.values(zChild)
					.slice(2)
					.forEach((x:any,i)=>{
						if(x.extras?.judima?.formatIgnore !== "true"){
							x.css.left = (
								numberParse(x.css.left) +
								diff.left
							).toString()+"px"
						}
					})
					ref.detectChanges()

					return {point,diff}
					break;

				case "bottom":
					topDiff = (
						numberParse(ryber[target].metadata.board.top) +
						numberParse(ryber[target].metadata.board.height) +
                        coordinates.y
					)
					leftDiff = ryber[target].metadata.board.xPosition-
                    ryber[appTV].metadata.board.section.left -
                    ryber[appTV].metadata.board.xPosition

                    if(ryber[target].metadata.board.point !== undefined){
                        leftDiff += ryber[appTV].metadata.board.xPosition -
                        ryber[target].metadata.board.xPosition

                    }

                    Object.values(zChild)
                    .slice(2)
                    .forEach((x:any,i)=>{
                        if(x.extras?.judima?.formatIgnore !== "true"){
                            x.css.top = (
                                numberParse(x.css.top) +
                                topDiff -
                                numberParse(zChild["&#8353"].css["top"])

                            ).toString()+"px"
                        }
                    })

					zChild["&#8353"].css["top"] = (
						topDiff
					).toString() + "px"
					ref.detectChanges()

                    leftDiff += coordinates.x
					Object.values(zChild)
					.slice(2)
					.forEach((x:any,i)=>{
						if(x.extras?.judima?.formatIgnore !== "true"){
							x.css.left = (
								numberParse(x.css.left) +
								leftDiff

							).toString()+"px"
						}
					})
					ref.detectChanges()

					return {point:"bottom",diff:{
						top:topDiff,left:leftDiff
					}}

					break;

				default:
					break;
			}
			return
		}
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
            left?:number,
			options?:any
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
                let OptionsFlex:any = {}
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
                        (
							acc
							.slice(0,j+2)
							.reduce((accc,z,k)=>{
								// if(k === 1){
									// return accc - devObj.preserve.left
								// }
								return accc + z
							},0)
						).toString() + "px"
						// console.log("1",src[j-1], devObj.preserve.zChild[src[j-1]].css["left"])
                    }

                    else{

                        devObj.preserve.zChild[src[j]].css["left"]  =
                        (
							acc
							.slice(0,j+2)
							.reduce((accc,z,k)=>{
								return accc + z
							},0)
						).toString() + "px"
						// console.log("2",src[j], devObj.preserve.zChild[src[j]].css["left"])
                    }
                    return acc
                },[
                    xPosition({
                        target:1262.67 - (devObj.preserve.left *2),
                        contain: numberParse(getComputedStyle(devObj.preserve.zChild["&#8353"].element).width),
                        targetPos: devObj.preserve.targetPos[i] || .5,
                        containPos: devObj.	preserve.containPos[i] || .5
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




            return {align:devObj
				.preserve
				.align}
        }

        //getting the approriate ratios
        devObj.stops.ratio.forEach((x,i)=>{
            devObj.stops.ratio[i] = x.map((y,j)=>{return y/devObj.stops.points[i]})
        })
        //

        // let dims = ['left','width']
        // let  calcr =[] // calcualted ratios


        // try{
        //     devObj.stops.points.slice(1).forEach((x,i)=>{

        //         let total  = typeof(devObj.measure) === 'number'? devObj.measure :  numberParse(   getComputedStyle(devObj.measure.element).width   ) +
        //         numberParse(   getComputedStyle(devObj.measure.element).left   ) // FIXME  make this an array so I can be more dynamic
        //         if( total > x ){

        //             let diff:any = {
        //                 acc:0,
        //                 cumul : [],
        //                 newCumul : [],
        //                 vals : []
        //             }
        //             let partsTotal = 0
        //             let start = devObj.stops.points[i]
        //             devObj.stops.ratio[i].forEach((y,j)=>{
        //                     // console.log(y, dims[j %  dims.length],Math.floor(j/2))

        //                 let zChild = devObj.parts[Math.floor(j/2)]
        //                 let cssVal = dims[j %  dims.length]
        //                 let real = start * y
        //                 partsTotal += real  // partsTotal should be always greater than total
        //                 // console.log(start)

        //                 diff.cumul.push(diff.cumul.length !== 0 ? diff.cumul[j-1] + real: real )
        //                 calcr.push({
        //                     zChild,
        //                     cssVal
        //                 })


        //             })
        //             diff.delta = (partsTotal - total)/  devObj.stops.actions[i].reduce((y, j) => y + (j === 'c'), 0)
        //             devObj.stops.actions[i].forEach((y,j)=>{


        //                 if(   y === 'c'   ){


        //                     diff.acc += diff.delta
        //                     // if(devObj.stops.control !== undefined){
        //                     //     diff.acc *=  devObj.stops.control[i][j]
        //                     // }


        //                 }

        //                 if(devObj.stops.control !== undefined){
        //                     diff.acc *=  devObj.stops.control[i][j]
        //                 }


        //                 diff.newCumul.push(diff.cumul[j] - diff.acc)
        //                 diff.vals.push(diff.newCumul.length %  2 === 1 ? diff.newCumul[j] :
        //                     diff.newCumul[j] - diff.newCumul[j-1] )
        //                 calcr[j].zChild.css[calcr[j].cssVal.valueOf()] =  (diff.vals[j]).toString() + "px"


        //             })

        //             if(devObj.debug === 'true'){
        //             console.log(
        //                 calcr,'\n',
        //                 total,'\n',diff,devObj.stops.actions[i],
        //                 partsTotal,start,diff.newCumul.map((x,i)=>{
        //                     return i === 0 ?  x -0 : parseFloat(   (x - diff.newCumul[i-1]).toFixed(0)   )
        //                 })
        //             )
        //             }
        //             throw('error')


        //         }


        //     })
        // }
        // catch(e){}

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


//  utility fn
export function componentConsole(devObj?){
	let {target,data} = devObj

	if(target.includes(this.appTV)){
		return ()=>{console.log(this.appTV,data)}
	}
}

export function navigationType(devObj?){
    let {ryber,type,fn} = devObj
    let answer = {}
    if(type.includes(ryber.appCO0.metadata.navigation.type)){
        answer[type] =fn()
    }
    return answer
}


//section fn
export function _boardDimensions(devObj?:any) {
    let {zChild,section} = devObj


    let result = Object.fromEntries(
        ["top","height","left","width"]
        .map((x:any,i)=>{
            return  [x,zChild["&#8353"].css[x]?.match("px") === (false) ?  zChild["&#8353"].css[x] :   getComputedStyle(zChild["&#8353"].element)[x]]
        })
    )

    result.xPosition = 			xPosition({
        target:1262.67 - (section.left *2),
        contain: numberParse(getComputedStyle(zChild["&#8353"].element).width),
    })
    result.section = {...section}

    return result

}



// deltaNode fn

let determineKeepGroups = (devObj)=>{

	let {component} = devObj
	let flag = "fixed"
	component.keep.inspect
	.forEach((x:any,i)=>{
		let last =component.keep.groups.length-1

		if(x.includes(0)){

			if(flag === "push"){
				component.keep.groups.push({items:[],index:[]})
				flag = "fixed"
				last += 1
			}
			component.keep.groups[last].items.push(x)
		}
		else if(x.includes(1)){
			component.keep.groups[last].index.push(i)
			flag = "push"

		}
	})
	component.keep.groups =
	component.keep.groups.filter((x:any,i)=>{
		return x.items.length !== 0
	})
}
let inspectKeep = (devObj)=>{
	let {zSymbols,component,finalKeep} = devObj
	component.keep.inspect = objectCopy(
		finalKeep
		.map((x:any,i)=>{
			let locations =
			x .reduce((acc,y:any,j)=>{

				if(component[zSymbols].includes(y)){
					acc.push(j)
				}
				return acc
			},[])

			return [...x,...locations]
		})
	)
}
let logicKeep = (devObj) =>{

	let {hook,zSymbolsMap,component,finalKeep,zChild} = devObj
	component.keep.groups
	.forEach((x:any,i)=>{

		if(hook.has("add prepare")){
			let attach = component.keep.inspect[x.index[0]]?.[1] // attach for that item group
			if(attach === undefined){


				let delta = minMaxDelta({
					type:"identify",
					items:component.target,
					min:(item)=>{
						return {
							key:item,
							value:numberParse(zChild[item].css["top"])
						}
					},
					max:(item)=>{
						return {
							key:item,
							value:numberParse(zChild[item].css["top"]) +
							numberParse(zChild[item].css["height"])
						}
					}
				})
				attach =delta.max.key
			}

			x.newItems = x.items
			.map((y:any,j)=>{
				let newY = y
				newY[0] =component.deltasMap[newY[0]]
				if(y.slice(2).length == 1){ //locations [0]

					newY[1] = attach
				}
				else{ //locations [0,1]
					newY[1] =component.deltasMap[newY[1]]
				}

				return newY.slice(0,2)
			})
		}

		// update the finalKeep
		x.index
		.forEach((y:any,k)=>{
			finalKeep[y][1] = component[zSymbolsMap][finalKeep[y][1]]
		})
		//

	})
}
export let deltaNode ={
	determineKeepGroups,
	inspectKeep,
	logicKeep,
}
//
