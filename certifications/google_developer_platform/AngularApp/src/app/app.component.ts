import { Component, OnInit, OnDestroy, ViewChildren, Inject, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, Renderer2 } from '@angular/core';
import { RyberService } from './ryber.service';
import { fromEvent, Subject, Observable, of, Subscription, interval, ReplaySubject, BehaviorSubject, combineLatest, merge } from 'rxjs';
import { eventDispatcher, esInit, coInit } from './customExports'
// import {   Router,RouterEvent } from '@angular/router';
import { catchError, take, timeout, debounceTime, tap, distinctUntilKeyChanged, distinct } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { environment as env} from 'src/environments/environment';




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
        private renderer2: Renderer2,
        private http: HttpClient
    ) { }

    title = 'AngularBigquery';
    CO$: Subscription

    ngOnInit() {
        if (env.lifecycleHooks) console.log('app ngOnInit fires on mount');


        // adding scripts
        this.ryber.appCO0.metadata.scripts.push(
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
        esInit(this.ryber, this.ryber.appCO0.metadata.ES)


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
                    co.metadata.formData = {}
                    co.metadata.refresh = {}
                    co.metadata.latch = {
                        updateZChild : new Subject<any>(),
                        zChild:{}
                    }
                    co.metadata.agGrid = {
                        zSymbol: new Subject<any>(),
                    }
                    co.metadata.zChildrenSubject = new Subject<any>()
                    .pipe(
                        tap((val) => {
                            co.metadata.zChildren = val.directivesZChild
                            co.metadata.zChildren$ = of(val.directivesZChild)
                        }),
                    )
                    co.metadata.ngAfterViewInitFinished = new Subject<any>()
                })
            )
        })

        // console.log(this.ryber)




        if (
            window.name !== '/' &&
            window.name !== '/home'
        ) {


            window.name = '/home'


        }


        if (this.ryber.appReloaded === 'true') {


            this.ryber.appCurrentNav = window.name


        }

        this.ryber.appViewComplete.subscribe(() => {


            if (window.name === '') {


                window.name = '/'


            }


            if (this.ryber.appReloaded !== 'true') {


                window.name = this.ryber.appCurrentNav


            }


            // async the navigation
            if (['/home', '/'].includes(this.ryber.appCurrentNav)) {



                this.routeDispatch({
                    arr: [...this.ryber["formCO"]].sort(),
                })



            }
            //




        })


        // console.log(location.pathname)
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


            // console.log('dispatched')
            // window.onload  sometimes the elements dont resize prorply, dispatch when the window is fully loaded
            eventDispatcher({
                element: window,
                event: 'resize'
            })


            this.ryber.appViewCompleteArray = []


            if (this.ryber.appReloaded === 'true') {


                this.ryber.appReloaded = 'false'


            }


        }

    }

    ngOnDestroy() {
        if (env.lifecycleHooks) console.log('app ngOnDestroy fires on dismount')
        this.CO$.unsubscribe?.()
        this.ryber.appViewComplete.unsubscribe?.()
    }


}




