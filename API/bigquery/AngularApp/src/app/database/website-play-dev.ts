let website:any = {}

website.convertCMS = [

    {
        "title": "play",
        "type_slug": "forms",
        "metafields": [

            {
                "key": "Body",
                "type": "body",
                "stack": "60",
                // "height":"1000",
                "background": "rgb(255, 179, 204)",
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
                "key": "Choose-Schema",
                "type": "nester",
                "value":"",
                "background":"yellow",
                // "split": "3",
                "nestGroup":"schemas",
                "nest":"A1",
                "width":"1600",
                "height":"700",
                "googleSheets": {},
                "options":{
                    "css":{
                        display:"flex",
                        "flex-direction":"row",
                        "justify-content":"space-around",
                        "align-items":"flex-start",
                        "flex-wrap":"wrap"
                    }
                }
            },
            {
                "key": "add-me",
                "type": "sub-heading",
                "value":"Add me",
                // "split": "3",
                "nestGroup":"schemas",
                "nestUnder":"A1",
                "nest":"B1",
                "width":"1600",
                // "height":"250",
                "googleSheets": {},
                "text-align":"center",
                "options":{
                    "css":{
                        "justify-self":"center",

                        // "flex-grow":"10",
                        "width":"100%"
                        // "flex-basis":"500px"
                    }
                }
            },
            {
                "key": "my-table",
                "type": "simpleTable",
                "value":"",
                "nestGroup":"schemas",
                "nestUnder":"A1",
                "nest":"B2",
                "background":"blue",
                // "split": "3",
                // "width":"300",
                // "height":"250",
                "googleSheets": {},
                "options":{
                    "css":{
                        // "justify-self":"flex-start",
                        // "flex-grow":"1"
                        "height":"300px",
                        "width":"400px",
                        "order":1
                    }
                }
            },
            {
                "key": "my-input-counter",
                "type": "count",
                "value":"1.",
                "nestGroup":"schemas",
                // "multipleGroup":"schemasInput",
                "nestUnder":"C1",
                "nest":"D1",
                // "split": "3",
                // "width":"300",
                // "height":"250",
                "googleSheets": {},
                "options":{
                    "css":{
                        // "justify-self":"flex-start",
                        // "flex-grow":"1"
                        order:-3,
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
                "value":"",
                "nestGroup":"schemas",
                "nestUnder":"C1",
                "nest":"D1",
                // "multipleGroup":"schemasInput",
                // "split": "3",
                // "width":"300",
                // "height":"250",
                "googleSheets": {},
                "options":{
                    "css":{
                        // "justify-self":"flex-start",
                        // "flex-grow":"1"
                        order:-2,
                        "background":"white",
                        "height":"50px",
                        "width":"400px",
                    }
                }
            },
            {
                "key": "form-item-container",
                "type": "nester",
                "value":"",
                // "background":"red",
                // "split": "3",
                "multipleGroup":"schemasInput",
                "nestGroup":"schemas",
                "nest":"C1",
                "nestUnder":"B3",
                // "width":"1200",
                "height":"350",
                "googleSheets": {},
                "options":{
                    "css":{
                        order:-2,
                        // "width":"75%",
                        "border":"1px solid red",
                        "width":"400px",
                        "height":"50px",
                        display:"flex",
                        "flex-direction":"row",
                        "overflow":"none"
                        // "justify-content":"space-between",
                        // "flex-wrap":"wrap"
                    }
                }
            },
            {
                "key": "add-schema",
                "type": "add button",
                "value":"Add Another",
                "nestGroup":"schemas",
                "multipleGroup":"schemasInput",
                "nestUnder":"B3",
                "nest":"C2",
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
                        // "width":"400px",
                    }
                }
            },
            {
                "key": "remove-schema",
                "type": "remove button",
                "value":"Remove Another",
                "multipleGroup":"schemasInput",
                "nestGroup":"schemas",
                "nestUnder":"B3",
                "nest":"C3",
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
                        // "width":"400px",
                    }
                }
            },
            {
                "key": "input-container",
                "type": "nester",
                "value":"",
                "background":"cyan",
                // "split": "3",
                "nestGroup":"schemas",
                "nest":"B3",
                "nestUnder":"A1",
                // "width":"1200",
                "height":"350",
                "googleSheets": {},
                "options":{
                    "css":{
                        order:2,
                        // "width":"75%",
                        "width":"800px",
                        "height":"300px",
                        display:"flex",
                        "flex-direction":"column",
                        "justify-content":"space-between",
                        // "flex-wrap":"wrap"
                    }
                }
            },
            {
                "key": "schema-mode",
                "type": "input",
                "value":"Mode Type",
                "newline":[
                    "REPEATED",
                    "REQUIRED",
                    "NULLABLE"
                ],
                "fontSize":"120",
                "latch":"",
                // "multipleGroup":"schemasInput",
                // "split": "3",
                // "width":"300",
                "height":"250",
                "googleSheets": {},
                "options":{
                    "css":{
                        // "justify-self":"flex-start",
                        // "flex-grow":"1"
                        order:-2,
                        "background":"white",
                        "height":"50px",
                        "width":"400px",
                    }
                }
            },
            {
                "key": "schema-mode",
                "type": "dropdown",
                "value":"Mode Type",
                "newline":[
                    "REPEATED",
                    "REQUIRED",
                    "NULLABLE"
                ],
                "fontSize":"120",
                "latch":"",
                // "multipleGroup":"schemasInput",
                // "split": "3",
                // "width":"300",
                "height":"250",
                "googleSheets": {},
                "options":{
                    "css":{
                        // "justify-self":"flex-start",
                        // "flex-grow":"1"
                        order:-2,
                        "background":"white",
                        "height":"50px",
                        "width":"400px",
                    }
                }
            },


        ]
    },
]


export default website


