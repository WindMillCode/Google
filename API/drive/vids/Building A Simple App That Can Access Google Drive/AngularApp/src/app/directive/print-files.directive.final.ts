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
			let CLIENT_ID =environment .googleDrive.clientId
			let  API_KEY = environment.googleDrive.apiKey
			var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
			var SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';
			//			

			//reactiong functions
			let {appendTarget,ryber,extras} = this
			//

			gapi.load('client:auth2', ()=>{
				gapi.client.init({
					apiKey: API_KEY,
					clientId: CLIENT_ID,
					discoveryDocs: DISCOVERY_DOCS,
					scope: SCOPES
				})
				.then(function () {

					// sign in if needed
					if(!gapi.auth2.getAuthInstance().isSignedIn.get()){
						gapi.auth2.getAuthInstance().signIn();
					}
					//

					//get the drive data
					gapi.auth2.getAuthInstance().isSignedIn.listen(()=>{
						gapi.client.drive.files.list({
							'pageSize': 10,
							'fields': "nextPageToken, files(id, name)"
						})
						.then(manifest({aT:appendTarget}));		
					})	
					
					// if the sign in handler doesnt work
					gapi.client.drive.files.list({
						'pageSize': 10,
						'fields': "nextPageToken, files(id, name)"
					})
					.then(manifest({aT:appendTarget}));					
					//
				})
				.catch(function(error) {
					console.log(error)
				})		
			});	
			//		
		}
	}
	
    ngOnInit(){
		this.extras = this.printFiles
		console.log(this.extras)


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
							this.pF_BSub = fromEvent(x[1].element,'click')
							.subscribe(()=>{
								try{
									gapi.auth2.getAuthInstance().signOut();
									this.appendTarget
									.forEach((x:any,i)=>{
										x.innerText.item = "None"	
									})
									eventDispatcher({
										element:window,
										event:"resize"
									})									
								}
								catch(e){
									console.log(e)
								}
								console.log('signed out')
							})
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
function manifest(devObj) {

	return(response)=>{
		var files = response.result.files;
		console.log(files)
		console.log(devObj)

		devObj.aT
		.forEach((x:any,i)=>{
			console.log(files[i]?.name)
			x.innerText.item  = files[i]?.name === undefined ?  'None' :  files[i]?.name
		})
		eventDispatcher({
			element:window,
			event:"resize"
		})
	}
	
}
//

