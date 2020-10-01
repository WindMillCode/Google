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
                "key": "authorize_button",
                "value": "Authorize",
                "type": "printfiles button",
                "printGroup":"drive",
                "split": "3",
                "left":"300",
                "googleSheets": {}
            },   
            {
                "key": "sign_button",
                "value": "Sign Out",
                "type": "button",
                "split": "3",
                "printGroup":"drive",
                // "left":"400",
                "googleSheets": {}
            },   
            {
                "key": "1_files",
                "value": "These are the files you choose",
                "printGroup":"drive",
                "multipleGroup":"drive",
                "type": "text",
                "next":"true",
                "split": "5",
                "left":450,
                "googleSheets": {}
            },      
            {
                "key": "2_files",
                "value": "None",
                "printGroup":"drive",
                "printGroupType":"replace",
                "type": "text",
                "next":"true",
                "split": "5",
                "left":450,
                "googleSheets": {}
            },   
            {
                "key": "3_files",
                "value": "None",
                "printGroup":"drive",
                "printGroupType":"replace",
                "type": "text",
                "next":"true",
                "split": "5",
                "left":450,
                "googleSheets": {}
            },    
            {
                "key": "4_files",
                "value": "None",
                "printGroup":"drive",
                "printGroupType":"replace",
                "type": "text",
                "next":"true",
                "split": "5",
                "left":450,
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


