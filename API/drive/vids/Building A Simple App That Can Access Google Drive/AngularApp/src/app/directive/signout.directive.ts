import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy } from '../customExports'
import { delay } from 'rxjs/operators'
import { environment } from '../../environments/environment'


@Directive({
	selector: '[appSignout]'
})
export class SignoutDirective {

	@Input() signOut: any;
	extras: any;

	constructor(
		private el:ElementRef
	) { }

	@HostListener ('click') onClick(){

		if (this.extras?.confirm === 'true') {


			//accesing the drive API
			let CLIENT_ID = environment.googleDrive.clientId
			let API_KEY = environment.googleDrive.apiKey
			let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
			let SCOPES = `https://www.googleapis.com/auth/drive`;


			gapi.load('auth2', ()=>{
                



                // sign out
                if(gapi.auth2.getAuthInstance().isSignedIn.get()){
                    gapi.auth2.getAuthInstance().signOut();
                }
                //

                alert("sucessfully signed out")



			});
			//

		}

	}

	ngOnInit() {
		this.extras = this.signOut
		if (this.extras?.confirm === 'true') {
			setTimeout(()=>{
				// this.el.nativeElement.click()
			},200)
		}
	}

}
