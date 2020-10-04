import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy } from '../customExports'
import { delay } from 'rxjs/operators'
import { environment } from '../../environments/environment'


@Directive({
	selector: '[appPlayground]'
})
export class PlaygroundDirective {

	@Input() playground: any;
	extras: any;

	constructor(
		private el: ElementRef
	) { }

	@HostListener('click') onClick() {

		if (this.extras?.confirm === 'true') {

			//accesing the drive API 
			let CLIENT_ID = environment.googleDrive.clientId
			let API_KEY = environment.googleDrive.apiKey
			let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
			let SCOPES = `https://www.googleapis.com/auth/drive`;


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
						if (environment.playground.create) {
							let file = gapi.client.drive.files.create({
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
						if (environment.playground.createThumbnail) {
							let image = `` // take an image head  to https://www.base64-image.de/ and paste in the template strings `` as nneded then run the app
							image = btoa(image)
							let file = gapi.client.drive.files.create({
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
