let website:any = {}

website.convertCMS = [

    {
        "title": "webRTCVideo",
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
                "key": "my-input-counter",
                "type": "count",
                "value":"1.",

                "multipleGroup":"schemasInput",

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

                "multipleGroup":"schemasInput",
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
                "key": "add-schema",
                "type": "add button",
                "value":"Add Another",

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



            // {
            //     "key": "add",
            //     "type": "add button",
            //     "value":"Add ",
            //     "multipleGroup":"view",
            //     "next":"true",
            //     // "nestUnder":"A1",
            //     // "nest":"B3",
            //     "split": "3",
            //     // "left":"0",
            //     // "width":"300",
            //     // "height":"250",
            //     "googleSheets": {},
            //     "options":{
            //         "css":{
            //             // "justify-self":"flex-start",
            //             // "flex-grow":"1"
            //             // order:-1,

            //             // "background":"white",
            //             // "height":"30px",
            //             // "width":"100%",
            //         }
            //     }
            // },
            // {
            //     "key": "remove",
            //     "type": "remove button",
            //     "value":"Remove",
            //     "multipleGroup":"view",
            //     // "nestGroup":"view",
            //     // "nestUnder":"A1",
            //     // "nest":"B4",
            //     "split": "3",
            //     // "width":"300",
            //     // "height":"250",
            //     "googleSheets": {},
            //     "options":{
            //         "css":{
            //             // "justify-self":"flex-start",
            //             // "flex-grow":"1"
            //             order:0,
            //             // "background":"white",
            //             // "height":"30px",
            //             // "width":"100%",
            //         }
            //     }
            // },



        ]
    },

]


export default website


