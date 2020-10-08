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
	
			//

			//scope access
			let http = this.http
			let ryber = this.ryber
			let fileUpload = this.fileUpload as HTMLInputElement
			//


			//load the auth SDK
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


//

// your upload session

//