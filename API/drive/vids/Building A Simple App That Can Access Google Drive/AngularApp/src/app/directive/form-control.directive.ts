import {Directive, ElementRef, HostListener,Input,Renderer2} from '@angular/core';
import {RyberService} from '../ryber.service'
import {fromEvent,of, Subscription, Subject} from 'rxjs'
import {catchError, count,delay} from 'rxjs/operators'
import { eventDispatcher, flatDeep, objectCopy,sCG,minMaxDelta,isDate } from '../customExports';
import {seeec} from '../importantExports'
import {environment}  from '../../environments/environment'
import {samples} from '../sample'




@Directive({
  selector: '[appFormControl]'
})
export class FormControlDirective {

    @Input() formControl: any;
    extras= undefined
    f:HTMLFormElement
    fSub:Subscription
    fCSub:Subscription
    fDSub:Subscription
    fFormUpdateSub:Subject<any> = new Subject<any>()
    fFormUpdateSubscription:Subscription
    fFormUpdate: Array<any> = []
    destroyCompleteSubscription: Subscription
    @HostListener('click') onClick(){
        if(this.extras === undefined){
            return
        }
        if(this.extras.confirm === 'true'){
            eventDispatcher({
                element:this.f,
                event:'submit'
            })
            
            
        }        
    }

    constructor(
        private el:ElementRef,
        private renderer2: Renderer2,
        private ryber:RyberService
    ) { }

    ngOnInit(){
        this.extras = this.formControl
        if(this.extras === undefined){
            return
        }
        if(this.extras.confirm === 'true'){
            this.f = this.renderer2.createElement("form")
            this.f.id = this.extras.id
            let formItems 
            if(environment.fakeValues ) var optionsClicked =false

            // submission procession data gets converted here
            this.fSub=fromEvent(
                this.f,
                'submit'
            )
            .subscribe((e:any)=>{

                
                    //testing fake values
                    if(environment.submission.fakeValues ){


                        document.querySelectorAll("input,textarea")
                        .forEach((x:any,i)=>{
                            try{
                                // fakeData[i] !== undefined? x.value = fakeData[i] : null    
                                eventDispatcher({
                                    element:x,
                                    event:"blur"
                                })
                            }
                            catch(e){}
                        })     
                    
                        
                        if(!optionsClicked && environment.submission.optionsClicked){
                            optionsClicked = true
                            document.querySelectorAll(".a_p_p_Selection")
                            .forEach((x:any,i)=>{
                                Math.floor(Math.random()*100) % 3  === 0 ? x.click() : null
                            })
                        }

                        let fillBatch:any = {}
                        this.ryber['formCO']
                        .map((y,j)=>{
                            let {signature} = this.ryber[y.valueOf()].quantity[1][1]
                            Object.entries(this.ryber[y.valueOf()].metadata.formData)
                            .forEach((z:any,k)=>{
                                if(fillBatch[signature] === undefined){
                                    fillBatch[signature]  = 0
                                }
                                if( z[1]?.delta?.index + 2 > fillBatch[signature]   ){
                                    fillBatch[signature]  = z[1]?.delta.index + 1
                                }                                
                            })

                        })
                        

                        let fakeData = flatDeep(samples({faker,...fillBatch}))

                        document.querySelectorAll("input,textarea")
                        .forEach((x:any,i)=>{
                            try{
                                fakeData[i] !== undefined && x.value === "" ? x.value = fakeData[i] : null    
                                eventDispatcher({
                                    element:x,
                                    event:"blur"
                                })
                            }
                            catch(e){}
                        })     
                    
                        
                        // document.querySelectorAll("a")
                        // .forEach((x:any,i)=>{
                        //     Math.floor(Math.random()*100) % 2  === 0 ? x.click() : null
                        // })                        

                    }    
                    //

                    formItems =  Array.from(document.querySelectorAll("[required]"))

                    //if we have an invalid form, show dialog and try again
                    let invalid = 'false'
                    formItems
                    .forEach((x:any,i)=>{
                        if(!x.validity.valid){
                            this.renderer2
                            .addClass(
                                x,
                                'f_o_r_m_InputInvalid'
                            )   
                            eventDispatcher({
                                event:'invalid',
                                element:x
                            })                             
                            invalid = 'true'
                        }
                    })
                    if(invalid === 'true'){
                        this.ryber.invalid = 'true'
                        return
                    }     
                    //
                                
                    //load dialog so user doesnt hit submit again safe to unsusbiscribe from fSub at this point 
                    this.fSub.unsubscribe()  
                    if(environment.submission.endUser) this.ryber.loading = "true"
                    //

                    // since gapi calls are promise we need to use async to get the data in rhe right place
                    let formCentralSubject = new Subject<any>()
                    this.fCSub = formCentralSubject.subscribe((devObj)=>{
                        // console.log(devObj)
                        seeec.call(devObj.myThis,devObj.formCentral)
                    })
                    //
                    

                    this.extras.formCentral === undefined ? 
                    this.extras.formCentral = (
                        this.ryber.appCO0.metadata["google-sheets"]
                        .map((x:any,i)=>{
                            return x.value
                        }) 
                    )
                    .map((x,i)=>{
                        return {
                            applicantID:"",
                            current:"",// someones name goes here
                            currentStart:1, //'for new entry'
                            startEntry:'B1',
                            endEntry:'B2',
                            rows:0,
                            batch:[],
                            subSheets:x
                        }            
                    }): null                      
                    this.extras.formCentral
                    .forEach((xx,ii) => {
                        
                        let x = xx
                        let i = ii  
                        let {startEntry,endEntry,currentStart,rows,current,batch,subSheets,applicantID} = this.extras.formCentral[i]
                        

                        // logic to setup the batch
                        currentStart +=  2
                        currentStart += this.ryber['formCO'].length 
                        rows = this.ryber['formCO'].length    
                        
                        let myBatch = {}
                        let guide = {}
                        let preBatch = []

                        //setting extra values not in the online form
                        Object
                        .entries(this.ryber.appCO0.metadata["extra_mapping"])
                        .forEach((y:any,j)=>{

                            let googleSheets = objectCopy(
                                Object.fromEntries(
                                    Object.values(this.ryber.appCO0.metadata["google-sheets-mapping"]  )
                                    .map((z:any,k)=>{
                                        // console.log(y,z,subSheets)
                                        let targetFieldData = y[1].filter((w:any,h)=>{
                                            if(y[0] === "applicantID" && z === subSheets && w.key === subSheets){
                                                applicantID = w.value.filter((yy,jj)=>{return yy[0] ==="field"})[0][1]
                                            }                                                
                                            return w.key ===z
                                        })[0]
                                        return targetFieldData === undefined ? null :[targetFieldData.key,targetFieldData.value]    
                                    })
                                    .filter((z:any,k)=>{
                                        return z !== null
                                    })
                                )
                            )

                            let value = null 

                            // setting the desired value as needed
                            try{
                                value =  y[1].filter((z:any,k)=>{
                                    return z.key === subSheets
                                })[0]
                                .value.filter((z:any,k)=>{
                                    return z[0] === "value"
                                })[0][1]  
                            }
                            catch(e){
                                value = y[1].filter((z:any,k)=>{
                                        return z.key === "default value"
                                    })[0].value
                            }
                            //
                            
                            
                            let mimicData = {
                                value,
                                googleSheets,
                                type:"editor additon",
                            }
                            myBatch[y[0].valueOf()] = objectCopy(mimicData)
                            preBatch.push([
                                y[0].valueOf(),
                                objectCopy(mimicData)

                            ])
                        })  
                        //

                        preBatch.push(
                            ...flatDeep(
                                this.ryber['formCO']
                                .map((y,j)=>{
                                    Object.assign(myBatch,objectCopy(this.ryber[y.valueOf()].metadata.formData))
                                    return Object.entries(objectCopy(this.ryber[y.valueOf()].metadata.formData))
                                })                                 
                            )
                        )

                        // special value operations
                        preBatch
                        .forEach((y:any,j)=>{
                            

                            let fieldKey = y[1].googleSheets?.[x.subSheets.valueOf()]
                            let field = fieldKey?.filter((x:any,i)=>{
                                return x[0] === "field"
                            })
                            .map((x:any,i)=>{
                                return x[1]
                            })

                            let types = fieldKey?.filter((x:any,i)=>{
                                return x[0] === "type"
                            })
                            .map((x:any,i)=>{
                                return x[1]
                            })

                            // update date to desired format
                            if(y[1].type === "date" &&  isDate(y[1].value) && !types?.includes("datetime") ){ 
                                myBatch[y[0]].value   = y[1].value = new Intl.DateTimeFormat('en-US').format(new Date(y[1].value) )
                            }
                            //


                            if(types?.length === 0 || types === undefined){
                                return
                            }

                            let special = {
                                main:"false"
                            }
                            
                            
                            if(types?.includes("count") ){
                                special.main = "true"

                                let targetField = field[types.indexOf("count") ]
                                if(guide[targetField] === undefined){
                                    guide[targetField] = {
                                        value:"",
                                        targets:[],
                                        hook:"prepare",
                                        type:"count",
                                        flag:[]
                                    }
                                }
                                if(types?.includes("monetary") ){
                                    
                                    let monetary = new Intl.NumberFormat(
                                        'en-US', 
                                        { 
                                            style: 'currency', 
                                            currency: 'USD',
                                            minimumFractionDigits: 0
                                        }
                                    ).format(y[1]?.value)
                                    guide[targetField].targets.push(monetary)
                                    
                                }
                                else if(types?.includes("add 1") ){
                                    
                                    let increment =  (parseInt(y[1]?.value) + guide[targetField].targets.length).toString()
                                    guide[targetField].targets.push(increment)
                                    guide[targetField].flag.push("add 1")
                                    
                                } 
                                else if(types?.includes("monetary") && types?.includes("add 1") ){
                                    
                                    let increment = (parseFloat(y[1]?.value) + guide[targetField].targets.length)
                                    let monetary = new Intl.NumberFormat(
                                    'en-US', 
                                    { 
                                        style: 'currency', 
                                        currency: 'USD',
                                        minimumFractionDigits: 0
                                    }
                                    ).format(increment)
                                    guide[targetField].targets.push(monetary)
                                    guide[targetField].flag.push("add 1")
                                    
                                }                                                                        
                                else{
                                    guide[targetField].targets.push(y[1]?.value)
                                }
                                guide[targetField].value = guide[targetField].targets[0]
                                

                            }  
                            
                            if(types?.includes("total") ){
                                
                                special.main = "true"
                                let targetField = field[types.indexOf("total") ]
                                if(guide[targetField] === undefined){
                                    guide[targetField] = {
                                        value:0,
                                        hook:"prepare",
                                        type:"total"
                                    }
                                }
                                guide[targetField].value +=1  
                            }

                            if(types?.includes("source") ){
                                
                                special.main = "true"
                                let targetField = field[types.indexOf("source") ]
                                if(guide[targetField] === undefined){
                                    guide[targetField] = {
                                        value:y[1].value,
                                        hook:"prepare",
                                        type:"source",
                                        replicate:objectCopy(y[1].googleSheets)
                                    }
                                }
                            }                            

                            if(types?.includes("max")){
                                special.main = "true"

                                let targetField = field[types.indexOf("max") ]
                                if(guide[ targetField] === undefined){
                                    guide[targetField] = {
                                        value:null,
                                        hook:"prepare",
                                        type:"max"
                                    }
                                }

                                if(y[1]?.type === "date"){
                                    if(guide[ targetField].max === undefined){
                                        guide[targetField].max = new Date("9999-12-31")
                                        guide[targetField].value = y[1]?.value
                                    }
                                    guide[targetField].max > new Date(y[1]?.value) ? 
                                    (()=>{
                                        guide[targetField].max = new Date(y[1]?.value);
                                        guide[targetField].value = y[1]?.value
                                    })() : null
                                }   
                                
                                else if(y[1]?.type === "number" || y[1]?.type === "string"  ){
                                    // FIXME check if i am really a number a string
                                    if(guide[ targetField].max === undefined){
                                        guide[targetField].max = -Infinity
                                        guide[targetField].value = y[1]?.value
                                    }
                                    guide[targetField].max < parseFloat(y[1]?.value) ? 
                                    (()=>{
                                        guide[targetField].max = parseFloat(y[1]?.value)
                                        guide[targetField].value = y[1]?.value
                                    })() : null
                                }                                       
                                
                                
                            }  
                            
                            if(types?.includes("min") ){
                                special.main = "true"
                                let targetField = field[types.indexOf("min") ]
                                if(guide[targetField ] === undefined){
                                    guide[targetField] = {
                                        value:null,
                                        hook:"prepare",
                                        type:"min"
                                    }
                                }

                                if(y[1]?.type === "date"){
                                    if(guide[ targetField].min === undefined){
                                        guide[targetField].min = new Date("0000-01-01")
                                        guide[targetField].value = y[1]?.value
                                    }
                                    guide[targetField].min < new Date(y[1]?.value) ? 
                                    (()=>{
                                        guide[targetField].min = new Date(y[1]?.value);
                                        guide[targetField].value = y[1]?.value
                                    })() : null
                                }   
                                
                                if(y[1]?.type === "number" || y[1]?.type === "string"){
                                    if(guide[ targetField].min === undefined){
                                        guide[targetField].min = Infinity
                                        guide[targetField].value = y[1]?.value
                                    }
                                    guide[targetField].min < parseFloat(y[1]?.value)? 
                                    (()=>{
                                        guide[targetField].min = parseFloat(y[1]?.value)
                                        guide[targetField].value = y[1]?.value
                                    })() : null
                                }                                       
                            }  
                            
                            if(types?.includes("sum") ){
                                
                                special.main = "true"
                                let targetField = field[types.indexOf("sum") ]
                                if(guide[targetField] === undefined){
                                    guide[targetField] = {
                                        value:0,
                                        sum:0,
                                        hook:"prepare",
                                        type:"sum"
                                    }
                                }
                                guide[targetField].sum += isNaN(parseFloat(y[1]?.value)) ? 0: parseFloat(y[1]?.value) 

                                if(types?.includes("monetary") ){
                                    let monetary = new Intl.NumberFormat(
                                        'en-US', 
                                        { 
                                            style: 'currency', 
                                            currency: 'USD',
                                            minimumFractionDigits: 0
                                        }
                                    ).format(guide[targetField].sum)                                       
                                    guide[targetField].value = monetary
                                }

                                else{
                                    guide[targetField].value = guide[targetField].sum.toString() 
                                }
                            }     

                            if(special.main === "true"){
                                return                                     
                            }

                            else if(types?.includes("monetary") ){
                                
                                let targetField = field[types.indexOf("monetary") ]
                                if(guide[targetField] === undefined){
                                    guide[targetField] = {
                                        value:"",
                                        targets:[],
                                        hook:"prepare",
                                        type:"monetary"
                                    }
                                    let monetary = new Intl.NumberFormat(
                                        'en-US', 
                                        { 
                                            style: 'currency', 
                                            currency: 'USD',
                                            minimumFractionDigits: 0
                                        }).format(y[1]?.value)
                                    guide[targetField].value = monetary                                        
                                }
                                

                            }
                            
                            else if(types?.includes("datetime") ){
                                
                                let targetField = field[types.indexOf("datetime") ]
                                if(guide[targetField] === undefined){
                                    guide[targetField] = {
                                        value:"",
                                        targets:[],
                                        hook:"prepare",
                                        type:"datetime"
                                    }
                                    let dateOptions = { 
                                        year: 'numeric', 
                                        month: 'numeric', 
                                        day: 'numeric', 
                                    }
                                    let timeOptions = {
                                        hour: 'numeric',
                                        minute: 'numeric', 
                                        second: 'numeric',
                                        hour12: false, 
                                    }
                                    let datetime = new Intl.DateTimeFormat('en-US',dateOptions).format(new Date(y[1].value) ) + 
                                    ", " + new Intl.DateTimeFormat('en-GB',timeOptions).format(new Date() )
                                    guide[targetField].value = datetime                                        
                                }
                                

                            }

                            else if(types?.includes("add 1") ){
                                //gets picked up with count find out why
                                
                                let targetField = field[types.indexOf("add 1") ]
                                if(guide[targetField] === undefined){
                                    guide[targetField] = {
                                        value:"",
                                        targets:[],
                                        hook:"prepare",
                                        type:"add 1"
                                    }
                                    guide[targetField].targets.push(parseInt(y[1]?.value) + 1)
                                    guide[targetField].value = guide[targetField].targets[0]                                        
                                }
                                

                            }                                 
                                                            

                        })
                        //

                        batch = Object.keys(objectCopy(myBatch))

                        batch = batch
                        .map((y,j)=>{        
                            // console.log(y,myBatch[y].value)        
                            
                            let value:any = ""
                            if(typeof myBatch[y].value === 'string' ){
                                value = myBatch[y].value
                            }

                            else if(Array.isArray(myBatch[y].value)  ){
                                if(myBatch[y].value.length !==0){
                                    value = Array.from(myBatch[y].value).reduce((acc,z,k) => acc + " ," + z)
                                }
                            }
                            let myBatchItem = {
                                value
                            }
                            myBatchItem[x.subSheets.valueOf()] =  myBatch[y].googleSheets?.[x.subSheets.valueOf()]
                            return myBatchItem
                            
                        })             
                        .filter((y,j)=>{
                            return y[x.subSheets.valueOf()] !== undefined
                        })
                        // handles special value operations
                        .filter((y,j)=>{
                            let fieldKey =y[x.subSheets.valueOf()]?.filter?.((z:any,k)=>{
                                return z[0]=== "field"
                            })
                            .map((z:any,k)=>{
                                return z[1]
                            })
                            let myFilter = true 
                            // console.log(fieldKey)

                            try{
                                Object.keys(guide)
                                .forEach((z:any,k)=>{
                                    if(fieldKey?.includes(z)){
                                        myFilter = false
                                    }
                                })
                            }
                            
                            catch(e){}

                            return  myFilter 
                            
                        })
                        //
                        .filter((y,j)=>{
                            return y !== null
                        })    
                        batch = [batch]                          
                        
                        batch[0].
                        push(          
                            ...Object.entries(guide)
                            .map((z:any,k)=>{
                                let batchItem ={
                                    value:z[1].value,
                                }
                                batchItem[x.subSheets.valueOf()] = [["type",z[1].type],["field",z[0]]]
                                return batchItem
                            })  
                        )       

                        //if we have to add more rows due to google sheet field type === count
                        if(guide !== undefined){
                            let delta = minMaxDelta({
                                items:Object.entries(guide)
                                .filter((y:any,j)=>{
                                    return y[1].type === "count"
                                }),
                                min:(item)=>{
                                    return item[1].targets?.length
                                },
                                max:(item)=>{
                                    return item[1].targets?.length
                                }                                                            
                            })  
                            
                            
                            if(delta.max > 0){

                                let moreRows = Array.from(Array(delta.max-1),((y,j)=>{
                                    let newRow = Object.entries(guide)
                                    .map((z:any,k)=>{
                                        let value = z[1].targets[z[1].targets.length-1]
                                        if(z[1].targets[j+1] !== undefined ){
                                            value = z[1].targets[j+1]
                                        }
                                        if(z[1]?.flag?.includes("add 1")  && j >= z[1].targets.length-1    ){
                                            //if bugs look here 
                                            // basically this code assumes duplicate diddnt complete
                                            // with its others, and its using the last value as additions
                                            value = (parseInt(value) + (1*(j+1))).toString()
                                        }                                            
                                        let batchItem ={
                                            value,
                                            field:z[0]
                                        }
                                        batchItem[x.subSheets.valueOf()] = [["type",z[1].type],["field",z[0]]]
                                        return batchItem
                                    }) 
                                    
                                    
                                    // making sure the additonal row values match up with the first row
                                    let newBatchRow = batch[0]
                                    .map((z:any,k)=>{
                                        
                                        let targetField = z[x.subSheets.valueOf()]
                                            .filter((w:any,h)=>{
                                                return w[0] === "field"
                                        })[0][1]
                                        
                                        let result = {value:""}
                                        result[x.subSheets.valueOf()] = []
                                        newRow
                                        .forEach((w:any,h)=>{
                                            if(w.field === targetField){
                                                result = w
                                            }
                                        })
                                        return result
                                        
                                    }) 
                                    //

                                    return newBatchRow
                                }))      
                                
                                
                                //how the format should like when we go to send the data to google sheet
                                batch.push(...moreRows)
                            }
                        //                            
                        }     
                        //

                        // console.log(batch)
                        // console.log(moreRows)
                        // console.log(myBatch)
                        // console.log(guide)
                        // debugger
                        // return 
                    
                        
                        // send to google spreadsheets
                        applicantID = applicantID.split(" ").join("") 
                        this.extras.formCentral[i]   = {applicantID,startEntry,endEntry,currentStart,rows,current,batch,subSheets,
                            fFormUpdateSub:this.fFormUpdateSub}  
                        formCentralSubject.next({
                            myThis:this,
                            formCentral:this.extras.formCentral[i] 
                        })
                    });                        
                    //
                                                
                    //
                

            })  
            //


            // loading subumission component bootstrap
            this.fFormUpdateSubscription = this.fFormUpdateSub
            .subscribe((a)=>{
                if(a=== "error"){
                    this.fFormUpdateSubscription.unsubscribe()
                    this.destroyCompleteSubscription.unsubscribe()
                    this.ryber.loading = "false"
                    this.ryber.network = 'error'
                    eventDispatcher({
                        event:'resize',
                        element:window
                    })                         
                }
                this.fFormUpdate.push(a)
                if(this.fFormUpdate.length === 4){
                    this.ryber.loading = "false"
                    eventDispatcher({
                        event:'resize',
                        element:window
                    })                        
                }
            })
            //

            // sucessful bootstrap
            this.destroyCompleteSubscription = this.ryber.appCO0.metadata
            .destroyComplete
            .pipe(
                delay(0)
            )
            .subscribe(()=>{
                if(environment.submission.endUser) this.ryber.sucessful = "true"
                eventDispatcher({
                    event:'resize',
                    element:window
                })
            })
            //

                  
            if(environment.submission.click){
                // this.fDSub = this.ryber.appCO0.metadata.clickDone
                // .subscribe((a)=>{
                //     console.log(a)
                //     if(a.length === 3){
                    setTimeout(() => {
                        eventDispatcher({
                            element:this.f,
                            event:'submit'
                        })                
                    }, 15000);  
                //     }
                    
                // })  
               
            }             

        }      
            
    }

  

   

    ngOnDestroy(){
        if(this.extras === undefined){
            return
        }        
        if(this.extras.confirm === "true"){ 
            this.fSub?.unsubscribe()
            this.fDSub?.unsubscribe?.()
            this.fFormUpdateSub?.unsubscribe?.()
            this.destroyCompleteSubscription?.unsubscribe?.()      
        } 
        
    }    

}


