import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren } from '@angular/core';
import { RyberService } from '../ryber.service'
import { ReplaySubject,fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy } from '../customExports'
import { catchError, delay,first } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Directive({
  selector: '[inputHandle]'
})
export class InputHandleDirective {
    @Input() inputHandle: any;
    zChild:any
    co:any
    extras:any
    optionsGroup:any = {}
    iHOptionsSub:Subscription
    iHFileSub:Subscription
    iHAuxInputSub:Subscription
    iHOptionsLinkSub:Subscription
    iHOptionsLinkActionSub:Subscription
    iHLinkActionSub:Subscription
    iHLinkInitSub:Subscription

    @HostListener('blur',['$event']) onBlur(event){
        if(this.extras?.confirm === 'true'){
            let {zChild,co} = this
            let formData = co.metadata.formData
            if(this.zChild[1].bool === 'i' ||  this.zChild[1].bool === 'ta' ){
                formData[this.extras.name.valueOf()] = {
                    value:zChild[1].element.value,
                    googleSheets:this.extras.googleSheets,
                    type: zChild[1].extras?.type
                }
                if(zChild[1].extras?.delta !== undefined){
                    formData[this.extras.name.valueOf()].delta = objectCopy(zChild[1].extras?.delta)
                }

            }


            // if the input was required and the user is going to fill out as needed
            this.renderer2
            .removeClass(
                event.target,
                'f_o_r_m_InputInvalid'
            )
            //

            eventDispatcher({
                element:event.target,
                event:"jumidaInput"
            })
        }

    }

    @HostListener('click',['$event']) onClick(event){
        if(this?.extras?.confirm === 'true'){
            let {zChild,co} = this
            let {type} = zChild[1].extras
            let formData = co.metadata.formData


            if( type === "dropdown"){

                formData[this.extras.name.valueOf()].value = zChild[1].extras.appDropDown.truSelectVal === this.el.nativeElement.innerText ?  "" : zChild[1].innerText.item
                if(zChild[1].extras?.delta !== undefined){
                    formData[this.extras.name.valueOf()].delta = objectCopy(zChild[1].extras?.delta)
                }


                this.renderer2.setProperty(
                    document.getElementById(formData[this.extras.name.valueOf()].inputId),
                    "value",
                    formData[this.extras.name.valueOf()].value
                )

                eventDispatcher({
                    element:document.getElementById(this.ryber.appCO0.metadata.inputHandle[type.valueOf()][this.extras.name.valueOf()].aux[0].auxID),
                    event:"jumidaInput"
                })
            }


            else if( type === 'options' ){


                if(zChild[1].extras.toggleButton.selected === 'true'){
                    formData[this.extras.name.valueOf()].value.add(this.extras.value)
                }

                else if(zChild[1].extras.toggleButton.selected === 'false'){
                    formData[this.extras.name.valueOf()].value.delete(this.extras.value)
                }

                else if(typeof zChild[1].extras.toggleButton.selected === 'function'){
                    let maintainer = zChild[1].extras.toggleButton.selected ()
                    formData[this.extras.name.valueOf()].value =
                    maintainer
                    .selectedElement
                    .map((x:any,i)=>{
                        return x.innerText
                    })
                }

                this.renderer2.setProperty(
                    document.getElementById(formData[this.extras.name.valueOf()].inputId),
                    "value",
                    Array.from(formData[this.extras.name.valueOf()].value).length !== 0 ?
                    Array.from(formData[this.extras.name.valueOf()].value).reduce((acc,x,i) => acc + " ," + x) :
                    ""
                )
                eventDispatcher({
                    event:'input',
                    element:document.getElementById(this.ryber.appCO0.metadata.inputHandle.options[this.extras.name.valueOf()].aux[0].auxID)
                })
                this.ryber.appCO0.metadata.inputHandle[type.valueOf()][this.extras.name.valueOf()].targets
                .forEach((x:any,i)=>{
                    this.renderer2
                    .removeClass(
                        document.getElementsByClassName(x.zChildVal)[0],
                        'f_o_r_m_InputInvalid'
                    )
                })

                eventDispatcher({
                    element:document.getElementById(this.ryber.appCO0.metadata.inputHandle[type.valueOf()][this.extras.name.valueOf()].aux[0].auxID),
                    event:"jumidaInput"
                })


            }


            else if(this.zChild[1].bool === 'c' ){
                formData[this.extras.name.valueOf()] = {
                    value: zChild[1].extras.appSignPad.sPad.toData(),
                    googleSheets:this.extras.googleSheets,
                    type: zChild[1].extras?.type
                }
                if(zChild[1].extras?.delta !== undefined){
                    formData[this.extras.name.valueOf()].delta = objectCopy(zChild[1].extras?.delta)
                }
            }


            else if(type === "file button"){

                let sub = fromEvent(
                    document.getElementById(this.ryber.appCO0.metadata.inputHandle[type.valueOf()][this.extras.name.valueOf()].aux[0].auxID),
                    "change"
                )
                .subscribe(()=>{
                    formData[this.extras.name.valueOf()].value = this.el.nativeElement.innerText
                    sub.unsubscribe()
                })

            }


            // if the input was required and the user is going to fill out as needed
            this.renderer2
            .removeClass(
                event.target,
                'f_o_r_m_InputInvalid'
            )
            //
        }
    }

    @HostListener('touchend') ontouchEnd(){

        if(this.extras?.confirm === 'true'){
            let {zChild,co} = this
            let formData = co.metadata.formData
            if(this.zChild[1].bool === 'c' ){
                formData[this.extras.name.valueOf()] = {
                    value:zChild[1].extras.appSignPad.sPad.toData(),
                    googleSheets:this.extras.googleSheets,
                    // duplicate: zChild[1].extras?.delta?.duplicate === "true" ? "true" : "false",

                    type: zChild[1].extras?.type
                }
                if(zChild[1].extras?.delta !== undefined){
                    formData[this.extras.name.valueOf()].delta = objectCopy(zChild[1].extras?.delta)
                }
            }
            //  console.log(formData)
        }
    }

    constructor(
        private el:ElementRef,
        private renderer2: Renderer2,
        private ryber:RyberService,
    ) { }


    ngOnInit(){


        if(env.inputHandle.lifecycleHooks) console.log('inputHandle fires on ngOnInit')
        this.extras = this.inputHandle
        if(this.extras?.confirm === 'true'){
            this.co = this.ryber[this.extras.co.valueOf()]
            this.extras.confirm = 'prepare'
            this.ryber[this.extras.co.valueOf()].metadata.zChildrenSubject
            .pipe(first())
            .subscribe(()=>{
                this.zChild = [
                    this.extras.zSymbol,
                    this.ryber[this.extras.co.valueOf()].metadata.zChildren[this.extras.zSymbol]
                ]
                this.extras.confirm = 'true'
                let {zChild,co} = this
                let formData = co.metadata.formData


                if(
                    this.ryber.appCO0.metadata.inputHandle.mappings
                    .map((x,i)=>{
                        return x.type
                    })
                    .includes(zChild[1].extras?.type)){


                    //setup of the logic representing the dropdown
                    this.auxInput({
                        formData,
                        name:this.extras.name,
                        required:this.extras.required,
                        type:this.extras.type
                    })
                    //

                }

                // input depenedency manager
                if( this.extras.link){

                    this.extras.link
                    ?.forEach((x:any,i)=>{


                        this.iHLinkInitSub = fromEvent(window,"resize")
                        // represents the window load event we need this to happen once trust me
                        .pipe(first())
                        //
                        .subscribe(()=>{

                            //aux -> aux
                            if(
                                this.ryber.appCO0.metadata.inputHandle.mappings
                                .map((x,i)=>{
                                    return x.cssClass
                                })
                                .reduce((acc:any,y:any,j)=>{
                                    if(this.el.nativeElement.className.includes(y)){
                                        acc = true
                                    }
                                    return acc
                                },false)

                                &&

                                this.ryber.appCO0.metadata.inputHandle.mappings
                                .reduce((acc:any,y:any,j)=>{
                                    if(document.getElementsByClassName(x.target)[0].className.includes(y.cssClass)){
                                        acc = objectCopy(y)
                                        acc.answer = true
                                        x.type = y.type
                                    }
                                    return acc
                                },{answer:false}).answer
                            ){

                                if(env.inputHandle.linkInit) console.log('aux -> aux')
                                let classNameArray = this.el.nativeElement.className.split(" ")
                                let independentAuxTarget ={
                                    run:'true',
                                    answer:null
                                }
                                let dependAuxTarget ={
                                    run:'true',
                                    answer:null
                                }
                                try{

                                    this.ryber.appCO0.metadata.inputHandle.mappings
                                    .reduce((acc,y:any,j)=>{
                                            acc.push(...Object.entries(this.ryber.appCO0.metadata.inputHandle[y.type.valueOf()]))
                                            return acc
                                    },[])
                                    .forEach((y:any,j)=>{
                                        y[1].targets.forEach((z:any,k)=>{
                                        // console.log(y[1],k)

                                            if(
                                                document.getElementsByClassName(z.zChildVal)[0].className
                                                .split(" ")
                                                .includes(x.target)  &&
                                                independentAuxTarget.run === 'true'
                                            ){
                                                this.iHOptionsLinkSub?.unsubscribe?.()
                                                //should always be 1 the target input for the group

                                                // handling the the linked items here
                                                independentAuxTarget.answer = y[1].aux[0].auxID
                                                independentAuxTarget.run = 'false'
                                                //

                                            }

                                            //actually determine the correct input here
                                            if(dependAuxTarget.run === 'true'){
                                                dependAuxTarget.answer =
                                                classNameArray
                                                .reduce((acc,w,h)=>{
                                                    if(!z.zChildVal.includes(w)){
                                                        acc = false
                                                    }
                                                    return acc
                                                },true)
                                                if(dependAuxTarget.answer){
                                                    dependAuxTarget.answer = y[1].aux[0].auxID
                                                    x.targets = y[1].targets
                                                    dependAuxTarget.run ='false'
                                                }
                                            }
                                            //

                                            // we got both id for independent and depend options
                                            if(dependAuxTarget.run ==="false" && independentAuxTarget.run ==="false"){
                                                x.aux =  "#" + dependAuxTarget.answer
                                                this.iHLinkActionSub = fromEvent( document.getElementById(independentAuxTarget.answer),"jumidaInput")
                                                .subscribe(this.linkMapper(x))
                                                eventDispatcher({
                                                    event:"jumidaInput",
                                                    element:document.getElementById(independentAuxTarget.answer)
                                                })
                                                throw('e')
                                            }
                                            //


                                        })
                                    })
                                }
                                catch(e){}
                            }
                            //


                            // reg -> aux
                            else if(
                                this.ryber.appCO0.metadata.inputHandle.mappings
                                .reduce((acc:any,y:any,j)=>{
                                    if(document.getElementsByClassName(x.target)[0].className.includes(y.cssClass)){
                                        acc = objectCopy(y)
                                        acc.answer = true
                                        x.type = y.type
                                    }
                                    return acc
                                },{answer:false}).answer
                            ){

                                // console.log(x)
                                if(env.inputHandle.linkInit) console.log('reg -> aux')
                                try{
                                    Object.entries(
                                        this.ryber.appCO0.metadata.inputHandle[x.type.valueOf()]
                                    )
                                    .forEach((y:any,j)=>{
                                        y[1].targets.forEach((z:any,k)=>{
                                        // console.log(y[1],z,x.target)

                                            if(
                                                document.getElementsByClassName(z.zChildVal)[0].className
                                                .split(" ")
                                                .includes(x.target)
                                            ){
                                                this.iHOptionsLinkSub?.unsubscribe?.()
                                                //should always be 1 the target input for the group

                                                // handling the the linked items here
                                                if(document.getElementsByClassName(x.target)?.[0].className.includes("a_p_p_FileButton")){
                                                    this.iHOptionsLinkActionSub = fromEvent( document.getElementById(y[1].aux[0].auxID),"change")
                                                    .subscribe(this.linkMapper(x))
                                                    eventDispatcher({
                                                        event:"change",
                                                        element:document.getElementById(y[1].aux[0].auxID)
                                                    })
                                                }
                                                else{
                                                    this.iHOptionsLinkActionSub = fromEvent( document.getElementById(y[1].aux[0].auxID),"jumidaInput")
                                                    .subscribe(this.linkMapper(x))
                                                    eventDispatcher({
                                                        event:"jumidaInput",
                                                        element:document.getElementById(y[1].aux[0].auxID)
                                                    })
                                                }
                                                //
                                                throw('e')
                                            }


                                        })
                                    })
                                }
                                catch(e){}


                            }
                            //


                            // aux -> reg
                            else if(

                                this.ryber.appCO0.metadata.inputHandle.mappings
                                .map((x,i)=>{
                                    return x.cssClass
                                })
                                .reduce((acc:any,y:any,j)=>{
                                    if(this.el.nativeElement.className.includes(y)){
                                        acc = true
                                    }
                                    return acc
                                },false)
                            ){

                                if(env.inputHandle.linkInit) console.log('aux -> reg')
                                //find its aux input
                                let classNameArray = this.el.nativeElement.className.split(" ")


                                Object.entries(
                                    this.ryber.appCO0.metadata.inputHandle[this.extras.type.valueOf()]
                                )
                                .forEach((y:any,j)=>{
                                    try{
                                    y[1].targets
                                    .forEach((z:any,k)=>{

                                        //actually determine the correct input here
                                        let dependAuxTarget = classNameArray
                                        .reduce((acc,w,h)=>{
                                            if(!z.zChildVal.includes(w)){
                                                acc = false
                                            }
                                            return acc
                                        },true)
                                        //
                                        // I must include the id in the link object since the refactor made it hard to modify the fn
                                        if(dependAuxTarget){
                                            x.aux =  "#" + y[1].aux[0].auxID
                                            x.targets = y[1].targets
                                            this.iHLinkActionSub = fromEvent( document.getElementsByClassName(x.target)[0],"jumidaInput")
                                            .subscribe(this.linkMapper(x))
                                            eventDispatcher({
                                                event:"jumidaInput",
                                                element:document.getElementsByClassName(x.target)[0]
                                            })
                                            throw('e')
                                        }
                                        //
                                    })
                                    }
                                    catch(e){}
                                })
                                //
                            }
                            //


                            //reg -> reg
                            else{
                                if(env.inputHandle.linkInit) console.log('reg -> reg')
                                this.iHLinkActionSub = fromEvent( document.getElementsByClassName(x.target)[0],"jumidaInput")
                                .subscribe(this.linkMapper(x))
                                eventDispatcher({
                                    event:"jumidaInput",
                                    element:document.getElementsByClassName(x.target)[0]
                                })
                            }
                            //


                        })


                    })
                }
                //
            })


        }
    }

    private auxInput(devObj?:any) {
        let {formData,name,required,type} = devObj

        if(formData[name.valueOf()] === undefined){


            formData[name.valueOf()] = {
                value:{
                    "dropdown":this.el.nativeElement.innerText,
                    "file button":this.el.nativeElement.innerText,
                    "options" : new Set()
                }[type.valueOf()],
                googleSheets:this.extras.googleSheets,
                type: this.zChild[1].extras?.type
            }


            if(this.zChild[1].extras?.delta !== undefined){
                formData[name.valueOf()].delta = objectCopy(this.zChild[1].extras?.delta)
            }


            //auxElement setup
            let auxElement

            if(this.zChild[1].extras?.type === "file button"){
                formData[name.valueOf()].inputId = "a_p_p_"  + name.valueOf().split("-").join("").split(" ").join("-")
                auxElement = document.getElementById(formData[name.valueOf()].inputId.valueOf())
            }

            else{
                auxElement = this.renderer2.createElement('input')
                formData[name.valueOf()].inputId = auxElement.id = "a_p_p_"  + name.valueOf().split("-").join("").split(" ").join("-")
                this.renderer2.appendChild(window.document.body, auxElement);
                this.renderer2.addClass(
                    auxElement,
                    "a_p_p_BackStageProp"
                )
            }
            //

            if(env?.inputHandle?.[type.valueOf()]){
                console.groupEnd()
                console.group()
                console.log(this.extras.name,formData[this.extras.name.valueOf()] )
            }


            if(required === type){
                this.renderer2.setAttribute(
                    auxElement,
                    "required",
                    type
                )
            }


            this.iHAuxInputSub = fromEvent(
                auxElement,
                "invalid"
            )
            .subscribe(()=>{
                this.ryber.appCO0.metadata.inputHandle[type.valueOf()][name.valueOf()].targets
                .forEach((x:any,i)=>{
                    this.renderer2
                    .addClass(
                        document.getElementsByClassName(x.zChildVal)[0],
                        'f_o_r_m_InputInvalid'
                    )
                })
            })

            // adding the groups fellow options to be recognized by the directive
            if(this.ryber.appCO0.metadata.inputHandle[type.valueOf()] === undefined){
                this.ryber.appCO0.metadata.inputHandle[type.valueOf()] = {}
            }
            if(this.ryber.appCO0.metadata.inputHandle[type.valueOf()][name.valueOf()] === undefined){
                this.ryber.appCO0.metadata.inputHandle[type.valueOf()][name.valueOf()] = {
                    targets:[],
                    aux:[]
                }
                this.ryber.appCO0.metadata.inputHandle[type.valueOf()][name.valueOf()].aux
                .push({
                    auxID:auxElement.id
                })
            }
            if(env.inputHandle[type.valueOf()]){
                console.log(this.el.nativeElement.innerText,this.el.nativeElement.className)
                console.log(this.extras)
                console.log(this.ryber.appCO0.metadata.inputHandle)
            }
            //

        }

        // adding the groups fellow options to be recognized by the directive
        this.extras[type.valueOf() + "Spot"] =
        this.ryber.appCO0.metadata.inputHandle[type.valueOf()][name.valueOf()].targets
        .push({
            zChildVal:this.zChild[1].val,
        })
        if(this.ryber.appCO0.metadata.inputHandle[type.valueOf()+"Subject"] === undefined){
            this.ryber.appCO0.metadata.inputHandle[type.valueOf()+"Subject"] = new ReplaySubject<Array<any>>(1)
        }
        this.ryber.appCO0.metadata.inputHandle[type.valueOf()+"Subject"].next()
        //


    }

    private linkMapper(x: any): (value: Event) => void {
        return (e) => {

            //value to compare
            let targetValue = (e.target as HTMLInputElement).value;
            if(
                document.getElementsByClassName(x.target)?.[0].className.includes("a_p_p_FileButton")
            ){
                targetValue = (document.getElementsByClassName(x.target)?.[0] as HTMLElement).innerText
            }
            //


            let dependElement = x.aux === undefined ?   this.el.nativeElement : document.querySelector(x.aux)
            // if(environment.inputHandle.link) console.log('bad value',dependElement)
            if(env.inputHandle.link) console.log(targetValue,x,e,this.el.nativeElement.className)

            if (x.when === 'equal') {


                if (targetValue === x.value) {


                    if (x.action === "required") {


                        this.addLink(dependElement);


                    }


                }


                else if (targetValue !== x.value) {


                    if (x.action === "required") {


                        this.removeLink(dependElement, x);


                    }


                }


            }


            else if (x.when === 'included') {


                if (targetValue.includes(x.value)) {


                    if (x.action === "required") {


                        this.addLink(dependElement);


                    }


                }


                else if (!targetValue.includes(x.value)) {


                    if (x.action === "required") {


                        this.removeLink(dependElement, x);


                    }


                }


            }


        };
    }

    private removeLink(dependElement: any, x: any) {
        this.renderer2
            .removeAttribute(
                dependElement,
                "required"
            );

        if (x.targets === undefined) {
            this.renderer2
                .removeClass(
                    dependElement,
                    'f_o_r_m_InputInvalid'
                );
        }
        else if (x.targets !== undefined) {
            x.targets
                .forEach((y: any, j) => {
                    this.renderer2
                        .removeClass(
                            document.getElementsByClassName(y.zChildVal)[0],
                            'f_o_r_m_InputInvalid'
                        );
                });
        }
    }

    private addLink(dependElement: any) {
        this.renderer2.setAttribute(
            dependElement,
            "required",
            "auxLink"
        );
    }



    ngOnDestroy() {
        if (this.extras?.confirm === 'true') {
            let formData = this.co.metadata.formData
            delete formData[this.extras.name.valueOf()]
            Object.values(this)
                .forEach((x: any, i) => {
                    if(x instanceof Subscriber){
                        x.unsubscribe?.()
                    }

                })
        }
    }




}
