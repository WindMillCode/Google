import {objectCopy} from '../customExports'

let website:any = {}


let navigation = [
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
							name:"List Models",
							type:"direct_link"
						},
						{
							name:"Get Model Metadata",
							type:"direct_link"
						},

					],
					name:"List Models"
				},
				"googleSheets": {},
				options:{
					css:{
						// width:"125%"
						// "background-color":"rgb(205, 180, 178)"
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
				"value":"BigqueryML",
				// "split": "3",
				"text-align":"left",
				options:{
					css:{
						// height:"200px",
						"text-align":"left",
						"font-family":"Gilgongo Doro"
					}
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
								"background-color":"rgb(205, 180, 178)",
								// "z-index":"-1",
							},
							val:"my-display-overlay",
							logic:{
								desktop:{
									width:1,
									height:1.5,
									top:0,
									left:0
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
							group:Array.from(Array(3),(x,i)=>{
								return "my_display_expand_"+(i+1)
							}),
                            extras:{
                                appVanillaTilt:{
                                    confirm:"true"
                                }
                            }
							// type:["deltaNodeContainer"]
						}
					]
				},
				"googleSheets": {},
			},
            {
                "key": "image-1",
                "type": "image",
                "imageURL":"angular.png",
                "height":"100",
                "split":2,
				latch:{
					type:"display",
					display:{
						type:"part",
						name:"my_display_expand_2"
					},
				}
            },
			{
				"key": "List-Models",
				type:"text",
				"value":"List Models",
				navigation:{
					group:"List Models",
					type:"direct_link"
				},
				latch:{
					type:"display",
					display:{
						type:"part",
						name:"my_display_expand_2"
					},
				}
			},
			{
				"key": "get-Model-Metadata",
				type:"text",
				"value":"Get Model Metadata",
				navigation:{
					group:"Get Model Metadata",
					type:"direct_link"
				},
				latch:{
					type:"display",
					display:{
						type:"part",
						name:"my_display_expand_2"
					},
				}

			},






		] .map((x:any,i)=>{
			x.key += "-bigqueryML-navigation"
			return x
		})
	},
]
let listModels = [
	...navigation,
	{
		"title":"listModels",
		"type_slug": "forms",
		"metafields":[
			{
				key:"Body",
				type:"body",
				options:{
					css:{
						// width:"125%"
						// "background-color":"rgb(205, 180, 178)"
					},
					judima:{
						mobile:{
							stack:20,
							footerSpace:50
						}
					}
				},
				navigation:{
					name:"List Models"
				}
			},
			{
				key:"heading",
				type:"heading",
				value:"Bigquery ML",
				split:9,
				top:70,
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
								"z-index":"1",
							},
							val:"my-display-overlay",
							logic:{
								desktop:{
									width:1.1,
									height:1.2,
									top:-30,
									left:-50
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
							group:Array.from(Array(3),(x,i)=>{
								return "my_display_expand_"+(i+1)
							}),
							extras:{
                                appVanillaTilt:{
                                    confirm:"true"
                                }
                            }
							// type:["deltaNodeContainer"]
						}
					]
				},

			},
			{
				key:"table",
				type:"simpleTable",
				height:"500",
				split:9,
				options:{
					css:{
						"z-index":2
					}

				},
				latch:{
					type:"display",
					display:{
						type:"part",
						name:"my_display_expand_2"
					},
				},
			},
			{
				key:"list models",
				type:"listModelsButton",
				split:9,
				value:"List Models",
				options:{
					css:{}
				},
				latch:{
					type:"display",
					display:{
						type:"part",
						name:"my_display_expand_3"
					},
				},
			}
		]
	}
]
let  getModelMetadataNavigation = objectCopy(navigation)
getModelMetadataNavigation[0].metafields[0].navigation.name = "Get Model Metadata"
console.log(
	navigation[0].metafields[0].navigation.name,
	getModelMetadataNavigation[0].metafields[0].navigation.name
)
let getModelMetadata = [
	...getModelMetadataNavigation,
	{
		"title":"getModelMetadata",
		"type_slug": "forms",
		"metafields":[
			{
				key:"Body",
				type:"body",
				left:20,
				options:{
					css:{
						// width:"125%"
						// "background-color":"rgb(205, 180, 178)"
					},
					judima:{
						mobile:{
							stack:20,
							footerSpace:50
						}
					}
				},
				navigation:{
					name:"Get Model Metadata"
				},
				appSection:{
					confirm:"true",

				}
			},
			{
				key:"heading",
				type:"heading",
				value:"Bigquery ML",
				split:9,
				top:70,
                options:{

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
								// "z-index":"-1",
							},
							val:"my-display-overlay",
							logic:{
								desktop:{
									width:1.1,
									height:1.7,
									top:-30,
									left:-50
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
							group:Array.from(Array(3),(x,i)=>{
								return "my_display_expand_"+(i+1)
							}),
                            extras:{
                                appVanillaTilt:{
                                    confirm:"true"
                                }
                            }
							// type:["deltaNodeContainer"]
						}
					]
				},

			},
			{
				key:"question",
				type:"text",
				value:"Enter the name of the model to get metadata",
                left:350,
				options:{
					css:{
                        "z-index":2,
                        "text-align":"center"
                    },

				},
				latch:{
					type:"display",
					display:{
						type:"part",
						name:"my_display_expand_2"
					},
				},
			},
			{
				key:"input",
				type:"input",
                next:"true",
                left:350,
                width:600,
				options:{
					css:{
                        "z-index":2,
                        "text-align":"center"
                    },
                    extras:{
                        appGetModelMetadata:{
                            type:"input"
                        }
                    }
				},
				latch:{
					type:"display",
					display:{
						type:"part",
						name:"my_display_expand_2"
					},
				},
			},
			{
				key:"list models",
				type:"getMetadataButton",
				split:5,
                left:370,
                next:"true",
				value:"Get Model Metadata",
				options:{
					css:{},

				},
				latch:{
					type:"display",
					display:{
						type:"part",
						name:"my_display_expand_3"
					},
				},
			},
			{
				key:"result",
				type:"text",
				value:"Result:",
                next:"true",
                split:5,
                left:350,
				options:{
					css:{
                        "z-index":2,
                    },
                    extras:{
                        appGetModelMetadata:{
                            type:"result"
                        }
                    }
				},
				latch:{
					type:"display",
					display:{
						type:"part",
						name:"my_display_expand_2"
					},
				},
			},

		]
	}
]


website.convertCMS = [
	...listModels,
	...getModelMetadata
]



export default website
