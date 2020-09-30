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
	appendTarget:any
	signOutTarget:any

	@HostListener('click') onClick(){

		
        if(this.extras?.confirm === 'true'){
		//accesing the drive API 
		let CLIENT_ID =environment .googleDrive.clientId
		let  API_KEY = environment.googleDrive.apiKey
		var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
		var SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';

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
					.then(function(response) {
						var files = response.result.files;
						console.log(files)
						deltaNode({
							intent:'add',
							elements: appendTarget,
							co:this.ryber[this.extras.co.valueOf()],
							subCO:1, //decide to use the number of the signature
							group:this.group,
							symbolDeltaStart:8410,
						}) 						
					});		
				})	
				
				// if the sign in handler doesnt work
				gapi.client.drive.files.list({
					'pageSize': 10,
					'fields': "nextPageToken, files(id, name)"
				})
				.then(function(response) {
					var files = response.result.files;
					console.log(files)
				});					
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
        // console.log(this.dateClick)
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
							x[1].extras?.appPrintFiles?.type === "append"
						){
							this.appendTarget = x[1]
							console.log(this.appendTarget)
							
						}
						else if(
							x[1].extras?.appPrintFiles?.printGroup === this.extras.printGroup &&
							x[1].extras?.appPrintFiles?.type === "signOut"
						){
							this.signOutTarget = x[1]
							console.log(this.signOutTarget)
							//sign out functionality
							this.pF_BSub = fromEvent(x[1].element,'click')
							.subscribe(()=>{
								try{
									gapi.auth2.getAuthInstance().signOut();
								}
								catch(e){}
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
