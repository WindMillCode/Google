import {objectCopy} from '../customExports'

let website:any = {}
let beforeItems  = [{
	"key": "before-text",
	type:"div",
	"value":"Before Items",
	"split": "3",
	"height":"100",
	options:{
		css:{
			"background-color": `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`
		}
	},
	"googleSheets": {},
},
{
	"key": "before-text",
	type:"date",
	"value":"Before Items",
	"split": "3",
	// "height":"1",
	"googleSheets": {},
},
{
	"key": "before-text",
	type:"input",
	"value":"Before Items",
	"split": "3",
	options:{
		css:{
			"background-color": `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`
		}
	},
	// "height":"1",
	"googleSheets": {},
},
{
	"key": "before-text",
	// "type": "gsap-cursor",
	type:"bullet point",
	"value":"Before Items",
	"split": "3",
	// "height":"1",
	"googleSheets": {},
}].slice((Math.random()*3)+1)
let afterItems  = [{
	"key": "after-text",
	type:"div",
	"value":"after Items",
	"split": "3",
	"next":"true",
	"height":"100",
	options:{
		css:{
			"background-color": `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`
		}
	},
	"googleSheets": {},
},
{
	"key": "after-text",
	type:"date",
	"value":"after Items",
	"split": "3",
	// "height":"1",
	"googleSheets": {},
},
{
	"key": "after-text",
	type:"input",
	"value":"after Items",
	"split": "3",
	options:{
		css:{
			"background-color": `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`
		}
	},
	// "height":"1",
	"googleSheets": {},
},
{
	"key": "after-text",
	// "type": "gsap-cursor",
	type:"bullet point",
	"value":"after Items",
	"split": "3",
	// "height":"1",
	"googleSheets": {},
}]
let betweenItems  = [{
	"key": "between-text",
	type:"div",
	"value":"between Items",
	"split": "3",
	"next":"true",
	"height":"100",
	options:{
		css:{
			"background-color": `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`
		}
	},
	"googleSheets": {},
},
{
	"key": "between-text",
	type:"date",
	"value":"between Items",
	"split": "3",
	// "height":"1",
	"googleSheets": {},
},
{
	"key": "between-text",
	type:"input",
	"value":"between Items",
	"split": "3",
	options:{
		css:{
			"background-color": `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`
		}
	},
	// "height":"1",
	"googleSheets": {},
},
{
	"key": "between-text",
	// "type": "gsap-cursor",
	type:"bullet point",
	"value":"between Items",
	"split": "3",
	// "height":"1",
	"googleSheets": {},
}]
let group1 = [
	{
		"key": "my-input-counter",
		"type": "count",
		"value":"3.",
		delta:{
			"group":"outerDelta"
		},
		"split": "1",
		"googleSheets": {},
	},
	{
		"key": "my-input",
		"type": "textbox",
		"value":"setup",
		delta:{
			"group":"outerDelta"
		},
		"googleSheets": {},

	},
	{
		"key": "my-div",
		"type": "div",
		"value":"",
		"next":"true",
		delta:{
			"group":"outerDelta"
		},
		options:{
			css:{
				border:"30px dotted rgb(221,101,7)"
			}
		},
		"left":"400",
		"split": "3",
		"height":"250",
		"googleSheets": {},

	},
	{
		"key": "my-div",
		"type": "div",
		"value":"",
		delta:{
			"group":"outerDelta"
		},
		options:{
			css:{
				border:"30px dotted rgb(121,101,117)"
			}
		},
		"left":"800",
		"split": "5",
		"height":"150",
		"googleSheets": {},

	},
]
let group2 = [
	{
		"key": "my-input-counter",
		"type": "count",
		"value":"1.",
		delta:{
			"group":"outerDelta"
		},
		"split": "1",
		"googleSheets": {},
		"options":{
			"css":{
			}
		}
	},
	{
		"key": "my-input",
		"type": "textbox",
		"value":"setup",
		delta:{
			"group":"outerDelta"
		},
		"googleSheets": {},

	},
	{
		"key": "my-div",
		"type": "div",
		"value":"",
		"next":"true",
		delta:{
			"group":"outerDelta"
		},
		options:{
			css:{
				border:"20px dashed rgb(21,121,227)"
			}
		},
		"left":"400",
		"split": "3",
		"height":"250",
		"googleSheets": {},

	},
	{
		"key": "my-div",
		"type": "div",
		"value":"",
		delta:{
			"group":"outerDelta"
		},
		options:{
			css:{
				border:"20px dashed rgb(221,161,217)"
			}
		},
		"left":"800",
		"split": "2",
		"height":"150",
		"googleSheets": {},

	},
]
let controls = [            {
	"key": "add",
	"type": "button",
	"value":"Add ",
	delta:{
		"group":"outerDelta",
		"type":"add",
		"by":"1"
	},
	"split": "3",
	"googleSheets": {},
},
{
	"key": "remove",
	"type": "button",
	"value":"Remove",
	delta:{
		"group":"outerDelta",
		"type":"remove",
		"by":"1"
	},
	"split": "6",
	"googleSheets": {},
},]

let secondOuterDelta = [
	{
		"key": "my-input-counter",
		"type": "count",
		"value":"3.",
		"next":"true",
		delta:{
			"group":"secondOuterDelta"
		},
		"split": "1",
		"googleSheets": {},
		"options":{
			"css":{
			}
		}
	},
	{
		"key": "my-input",
		"type": "textbox",
		"value":"setup",
		delta:{
			"group":"secondOuterDelta"
		},
		"googleSheets": {},

	},
	{
		"key": "my-div",
		"type": "div",
		"value":"",
		"next":"true",
		delta:{
			"group":"secondOuterDelta"
		},
		options:{
			css:{
				border:"30px dotted rgb(221,101,7)"
			}
		},
		"left":"400",
		"split": "3",
		"height":"250",
		"googleSheets": {},

	},
	{
		"key": "my-div",
		"type": "div",
		"value":"",
		delta:{
			"group":"secondOuterDelta"
		},
		options:{
			css:{
				border:"30px dotted rgb(121,101,117)"
			}
		},
		"left":"800",
		"split": "2",
		"height":"150",
		"googleSheets": {},

	},

	{
		"key": "add",
		"type": "button",
		"value":"Add ",
		delta:{
			"group":"secondOuterDelta",
			"type":"add",
			"by":"1"
		},
		"next":"true",
		"split": "2",
		"googleSheets": {},
	},
	{
		"key": "remove",
		"type": "button",
		"value":"Remove",
		delta:{
			"group":"secondOuterDelta",
			"type":"remove",
			"by":"1"
		},
		"split": "3",
		"googleSheets": {},
	},
]

//
let nesting_development =  {
	"title": "nesting_development",
	"type_slug": "forms",
	"metafields": [

		{
			"key": "Body",
			"type": "body",
			"stack": "60",
			// "height":"1000",
			delta:{
				"group":[
					{
						name:"innerDelta",
						type:"add_remove_button"
					}
				],
			},
			nest:{
				"group":[
					{
						name:"webRTC",
						type:"regular"
					},
					{
						name:"schemas",
						type:"regular"
					}
				],
			},
			"background": "rgb(155, 9, 104)",
			"googleSheets": {},
			options:{
				css:{
					"clip-path":"polygon(100% 0%, 0% 0%, 0% 99%, 38% 28%, 68% 67%)"
				}
			}
		},





		{
			"key": "localVideo",
			"value": "",
			"type": "video",
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
			"nest":{
				group:"webRTC",
				name:"B1",
				under:"A1"
			},
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
			"nest":{
				group:"webRTC",
				name:"A1",
				// under:null
			},
			"options":{
				"css":{
					background:"purple",
					overflow:"hidden"
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
			"next":"true",
			"split": "3",
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
			"googleSheets": {},
			webRTC:{
				item:"hangupButton"
			}
		},
		{
			"key": "Choose-Schema",
			"type": "div",
			"value":"",
			"background":"yellow",
			"nest":{
				group:"schemas",
				name:"A1",
				// under:null
			},
			"width":"1600",
			"height":"700",
			"googleSheets": {},
			"options":{
				"css":{
					display:"flex",
					"flex-direction":"row",
					"justify-content":"space-around",
					"align-items":"flex-start",
					"flex-wrap":"wrap"
				}
			}
		},
		{
			"key": "add-me",
			"type": "sub-heading",
			"value":"Add me",
			// "split": "3",
			"nest":{
				group:"schemas",
				name:"B1",
				under:"A1"
			},
			// "height":"250",
			"googleSheets": {},
			"text-align":"center",
			"options":{
				"css":{
					"justify-self":"center",

					// "flex-grow":"10",
					"width":"100%"
					// "flex-basis":"500px"
				}
			}
		},
		{
		    "key": "my-table",
		    "type": "simpleTable",
		    "value":"",
			"nest":{
				group:"schemas",
				name:"B1",
				under:"A1"
				// under:null
			},
		    "background":"blue",
		    // "split": "3",
		    // "width":"300",
		    // "height":"250",
		    "googleSheets": {},
		    "options":{
		        "css":{
		            // "justify-self":"flex-start",
		            // "flex-grow":"1"
		            "height":"300px",
		            "width":"400px",
		            "order":1
		        }
		    }
		},
		{
			"key": "my-counter",
			"type": "count",
			"value":"1.",

			delta:{
				"group":"innerDelta",
			},
			nest:{
				group:"schemas",
				name:"D1",
				under:"C1"
			},

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
			nest:{
				group:"schemas",
				name:"D2",
				under:"C1"
			},
			delta:{
				"group":"innerDelta",
			},
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
			delta:{
				"group":"innerDelta",
			},
			nest:{
				group:"schemas",
				name:"C1",
				under:"B3"
			},
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
			"key": "inner-add",
			"type": "button",
			"value":"Add Another",

			delta:{
				"group":"innerDelta",
				type:"add",
				by:"1"
			},
			nest:{
				group:"schemas",
				name:"C2",
				under:"B3"
			},

			"split": "3",
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
			"key": "inner-remove",
			"type": "button",
			"value":"Remove Another",
			delta:{
				"group":"innerDelta",
				type:"remove",
				by:"1"
			},
			nest:{
				group:"schemas",
				name:"C3",
				under:"B3"
			},
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
			"key": "input-container",
			"type": "div",
			"value":"",
			"background":"cyan",
			// "split": "3",
			nest:{
				group:"schemas",
				name:"B3",
				under:"A1"
			},
			// "width":"1200",
			"height":"350",
			"googleSheets": {},
			"options":{
				"css":{
					order:2,
					// "width":"75%",
					"width":"800px",
					"height":"300px",
					display:"flex",
					"flex-direction":"column",
					"justify-content":"space-between",
					// "flex-wrap":"wrap"
				}
			}
		},

	] .map((x:any,i)=>{
		x.key += "-nested-multiple"
		return x
	})
}
let  nesting_and_duplicate_development =     {
	"title": "development",
	"type_slug": "forms",
	"metafields": [

		{
			"key": "Body",
			"type": "body",
			"stack": "60",
			// "height":"1000",
			delta:{
				"group":[
					{
						name:"outerDelta",
						type:"add_remove_button"
					},
					{
						name:"secondOuterDelta",
						type:"add_remove_button"
					},
					{
						name:"innerDelta",
						type:"add_remove_button"
					}
				],
			},
			nest:{
				"group":[
					{
						name:"webRTC",
						type:"regular"
					},
					{
						name:"schemas",
						type:"regular"
					}
				],
			},
			"background": "rgb(155, 9, 104)",
			"googleSheets": {},
			options:{
				css:{
					"clip-path":"polygon(100% 0%, 0% 0%, 0% 99%, 38% 28%, 68% 67%)"
				}
			}
		},
		{
			"key": "my-cursor",
			// "type": "gsap-cursor",
			type:"text",
			// "value":"Items",
			// "split": "3",
			gsapCusor:{
				"group":"a",
				"copyPath":"true",

			},
			"height":"1",
			"width":"1",
			options:{
				css:{
					height:"200px"
				}
			},
			"googleSheets": {},
		},
		{
			"key": "my-input-counter",
			"type": "count",
			"value":"3.",
			"next":"true",
			delta:{
				"group":"outerDelta"
			},
			"split": "1",
			"googleSheets": {},
			"options":{
				"css":{
				}
			}
		},
		{
			"key": "my-input",
			"type": "textbox",
			"value":"setup",
			delta:{
				"group":"outerDelta"
			},
			"googleSheets": {},

		},
		{
			"key": "my-div",
			"type": "div",
			"value":"",
			"next":"true",
			delta:{
				"group":"outerDelta"
			},
			options:{
				css:{
					border:"30px dotted rgb(221,101,7)"
				}
			},
			"left":"400",
			"split": "3",
			"height":"250",
			"googleSheets": {},

		},
		{
			"key": "my-div",
			"type": "div",
			"value":"",
			delta:{
				"group":"outerDelta"
			},
			options:{
				css:{
					border:"30px dotted rgb(121,101,117)"
				}
			},
			"left":"800",
			"split": "2",
			"height":"150",
			"googleSheets": {},

		},

		{
			"key": "add",
			"type": "button",
			"value":"Add ",
			delta:{
				"group":"outerDelta",
				"type":"add",
				"by":"1"
			},
			"next":"true",
			"split": "2",
			"googleSheets": {},
		},
		{
			"key": "remove",
			"type": "button",
			"value":"Remove",
			delta:{
				"group":"outerDelta",
				"type":"remove",
				"by":"1"
			},
			"split": "3",
			"googleSheets": {},
		},
		{
			"key": "more-text",
			"type": "text",
			"value":"More Items",
			"split": "3",
			"height":"250",
			"fontSize":72,
			"googleSheets": {},
		},

		{
			"key": "my-input-counter",
			"type": "count",
			"value":"2.",
			"next":"true",
			delta:{
				"group":"outerDelta"
			},
			"split": "1",
			"googleSheets": {},
			"options":{
				"css":{
				}
			}
		},
		{
			"key": "my-input",
			"type": "textbox",
			"value":"setup",
			delta:{
				"group":"outerDelta"
			},
			"googleSheets": {},

		},
		{
			"key": "my-div",
			"type": "div",
			"value":"",
			delta:{
				"group":"outerDelta"
			},
			options:{
				css:{
					border:"20px dashed rgb(54,104,254)"
				}
			},
			"next":"true",
			"left":"400",
			"split": "3",
			"height":"250",
			"googleSheets": {},

		},
		{
			"key": "my-div",
			"type": "div",
			"value":"",
			delta:{
				"group":"outerDelta"
			},
			options:{
				css:{
					border:"20px dashed rgb(176,167,79)"
				}
			},

			"left":"800",
			"split": "2",
			"height":"150",
			"googleSheets": {},

		},
		{
			"key": "localVideo",
			"value": "",
			"type": "video",
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
			"nest":{
				group:"webRTC",
				name:"B1",
				under:"A1"
			},
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
			"nest":{
				group:"webRTC",
				name:"A1",
				// under:null
			},
			"options":{
				"css":{
					background:"purple",
					overflow:"hidden"
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
		...secondOuterDelta,
		{
			"key": "startButton",
			"value": "Start",
			"type": "button",
			"next":"true",
			"split": "3",
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
			"googleSheets": {},
			webRTC:{
				item:"hangupButton"
			}
		},
		{
			"key": "Choose-Schema",
			"type": "div",
			"value":"",
			"background":"yellow",
			"nest":{
				group:"schemas",
				name:"A1",
				// under:null
			},
			"width":"1600",
			"height":"700",
			"googleSheets": {},
			"options":{
				"css":{
					display:"flex",
					"flex-direction":"row",
					"justify-content":"space-around",
					"align-items":"flex-start",
					"flex-wrap":"wrap"
				}
			}
		},
		{
			"key": "add-me",
			"type": "sub-heading",
			"value":"Add me",
			// "split": "3",
			"nest":{
				group:"schemas",
				name:"B1",
				under:"A1"
			},
			// "height":"250",
			"googleSheets": {},
			"text-align":"center",
			"options":{
				"css":{
					"justify-self":"center",

					// "flex-grow":"10",
					"width":"100%"
					// "flex-basis":"500px"
				}
			}
		},
		{
		    "key": "my-table",
		    "type": "simpleTable",
		    "value":"",
			"nest":{
				group:"schemas",
				name:"B1",
				under:"A1"
				// under:null
			},
		    "background":"blue",
		    // "split": "3",
		    // "width":"300",
		    // "height":"250",
		    "googleSheets": {},
		    "options":{
		        "css":{
		            // "justify-self":"flex-start",
		            // "flex-grow":"1"
		            "height":"300px",
		            "width":"400px",
		            "order":1
		        }
		    }
		},
		{
			"key": "my-counter",
			"type": "count",
			"value":"1.",

			delta:{
				"group":"innerDelta",
			},
			nest:{
				group:"schemas",
				name:"D1",
				under:"C1"
			},

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
			nest:{
				group:"schemas",
				name:"D2",
				under:"C1"
			},
			delta:{
				"group":"innerDelta",
			},
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
			delta:{
				"group":"innerDelta",
			},
			nest:{
				group:"schemas",
				name:"C1",
				under:"B3"
			},
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
					"overflow":"visible"
					// "justify-content":"space-between",
					// "flex-wrap":"wrap"
				}
			}
		},
		{
			"key": "inner-add",
			"type": "button",
			"value":"Add Another",

			delta:{
				"group":"innerDelta",
				type:"add",
				by:"1"
			},
			nest:{
				group:"schemas",
				name:"C2",
				under:"B3"
			},

			"split": "3",
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
			"key": "inner-remove",
			"type": "button",
			"value":"Remove Another",
			delta:{
				"group":"innerDelta",
				type:"remove",
				by:"1"
			},
			nest:{
				group:"schemas",
				name:"C3",
				under:"B3"
			},
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
			"key": "input-container",
			"type": "div",
			"value":"",
			"background":"cyan",
			// "split": "3",
			nest:{
				group:"schemas",
				name:"B3",
				under:"A1"
			},
			// "width":"1200",
			"height":"350",
			"googleSheets": {},
			"options":{
				"css":{
					order:2,
					// "width":"75%",
					"width":"800px",
					"height":"300px",
					display:"flex",
					"flex-direction":"column",
					"justify-content":"space-between",
					// "flex-wrap":"wrap"
				}
			}
		}





	] .map((x:any,i)=>{
		x.key += "-nested-duplicate-multiple"
		return x
	})
}



let nesting_and_duplicate_testing =  [

    nesting_and_duplicate_development,
    {
        "title": "error indicator",
        "type_slug": "forms",
        "metafields": [

            {
                "key": "Body",
                "type": "body",
                "stack": "60",
				// "height":"1000",
				delta:{
				},
                // "background": "rgb(155, 9, 104)",
				"googleSheets": {},
				options:{
					css:{
						// "background-color": `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`,
						// "clip-path":"polygon(100% 0%, 0% 0%, 0% 99%, 38% 28%, 68% 67%)"
					}
                }
			},
            {
                "key": "my-indicator",
				type:"text",
                "value":"No errors",
				"split": "3",
				options:{
					css:{
						height:"200px",
						color:"black"
					}
				},
                "googleSheets": {},
			},
			{
                "key": "my-indicator-message",
				type:"text",
                "value":"UPDATE",
				"split": "9",
				options:{
					css:{
						height:"200px",
						color:"black"
					}
				},
                "googleSheets": {},
			},




        ]
	},
    {
        "title": "before controls",
        "type_slug": "forms",
        "metafields": [

            {
                "key": "Body",
                "type": "body",
                "stack": "60",
				// "height":"1000",
				delta:{
					"group":[
						{
							name:"outerDelta",
							type:"add_remove_button"
						}
					],
				},
                // "background": "rgb(155, 9, 104)",
				"googleSheets": {},
				options:{
					css:{
						"background-color": `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`,
						"clip-path":"polygon(100% 0%, 0% 0%, 0% 99%, 38% 28%, 68% 67%)"
					}
                }
			},

            ...group1,

            {
                "key": "add",
                "type": "button",
                "value":"Add ",
				delta:{
					"group":"outerDelta",
					"type":"add",
					"by":"1"
				},
                "next":"true",
                "split": "3",
                "googleSheets": {},
            },
            {
                "key": "remove",
                "type": "button",
                "value":"Remove",
				delta:{
					"group":"outerDelta",
					"type":"remove",
					"by":"1"
				},
                "split": "3",
                "googleSheets": {},
			},



        ] .map((x:any,i)=>{
			x.key += "-before-controls"
			return x
		})
	},
    {
        "title": "around controls",
        "type_slug": "forms",
        "metafields": [

            {
                "key": "Body",
                "type": "body",
                "stack": "60",
				// "height":"1000",
				delta:{
					"group":[
						{
							name:"outerDelta",
							type:"add_remove_button"
						}
					],
				},

				"googleSheets": {},
				options:{
					css:{
						"background-color": `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`,
						"clip-path":"polygon(100% 0%, 0% 0%, 0% 99%, 38% 28%, 68% 67%)"
					}
                }
			},
			...group1,

			...controls,
			...[
				{
					"key": "my-input-counter",
					"type": "count",
					"value":"1.",
					delta:{
						"group":"outerDelta"
					},
					"split": "1",
					"googleSheets": {},
					"options":{
						"css":{
						}
					}
				},
				{
					"key": "my-input",
					"type": "textbox",
					"value":"setup",
					delta:{
						"group":"outerDelta"
					},
					"googleSheets": {},

				},
				{
					"key": "my-div",
					"type": "div",
					"value":"",
					"next":"true",
					delta:{
						"group":"outerDelta"
					},
					options:{
						css:{
							border:"20px dashed rgb(21,121,227)"
						}
					},
					"left":"400",
					"split": "3",
					"height":"250",
					"googleSheets": {},

				},
				{
					"key": "my-div",
					"type": "div",
					"value":"",
					delta:{
						"group":"outerDelta"
					},
					options:{
						css:{
							border:"20px dashed rgb(221,161,217)",
							"margin-top":"-80px"
						}
					},

					"left":"800",
					"split": "2",
					"height":"150",
					"googleSheets": {},

				},
			]





        ] .map((x:any,i)=>{
			x.key += "-around-controls"
			return x
		})
    },
    {
        "title": "after controls",
        "type_slug": "forms",
        "metafields": [

            {
                "key": "Body",
                "type": "body",
                "stack": "60",
				// "height":"1000",
				delta:{
					"group":[
						{
							name:"outerDelta",
							type:"add_remove_button"
						}
					],
				},

				"googleSheets": {},
				options:{
					css:{
						"background-color": `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`,
						"clip-path":"polygon(100% 0%, 0% 0%, 0% 99%, 38% 28%, 68% 67%)"
					}
                }
			},

           ...controls,
		   ...group1






        ] .map((x:any,i)=>{
			x.key += "-after-controls"
			return x
		})
	},

    {
        "title": "before contols  with items before",
        "type_slug": "forms",
        "metafields": [

            {
                "key": "Body",
                "type": "body",
                "stack": "60",
				// "height":"1000",
				delta:{
					"group":[
						{
							name:"outerDelta",
							type:"add_remove_button"
						}
					],
				},
                // "background": "rgb(155, 9, 104)",
				"googleSheets": {},
				options:{
					css:{
						"background-color": `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`,
						"clip-path":"polygon(100% 0%, 0% 0%, 0% 99%, 38% 28%, 68% 67%)"
					}
                }
			},
			...beforeItems,
            {
                "key": "my-input-counter",
                "type": "text",
				"value":"1.",
				"next":"true", //mabye math.random see what it can do
				delta:{
					"group":"outerDelta"
				},
                "split": "9",
                "googleSheets": {},
                "options":{
                    "css":{
                    }
                }
			},
            ...group1,
			...controls


        ] .map((x:any,i)=>{
			x.key += "-before-controls-items-before"
			return x
		})
	},
    {
        "title": "around controls with items before",
        "type_slug": "forms",
        "metafields": [

            {
                "key": "Body",
                "type": "body",
                "stack": "60",
				// "height":"1000",
				delta:{
					"group":[
						{
							name:"outerDelta",
							type:"add_remove_button"
						}
					],
				},

				"googleSheets": {},
				options:{
					css:{
						"background-color": `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`,
						"clip-path":"polygon(100% 0%, 0% 0%, 0% 99%, 38% 28%, 68% 67%)"
					}
                }
			},
			...beforeItems,
            {
                "key": "my-input-counter",
                "type": "count",
				"value":"1.",
				"next":"true", //mabye math.random see what it can do
				delta:{
					"group":"outerDelta"
				},
                "split": "1",
                "googleSheets": {},
                "options":{
                    "css":{
                    }
                }
			},
            {
                "key": "my-input",
                "type": "textbox",
                "value":"setup",
				delta:{
					"group":"outerDelta"
				},
                "googleSheets": {},

			},
            {
                "key": "my-div",
                "type": "div",
				"value":"",
				"next":"true",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"20px dashed rgb(21,121,227)"
					}
				},
				"left":"400",
                "split": "3",
                "height":"250",
                "googleSheets": {},

			},
			{
                "key": "my-div",
                "type": "div",
                "value":"",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"20px dashed rgb(221,161,217)"
					}
				},
				"left":"800",
                "split": "2",
                "height":"150",
                "googleSheets": {},

			},

            {
                "key": "add",
                "type": "button",
                "value":"Add ",
				delta:{
					"group":"outerDelta",
					"type":"add",
					"by":"1"
				},
				next:"true",
                "split": "3",
                "googleSheets": {},
            },
            {
                "key": "remove",
                "type": "button",
                "value":"Remove",
				delta:{
					"group":"outerDelta",
					"type":"remove",
					"by":"1"
				},
                // "nestGroup":"view",
                // "nestUnder":"A1",
                // "nest":"B4",
                "split": "3",
                // "width":"300",
                // "height":"250",
                "googleSheets": {},
			},

            {
                "key": "my-input-counter",
                "type": "count",
				"value":"3.",
				"next":"true",
				delta:{
					"group":"outerDelta"
				},
                "split": "1",
                "googleSheets": {},
                "options":{
                    "css":{
                    }
                }
			},
            {
                "key": "my-input",
                "type": "textbox",
                "value":"setup",
				delta:{
					"group":"outerDelta"
				},
                "googleSheets": {},

			},
            {
                "key": "my-div",
                "type": "div",
				"value":"",
				"next":"true",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"30px dotted rgb(221,101,7)"
					}
				},
				"left":"400",
                "split": "3",
                "height":"250",
                "googleSheets": {},

			},
			{
                "key": "my-div",
                "type": "div",
                "value":"",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"30px dotted rgb(121,101,117)"
					}
				},
				"left":"800",
                "split": "2",
                "height":"150",
                "googleSheets": {},

			},





        ] .map((x:any,i)=>{
			x.key += "-around-controls-items-before"
			return x
		})
	},
	{
        "title": "after controls items before",
        "type_slug": "forms",
        "metafields": [

            {
                "key": "Body",
                "type": "body",
                "stack": "60",
				// "height":"1000",
				delta:{
					"group":[
						{
							name:"outerDelta",
							type:"add_remove_button"
						}
					],
				},

				"googleSheets": {},
				options:{
					css:{
						"background-color": `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`,
						"clip-path":"polygon(100% 0%, 0% 0%, 0% 99%, 38% 28%, 68% 67%)"
					}
                }
			},
			...beforeItems,
            {
                "key": "add",
                "type": "button",
				"value":"Add ",
				"next":"true",
				delta:{
					"group":"outerDelta",
					"type":"add",
					"by":"1"
				},
                "split": "3",
                "googleSheets": {},
            },
            {
                "key": "remove",
                "type": "button",
                "value":"Remove",
				delta:{
					"group":"outerDelta",
					"type":"remove",
					"by":"1"
				},
                // "nestGroup":"view",
                // "nestUnder":"A1",
                // "nest":"B4",
                "split": "3",
                // "width":"300",
                // "height":"250",
                "googleSheets": {},
			},

            {
                "key": "my-input-counter",
                "type": "count",
				"value":"3.",
				"next":"true",
				delta:{
					"group":"outerDelta"
				},
                "split": "1",
                "googleSheets": {},
                "options":{
                    "css":{
                    }
                }
			},
            {
                "key": "my-input",
                "type": "textbox",
                "value":"setup",
				delta:{
					"group":"outerDelta"
				},
                "googleSheets": {},

			},
            {
                "key": "my-div",
                "type": "div",
				"value":"",
				"next":"true",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"30px dotted rgb(221,101,7)"
					}
				},
				"left":"400",
                "split": "3",
                "height":"250",
                "googleSheets": {},

			},
			{
                "key": "my-div",
                "type": "div",
                "value":"",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"30px dotted rgb(121,101,117)"
					}
				},
				"left":"800",
                "split": "2",
                "height":"150",
                "googleSheets": {},

			},





        ] .map((x:any,i)=>{
			x.key += "-after-controls-items-before"
			return x
		})
	},

    {
        "title": "before contols  with items after",
        "type_slug": "forms",
        "metafields": [

            {
                "key": "Body",
                "type": "body",
                "stack": "60",
				// "height":"1000",
				delta:{
					"group":[
						{
							name:"outerDelta",
							type:"add_remove_button"
						}
					],
				},
                // "background": "rgb(155, 9, 104)",
				"googleSheets": {},
				options:{
					css:{
						"background-color": `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`,
						"clip-path":"polygon(100% 0%, 0% 0%, 0% 99%, 38% 28%, 68% 67%)"
					}
                }
			},

            {
                "key": "my-input-counter",
				"type": "count",
				"value":"3.",
				delta:{
					"group":"outerDelta"
				},
                "split": "1",
                "googleSheets": {},
			},
            {
                "key": "my-input",
                "type": "textbox",
                "value":"setup",
				delta:{
					"group":"outerDelta"
				},
                "googleSheets": {},

			},
            {
                "key": "my-div",
                "type": "div",
				"value":"",
				"next":"true",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"30px dotted rgb(221,101,7)"
					}
				},
				"left":"400",
                "split": "3",
                "height":"250",
                "googleSheets": {},

			},
			{
                "key": "my-div",
                "type": "div",
                "value":"",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"30px dotted rgb(121,101,117)"
					}
				},
				"left":"800",
                "split": "2",
                "height":"150",
                "googleSheets": {},

			},

            {
                "key": "add",
                "type": "button",
                "value":"Add ",
				delta:{
					"group":"outerDelta",
					"type":"add",
					"by":"1"
				},
                "next":"true",
                "split": "3",
                "googleSheets": {},
            },
            {
                "key": "remove",
                "type": "button",
                "value":"Remove",
				delta:{
					"group":"outerDelta",
					"type":"remove",
					"by":"1"
				},
                "split": "3",
                "googleSheets": {},
			},
			...afterItems,


        ] .map((x:any,i)=>{
			x.key += "-before-controls-items-after"
			return x
		})
	},
    {
        "title": "around controls with items after",
        "type_slug": "forms",
        "metafields": [

            {
                "key": "Body",
                "type": "body",
                "stack": "60",
				// "height":"1000",
				delta:{
					"group":[
						{
							name:"outerDelta",
							type:"add_remove_button"
						}
					],
				},

				"googleSheets": {},
				options:{
					css:{
						"background-color": `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`,
						"clip-path":"polygon(100% 0%, 0% 0%, 0% 99%, 38% 28%, 68% 67%)"
					}
                }
			},
            {
                "key": "my-input-counter",
                "type": "count",
				"value":"1.",
				delta:{
					"group":"outerDelta"
				},
                "split": "1",
                "googleSheets": {},
                "options":{
                    "css":{
                    }
                }
			},
            {
                "key": "my-input",
                "type": "textbox",
                "value":"setup",
				delta:{
					"group":"outerDelta"
				},
                "googleSheets": {},

			},
            {
                "key": "my-div",
                "type": "div",
				"value":"",
				"next":"true",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"20px dashed rgb(21,121,227)"
					}
				},
				"left":"400",
                "split": "3",
                "height":"250",
                "googleSheets": {},

			},
			{
                "key": "my-div",
                "type": "div",
                "value":"",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"20px dashed rgb(221,161,217)"
					}
				},
				"left":"800",
                "split": "2",
                "height":"150",
                "googleSheets": {},

			},

            {
                "key": "add",
                "type": "button",
                "value":"Add ",
				delta:{
					"group":"outerDelta",
					"type":"add",
					"by":"1"
				},
				next:"true",
                "split": "3",
                "googleSheets": {},
            },
            {
                "key": "remove",
                "type": "button",
                "value":"Remove",
				delta:{
					"group":"outerDelta",
					"type":"remove",
					"by":"1"
				},
                // "nestGroup":"view",
                // "nestUnder":"A1",
                // "nest":"B4",
                "split": "3",
                // "width":"300",
                // "height":"250",
                "googleSheets": {},
			},

            {
                "key": "my-input-counter",
                "type": "count",
				"value":"3.",
				"next":"true",
				delta:{
					"group":"outerDelta"
				},
                "split": "1",
                "googleSheets": {},
                "options":{
                    "css":{
                    }
                }
			},
            {
                "key": "my-input",
                "type": "textbox",
                "value":"setup",
				delta:{
					"group":"outerDelta"
				},
                "googleSheets": {},

			},
            {
                "key": "my-div",
                "type": "div",
				"value":"",
				"next":"true",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"30px dotted rgb(221,101,7)"
					}
				},
				"left":"400",
                "split": "3",
                "height":"250",
                "googleSheets": {},

			},
			{
                "key": "my-div",
                "type": "div",
                "value":"",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"30px dotted rgb(121,101,117)"
					}
				},
				"left":"800",
                "split": "2",
                "height":"150",
                "googleSheets": {},

			},
			...afterItems,





        ] .map((x:any,i)=>{
			x.key += "-around-controls-items-after"
			return x
		})
	},
	{
        "title": "after controls items after",
        "type_slug": "forms",
        "metafields": [

            {
                "key": "Body",
                "type": "body",
                "stack": "60",
				// "height":"1000",
				delta:{
					"group":[
						{
							name:"outerDelta",
							type:"add_remove_button"
						}
					],
				},

				"googleSheets": {},
				options:{
					css:{
						"background-color": `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`,
						"clip-path":"polygon(100% 0%, 0% 0%, 0% 99%, 38% 28%, 68% 67%)"
					}
                }
			},
            {
                "key": "add",
                "type": "button",
				"value":"Add ",
				delta:{
					"group":"outerDelta",
					"type":"add",
					"by":"1"
				},
                "split": "3",
                "googleSheets": {},
            },
            {
                "key": "remove",
                "type": "button",
                "value":"Remove",
				delta:{
					"group":"outerDelta",
					"type":"remove",
					"by":"1"
				},
                // "nestGroup":"view",
                // "nestUnder":"A1",
                // "nest":"B4",
                "split": "3",
                // "width":"300",
                // "height":"250",
                "googleSheets": {},
			},

            {
                "key": "my-input-counter",
                "type": "count",
				"value":"3.",
				"next":"true",
				delta:{
					"group":"outerDelta"
				},
                "split": "1",
                "googleSheets": {},
                "options":{
                    "css":{
                    }
                }
			},
            {
                "key": "my-input",
                "type": "textbox",
                "value":"setup",
				delta:{
					"group":"outerDelta"
				},
                "googleSheets": {},

			},
            {
                "key": "my-div",
                "type": "div",
				"value":"",
				"next":"true",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"30px dotted rgb(221,101,7)"
					}
				},
				"left":"400",
                "split": "3",
                "height":"250",
                "googleSheets": {},

			},
			{
                "key": "my-div",
                "type": "div",
                "value":"",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"30px dotted rgb(121,101,117)"
					}
				},
				"left":"800",
                "split": "2",
                "height":"150",
                "googleSheets": {},

			},
			...afterItems,





        ] .map((x:any,i)=>{
			x.key += "-after-controls-items-after"
			return x
		})
	},

    {
        "title": "before contols  with items between",
        "type_slug": "forms",
        "metafields": [

            {
                "key": "Body",
                "type": "body",
                "stack": "60",
				// "height":"1000",
				delta:{
					"group":[
						{
							name:"outerDelta",
							type:"add_remove_button"
						}
					],
				},
                // "background": "rgb(155, 9, 104)",
				"googleSheets": {},
				options:{
					css:{
						"background-color": `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`,
						"clip-path":"polygon(100% 0%, 0% 0%, 0% 99%, 38% 28%, 68% 67%)"
					}
                }
			},

            {
                "key": "my-input-counter",
				"type": "count",
				"value":"3.",
				delta:{
					"group":"outerDelta"
				},
                "split": "1",
                "googleSheets": {},
			},
            {
                "key": "my-input",
                "type": "textbox",
                "value":"setup",
				delta:{
					"group":"outerDelta"
				},
                "googleSheets": {},

			},
            {
                "key": "my-div",
                "type": "div",
				"value":"",
				"next":"true",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"30px dotted rgb(221,101,7)"
					}
				},
				"left":"400",
                "split": "3",
                "height":"250",
                "googleSheets": {},

			},
			{
                "key": "my-div",
                "type": "div",
                "value":"",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"30px dotted rgb(121,101,117)"
					}
				},
				"left":"800",
                "split": "2",
                "height":"150",
                "googleSheets": {},

			},
			...betweenItems,
            {
                "key": "add",
                "type": "button",
                "value":"Add ",
				delta:{
					"group":"outerDelta",
					"type":"add",
					"by":"1"
				},
                "next":"true",
                "split": "3",
                "googleSheets": {},
            },
            {
                "key": "remove",
                "type": "button",
                "value":"Remove",
				delta:{
					"group":"outerDelta",
					"type":"remove",
					"by":"1"
				},
                "split": "3",
                "googleSheets": {},
			},



        ] .map((x:any,i)=>{
			x.key += "-before-controls-items-between"
			return x
		})
	},
    {
        "title": "around controls with items between top",
        "type_slug": "forms",
        "metafields": [

            {
                "key": "Body",
                "type": "body",
                "stack": "60",
				// "height":"1000",
				delta:{
					"group":[
						{
							name:"outerDelta",
							type:"add_remove_button"
						}
					],
				},

				"googleSheets": {},
				options:{
					css:{
						"background-color": `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`,
						"clip-path":"polygon(100% 0%, 0% 0%, 0% 99%, 38% 28%, 68% 67%)"
					}
                }
			},
            {
                "key": "my-input-counter",
                "type": "count",
				"value":"1.",
				delta:{
					"group":"outerDelta"
				},
                "split": "1",
                "googleSheets": {},
                "options":{
                    "css":{
                    }
                }
			},
            {
                "key": "my-input",
                "type": "textbox",
                "value":"setup",
				delta:{
					"group":"outerDelta"
				},
                "googleSheets": {},

			},
            {
                "key": "my-div",
                "type": "div",
				"value":"",
				"next":"true",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"20px dashed rgb(21,121,227)"
					}
				},
				"left":"400",
                "split": "3",
                "height":"250",
                "googleSheets": {},

			},
			{
                "key": "my-div",
                "type": "div",
                "value":"",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"20px dashed rgb(221,161,217)"
					}
				},
				"left":"800",
                "split": "2",
                "height":"150",
                "googleSheets": {},

			},
			...betweenItems,
            {
                "key": "add",
                "type": "button",
                "value":"Add ",
				delta:{
					"group":"outerDelta",
					"type":"add",
					"by":"1"
				},
				next:"true",
                "split": "3",
                "googleSheets": {},
            },
            {
                "key": "remove",
                "type": "button",
                "value":"Remove",
				delta:{
					"group":"outerDelta",
					"type":"remove",
					"by":"1"
				},
                // "nestGroup":"view",
                // "nestUnder":"A1",
                // "nest":"B4",
                "split": "3",
                // "width":"300",
                // "height":"250",
                "googleSheets": {},
			},

            {
                "key": "my-input-counter",
                "type": "count",
				"value":"3.",
				"next":"true",
				delta:{
					"group":"outerDelta"
				},
                "split": "1",
                "googleSheets": {},
                "options":{
                    "css":{
                    }
                }
			},
            {
                "key": "my-input",
                "type": "textbox",
                "value":"setup",
				delta:{
					"group":"outerDelta"
				},
                "googleSheets": {},

			},
            {
                "key": "my-div",
                "type": "div",
				"value":"",
				"next":"true",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"30px dotted rgb(221,101,7)"
					}
				},
				"left":"400",
                "split": "3",
                "height":"250",
                "googleSheets": {},

			},
			{
                "key": "my-div",
                "type": "div",
                "value":"",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"30px dotted rgb(121,101,117)"
					}
				},
				"left":"800",
                "split": "2",
                "height":"150",
                "googleSheets": {},

			},





        ] .map((x:any,i)=>{
			x.key += "-around-controls-items-after"
			return x
		})
	},
    {
        "title": "around controls with items between bottom",
        "type_slug": "forms",
        "metafields": [

            {
                "key": "Body",
                "type": "body",
                "stack": "60",
				// "height":"1000",
				delta:{
					"group":[
						{
							name:"outerDelta",
							type:"add_remove_button"
						}
					],
				},

				"googleSheets": {},
				options:{
					css:{
						"background-color": `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`,
						"clip-path":"polygon(100% 0%, 0% 0%, 0% 99%, 38% 28%, 68% 67%)"
					}
                }
			},
            {
                "key": "my-input-counter",
                "type": "count",
				"value":"1.",
				delta:{
					"group":"outerDelta"
				},
                "split": "1",
                "googleSheets": {},
                "options":{
                    "css":{
                    }
                }
			},
            {
                "key": "my-input",
                "type": "textbox",
                "value":"setup",
				delta:{
					"group":"outerDelta"
				},
                "googleSheets": {},

			},
            {
                "key": "my-div",
                "type": "div",
				"value":"",
				"next":"true",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"20px dashed rgb(21,121,227)"
					}
				},
				"left":"400",
                "split": "3",
                "height":"250",
                "googleSheets": {},

			},
			{
                "key": "my-div",
                "type": "div",
                "value":"",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"20px dashed rgb(221,161,217)"
					}
				},
				"left":"800",
                "split": "2",
                "height":"150",
                "googleSheets": {},

			},

            {
                "key": "add",
                "type": "button",
                "value":"Add ",
				delta:{
					"group":"outerDelta",
					"type":"add",
					"by":"1"
				},
				next:"true",
                "split": "3",
                "googleSheets": {},
            },
            {
                "key": "remove",
                "type": "button",
                "value":"Remove",
				delta:{
					"group":"outerDelta",
					"type":"remove",
					"by":"1"
				},
                // "nestGroup":"view",
                // "nestUnder":"A1",
                // "nest":"B4",
                "split": "3",
                // "width":"300",
                // "height":"250",
                "googleSheets": {},
			},
			...betweenItems,
            {
                "key": "my-input-counter",
                "type": "count",
				"value":"3.",
				"next":"true",
				delta:{
					"group":"outerDelta"
				},
                "split": "1",
                "googleSheets": {},
                "options":{
                    "css":{
                    }
                }
			},
            {
                "key": "my-input",
                "type": "textbox",
                "value":"setup",
				delta:{
					"group":"outerDelta"
				},
                "googleSheets": {},

			},
            {
                "key": "my-div",
                "type": "div",
				"value":"",
				"next":"true",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"30px dotted rgb(221,101,7)"
					}
				},
				"left":"400",
                "split": "3",
                "height":"250",
                "googleSheets": {},

			},
			{
                "key": "my-div",
                "type": "div",
                "value":"",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"30px dotted rgb(121,101,117)"
					}
				},
				"left":"800",
                "split": "2",
                "height":"150",
                "googleSheets": {},

			},





        ] .map((x:any,i)=>{
			x.key += "-around-controls-items-after"
			return x
		})
	},
    {
        "title": "around controls with items between both",
        "type_slug": "forms",
        "metafields": [

            {
                "key": "Body",
                "type": "body",
                "stack": "60",
				// "height":"1000",
				delta:{
					"group":[
						{
							name:"outerDelta",
							type:"add_remove_button"
						}
					],
				},

				"googleSheets": {},
				options:{
					css:{
						"background-color": `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`,
						"clip-path":"polygon(100% 0%, 0% 0%, 0% 99%, 38% 28%, 68% 67%)"
					}
                }
			},
            {
                "key": "my-input-counter",
                "type": "count",
				"value":"1.",
				delta:{
					"group":"outerDelta"
				},
                "split": "1",
                "googleSheets": {},
                "options":{
                    "css":{
                    }
                }
			},
            {
                "key": "my-input",
                "type": "textbox",
                "value":"setup",
				delta:{
					"group":"outerDelta"
				},
                "googleSheets": {},

			},
            {
                "key": "my-div",
                "type": "div",
				"value":"",
				"next":"true",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"20px dashed rgb(21,121,227)"
					}
				},
				"left":"400",
                "split": "3",
                "height":"250",
                "googleSheets": {},

			},
			{
                "key": "my-div",
                "type": "div",
                "value":"",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"20px dashed rgb(221,161,217)"
					}
				},
				"left":"800",
                "split": "2",
                "height":"150",
                "googleSheets": {},

			},
			...betweenItems,
            {
                "key": "add",
                "type": "button",
                "value":"Add ",
				delta:{
					"group":"outerDelta",
					"type":"add",
					"by":"1"
				},
				next:"true",
                "split": "3",
                "googleSheets": {},
            },
            {
                "key": "remove",
                "type": "button",
                "value":"Remove",
				delta:{
					"group":"outerDelta",
					"type":"remove",
					"by":"1"
				},
                // "nestGroup":"view",
                // "nestUnder":"A1",
                // "nest":"B4",
                "split": "3",
                // "width":"300",
                // "height":"250",
                "googleSheets": {},
			},
			...betweenItems,
            {
                "key": "my-input-counter",
                "type": "count",
				"value":"3.",
				"next":"true",
				delta:{
					"group":"outerDelta"
				},
                "split": "1",
                "googleSheets": {},
                "options":{
                    "css":{
                    }
                }
			},
            {
                "key": "my-input",
                "type": "textbox",
                "value":"setup",
				delta:{
					"group":"outerDelta"
				},
                "googleSheets": {},

			},
            {
                "key": "my-div",
                "type": "div",
				"value":"",
				"next":"true",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"30px dotted rgb(221,101,7)"
					}
				},
				"left":"400",
                "split": "3",
                "height":"250",
                "googleSheets": {},

			},
			{
                "key": "my-div",
                "type": "div",
                "value":"",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"30px dotted rgb(121,101,117)"
					}
				},
				"left":"800",
                "split": "2",
                "height":"150",
                "googleSheets": {},

			},





        ] .map((x:any,i)=>{
			x.key += "-around-controls-items-after"
			return x
		})
	},
	{
        "title": "after controls items between",
        "type_slug": "forms",
        "metafields": [

            {
                "key": "Body",
                "type": "body",
                "stack": "60",
				// "height":"1000",
				delta:{
					"group":[
						{
							name:"outerDelta",
							type:"add_remove_button"
						}
					],
				},

				"googleSheets": {},
				options:{
					css:{
						"background-color": `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`,
						"clip-path":"polygon(100% 0%, 0% 0%, 0% 99%, 38% 28%, 68% 67%)"
					}
                }
			},
            {
                "key": "add",
                "type": "button",
				"value":"Add ",
				delta:{
					"group":"outerDelta",
					"type":"add",
					"by":"1"
				},
                "split": "3",
                "googleSheets": {},
            },
            {
                "key": "remove",
                "type": "button",
                "value":"Remove",
				delta:{
					"group":"outerDelta",
					"type":"remove",
					"by":"1"
				},
                // "nestGroup":"view",
                // "nestUnder":"A1",
                // "nest":"B4",
                "split": "3",
                // "width":"300",
                // "height":"250",
                "googleSheets": {},
			},
			...betweenItems,
            {
                "key": "my-input-counter",
                "type": "count",
				"value":"3.",
				"next":"true",
				delta:{
					"group":"outerDelta"
				},
                "split": "1",
                "googleSheets": {},
                "options":{
                    "css":{
                    }
                }
			},
            {
                "key": "my-input",
                "type": "textbox",
                "value":"setup",
				delta:{
					"group":"outerDelta"
				},
                "googleSheets": {},

			},
            {
                "key": "my-div",
                "type": "div",
				"value":"",
				"next":"true",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"30px dotted rgb(221,101,7)"
					}
				},
				"left":"400",
                "split": "3",
                "height":"250",
                "googleSheets": {},

			},
			{
                "key": "my-div",
                "type": "div",
                "value":"",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"30px dotted rgb(121,101,117)"
					}
				},
				"left":"800",
                "split": "2",
                "height":"150",
                "googleSheets": {},

			},





        ] .map((x:any,i)=>{
			x.key += "-after-controls-items-after"
			return x
		})
	},

    {
        "title": "before contols  with items between before",
        "type_slug": "forms",
        "metafields": [

            {
                "key": "Body",
                "type": "body",
                "stack": "60",
				// "height":"1000",
				delta:{
					"group":[
						{
							name:"outerDelta",
							type:"add_remove_button"
						}
					],
				},
                // "background": "rgb(155, 9, 104)",
				"googleSheets": {},
				options:{
					css:{
						"background-color": `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`,
						"clip-path":"polygon(100% 0%, 0% 0%, 0% 99%, 38% 28%, 68% 67%)"
					}
                }
			},
			...beforeItems,
            {
                "key": "my-input-counter",
				"type": "count",
				"value":"3.",
				"next":"true",
				delta:{
					"group":"outerDelta"
				},
                "split": "1",
                "googleSheets": {},
			},
            {
                "key": "my-input",
                "type": "textbox",
                "value":"setup",
				delta:{
					"group":"outerDelta"
				},
                "googleSheets": {},

			},
            {
                "key": "my-div",
                "type": "div",
				"value":"",
				"next":"true",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"30px dotted rgb(221,101,7)"
					}
				},
				"left":"400",
                "split": "3",
                "height":"250",
                "googleSheets": {},

			},
			{
                "key": "my-div",
                "type": "div",
                "value":"",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"30px dotted rgb(121,101,117)"
					}
				},
				"left":"800",
                "split": "2",
                "height":"150",
                "googleSheets": {},

			},
			...betweenItems,
            {
                "key": "add",
                "type": "button",
                "value":"Add ",
				delta:{
					"group":"outerDelta",
					"type":"add",
					"by":"1"
				},
                "next":"true",
                "split": "3",
                "googleSheets": {},
            },
            {
                "key": "remove",
                "type": "button",
                "value":"Remove",
				delta:{
					"group":"outerDelta",
					"type":"remove",
					"by":"1"
				},
                "split": "3",
                "googleSheets": {},
			},



        ] .map((x:any,i)=>{
			x.key += "-before-controls-items-between-before"
			return x
		})
	},
    {
        "title": "before contols  with items between after",
        "type_slug": "forms",
        "metafields": [

            {
                "key": "Body",
                "type": "body",
                "stack": "60",
				// "height":"1000",
				delta:{
					"group":[
						{
							name:"outerDelta",
							type:"add_remove_button"
						}
					],
				},
                // "background": "rgb(155, 9, 104)",
				"googleSheets": {},
				options:{
					css:{
						"background-color": `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`,
						"clip-path":"polygon(100% 0%, 0% 0%, 0% 99%, 38% 28%, 68% 67%)"
					}
                }
			},
            {
                "key": "my-input-counter",
				"type": "count",
				"value":"3.",
				delta:{
					"group":"outerDelta"
				},
                "split": "1",
                "googleSheets": {},
			},
            {
                "key": "my-input",
                "type": "textbox",
                "value":"setup",
				delta:{
					"group":"outerDelta"
				},
                "googleSheets": {},

			},
            {
                "key": "my-div",
                "type": "div",
				"value":"",
				"next":"true",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"30px dotted rgb(221,101,7)"
					}
				},
				"left":"400",
                "split": "3",
                "height":"250",
                "googleSheets": {},

			},
			{
                "key": "my-div",
                "type": "div",
                "value":"",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"30px dotted rgb(121,101,117)"
					}
				},
				"left":"800",
                "split": "2",
                "height":"150",
                "googleSheets": {},

			},
			...betweenItems,
            {
                "key": "add",
                "type": "button",
                "value":"Add ",
				delta:{
					"group":"outerDelta",
					"type":"add",
					"by":"1"
				},
                "next":"true",
                "split": "3",
                "googleSheets": {},
            },
            {
                "key": "remove",
                "type": "button",
                "value":"Remove",
				delta:{
					"group":"outerDelta",
					"type":"remove",
					"by":"1"
				},
                "split": "3",
                "googleSheets": {},
			},
			...afterItems


        ] .map((x:any,i)=>{
			x.key += "-before-controls-items-between-after"
			return x
		})
	},

	{
        "title": "after controls items between before",
        "type_slug": "forms",
        "metafields": [

            {
                "key": "Body",
                "type": "body",
                "stack": "60",
				// "height":"1000",
				delta:{
					"group":[
						{
							name:"outerDelta",
							type:"add_remove_button"
						}
					],
				},

				"googleSheets": {},
				options:{
					css:{
						"background-color": `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`,
						"clip-path":"polygon(100% 0%, 0% 0%, 0% 99%, 38% 28%, 68% 67%)"
					}
                }
			},
			...beforeItems,
            {
                "key": "add",
                "type": "button",
				"value":"Add ",
				"next":"true",
				delta:{
					"group":"outerDelta",
					"type":"add",
					"by":"1"
				},
                "split": "3",
                "googleSheets": {},
            },
            {
                "key": "remove",
                "type": "button",
                "value":"Remove",
				delta:{
					"group":"outerDelta",
					"type":"remove",
					"by":"1"
				},
                // "nestGroup":"view",
                // "nestUnder":"A1",
                // "nest":"B4",
                "split": "3",
                // "width":"300",
                // "height":"250",
                "googleSheets": {},
			},
			...betweenItems,
            {
                "key": "my-input-counter",
                "type": "count",
				"value":"3.",
				"next":"true",
				delta:{
					"group":"outerDelta"
				},
                "split": "1",
                "googleSheets": {},
                "options":{
                    "css":{
                    }
                }
			},
            {
                "key": "my-input",
                "type": "textbox",
                "value":"setup",
				delta:{
					"group":"outerDelta"
				},
                "googleSheets": {},

			},
            {
                "key": "my-div",
                "type": "div",
				"value":"",
				"next":"true",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"30px dotted rgb(221,101,7)"
					}
				},
				"left":"400",
                "split": "3",
                "height":"250",
                "googleSheets": {},

			},
			{
                "key": "my-div",
                "type": "div",
                "value":"",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"30px dotted rgb(121,101,117)"
					}
				},
				"left":"800",
                "split": "2",
                "height":"150",
                "googleSheets": {},

			},





        ] .map((x:any,i)=>{
			x.key += "-after-controls-items-after"
			return x
		})
	},
	{
        "title": "after controls items between after",
        "type_slug": "forms",
        "metafields": [

            {
                "key": "Body",
                "type": "body",
                "stack": "60",
				// "height":"1000",
				delta:{
					"group":[
						{
							name:"outerDelta",
							type:"add_remove_button"
						}
					],
				},

				"googleSheets": {},
				options:{
					css:{
						"background-color": `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`,
						"clip-path":"polygon(100% 0%, 0% 0%, 0% 99%, 38% 28%, 68% 67%)"
					}
                }
			},
            {
                "key": "add",
                "type": "button",
				"value":"Add ",
				delta:{
					"group":"outerDelta",
					"type":"add",
					"by":"1"
				},
                "split": "3",
                "googleSheets": {},
            },
            {
                "key": "remove",
                "type": "button",
                "value":"Remove",
				delta:{
					"group":"outerDelta",
					"type":"remove",
					"by":"1"
				},
                // "nestGroup":"view",
                // "nestUnder":"A1",
                // "nest":"B4",
                "split": "3",
                // "width":"300",
                // "height":"250",
                "googleSheets": {},
			},
			...betweenItems,
            {
                "key": "my-input-counter",
                "type": "count",
				"value":"3.",
				"next":"true",
				delta:{
					"group":"outerDelta"
				},
                "split": "1",
                "googleSheets": {},
                "options":{
                    "css":{
                    }
                }
			},
            {
                "key": "my-input",
                "type": "textbox",
                "value":"setup",
				delta:{
					"group":"outerDelta"
				},
                "googleSheets": {},

			},
            {
                "key": "my-div",
                "type": "div",
				"value":"",
				"next":"true",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"30px dotted rgb(221,101,7)"
					}
				},
				"left":"400",
                "split": "3",
                "height":"250",
                "googleSheets": {},

			},
			{
                "key": "my-div",
                "type": "div",
                "value":"",
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						border:"30px dotted rgb(121,101,117)"
					}
				},
				"left":"800",
                "split": "2",
                "height":"150",
                "googleSheets": {},

			},
			...afterItems





        ] .map((x:any,i)=>{
			x.key += "-after-controls-items-after"
			return x
		})
	},

].slice(3,4)
//

//

let latch_dropdown_duplicate_nesting_development = {
	"title": "development",
	"type_slug": "forms",
	"metafields": [

		{
			"key": "Body",
			"type": "body",
			"stack": "60",
			// "height":"1000",
			delta:{
				"group":[
					{
						name:"outerDelta",
						type:"add_remove_button"
					},
				]
			},
			nest:{
				"group":[
					{
						name:"dropdown",
						type:"regular"
					}
				],
			},
			"googleSheets": {},
			options:{
				css:{
					"background-color": `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`,
					"clip-path":"polygon(100% 0%, 0% 0%, 0% 99%, 38% 28%, 68% 67%)"
				}
			}
		},
		{
		    "key": "my-text",
			// delta:{
			// 	"group":"outerDelta"
			// },
		    "type": "text",
		    "value":"Some Text",
		    "background":"blue",
		    "googleSheets": {},
			"split":"4",
		},
		{
			"key": "my-overlay",
			"type": "div",
			"value":"",
			"background":"yellow",
			"nest":{
				group:"dropdown",
				name:"A1",
				// under:"Z1"
			},
			// "width":"500",
			"split":"8",
			"height":"1200",
			"googleSheets": {},
			"options":{
				"css":{
					display:"flex",
					"flex-direction":"row",
					"justify-content":"space-around",
					"align-items":"space-between",
					// "place-content":"space-around",
					"flex-wrap":"wrap"
				}
			}
		},
		{
			"key": "my-dropdown-1",
			type:"dropdown",
			value:"1 Dropdown",
			delta:{
				"group":"outerDelta",

			},
			"nest":{
				group:"dropdown",
				name:"B1",
				under:"A1"
			},
			latch:{
				options:[ //look to changes this to options
					"A",
					"B",
					"C",
					"D",
					"E",
					"F",
				],
				// "state":"open"

			},
			"split": "3",
			options:{
				css:{
					order:-3
				}
			},
			"googleSheets": {},
		},
		{
			"key": "localVideo",
			"value": "",
			"type": "video",
			"split": "5",
			// "width":"420",
			"height":500,
			"googleSheets": {},
		},
		{
			"key": "add",
			"type": "button",
			"value":"Add ",
			delta:{
				"group":"outerDelta",
				"type":"add",
				"by":1
			},
			"nest":{
				group:"dropdown",
				name:"B4",
				under:"A1"
			},
			"next":"true",
			"split": "2",
			options:{
				css:{
					"flex-shrink":1,
					"height":"100px"
				}
			},
			"googleSheets": {},
		},
		{
			"key": "remove",
			"type": "button",
			"value":"Remove",
			delta:{
				"group":"outerDelta",
				"type":"remove",
				"by":1
			},
			"nest":{
				group:"dropdown",
				name:"B5",
				under:"A1"
			},
			options:{
				css:{
					"flex-shrink":1,
					"height":"100px"
				}
			},
			"split": "3",
			"googleSheets": {},
		},




	] .map((x:any,i)=>{
		x.key += "-latch-dropdown-duplicate"
		return x
	})
}
let latch_dropdown_duplicate_development = {
	"title": "development",
	"type_slug": "forms",
	"metafields": [

		{
			"key": "Body",
			"type": "body",
			"stack": "60",
			// "height":"1000",
			delta:{
				"group":[
					{
						name:"outerDelta",
						type:"add_remove_button"
					},
				]
			},
			nest:{

			},
			"googleSheets": {},
			options:{
				css:{
					"background-color": `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`,
					"clip-path":"polygon(100% 0%, 0% 0%, 0% 99%, 38% 28%, 68% 67%)"
				}
			}
		},
		{
		    "key": "my-text",
			delta:{
				"group":"outerDelta"
			},
		    "type": "text",
		    "value":"Some Text",
		    "background":"blue",
		    "googleSheets": {},
			"split":"4",
		},
		{
			"key": "my-dropdown-1",
			type:"dropdown",
			value:"1 Dropdown",
			delta:{
				"group":"outerDelta",

			},
			latch:{
				options:[ //look to changes this to options
					"A",
					"B",
					"C",
					"D",
				],
				// "state":"open"

			},
			"split": "3",
			"googleSheets": {},
		},
		{
			"key": "my-dropdown-2",
			type:"dropdown",
			value:"2 Dropdown",
			delta:{
				"group":"outerDelta",

			},
			latch:{
				options:[ //look to changes this to options
					"E",
					"F",
					"G",
					"H",
				],
				// "state":"open"

			},
			"split": "3",
			"googleSheets": {},
		},
		{
			"key": "my-dropdown-3",
			type:"dropdown",
			value:"3 Dropdown",
			delta:{
				"group":"outerDelta",

			},
			latch:{
				options:[ //look to changes this to options
					"I",
					"J",
					"K",
				],
				"state":"open"

			},
			"split": "3",
			"googleSheets": {},
		},
		{
			"key": "localVideo",
			delta:{
				"group":"outerDelta"
			},
			"value": "",
			"type": "video",
			"split": "5",
			// "width":"420",
			"height":500,
			"googleSheets": {},
		},
		{
			"key": "add",
			"type": "button",
			"value":"Add ",
			delta:{
				"group":"outerDelta",
				"type":"add",
				"by":1
			},
			"next":"true",
			"split": "2",
			"googleSheets": {},
		},
		{
			"key": "remove",
			"type": "button",
			"value":"Remove",
			delta:{
				"group":"outerDelta",
				"type":"remove",
				"by":1
			},
			"split": "3",
			"googleSheets": {},
		},




	] .map((x:any,i)=>{
		x.key += "-latch-dropdown-duplicate"
		return x
	})
}
let latch_dropdown_development = {
	"title": "development",
	"type_slug": "forms",
	"metafields": [

		{
			"key": "Body",
			"type": "body",
			"stack": "60",
			// "height":"1000",
			delta:{

			},
			nest:{

			},
			"googleSheets": {},
			options:{
				css:{
					"background-color": `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`,
					"clip-path":"polygon(100% 0%, 0% 0%, 0% 99%, 38% 28%, 68% 67%)"
				}
			}
		},
		{
			"key": "my-cursor",
			// "type": "gsap-cursor",
			type:"text",
			// "value":"Items",
			// "split": "3",
			gsapCusor:{
				"group":"a",
				"copyPath":"true",

			},
			"height":"1",
			"width":"1",
			options:{
				css:{
					height:"200px"
				}
			},
			"googleSheets": {},
		},
		{
		    "key": "my-table",
		    "type": "simpleTable",
		    "value":"",
		    "background":"blue",
		    "googleSheets": {},
			"split":"4",
			"height":"300"
		},
		{
			"key": "my-dropdown",
			type:"dropdown",
			value:"Select Item",
			latch:{
				options:[ //look to changes this to options
					"Boston",
					"St. Paul",
					"Bungalese",
					"Artic",
					"Oceania",
					"Paciic",
					"Canada"
				],

			},
			"split": "3",
			"googleSheets": {},
		},
		{
			"key": "localVideo",
			"value": "",
			"type": "video",
			"split": "5",
			// "width":"420",
			"height":500,
			"googleSheets": {},
		},
		{
			"key": "my-dropdown",
			type:"dropdown",
			value:"Select Item",
			latch:{
				options:[ //look to changes this to options
					"Toronto",
					"Suriya"
				],

			},
			"split": "3",
			"googleSheets": {},
		},




	] .map((x:any,i)=>{
		x.key += "-latch-dropdown"
		return x
	})
}
let latch_dropdown_at_base_development = {
	"title": "development",
	"type_slug": "forms",
	"metafields": [

		{
			"key": "Body",
			"type": "body",
			"stack": "60",
			// "height":"1000",
			delta:{

			},
			nest:{

			},
			"googleSheets": {},
			options:{
				css:{
					"background-color": `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`,
					// "clip-path":"polygon(100% 0%, 0% 0%, 0% 99%, 38% 28%, 68% 67%)"
				}
			}
		},
		{
			"key": "my-cursor",
			// "type": "gsap-cursor",
			type:"text",
			// "value":"Items",
			// "split": "3",
			gsapCusor:{
				"group":"a",
				"copyPath":"true",

			},
			"height":"1",
			"width":"1",
			options:{
				css:{
					height:"200px"
				}
			},
			"googleSheets": {},
		},

		{
			"key": "my-dropdown",
			type:"dropdown",
			value:"Select Item",
			latch:{
				options:[ //look to changes this to options
					"Toronto",
					"Anaheim",
					"Minneapolis",
					"Contregan"
				],

			},
			"split": "3",
			"googleSheets": {},
		},




	] .map((x:any,i)=>{
		x.key += "-latch-dropdown-base"
		return x
	})
}
let latch_dropdown_nesting_development = {
	"title": "latch_dropdown_nesting_development",
	"type_slug": "forms",
	"metafields": [

		{
			"key": "Body",
			"type": "body",
			"stack": "60",
			// "height":"1000",
			delta:{

			},
			nest:{
				"group":[
					{
						name:"dropdown",
						type:"regular"
					},
				],
			},
			"googleSheets": {},
			options:{
				css:{
					"background-color": `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`,
					"clip-path":"polygon(100% 11%, 0% 0%, 0% 99%, 38% 28%, 68% 67%)"
				}
			}
		},
		{
			"key": "my-cursor",
			// "type": "gsap-cursor",
			type:"text",
			// "value":"Items",
			// "split": "3",
			gsapCusor:{
				"group":"a",
				"copyPath":"true",

			},
			"height":"1",
			"width":"1",
			options:{
				css:{
					height:"200px"
				}
			},
			"googleSheets": {},
		},

		{
			"key": "my-overlay",
			"type": "div",
			"value":"",
			"background":"yellow",
			"nest":{
				group:"dropdown",
				name:"A1",
				// under:"Z1"
			},
			// "width":"500",
			"split":"8",
			"height":"400",
			"googleSheets": {},
			"options":{
				"css":{
					display:"flex",
					"flex-direction":"row",
					"justify-content":"space-around",
					"align-items":"space-between",
					// "place-content":"space-around",
					"flex-wrap":"wrap"
				}
			}
		},
		{
			"key": "my-first-dropdown",
			type:"dropdown",
			value:"Comes First",
			"nest":{
				group:"dropdown",
				name:"B2",
				under:"A1"
			},
			latch:{
				options:[ //look to changes this to options
					"Sudafed",
					"Dalcus",
					"Omarus",
					"Toronto",
					"Anaheim",
					"Minneapolis",
					"Contregan",
				],

			},
			options:{
				css:{
					width:"200px",
					order:-2
				}
			},
			// "split": "3",
			"googleSheets": {},
		},
		{
			"key": "my-dropdown",
			type:"dropdown",
			value:"Comes Second",
			"nest":{
				group:"dropdown",
				name:"B3",
				under:"A1"
			},
			latch:{
				options:[ //look to changes this to options
					"Toronto",
					"Anaheim",
					"Minneapolis",
					"Contregan"
				],

			},
			options:{
				css:{
					width:"200px",
					order:-1
				}
			},
			// "split": "3",
			"googleSheets": {},
		},
		{
		    "key": "my-table",
		    "type": "simpleTable",
		    "value":"",
			"nest":{
				group:"dropdown",
				name:"B1",
				under:"A1"
			},
		    "background":"blue",
		    // "split": "3",
		    // "width":"300",
		    // "height":"250",
		    "googleSheets": {},
		    "options":{
		        "css":{
		            // "justify-self":"flex-start",
		            // "flex-grow":"1",
		            "height":"300px",
		            "width":"400px",
					// order:3
		        }
		    }
		},
		{
			"key": "localVideo",
			"value": "",
			"type": "video",
			"split": "5",
			"nest":{
				group:"dropdown",
				name:"B4",
				under:"A1"
			},
			// "width":"420",
			"height":500,
			"googleSheets": {},
		},





	] .map((x:any,i)=>{
		x.key += "-latch-dropdown-nesting"
		return x
	})
}


let latch_testing = [

	latch_dropdown_nesting_development,
	latch_dropdown_at_base_development,
	latch_dropdown_development,
	latch_dropdown_duplicate_development,
	latch_dropdown_duplicate_nesting_development
]
//

//

// all we test is that we can resize the borard
let component_sizing_development ={
	"title": "development",
	"type_slug": "forms",
	"metafields": [

		{
			"key": "Body",
			"type": "body",
			"stack": "60",
			// "height":"1000",
			delta:{

			},
			nest:{

			},
			height:"1000",
			// width:"648",
			"googleSheets": {},
			options:{
				css:{
					"background-color": `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`,
					"clip-path":"polygon(100% 0%, 0% 0%, 0% 99%, 38% 28%, 68% 67%)",
					width:"125%"
				}
			}
		},
		{
			"key": "my-cursor",
			// "type": "gsap-cursor",
			type:"text",
			// "value":"Items",
			// "split": "3",
			gsapCusor:{
				"group":"a",
				"copyPath":"true",

			},
			"height":"1",
			"width":"1",
			options:{
				css:{
					height:"200px"
				}
			},
			"googleSheets": {},
		},
		{
		    "key": "my-table",
		    "type": "simpleTable",
		    "value":"",
		    "background":"blue",
		    "googleSheets": {},
			"split":"4",
			"height":"300"
		},
		{
			"key": "my-dropdown",
			type:"text",
			value:"Some Text",
			background:"red",
			"split": "3",
			"googleSheets": {},
		},
		{
			"key": "my-dropdown",
			type:"textbox",
			value:"Some Text",
			"split": "3",
			"googleSheets": {},
		},
		{
			"key": "my-dropdown",
			type:"loading",
			"split": "3",
			"color":"blue",
			"googleSheets": {},
		},
		{
			"key": "my-dropdown",
			type:"button",
			value:"I dont do anything",
			"split": "3",
			"color":"blue",
			"googleSheets": {},
		},
		{
			"key": "localVideo",
			"value": "",
			"type": "video",
			"split": "5",
			// "width":"420",
			"height":500,
			"googleSheets": {},
		},
		{
			"key": "my-dropdown",
			type:"dropdown",
			value:"Select Item",
			latch:{
				options:[ //look to changes this to options
					"Toronto",
					"Suriya"
				],

			},
			"split": "3",
			"googleSheets": {},
		},




	] .map((x:any,i)=>{
		x.key += "-component-sizing"
		return x
	})
}

let component_position_development = [
	{
		"title": "navigation",
		"type_slug": "forms",
		"metafields": [

			{
				"key": "Body",
				"type": "body",
				// "left":200,
				delta:{

				},
				nest:{

				},
				navigation:{
					"group":[
						{
							name:"home",
							type:"direct_link"
						},
						{
							name:"about",
							type:"direct_link"
						},
						{
							name:"articles",
							type:"direct_link"
						},
						{
							name:"videos",
							type:"direct_link"
						},
						{
							name:"blog",
							type:"direct_link"
						},
					],
					name:"home"
				},
				"googleSheets": {},
				options:{
					css:{
						// width:"125%"
						"background-color":"rgb(205, 180, 178)"
					}
				},
				appSection:{
					confirm:"true"
				}
			},
			{
				"key": "heading",
				type:"heading",
				"value":"Judima",
				// "split": "3",
				"text-align":"left",
				options:{
					css:{
						height:"200px",
						"text-align":"left",
						"font-family":"Gilgongo Doro"
					}
				},
				"googleSheets": {},
			},
            {
                "key": "image-1",
                "type": "image",
                "imageURL":"angular.png",
                "height":"100",
                "split":2,
            },
			{
				"key": "home",
				type:"text",
				"value":"Home",
				navigation:{
					group:"home",
					type:"direct_link"
				}
			},
			{
				"key": "about",
				type:"text",
				"value":"About",
				navigation:{
					group:"about",
					type:"direct_link"
				}

			},
			{
				"key": "articles",
				type:"text",
				"value":"Articles",
				navigation:{
					group:"articles",
					type:"direct_link"
				}

			},
			{
				"key": "videos",
				type:"text",
				"value":"Videos",
				navigation:{
					group:"videos",
					type:"direct_link"
				}

			},
			{
				"key": "blog",
				type:"text",
				"value":"Blog",
				next:"true",
				top:-40,
				left:500,
				navigation:{
					group:"blog",
					type:"direct_link"
				}
			},
			{
				"key": "guides",
				type:"text",

				// top:-40,
				top:-40,
				"value":"Guides",
			},
			{
				"key": "books",
				type:"text",
				// top:-40,
				top:-40,
				"value":"Books",
			},




		] .map((x:any,i)=>{
			x.key += "-component-position"
			return x
		})
	},
	{
		"title": "aside",
		"type_slug": "forms",
		"metafields": [

			{
				"key": "Body",
				"type": "body",
				"left":147,
				// height:1700,
				width:500,
				delta:{
					group:[
						{
							name:"media_card",
							type:"repeat",
							by:"5"
						}
					]
				},
				nest:{
					"group":[
						{
							name:"menu",
							type:"regular"
						},
					],
				},
				"googleSheets": {},
				options:{
					css:{
						width:"25%",
						opacity:".5",
						// "background-color":"rgb(205, 180, 178)"
						// "max-width":"285px"
					},
					judima:{
						moving:{
							point:"bottom",
							target:'formCO0',
							coordinates:{x:0,y:0},
							type:"custom"
						}
					},
				}
			},
			{
				"key": "heading",
				type:"heading",
				"value":"Menu",
				// "split": "3",
				"text-align":"left",
				options:{
					css:{
						height:"200px",
						"text-align":"left",
						"font-family":"Gilgongo Doro"
					}
				},
				"googleSheets": {},
			},
			{
				"key": "text",
				type:"text",
				"value":"Entry",
				// "split": "3",
				next:"true",
				"text-align":"left",
				delta:{
					group:"media_card",
					// by:5,
				},
				options:{
					css:{
						height:"200px",
						"text-align":"left",
						"font-size":"60px"
						// "font-family":""
					}
				},
				"googleSheets": {},
			},
			{
				"key": "container",
				type:"div",
				"value":"Home",
				split:6,
				// "next":"true",
				height:200,
				options:{
					css:{
						border:"5px solid red",
						display:"flex",
						// "flex-flow":""
					}
				},
				delta:{
					group:"media_card",
					// by:5,
				},
				"nest":{
					group:"menu",
					name:"A1",
				},
			},
            {
                "key": "image-1",
                "type": "image",
                "imageURL":"python.jpg",
				"nest":{
					group:"menu",
					name:"B1",
					under:"A1"
				},
				delta:{
					group:"media_card",
					// by:5,
				},
				options:{
					css:{
						height:"170px",
						width:"170px"
					}
				}
            },
            {
                "key": "text",
                "type": "text",
                "value":`Lorem ipsum dolor sit amet`,
				"nest":{
					group:"menu",
					name:"B2",
					under:"A1"
				},
				delta:{
					group:"media_card",
					// by:5,
				}
            },






		] .map((x:any,i)=>{
			x.key += "-component-position"
			return x
		})
	},
	{
		"title": "article",
		"type_slug": "forms",
		"metafields": [

			{
				"key": "Body",
				"type": "body",
				"stack": "60",
				// "height":"1000",
				"width":"900",
				left:40,
				delta:{

				},
				nest:{

				},
				// width:"648",
				"googleSheets": {},
				options:{
					css:{
						"background-color": `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`,
						"clip-path":"polygon(100% 0%, 0% 0%, 0% 99%, 38% 28%, 68% 67%)",
						width:"50%"
					},
					judima:{
						moving:{
							point:"right",
							target:'formCO1',
							coordinates:{x:0,y:0},
							type:"custom"
						}
					},
				}
			},
			{
				"key": "my-table",
				"type": "simpleTable",
				"value":"",
				"background":"blue",
				"googleSheets": {},
				"split":"4",
				"height":"300"
			},
			{
				"key": "my-dropdown",
				type:"text",
				value:"Some Text",
				background:"red",
				"split": "3",
				"googleSheets": {},
			},
			{
				"key": "my-dropdown",
				type:"textbox",
				value:"Some Text",
				"split": "3",
				"googleSheets": {},
			},
			{
				"key": "my-dropdown",
				type:"loading",
				"split": "3",
				"color":"blue",
				"googleSheets": {},
			},
			{
				"key": "my-dropdown",
				type:"button",
				value:"I dont do anything",
				"split": "3",
				"color":"blue",
				"googleSheets": {},
			},
			{
				"key": "localVideo",
				"value": "",
				"type": "video",
				"split": "5",
				// "width":"420",
				"height":500,
				"googleSheets": {},
			},
			{
				"key": "my-dropdown",
				type:"dropdown",
				value:"Select Item",
				latch:{
					options:[ //look to changes this to options
						"Toronto",
						"Suriya"
					],

				},
				"split": "3",
				"googleSheets": {},
			},




		] .map((x:any,i)=>{
			x.key += "-component-position"
			return x
		})
	},
	{
		"title": "aside2",
		"type_slug": "forms",
		"metafields": [

			{
				"key": "Body",
				"type": "body",
				// "left":-147,
				width:500,
				// height:1700,
				// width:500,
				delta:{
					group:[
						{
							name:"media_card",
							type:"repeat",
							by:"5"
						}
					]
				},
				nest:{
					"group":[
						{
							name:"menu",
							type:"regular"
						},
					],
				},
				"googleSheets": {},
				options:{
					css:{
						width:"25%",
						opacity:".5",
						"background-color":"teal"
						// "max-width":"285px"
					},
					judima:{
						moving:{
							point:"right",
							target:'formCO2',
							coordinates:{x:0,y:0},
							type:"custom"
						}
					},
				}
			},
			{
				"key": "heading",
				type:"heading",
				"value":"Menu",
				// "split": "3",
				"text-align":"left",
				options:{
					css:{
						height:"200px",
						"text-align":"left",
						"font-family":"Gilgongo Doro"
					}
				},
				"googleSheets": {},
			},
			{
				"key": "container",
				type:"div",
				"value":"Home",
				split:8,
				height:200,
				options:{
					css:{
						border:"5px solid red",
						display:"flex",
						// "flex-flow":""
					}
				},
				delta:{
					group:"media_card",
					// by:5,
				},
				"nest":{
					group:"menu",
					name:"A1",
				},
			},
            {
                "key": "image-1",
                "type": "image",
                "imageURL":"python.jpg",
				"nest":{
					group:"menu",
					name:"B1",
					under:"A1"
				},
				delta:{
					group:"media_card",
					// by:5,
				},
				options:{
					css:{
						height:"170px",
						width:"170px"
					}
				}
            },
            {
                "key": "text",
                "type": "text",
                "value":`Lorem ipsum dolor sit amet,
				consectetur adipiscing elit, sed do eiusmod tempor incididunt`,
				"nest":{
					group:"menu",
					name:"B2",
					under:"A1"
				},
				delta:{
					group:"media_card",
					// by:5,
				}
            },






		] .map((x:any,i)=>{
			x.key += "-component-position"
			return x
		})
	},
	{
		"title": "article",
		"type_slug": "forms",
		"metafields": [

			{
				"key": "Footer",
				"type": "body",
				"stack": "60",
				// "height":"1000",
				// "width":"900",
				// left:40,
				delta:{

				},
				nest:{

				},
				height:"1000",
				// width:"648",
				"googleSheets": {},
				options:{
					css:{
						"background-color": `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`,
						"clip-path":"polygon(100% 0%, 0% 0%, 0% 99%, 38% 28%, 68% 67%)",
						// width:"125%"
					},
					judima:{
						moving:{
							point:"bottom",
							target:'formCO1',
							coordinates:{x:0,y:0},
							type:"custom"
						}
					},
				}
			},
			{
				"key": "my-dropdown",
				type:"text",
				value:"Some Text",
				background:"red",
				"split": "3",
				"googleSheets": {},
			},
			{
				"key": "my-dropdown",
				type:"textbox",
				value:"Some Text",
				"split": "3",
				"googleSheets": {},
			},
			{
				"key": "my-dropdown",
				type:"loading",
				"split": "3",
				"color":"blue",
				"googleSheets": {},
			},
			{
				"key": "my-dropdown",
				type:"button",
				value:"My Footer",
				"split": "3",
				"color":"blue",
				"googleSheets": {},
			},
			{
				"key": "localVideo",
				"value": "",
				"type": "video",
				"split": "5",
				// "width":"420",
				"height":500,
				"googleSheets": {},
			},
			{
				"key": "my-dropdown",
				type:"dropdown",
				value:"Select Item",
				latch:{
					options:[ //look to changes this to options
						"Toronto",
						"Suriya"
					],

				},
				"split": "3",
				"googleSheets": {},
			},




		] .map((x:any,i)=>{
			x.key += "-component-position"
			return x
		})
	},

].slice(0,5)
//

let component_dimension_testing = [
	// component_sizing_development,
	...component_position_development
]
//


// display testing

let display_development = [
	{
		"title": "section 1",
		"type_slug": "forms",
		"metafields": [

			{
				"key": "Body",
				"type": "body",
				// "left":147,
				// height:1700,
				width:1175,
				delta:{
					group:[
						{
							name:"displayDelta",
							type:"add_remove_button"
						},
						{
							name:"displayExpand",
							type:"add_remove_button"
						},
					]
				},
				nest:{

				},
				navigation:{
					name:"guides"
				},
				"googleSheets": {},
				options:{
					css:{
						// width:"20%",
						opacity:".5",
						// "background-color":"black"
						// "max-width":"285px"
					},
					judima:{
						mobile:{
							stack:50,
							widthRatio:.9
						},


					},
				}
			},
			{
				"key": "heading-display1",
				type:"heading",
				"value":"Section 1",
				"split": "9",
				// "left":"700",
				"text-align":"left",
				top:300,
				delta:{
					"group":"displayDelta"
				},

				latch:{
					type:"display",
					display:{
						type:"target",
						name:"my_display_1"
					},
					zChildren:[
						{
							bool:"div",
							css:{
								"background-color":"red",
							},
							val:"my-display1",
							logic:{
								desktop:{
									width:1.10,
									height:1.10,
									top:-40,
									left:-40
								},
								mobile:{
									width:1.10,
									height:1.10,
									top:-40,
									left:-40
								}
							},
							extras:{
								appLatch:{
									confirm:"true",
									zSymbolNeeded:"true",

									type:"display",
									display:{
										type:"target",
										name:"overlay_1"
									},
									zChildren:[
										{
											bool:"div",
											css:{
												"background-color":"yellow",
												"z-index":-1
											},
											val:"my-overlay-display1",
											logic:{
												desktop:{
													width:1.10,
													height:1.10,
													top:-60,
													left:-60
												},
												mobile:{
													width:1.10,
													height:1.10,
													top:-60,
													left:-60
												}
											},
											group:["overlay_1"]
										}
									]
								}
							},

							group:["my_display_1","my_display_2","my_display_3"]
						},
						{
							bool:"div",
							css:{
								"background-color":"lightgreen",
							},
							val:"my-display1",
							logic:{
								desktop:{
									width:1.10,
									height:1.10,
									top:-20,
									left:-40
								},
								mobile:{
									width:1.10,
									height:1.10,
									top:-20,
									left:-40
								}
							},
							group:["my_display_3"]
						}
					]
				},
				options:{
					css:{
						// height:"200px",
						"text-align":"center",
						"font-family":"Gilgongo Doro"
					},
					judima:{
						mobile:{
							widthRatio:.3,
							top:500
						}
					}
				},
				"googleSheets": {},
			},
            {
                "key": "text-display1",
                "type": "text",
				latch:{
					type:"display",
					display:{
						type:"part",
						name:"my_display_2"
					},
				},
				delta:{
					"group":"displayDelta"
				},
                "value":`Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl nisi scelerisque eu ultrices vitae auctor. Et sollicitudin ac orci phasellus egestas tellus. Pellentesque diam volutpat commodo sed egestas. Diam quam nulla porttitor massa. Molestie ac feugiat sed lectus vestibulum mattis. Nisi est sit amet facilisis magna etiam tempor orci eu. Enim nec dui nunc mattis. Adipiscing bibendum est ultricies integer quis auctor elit sed. Fusce id velit ut tortor pretium. Maecenas accumsan lacus vel facilisis. Aliquam ultrices sagittis orci a. Urna nunc id cursus metus aliquam eleifend mi in nulla. Et magnis dis parturient montes nascetur ridiculus. Sollicitudin ac orci phasellus egestas tellus rutrum. Libero enim sed faucibus turpis in eu mi bibendum neque. Massa enim nec dui nunc mattis. Elit scelerisque mauris pellentesque pulvinar pellentesque. Diam phasellus vestibulum lorem sed risus. In iaculis nunc sed augue lacus viverra vitae congue.`,
				"next":"true",
				"split":4,
				"text-align":"center",

            },
            {
                "key": "text-display1",
                "type": "text",
				latch:{
					type:"display",
					display:{
						type:"part",
						name:"my_display_3"
					},
				},
				delta:{
					"group":"displayDelta"
				},
                "value":`Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl nisi scelerisque eu ultrices vitae auctor. Et sollicitudin ac orci phasellus egestas tellus. Pellentesque diam volutpat commodo sed egestas. Diam quam nulla porttitor massa. Molestie ac feugiat sed lectus vestibulum mattis. Nisi est sit amet facilisis magna etiam tempor orci eu. Enim nec dui nunc mattis. Adipiscing bibendum est ultricies integer quis auctor elit sed. Fusce id velit ut tortor pretium. Maecenas accumsan lacus vel facilisis. Aliquam ultrices sagittis orci a. Urna nunc id cursus metus aliquam eleifend mi in nulla. Et magnis dis parturient montes nascetur ridiculus. Sollicitudin ac orci phasellus egestas tellus rutrum. Libero enim sed faucibus turpis in eu mi bibendum neque. Massa enim nec dui nunc mattis. Elit scelerisque mauris pellentesque pulvinar pellentesque. Diam phasellus vestibulum lorem sed risus. In iaculis nunc sed augue lacus viverra vitae congue.`,

				"split":5,
				"text-align":"center",

            },
			{
				"key": "add-1",
				"type": "button",
				"value":"Add ",
				top:300,
				delta:{
					"group":"displayDelta",
					"type":"add",
					"by":"1"
				},
				options:{
					judima:{
						mobile:{
							top:200
						}
					}
				},
				"split": "3",
				"googleSheets": {},
			},
			{
				"key": "remove-1",
				"type": "button",
				"value":"Remove",
				top:300,
				delta:{
					"group":"displayDelta",
					"type":"remove",
					"by":"1"
				},
				"split": "3",
				"googleSheets": {},
			},

			{
				"key": "heading-display2",
				type:"heading",
				"value":"Section 2",
				"split": 5,
				// "left":"700",
				"text-align":"left",
				top:300,
				delta:{
					"group":"displayExpand"
				},

				latch:{
					type:"display",
					display:{
						type:"target",
						name:"my_display_expand_1"
					},

					zChildren:[
						{
							bool:"div",
							css:{
								"background-color":"lightgreen",
							},
							val:"my-display-overlay",
							logic:{
								desktop:{
									width:1.20,
									height:function (devObj){
										let {current,vertical,horizontal} = devObj.delta

										return vertical.delta.value + 200

									},
									top:-80,
									left:200
								},
								mobile:{
									width:1.20,
									height:function (devObj){
										let {current,vertical,horizontal} = devObj.delta

										return vertical.delta.value + 200

									},
									top:-80,
									left:-80
								}
							},
							group:Array.from(Array(4),(x,i)=>{
								return "my_display_expand_"+(i+1)
							}),
							type:["deltaNodeContainer"]
						},
						{
							bool:"div",
							css:{
								"background-color":"rgb(128,65,150)",
								opacity:.8
							},
							val:"my-display3",
							logic:{
								desktop:{
									width:1.10,
									height:1.20,
									top:-30,
									left:-30
								},
								mobile:{
									width:1.10,
									height:1.20,
									top:-30,
									left:-30
								}
							},
							group:["my_display_expand_1","my_display_expand_3"]
						},
						{
							bool:"div",
							css:{
								"background-color":"rgb(109,106,237)",
								opacity:.5
							},
							val:"my-display2",
							logic:{
								desktop:{
									width:1.10,
									height:1.20,
									top:-30,
									left:-30
								},
								mobile:{
									width:1.10,
									height:1.20,
									top:-30,
									left:-30
								}
							},
							group:["my_display_expand_2","my_display_expand_4"]
						},
					]
				},
				options:{
					css:{
						// height:"200px",
						"text-align":"center",
						"font-family":"Gilgongo Doro"
					},
					judima:{
						mobile:{
							widthRatio:.3,
							top:500
						}
					}
				},
				"googleSheets": {},
			},
            {
                "key": "section-2display2",
                "type": "heading",
				top:300,
				latch:{
					type:"display",
					display:{
						type:"part",
						name:"my_display_expand_2"
					},
				},
				options:{
					css:{
						// height:"200px",
						"text-align":"center",
						"font-family":"Gilgongo Doro"
					},
				},
				delta:{
					"group":"displayExpand"
				},
				value:"Section 3",
                "split":4,
				"text-align":"center",

            },
            {
                "key": "text-display2",
                "type": "text",
				latch:{
					type:"display",
					display:{
						type:"part",
						name:"my_display_expand_3"
					},
				},
				delta:{
					"group":"displayExpand"
				},
                "value":`Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl nisi scelerisque eu ultrices vitae auctor. Et sollicitudin ac orci phasellus .`,
				"split":5,
				"text-align":"center",

            },
            {
                "key": "text",
                "type": "text",
				latch:{
					type:"display",
					display:{
						type:"part",
						name:"my_display_expand_4"
					},
				},
				delta:{
					"group":"displayExpand"
				},
                "value":`Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl nisi scelerisque eu ultrices vitae auctor. Et sollicitudin ac orci phasellus .`,
				"split":4,
				"text-align":"center",

            },

			{
				"key": "add-2",
				"type": "button",
				"value":"Add ",
				"next":"true",
				top:300,
				delta:{
					"group":"displayExpand",
					"type":"add",
					"by":"1"
				},
				options:{
					judima:{
						mobile:{
							top:200
						}
					}
				},
				"split": "3",
				"googleSheets": {},
			},
			{
				"key": "remove",
				"type": "button",
				"value":"Remove",
				top:300,
				delta:{
					"group":"displayExpand",
					"type":"remove",
					"by":"1"
				},
				"split": "3",
				"googleSheets": {},
			},

		] .map((x:any,i)=>{
			x.key += "-display"
			return x
		})
	},
]
let display_testing = [
	...display_development
]
//
let home_development = [
	{
		"title": "navigation",
		"type_slug": "forms",
		"metafields": [

			{
				"key": "Body",
				"type": "body",
				// "left":200,
				delta:{

				},
				nest:{

				},
				navigation:{
					"group":[
						{
							name:"home",
							type:"direct_link"
						},
						{
							name:"about",
							type:"direct_link"
						},
						{
							name:"articles",
							type:"direct_link"
						},
						{
							name:"videos",
							type:"direct_link"
						},
						{
							name:"blog",
							type:"direct_link"
						},
						{
							name:"guides",
							type:"direct_link"
						},
					],
					name:"home"
				},
				"googleSheets": {},
				options:{
					css:{
						// width:"125%"
						"background-color":"rgb(205, 180, 178)"
					},
					judima:{
						mobile:{
							stack:20,
							footerSpace:50
						}
					}
				},
				appSection:{
					confirm:"true"
				}
			},
			{
				"key": "heading",
				type:"heading",
				"value":"Judima",
				// "split": "3",
				"text-align":"left",
				options:{
					css:{
						height:"200px",
						"text-align":"left",
						"font-family":"Gilgongo Doro"
					}
				},
				"googleSheets": {},
			},
            {
                "key": "image-1",
                "type": "image",
                "imageURL":"angular.png",
                "height":"100",
                "split":2,
            },
			{
				"key": "home",
				type:"text",
				"value":"Home",
				navigation:{
					group:"home",
					type:"direct_link"
				}
			},
			{
				"key": "about",
				type:"text",
				"value":"About",
				navigation:{
					group:"about",
					type:"direct_link"
				}

			},
			{
				"key": "articles",
				type:"text",
				"value":"Articles",
				navigation:{
					group:"articles",
					type:"direct_link"
				}

			},
			{
				"key": "videos",
				type:"text",
				"value":"Videos",
				navigation:{
					group:"videos",
					type:"direct_link"
				}

			},
			{
				"key": "blog",
				type:"text",
				"value":"Blog",
				next:"true",
				top:-40,
				left:600,
				navigation:{
					group:"blog",
					type:"direct_link"
				},
				options:{
					judima:{
						stack:{
							overlapFix:"false"
						}
					}
				}
			},
			{
				"key": "guides",
				type:"text",
				navigation:{
					group:"guides",
					type:"direct_link"
				},
				// top:-40,
				top:-40,
				"value":"Guides",
			},
			// {
			// 	"key": "books",
			// 	type:"text",
			// 	// top:-40,
			// 	top:-40,
			// 	"value":"Books",
			// },




		] .map((x:any,i)=>{
			x.key += "-main-navigation"
			return x
		})
	},
	{
		"title": "aside",
		"type_slug": "forms",
		"metafields": [

			{
				"key": "Body",
				"type": "body",
				"left":147,
				// height:1700,
				width:500,
				delta:{
					group:[
						{
							name:"media_card",
							type:"repeat",
							by:"5"
						}
					]
				},
				nest:{
					"group":[
						{
							name:"menu",
							type:"regular"
						},
					],
				},
				navigation:{
					name:"home"
				},
				"googleSheets": {},
				options:{
					css:{
						width:"25%",
						opacity:".5",
						// "background-color":"rgb(205, 180, 178)"
						// "max-width":"285px"
					},
					judima:{
						moving:{
							point:"bottom",
							target:'navigation',
							coordinates:{x:0,y:0},
							type:"custom"
						},
					},
				}
			},
			{
				"key": "heading",
				type:"heading",
				"value":"Menu",
				// "split": "3",
				"text-align":"left",
				options:{
					css:{
						height:"200px",
						"text-align":"left",
						"font-family":"Gilgongo Doro"
					}
				},
				"googleSheets": {},
			},
			{
				"key": "text",
				type:"text",
				"value":"Entry",
				// "split": "3",
				next:"true",
				"text-align":"left",
				delta:{
					group:"media_card",
					// by:5,
				},
				options:{
					css:{
						height:"200px",
						"text-align":"left",
						"font-size":"60px"
						// "font-family":""
					}
				},
				"googleSheets": {},
			},
			{
				"key": "container",
				type:"div",
				"value":"Home",
				split:6,
				// "next":"true",
				height:200,
				options:{
					css:{
						border:"5px solid red",
						display:"flex",
						// "flex-flow":""
					}
				},
				delta:{
					group:"media_card",
					// by:5,
				},
				"nest":{
					group:"menu",
					name:"A1",
				},
			},
            {
                "key": "image-1",
                "type": "image",
                "imageURL":"python.jpg",
				"nest":{
					group:"menu",
					name:"B1",
					under:"A1"
				},
				delta:{
					group:"media_card",
					// by:5,
				},
				options:{
					css:{
						height:"170px",
						width:"170px"
					}
				}
            },
            {
                "key": "text",
                "type": "text",
                "value":`Lorem ipsum dolor sit amet`,
				"nest":{
					group:"menu",
					name:"B2",
					under:"A1"
				},
				delta:{
					group:"media_card",
					// by:5,
				}
            },






		] .map((x:any,i)=>{
			x.key += "-component-position"
			return x
		})
	},
	{
		"title": "article",
		"type_slug": "forms",
		"metafields": [

			{
				"key": "Body",
				"type": "body",
				"stack": "60",
				// "height":"1000",
				"width":"900",
				left:40,
				delta:{

				},
				nest:{

				},
				navigation:{
					name:"home"
				},
				// width:"648",
				"googleSheets": {},
				options:{
					css:{
						"background-color": `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`,
						"clip-path":"polygon(100% 0%, 0% 0%, 0% 99%, 38% 28%, 68% 67%)",
						width:"50%"
					},
					judima:{
						moving:{
							point:"right",
							target:'aside',
							coordinates:{x:0,y:0},
							type:"custom"
						}
					},
				}
			},
			{
				"key": "my-table",
				"type": "heading",
				"value":"Duplicate Me",
				"background":"blue",
				"googleSheets": {},
				"split":"4",
				"height":"300"
			},
			{
				"key": "my-text",
				type:"text",
				value:"Some Text",
				background:"red",
				"split": "3",
				"googleSheets": {},
			},
			{
				"key": "my-textbox",
				type:"textbox",
				value:"Some Text",
				"split": "3",
				"googleSheets": {},
			},
			{
				"key": "my-button",
				type:"loading",
				"split": "3",
				"color":"blue",
				"googleSheets": {},
			},
			{
				"key": "my-button",
				type:"button",
				value:"I dont do anything",
				"split": "3",
				"color":"blue",
				"googleSheets": {},
			},
			{
				"key": "localVideo",
				"value": "",
				"type": "video",
				"split": "5",
				// "width":"420",
				"height":500,
				"googleSheets": {},
			},
			{
				"key": "my-dropdown",
				type:"dropdown",
				value:"Select Item",
				latch:{
					options:[ //look to changes this to options
						"Toronto",
						"Suriya"
					],

				},
				"split": "3",
				"googleSheets": {},
			},
			{
				"key": "my-dropdown-2",
				type:"dropdown",
				value:"Select Item",
				latch:{
					options:[ //look to changes this to options
						"Akranti",
						"Jalen"
					],

				},
				"split": "3",
				"googleSheets": {},
			},





		] .map((x:any,i)=>{
			x.key += "-component-position"
			return x
		})
	},
	{
		"title": "aside2",
		"type_slug": "forms",
		"metafields": [

			{
				"key": "Body",
				"type": "body",
				// "left":-147,
				width:500,
				// height:1700,
				// width:500,
				delta:{
					group:[
						{
							name:"media_card",
							type:"repeat",
							by:"5"
						}
					]
				},
				nest:{
					"group":[
						{
							name:"menu",
							type:"regular"
						},
					],
				},
				navigation:{
					name:"home"
				},
				"googleSheets": {},
				options:{
					css:{
						width:"25%",
						opacity:".5",
						"background-color":"teal"
						// "max-width":"285px"
					},
					judima:{
						moving:{
							point:"right",
							target:'article',
							coordinates:{x:0,y:0},
							type:"custom"
						}
					},
				}
			},
			{
				"key": "heading",
				type:"heading",
				"value":"Menu",
				// "split": "3",
				"text-align":"left",
				options:{
					css:{
						height:"200px",
						"text-align":"left",
						"font-family":"Gilgongo Doro"
					}
				},
				"googleSheets": {},
			},
			{
				"key": "container",
				type:"div",
				"value":"Home",
				split:8,
				height:200,
				options:{
					css:{
						border:"5px solid red",
						display:"flex",
						// "flex-flow":""
					}
				},
				delta:{
					group:"media_card",
					// by:5,
				},
				"nest":{
					group:"menu",
					name:"A1",
				},
			},
            {
                "key": "image-1",
                "type": "image",
                "imageURL":"python.jpg",
				"nest":{
					group:"menu",
					name:"B1",
					under:"A1"
				},
				delta:{
					group:"media_card",
					// by:5,
				},
				options:{
					css:{
						height:"170px",
						width:"170px"
					}
				}
            },
            {
                "key": "text",
                "type": "text",
                "value":`Lorem ipsum dolor sit amet,
				consectetur adipiscing elit, sed do eiusmod tempor incididunt`,
				"nest":{
					group:"menu",
					name:"B2",
					under:"A1"
				},
				delta:{
					group:"media_card",
					// by:5,
				}
            },






		] .map((x:any,i)=>{
			x.key += "-component-position"
			return x
		})
	},
	{
		"title": "article2",
		"type_slug": "forms",
		"metafields": [

			{
				"key": "Footer",
				"type": "body",
				"stack": "60",
				// "height":"1000",
				// "width":"900",
				// left:40,
				delta:{

				},
				nest:{

				},
				navigation:{
					name:"home"
				},
				height:"1000",
				// width:"648",
				"googleSheets": {},
				options:{
					css:{
						"background-color": `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`,
						"clip-path":"polygon(100% 0%, 0% 0%, 0% 99%, 38% 28%, 68% 67%)",
						// width:"125%"
					},
					judima:{
						moving:{
							point:"bottom",
							target:'aside2',
							coordinates:{x:0,y:0},
							type:"custom"
						}
					},
				}
			},
			{
				"key": "my-dropdown",
				type:"text",
				value:"Some Text",
				background:"red",
				"split": "3",
				"googleSheets": {},
			},
			{
				"key": "my-dropdown",
				type:"textbox",
				value:"Some Text",
				"split": "3",
				"googleSheets": {},
			},
			{
				"key": "my-dropdown",
				type:"loading",
				"split": "3",
				"color":"blue",
				"googleSheets": {},
			},
			{
				"key": "my-dropdown",
				type:"button",
				value:"My Footer",
				"split": "3",
				"color":"blue",
				"googleSheets": {},
			},
			{
				"key": "localVideo",
				"value": "",
				"type": "video",
				"split": "5",
				// "width":"420",
				"height":500,
				"googleSheets": {},
			},
			{
				"key": "my-dropdown",
				type:"dropdown",
				value:"Select Item",
				latch:{
					options:[ //look to changes this to options
						"Toronto",
						"Suriya"
					],

				},
				"split": "3",
				"googleSheets": {},
			},




		] .map((x:any,i)=>{
			x.key += "-component-position"
			return x
		})
	},

]
let about_navigation = objectCopy(home_development.slice(0,1)[0])
about_navigation.metafields[0].navigation.name = "about"
about_navigation.title = "about navigation"
let about_development = [
	about_navigation,
	{
		"title": "about",
		"type_slug": "forms",
		"metafields": [

			{
				"key": "Body",
				"type": "body",
				"left":147,
				// height:1700,
				// width:500,
				delta:{
					group:[

					]
				},
				nest:{
					"group":[

					],
				},
				navigation:{
					name:"about"
				},
				"googleSheets": {},
				options:{
					css:{
						width:"100%",
						opacity:".5",
						// "max-width":"285px"
					},
					judima:{
						moving:{
							point:"bottom",
							target:'about navigation',
							coordinates:{x:0,y:0},
							type:"custom"
						}
					},
				}
			},
			{
				"key": "heading",
				type:"heading",
				"value":"About",
				// "split": "3",
				"left":"700",
				"text-align":"left",
				options:{
					css:{
						height:"200px",
						"text-align":"left",
						"font-family":"Gilgongo Doro"
					}
				},
				"googleSheets": {},
			},

            {
                "key": "text",
                "type": "text",
                "value":`Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl nisi scelerisque eu ultrices vitae auctor. Et sollicitudin ac orci phasellus egestas tellus. Pellentesque diam volutpat commodo sed egestas. Diam quam nulla porttitor massa. Molestie ac feugiat sed lectus vestibulum mattis. Nisi est sit amet facilisis magna etiam tempor orci eu. Enim nec dui nunc mattis. Adipiscing bibendum est ultricies integer quis auctor elit sed. Fusce id velit ut tortor pretium. Maecenas accumsan lacus vel facilisis. Aliquam ultrices sagittis orci a. Urna nunc id cursus metus aliquam eleifend mi in nulla. Et magnis dis parturient montes nascetur ridiculus. Sollicitudin ac orci phasellus egestas tellus rutrum. Libero enim sed faucibus turpis in eu mi bibendum neque. Massa enim nec dui nunc mattis. Elit scelerisque mauris pellentesque pulvinar pellentesque. Diam phasellus vestibulum lorem sed risus. In iaculis nunc sed augue lacus viverra vitae congue.`,
				"next":"true",
				"split":9,
				"text-align":"center"
            },

		] .map((x:any,i)=>{
			x.key += "-navigation-about"
			return x
		})
	},
]
let articles_navigation = objectCopy(home_development.slice(0,1)[0])
articles_navigation.title ="articles navigation"
articles_navigation.metafields[0].navigation.name = "articles"
let articles_development = [
	articles_navigation,
	{
		"title": "section 1",
		"type_slug": "forms",
		"metafields": [

			{
				"key": "Body",
				"type": "body",
				"left":147,
				// height:1700,
				width:300,
				delta:{
					group:[

					]
				},
				nest:{
					"group":[
						{
							name:"article section",
							type:"regular"
						},
					],
				},
				navigation:{
					name:"articles"
				},
				"googleSheets": {},
				options:{
					css:{
						width:"20%",
						opacity:".5",
						// "max-width":"285px"
					},
					judima:{
						moving:{
							point:"bottom",
							target:'articles navigation',
							coordinates:{x:0,y:0},
							type:"custom"
						}
					},
				}
			},
			{
				key:"container",
				type:"div",
				height:1000,
				split:9,
				top:0,
				options:{
					css:{
						"background-color":"lightgreen"
					}
				},
				"nest":{
					group:"article section",
					name:"A1",
				},
			},
			{
				key:"helper",
				type:"div",
				height:1,
				split:1,
				options:{
					css:{
						"background-color":"lightgreen"
					}
				},
			},
			{
				"key": "heading",
				type:"heading",
				"value":"Section 1",
				"split": "9",
				// "left":"700",
				"text-align":"left",
				"nest":{
					group:"article section",
					name:"B1",
					under:"A1"
				},
				options:{
					css:{
						// height:"200px",
						"text-align":"center",
						"font-family":"Gilgongo Doro"
					}
				},
				"googleSheets": {},
			},

            {
                "key": "text",
                "type": "text",
                "value":`Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl nisi scelerisque eu ultrices vitae auctor. Et sollicitudin ac orci phasellus egestas tellus. Pellentesque diam volutpat commodo sed egestas. Diam quam nulla porttitor massa. Molestie ac feugiat sed lectus vestibulum mattis. Nisi est sit amet facilisis magna etiam tempor orci eu. Enim nec dui nunc mattis. Adipiscing bibendum est ultricies integer quis auctor elit sed. Fusce id velit ut tortor pretium. Maecenas accumsan lacus vel facilisis. Aliquam ultrices sagittis orci a. Urna nunc id cursus metus aliquam eleifend mi in nulla. Et magnis dis parturient montes nascetur ridiculus. Sollicitudin ac orci phasellus egestas tellus rutrum. Libero enim sed faucibus turpis in eu mi bibendum neque. Massa enim nec dui nunc mattis. Elit scelerisque mauris pellentesque pulvinar pellentesque. Diam phasellus vestibulum lorem sed risus. In iaculis nunc sed augue lacus viverra vitae congue.`,
				"next":"true",
				"split":9,
				"text-align":"center",
				"nest":{
					group:"article section",
					name:"B2",
					under:"A1"
				},
            },

		] .map((x:any,i)=>{
			x.key += "-navigation-articles"
			return x
		})
	},
	{
		"title": "header",
		"type_slug": "forms",
		"metafields": [

			{
				"key": "Body",
				"type": "body",
				"left":147,
				// height:1700,
				width:650,
				delta:{
					group:[

					]
				},
				nest:{
					"group":[
						{
							name:"article section",
							type:"regular"
						},
					],
				},
				navigation:{
					name:"articles"
				},
				"googleSheets": {},
				options:{
					css:{
						width:"20%",
						opacity:".5",
						// "max-width":"285px"
					},
					judima:{
						moving:{
							point:"right",
							target:'section 1',
							coordinates:{x:-670,y:0},
							type:"custom"
						}
					},
				}
			},
			{
				key:"container",
				type:"div",
				height:200,
				split:9,
				top:0,
				options:{
					css:{
						"background-color":"tomato",
						display:"flex",
						"flex-direction": "row",
						"justify-content":"center",
						"align-content":"flex-start"
					}
				},
				"nest":{
					group:"article section",
					name:"A1",
				},
			},
			{
				key:"helper",
				type:"div",
				height:1,
				split:1,
			},
			{
				"key": "heading",
				type:"heading",
				"value":"Article Name Here",
				// "left":"700",
				"nest":{
					group:"article section",
					name:"B1",
					under:"A1"
				},
				options:{
					css:{
						// height:"200px",
						"text-align":"center",
						"font-family":"Gilgongo Doro"
					}
				},
				"googleSheets": {},
			},


		] .map((x:any,i)=>{
			x.key += "-navigation-articles"
			return x
		})
	},
	{
		"title": "section 2",
		"type_slug": "forms",
		"metafields": [

			{
				"key": "Body",
				"type": "body",
				"left":147,
				// height:1700,
				width:300,
				delta:{
					group:[

					]
				},
				navigation:{
					name:"articles"
				},
				nest:{
					"group":[
						{
							name:"article section",
							type:"regular"
						},
					],
				},
				"googleSheets": {},
				options:{
					css:{
						width:"20%",
						opacity:".5",
						// "max-width":"285px"
					},
					judima:{
						moving:{
							point:"right",
							target:'header',
							coordinates:{x:-320,y:0},
							type:"custom"
						}
					},
				}
			},
			{
				key:"container",
				type:"div",
				height:1000,
				split:9,
				top:0,
				options:{
					css:{
						"background-color":"rgb(0,191,255)"
					}
				},
				"nest":{
					group:"article section",
					name:"A1",
				},
			},
			{
				key:"helper",
				type:"div",
				height:1,
				split:1,
				options:{
					css:{
						"background-color":"lightgreen"
					}
				},
			},
			{
				"key": "heading",
				type:"heading",
				"value":"Section 2",
				"split": "9",
				// "left":"700",
				"text-align":"left",
				"nest":{
					group:"article section",
					name:"B1",
					under:"A1"
				},
				options:{
					css:{
						// height:"200px",
						"text-align":"center",
						"font-family":"Gilgongo Doro"
					}
				},
				"googleSheets": {},
			},

            {
                "key": "text",
                "type": "text",
                "value":`Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl nisi scelerisque eu ultrices vitae auctor. Et sollicitudin ac orci phasellus egestas tellus. Pellentesque diam volutpat commodo sed egestas. Diam quam nulla porttitor massa. Molestie ac feugiat sed lectus vestibulum mattis. Nisi est sit amet facilisis magna etiam tempor orci eu. Enim nec dui nunc mattis. Adipiscing bibendum est ultricies integer quis auctor elit sed. Fusce id velit ut tortor pretium. Maecenas accumsan lacus vel facilisis. Aliquam ultrices sagittis orci a. Urna nunc id cursus metus aliquam eleifend mi in nulla. Et magnis dis parturient montes nascetur ridiculus. Sollicitudin ac orci phasellus egestas tellus rutrum. Libero enim sed faucibus turpis in eu mi bibendum neque. Massa enim nec dui nunc mattis. Elit scelerisque mauris pellentesque pulvinar pellentesque. Diam phasellus vestibulum lorem sed risus. In iaculis nunc sed augue lacus viverra vitae congue.`,
				"next":"true",
				"split":9,
				"text-align":"center",
				"nest":{
					group:"article section",
					name:"B2",
					under:"A1"
				},
            },

		] .map((x:any,i)=>{
			x.key += "-navigation-articles-2"
			return x
		})
	},
	{
		"title": "section 3",
		"type_slug": "forms",
		"metafields": [

			{
				"key": "Body",
				"type": "body",
				"left":147,
				// height:1700,
				width:330,
				delta:{
					group:[

					]
				},
				nest:{
					"group":[
						{
							name:"article section",
							type:"regular"
						},
					],
				},
				navigation:{
					name:"articles"
				},
				"googleSheets": {},
				options:{
					css:{
						width:"20%",
						opacity:".5",
						// "max-width":"285px"
					},
					judima:{
						moving:{
							point:"right",
							target:'header',
							coordinates:{x:-970,y:200},
							type:"custom"
						}
					},
				}
			},
			{
				key:"container",
				type:"div",
				height:1000,
				split:9,
				top:0,
				options:{
					css:{
						"background-color":"rgb(238,130,238)"
					}
				},
				"nest":{
					group:"article section",
					name:"A1",
				},
			},
			{
				key:"helper",
				type:"div",
				height:1,
				split:1,
				options:{
					css:{
						"background-color":"lightgreen"
					}
				},
			},
			{
				"key": "heading",
				type:"heading",
				"value":"Section 3",
				"split": "9",
				// "left":"700",
				"text-align":"left",
				"nest":{
					group:"article section",
					name:"B1",
					under:"A1"
				},
				options:{
					css:{
						// height:"200px",
						"text-align":"center",
						"font-family":"Gilgongo Doro"
					}
				},
				"googleSheets": {},
			},

            {
                "key": "text",
                "type": "text",
                "value":`Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl nisi scelerisque eu ultrices vitae auctor. Et sollicitudin ac orci phasellus egestas tellus. Pellentesque diam volutpat commodo sed egestas. Diam quam nulla porttitor massa. Molestie ac feugiat sed lectus vestibulum mattis. Nisi est sit amet facilisis magna etiam tempor orci eu. Enim nec dui nunc mattis. Adipiscing bibendum est ultricies integer quis auctor elit sed. Fusce id velit ut tortor pretium. Maecenas accumsan lacus vel facilisis. Aliquam ultrices sagittis orci a. Urna nunc id cursus metus aliquam eleifend mi in nulla. Et magnis dis parturient montes nascetur ridiculus. Sollicitudin ac orci phasellus egestas tellus rutrum. Libero enim sed faucibus turpis in eu mi bibendum neque. Massa enim nec dui nunc mattis. Elit scelerisque mauris pellentesque pulvinar pellentesque. Diam phasellus vestibulum lorem sed risus. In iaculis nunc sed augue lacus viverra vitae congue.`,
				"next":"true",
				"split":9,
				"text-align":"center",
				"nest":{
					group:"article section",
					name:"B2",
					under:"A1"
				},
            },

		] .map((x:any,i)=>{
			x.key += "-navigation-articles-3"
			return x
		})
	},
	{
		"title": "section 4",
		"type_slug": "forms",
		"metafields": [

			{
				"key": "Body",
				"type": "body",
				"left":147,
				// height:1700,
				width:300,
				delta:{
					group:[

					]
				},
				nest:{
					"group":[
						{
							name:"article section",
							type:"regular"
						},
					],
				},
				navigation:{
					name:"articles"
				},
				"googleSheets": {},
				options:{
					css:{
						width:"20%",
						opacity:".5",
						// "max-width":"285px"
					},
					judima:{
						moving:{
							point:"right",
							target:'section 3',
							coordinates:{x:-620,y:200},
							type:"custom"
						}
					},
				}
			},
			{
				key:"container",
				type:"div",
				height:1000,
				split:9,
				top:0,
				options:{
					css:{
						"background-color":"rgb(244,164,96)"
					}
				},
				"nest":{
					group:"article section",
					name:"A1",
				},
			},
			{
				key:"helper",
				type:"div",
				height:1,
				split:1,
				options:{
					css:{
						"background-color":"lightgreen"
					}
				},
			},
			{
				"key": "heading",
				type:"heading",
				"value":"Section 4",
				"split": "9",
				// "left":"700",
				"text-align":"left",
				"nest":{
					group:"article section",
					name:"B1",
					under:"A1"
				},
				options:{
					css:{
						// height:"200px",
						"text-align":"center",
						"font-family":"Gilgongo Doro"
					}
				},
				"googleSheets": {},
			},

            {
                "key": "text",
                "type": "text",
                "value":`Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl nisi scelerisque eu ultrices vitae auctor. Et sollicitudin ac orci phasellus egestas tellus. Pellentesque diam volutpat commodo sed egestas. Diam quam nulla porttitor massa. Molestie ac feugiat sed lectus vestibulum mattis. Nisi est sit amet facilisis magna etiam tempor orci eu. Enim nec dui nunc mattis. Adipiscing bibendum est ultricies integer quis auctor elit sed. Fusce id velit ut tortor pretium. Maecenas accumsan lacus vel facilisis. Aliquam ultrices sagittis orci a. Urna nunc id cursus metus aliquam eleifend mi in nulla. Et magnis dis parturient montes nascetur ridiculus. Sollicitudin ac orci phasellus egestas tellus rutrum. Libero enim sed faucibus turpis in eu mi bibendum neque. Massa enim nec dui nunc mattis. Elit scelerisque mauris pellentesque pulvinar pellentesque. Diam phasellus vestibulum lorem sed risus. In iaculis nunc sed augue lacus viverra vitae congue.`,
				"next":"true",
				"split":9,
				"text-align":"center",
				"nest":{
					group:"article section",
					name:"B2",
					under:"A1"
				},
            },

		] .map((x:any,i)=>{
			x.key += "-navigation-articles-3"
			return x
		})
	},
]
let video_navigation = objectCopy(home_development.slice(0,1)[0])
video_navigation.title ="video navigation"
video_navigation.metafields[0].navigation.name = "videos"
let video_development = [
	video_navigation,
	{
		"title": "videos",
		"type_slug": "forms",
		"metafields": [

			{
				"key": "Body",
				"type": "body",
				"left":147,
				// height:1700,
				// width:300,
				delta:{

				},
				nest:{
					"group":[
						// {
						// 	name:"article section",
						// 	type:"regular"
						// },
					],
				},
				navigation:{
					name:"videos"
				},
				"googleSheets": {},
				options:{
					css:{
						// width:"20%",
						opacity:".5",
						// "max-width":"285px"
						"background-color":"rgb(176,196,222)"
					},
					judima:{
						moving:{
							point:"bottom",
							target:'video navigation',
							coordinates:{x:0,y:0},
							type:"custom"
						}
					},
				}
			},
			{
				"key": "heading",
				type:"heading",
				"value":"Videos",
				"split": "9",
				// "left":"700",
				"text-align":"left",
				// "nest":{
				// 	group:"article section",
				// 	name:"B1",
				// 	under:"A1"
				// },
				options:{
					css:{
						// height:"200px",
						"text-align":"center",
						"font-family":"Gilgongo Doro"
					}
				},
				"googleSheets": {},
			},
            {
                "key": "text",
                "type": "video",
				"next":"true",
				"split":9,
				"text-align":"center",
            },
            {
                "key": "text",
                "type": "button",
				value:"Start",
				"next":"true",
				"split":3,
				"text-align":"center",
            },
            {
                "key": "text",
                "type": "button",
				value:"Pause",
				"split":3,
				"text-align":"center",
            },
            {
                "key": "text",
                "type": "button",
				value:"Stop",
				"split":3,
				"text-align":"center",
            },


		] .map((x:any,i)=>{
			x.key += "-navigation-video"
			return x
		})
	},

]
let blog_navigation = objectCopy(home_development.slice(0,1)[0])
blog_navigation.title = "blog navigation"
blog_navigation.metafields[0].navigation.name = "blog"
let blog_development = [
	blog_navigation,
	{
		"title": "blog title",
		"type_slug": "forms",
		"metafields": [

			{
				"key": "Body",
				"type": "body",
				"left":147,
				delta:{

				},
				nest:{
					"group":[
						{
							name:"blog title",
							type:"regular"
						},
					],
				},
				navigation:{
					name:"blog"
				},
				"googleSheets": {},
				options:{
					css:{

						opacity:".5",

					},
					judima:{
						moving:{
							point:"bottom",
							target:'blog navigation',
							coordinates:{x:0,y:0},
							type:"custom"
						}
					},
				}
			},
			{
				key:"heading container",
				type:"div",
				split:9,
				top:0,
				height:"200",
				"nest":{
					group:"blog title",
					name:"A1"
				},
				options:{
					css:{
						"background-color":"rgb(0,255,255)",
						"display":"flex",
						"flex-direction":"row",
						"place-content":"flex-start center"
					}
				}
			},
			{
				"key": "heading",
				type:"heading",
				"value":"Blog",
				"split": "9",
				// "left":"700",
				"text-align":"left",
				"nest":{
					group:"blog title",
					name:"B1",
					under:"A1"
				},
				options:{
					css:{
						// height:"200px",
						"font-size":"108px",
						"text-align":"center",
						"font-family":"Gilgongo Doro"
					}
				},
				"googleSheets": {},
			},
            {
                "key": "text",
                "type": "div",
				"next":"true",
				"split":1,
				"height":1,

            },



		] .map((x:any,i)=>{
			x.key += "-navigation-blog"
			return x
		})
	},
	{
		"title": "blog aside",
		"type_slug": "forms",
		"metafields": [

			{
				"key": "Body",
				"type": "body",
				"left":147,
				"gap":10,
				// "top":0,
				// height:1700,
				width:200,
				delta:{
					group:[
						{
							name:"media_card",
							type:"repeat",
							by:"5"
						}
					]
				},
				nest:{
					"group":[

					],
				},
				navigation:{
					name:"blog"
				},
				"googleSheets": {},
				options:{
					css:{
						width:"25%",
						opacity:".5",
						// "background-color":"rgb(0,25,255)",

					},
					judima:{
						moving:{
							point:"right",
							target:'blog title',
							coordinates:{x:-950,y:200},
							type:"custom"
						}
					},
				}
			},

			{
				"key": "heading",
				type:"heading",
				"value":"Aside",
				"split": "9",
				// "left":"700",
				"text-align":"left",
				options:{
					css:{
						"font-size":"80px",
						// height:"200px",
						"text-align":"center",
						"font-family":"Gilgongo Doro"
					}
				},
				"googleSheets": {},
			},
			{
                "key": "image-1",
                "type": "image",
                "imageURL":"python.jpg",
				split:6,
				height:170,
				delta:{
					group:"media_card",
				},
				options:{
					css:{
						height:"170px",
						width:"170px"
					}
				}
            },
			{
                "key": "text",
                "type": "text",
				split:3,
				value:"Some Text",
				delta:{
					group:"media_card",
				},
				options:{
					css:{
						// height:"170px",
						// width:"170px"
					}
				}
            },



		] .map((x:any,i)=>{
			x.key += "-navigation-blog"
			return x
		})
	},
	{
		"title": "blog forum",
		"type_slug": "forms",
		"metafields": [

			{
				"key": "Body",
				"type": "body",
				"left":147,
				// height:1700,
				width:600,
				delta:{
					group:[
						{
							name:"outerDelta",
							type:"add_remove_button"
						},
						{
							name:"secondDelta",
							type:"add_remove_button"
						}
					]
				},
				nest:{
					"group":[

					],
				},
				navigation:{
					name:"blog"
				},
				"googleSheets": {},
				options:{
					css:{
						width:"25%",
						opacity:".5",
						// "background-color":"rgb(0,25,255)",

					},
					judima:{
						moving:{
							point:"right",
							target:'blog aside',
							coordinates:{x:-450,y:200},
							type:"custom"
						}
					},
				}
			},

			{
				"key": "heading",
				type:"heading",
				"value":"Forum",
				"split": "9",
				// "left":"700",
				"text-align":"left",
				options:{
					css:{
						// height:"200px",
						"font-size":"108px",
						"text-align":"center",
						"font-family":"Gilgongo Doro"
					}
				},
				"googleSheets": {},
			},
			{
                "key": "counter",
                "type": "count",
				value:"1",
				split:1,
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						"font-size":"40px"
					}
				}
            },
			{
                "key": "loading",
                "type": "loading",
				// value:"ENTER TEXT HERE",
				height:200,
				split:8,
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						"stroke":"green"
					}
				}
            },
			{
                "key": "textbox",
                "type": "textbox",
				value:"ENTER TEXT HERE",
				height:200,
				split:8,
				delta:{
					"group":"outerDelta"
				},
				options:{
					css:{
						"font-size":"40px",
					}
				}
            },
			{
				"key": "add",
				"type": "button",
				"value":"Add ",
				delta:{
					"group":"outerDelta",
					"type":"add",
					"by":"1"
				},
				"split": "3",
				"googleSheets": {},
			},
			{
				"key": "add",
				"type": "button",
				"value":"Add ",
				delta:{
					"group":"outerDelta",
					"type":"add",
					"by":"1"
				},
				"split": "3",
				"googleSheets": {},
			},
			{
				"key": "remove",
				"type": "button",
				"value":"Remove",
				delta:{
					"group":"outerDelta",
					"type":"remove",
					"by":"1"
				},
				"split": "6",
				"googleSheets": {},
			},
			{
				"key": "table",
				"type": "dropdown",
				"value":"Duplicate Me",
				// "height":300,
				delta:{
					"group":"secondDelta",
				},
				latch:{
					options:[ //look to changes this to options
						"A",
						"B",
						"C",
						"D",
						"E",
						"F",
					],
					// "state":"open"

				},
				"split": "6",
				"googleSheets": {},
			},
			{
				"key": "add",
				"type": "button",
				"value":"Add ",
				next:"true",
				delta:{
					"group":"secondDelta",
					"type":"add",
					"by":"3"
				},
				"split": "3",
				"googleSheets": {},
			},
			{
				"key": "remove",
				"type": "button",
				"value":"Remove",
				delta:{
				"group":"secondDelta",
					"type":"remove",
					"by":"2"
				},
				"split": "6",
				"googleSheets": {},
			},




		] .map((x:any,i)=>{
			x.key += "-navigation-blog-forum"
			return x
		})
	},

]

let guides_navigation = objectCopy(home_development.slice(0,1)[0])
guides_navigation.title = "guides navigation"
guides_navigation.metafields[0].navigation.name = "guides"
let guides_development = [
	guides_navigation,
	...display_development
]

let navigation_development = [
	...home_development,
	...about_development,
	...articles_development,
	...video_development,
	...blog_development,
	...guides_development
]
let navigation_testing = [...navigation_development]


let mobileCustom_development  = [
	{
		"title": "navigation",
		"type_slug": "forms",
		"metafields": [

			{
				"key": "Body",
				"type": "body",
				// "left":200,
				delta:{

				},
				nest:{

				},
				navigation:{
					"group":[
						{
							name:"home",
							type:"direct_link"
						},
						{
							name:"about",
							type:"direct_link"
						},
						{
							name:"articles",
							type:"direct_link"
						},
						{
							name:"videos",
							type:"direct_link"
						},
						{
							name:"blog",
							type:"direct_link"
						},
					],
					name:"articles"
				},
				"googleSheets": {},
				options:{
					css:{
						// width:"125%"
						"background-color":"rgb(205, 180, 178)"
					},
					judima:{
						mobile:{
							stack:20,
							widthRatio:.9,
							footerSpace:50
						}
					}
				},
				appSection:{
					confirm:"true"
				},


			},
			{
				"key": "heading",
				type:"heading",
				"value":"Judima",
				// "split": "3",
				"text-align":"left",
				options:{
					css:{
						height:"200px",
						"text-align":"left",
						"font-family":"Gilgongo Doro"
					},

				},
				"googleSheets": {},
			},
            {
                "key": "image-1",
                "type": "image",
                "imageURL":"angular.png",
                "height":"100",
                "split":2,
				options:{
					judima:{
						mobile:{
							widthRatio:.3,
							top:100
						}
					}
				}
            },
			{
				"key": "home",
				type:"text",
				"value":"Home",
				navigation:{
					group:"home",
					type:"direct_link"
				},
				options:{
					judima:{
						mobile:{
							top:100
						}
					}
				}
			},
			{
				"key": "about",
				type:"text",
				"value":"About",
				navigation:{
					group:"about",
					type:"direct_link"
				}

			},
			{
				"key": "articles",
				type:"text",
				"value":"Articles",
				navigation:{
					group:"articles",
					type:"direct_link"
				}

			},
			{
				"key": "videos",
				type:"text",
				"value":"Videos",
				navigation:{
					group:"videos",
					type:"direct_link"
				}

			},
			{
				"key": "blog",
				type:"text",
				"value":"Blog",
				next:"true",
				top:-40,
				left:500,
				navigation:{
					group:"blog",
					type:"direct_link"
				}
			},
			{
				"key": "guides",
				type:"text",

				// top:-40,
				top:-40,
				"value":"Guides",
			},
			{
				"key": "books",
				type:"text",
				// top:-40,
				top:-40,
				"value":"Books",
			},




		] .map((x:any,i)=>{
			x.key += "-component-position"
			return x
		})
	},
	{
		"title": "section 1",
		"type_slug": "forms",
		"metafields": [

			{
				"key": "Body",
				"type": "body",
				"left":147,
				// height:1700,
				width:300,
				delta:{
					group:[

					]
				},
				nest:{
					"group":[
						{
							name:"article section",
							type:"regular"
						},
					],
				},
				navigation:{
					name:"articles"
				},
				"googleSheets": {},
				options:{
					css:{
						width:"20%",
						opacity:".5",
						"background-color":"black"
						// "max-width":"285px"
					},
					judima:{
						mobile:{
							stack:0,
							widthRatio:1
						},
						moving:{
							point:"bottom",
							target:'navigation',
							coordinates:{x:0,y:0},
							type:"custom"
						}
					},
				}
			},
			{
				key:"container",
				type:"div",
				height:1000,
				split:9,
				top:0,
				options:{
					css:{
						"background-color":"lightgreen"
					}
				},
				"nest":{
					group:"article section",
					name:"A1",
				},
			},
			{
				key:"helper",
				type:"div",
				height:20,
				split:1,
				options:{
					css:{
						"background-color":"darkgreen"
					}
				},
			},
			{
				"key": "heading",
				type:"heading",
				"value":"Section 1",
				"split": "9",
				// "left":"700",
				"text-align":"left",
				"nest":{
					group:"article section",
					name:"B1",
					under:"A1"
				},
				options:{
					css:{
						// height:"200px",
						"text-align":"center",
						"font-family":"Gilgongo Doro"
					}
				},
				"googleSheets": {},
			},

            {
                "key": "text",
                "type": "text",
                "value":`Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl nisi scelerisque eu ultrices vitae auctor. Et sollicitudin ac orci phasellus egestas tellus. Pellentesque diam volutpat commodo sed egestas. Diam quam nulla porttitor massa. Molestie ac feugiat sed lectus vestibulum mattis. Nisi est sit amet facilisis magna etiam tempor orci eu. Enim nec dui nunc mattis. Adipiscing bibendum est ultricies integer quis auctor elit sed. Fusce id velit ut tortor pretium. Maecenas accumsan lacus vel facilisis. Aliquam ultrices sagittis orci a. Urna nunc id cursus metus aliquam eleifend mi in nulla. Et magnis dis parturient montes nascetur ridiculus. Sollicitudin ac orci phasellus egestas tellus rutrum. Libero enim sed faucibus turpis in eu mi bibendum neque. Massa enim nec dui nunc mattis. Elit scelerisque mauris pellentesque pulvinar pellentesque. Diam phasellus vestibulum lorem sed risus. In iaculis nunc sed augue lacus viverra vitae congue.`,
				"next":"true",
				"split":9,
				"text-align":"center",
				"nest":{
					group:"article section",
					name:"B2",
					under:"A1"
				},
            },

		] .map((x:any,i)=>{
			x.key += "-navigation-articles"
			return x
		})
	},
	{
		"title": "header",
		"type_slug": "forms",
		"metafields": [

			{
				"key": "Body",
				"type": "body",
				"left":147,
				// height:1700,
				width:650,
				delta:{
					group:[

					]
				},
				nest:{
					"group":[
						{
							name:"article section",
							type:"regular"
						},
					],
				},
				navigation:{
					name:"articles"
				},
				"googleSheets": {},
				options:{
					css:{
						width:"20%",
						opacity:".5",
						"background-color":"red"
					},
					judima:{
						mobile:{
							stack:0,
							widthRatio:1,
							footerSpace:0
						},
						moving:{
							point:"right",
							target:'section 1',
							coordinates:{x:-670,y:0},
							type:"custom"
						},

					},
				}
			},
			{
				key:"container",
				type:"div",
				height:200,
				split:9,
				top:0,
				options:{
					css:{
						"background-color":"tomato",
						display:"flex",
						"flex-direction": "row",
						"justify-content":"center",
						"align-content":"flex-start"
					}
				},
				"nest":{
					group:"article section",
					name:"A1",
				},
			},
			{
				key:"helper",
				type:"div",
				height:20,
				split:1,
				options:{
					css:{
						"background-color":"crimson"
					}
				}
			},
			{
				"key": "heading",
				type:"heading",
				"value":"Article Name Here",
				// "left":"700",
				"nest":{
					group:"article section",
					name:"B1",
					under:"A1"
				},
				options:{
					css:{
						// height:"200px",
						"text-align":"center",
						"font-family":"Gilgongo Doro"
					}
				},
				"googleSheets": {},
			},


		] .map((x:any,i)=>{
			x.key += "-navigation-articles"
			return x
		})
	},
	{
		"title": "section 2",
		"type_slug": "forms",
		"metafields": [

			{
				"key": "Body",
				"type": "body",
				"left":147,
				// height:1700,
				width:300,
				delta:{
					group:[

					]
				},
				navigation:{
					name:"articles"
				},
				nest:{
					"group":[
						{
							name:"article section",
							type:"regular"
						},
					],
				},
				"googleSheets": {},
				options:{
					css:{
						width:"20%",
						opacity:".5",
						"background-color":"blue"
						// "max-width":"285px"
					},
					judima:{
						moving:{
							point:"right",
							target:'header',
							coordinates:{x:-320,y:0},
							type:"custom"
						}
					},
				}
			},
			{
				key:"container",
				type:"div",
				height:1000,
				split:9,
				top:0,
				options:{
					css:{
						"background-color":"rgb(0,191,255)"
					}
				},
				"nest":{
					group:"article section",
					name:"A1",
				},
			},
			{
				key:"helper",
				type:"div",
				height:1,
				split:1,
				options:{
					css:{
						"background-color":"lightgreen"
					}
				},
			},
			{
				"key": "heading",
				type:"heading",
				"value":"Section 2",
				"split": "9",
				// "left":"700",
				"text-align":"left",
				"nest":{
					group:"article section",
					name:"B1",
					under:"A1"
				},
				options:{
					css:{
						// height:"200px",
						"text-align":"center",
						"font-family":"Gilgongo Doro"
					}
				},
				"googleSheets": {},
			},

            {
                "key": "text",
                "type": "text",
                "value":`Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl nisi scelerisque eu ultrices vitae auctor. Et sollicitudin ac orci phasellus egestas tellus. Pellentesque diam volutpat commodo sed egestas. Diam quam nulla porttitor massa. Molestie ac feugiat sed lectus vestibulum mattis. Nisi est sit amet facilisis magna etiam tempor orci eu. Enim nec dui nunc mattis. Adipiscing bibendum est ultricies integer quis auctor elit sed. Fusce id velit ut tortor pretium. Maecenas accumsan lacus vel facilisis. Aliquam ultrices sagittis orci a. Urna nunc id cursus metus aliquam eleifend mi in nulla. Et magnis dis parturient montes nascetur ridiculus. Sollicitudin ac orci phasellus egestas tellus rutrum. Libero enim sed faucibus turpis in eu mi bibendum neque. Massa enim nec dui nunc mattis. Elit scelerisque mauris pellentesque pulvinar pellentesque. Diam phasellus vestibulum lorem sed risus. In iaculis nunc sed augue lacus viverra vitae congue.`,
				"next":"true",
				"split":9,
				"text-align":"center",
				"nest":{
					group:"article section",
					name:"B2",
					under:"A1"
				},
            },

		] .map((x:any,i)=>{
			x.key += "-navigation-articles-2"
			return x
		})
	},
	{
		"title": "section 3",
		"type_slug": "forms",
		"metafields": [

			{
				"key": "Body",
				"type": "body",
				"left":147,
				// height:1700,
				width:330,
				delta:{
					group:[

					]
				},
				nest:{
					"group":[
						{
							name:"article section",
							type:"regular"
						},
					],
				},
				navigation:{
					name:"articles"
				},
				"googleSheets": {},
				options:{
					css:{
						width:"20%",
						opacity:".5",
						"background-color":"purple"
						// "max-width":"285px"
					},
					judima:{
						moving:{
							point:"right",
							target:'header',
							coordinates:{x:-970,y:200},
							type:"custom"
						}
					},
				}
			},
			{
				key:"container",
				type:"div",
				height:1000,
				split:9,
				top:0,
				options:{
					css:{
						"background-color":"rgb(238,130,238)"
					}
				},
				"nest":{
					group:"article section",
					name:"A1",
				},
			},
			{
				key:"helper",
				type:"div",
				height:1,
				split:1,
				options:{
					css:{
						"background-color":"lightgreen"
					}
				},
			},
			{
				"key": "heading",
				type:"heading",
				"value":"Section 3",
				"split": "9",
				// "left":"700",
				"text-align":"left",
				"nest":{
					group:"article section",
					name:"B1",
					under:"A1"
				},
				options:{
					css:{
						// height:"200px",
						"text-align":"center",
						"font-family":"Gilgongo Doro"
					}
				},
				"googleSheets": {},
			},

            {
                "key": "text",
                "type": "text",
                "value":`Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl nisi scelerisque eu ultrices vitae auctor. Et sollicitudin ac orci phasellus egestas tellus. Pellentesque diam volutpat commodo sed egestas. Diam quam nulla porttitor massa. Molestie ac feugiat sed lectus vestibulum mattis. Nisi est sit amet facilisis magna etiam tempor orci eu. Enim nec dui nunc mattis. Adipiscing bibendum est ultricies integer quis auctor elit sed. Fusce id velit ut tortor pretium. Maecenas accumsan lacus vel facilisis. Aliquam ultrices sagittis orci a. Urna nunc id cursus metus aliquam eleifend mi in nulla. Et magnis dis parturient montes nascetur ridiculus. Sollicitudin ac orci phasellus egestas tellus rutrum. Libero enim sed faucibus turpis in eu mi bibendum neque. Massa enim nec dui nunc mattis. Elit scelerisque mauris pellentesque pulvinar pellentesque. Diam phasellus vestibulum lorem sed risus. In iaculis nunc sed augue lacus viverra vitae congue.`,
				"next":"true",
				"split":9,
				"text-align":"center",
				"nest":{
					group:"article section",
					name:"B2",
					under:"A1"
				},
            },

		] .map((x:any,i)=>{
			x.key += "-navigation-articles-3"
			return x
		})
	},
	{
		"title": "section 4",
		"type_slug": "forms",
		"metafields": [

			{
				"key": "Body",
				"type": "body",
				"left":147,
				// height:1700,
				width:300,
				delta:{
					group:[

					]
				},
				nest:{
					"group":[
						{
							name:"article section",
							type:"regular"
						},
					],
				},
				navigation:{
					name:"articles"
				},
				"googleSheets": {},
				options:{
					css:{
						width:"20%",
						opacity:".5",
						"background-color":"orange"
						// "max-width":"285px"
					},
					judima:{
						moving:{
							point:"right",
							target:'section 3',
							coordinates:{x:-620,y:200},
							type:"custom"
						}
					},
				}
			},
			{
				key:"container",
				type:"div",
				height:1000,
				split:9,
				top:0,
				options:{
					css:{
						"background-color":"rgb(244,164,96)"
					}
				},
				"nest":{
					group:"article section",
					name:"A1",
				},
			},
			{
				key:"helper",
				type:"div",
				height:1,
				split:1,
				options:{
					css:{
						"background-color":"lightgreen"
					}
				},
			},
			{
				"key": "heading",
				type:"heading",
				"value":"Section 4",
				"split": "9",
				// "left":"700",
				"text-align":"left",
				"nest":{
					group:"article section",
					name:"B1",
					under:"A1"
				},
				options:{
					css:{
						// height:"200px",
						"text-align":"center",
						"font-family":"Gilgongo Doro"
					}
				},
				"googleSheets": {},
			},

            {
                "key": "text",
                "type": "text",
                "value":`Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl nisi scelerisque eu ultrices vitae auctor. Et sollicitudin ac orci phasellus egestas tellus. Pellentesque diam volutpat commodo sed egestas. Diam quam nulla porttitor massa. Molestie ac feugiat sed lectus vestibulum mattis. Nisi est sit amet facilisis magna etiam tempor orci eu. Enim nec dui nunc mattis. Adipiscing bibendum est ultricies integer quis auctor elit sed. Fusce id velit ut tortor pretium. Maecenas accumsan lacus vel facilisis. Aliquam ultrices sagittis orci a. Urna nunc id cursus metus aliquam eleifend mi in nulla. Et magnis dis parturient montes nascetur ridiculus. Sollicitudin ac orci phasellus egestas tellus rutrum. Libero enim sed faucibus turpis in eu mi bibendum neque. Massa enim nec dui nunc mattis. Elit scelerisque mauris pellentesque pulvinar pellentesque. Diam phasellus vestibulum lorem sed risus. In iaculis nunc sed augue lacus viverra vitae congue.`,
				"next":"true",
				"split":9,
				"text-align":"center",
				"nest":{
					group:"article section",
					name:"B2",
					under:"A1"
				},
            },

		] .map((x:any,i)=>{
			x.key += "-navigation-articles-3"
			return x
		})
	},
]

let mobileCustom_testing = [
	...mobileCustom_development
]



website.convertCMS = navigation_testing




export default website
