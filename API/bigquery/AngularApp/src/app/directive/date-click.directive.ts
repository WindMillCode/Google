import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren } from '@angular/core';
import { RyberService } from '../ryber.service'
import { ReplaySubject,fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy } from '../customExports'
import { catchError, delay,first } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Directive({
  selector: '[appDateClick]'
})


export class DateClickDirective {

    picker : typeof Pikaday
    pickerSubscription :Subscription
    extras:any;
    @Input() dateClick: any;

    ngOnInit(){
        // console.log(this.dateClick)
        this.extras = this.dateClick
        if(this.extras?.confirm === 'true'){
            this.picker = new Pikaday({
                field:this.el.nativeElement,
                yearRange:120
            })

            this.pickerSubscription = fromEvent(window,'resize')
            .pipe(
                delay(2)
            )
            .subscribe(()=>{
                if(this.picker.isVisible()){
                    this.picker.adjustPosition()
                }
            })
        }


    }

    ngOnDestroy() {
        if (this.extras?.confirm === 'true') {
            this.picker.destroy()
            Object.values(this)
            .forEach((x: any, i) => {
                if(x instanceof Subscriber){
                    x.unsubscribe?.()
                }

            })
        }
    }





    constructor(
        private el:ElementRef,
        private renderer:Renderer2
    ) { }



}
