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
                "background": "lightblue",
                "googleSheets": {}
            },
            {
                "key": "Heading",
                "value": "Welcome to the Drive Access Page",
                "type": "title",
                "split": "9",
                "googleSheets": {}
            },
            {
                "key": "playground",
                "type": "download button",
                "value": "Download",
                "split": "3",
                "left":"250",
                "googleSheets": {}
            },
            {
                "key": "signOut",
                "type": "sign out button",
                "split": "3",
                "left":"650",
                "googleSheets": {}
            }
        ]
    },
]



export default website


