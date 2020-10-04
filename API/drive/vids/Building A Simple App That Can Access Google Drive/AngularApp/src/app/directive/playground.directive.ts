import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy } from '../customExports'
import { catchError, delay } from 'rxjs/operators'
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';


@Directive({
	selector: '[appPlayground]'
})
export class PlaygroundDirective {

	@Input() playground: any;
	extras: any;

	constructor(
		private el: ElementRef, 
		private http:HttpClient
	) { }

	@HostListener('click') onClick() {

		if (this.extras?.confirm === 'true') {

			//accesing the drive API 
			let CLIENT_ID = environment.googleDrive.clientId
			let API_KEY = environment.googleDrive.apiKey
			let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
			let SCOPES = `https://www.googleapis.com/auth/drive`;
			

			//scope access
			let http = this.http
			//


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

						// investigate the file API
						console.log(gapi.client.drive.files)

						//create a file
						if (environment.playground?.create) {
							gapi.client.drive.files.create({
								// resource: fileMetadata,
								name: 'medi.PNG',   //OPTIONAL
								media: 'media',   //OPTIONAL
								fields: 'id',   //OPTIONAL
							})
							.then(function (a, b, c) {
								console.log(a)
							})
							.catch((error) => {
								console.log(error.body)
							})
						}
						//

						//create a file with thumbnail
						if (environment.playground?.createThumbnail) {
							let image = `` // take an image head  to https://www.base64-image.de/ and paste in the template strings `` as nneded then run the app
							image = btoa(image)
							gapi.client.drive.files.create({
								// resource: fileMetadata,
								name: 'medi.PNG',
								media: 'media',
								fields: 'id',
								contentHints: {
									thumbnail: {
										image,
										mimeType: "image/jpg"
									},
								},
							})
							.then(function (a, b, c) {
								console.log(a)
							})
							.catch((error) => {
								console.log(error.body)
							})
						}
						//						

						// simple upload 
						if (environment.playground?.upload.simple) {
							gapi.client.drive.files.create({
								// resource: fileMetadata,
								name: 'simpleUpload.txt',   //OPTIONAL
								media: 'media',   //OPTIONAL
								fields: 'id',   //OPTIONAL
								uploadType:'media'
							})
							.then(function (a, b, c) {
								console.log(a)
							})
							.catch((error) => {
								console.log(error.body)
							})
						}
						//

						// multipart upload 
						if (environment.playground?.upload.multipart) {
							http.get("https://static.skillshare.com/uploads/project/413d60c0dac2da6c97f939829fd1a064/9d28e322")
							.pipe(catchError((error)=>{
								console.log(error)
								return of([])
							}))
							.subscribe((img)=>{
								console.log(img)
								gapi.client.drive.files.create({
									// resource: fileMetadata,
									name: 'multipart.PNG',   //OPTIONAL
									media: 'media',   //OPTIONAL
									uploadType:'media',
									starred:true
								})
								.then(function (a, b, c) {
									console.log(a)
								})
								.catch((error) => {
									console.log(error.body)
								})								
							})							
						}
						//	
						
						// resumable upload 
						if (environment.playground?.upload.resumable) {
							gapi.client.drive.files.create({
								// resource: fileMetadata,
								name: 'medi.PNG',   //OPTIONAL
								media: 'media',   //OPTIONAL
								fields: 'id',   //OPTIONAL
								uploadType:'media'
							})
							.then(function (a, b, c) {
								console.log(a)
							})
							.catch((error) => {
								console.log(error.body)
							})
						}
						//							


					})
					.catch(function (error) {
						console.log(error)
					})
			});
			//				

		}

	}

	ngOnInit() {
		this.extras = this.playground
		if (this.extras?.confirm === 'true') {
			setTimeout(() => {
				this.el.nativeElement.click()
			}, 200)
		}
	}

}
