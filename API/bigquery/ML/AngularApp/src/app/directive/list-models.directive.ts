import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy } from '../customExports'
import { catchError, delay } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Directive({
    selector: '[appListModels]'
})
  export class ListModelsDirective {

    @Input() listModels: any;
    extras: any;
    zChildren: any;
    subscriptions:Array<Subscription> = []
    agGrid:any = {
        zSymbol:null
    }

    constructor(
        private el: ElementRef,
        private http: HttpClient,
        private renderer2: Renderer2,
        private ryber: RyberService
    ) { }


    @HostListener('click') onClick() {


        if (this.extras?.confirm === 'true') {
            let {ryber,extras,zChildren,subscriptions,http,agGrid} = this
            let {co} = extras

            //communicate with the python backend
            let postRequest =http.post(
                "http://localhost:3005",
                {
                    env:"list_models"
                },
                {
                    responseType: 'text',
                }
            )
            .subscribe({


                error: (error) => {

                    postRequest.unsubscribe()
                    eventDispatcher({
                        event: 'resize',
                        element: window
                    })
                },
                next: (result: any) => {


                    result = JSON.parse(result)
                    zChildren[agGrid.zSymbol].extras.appAgGrid.columnDefs = result.schema
                    zChildren[agGrid.zSymbol].extras.appAgGrid.rowData = result.data
                    
                    postRequest.unsubscribe()
                    this.agGrid.zSymbol
                    eventDispatcher({
                        event: 'resize',
                        element: window
                    })
                }

            })
            //

        }

    }


    ngOnInit() {
        this.extras = this.listModels

        if (this.extras?.confirm === 'true') {
            if(env.directive?.listModels?.lifecycleHooks) console.log(this.extras.co + " " + this.extras.zSymbol+ ' listModels ngOnInit fires on mount')
            let {ryber,extras,zChildren,subscriptions} = this
            let {co} = extras

            let mainSubscription =combineLatest([ryber[co].metadata.zChildrenSubject,ryber[extras.co].metadata.agGrid.zSymbol])
            .subscribe((result) => {

                this.zChildren = zChildren = ryber[co].metadata.zChildren
                this.agGrid.zSymbol = result[1]

            })
            subscriptions.push(mainSubscription)

        }
    }


	ngOnDestroy() {
		if (this.extras?.confirm === 'true') {
            if(env.directive?.listModels?.lifecycleHooks) console.log(this.extras.co + " " + this.extras.zSymbol+ ' listModels ngOnDestroy fires on dismount')
			this.subscriptions
			.forEach((x: any, i) => {
				try{
					x.unsubscribe()
				}
				catch(e){}

			})
			delete this.subscriptions
		}
	}

}

