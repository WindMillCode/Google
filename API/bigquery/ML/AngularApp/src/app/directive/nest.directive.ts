import { Directive, ElementRef, HostListener, Input, Renderer2, ChangeDetectorRef } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy } from '../customExports'
import { catchError, delay,first,tap,take } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Directive({
    selector: '[appNest]'
})
export class NestDirective {

    @Input() nest: any;
    extras: any;
    zChildren: any;
	groups:any;
	subscriptions:Array<any> = []
	ref:ChangeDetectorRef

    constructor(
        private el: ElementRef,
        private http: HttpClient,
        private renderer2: Renderer2,
        private ryber: RyberService
    ) { }


    ngOnInit() {
        this.extras = this.nest
        if (this.extras?.confirm === 'true' ) {
            // console.log("nested ngOnInit")

			if(this.extras.type === "body" && this.extras.group !== undefined){


				let {ryber,zChildren,ref} =this
				let {co} = this.extras
				let {groups} = this.groups =  ryber[co].metadata.nest
				let {nest} = ryber[co].metadata

				//configure object to handle nesting for different groups
				this.extras.group
				.forEach((x:any,i)=>{
					groups[x.name] = {
						type:x.type,
						targets:[],
						nestNameZSymbolMap:{},
					}
				})
				//

				this.subscriptions.push(
					ryber[co].metadata.zChildrenSubject
					// .pipe(first())
					.subscribe(()=>{

						// initalize needed vars fom the component
                		;({ref,zChildren} = ryber[co].metadata)
						//

						this._nestZChildren({zChildren, groups, ryber, co});
					}),
				)
			}

        }
    }


	private _nestZChildren(devObj) {
		let {zChildren,groups,ryber,co} = devObj
		// gathering all objects to their respective nestGroups
		Object.entries(zChildren)
			.forEach((x: any, i) => {
				let zChildNest = x[1]?.extras?.appNest;
				groups?.[zChildNest?.group]?.targets.push(x);
			});
		//

		// creating the nestingTree
		Object.entries(groups)
		.forEach((x: any, i) => {
			let key = x[0];
			let val = x[1];

			// filter out items not to be nested
			val.targets = val.targets
			.filter((y:any,j)=>{
				return y[1].extras.appNest.options?.ignore !== "true"
			})
			//

			// first get a map from nestName to zSymbol
			val.targets
			.forEach((y: any, j) => {
				let nestName = y[1].extras.appNest.name;
				let suffix = 0;
				let finalNestName = y[1].extras.appNest.suffix === undefined ?
					nestName :
					nestName + " " + y[1].extras.appNest.suffix;
					// console.log(finalNestName)
				// if (!Object.keys(val.nestNameZSymbolMap).includes(finalNestName)) {
				if (val.nestNameZSymbolMap[finalNestName] === undefined) {
					val.nestNameZSymbolMap[finalNestName] = y[0];
				}


				// seems there might be a duplication occuring,
				// provide for a suffix and seperate the name and suffix by space
				else {

					while(val.nestNameZSymbolMap[nestName + " " + suffix] !== undefined) {
					// while (Object.keys(val.nestNameZSymbolMap).includes(nestName + " " + suffix)) {

						suffix += 1;
					}
					y[1].extras.appNest.suffix = suffix;
					val.nestNameZSymbolMap[nestName + " " + suffix] = y[0];
					// console.log(finalNestName,{...val.nestNameZSymbolMap})

				}

			});
			//
			// console.log(val.nestNameZSymbolMap)
			//attempt to nest the items
				/* what happens here is that of the under for name + " " + suffix exists
				nest will try to place it under   under + " " + suffix,else it will place it under,
				under
				*/
			val.targets
			.forEach((y: any, j) => {
				let { name: finalNestName, suffix, under: finalNestUnder } = y[1].extras.appNest;
				// console.log({finalNestName,suffix,finalNestUnder})
				if (suffix !== undefined) {
					if (val.nestNameZSymbolMap[finalNestUnder + " " + suffix] !== undefined) {
						finalNestUnder += " " + suffix;
					}
					finalNestName += " " + suffix;
				}

				let childZSymbol = val.nestNameZSymbolMap[ finalNestName];
				let parentZSymbol = val.nestNameZSymbolMap[finalNestUnder];
				if (parentZSymbol !== undefined) {

					try{
						this.renderer2.appendChild(
							zChildren[parentZSymbol].element,
							zChildren[childZSymbol].element
						);

						if(zChildren[childZSymbol].extras.appNest?.options?.positionStatic !== "false"){
							zChildren[childZSymbol].css["position"] = "static"
						}
					}
					catch (e){
						console.log(childZSymbol,e)
					}

				}

			});
			//

			// resetting objects
			val.targets = [];
			val.nestNameZSymbolMap = {}
			//
		});
		//
		this.zChildren = zChildren;
		this.groups = groups;
	}

	ngOnDestroy() {
		if (this.extras?.confirm === 'true') {
			this.subscriptions
			.forEach((x: any, i) => {
				try{
					x.unsubscribe()
				}
				catch(e){}

			})
			delete this.subscriptions
		}
	}
}

