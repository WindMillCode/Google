import {objectCopy} from '../customExports'

let website:any = {}





website.convertCMS = [
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
                split:9,
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



export default website
