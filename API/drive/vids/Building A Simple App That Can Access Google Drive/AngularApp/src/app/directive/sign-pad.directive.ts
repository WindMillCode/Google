import {Directive, ElementRef, HostListener,Input,OnInit,Renderer2,ViewChild,OnDestroy} from '@angular/core';
import {fromEvent, Subscription,combineLatest} from 'rxjs'
import {numberParse} from '../customExports'


@Directive({
  selector: '[appSignPad]'
})
export class SignPadDirective implements OnInit {
    @Input() extras: any;
    

  
    constructor(
        private el:ElementRef,
        private renderer:Renderer2
    ) {}

    resize:Subscription

    ngOnInit(){


        

        if(this.extras?.confirm === 'true'){
            
            this.renderer.setAttribute(this.el.nativeElement,"width",this.extras.width)
            this.renderer.setAttribute(this.el.nativeElement,"height",this.extras.height)
            this.extras.sPad = new SignaturePad(this.el.nativeElement)
            this.resize =combineLatest(
                fromEvent(window,'resize'),
            ) 
            .subscribe((dims:any)=>{
                // keeping the signature on resize
                    // need to get it from component code since you dont have it readily availble
                this.extras.savedS =  this.extras.sPad.toData()
                this.renderer.setAttribute(this.el.nativeElement,"width", numberParse( this.el.nativeElement.style.width))
                this.renderer.setAttribute(this.el.nativeElement,"height",numberParse( this.el.nativeElement.style.height))  
                this.extras.sPad.fromData(this.extras.savedS)
                // keeping the signature on resize
            })


        }      
    }

    ngOnDestroy(){
        if(this.extras?.confirm === 'true'){
            this.resize.unsubscribe()
        }

        
    }

}


