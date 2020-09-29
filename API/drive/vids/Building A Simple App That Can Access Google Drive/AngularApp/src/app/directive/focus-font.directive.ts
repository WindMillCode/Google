import {Directive, ElementRef, HostListener,Input,Renderer2} from '@angular/core';
import {eventDispatcher} from '../customExports'
import { Subscription, fromEvent } from 'rxjs';
@Directive({
  selector: '[appFocusFont]'
})
export class FocusFontDirective {
    @Input() focusFont: any;
    ffSub:Subscription

    constructor(
        private el:ElementRef,
        private renderer:Renderer2
    ) { }


    // @HostListener('focus') onAppFocusFontFocus() {
    //     if(this.focusFont === undefined){
    //         return
    //     }
    //     if(this.focusFont.confirm === 'true'){

    //         this.focusFont.original = this.el.nativeElement.style.fontSize
    //     }
    // }    


    // @HostListener('keyup',['$event']) onAppFocusFontKeyUp(e) {
    //     // console.log(this.focusFont)
    //     if(this.focusFont === undefined){
    //         return
    //     }
    //     if(this.focusFont.confirm === 'true'){
            
    //         if(this.el.nativeElement.value === ""){
    //             this.renderer.setStyle(this.el.nativeElement,'font-size',this.focusFont.original)
    //         }

    //         else{
    //             this.renderer.setStyle(this.el.nativeElement,'font-size',this.focusFont.fontSizeDefault)        
    //         }
             
    //     }
    // }

    // @HostListener('blur') onAppFocusFontBlur() {
    //     if(this.focusFont === undefined){
    //         return
    //     }
    //     if(this.focusFont.confirm === 'true'){
    //         this.renderer.setStyle(this.el.nativeElement,'font-size',this.focusFont.original)
    //     }
    // }    

    // ngOnInit(){
    //     if(this.focusFont === undefined){
    //         return
    //     }        
    //     this.ffSub = fromEvent(window,'resize')
    //     .subscribe(()=>{
    //         this.focusFont.original = this.el.nativeElement.style.fontSize
    //     })
        
    // }

    // ngOnDestroy(){
    //     this.ffSub.unsubscribe()
    // }
}

