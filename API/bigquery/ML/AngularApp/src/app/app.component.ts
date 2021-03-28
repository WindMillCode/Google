import { Component, OnInit, OnDestroy, ViewChildren, Inject, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, Renderer2, QueryList } from '@angular/core';
import { RyberService } from './ryber.service';
import { fromEvent, Subject, Observable, of, Subscription, interval, ReplaySubject, BehaviorSubject, combineLatest, merge } from 'rxjs';
import { eventDispatcher, esInit, coInit } from './customExports'
import { catchError, take, timeout, debounceTime, tap, first,delay } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { environment as env} from 'src/environments/environment';
import website from './website';

declare global {
    interface Window { Modernizr: any;createMap:any }
    // not let or else local to this file
    var gapi: any
    var google:any
    var Modernizr: any
    var SignaturePad: any
    var seeeb: any
    var faker: any
    var Pikaday: any

    // globals for webRTC Lab
    var localConnection :any
    var remoteConnection :any
    var room:any
    var io:any
    var stream:any
    var adapter:any
    var buf:any
    //

    // globals for web vitals lab
    var getCLS:any
    var getFID:any
    var getLCP:any
	//

	// globals for gsap
	var gsap:any
	//

	// globals for randomTextGenerator
	var RandomTextGenerator
	//
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    // styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    constructor(
        public ryber: RyberService,
        private ref: ChangeDetectorRef,
    ) { }

    title = 'Judima';
    CO$: Subscription
    subscriptions:Array<Subscription> = []
    @ViewChildren('myTemp', {read:ElementRef}) templateMyComponents: QueryList<ElementRef>;


    ngOnInit() {
        if (env.component.app.lifecycleHooks) {console.log('app ngOnInit fires on mount ')}
        let {ryber,subscriptions,ref} = this
		ryber.ref = (()=>{
			return ref
		})()

        // adding scripts
        ryber.appCO0.metadata.scripts.push(
            ...this.ryber.appAddScripts({
                scripts:[
                    {
                        src:"https://webrtc.github.io/adapter/adapter-latest.js",
                        name:"webRTC Adapter",
                        async:"true"
                    },
                    {
                        src:"https://apis.google.com/js/api.js",
                        name:"google api"
					},
					{
						src:"https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.0/gsap.min.js",
						name:"gsap",
						// integrity:"sha512-D5D6A51C3906F44B5C3A60A7A028E2C10FC7101E520CDAB0F1DE06D8C2A83708E2C0C35E04092E76C04299294C9D776C1FC066D2639DDED97FEA72F9CB46CC69",
						defer:"true"
					},
                    (false ?{
                        src: "https://cdn.rawgit.com/Marak/faker.js/master/examples/browser/js/faker.js"
                    } : null)
                ].filter((x:any,i)=>{
                    return x !== null
                })
            })
        )
        //


        /* App Setup*/
        esInit(ryber, ryber.appCO0.metadata.ES)


        this.CO$ = merge(
            ...this.ryber.appCO0.metadata.CO.map((x, i) => {
                return this.ryber[x.valueOf()]
            })
        )
        .subscribe((coArray: any) => {
            coInit(
                this.ryber,
                coArray,
                ((devObj) => {
                    let { co } = devObj
                    co.metadata.judima = {
                        desktop:{
                            stack:{
                                keep:null
                            },
                            xContain:{
                                align:null
                            }
                        },
                        init:"false"
                    }
					co.metadata.board = {}
                    co.metadata.formData = {}
                    co.metadata.refresh = {}
                    co.metadata.latch = {
                        updateZChild : new ReplaySubject<any>(),
                        zChild:{},
                        falseDestroy:[],
                        display:{
                            suffix:"display_",
                            deltaNode:{}
                        }
					}
                    co.metadata.deltaNode = {
						updateZChild : new Subject<any>(),
						groups:{},
						current:null,
						component:{
							confirm:"false"
						},
                        falseDestroy:[]

                    }
                    co.metadata.section = {
                        mediaQuery:null
                    }
                    co.metadata.navigation ={
                        groups:{},
                    }
					co.metadata.nest= {
						groups:{}
					}
                    co.metadata.agGrid = {
                        zSymbol: new Subject<any>(),
                    }
                    co.metadata.zChildrenSubject = new Subject<any>()
                    .pipe(
                        tap((val) => {
							co.metadata.zChildren = val.directivesZChild
							co.metadata.templateMyElements = val.templateMyElements
							co.metadata.ref = val.ref
                            co.metadata.zChildren$ = of(val.directivesZChild)
                        }),
                    )
                    co.metadata.ngAfterViewInitFinished = new Subject<any>()
                })
            )
        })
        subscriptions.push(this.CO$)

        if (this.ryber.appReloaded === 'true') {


            this.ryber.appCurrentNav = ryber.appCO0.metadata.navigation.full.startURL


        }

        subscriptions.push(
            this.ryber.appViewComplete.subscribe(() => {


            if (window.name === '') {


                window.name = '/'


            }


            if (this.ryber.appReloaded !== 'true') {


                window.name = this.ryber.appCurrentNav


            }


            // async the navigation
            if(ryber.appCO0.metadata.navigation.type === "full"){
                if (
                    ryber.appViewNavigation.routes[ryber.appCurrentNav].size ===ryber.appViewNavigation.routeLengths[ryber.appCurrentNav]
                ) {



                    this.routeDispatch({
                        arr: Array.from(ryber.appViewNavigation.routes[ryber.appCurrentNav]).sort(),
                    })


                    // console.log(ryber.appViewNavigation.routes)
                }
            }

            else if(ryber.appCO0.metadata.navigation.type === "SPA"){
                this.routeDispatch({
                    arr: [...this.ryber["formCO"]].sort(),
                })
            }
            //




            })
        )

	}

    routeDispatch(
        devObj: {
            arr: Array<any>
        }
    ) {
        let { arr } = devObj
        arr = arr.sort()
        this.ryber.appViewCompleteArray = this.ryber.appViewCompleteArray.sort()

        if (
            arr
                .filter((x, i) => {
                    return this.ryber.appViewCompleteArray[i] !== x
                })
                .length === 0 &&
            arr.length === this.ryber.appViewCompleteArray.length
        ) {



            // window.onload  sometimes the elements dont resize prorply, dispatch when the window is fully loaded
            eventDispatcher({
                element: window,
                event: 'resize'
            })


            this.ryber.appViewCompleteArray = []
            // not perfect find a better way to wait for the route to initalize before modifying this value

            //


            if (this.ryber.appReloaded === 'true') {


                this.ryber.appReloaded = 'false'


            }


        }

	}

	ngAfterViewInit(){
        if (env.component.app.lifecycleHooks) {console.log('app ngAfterViewInit fires on mount ')}
		let {templateMyComponents,ryber,subscriptions} = this

        
        // listen for route changes
        subscriptions.push(
            templateMyComponents.changes
            .subscribe((result:any)=>{
                ryber.appCO0.metadata.navigation.full.navigated = "false"
            })
        )
        //
	}

    ngOnDestroy() {
        if (env.component.app.lifecycleHooks){ console.log('app ngOnDestroy fires on dismount')}
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




