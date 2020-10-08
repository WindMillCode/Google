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
			let CLIENT_ID = environment.googleDrive.clientId
			let API_KEY = environment.googleDrive.apiKey
			let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
			let SCOPES = `https://www.googleapis.com/auth/drive`;
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
						fileUpload.files[0].text() //doesnt work for IE
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
					if (environment.upload.multipart) {


						// console.log(img) 
						fileUpload.files[0].text() //doesnt work for IE
							.then((pdf) => {
								var fileName = 'multipart.json';
								var contentType , uploadContentType = 'application/json'
								var metadata = {
									'name': fileName,
									'mimeType': contentType
								};
					
					
								// preparing the multipart body
								const boundary = 'xyz'
								const delimiter = "\r\n--" + boundary + "\r\n";
								const close_delim = "\r\n--" + boundary + "--";
					
								var multipartRequestBody =
									delimiter +
									'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
									JSON.stringify(metadata) +
									delimiter +
									'Content-Type: ' + uploadContentType + '\r\n\r\n' +
									pdf +
									close_delim;
					
								gapi.client.request({
									'path': 'https://www.googleapis.com/upload/drive/v3/files',
									'method': 'POST',
									'params': { 'uploadType': 'multipart' },
									'headers': {
										'Content-Type': 'multipart/related; boundary=' + boundary
									},
									'body': multipartRequestBody
								}).execute((a) => {
									console.log(a)
								})								
								//
					
					
							})
					
					
					
					}
					//	

					// resumable upload 
					if (environment.upload.resumable) {

						
						resumable({
							http,
							fileUpload,
							resumableError: 'false'
						})


					}
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
function resumable(
	devObj: {
		http: HttpClient,
		fileUpload: HTMLInputElement 
		resumableError: String // true false as boolean
	}
) {

	// we need a lot of info about the file and we need to setup our data to support GCP resumable requires
	let { http, fileUpload, resumableError } = devObj
	let fileSize = Math.round(fileUpload.files[0].size )
	let chunk = 256 * 1024
	chunk = chunk > fileSize ? fileSize - 1 : chunk
	let fileName = fileUpload.files[0].name
	let headers = new HttpHeaders()
	headers = headers
		.set("Authorization", `Bearer ${gapi.auth.getToken().access_token}`)
	//


	// make a post request (as well get the file content) to get the resumable session URL
	combineLatest([
		from(fileUpload.files[0].text()),
		http.post(
			"https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable",
			{ name: "resumable.txt", mimeType: "text/plain" },
			{ headers, observe: 'response' }
		)
	])
	.pipe(
		catchError((error) => {
			console.error(error)
			return of([])
		})
	)
	.subscribe((result) => {

        //starting the upload
		let headers = new HttpHeaders({
			"Content-Range": `bytes 0-${chunk}/${fileSize}`,
		})
		let fileContent = result[0]
        let resumableURL = result[1].headers.get('Location')
        //		
		
		//indicate where we are in the upload
		console.log(headers.get("Content-Range"))
		//

		chunked({
			http,
			fileUpload,
			resumableError,
			url: resumableURL,
			fileContent,
			headers,
			fileSize,
			chunk,
			offset: 0
		})


	})
	//


}
//* 

// your upload session
function chunked(devObj) {

	let { http, url, fileContent, headers, offset, fileSize, chunk, resumableError, fileUpload } = devObj

	http.put(
		url,
		fileContent.substring(offset, chunk + 1), // becuase of the error
		{ headers, observe: 'response' }
	)
	// send all responses to the subscribbe callback
	.pipe(
		catchError((error) => {
			return of(error) // angular http thinks 308 is an error, GCP drive API uses to indicate incomplete
		})
	)
	// 
	.subscribe((result) => {


		// the file has finished uploading
		if (result.status === 200 || result.status === 201) {
			alert('file uploaded')
		}
		// 

		//you need to upload more chunks
			// if you dont know the positions do */fileSize
			// if you dont knwo the fileSize do offset-chunkSize/*
			//if you dont know both */*			
		if (result.status === 308) {
			let newOffset = parseInt(result.headers.get('Range').split("-")[1]) + 1
			let chunk = newOffset + (256 * 1024)
			chunk = chunk > fileSize ? fileSize - 1 : chunk
			let headers: any = new HttpHeaders({
				"Content-Range": `bytes ${newOffset}-${chunk}/${fileSize}`,
			})
			console.log(headers.get("Content-Range"))


			//cause a 4xx
			if (newOffset > 1000000 && resumableError === 'false') {
				headers = new HttpHeaders({
					"Content-Range": `bytes ${newOffset}-${chunk}/2`,
				})
				resumableError = 'true'
			}
			//


			chunked({
				http,
				fileUpload,
				resumableError,
				url,
				fileContent,
				headers,
				fileSize,
				chunk,
				offset: newOffset
			})
		}	
		//


		//we get an error where we have to restart the upload
		if(result.status === 400){


			resumable({
				http,
				fileUpload,
				resumableError
			})
			
			
		}
		//



	})


}
//