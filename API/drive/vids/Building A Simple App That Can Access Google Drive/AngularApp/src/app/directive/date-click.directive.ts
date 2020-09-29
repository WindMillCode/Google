import {Directive, ElementRef, HostListener,Input,Renderer2,TemplateRef,ViewContainerRef,ViewRef,EmbeddedViewRef,ViewChildren} from '@angular/core';
import { eventDispatcher } from '../customExports';
import { fromEvent, from, Subscription } from 'rxjs';
import {delay} from 'rxjs/operators'
@Directive({
  selector: '[appDateClick]'
})


export class DateClickDirective {

    picker : typeof Pikaday
    pickerSubscription :Subscription

    @Input() dateClick: any;

    ngOnInit(){
        // console.log(this.dateClick)
         
        if(this.dateClick?.confirm === 'true'){
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

    ngOnDestroy(){
        if(this.dateClick?.confirm === 'true'){
            this.picker.destroy()
            this.pickerSubscription.unsubscribe()     
        }   
    }
    
   
    

    @HostListener('click',['$event']) onMouseClick(e){

     
        if(this.dateClick?.confirm === 'true'){

        }
    }

    
    constructor(
        private el:ElementRef,
        private renderer:Renderer2
    ) { }



}