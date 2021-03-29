import { Injectable, VERSION,Renderer2,RendererFactory2, ChangeDetectorRef,Inject } from "@angular/core";
import { Observable, of, Subject, Subscription, BehaviorSubject, ReplaySubject, merge, combineLatest } from "rxjs";
// import { Router,RouterEvent } from "@angular/router";
import { zChildren, componentObject, numberParse, ryberUpdate,ryberUpdateFactory, objectCopy } from "./customExports";
import { HttpClient } from "@angular/common/http";
import website from './website';
import { tap, last, catchError } from 'rxjs/operators'




@Injectable({
    providedIn: "root"
})
export class RyberService {

    private renderer2:Renderer2
	public ref:any
    constructor(
        public http: HttpClient,
        private renderer2Factory: RendererFactory2,
    ) {

        //start renderer2
        this.renderer2 = renderer2Factory.createRenderer(null, null);
        //
        // console.log("ryberservice constructor fires")

        let rUD = ryberUpdateFactory({ryber:this})

        let zCTgen = function* generator() {
            var index = 0;
            while (true)
                yield index++;
        }()

        function zChildTemplate(devObj: { // objects for rUD calls custom to the dev and the website
            co?: string,
            mf?: any,
            options?: any
        }): any {

            let { co,mf } = devObj
            let { navigation,appSection,gsapCursor,webVitals,columnDefs,rowData,webRTC,imageURL,latch,options,nest,printGroupType, printGroup, key, type, gap, stack, value, group, count, newline, form,delta, refreshGroup, background, color, fonts, title, fontSize, italics, googleSheets, border } = mf
            let { left, top, height, width, split, next } = mf
			let component = { left, top, height, width, split, next }




			// console.log(deltaGroup,deltaType,deltaNode)
			// support for custom attribute,property and css additons
            if (options === undefined) {
                options = {
					css:{},
					extend:{},
					judima:{}
				}
			}

			else{
				if(options.extend === undefined){
					options.extend = {}
				}
				if(options.css === undefined){
					options.css = {}
				}
				if(options.judima === undefined){
					options.judima = {}
				}
			}
			//

			// feature init
			let extend:any = {}
			let judima:any ={
				topLevelZChild:(()=>{

					// if the zChild is nested
					if([nest?.group ,nest?.under].includes(undefined)){
						return "true"
					}
					//
					return "false"
				})(),
				// figure out whether the zChild should be incoporated into judima formatting logic
				formatIgnore:(()=>{

					// if the zChild is nested
					if(![nest?.group ,nest?.under].includes(undefined)){
						return "true"
					}
					//
					return "false"
				})(),
				//
				stack:{
					// when false when an element below overlaps an element above stack will do  nothing to fix it
						// when options.overlapFix === "true"
					overlapFix:"true"
					//
				}
			}
			let appNest = {
				confirm:nest?.group === undefined ? "false": "true",
				co,
				...nest,
			}
			let appDeltaNode ={
				confirm:delta?.group === undefined ? "false": "true",
				co,
				zSymbolNeeded:"true",
				...delta
			}
            let appGsapCursor = {
                confirm:gsapCursor?.group === undefined ? "false": "true",
                ...gsapCursor,
                co
            }
			let appLatch = {
				confirm: latch?.type !== undefined? 'true':'false',
				zSymbolNeeded: "true",// zChildSymbol goes here
				co,
				...latch,
			}
            let appNavigation ={
                confirm: navigation?.group === undefined ? "false":"true",
                co,
                ...navigation,
                zSymbolNeeded:"true",
            }
			//

            let symbol: any = ""

            if (type === "new" || type === "body") {
                let sectionDefault: any = objectCopy(this.appCO0.metadata.ryber.sectionDefault)
                let section: any = {
                    gap: gap === undefined ? sectionDefault.gap : gap,               // if the gap is wildily bigger it wont stack appropraitely, make sure we gap approaitely
                    left: left === undefined ? sectionDefault.left : left,
                    width: width === undefined ? sectionDefault.width : width,
                    split: split === undefined ? sectionDefault.split : split,
                    stack: stack === undefined ? sectionDefault.stack : stack
				}

				let css ={
					height: "300px", //must always exit
					//expected to be a percent configureble for position in FPM logic
					width: "100%",
					top: "0px",
					//
					"background-color": background,
					...options.css
				}
                if(this.appCO0.metadata.navigation.type === "full"){
                    let target = options.judima?.moving?.target
                    if(target !==undefined){
                        let map = this.appCO0.metadata.navigation.full.map
                        options.judima.moving.target  = map[target]
                    }
                }
				let judima = {
					...options.judima
				}
                symbol = rUD({
                    co,
                    val:key.split("_").reverse()[0] + ' a_p_p_Board',
                    // ryber:this,
                    signature: title,
                    css,
                    extras: {
						judima,
                        section,
                        type,
                        component,
                        appSection:{
                            confirm:appSection?.confirm,
                            co
                        },
                        appWebVitals:{
                            confirm:webVitals?.confirm,
                            co,
						},
						appDeltaNode:{
							...appDeltaNode,
							type:"body",
						},
                        appNest:{
							type:"body",
							...appNest,
							confirm:"true"
						},
                        appNavigation:{
                            type:"body",
                            ...appNavigation
                        },
                        ...options.extras
                    }
                })
            }

            else if (type === "title" || type === "heading") {

                let css = {
                    "z-index": 4,
                    display: "table",
                    "font-size": fontSize !== undefined ? fontSize + "px" : "54px",
                    "font-weight": italics,
                    'background-color': background,
                    color,
					"font-family": fonts,
					...options.css
				}
				extend = {
					...extend,
					//your props here
					...options.extend
				}
				judima = {
					...judima,
					//your props here
					...options.judima
				}




                symbol = rUD({
                    co,
                    bool: 'h1',
                    text: value,
                    val: key.split("_").reverse()[0] + ' a_p_p_Heading',
                    css,
                    extras: {
                        component,
						type,
						extend,
						judima,
						appDeltaNode,
                        appLatch,
                        appNest,
                        ...options.extras
					},
                })

            }

            else if (type === "input") {


                form?.required === undefined ? null : ((a:any) => { a.required = form?.required })(extend)
                let css = {
                    "z-index": 4,
                    // display:"table",
                    border,
                    "font-size": fontSize === undefined ? "30px" : fontSize + "px",
                    'background-color': background,
                    color,
                    "font-family": fonts,
					"text-align": mf["text-align"],
					...options.css
                }
				extend = {
					...extend,
					type: 'text',
                    placeholder: value || "",
					form: 'myForm',
					...options.extend
				}
				judima = {
					...judima,
					//your props here
					...options.judima
				}

                symbol = rUD({
                    co,
                    bool: 'i',
                    val: key.split("_").reverse()[0] + ' a_p_p_Input',
                    css,
                    extras: {
						extend,
						judima,
						appDeltaNode,
                        appFocusFont: {
                            confirm: 'true',
                            fontSizeDefault: "32px",
                            mobileShrink: "true"
                        },
                        appInputHandle: {
							confirm: 'true',
							zSymbolNeeded:"true",
                            co,
                            name: this[co.valueOf()].quantity[1][1].signature + " " + zCTgen.next().value,
                            googleSheets,
                            link: form?.link
                        },
                        appLatch:{
                            confirm:latch === undefined ?"false":"true",
                            co,
							latch,
							zSymbolNeeded:"true",
                        },
                        appNest,
                        component,
                        type,
                        ...options.extras
                    }
                })
            }

            else if (type === "textbox") {


                form?.required === undefined ? null : ((a:any) => { a.required = form?.required })(extend)
                let css = {
                    "font-size": "27px",
                    "z-index": 4,
                    'background-color': background,
                    color,
					"font-family": fonts,
					...options.css
				}
				extend = {
					...extend,
                    type: 'text',
                    placeholder: value,
                    form: 'myForm',
					...options.extend
                }
				judima = {
					...judima,
					// your props here
					...options.judima
				}


                symbol = rUD({
                    co,
                    bool: 'ta',
                    val: key.split("_").reverse()[0] + ' a_p_p_TextArea',
                    css,
                    extras: {
						extend,
						judima,
                        appFocusFont: {
                            confirm: 'true',
                            fontSizeDefault: "32px",
                            mobileShrink: "true"
                        },
                        appWebRTC:{
                            confirm:this.appCO0.metadata.webRTC.init.includes(webRTC?.item)  ? "true" : webRTC?.item !== undefined ? "pickup":"false",
                            co,
                            webRTC
						},
						appDeltaNode,
                        appNest,
                        appInputHandle: {
                            confirm: 'true',
                            zSymbolNeeded:"true",
                            co,
                            name: this[co.valueOf()].quantity[1][1].signature + " " + zCTgen.next().value,
                            googleSheets,
                            link: form?.link
                        },
                        component,
                        type,
                        ...options.extras
                    }
                })
            }

            else if (type === "email") {


                form?.required === undefined ? null : ((a) => { a.required = form?.required })(extend)
                let css = {
                    "font-size": "32px",
                    "z-index": 4,
                    'background-color': background,
                    color,
					"font-family": fonts,
					...options.css
				}
				extend = {
					...extend,
					type: 'email',
                    placeholder: value,
                    form: 'myForm',
					...options.extend
				}
				judima = {
					...judima,
					//your props here
					...options.judima
				}



                symbol = rUD({
                    co,
                    bool: 'i',
                    val: key.split("_").reverse()[0] + ' a_p_p_Input',
                    css,
                    extras: {
                        extend,
                        appFocusFont: {
                            confirm: 'true',
                            fontSizeDefault: "32px",
                            mobileShrink: "true"
						},
						appDeltaNode,
						appNest,
                        appInputHandle: {
                            confirm: 'true',
                            zSymbolNeeded:"true",
                            co,
                            name: this[co.valueOf()].quantity[1][1].signature + " " + zCTgen.next().value,
                            googleSheets,
                            link: form?.link
                        },
                        component,
                        type,
                        ...options.extras
                    }
                })
            }

            else if (type === "date") {

                form?.required === undefined ? null : ((a) => { a.required = form?.required })(extend)
                let css = {
                    "font-size": "32px",
                    "z-index": 4,
                    'background-color': background,
                    color,
					"font-family": fonts,
					...options.css
				}
				extend = {
					...extend,
					type: 'text',
                    placeholder: value,
                    form: 'myForm',
					...options.extend
				}
				judima = {
					...judima,
					//your props here
					...options.judima
				}


                symbol = rUD({
                    co,
                    bool: 'i',
                    val: key.split("_").reverse()[0] + " a_p_p_Input",
                    css,
                    extras: {
						extend,
						judima,
                        appFocusFont: {
                            confirm: 'true',
                            fontSizeDefault: "32px",
                            mobileShrink: "true"
						},
						appDeltaNode,
                        appInputHandle: {
                            confirm: 'true',
                            zSymbolNeeded:"true",
                            co,
                            name: this[co.valueOf()].quantity[1][1].signature + " " + zCTgen.next().value,
                            googleSheets,
                            link: form?.link
                        },
						appLatch,
                        appNest,
                        component,
                        appDateClick: {
                            confirm: "true"
                        },
                        type,
                        ...options.extras
                    }
                })
            }

            else if (type === "text") {


                let css = {
                    "font-size": fontSize !== undefined ? fontSize + "px" : "30px",
                    "z-index": 4,
                    'background-color': background,
                    color,
                    "font-weight": italics,
                    "font-family": fonts,
					"text-align": devObj.mf["text-align"],
					...options.css
				}
				extend = {
					...extend,
					//your props here
					...options.extend
				}
				judima = {
					...judima,
					//your props here
					...options.judima
				}

                symbol = rUD({
                    co,
                    bool: 'p',
                    val: key.split("_").reverse()[0] + '  a_p_p_Text',
                    text: value,
                    css,
                    extras: {
                        component,
						type,
						judima,
						extend,
                        appPrintFiles: {
                            printGroup,
                            type: printGroupType
						},
                        appNavigation,
						appDeltaNode,
                        appLatch,
                        appWebRTC:{
                            confirm:this.appCO0.metadata.webRTC.init.includes(webRTC?.item)  ? "true" : webRTC?.item !== undefined ? "pickup":"false",
                            co,
                            webRTC
						},
						appNest,
                        ...options.extras
                    }
                })
            }

            else if (type === "loading") {


                let css = {
                    "z-index": 4,
                    // 'background-color':background,
                    // color,
                    stroke: color,
					"text-align": devObj.mf["text-align"],
					...options.css
                }
				extend = {
					...extend,
					//your props here
					...options.extend
				}
				judima = {
					...judima,
					//your props here
					...options.judima
				}

                component.height = component?.height === undefined ? 100 : component.height
                component.width = component?.height === undefined ? 100 : component.height  // widht is not allowed here it will break the mat-spinner

                symbol = rUD({
                    co,
                    bool: 'mat-spinner',
                    val: key.split("_").reverse()[0],
                    css,
                    extras: {
                        component,
                        type,
						extend,
						judima,
						appDeltaNode,
						appNest,
                        ...options.extras
                    }
                })
            }

            else if (type === "simpleTable") {


                let css = {
                    height: "250px",
					width: "500px",
					...options.css
                }
				extend = {
					...extend,
					//your props here
					...options.extend
				}
				judima = {
					...judima,
					//your props here
					...options.judima
				}

                symbol = rUD({
                    co,
                    bool: 'ag-grid',
                    val: key.split("_").reverse()[0],
                    css,
                    extras: {
						judima,
                        component,
                        type,
                        extend,
                        appAgGrid: {
                            co,
                            zSymbolNeeded:"true",
                            rowData: rowData || [],
                            columnDefs: columnDefs || [],
                            confirm: "true",
                            defaultColDef: {
                                resizable: true,
                                flex: 1,
                                suppressSizeToFit: true,
                            },
						},
						appDeltaNode,
                        appNest,
                        appLatch,
                        ...options.extras
                    }
                })
            }

            else if (type === "div") { // for now a better use of divs?


                let css = {
                    'background-color':background,
                    color,
					overflow:"auto",  //has side effects turn to none if necessary
					...options.css
                }

				extend = {
					...extend,
					//your props here
					...options.extend
				}
				judima = {
					...judima,
					//your props here
					...options.judima
				}


                symbol = rUD({
                    co,
                    bool: 'div',
                    val: key.split("_").reverse()[0]+ ' a_p_p_Nester',
                    css,
                    extras: {
						judima,
                        component,
                        type,
						extend,
						appDeltaNode,
                        appNest,
                        appLatch,
                        appWebRTC:{
                            confirm:this.appCO0.metadata.webRTC.init.includes(webRTC?.item)  ? "true" : webRTC?.item !== undefined ? "pickup":"false",
                            co,
                            webRTC
                        },
                        ...options.extras
                    }
                })
            }

            else if (type === "sub-heading") {


                let css = {
                    "z-index": 4,
                    'background-color': background,
                    color,
                    "font-weight": italics,
                    "font-family": fonts,
                    "font-size":"30px",
					"text-align": mf["text-align"],
					...options.css
                }
				extend = {
					...extend,
					//your props here
					...options.extend
				}
				judima = {
					...judima,
					//your props here
					...options.judima
				}

                symbol = rUD({
                    co,
                    bool: 'p',
                    val: key.split("_").reverse()[0] + ' a_p_p_SubHeading',
                    text: value,
                    css,
                    extras: {
						extend,
						judima,
                        component,
						type,
						appDeltaNode,
                        appNest,
                        ...options.extras
                    }
                })
            }

            else if (type === "options") {
                if (this[co.valueOf()].metadata.toggleButton === undefined) {
                    this[co.valueOf()].metadata.toggleButton = {
                        options: {}
                    }
                }
                if (count !== undefined && this[co.valueOf()].metadata.toggleButton.options[group.valueOf()] === undefined) {
                    this[co.valueOf()].metadata.toggleButton.options[group.valueOf()] = {
                        selectedElement: [],
                        count,
                        stuff: []
                    }
                }


                let css = {
                    "z-index": 4,
                    display: "table",
                    "font-size": "21px",
                    // 'background-color':background,
					// color,

                    "font-weight": italics,
					"font-family": fonts,
					...options.css
				}
				extend = {
					...extend,
					//your props here
					...options.extend
				}
				judima = {
					...judima,
					//your props here
					...options.judima
				}

                symbol = rUD({
                    co,
                    bool: 'a',
                    val: key.split("_").reverse()[0] + '  a_p_p_Selection',
                    text: value,
                    css,
                    extras: {
						extend,
						judima,
                        toggleButton: {
                            confirm: 'true',
                            onBackgroundColor: 'black',
                            onColor: 'white',
                            offBackgroundColor: 'transparent',
                            offColor: 'black',
                            selected: this[co.valueOf()].metadata.toggleButton.options[group.valueOf()] === undefined ? 'false' : () => { return this[co.valueOf()].metadata.toggleButton.options[group.valueOf()] },
                            mySelected: this[co.valueOf()].metadata.toggleButton.options[group.valueOf()] === undefined ? undefined : 'false'
						},
						appDeltaNode,
                        appNest,
                        appInputHandle: {
                            confirm: 'true',
                            zSymbol: "",// zChildSymbol goes here
                            co,
                            name: this[co.valueOf()].quantity[1][1].signature + " " + group,
                            // if we get duplicated we need to do something abt it
                            value,
                            type: "options",
                            googleSheets,
                            required: form?.required !== undefined ? "options" : "false",
							link: form?.link,
							zSymbolNeeded:"true"
                        },
                        component,
                        type,
                        group
                    }

                })
            }

            else if (type === "button") {

                let css = {
                    width: '325px',
                    "font-size": "48px",
                    top: "0px",
                    // height: "75px",
                    left: '400px',
                    "z-index": 4,
                    'background-color': background,
                    color,
                    "font-family": fonts,
					"font-weight": italics,
					...options.css
				}
				extend = {
					...extend,
					//your props here
					...options.extend
				}
				judima = {
					...judima,
					//your props here
					...options.judima
				}



                symbol = rUD({
                    co,
                    bool: 'b',
                    text: value,
                    val: key.split("_").reverse()[0] + ' a_p_p_Button',
                    css,
                    extras: {
						extend,
						judima,
                        component,
						type,
						appDeltaNode,
                        appNest,
                        appWebRTC:{
                            confirm:this.appCO0.metadata.webRTC.init.includes(webRTC?.item)  ? "true" : webRTC?.item !== undefined ? "pickup":"false",
                            co,
                            webRTC
                        },
                        appPrintFiles: {
                            printGroup,
                            type: 'signOut'
						},
						appGsapCursor:{
                            ...appGsapCursor,
							type:"button"
                        },
                        ...options.extras
                    }
                })



            }

            // lab additions
            else if (type === "listModelsButton") {

                let css = {
                    width: '325px',
                    "font-size": "48px",
                    top: "0px",
                    // height: "75px",
                    left: '400px',
                    "z-index": 4,
                    'background-color': background,
                    color,
                    "font-family": fonts,
					"font-weight": italics,
					...options.css
				}
				extend = {
					...extend,
					//your props here
					...options.extend
				}
				judima = {
					...judima,
					//your props here
					...options.judima
				}



                symbol = rUD({
                    co,
                    bool: 'b',
                    text: value,
                    val: key.split("_").reverse()[0] + ' a_p_p_Button',
                    css,
                    extras: {
						extend,
						judima,
                        component,
						type,
						appDeltaNode,
                        appNest,
                        appWebRTC:{
                            confirm:this.appCO0.metadata.webRTC.init.includes(webRTC?.item)  ? "true" : webRTC?.item !== undefined ? "pickup":"false",
                            co,
                            webRTC
                        },
                        appPrintFiles: {
                            printGroup,
                            type: 'signOut'
						},
						appGsapCursor:{
                            ...appGsapCursor,
							type:"button"
                        },
                        appListModels:{
                            confirm:"true",
                            co
                        },
                        appLatch,
                        ...options.extras
                    }
                })



            }

            else if (type === "getMetadataButton") {

                let css = {
                    width: '325px',
                    "font-size": "48px",
                    top: "0px",
                    // height: "75px",
                    left: '400px',
                    "z-index": 4,
                    'background-color': background,
                    color,
                    "font-family": fonts,
					"font-weight": italics,
					...options.css
				}
				extend = {
					...extend,
					//your props here
					...options.extend
				}
				judima = {
					...judima,
					//your props here
					...options.judima
				}



                symbol = rUD({
                    co,
                    bool: 'b',
                    text: value,
                    val: key.split("_").reverse()[0] + ' a_p_p_Button',
                    css,
                    extras: {
						extend,
						judima,
                        component,
						type,
						appDeltaNode,
                        appNest,
                        appGetModelMetadata:{
                            confirm:"true",
                            co
                        },
                        appLatch,
                        ...options.extras
                    }
                })



            }
            //

            else if (type === "submit button") {

                let css = {
                    width: '325px',
                    "font-size": "48px",
                    top: "0px",
                    // height:"75px",
                    // left:'400px',
                    "z-index": 4,
                    'background-color': background,
                    color,
                    "font-family": fonts,
					"font-weight": italics,
					...options.css
				}
				extend = {
					...extend,
					//your props here
					...options.extend
				}
				judima = {
					...judima,
					//your props here
					...options.judima
				}

                symbol = rUD({
                    co,
                    bool: 'b',
                    text: value,
                    val: key.split("_").reverse()[0] + ' a_p_p_Button',
                    css,
                    extras: {
						extend,
						judima,
						appDeltaNode,
                        appNest,
                        appFormControl: {
                            confirm: 'true',
                            id: 'myForm',
                            co
                        },
                        component,
                        type,
                        ...options.extras
                    }
                })
            }



            else if (type === "image") { // for now a better use of divs?


                let css = {
					...options.css
                }

				extend = {
					...extend,
					src : "./assets/media/" + imageURL,
					...options.extend
				}
				judima = {
					...judima,
					//your props here
					...options.judima
				}


                symbol = rUD({
                    co,
                    bool: 'img',
                    val: key.split("_").reverse()[0]+ ' a_p_p_Image',
                    css,
                    extras: {
						judima,
                        component,
                        type,
						extend,
						appDeltaNode,
                        appNest,
                        ...options.extras
                    }
                })
            }

            else if (type === "video") { // for now a better use of divs?


                let css = {...options.css}
				extend = {
					...extend,
					autoplay:"true",
					playsinline:"true",
					...options.extend
				}
				judima = {
					...judima,
					//your props here
					...options.judima
				}


                symbol = rUD({
                    co,
                    bool: 'video',
                    val: key.split("_").reverse()[0]+ ' a_p_p_Video',
                    css,
                    extras: {
						judima,
                        extend,
                        component,
						type,
						appDeltaNode,
                        appNest,
                        appWebRTC:{
                            confirm:this.appCO0.metadata.webRTC.init.includes(webRTC?.item)  ? "true" : webRTC?.item !== undefined ? "pickup":"false",
                            co,
                            webRTC
                        },
                        ...options.extras

                    }
                })
            }

            else if (type === "photo") { // for now a better use of divs?


                let css = {
					...options.css
                }

				extend = {
					...extend,
					//your props here
					...options.extend
				}
				judima = {
					...judima,
					//your props here
					...options.judima
				}


                symbol = rUD({
                    co,
                    bool: 'c',
                    val: key.split("_").reverse()[0]+ ' a_p_p_Photo',
                    css,
                    extras: {
						extend,
						judima,
                        component,
						type,
						appDeltaNode,
                        appNest,
                        appWebRTC:{
                            confirm:this.appCO0.metadata.webRTC.init.includes(webRTC?.item)  ? "true" : webRTC?.item !== undefined ? "pickup":"false",
                            co,
                            webRTC
                        },
                        ...options.extras

                    }
                })
            }

            else if (type === "file button") {


                let css = {
                    width: '325px',
                    "font-size": "48px",
                    top: "0px",
                    // height:"75px",
                    // left:'400px',
                    "z-index": 4,
                    'background-color': background,
                    color,
                    "font-family": fonts,
					"font-weight": italics,
					...options.css
				}

				extend = {
					...extend,
					//your props here
					...options.extend
				}
				judima = {
					...judima,
					//your props here
					...options.judima
				}
                let name = this[co.valueOf()].quantity[1][1].signature + " " + zCTgen.next().value

                symbol = rUD({
                    co,
                    bool: 'b',
                    text: value,
                    val: key.split("_").reverse()[0] + " a_p_p_FileButton",
                    css,
                    extras: {
						extend,
						judima,
						appDeltaNode,
                        appNest,
                        appFileHandler: {
                            confirm: 'true',
                            name,
                        },
                        appInputHandle: {
                            confirm: 'true',
                            zSymbol: "",// zChildSymbol goes here
                            co,
                            name,
                            googleSheets,
                            required: form?.required !== undefined ? "file button" : "false",
							link: form?.link,
							zSymbolNeeded:"true",
                            type: "file button"
                        },
                        component,
                        type,
                        ...options.extras
                    }
                })
            }

            else if (type === "signature") {


                let css = {
                    width: '1085px',
                    top: "0px",
                    height: "225px",
                    left: '90px',
                    border: "2px solid black",
					"background-color": "transparent",
					...options.css
				}
				extend = {
					...extend,
					//your props here
					...options.extend
				}
				judima = {
					...judima,
					//your props here
					...options.judima
				}

                component.split = component.split === undefined ? this.appCO0.metadata.ryber.sectionDefault.split : component.split

                symbol = rUD({
                    co,
                    bool: 'c',
                    val: key.split("_").reverse()[0],
                    text: value,
                    css,
                    extras: {
						extend,
                        judima,
						type,
						appDeltaNode,
                        appNest,
                        appSignPad: {
                            confirm: 'true',
                            width: numberParse(css.width),
                            height: numberParse(css.height),
                        },
                        component,
                        refresh: {
                            group: refreshGroup
                        },
                        appInputHandle: {
							confirm: 'true',
							zSymbolNeeded:"true",
                            co,
                            name: this[co.valueOf()].quantity[1][1].signature + " " + zCTgen.next().value,
                            googleSheets,
                            link: form?.link
                        },
                        ...options.extras
                    }
                })


            }


            else if (type === "bullet point") {


                let css = {
                    "font-size": "24px",
                    "z-index": 4,
                    'background-color': background,
                    color,
                    "font-family": fonts,
					"font-weight": italics,
					...options.css
                }
				extend = {
					...extend,
					//your props here
					...options.extend
				}
				judima = {
					...judima,
					//your props here
					...options.judima
				}

                symbol = rUD({
                    co,
                    bool: 'p',
                    val: key.split("_").reverse()[0] + ' a_p_p_BulletPoint',
                    css,
                    text: "• &nbsp;&nbsp;&nbsp;" + (value !== undefined ? value :
                        (
                            newline
                                .reduce((acc, x, i) => {
                                    acc += "<br><br>" + x
                                    return acc
                                })
                        )
                    ),
                    extras: {
						extend,
						judima,
                        component,
						type,
						appDeltaNode,
                        appNest,
                        ...options.extras
                    }
                })
            }

            else if (type === "dropdown") {



				form?.required === undefined ? null : ((a) => { a.required = form?.required })(extend)
				//  might have to deal with this logic on bootstrap end developer should feel free to make required as their own arg as well as form
                let css = {
                    "font-size": "24px",
                    "z-index": 5,
                    display: "table",
                    "text-align": "center",
                    'background-color': background,
                    color,
                    "font-family": fonts,
					"font-weight": italics,
					...options.css
				}
				extend = {
					...extend,
					//your props here
					...options.extend
				}
				judima = {
					...judima,
					//your props here
					...options.judima
				}
				appLatch = {
					...appLatch,
					select:{
						value
					},
                    confirm:"true",
					type:"dropdown"
				},
				appNest = {
					...appNest,
					options:{
						positionStatic :appLatch.type === "dropdown" ? "false" :"true",
						ignore:"true"
					},
				}
				if(appNest?.group !==  undefined   ){
					appLatch.suffix = 0
					appLatch.trueNestUnder = appNest.under
					if(appDeltaNode?.group !== undefined){
						appDeltaNode.options = {
							target:{
								confirm:"true"
							}
						}
					}
				}

                symbol = rUD({
                    co,
                    bool: 'a',
                    val: key.split("_").reverse()[0] + ' a_p_p_DropDownMiddle',
                    css,
                    text: value,
                    extras: {
						judima,
                        extend,
                        appLatch,
						appDeltaNode,
                        appNest,
                        component,
                        type,
                        // appInputHandle: {
                        //     googleSheets,
                        //     confirm: 'true',
                        //     type,
                        //     zSymbolNeeded:"true",
                        //     co,
                        //     name: this[co.valueOf()].quantity[1][1].signature + " " + zCTgen.next().value,
                        //     link: form?.link,
                        //     required: form?.required !== undefined ? "dropdown" : "false",
                        // }
                        ...options.extras
                    },

                })


            }

            else if (type === "count") {

                let css = {
                    "z-index": 4,
                    display: "table",
					"font-size": "54px",
					...options.css
				}
				extend = {
					...extend,
					//your props here
					...options.extend
				}
				judima = {
					...judima,
					//your props here
					...options.judima
				}


                symbol = rUD({
                    co,
                    bool: 'p',
                    text: value,
                    val: key.split("_").reverse()[0] + ' a_p_p_Text a_p_p_Count',
                    css,
                    extras: {
						extend,
						judima,
                        component,
						type,

						appDeltaNode:{
							...appDeltaNode,
							type: delta?.type || "increment",
						},
                        appNest,
                        ...options.extras
                    }
                })

			}

            else if (type === "gsap-cursor") {

                let css = {
                    "z-index": 4,
					display: "table",
					"backgroud-color":"blue",
					...options.css
				}
				extend = {
					...extend,
					//your props here
					...options.extend
				}
				judima = {
					...judima,
					//your props here
					...options.judima
				}


                symbol = rUD({
                    co,
                    bool: 'gsap-cursor',
                    text: value,
                    val: key.split("_").reverse()[0],
                    css,
                    extras: {
						extend,
						judima,
                        component,
						type,

						appDeltaNode:{
							...appDeltaNode,
						},
						appGsapCursor:{
							...appGsapCursor,
							amnt:Array(20).fill(null),
							type:"cursor"
						},
                        appNest,
                        ...options.extras
                    }
                })

            }

            else {

                let css = {
                    "font-size": "30px",
                    "z-index": 4,
                    'background-color': background,
                    color,
                    "font-weight": italics,
                    "font-family": fonts,
					"text-align": devObj.mf["text-align"],
					...options.css
                }
				extend = {
					...extend,
					//your props here
					...options.extend
				}
				judima = {
					...judima,
					//your props here
					...options.judima
				}

                symbol = rUD({
                    co,
                    bool: 'p',
                    val: key.split("_").reverse()[0] + '  a_p_p_Text',
                    text: value,
                    css,
                    extras: {
						extend,
						judima,
                        component,
						type: "text",
						appDeltaNode,
						appNest,
                        ...options.extras
                    }
                })
            }

            return symbol
        }

        let zCT = ((a) => {
            return (zConsist) => {
                return zChildTemplate.call(a, zConsist)
            }
        })(this)

        // cms setup
        let regex = {
            phone: '[| +][(]?[0-9]{1}[0-9]{2}[)-. ]?[0-9]{1}[0-9]{2}[-. ]?[0-9]{4}[| +]',
            dl: ' +^[0-9]{7,8}$ +',
            ssn: '[0-9]{3}[-]?[0-9]{2}[-]?[0-9]{4}',
            zip: '^(\d\w){5}(?:[-\s](\d|\w){4})?$',
        }
        let cmsData
        let sucessCMS
        try {
            // cmsData = cms()
            // will be using cms later cosmicjs issues
            sucessCMS = cmsData.objects === undefined ? false : true // change if bad check
        }
        catch (e) {
            sucessCMS = false
        }

        let convertCMS: any = {}
        let myCMS: any = undefined
        if (sucessCMS) {

            // setup sheet metadata given form the cms
            cmsData.objects
            .forEach((x, i) => {
                if (x.type_slug === "google-sheets") {

                    x.metafields
                    .forEach((y, j) => {

                        y.children
                        .forEach((z: any, k) => {

                            if (z.title === "subsheet titles") {
                                this.appCO0.metadata["google-sheets"] = objectCopy(z.options)
                            }

                            else if (z.title === "office fields") {
                                z.children
                                .forEach((w: any, h) => {
                                    if (w.title === "applicant_id") {
                                        this.appCO0.metadata["applicant_id"] = objectCopy(w.options)

                                    }
                                })
                            }

                        })

                    })

                }

            })

            if (this.appCO0.metadata["google-sheets"] !== undefined) {
                this.appCO0.metadata["google-sheets-mapping"] =
                Object.fromEntries(
                this.appCO0.metadata["google-sheets"]
                .map((x: any, i) => {
                    return [x.key, x.value]
                })
                )
            }
            this.appCO0.metadata["applicant_id_mapping"] = this.appCO0.metadata["applicant_id"]
            ?.map((x: any, i) => {
                let conversionKey = this.appCO0.metadata["applicant_id"][i].key
                return {
                    key: this.appCO0.metadata["google-sheets-mapping"][conversionKey.valueOf()] === undefined ? x.key : this.appCO0.metadata["google-sheets-mapping"][conversionKey.valueOf()],
                    value: x.value
                }
            })
            //

            //frontend from the cms
            convertCMS = cmsData
            .objects
            .filter((x: any, i) => {
                return x.type_slug !== "google-sheets"
            })
            .map((x, i) => {
                let contentMetafields =
                    x.metafields
                    .map((x: any, i) => {
                        let myContent =
                        objectCopy(
                            x.children
                            .filter((y: any, j) => {
                                return y.title === "content"
                            })[0]
                        )
                        myContent.key = x.key
                        return myContent
                    })
                return {
                    title: x.title,
                    type_slug: x.type_slug,
                    metafields: contentMetafields
                    .map((y, j) => {

                        let newline = []
                        let googleSheets = {}

                        let options =
                        y.options
                        .map((z, k) => {


                            if (z.key === 'newline') {
                                newline.push(z.value)
                                return null
                            }

                            else {
                                return Object.values(y.options[k])
                            }

                        })
                        .filter((z, k) => {
                            return z !== null
                        })


                        x.metafields[j].children
                        .filter((z: any, k) => {
                            return z.title === "google subsheets"
                        })
                        .forEach((z: any, k) => {
                            z.children
                                .forEach((w: any, h) => {
                                    let googleSheetOptions = objectCopy(w.options)
                                    googleSheetOptions
                                        .forEach((xx: any, ii) => {
                                            delete xx?.selected
                                            googleSheetOptions[ii] = Object.values(xx)
                                        })
                                    // console.log(googleSheetOptions)
                                    googleSheets[this.appCO0.metadata["google-sheets-mapping"][w.key].valueOf()] = googleSheetOptions
                                })
                        })



                        options = Object.fromEntries(options)
                        options.googleSheets = objectCopy(googleSheets)
                        options["background"] !== undefined ? options["background"] = options["background"]?.split(" ").join("") : null
                        options["color"] !== undefined ? options["color"] = options["color"]?.split(" ").join("") : null
                        let result = {
                            key: y.key,
                            ...options,
                        }
                        newline.length !== 0 ? result.newline = newline : null
                        Object.keys(googleSheets).length !== 0 ? result.googleSheets = googleSheets : null
                        return result
                    })
                }

            })
            .filter((x, i) => {
                if (x.type_slug === "google-sheets") {
                    return false
                }
                return true
            })
            //

            // TODO when the app is online  and you change the cms data
            //


        }
        else {

            //use backup cache to setup the website
            convertCMS = objectCopy(website.convertCMS)
            delete website.convertCMS
            Object.assign(this.appCO0.metadata, website)
            //

        }

        // content setup
        let track = {}
        myCMS = Object
        .fromEntries(
            convertCMS
            .map((x, i) => {



                // tracking different components
                let mySlug = x.type_slug.split("s")[0]
                if (track[mySlug + 'CO'] === undefined) {
                    //co setup
                    track[mySlug + 'CO'] = 0
                    this[mySlug + 'CO' ] = []
                    this[mySlug + 'CO$'] = new ReplaySubject<any>(1)
                    this.appCO0.metadata.CO.push(mySlug + 'CO$'.valueOf())
                    //

                    //es setup
                    this[mySlug + 'ES'.valueOf()] = objectCopy(this.appES)
                    this.appCO0.metadata.ES.push(mySlug + 'ES'.valueOf())
                    //

                }
                else {
                    track[mySlug + 'CO'.valueOf()] += 1
                }
                let co = mySlug + 'CO' + track[x.type_slug.split("s")[0] + 'CO'.valueOf()] // if a slug starts with s ????? FIXME
                this[mySlug + 'CO'.valueOf()].push(co)
                this[mySlug + 'CO$'.valueOf()].next(this[mySlug + 'CO'.valueOf()])
                //

                // navigation setup
                    // if the navigation object doesnt exist you must provide for a default in the case of SPA
                    if(["body","new"].includes(x.metafields[0].type) && this.appCO0.metadata.navigation.type === "full"){
                        let route = "/"+x.metafields[0]?.navigation?.name
                        if(this.appViewNavigation.routeLengths[route] === undefined){
                            this.appViewNavigation.routeLengths[route] = 0
                        }
                        this.appViewNavigation.routeLengths[route]+= 1
                        this.appCO0.metadata.navigation.full.map[x.title] =co
                    }
                //
                let x$ = of(x)


                let coOrderArray = []
                this.appCO0.metadata.ryber.CO$.push(

                    x$
                    .subscribe((item) => {
                        let coArray: any = this[mySlug + 'CO'.valueOf()]

                        x.metafields
                        .forEach((y, j) => {


                            // they forgot to create a new component fail gracefully and given them a board
                            if (j === 0) {
                                if (y.type !== "body") {
                                    coOrderArray.push(
                                        zCT({
                                            co: coArray[coArray.length - 1],
                                            mf: {
                                                key: "a_p_p_Board",
                                                type: "body",
                                                background: ["lightgrey", "white"][i % 2],
                                                title: x.title
                                            }

                                        })
                                    )
                                }
                                // debugger
                            }
                            //

                            coOrderArray.push(
                                zCT({
                                    co: coArray[coArray.length - 1],
                                    mf: j === 0 ? { ...y, title: x.title } : y
                                })
                            )
                        })
                        this[co.valueOf()].metadata.order = coOrderArray.splice(1)
                        coOrderArray = []
                    })
                )

                return [co, x]
            })
        )
        //

        // console.log(myCMS)
        // console.log(this.appCO0.metadata["google-sheets"].metafields[0].options )
        // console.log(myCMS['formCO0'].title)
        // console.log(JSON.stringify(convertCMS,null,4))
        // console.log(cmsData)
        // console.log(this)



    };

    ngOnDestroy() {
        this.appCO0.metadata.ryber.CO$
            .forEach((x, i) => {
                x.unsubscribe?.()
            })
    }

    a: BehaviorSubject<any> = new BehaviorSubject<any>({ boardTop: '52px', boardHeight: '56px' })

    /* app*/
    appCurrentNav: string = "/home"
    appReloaded: string = "true"
    //deprecated
    appES = {
        router: {
        },
        resize: {
        },
        click: {
        },
        load: {
        },
        input: {
        },
		zChildUpdate:{}
    }
    //
    appSubscriptionArray: Subscription[] = []
    appViewComplete: Subject<any> = new Subject<any>()
    appViewCompleteArray: Array<any> = []
    appViewNavigation ={
        routerMatcher:(devObj)=>{
            if(this.appCO0.metadata.navigation.type === "SPA"){
                return true
            }

            else if(this.appCO0.metadata.navigation.type === "full"){
                let {item} = devObj
                let route = "/"+this[item].quantity[1][0].extras[0][0]?.appNavigation?.name

                // start the target components for the route
                if(this.appViewNavigation.routes[route] === undefined){
                    this.appViewNavigation.routes[route] = new Set()
                }
                this.appViewNavigation.routes[route].add(item)
                //

                return route === this.appCurrentNav
            }
        },
        routes:{},
        routeLengths:{}
    }
    appEventListener: Function = (a, event = null) => {
        if (typeof a === "function") {

            // check if were greater    than v9
            if (
                parseInt(VERSION.major) >= 9
            ) {
                a(event)
            }
            else {
                a()
            }
            //

        }
    }
    // so you dont get bogged by forced to fill out empty arrays
    appAvailble: Function = (item, prop) => {
        try {
            return item[prop.valueOf()]
        }
        catch (e) {
        }
    }
    //
    appEvents: Function = (devObj: {
        typesES: string,
        event: string, //property of ES
        of: Observable<any>
    }) => {
        let item = this[devObj.typesES.valueOf()][devObj.event.valueOf()].generator.next().value
        this[devObj.typesES.valueOf()]
        [devObj.event.valueOf()]
        [item] =
            devObj.of
        return item
    }
    appAddScripts:Function = (devObj) =>{
        let {scripts} = devObj
        return scripts
        .map((x, i) => {
            let s = this.renderer2.createElement('script') as HTMLScriptElement;
            this.renderer2.setAttribute(s,"type",x.type || 'text/javascript' )
            x.src ? this.renderer2.setAttribute(s,"src",x.src) : null
            x.innerText ? this.renderer2.setProperty(s,"innerText",x.innerText) : null
            x.innerText ? this.renderer2.setProperty(s,"innerHTML",x.innerText) : null
			x.async  ? this.renderer2.setAttribute(s,"async",x.async) : null
			x.defer  ? this.renderer2.setAttribute(s,"defer",x.defer) : null
			x.integrity  ? this.renderer2.setAttribute(s,"integrity",x.integrity) : null
            if(x.placement){
                if(x.placement?.appendChild){
                    this.renderer2.appendChild(x.placement.appendChild, s)
                }
                else if(x.placement?.insertBefore){

                    this.renderer2.insertBefore(x.placement.insertBefore.parent, s,x.placement.insertBefore.sibling)
                }
            }
            else{
                this.renderer2.appendChild(window.document.head, s);
            }
            return {element:s,name:x.name}
        });
    }
    appTestKeyword = "root"
    appTV = ""
    // appCO  extra metadata object
    appCO0: Partial<componentObject> = {
        metadata: {
            component:{
                responsiveHeightExclude:["mat-spinner","ta","c","div","ag-grid","i","b","video","gsap-cursor","img"]
                // should be if the item is nested
            },
            ES: [], //eventSubscriptions
            CO: [],
            formCentral: {
                applicantInput: "",
            },
            ryber: {
                CO$: [],
                sectionDefault: {
                    gap: 90, // if the gap is wildily bigger it wont stack appropraitely, make sure we gap approaitely
                    left: 50,
                    width: 1175,
                    split: 9,
                    stack: 20,
                    app:{
                        width:{
                            value:1175,
                            mediaQuery:null
                        },
                        type:"stack", //stack,custom,
                        custom:{
                            board:null
                        }
                    },
                    mobile:{
                        stack:100,
                        widthRatio:.9 ,  //this represents a percentage of the board
                        footerSpace:0
                    },
                    desktop:{
                        footerSpace:50 // represents space of footer to end of board
                    }
                }
            },
            navigation:{
                type:"full", //[SPA,full],
                full:{
                    map:{},
                    navigated:"false",
                    startURL:"/List Models"
                }
            },
            webRTC:{
                init:["localVideo","dataChannelSend","camera","myVideo"]
            },
            inputHandle: {
                mappings: [
                    {
                        type: "dropdown",
                        cssClass: "a_p_p_DropDown",
                    },
                    {
                        type: "options",
                        cssClass: "a_p_p_Selection",
                    },
                    {
                        type: "file button",
                        cssClass: "a_p_p_FileButton",
                    }
                ]
            },
            clickDone: new ReplaySubject<Array<any>>(1),
            clickDoneArray: [],
            destroyComplete: new ReplaySubject<any>(1),
            updateSheet: new ReplaySubject<any>(1),
            scripts:[]
        },
        quantity: []
    }
    //

    //dev additions
    webRTCVideo = 'true'
    webRTCText = 'false'
    //

    /* */








}
