import {Directive, ElementRef, HostListener,Input,Renderer2,TemplateRef,ViewContainerRef,ViewRef,EmbeddedViewRef,ViewChildren} from '@angular/core';
import {RyberService} from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber } from 'rxjs';
import {deltaNode,eventDispatcher, numberParse,objectCopy} from '../customExports'
import {delay} from 'rxjs/operators'
import {environment}  from '../../environments/environment'

@Directive({
    selector: '[appPrintFiles]'
})
export class PrintFilesDirective {


	@Input() printFiles: any;
	extras:any
	pF_ASub:Subscription
	pF_BSub:Subscription
	appendTarget:any = []
	signOutTarget:any

	@HostListener('click') onClick(){
        if(this.extras?.confirm === 'true'){


            //accesing the drive API 
            
				//credentials					
                //

                //reactiong functions
                let {appendTarget,ryber,extras} = this
                //

				//load the auth sdk				
				//
				
			//		
		}
	}
	
    ngOnInit(){
		this.extras = this.printFiles


        if(this.extras?.confirm === 'true'){

			// grabbing needed component zChildren to get job done
			this.pF_ASub = this.ryber[this.extras.co].metadata.zChildrenSubject
			.subscribe((item)=>{

				// find where the directive should append the data to
				try{
					Object.entries(item.directivesZChild)
					.forEach((x:any,i)=>{
						if(
							x[1].extras?.appPrintFiles?.printGroup === this.extras.printGroup &&
							x[1].extras?.appPrintFiles?.type === "replace"
						){
							this.appendTarget.push(x[1])
							console.log(this.appendTarget)
							
						}
						else if(
							x[1].extras?.appPrintFiles?.printGroup === this.extras.printGroup &&
							x[1].extras?.appPrintFiles?.type === "signOut"
						){
							this.signOutTarget = x[1]


							//sign out functionality				
							//	
							
							
						}						
						if(this.appendTarget !== undefined && this.signOutTarget !== undefined){
							throw('e')
						}
					})
				}
				catch(e){}
				//

			})

			if(environment.printFiles.test){
				setTimeout(()=>{
					this.el.nativeElement.click()
				},200)
			}

        }
        

    }  

    ngOnDestroy(){
        if(this.extras?.confirm === 'true'){
			Object.values(this)
			.forEach((x:any,i)=>{
				console.log(x instanceof Subscriber)
				x.unsubscribe?.()
			})			
        }   
    }
    	

    constructor(
		private el:ElementRef,
		private renderer:Renderer2,
		private ryber:RyberService
    ) { }    

}



//function once files are in the app

//

