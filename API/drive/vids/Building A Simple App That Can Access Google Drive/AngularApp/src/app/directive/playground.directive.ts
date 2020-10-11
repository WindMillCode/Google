import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy } from '../customExports'
import { catchError, delay } from 'rxjs/operators'
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Directive({
	selector: '[appPlayground]'
})
export class PlaygroundDirective {

	@Input() playground: any;
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
			let CLIENT_ID = environment.googleDrive.clientId
			let API_KEY = environment.googleDrive.apiKey
			let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
			let SCOPES = `https://www.googleapis.com/auth/drive`;


			//scope access
			let http = this.http
			let ryber = this.ryber
			let fileUpload = this.fileUpload as HTMLInputElement
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
						if (environment.playground?.upload.multipart) {


							// console.log(img)
							fileUpload.files[0].text() //doesnt work for IE
								.then((pdf) => {
									var fileName = 'multipart.json';
									var contentType = 'application/json'
									var metadata = {
										'name': fileName,
										'mimeType': contentType
									};

									const boundary = 'xyz'
									const delimiter = "\r\n--" + boundary + "\r\n";
									const close_delim = "\r\n--" + boundary + "--";

									var multipartRequestBody =
										delimiter +
										'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
										JSON.stringify(metadata) +
										delimiter +
										'Content-Type: ' + contentType + '\r\n\r\n' +
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
								})



						}
						//

						// resumable upload
						if (environment.playground?.upload.resumable) {


							resumable({
								http,
								fileUpload,
								resumableError: 'false'
							})


						}
						//


						// convert to GSuite
						if (environment.playground?.upload.gSuite) {


							// see if the conversion is supported
							gapi.client.drive.about.get({ fields: "importFormats" })
								.then((result) => {
									console.log(result)
								})
							//

							from(fileUpload.files[0].text()) //doesnt work for IE
								.subscribe((gdoc) => {
									var fileName = 'docs_with_image';
									var contentType = 'image/png'
									var uploadMetadata = {
										'name': fileName,
										'mimeType': "application/vnd.google-apps.document"
									};


									// preparing the multipart body
									const boundary = 'xyz'
									const delimiter = "\r\n--" + boundary + "\r\n";
									const close_delim = "\r\n--" + boundary + "--";

									var multipartRequestBody =
										delimiter +
										'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
										JSON.stringify(uploadMetadata) +
										delimiter +
										'Content-Type: ' + contentType + '\r\n\r\n' +
										gdoc +
										close_delim;

									gapi.client.request({
										'path': 'https://www.googleapis.com/upload/drive/v3/files',
										'method': 'POST',
										'params': { 'uploadType': 'multipart' },
										'headers': {
											'Content-Type': 'multipart/related; boundary=' + boundary
										},
										'body': multipartRequestBody
									}).execute((result) => {
										console.log(result)
									})
									//


								})


						}
						//

						//create a file than can be indexex for search
						if (environment.playground?.upload.indexable) {




						}
						//

						//create a folder
						if (environment.playground?.folders.create) {


							let headers = new HttpHeaders()
							headers = headers
								.set("Authorization", `Bearer ${gapi.auth.getToken().access_token}`)

							http.post(
								"https://www.googleapis.com/drive/v3/files",
								{ name: "My Folder", mimeType: "application/vnd.google-apps.folder" },
								{ headers, observe: 'response' }
							)
								.subscribe((result) => {
									console.log(result)
								})


						}
						//

						//move files around
						if (environment.playground?.folders.moveFiles) {


							let folders = {
								a: { id: '' },
								b: { id: '' },
								target: { id: '' }
							}
							let headers = new HttpHeaders()
							headers = headers
								.set("Authorization", `Bearer ${gapi.auth.getToken().access_token}`)

							//get all the files in the drive including in trash
							http.get(
								"https://www.googleapis.com/drive/v3/files",
								{ headers, observe: 'response' }
							)
							.subscribe((result: any) => {
								result.body.files
								.forEach((x: any, i) => {
									if (x.name === 'multipart.json') {
										folders.target.id = x.id
									}

									else if (x.name === 'Folder1') {
										folders.a.id = x.id
									}

									else if (x.name === 'Folder2') {
										folders.b.id = x.id
									}
								})

								console.log(folders)

								// move the file from a to b
								http.patch(
									`https://www.googleapis.com/drive/v3/files/${folders.target.id}`,
									{ fields: 'id, parents', addParents: folders.b.id },
									{
										headers,
										observe: 'response' ,
										params:{
											fields: 'id, parents',
											addParents: folders.b.id,
											removeParents:folders.a.id
										}
									}
								)
								.subscribe((result) => {
									console.log(result)
								})
								//
							})


							//


						}
						//

						// download a file from Google drive
						if(environment.playground?.download.drive){


							let headers = new HttpHeaders()
							headers = headers
								.set("Authorization", `Bearer ${gapi.auth.getToken().access_token}`)

							//get all the files in the drive including in trash
							http.get(
								"https://www.googleapis.com/drive/v3/files",
								{ headers, observe: 'response' }
							)
							.subscribe((result: any) => {

								let fileId = result.body.files[0].id
								http.get(
									"https://www.googleapis.com/drive/v3/files/" + fileId,
									{
										headers,
										observe:'response',
										responseType:'text',
										params:{
											// fileId,
											alt:'media'
										}
									}
								)
								.subscribe((result:any)=>{
									console.log(result.body) // yr file content
								})

							})

						}
						//

						// download a gSuite doc
						if(environment.playground?.download.gSuite){


							let headers = new HttpHeaders()
							headers = headers
								.set("Authorization", `Bearer ${gapi.auth.getToken().access_token}`)

							//get all the files in the drive including in trash
							http.get(
								"https://www.googleapis.com/drive/v3/files",
								{ headers, observe: 'response' }
							)
							.subscribe((result: any) => {

								let fileId = result.body.files[0].id
								http.get(
									"https://www.googleapis.com/drive/v3/files/" + fileId,
									{
										headers,
										observe:'response',
										responseType:'text',
										params:{
											// fileId,
											alt:'media'
										}
									}
								)
								.subscribe((result:any)=>{
									console.log(result.body) // yr file content
								})

							})

						}
						//



                        //restrict Download
                        if(environment.playground?.download.restrictDownload){

							let headers = new HttpHeaders()
							headers = headers
                                .set("Authorization", `Bearer ${gapi.auth.getToken().access_token}`)


								var fileName = 'cantDownloand.haha';
								var contentType , uploadContentType = 'application/json'
								var metadata = {
									'name': fileName,
                                    'mimeType': contentType,
                                    'viewersCanCopyContent':false
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
                                "cant download me haha" +
                                close_delim;

                            gapi.client.request({
                                'path': 'https://www.googleapis.com/upload/drive/v3/files',
                                'method': 'POST',
                                'params': { 'uploadType': 'multipart' },
                                'headers': {
                                    'Content-Type': 'multipart/related; boundary=' + boundary
                                },
                                'body': multipartRequestBody
                            }).execute((createdResult) => {
                                console.log(createdResult)



                            //get all the files in the drive including in trash
							http.get(
								"https://www.googleapis.com/drive/v3/files",
								{ headers, observe: 'response' }
							)
							.subscribe((result: any) => {


                                // download the file
                                let fileId
                                result.body.files
                                .forEach((x:any,i)=>{
                                    if(x.name === 'cantDownloand.haha' && x.id === createdResult.id ){
                                        fileId = x.id
                                    }
                                    else if(x.name === 'cantDownloand.haha'){
                                        http.delete(
                                            "https://www.googleapis.com/drive/v3/files/"+x.id,
                                            {
                                                headers,
                                                observe:'response'
                                            }
                                        )
                                        .subscribe((result:any)=>{
                                            console.log(result.status)
                                        })
                                    }
                                })
								http.get(
									"https://www.googleapis.com/drive/v3/files/" + fileId,
									{
										headers,
										observe:'response',
										responseType:'text',
										params:{
											// fileId,
											alt:'media'
										}
									}
								)
								.subscribe((result:any)=>{
									console.log(result.body) // yr file content
                                })
                                // //

                            })

                            //
                            })
                            //
                            return
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

function resumable(
	devObj: {
		http: HttpClient,
		fileUpload: HTMLInputElement
		resumableError: String // true false as boolean
	}
) {


	let { http, fileUpload, resumableError } = devObj
	let fileSize = Math.round(fileUpload.files[0].size / 10)
	let newCap = 256 * 1024
	let fileName = fileUpload.files[0].name
	let headers = new HttpHeaders()
	headers = headers
		.set("Authorization", `Bearer ${gapi.auth.getToken().access_token}`)



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
			let headers = new HttpHeaders({
				"Content-Range": `bytes 0-${newCap}/${fileSize}`,
			})
			let fileContent = result[0]
			let resumableURL = result[1].headers.get('Location')
			console.log(fileSize)
			console.log(headers.get("Content-Range"))
			chunked({
				http,
				fileUpload,
				resumableError,
				url: resumableURL,
				fileContent,
				headers,
				fileSize,
				newCap,
				offset: 0
			})


		})


}


function chunked(devObj) {

	let { http, url, fileContent, headers, offset, fileSize, newCap, resumableError, fileUpload } = devObj

	http.put(
		url,
		fileContent.substring(offset, newCap + 1), // becuase of the error
		{ headers, observe: 'response' }
	)
		.pipe(
			catchError((error) => {
				return of(error) // angular http thinks 308 is an error, GCP drive API uses to indicate incomplete
			})
		)
		.subscribe((result) => {

			//you need to upload more chunks
			// if you dont know the positions do */fileSize
			// if you dont knwo the fileSize do offset-chunkSize/*
			//if you dont know both */*


			if (result.status === 200 || result.status === 200) {
				alert('file uploaded')
			}

			else if (result.status === 308) {
				let newOffset = parseInt(result.headers.get('Range').split("-")[1]) + 1
				let newCap = newOffset + (256 * 1024)
				newCap = newCap > fileSize ? fileSize - 1 : newCap
				let headers: any = new HttpHeaders({
					"Content-Range": `bytes ${newOffset}-${newCap}/${fileSize}`,
				})
				console.log(headers.get("Content-Range"))


				//cause a 4xx
				if (newOffset > 1000000 && resumableError === 'false') {
					headers = new HttpHeaders({
						"Content-Range": `bytes ${newOffset}-${newCap}/2`,
					})
					resumableError = 'true'
				}
				console.log(resumableError)
				//


				chunked({
					http,
					fileUpload,
					resumableError,
					url,
					fileContent,
					headers,
					fileSize,
					newCap,
					offset: newOffset
				})
			}


			//we get an error where we have to restart the upload
			else if (result.status === 400) {


				resumable({
					http,
					fileUpload,
					resumableError
				})


			}
			//



		})


}
