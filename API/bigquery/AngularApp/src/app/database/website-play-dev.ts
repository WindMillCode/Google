let website:any = {}

website.convertCMS = [

    {
        "title": "present_drive_files",
        "type_slug": "forms",
        "metafields": [

            {
                "key": "Body",
                "type": "body",
                "stack": "60",
                "height":"1000",
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
                "background":"lightBlue",
                // "split": "3",
                "nestGroup":"schemas",
                "nest":"A1",
                "width":"1600",
                "height":"350",
                "googleSheets": {},
                "options":{
                    "css":{
                        display:"flex",
                        "flex-direction":"row",
                        "justify-content":"space-around",
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
                "height":"250",
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
                "nest":"B1",
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
                "key": "my-input",
                "type": "input",
                "value":"",
                "nestGroup":"schemas",
                "nestUnder":"B1",
                "nest":"C1",
                // "split": "3",
                // "width":"300",
                // "height":"250",
                "googleSheets": {},
                "options":{
                    "css":{
                        // "justify-self":"flex-start",
                        // "flex-grow":"1"
                        "background":"white",
                        "height":"30px",
                        "width":"400px",
                    }
                }
            },
            {
                "key": "my-input",
                "type": "input",
                "value":"",
                "nestGroup":"schemas",
                "nestUnder":"B1",
                "nest":"C1",
                // "split": "3",
                // "width":"300",
                // "height":"250",
                "googleSheets": {},
                "options":{
                    "css":{
                        // "justify-self":"flex-start",
                        // "flex-grow":"1"

                        "background":"white",
                        "height":"30px",
                        "width":"400px",
                    }
                }
            },
            {
                "key": "my-input",
                "type": "input",
                "value":"",
                "nestGroup":"schemas",
                "nestUnder":"B1",
                "nest":"C1",
                // "split": "3",
                // "width":"300",
                // "height":"250",
                "googleSheets": {},
                "options":{
                    "css":{
                        // "justify-self":"flex-start",
                        // "flex-grow":"1"

                        "background":"white",
                        "height":"30px",
                        "width":"400px",
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
                "nest":"B1",
                "nestUnder":"A1",
                "width":"1200",
                "height":"350",
                "googleSheets": {},
                "options":{
                    "css":{
                        order:2,
                        "width":"500px",
                        "height":"300px",
                        display:"flex",
                        "flex-direction":"column",
                        "justify-content":"space-between",
                        // "flex-wrap":"wrap"
                    }
                }
            },

        ]
    },
]


export default website


