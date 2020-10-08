import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy } from '../customExports'
import { catchError, delay } from 'rxjs/operators'
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Directive({
	selector: '[appUpload]'
})
export class UploadDirective {

	@Input() upload: any;
	extras: any;
	fileUpload: HTMLInputElement | HTMLElement

	constructor(
		private el: ElementRef,
		private http: HttpClient,
		private renderer: Renderer2,
		private ryber: RyberService
	) { }

	@HostListener('click') onClick() {

		if (this.extras?.confirm === 'true') {

			//accesing the drive API 

			//paste credentials here
			let CLIENT_ID = environment .googleDrive.clientId
			let API_KEY = environment.googleDrive.apiKey
			var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
			var SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';			
			//

			//scope access
			let http = this.http
			let ryber = this.ryber
			let fileUpload = this.fileUpload as HTMLInputElement
			//


			//load the auth SDK
			gapi.load('client:auth2', () => {
				gapi.client.init({
					apiKey: API_KEY,
					clientId: CLIENT_ID,
					discoveryDocs: DISCOVERY_DOCS,
					scope: SCOPES
				})
				.then(function () {
			
					// sign in if needed
					if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
						gapi.auth2.getAuthInstance().signIn();
					}
					//
				
			
					// simple upload 
					if (environment.upload.simple) {
						fileUpload.files[0].text() 
						.then((text) => {
					
							gapi.client.request({
								'path': 'https://www.googleapis.com/upload/drive/v3/files',
								'method': 'POST',
								'params': { 'uploadType': 'media' },
								'headers': {
									'Content-Type': 'application/json',
									'Content-Length': fileUpload.files[0].size
								},
								'body': text
							}).execute((a) => {
								console.log(a)
							})
						})
					}					
					//
			
			
					// multipart upload 
					//	
			
					// resumable upload 
					//		
					
	
			
				})
				.catch(function (error) {
					console.log(error)
				})
			});			
			//

			//				

		}

	}
	
	
	ngOnInit() {
		this.extras = this.upload
		if (this.extras?.confirm === 'true') {
			console.log(environment.upload)
			this.ryber["formCO0"].metadata.zChildrenSubject
				.subscribe((item) => {
					Object.values(item.directivesZChild)
						.forEach((x: any, i) => {
							if (x.val.includes("a_p_p_FileButton")) {
								this.fileUpload = document.getElementById(
									"a_p_p_" + x.extras.appInputHandle.name.split("-").join("").split(" ").join("-")
								)
							}
						})
				})
			setTimeout(() => {
				// this.el.nativeElement.click()
			}, 200)
		}
	}


	ngOnDestroy() {
		if (this.extras?.confirm === 'true') {
			Object.values(this)
				.forEach((x: any, i) => {
					console.log(x instanceof Subscriber)
					x.unsubscribe?.()
				})
		}
	}

}


// tell Google Drive API were going to have a resumable upload session

//* 

// your upload session

//