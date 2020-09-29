import {Directive, ElementRef, HostListener,Input,Renderer2,OnInit} from '@angular/core';
import {objectCopy, xContain} from "../customExports"

@Directive({
  selector: '[appExtend]'
})
export class ExtendDirective implements OnInit {
    @Input() extend:any;
    lock:string= "false"

    constructor(
        private el:ElementRef,
        private renderer:Renderer2
    ) { }

    ngOnInit(){
        if(this.extend !== undefined ){


            Object
            .keys(this.extend)
            .forEach((x,i)=>{
                this.renderer.setAttribute(
                    this.el.nativeElement,
                    x,
                    this.extend[x.valueOf()]
                )
            })    
            
            
            
        }
        if(this.el.nativeElement.tagName === "INPUT"){
            this.renderer.setAttribute(
                this.el.nativeElement,
                "size",
                (parseInt(this.el.nativeElement.getAttribute('placeholder').length) + 5).toString()

            )            
        }
    }



    

}
