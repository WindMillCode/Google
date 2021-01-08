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
                // "split": "9",
                "width":"420",
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
                "width":"800",
                "height":"350",
                "googleSheets": {}
            },
            {
                "key": "add-me",
                "type": "sub-heading",
                "value":"Add me",
                // "split": "3",
                "nestGroup":"schemas",
                "nestUnder":"A1",
                "nest":"B1",
                "width":"700",
                "height":"250",
                "googleSheets": {}
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
                "width":"700",
                "height":"250",
                "googleSheets": {}
            },

        ]
    },
]


export default website


