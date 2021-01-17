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
                "fontSize":"60",
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
                "type": "clusteredTable button",
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


