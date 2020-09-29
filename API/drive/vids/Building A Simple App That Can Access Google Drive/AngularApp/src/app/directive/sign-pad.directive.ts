import {Directive, ElementRef, HostListener,Input,OnInit,Renderer2,ViewChild,OnDestroy} from '@angular/core';
import {fromEvent, Subscription,combineLatest} from 'rxjs'
import {numberParse} from '../customExports'


@Directive({
  selector: '[appSignPad]'
})
export class SignPadDirective implements OnInit {
    @Input() signPad: any;
    

  
    constructor(
        private el:ElementRef,
        private renderer:Renderer2
    ) {}

    resize:Subscription

    ngOnInit(){
        if(this.signPad === undefined){
            return 
        }

        

        if(this.signPad.confirm === 'true'){
            
            this.renderer.setAttribute(this.el.nativeElement,"width",this.signPad.width)
            this.renderer.setAttribute(this.el.nativeElement,"height",this.signPad.height)
            this.signPad.sPad = new SignaturePad(this.el.nativeElement)
            this.resize =combineLatest(
                fromEvent(window,'resize'),
            ) 
            .subscribe((dims:any)=>{
                // keeping the signature on resize
                    // need to get it from component code since you dont have it readily availble
                this.signPad.savedS =  this.signPad.sPad.toData()
                this.renderer.setAttribute(this.el.nativeElement,"width", numberParse( this.el.nativeElement.style.width))
                this.renderer.setAttribute(this.el.nativeElement,"height",numberParse( this.el.nativeElement.style.height))  
                this.signPad.sPad.fromData(this.signPad.savedS)
                // keeping the signature on resize
            })


        }      
    }

    ngOnDestroy(){
        if(this.signPad === undefined){
            return 
        }

        this.resize.unsubscribe()
    }

}


