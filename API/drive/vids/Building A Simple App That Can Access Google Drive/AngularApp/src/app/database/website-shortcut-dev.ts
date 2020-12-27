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
                "key": "upload",
                "type": "shortcut button",
                "value":"Create A Shortcut",
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
            },
            {
                "key": "Upload",
                "type": "file button",
                "value":"Upload",
                "next":"true",
                // "split": "3",
                "height":"250",
                "googleSheets": {}
            },
        ]
    },
]

website["google-sheets"] = [
    {
        "key": "subsheet1",
        "value": "Primary rental application data"
    },
    {
        "key": "subsheet2",
        "value": "Household members"
    },
    {
        "key": "subsheet3",
        "value": "Household employers"
    },
    {
        "key": "subsheet4",
        "value": "Household cars"
    }
]

website["google-sheets-mapping"] = {
    "subsheet1": "Primary rental application data",
    "subsheet2": "Household members",
    "subsheet3": "Household employers",
    "subsheet4": "Household cars",
}



website["extra_mapping"]  = {
   "applicantID": [
    {
        "key": "Primary rental application data",
        "value":[
            [
                "field",
                "AID"
            ],
            [
                "value",
                "10000"
            ],
            [
                "type",
                "source"
            ]
        ]
    },
    {
        "key": "Household members",
        "value":[
            [
                "field",
                "Application ID"
            ],
            [
                "type",
                "count"
            ],
            [
                "value",
                "10001"
            ]
        ]
    },
    {
        "key": "Household employers",
        "value": [
            [
                "field",
                "Application ID"
            ],
            [
                "type",
                "count"
            ],
            [
                "value",
                "10001"
            ]
        ]
    },
    {
        "key": "Household cars",
        "value": [
            [
                "field",
                "Application ID"
            ],
            [
                "type",
                "count"
            ],
            [
                "value",
                "10001"
            ]
        ]
    },
    {
        "key": "default value",
        "value": "10001" // use objects next time :))
    }
    ],
    "memberID": [
        {
            "key": "Household members",
            "value":[
                [
                    "field",
                    "Member ID"
                ],
                [
                    "type",
                    "count"
                ],
                [
                    "type",
                    "add 1"
                ],
                [
                    "value",
                    "1"
                ]
            ]
        },
        {
            "key": "Household employers",
            "value": [
                [
                    "field",
                    "Member ID"
                ],
                [
                    "type",
                    "count"
                ],
                [
                    "type",
                    "add 1"
                ],
                [
                    "value",
                    "1"
                ]
            ]
        },
        {
            "key": "Household cars",
            "value": [
                [
                    "field",
                    "Car ID"
                ],
                [
                    "type",
                    "count"
                ],
                [
                    "type",
                    "add 1"
                ],
                [
                    "value",
                    "1"
                ]
            ]
        },
        {
            "key": "default value",
            "value": "1" // use objects next time :))
        }
    ]

}

export default website


