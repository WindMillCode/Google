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
                "googleSheets": {}
            },
            {
                "key": "Question",
                "value": "Type in the name of the dataset to create",
                "type": "sub-heading",
                "split": "9",
                "text-align":"center",
                "googleSheets": {}
            },
            {
                "key": "Dataset-Answer",
                "value": "",
                "type": "input",
                "border":"1px solid black",
                "fontSize":"60",
                "background":"white",
                "split": "9",
                "text-align":"center",
                "googleSheets": {}
            },
            {
                "key": "Submit",
                "type": "create button",
                "value":"Submit",
                "next":"true",
                // "split": "3",
                "height":"250",
                "googleSheets": {}
            },
            {
                "key": "Result",
                "type": "text",
                "value":"Waiting For Submission...",
                // "next":"true",
                "split": "6",
                "fontSize":"60",
                "height":"250",
                "googleSheets": {}
            },
        ]
    },
]


export default website


