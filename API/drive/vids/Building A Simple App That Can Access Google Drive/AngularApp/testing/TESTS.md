# UNIT TESTS


    ryberUpdate
    
    make sure if the CO doesnt exist generate a new CO
    make sure if the signature is not set to "" to leave it alone if the option is undefined
    make sure bools got to the right index and if there is no bool or an invalid bool return p
    make sure quanitiy is pushed and gets a value of 3
    make sure different CO get handled the way they are supposed to
    dont have the dev use this to get the ryber
    update the formCO so the dev does not have to do it
        but for route control the dev might have to do it, its not every sencod
        the dev is adding a CO





# E2E TESTS 

Make sure you can visit the webpage
Make sure the responsiveness is working 
Make sure them components dont overflow
Make sure panel borders realign properly on all mediaqueries


formCO2

make sure for textarea


formCO3 

    make sure on add we functionality position 
    make sure on remove we functionality position
    make sure the resize fn knows between browser resize and when an element is getting added removed
    use the hooks properly for proper cleanup
    MAKE SURE clean up works

formCO4

    on intercept make sure that deltaNode works with its own group
    on remove items are removed and at static, items held and delta node resets 
    on add elements are added as the component is repositioned as needed
    between media queries format is full responsive


formCO6 
    make sure signatuore functionality is full working
    make sure refresh button refreshes signatures

## directives

### toggle button 
* make sure the co doesnt changes when grabbing metadata and gets the wrong co metadata

## Dynamic elements 

    add
        add one proper FPM happens
        media queries see and do proper FPM
        takes advantage of  dynamic element lifecycle hooks (DELK) to prepare FPM if needed
        

    minus
        minus one proper FPM happens
        media queries see and do proper FPM
        at 0 minus knows the difference between static and dynamic and resets accordingly
        take advantage of dynamic element lifecycle hooks to prepare FPM
        when there is no multipleGroup fail gracefully
        
    bo  

    foreign 
        does things in consideration of foreign components and other deltaNode Groups 
        sends the proper move data to the next component
    

## mobile
    make sure only the targeted fonts get changed not all of them 
    watch those media queries

## Form

### get form data

* make sure its properly matched up 
* make sure submit can see your data
* each co should have its formdata seperated on submit

### validate form data
* pattern is using anything that breaks the pattern is handled
* make sure all input elements are on the DOM before you attach form  handlers
* make sure all required values are filled before submitting
* make sure correction dialog displays and goes away based on the valid form
* regex are working
* form checker should be watching for dynamic elements too
* for options, on invalid the input event should reflect in the related options
* for options, when user finshes as desired make sure it submits properly and doesnt say its invalid

### form values transformation
* make sure if there is one value return the value 1 count  1 result, [1] of min,max value of [1]
* make sure sure values to be print and calcuations are seperate and much testing before you can say
* the value is same as the calculation
* on sum, make sure if there is no values in one or many fields 0 is returned
* make sure that for special values we replace with the transformed values properly


### form values dependents
    aux = options, dropdown,file button
* aux -> regular working *
* regular -> aux working
* regular -> regular working
* aux -> aux working
    dropdown   
        dropdown   
        options 
        file buton
    options 
        dropdown   
        options 
        file buton    
    file buton
        dropdown   
        options 
        file buton    

* self -> self working
* one link can support multiple
    you need to add subscriptions and handle instead of seperate ones
    * decide to execute if x,y,z are supported
* for window load make sure we fire only once to get the form link logic setup
 test file, myTemplate src/app/database/website.ts

## to google sheets
* you must map out the values with the fields and the subsheets  in the form 
* you must handle duplicated form field values,
* you must handle duplicates wherever they are appear and make sure they dont cause data corruption
* make sure to restore all data modiciations
* make sure the google fn gets the right about of colummsn 
* make sure its targeting the right subsheet
* make sure its using the correct value for the subsheet
* if needed values are missing please return
* make sure when we add a new application we start at the right index
* make sure data comes in properly on several form submissions


## dialog
* make sure dialog mounts properly mobile


## CMS 
* make sure the data goes in the right spot and that a change in the CMS reflects in the browser
* make sure the right entry goes to  the right point in yr app
* make sure your app can suport cms dynamic static that is if a editor adds or removes to the CMS it reflects in the app  without breaking the site
* make sure the data in your json cache matches the LTD on the CMS and use functions? to get it to change


## dropdown directive
* make sure each dropdown goes with its own instance
* make sure when you click the select, the dropdown opens and closes 
* make sure when you click an option it closes and replaces the selectVal with option val
* the only way to get selectval back is to choose the previous chosen option
* chosing different options does not affect the default choice
* make sure whole dropdown gets removed on removal duplicate
* appInputHandle needs to work seamlessly with dropdown
* make sure on duplicate, if an option is chosen on the original, the correct val gets updated on new
* dropdrown directive needs to be in front of whatever is required, another component should not cause any problems

## dynamic cms + component.ts
+ for size make sure on split, the lefts get calculated properly
+ make sure they go to the next line if there is not enough room
