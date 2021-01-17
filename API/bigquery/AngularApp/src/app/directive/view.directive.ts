import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy } from '../customExports'
import { catchError, delay } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Directive({
    selector: '[appView]'
  })
  export class ViewDirective {


    @Input() view: any;
    extras: any;
    zChildren: any;
    agGrid:any = {
        zSymbol:""
    }

    constructor(
        private el: ElementRef,
        private http: HttpClient,
        private renderer: Renderer2,
        private ryber: RyberService
    ) { }


    @HostListener('click') onClick() {


        if (this.extras?.confirm === 'true') {

            let update = (document.querySelector(".f_o_r_m_Result") as HTMLElement)
            let validDomains = ["user", "group", "serviceAccount"]
            let titleName = (document.querySelector(".f_o_r_m_Title") as HTMLInputElement)?.value
            let query = (document.querySelector(".f_o_r_m_Answer") as HTMLInputElement)?.value
            let sourceURL = (document.querySelector(".f_o_r_m_SourceURL") as HTMLInputElement)?.value

            let data: any = {
                titleName,
                query,
                sourceURL
            }

            console.log(data)
            update.innerText = "Submitting ..."

            //communicate with the python backend
            this.http.post(
                "http://localhost:3005",
                data,
                {
                    responseType: 'text',
                }
            )
            .subscribe({


                error: (error) => {

                    update.innerText = "Is the backend running?"
                    eventDispatcher({
                        event: 'resize',
                        element: window
                    })
                },
                next: (result: any) => {
                    console.log(result)
                    switch (true) {
                        case env?.view?.createTempTable:
                            result = JSON.parse(result)
                            this.zChildren[this.agGrid.zSymbol].extras.appAgGrid.rowData = result.data
                            this.zChildren[this.agGrid.zSymbol].extras.appAgGrid.columnDefs  = result.schema
                            update.innerText = "The query data was returned"
                            break;

                        default:
                            update.innerText = result
                            break;
                    }


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
        this.extras = this.view
        if (this.extras?.confirm === 'true') {
            // console.log(this.extras)
            combineLatest([
                this.ryber[this.extras.co.valueOf()].metadata.agGrid.zSymbol,
                this.ryber[this.extras.co.valueOf()].metadata.zChildrenSubject
            ])
            .subscribe((result) => {
                // console.log(result)
                this.agGrid.zSymbol = result[0]
                this.zChildren = this.ryber[this.extras.co.valueOf()].metadata.zChildren
                // console.log(this.zChildren)
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
                    if (x instanceof Subscriber) {
                        x.unsubscribe?.()
                    }

                })
        }
    }
}

