

import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy } from '../customExports'
import { catchError, delay } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Directive({
    selector: '[appCreate]'
  })
export class CreateDirective {

    @Input() create: any;
    extras: any;

    constructor(
        private el: ElementRef,
        private http: HttpClient,
        private renderer: Renderer2,
        private ryber: RyberService
    ) { }


    @HostListener('click') onClick() {


        if (this.extras?.confirm === 'true') {

            let answer  = (document.querySelector(".f_o_r_m_Dataset-Answer") as HTMLInputElement).value
            //communicate with the python backend
            this.http.get(
                "http://localhost:3005",
                {
                    params:{
                        name:answer
                    },
                    responseType: 'text'
                }
            )
            .pipe(
            catchError((error)=>{
                return of(error)
            })
            )
            .subscribe((result:any)=>{
                console.log(result)
                let update = (document.querySelector(".f_o_r_m_Result") as HTMLElement)
                update.innerText = result
                eventDispatcher({
                    event:'resize',
                    element:window
                })
            })
            //

        }

    }

    ngOnInit() {
        this.extras = this.create
        if (this.extras?.confirm === 'true') {
            console.log(env.search)

            setTimeout(() => {
                // this.el.nativeElement.click()
            }, 200)
        }
    }


    ngOnDestroy() {
        if (this.extras?.confirm === 'true') {
            Object.values(this)
                .forEach((x: any, i) => {
                    console.log(x instanceof Subscriber)
                    x.unsubscribe?.()
                })
        }
    }
}

