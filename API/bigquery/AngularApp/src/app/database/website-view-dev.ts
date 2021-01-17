let website:any = {}

website.convertCMS = [

    {
        "title": "loading",
        "type_slug": "forms",
        "metafields": [

            {
                "key": "Body",
                "type": "body",
                "stack": "60",
                // "height":"1000",
                // "background": "rgb(255, 179, 204)",
                "googleSheets": {}
            },
            {
                "key": "Heading",
                "value": "Welcome to the BigQuery Management Page",
                "type": "title",
                "split": "9",
                // "width":"420",
                "googleSheets": {}
            },
            {
                "key": "Heading",
                "value": "Type in the name of the table,dataset,project, or query as according to the backend",
                "type": "sub-heading",
                "text-align":"center",
                "split": "9",
                // "width":"420",
                "googleSheets": {}
            },
            {
                "key": "Title",
                "value": "ENTER HERE",
                "type": "input",
                "border":"1px solid black",
                "fontSize":"40",
                "left":450,
                "background":"white",
                "split": "4",
                "text-align":"center",
                "googleSheets": {}
            },
            {
                "key": "Email Container",
                "value": "",
                "type": "nester",
                "border":"1px solid black",
                "fontSize":"40",
                "nestGroup":"view",
                "nest":"A1",
                "background":"lightgreen",
                "split": "9",
                "height":500,
                "text-align":"center",
                "googleSheets": {},
                "options":{
                    "css":{
                        display:"flex",
                        overflow:"auto",
                        "flex-direction":"row",
                        // "justify-content":"space-around",
                        "align-items":"flex-start",
                        "align-content":"flex-start",
                        "flex-wrap":"wrap"
                    }
                }
            },
            {
                "key": "Email header",
                "type": "sub-heading",
                "value":"Enter emails as necessary",
                // "split": "3",
                "nestGroup":"view",
                "nestUnder":"A1",
                "nest":"B1",
                "width":"1600",
                // "height":"250",
                "googleSheets": {},
                "text-align":"center",
                "options":{
                    "css":{
                        "justify-self":"center",
                        margin:"20px",
                        // "flex-grow":"10",
                        "width":"100%",
                        // "margin":"10px"
                        // "flex-basis":"500px".
                        order:-2,
                    }
                }
            },
            {
                "key": "my-input-counter",
                "type": "count",
                "value":"1.",
                "nestGroup":"view",
                "multipleGroup":"viewInput",
                "nestUnder":"B2",
                "nest":"C1",
                // "split": "3",
                // "width":"300",
                // "height":"250",
                "googleSheets": {},
                "options":{
                    "css":{
                        // "justify-self":"flex-start",
                        // "flex-grow":"1"
                        // order:-3,
                        "width":"10px"
                        // "background":"white",
                        // "height":"30px",
                        // "width":"400px",
                    }
                }
            },
            {
                "key": "my-input",
                "type": "input",
                "value":"EMAIL",
                "nestGroup":"view",
                "nestUnder":"B2",
                "nest":"C2",
                "multipleGroup":"viewInput",
                // "split": "3",
                // "width":"300",
                // "height":"250",
                "googleSheets": {},
                "options":{
                    "css":{
                        // "justify-self":"flex-start",
                        // "flex-grow":"1"
                        // order:-2,
                        "background":"white",
                        "height":"50px",
                        "width":"800px",
                    }
                }
            },
            {
                "key": "form-item-container",
                "type": "nester",
                "value":"",
                // "background":"red",
                // "split": "3",
                "multipleGroup":"viewInput",
                "nestGroup":"view",
                "nestUnder":"A1",
                "nest":"B2",
                // "width":"1200",
                "height":"350",
                "googleSheets": {},
                "options":{
                    "css":{
                        // "width":"75%",
                        order:-1,
                        margin:"20px",
                        "border":"1px solid red",
                        "max-width":"800px",
                        "width":"100%",
                        "height":"60px",
                        display:"flex",
                        "flex-direction":"row",
                        "overflow":"none",
                        "background-color":"red"
                        // "justify-content":"space-between",
                        // "flex-wrap":"wrap"
                    }
                }
            },
            {
                "key": "add-schema",
                "type": "add button",
                "value":"Add Another",
                "nestGroup":"view",
                "multipleGroup":"viewInput",
                "nestUnder":"A1",
                "nest":"B3",
                "split": "3",
                // "left":"0",
                // "width":"300",
                // "height":"250",
                "googleSheets": {},
                "options":{
                    "css":{
                        // "justify-self":"flex-start",
                        // "flex-grow":"1"
                        // order:-1,

                        // "background":"white",
                        // "height":"30px",
                        "width":"100%",
                    }
                }
            },
            {
                "key": "remove-schema",
                "type": "remove button",
                "value":"Remove Another",
                "multipleGroup":"viewInput",
                "nestGroup":"view",
                "nestUnder":"A1",
                "nest":"B4",
                // "split": "3",
                // "width":"300",
                // "height":"250",
                "googleSheets": {},
                "options":{
                    "css":{
                        // "justify-self":"flex-start",
                        // "flex-grow":"1"
                        order:0,
                        // "background":"white",
                        // "height":"30px",
                        "width":"100%",
                    }
                }
            },

            {
                "key": "SourceURL",
                "value": "ENTER DATA URL HERE",
                "type": "input",
                "border":"1px solid black",
                "fontSize":"40",
                "background":"white",
                "split": "5",
                "text-align":"center",
                "googleSheets": {}
            },
            {
                "key": "Grid",
                "value": "",
                "type": "simpleTable",
                "split": "4",
                // "top":-70,
                "height":"500",
                "text-align":"center",
                "googleSheets": {}
            },
            {
                "key": "Answer",
                "value": "ENTER QUERY HERE",
                "type": "textbox",
                "height":"400",
                "border":"1px solid black",
                "fontSize":"60",
                "top":-400,
                "background":"white",
                "split": "5",
                "text-align":"center",
                "googleSheets": {}
            },
            {
                "key": "Submit",
                "type": "view button",
                "value":"Submit",
                "next":"true",
                "split": "3",
                "height":"80",
                "googleSheets": {}
            },
            {
                "key": "Result",
                "type": "text",
                "value":"Waiting For Submission...",
                // "next":"true",
                "split": "6",
                "fontSize":"40",
                "height":"250",
                "googleSheets": {}
            },


        ]
    },
]


export default website


