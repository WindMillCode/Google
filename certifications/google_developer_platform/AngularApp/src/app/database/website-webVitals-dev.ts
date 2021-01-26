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
                "background":"green",
                "googleSheets": {},
                "webVitals":{
                    confirm:"true"
                }
            },
            {
                "key": "Heading",
                "value": "WebVitals",
                "type": "title",
                "split": "9",
                // "width":"420",
                "googleSheets": {}
            },
            {
                "key": "Choose-Schema",
                "type": "div",
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
                        "flex-direction":"row-reverse",
                        "justify-content":"space-between",
                        "align-items":"center",
                        "flex-wrap":"wrap"
                    }
                }
            },
            {
                "key": "my-grid",
                "type": "simpleTable",
                "value":"",
                "background":"",
                // "split": "3",
                "nestGroup":"schemas",
                "nest":"B1",
                "nestUnder":"A1",
                "width":"1600",
                "height":"700",
                "googleSheets": {},
                columnDefs : [
                    { field: 'make' },
                    { field: 'model' },
                    { field: 'price' }
                ],

                rowData : [
                    { make: 'Toyota', model: 'Celica', price: 35000 },
                    { make: 'Ford', model: 'Mondeo', price: 32000 },
                    { make: 'Porsche', model: 'Boxter', price: 72000 }
                ],
                "options":{
                    "css":{
                        // order:2,
                        // display:"flex",
                        // "flex-direction":"row",
                        // "justify-content":"space-around",
                        // "align-items":"flex-start",
                        // "flex-wrap":"wrap"
                    }
                }
            },
            {
                "key": "items-holder",
                "type": "div",
                "value":"",
                "background":"cyan",
                // "split": "3",
                "nestGroup":"schemas",
                "nest":"B2",
                "nestUnder":"A1",
                "googleSheets": {},
                "options":{
                    "css":{
                        display:"flex",
                        "width": "500px",
                        "height":"500px",
                        "flex-direction":"row",
                        "justify-content":"flex-start",
                        "flex-wrap":"wrap",

                    }
                }
            },
            {
                "key": "my-input-counter",
                "type": "count",
                "value":"1.",
                "nestGroup":"schemas",
                "multipleGroup":"schemasInput",
                "nestUnder":"C3",
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
                "nestUnder":"C3",
                "nest":"D2",
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
                "key": "form-item-container",
                "type": "div",
                "value":"",
                // "background":"red",
                // "split": "3",
                "multipleGroup":"schemasInput",
                "nestGroup":"schemas",
                "nest":"C3",
                "nestUnder":"B2",
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
                "key": "buttons-container",
                "type": "div",
                "value":"",
                "background":"",
                // "split": "3",
                "nestGroup":"schemas",
                "nest":"B3",
                "nestUnder":"A1",
                "googleSheets": {},
                "options":{
                    "css":{
                        display:"flex",
                        "width": "700px",
                        // "height":"500px",
                        "flex-direction":"row",
                        "justify-content":"space-around",
                        "align-items":"center",
                        "flex-wrap":"wrap",
                        order:1,
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
                "nest":"C1",
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
                "nest":"C2",
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
                "key": "myVideo",
                "value": "",
                "type": "video",
                "options":{
                    "css":{
                        // filter: "blur(20px) invert(1) opacity(0.5)"
                        // filter:"hue-rotate(180deg) saturate(200%);"
                    }
                },
                "split": "5",
                // "width":"420",
                "height":500,
                "googleSheets": {},
                webRTC:{
                    item:"myVideo"
                }
            },
            {
                "key": "myVideoButton",
                "value": "Start",
                "type": "button",
                "options":{
                    "css":{
                        // filter: "blur(20px) invert(1) opacity(0.5)"
                        // filter:"hue-rotate(180deg) saturate(200%);"
                    }
                },
                "split": "4",
                // "width":"420",
                // "height":500,
                "googleSheets": {},
                webRTC:{
                    item:"myVideoButton"
                }
            },


        ]
    },

]


export default website


