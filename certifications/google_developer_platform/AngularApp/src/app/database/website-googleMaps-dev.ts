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
                "googleSheets": {}
            },
            {
                "key": "Heading",
                "value": "Visualize data on Google Maps Platform",
                "type": "title",
                "split": "9",
                // "width":"420",
                "googleSheets": {}
            },
            {
                "key": "google-map",
                "value": "",
                "type": "googleMaps div",
                "split": "9",
                // "width":"420",
                "height":500,
                "googleSheets": {}
            },
            {
                "key": "error",
                "value": "",
                "type": "text",
                "split": "9",
                // "width":"420",
                "height":500,
                "googleSheets": {}
            },


        ]
    },
]


export default website


