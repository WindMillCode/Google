import { ErrorHandler,Renderer2,RendererFactory2,Injectable } from '@angular/core'



@Injectable({
    providedIn: "root"
})
export class MyErrorHandler implements ErrorHandler {

	private renderer2:Renderer2
	constructor(
		// private renderer2: Renderer2,
		private renderer2Factory: RendererFactory2
	){
		this.renderer2 = renderer2Factory.createRenderer(null, null);
	}

	handleError(error) {
		// do something with the exception
		this.renderer2.setProperty(
			document.querySelector(".f_o_r_m_my-indicator-message"),
			"innerText",
			error
		)
		this.renderer2.setProperty(
			document.querySelector(".f_o_r_m_my-indicator"),
			"innerText",
			"An error occured"
		)
		console.error(error)


	}
}
