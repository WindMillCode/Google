import {Directive, ElementRef, HostListener,Input,ChangeDetectorRef,ChangeDetectionStrategy} from '@angular/core';


@Directive({
  selector: '[toggleButton]',
//   changeDetection: ChangeDetectionStrategy.OnPush
})


//FIXME figure out how to get the zChild in here thnx!!
export class ToggleButtonDirective {
    @Input() stuff: any;
    
    @HostListener('click',['$event']) a(e) {
        if(this.stuff === undefined) return
        e.preventDefault()
        
        
        // console.log(Modernizr.inputtypes.date)

        if(this.stuff.confirm === 'true'){



            if(this.stuff.selected === 'false'){
                this.el.nativeElement.style.backgroundColor = this.stuff.onBackgroundColor
                this.el.nativeElement.style.color = this.stuff.onColor
                this.stuff.selected = 'true'
            }


            else if(this.stuff.selected === 'true'){
                this.el.nativeElement.style.backgroundColor = this.stuff.offBackgroundColor
                this.el.nativeElement.style.color = this.stuff.offColor
                this.stuff.selected = 'false'
            }    

            else if(     this.stuff.selected().count !== undefined){
                let toggle = this.stuff.selected()
            

                this.el.nativeElement.style.backgroundColor = this.stuff.onBackgroundColor
                this.el.nativeElement.style.color = this.stuff.onColor  
                this.stuff.mySelected = 'true'  
                // if element  is in array
                if(toggle.selectedElement.indexOf(this.el.nativeElement) !== -1){
                    let index = toggle.selectedElement.indexOf(this.el.nativeElement)
                    let off = toggle.selectedElement.splice(index,1)[0]
                    let offStuff = toggle.stuff.splice(index,1)[0]
                    off.style.backgroundColor = this.stuff.offBackgroundColor
                    off.style.color = this.stuff.offColor 
                    offStuff.mySelected = 'false'                        
                    return 
                }
                //
                else if(   toggle.selectedElement.length  >= toggle.count){
                    let off = toggle.selectedElement.shift()
                    let offStuff = toggle.stuff.shift()
                    off.style.backgroundColor = this.stuff.offBackgroundColor
                    off.style.color = this.stuff.offColor 
                    offStuff.mySelected = 'false'
                }   
                toggle.selectedElement.push(this.el.nativeElement)
                toggle.stuff.push(this.stuff)
                
                
    
            }

            else if(   typeof this.stuff.selected === 'function'){
                let toggle = this.stuff.selected()
            

                if(   toggle.selected ==='true' && this.stuff.mySelected === 'true' ){
                    this.el.nativeElement.style.backgroundColor = this.stuff.offBackgroundColor
                    this.el.nativeElement.style.color = this.stuff.offColor
                    toggle.selected = 'false'    
                    this.stuff.mySelected = 'false'  
                    toggle.selectedElement= null    
                    return    
                }                                            
                
                else if(  this.stuff.mySelected === 'false'){
                    this.el.nativeElement.style.backgroundColor = this.stuff.onBackgroundColor
                    this.el.nativeElement.style.color = this.stuff.onColor
                    toggle.selected = 'true'   
                    this.stuff.mySelected = 'true'  
                    // console.log(toggle.selectedElement)
                    if(toggle.selectedElement !== null){
                        toggle.selectedElement.nativeElement.style.backgroundColor = this.stuff.offBackgroundColor
                        toggle.selectedElement.nativeElement.style.color = this.stuff.offColor
                        toggle.stuff.mySelected = 'false'
                    }
                    toggle.selectedElement = this.el
                    toggle.stuff = this.stuff
                }
                
    
            }
            
                
        }
    }



    @HostListener('mouseenter') c() {

        if(this.stuff === undefined) return

        if(this.stuff.confirm === 'true'){
            
            
            if(   typeof this.stuff.selected === 'function'){
                let toggle = this.stuff.selected()
                
                if(   this.stuff.mySelected === 'false'){
                    this.el.nativeElement.style.backgroundColor = this.stuff.onBackgroundColor
                    this.el.nativeElement.style.color = this.stuff.onColor           
                }
                       
                return
            }            

            this.el.nativeElement.style.backgroundColor = this.stuff.onBackgroundColor
            this.el.nativeElement.style.color = this.stuff.onColor

        }

    }    


    
    @HostListener('mouseleave') e() {

        if(this.stuff === undefined) return

        if(this.stuff.confirm === 'true' ){

            if(   typeof this.stuff.selected === 'function'){
                let toggle = this.stuff.selected()
                if(   this.stuff.mySelected === 'false'){
                    this.el.nativeElement.style.backgroundColor = this.stuff.offBackgroundColor
                    this.el.nativeElement.style.color = this.stuff.offColor
                    // toggle.selected = 'true'            
                }

                // else if(   toggle.selected ==='true'){
                //     this.el.nativeElement.style.backgroundColor = this.stuff.offBackgroundColor
                //     this.el.nativeElement.style.color = this.stuff.offColor
                //     toggle.selected = 'false'            
                // }                    
                
                return
            }   

            else if(this.stuff.selected === 'false'){
                this.el.nativeElement.style.backgroundColor = this.stuff.offBackgroundColor
                this.el.nativeElement.style.color = this.stuff.offColor
            }
        }

    }     


    
    constructor(
        private el:ElementRef,
        private ref: ChangeDetectorRef
    ) { }

}
