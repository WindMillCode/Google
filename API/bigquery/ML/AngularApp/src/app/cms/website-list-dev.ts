import {objectCopy} from '../customExports'

let website:any = {}





let list_models_development = [
	{
		"title":"list_models",
		"type_slug": "forms",
		"metafields":[
			{
				key:"Body",
				type:"body",
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
				key:"heading",
				type:"heading",
				value:"Bigquery ML",
			},
			{
				key:"table",
				type:"simpleTable",
				height:"500",
				options:{
					css:{}
				}
			},
			{
				key:"list models",
				type:"listModelsButton",
				value:"List Models",
				options:{
					css:{}
				}
			}
		]
	}
]






website.convertCMS = list_models_development




export default website
