import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy } from '../customExports'
import { catchError, delay } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Directive({
    selector: '[appAgGrid]'
})
export class AgGridDirective {

    @Input() agGrid: any;
    extras: any;
    zChildren: any;

    constructor(
        private el: ElementRef,
        private http: HttpClient,
        private renderer: Renderer2,
        private ryber: RyberService
    ) { }


    @HostListener('click') onClick() {


        if (this.extras?.confirm === 'true') {


        }

    }

    ngOnInit() {
        this.extras = this.agGrid
        if (this.extras?.confirm === 'true') {
            this.ryber[this.extras.co.valueOf()].metadata.zChildrenSubject
                .subscribe(() => {
                    this.zChildren = this.ryber[this.extras.co.valueOf()].metadata.zChildren
                    this.ryber[this.extras.co.valueOf()].metadata.agGrid.zSymbol.next(this.extras.zSymbol)
                })

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

