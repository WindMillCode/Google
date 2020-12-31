import {environment as env} from 'src/environments/environment';

let website:any = {}


if(env.regularTables.default){
    website.convertCMS = [

        {
            "title": "present_drive_files",
            "type_slug": "forms",
            "metafields": [

                {
                    "key": "Body",
                    "type": "body",
                    "stack": "60",
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
                    "value": "Type in the name of the table to perform an action",
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
                    "type": "dataset button",
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
                    "fontSize":"40",
                    "height":"250",
                    "googleSheets": {}
                },
            ]
        },
    ]
}
else if(env.regularTables.IAM){
    website.convertCMS = [

        {
            "title": "present_drive_files",
            "type_slug": "forms",
            "metafields": [

                {
                    "key": "Body",
                    "type": "body",
                    "stack": "60",
                    "gap":"20",
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
                    "value": "Type in the name of the table to perform an action",
                    "type": "sub-heading",
                    "split": "9",
                    "text-align":"center",
                    "googleSheets": {}
                },
                {
                    "key": "Table-Answer",
                    "value": "",
                    "type": "input",
                    "border":"1px solid black",
                    "fontSize":"60",
                    "background":"white",
                    "split": "9",
                    "text-align":"center",
                    "googleSheets": {},
                },
                {
                    "key": "IAM",
                    "value": "Provide emails and roles if updating the table IAM, else press submit",
                    "type": "sub-heading",
                    "split": "9",
                    "text-align":"center",
                    "googleSheets": {},
                },
                {
                    "key": "email",
                    "value": "",
                    "type": "input",
                    "border":"1px solid black",
                    "fontSize":"60",
                    "multipleGroup": "email_type",
                    "background":"white",
                    "split": "5",
                    "text-align":"center",
                    "googleSheets": {},

                },
                {
                    "key": "types-email",
                    "value": "email type",
                    "type": "dropdown",
                    "multipleGroup": "email_type",
                    "form": {},
                    "next":"true",
                    "googleSheets": {},
                    "newline": [
                        "user",
                        "group",
                        "serviceAccount"
                    ],
                    "split":4,

                },
                {
                    "key": "f_o_r_m_Add",
                    "value": "Add another",
                    "type": "add button",
                    "next":"true",
                    "left":300,
                    "multipleGroup": "email_type",
                    "googleSheets": {}
                },
                {
                    "key": "f_o_r_m_Remove",
                    "value": "Remove",
                    "type": "remove button",
                    "left":700,
                    "multipleGroup": "email_type",
                    "googleSheets": {}
                },
                {
                    "key": "Submit",
                    "type": "regularTables button",
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
                    "fontSize":"40",
                    "height":"250",
                    "googleSheets": {}
                },
            ]
        },
    ]
}



export default website


