import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy } from '../customExports'
import { catchError, delay,first } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Directive({
    selector: '[appDeleteModel]'
  })
  export class DeleteModelDirective {


    @Input() deleteModel: any;
    extras: any;
    zChildren: any;
    subscriptions:Array<Subscription> = []
    group:any;
    ref:ChangeDetectorRef

    constructor(
        private el: ElementRef,
        private http: HttpClient,
        private renderer2: Renderer2,
        private ryber: RyberService
    ) { }


    @HostListener('click') onClick() {


        if (this.extras?.confirm === 'true') {

            let {http,subscriptions,group,zChildren,ref} = this
            //communicate with the python backend

            let data:any = {
                env:"delete_model",
                models:group.models.map((x:any,i)=>{
                    return zChildren[x].element.value
                })
            }
            zChildren[group.result[0]].element.innerText = "Submitting..."

            let postRequest =http.post(
                "http://localhost:3005",
                data,
                {
                    responseType: 'text',
                }
            )
            .subscribe({


                error: (error) => {

                    zChildren[group.result[0]].element.innerText =error
                    ref.detectChanges()
                    postRequest.unsubscribe()
                    eventDispatcher({
                        event: 'resize',
                        element: window
                    })
                },
                next: (result: any) => {

                    if(result.includes("an error occured")){
                        zChildren[group.result[0]].element.innerText =result
                    }
                    else{
                        zChildren[group.result[0]].element.innerText ="Result: "+result
                    }

                    postRequest.unsubscribe()
                    eventDispatcher({
                        event: 'resize',
                        element: window
                    })
                }

            })
            subscriptions.push(postRequest)
            //

        }

    }


    ngOnInit() {
        this.extras = this.deleteModel

        if (this.extras?.confirm === 'true') {
            if(env.directive?.deleteModel?.lifecycleHooks) console.log(this.extras.co + " " + this.extras.zSymbol+ ' deleteModel ngOnInit fires on mount')
            let {ryber,extras,zChildren,subscriptions} = this
            let {co} = extras

            let mainSubscription =ryber[co].metadata.zChildrenSubject
            .subscribe((result) => {


                zChildren = ryber[co].metadata.zChildren
                let group:any = {}
                let ref = result.ref
                Object.entries(zChildren)
                .forEach((x:any,i)=>{
                    if(x[1].extras?.appDeleteModel?.type !== undefined){
                        if(group[x[1].extras?.appDeleteModel?.type] === undefined){
                            group[x[1].extras?.appDeleteModel?.type] = []
                        }
                        group[x[1].extras?.appDeleteModel?.type].push(x[0])
                    }
                })

                this.zChildren = zChildren
                this.group = group
                this.ref = ref
                console.log(group)

            })
            subscriptions.push(mainSubscription)

        }
    }


	ngOnDestroy() {
		if (this.extras?.confirm === 'true') {
            if(env.directive?.deleteModel?.lifecycleHooks) console.log(this.extras.co + " " + this.extras.zSymbol+ ' deleteModel ngOnDestroy fires on dismount')
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

