import {Directive, ElementRef, HostListener,Input,Renderer2} from '@angular/core';

@Directive({
  selector: '[appMoneyClick]'
})
export class MoneyClickDirective {
    @Input() moneyClick: any;
    

    
    @HostListener('focus') onMouseFocus() {
        
        
        if(this.moneyClick === undefined){
            return 
        }
        if(this.moneyClick.confirm === 'true'){

            if(this.el.nativeElement.value === "" ){
                this.renderer
                .setProperty(
                    this.el.nativeElement,
                    "value",
                    "$"
                )
            }
            setTimeout(()=>{this.el.nativeElement.click()},2);
        }
    }

    @HostListener('blur') onMouseBlur() {

        if(this.moneyClick === undefined){
            return 
        }
        if(this.moneyClick.confirm === 'true'){
            if(this.el.nativeElement.value === "$" ){
                this.renderer
                .setProperty(
                    this.el.nativeElement,
                    "value",
                    ""
                )
            }
        }

    }

    constructor(
        private el:ElementRef,
        private renderer: Renderer2
    ) { }

}
