
import { Directive, ElementRef, HostListener, Input, Renderer2, ViewChildren } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest,timer, Subject } from 'rxjs';
import { navigationType,ryberUpdateFactory, eventDispatcher, numberParse, objectCopy,flatDeep, componentConsole } from '../customExports'
import { catchError, delay,first,repeat,map } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { VanillaFrameworkOverrides } from 'ag-grid-community';



@Directive({
	selector: '[appDeltaNode]'
})
export class DeltaNodeDirective {

	@Input() deltaNode: any;
	extras: any;
	zChildren: any;
	templateMyElements:any;
	ref:any;
	groups :any ={}
	subscriptions: Array<Subscription> = []
	controls:any = []

	constructor(
		private renderer2: Renderer2,
		private ryber: RyberService
	) { }


	ngOnInit() {

		this.extras = this.deltaNode
		if (this.extras?.confirm === 'true') {

			// command is setup only from the body this is where you can decide which elements have certain controls
			if(this.extras.type === "body"){
				if(env.directive.deltaNode.lifecycleHooks) console.log(this.extras.co + " " + this.extras.zSymbol+ ' deltaNode ngOnInit fires on mount')


				let {ryber,extras,subscriptions} = this
				let rUD = ryberUpdateFactory({ryber})
				let {co} = this.extras
				let {groups} = this.groups =  ryber[co].metadata.deltaNode
				let {deltaNode} = ryber[co].metadata



				subscriptions.push(
					combineLatest([
						ryber[co].metadata.zChildrenSubject
					])
					.pipe(first())
					.subscribe((result) => {

						let zChildren = this.zChildren = ryber[co].metadata.zChildren
						this.templateMyElements = ryber[co].metadata.templateMyElements
						this.ref =ryber[co].metadata.ref

						// restore deltaNode from false destroy like navigation
						let action:any = navigationType({
							type:["full"],
							fn:()=>{
								if(
									ryber.appCO0.metadata.navigation.full.navigated === "true" &&
									ryber[co].metadata.judima.init === "true"
								){
									return "return"
								}
							},
							ryber
						})
						if(action.full === "return"){
							// restore from 'ngFalseDestroy'
							let save = ryber[co].metadata.deltaNode.falseDestroy.shift()

							Object.assign(this,save)
							let {groups} = this.groups
							let {subscriptions,zChildren} = this

							// restore controls for add and remove events
								// in latch directive elements have controls too however, it still is able to figure things out
							Object.entries(groups)
							.forEach((x:any,i)=>{
								let key = x[0]
								let val = x[1]
								if(val.type === "add_remove_button"){
									["add","remove"]
									.forEach((y:any,j)=>{
										val[y]
										.forEach((z:any,k)=>{
											subscriptions[z.eventWrapper.index].unsubscribe()
											subscriptions[z.eventWrapper.index] = fromEvent(
												zChildren[z.target[0]].element,
												"click"
											)
											.subscribe(z.eventWrapper.fn)
										})
									})
								}
							})
							//
							return
						}
						//

						// gathering all the deltaGroups in the component
						this.extras.group
						.forEach((x:any,i)=>{
							groups[x.name] = {
								type:x.type,
								targets:[],
								hooks:{
									directive:"prepare",
									component:new Set(),
								},
								add:[],
								remove:[],

							}
							if(x.type === "repeat"){
								// should be initalized once
									// navigation might make this repeat
								if(x.complete === "true"){
									groups[x.name].repeat = {
										by:0
									}
								}
								//

								//
								else{
									groups[x.name].repeat = {
										by:x.by
									}
									x.complete ="true"
								}
								//
							}
						})
						//

						// gathering all objects to their respective deltaGroups
						Object.entries(this.zChildren)
						.forEach((x:any,i)=>{
							let zChildDeltaNode = x[1]?.extras?.appDeltaNode
							groups?.[zChildDeltaNode?.group]?.targets.push(x)
						})
						//

						//
						// sorting the elements associated to respetive groups
						Object.entries(groups)
						.forEach((x:any,i)=>{
							let key = x[0]
							let val = x[1]

							// controls
								// we can have several add and remove buttons
								// FIXME, disable this feature when is use in the component

							if(val.type ==="add_remove_button"){

								val.targets =val.targets
								.map((y:any,j)=>{
									// logic for add button concept
									if(y[1]?.extras?.appDeltaNode?.type === "add"){

										val.add .push ({target:y,by:+y[1].extras.appDeltaNode.by})

										this.controls.push({
											element:y[1].element,
											type:val.type
										})
									}
									//

									//logic for remove button concept
									if(y[1]?.extras?.appDeltaNode?.type === "remove"){
										val.remove.push ( {target:y,by:+y[1].extras.appDeltaNode.by})
										this.controls.push({
											element:y[1].element,
											type:val.type
										})
									}
									//


									//logic for increment
									if(y[1]?.extras?.appDeltaNode?.type === "increment"){
										y[1].extras.appDeltaNode.increment = {
											counter: +y[1].innerText?.item.split("")[0]
										}
									}
									//
									return y
								})
								.filter((y:any,j)=>{

									return [undefined,"increment"].includes(y[1]?.extras?.appDeltaNode?.type)
								})


								// add concept logic
									// provide for hooks if needed
								// rmbr each group needs it own
								val.deltas =[]
								//
								let addEvent = (devObj:any)=>{

									let {y} = devObj
 									// clear this so the component can reset and format properly
									// console.log(val.hooks.component)
									val.hooks.component.clear()
									//

									// add the deltas by val.add.by times
									Array(y.by).fill(null)
									.forEach(()=>{
										let addedDeltas =[]
										val.targets
										.forEach((y:any,j)=>{

											// add the elements onto the dom
												// now you have the option to add from original or add from deltas
											let css = objectCopy(y[1].css)
											let text = (()=>{
												if(y[1]?.extras?.appDeltaNode?.type === "increment"){
													let mySplit = y[1].innerText?.item.split("")
													return (++y[1].extras.appDeltaNode.increment.counter)+(mySplit[1] || "")
												}
												return y[1].innerText?.item
											})()
											let  extras = objectCopy(y[1].extras)
											if(extras.appDeltaNode?.options?.target?.confirm === "true"){
												extras.appDeltaNode.options.target.zSymbol = y[0]
											}

											// you must string the component name type and its symbol so it val
											// can properly receive the next symbol
											addedDeltas.push(
												rUD({
													quantity:2,
													symbol:y[1].symbol,
													co,
													bool:y[1].bool,
													css,
													cssDefault:objectCopy(y[1].cssDefault),
													text,
													extras,
													val:y[1].val
												})
											)

											// console.log(this.templateMyElements)
											//


										})
										this.ref.detectChanges()
										deltaNode.current = {
											deltas:addedDeltas,
											group:key
										}
										val.hooks.directive  ="add prepare"
										val.deltas.push(addedDeltas)
										ryber[co].metadata.deltaNode.updateZChild.next()

									})
									//

								}

								val.add
								.map((y:any,j)=>{
									y.eventWrapper = {
										fn:(result:any)=>{
											if(!y.target[1].element.disabled){
												this._disableButton()
												addEvent({result,y})
											}
										},
										index: subscriptions.length
									}
									subscriptions.push(
										fromEvent(zChildren[y.target[0]].element,"click")
										.subscribe(y.eventWrapper.fn)
									)

								})


								//

								// remove concept logic
								let removeEvent = (devObj:any)=>{

									let {y} = devObj
									// clear this so the component can reset and format properly
									val.hooks.component.clear()
									//

									// remove the deltas by val.remove.by times
									Array(y.by).fill(null)
									.forEach(()=>{

										// if there are no deltas to remove return and enable the button
										if(val.deltas.length === 0){
											this._enableButton()
											val.hooks.directive = "remove done"
											return
										}
										//
										let removeDeltas = flatDeep(val.deltas.pop(),Infinity)
										val.targets
										.forEach((y:any,j)=>{

											// properly modify the counter
												// now you have the option to add from original or add from deltas
											if(y[1]?.extras?.appDeltaNode?.type === "increment"){

												--y[1].extras.appDeltaNode.increment.counter
											}

										})

										removeDeltas
										.forEach((y:any,j)=>{
											// console.log(y)
											// remove the elements from the DOM
												// we decide it will be the last index in deltas

											rUD({
												symbol:y,
												type:"remove",
												co
											})
											//
										})
										this.ref.detectChanges()

										deltaNode.current = {
											deltas:removeDeltas,
											group:key
										}
										val.hooks.directive  ="remove prepare"
										ryber[co].metadata.deltaNode.updateZChild.next()




									})
									//

								}

								val.remove
								.map((y:any,j)=>{
									y.eventWrapper  = {
										fn:(result:any)=>{
											if(!y.target[1].element.disabled){
												this._disableButton()
												removeEvent({result,y})
											}
										},
										index:subscriptions.length
									}
									subscriptions.push(
										fromEvent(zChildren[y.target[0]].element,"click")
										.subscribe(y.eventWrapper.fn)
									)

								})

								//

								// unlock the buttons once components afterViewInit is finished
								this.subscriptions.push(
									ryber[co].metadata.ngAfterViewInitFinished

									.subscribe((result:any)=>{
										this._enableButton()
									})
								)
								//

							}
							//

							//
							else if(val.type ==="repeat"){
								val.deltas =[]
								ryber[co].metadata.ngAfterViewInitFinished
								.pipe(
									first()
								)
								.subscribe((result:any)=>{
									Array(+val.repeat.by).fill(null)
									.forEach((xx:any,ii)=>{
										let repeatedDeltas = []
										val.targets =val.targets
										.map((y:any,j)=>{

											//logic for increment
											if(y[1]?.extras?.appDeltaNode?.type === "increment"){
												y[1].extras.appDeltaNode.increment = {
													counter: +y[1].innerText?.item.split("")[0]
												}
											}
											//

											// pre mods
											let css = objectCopy(y[1].css)
											let text = (()=>{
												if(y[1]?.extras?.appDeltaNode?.type === "increment"){
													let mySplit = y[1].innerText?.item.split("")

													return (++y[1].extras.appDeltaNode.increment.counter)+mySplit[1]
												}
												return y[1].innerText?.item
											})()
											let  extras = objectCopy(y[1].extras)
											if(extras.appDeltaNode?.options?.target?.confirm === "true"){
												extras.appDeltaNode.options.target.zSymbol = y[0]
											}
											//

											// add the elements to the dom

												repeatedDeltas.push(
													rUD({
														quantity:3,
														symbol:y[1].symbol,
														co,
														bool:y[1].bool,
														css:objectCopy(css),
														cssDefault:objectCopy(y[1].cssDefault),
														text,
														extras:objectCopy(extras),
														val:y[1].val
													})
												)

											//
											return y
										})
										this.ref.detectChanges()
										deltaNode.current = {
											deltas:repeatedDeltas,
											group:key
										}
										val.deltas.push(repeatedDeltas)
										val.hooks.directive  ="add prepare"
										ryber[co].metadata.deltaNode.updateZChild.next()
									})
								})


							}

						})
						//

					})
				)

			}
			//

		}
	}

	private _disableButton  (){
		this.controls
		.forEach((x:any,i)=>{
			if(x.type ==="add_remove_button"){
				this.renderer2.setAttribute(
					x.element,
					"disabled",
					"true"
				)
			}
		})
	}

	private _enableButton  (){
		this.controls
		.forEach((x:any,i)=>{
			if(x.type ==="add_remove_button"){
				this.renderer2.removeAttribute(
					x.element,
					"disabled",
				)
			}
		})
	}

	ngOnDestroy() {
		if (this.extras?.confirm === 'true' && this.extras?.type === "body") {
			if(env.directive.deltaNode.lifecycleHooks) console.log(this.extras.co + " " + this.extras.zSymbol+ ' deltaNode ngOnDestroy fires on dismount')
			let {ryber,extras,subscriptions,controls,groups,templateMyElements,zChildren} = this
			let {co}= extras
			// prevent the deltaNode setup from going missing
				let action:any = navigationType({
					type:["full"],
					fn:()=>{
						if(ryber.appCO0.metadata.navigation.full.navigated === "true"){
							return "return"
						}
					},
					ryber
				})
				if(action.full ==="return"){
					// falseDestroy protection
						// for things like navigation, the elements dont go so save the directive properties
					let save ={
						subscriptions,
						controls,
						groups,
					}
					ryber[co].metadata.deltaNode.falseDestroy.push(save)
					//
					return
				}
			//
			subscriptions
			.forEach((x: any, i) => {
				try{
					x.unsubscribe()
				}
				catch(e){}

			})
		}
	}
}

