import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy } from '../customExports'
import { catchError, delay } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Directive({
    selector: '[appRegularTables]'
})
export class RegularTablesDirective {

    @Input() regularTables: any;
    extras: any;

    constructor(
        private el: ElementRef,
        private http: HttpClient,
        private renderer: Renderer2,
        private ryber: RyberService
    ) { }


    @HostListener('click') onClick() {


        if (this.extras?.confirm === 'true') {

            let update = (document.querySelector(".f_o_r_m_Result") as HTMLElement)
            let validDomains = ["user","group","serviceAccount"]
            let tableName = (document.querySelector(".f_o_r_m_Table-Answer") as HTMLInputElement).value
            let emailTypes = Array.from(
                document.querySelectorAll('a[class^="a_p_p_DropDownMiddle f_o_r_m_types-email"]')
            )
            .filter((x:any,i)=>{
                return i % 3 == 0
            })
            let emails:Array<HTMLInputElement> = Array.from(
                document.querySelectorAll('[class^="a_p_p_Input f_o_r_m_email"]')
            )
            let data:any = {
                emails:emailTypes.map((x:any,i)=>{
                    return[x.innerText ,  emails[i].value]
                }),
                tableName
            }
            try {
                data.emails.forEach((x:any,i)=>{
                    if(!validDomains.includes(x[0])){
                        update.innerText= "Make sure you select an email type and provide an email for each field else use the remove button to provide the amount needed"
                        eventDispatcher({
                            event: 'resize',
                            element: window
                        })
                        throw('')
                    }
                })
            }
            catch (error) {
                return 
            }

            console.log(data)



            //communicate with the python backend
            this.http.post(
                "http://localhost:3005",
                {
                    name: "see me"
                },
                {
                    responseType: 'text',
                    headers:{
                        "Content-Type":"application/octet-stream"
                    }
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
                    update.innerText = result
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
        this.extras = this.regularTables
        if (this.extras?.confirm === 'true') {
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

