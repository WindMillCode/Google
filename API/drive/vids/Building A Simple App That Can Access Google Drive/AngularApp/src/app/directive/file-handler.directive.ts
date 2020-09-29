import {Directive, ElementRef, HostListener,Input,Renderer2} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import {eventDispatcher } from '../customExports'


@Directive({
  selector: '[appFileHandler]'
})
export class FileHandlerDirective {

    @Input() fileHandler: any;
    extras:any
    f: any;
    fSub: Subscription
    constructor(
        private el:ElementRef,
        private renderer2:Renderer2
    ) { }

    @HostListener('click') onClick(){

        if(this.fileHandler?.confirm === 'true'){
            this.f.click()     
        }        
    }

    ngOnInit(){
        this.extras = this.fileHandler
        if(this.fileHandler?.confirm === 'true'){

            this.f = this.renderer2.createElement('input');
            this.f.type = "file"
            this.f.setAttribute("multiple",true)
            this.renderer2.appendChild(window.document.body, this.f);
            this.renderer2.addClass(
                this.f,
                "a_p_p_BackStageProp"   
            )        
            this.renderer2
            .setAttribute(
                this.f,
                "id",
                "a_p_p_"  + this.extras.name.valueOf().split("-").join("").split(" ").join("-")
            )    
        

            this.fSub = fromEvent(this.f,'change')
            .subscribe(()=>{
                let myFiles = Array.from(this.f.files)
                this.renderer2
                .setProperty(
                    this.el.nativeElement,
                    "innerHTML",
                    myFiles.length === 0 ? "Select File" :
                    (
                        myFiles.length + ( myFiles.length !== 1 ?   " files" : " file" )  + " chosen"
                    )
                )     
                eventDispatcher({
                    event:'resize',
                    element:window
                })
            }) 

        }
    }

    ngOnDestroy(){
        this.extras = this.fileHandler
        if(this.extras?.confirm === 'true'){
            this.fSub.unsubscribe()
        }        
    }
}
