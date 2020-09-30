import {   Component,OnInit,OnDestroy,ViewChildren,Inject,ElementRef,ChangeDetectorRef,ChangeDetectionStrategy,Renderer2  } from '@angular/core';
import {   RyberService   } from './ryber.service';
import {   fromEvent,Subject,Observable,of,Subscription,interval,ReplaySubject, BehaviorSubject, combineLatest, merge   } from 'rxjs';
import {eventDispatcher, esInit,coInit} from './customExports'
// import {   Router,RouterEvent } from '@angular/router';
import {   catchError,take,timeout,debounceTime   ,tap, distinctUntilKeyChanged, distinct} from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

declare global {
    interface Window { Modernizr: any; }
    // not let or else local to this file 
    var gapi:any 
    var Modernizr:any
    var SignaturePad:any
    var seeeb:any
    var faker:any
    var Pikaday:any
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {

    constructor(
        public ryber: RyberService,
        private ref:ChangeDetectorRef,
        private renderer2: Renderer2,
        private http:HttpClient
    ) {}

    title = 'Template';
    CO$:Subscription


        
    ngOnInit(){
        if(environment.lifecycleHooks) console.log('app ngOnInit fires on mount');

        
        //gapi && datepicker setup
        [
        "https://apis.google.com/js/api.js",
        // "https://code.jquery.com/ui/1.12.1/jquery-ui.js"
        ]
        .forEach((x,i)=>{
            let s = this.renderer2.createElement('script');
            s.type = 'text/javascript';
            s.src= x
            this.renderer2.appendChild(window.document.head, s);
        })
        //


        //fake data setup
        if(!environment.production){
            const fakerScript = this.renderer2.createElement('script');
            fakerScript.type = 'text/javascript';
            fakerScript.src = "https://cdn.rawgit.com/Marak/faker.js/master/examples/browser/js/faker.js"; // Defines someGlobalObject
            this.renderer2.appendChild(window.document.body, fakerScript);        
        }
        //  

        
        /* App Setup*/
        esInit(this.ryber,this.ryber.appCO0.metadata.ES)


        this.CO$ = merge(
            ...this.ryber.appCO0.metadata.CO.map((x,i)=>{
                return this.ryber[x.valueOf()]
            })
        )
        .subscribe((coArray:any)=>{
            coInit(
                this.ryber,
                coArray,
                ((devObj)=>{
                    let {co} = devObj
                    co.metadata.formData = {}
                    co.metadata.refresh = {}
                    co.metadata.zChildrenSubject = new Subject<any>()
                    .pipe(
                        tap((val)=>{
                            co.metadata.zChildren = val.directivesZChild
                            co.metadata.zChildren$ = of(val.directivesZChild)                    
                        }),
                    ) 
                })
            )          
        })
        // console.log(this.ryber)
    
        
        

        if(   
        window.name !== '/'   &&
            window.name !== '/home'                            
        ){   


            window.name = '/home'


        }


        if(   this.ryber.appReloaded === 'true'   ){


            this.ryber.appCurrentNav = window.name 


        }            
            
        this.ryber.appViewComplete.subscribe(()=>{
            
            
            if(   window.name === ''   ){


                window.name = '/'


            }
    

            if(   this.ryber.appReloaded !== 'true'){


                window.name = this.ryber.appCurrentNav


            }            


            // async the navigation
            if(   ['/home','/'].includes(this.ryber.appCurrentNav)   ){


                
                this.routeDispatch({
                    arr:[...this.ryber["formCO"]].sort(),
                })

                
                
            }
            //


                
            
        })     

        
        // console.log(location.pathname)
    }

    routeDispatch(
        devObj:{
            arr:Array<any>
        }
    ){
        let {arr} = devObj
        arr = arr.sort()
        this.ryber.appViewCompleteArray = this.ryber.appViewCompleteArray.sort()
        if(
            arr
            .filter((x,i) =>{ 
                return this.ryber.appViewCompleteArray[i] !== x 
            })
            .length === 0 && 
            arr.length === this.ryber.appViewCompleteArray.length
        ){


            // console.log('dispatched')
            // window.onload  sometimes the elements dont resize prorply, dispatch when the window is fully loaded
            eventDispatcher({
                element:window,
                event:'resize'
            })        


            this.ryber.appViewCompleteArray = []


            if(   this.ryber.appReloaded === 'true'){


                this.ryber.appReloaded = 'false'


            } 
            

        }    

    }


    ngOnDestroy(){
        if(environment.lifecycleHooks) console.log('app ngOnDestroy fires on dismount')
        this.CO$.unsubscribe?.()
        this.ryber.appViewComplete.unsubscribe?.()
    }

}
