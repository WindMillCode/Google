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
                "googleSheets": {}
            },
            {
                "key": "Heading",
                "value": "Realtime communication with WebRTC",
                "type": "title",
                "split": "9",
                // "width":"420",
                "googleSheets": {}
            },
            {
                "key": "localVideo",
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
                    item:"localVideo"
                }
            },
            {
                "key": "remoteVideo",
                "value": "",
                "type": "video",
                "nestGroup":"webRTC",
                "nestUnder":"A1",
                "nest":"B1",
                "options":{
                    "css":{
                        width:"inherit",
                        height:"300px"
                        // filter: "blur(20px) invert(1) opacity(0.5)"
                        // filter:"hue-rotate(180deg) saturate(200%);"
                    }
                },
                "split": "4",
                // "width":"420",
                // "height":500,
                "googleSheets": {},
                webRTC:{
                    item:"remoteVideo"
                }
            },
            {
                "key": "remoteVideoContainer",
                "value": "",
                "type": "div",
                "nestGroup":"webRTC",
                "nest":"A1",
                "options":{
                    "css":{
                        background:"purple",
                        overflow:"hidden"
                        // filter: "blur(20px) invert(1) opacity(0.5)"
                        // filter:"hue-rotate(180deg) saturate(200%);"
                    }
                },
                "split": "4",
                "width":"420",
                "height":300,
                "googleSheets": {},
                webRTC:{
                    item:"remoteVideo"
                }
            },


            {
                "key": "startButton",
                "value": "Start",
                "type": "button",

                "split": "3",
                // "width":"420",
                "googleSheets": {},
                webRTC:{
                    item:"startButton"
                }
            },
            {
                "key": "callButton",
                "value": "Call",
                "type": "button",

                "split": "3",
                // "width":"420",
                "googleSheets": {},
                webRTC:{
                    item:"callButton"
                }
            },
            {
                "key": "hangupButton",
                "value": "Hang Up",
                "type": "button",

                "split": "3",
                // "width":"420",
                "googleSheets": {},
                webRTC:{
                    item:"hangupButton"
                }
            },
            {
                "key": "error",
                "value": "",
                "type": "text",
                "split": "9",
                // "width":"420",
                "googleSheets": {}
            },


        ]
    },
    {
        "title": "webRTCText",
        "type_slug": "forms",
        "metafields": [

            {
                "key": "Body",
                "type": "body",
                "stack": "60",
                // "height":"1000",
                "background":"red",
                "googleSheets": {}
            },
            {
                "key": "Heading",
                "value": "webRTCText",
                "type": "title",
                "split": "9",
                // "width":"420",
                "googleSheets": {}
            },
            {
                "key": "dataChannelSend",
                "value": "Press Start, enter some text, then press Send.",
                "type": "textbox",
                "background":"white",
                "split": "5",
                // "width":"420",
                "height":300,
                "googleSheets": {},
                webRTC:{
                    item:"dataChannelSend"
                }
            },
            {
                "key": "dataChannelReceive",
                "value": "",
                "type": "textbox",
                "split": "4",
                "background":"white",
                // "width":"420",
                "height":300,
                "googleSheets": {},
                webRTC:{
                    item:"dataChannelReceive"
                }
            },
            {
                "key": "startButton",
                "value": "Start",
                "type": "button",

                "split": "3",
                // "width":"420",
                "googleSheets": {},
                webRTC:{
                    item:"startButton"
                }
            },
            {
                "key": "sendButton",
                "value": "Send",
                "type": "button",

                "split": "3",
                // "width":"420",
                "googleSheets": {},
                webRTC:{
                    item:"sendButton"
                }
            },
            {
                "key": "closeButton",
                "value": "Stop",
                "type": "button",

                "split": "3",
                // "width":"420",
                "googleSheets": {},
                webRTC:{
                    item:"closeButton"
                }
            },



        ]
    },
    {
        "title": "webRTCPhotos",
        "type_slug": "forms",
        "metafields": [

            {
                "key": "Body",
                "type": "body",
                "stack": "60",
                // "height":"1000",
                "background":"rgb(53,40,250)",
                "googleSheets": {}
            },
            {
                "key": "Heading",
                "value": "WebRTC Photos",
                "type": "title",
                "split": "9",
                // "width":"420",
                "googleSheets": {}
            },
            {
                "key": "url",
                "value": "Room URL: ...",
                "type": "text",
                "split": "5",
                // "width":"420",
                "height":300,
                "googleSheets": {},
                webRTC:{
                    item:"url"
                }
            },
            {
                "key": "camera",
                "value": "",
                "type": "video",
                "split": "5",
                // "width":"420",
                "height":300,
                "googleSheets": {},
                webRTC:{
                    item:"camera"
                }
            },
            {
                "key": "photo",
                "value": "",
                "type": "photo",
                "split": "4",
                "background":"white",
                // "width":"420",
                "height":300,
                "googleSheets": {},
                webRTC:{
                    item:"photo"
                }
            },
            {
                "key": "snap",
                "value": "Snap",
                "type": "button",

                "split": "3",
                // "width":"420",
                "googleSheets": {},
                webRTC:{
                    item:"snap"
                }
            },
            {
                "key": "send",
                "value": "Send",
                "type": "button",

                "split": "3",
                // "width":"420",
                "googleSheets": {},
                webRTC:{
                    item:"send"
                }
            },
            {
                "key": "snapAndSend",
                "value": "Snap &amp; Send",
                "type": "button",
                "split": "3",
                // "width":"420",
                "googleSheets": {},
                webRTC:{
                    item:"snapAndSend"
                }
            },
            {
                "key": "subtitle",
                "value": "Incoming Photos",
                "type": "subtitle",
                "split": "3",
                // "width":"420",
                "googleSheets": {},
            },
            {
                "key": "trail",
                "value": "",
                "type": "div",
                "split": "9",
                "background":"yellow",
                "next":"true",
                // "width":"420",
                "height":"500",
                options:{
                    css:{
                        "overflow":"auto",
                        "display":"flex",
                        "flex-direction":"column"
                    }
                },
                "googleSheets": {},
                webRTC:{
                    item:"trail"
                }
            },



        ]
    },
]


export default website


