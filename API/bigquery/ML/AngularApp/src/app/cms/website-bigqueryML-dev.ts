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
				// "left":-20,
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
						{
							name:"Update Model Metadata",
							type:"direct_link"
						},
						{
							name:"Copy Model",
							type:"direct_link"
						},
						{
							name:"Exporting Model",
							type:"direct_link"
						},
						{
							name:"Delete Model",
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
									width:1.05,
									height:1.5,
									top:-10,
									left:-40
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
				},
				options:{
					css:{
						"z-index":2
					}
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
			{
				"key": "update-Model-Metadata",
				type:"text",
				"value":"Update Model Metadata",
				navigation:{
					group:"Update Model Metadata",
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
				"key": "copy-Model",
				type:"text",
				"value":"Copy Model",
				next:"true",
				left:500,
				navigation:{
					group:"Copy Model",
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
				"key": "exporting-Model",
				type:"text",
				"value":"Export Model",

				navigation:{
					group:"Exporting Model",
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
				"key": "delete-Model",
				type:"text",
				"value":"Delete Models",
				// left:450,
				navigation:{
					group:"Delete Model",
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
									width:1.06,
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
				height:"300",
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

let getModelMetadata = [
	...getModelMetadataNavigation,
	{
		"title":"getModelMetadata",
		"type_slug": "forms",
		"metafields":[
			{
				key:"Body",
				type:"body",
				// left:20,
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
                left:400,
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
                left:300,
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
                left:320,
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
let  updateModelMetadataNavigation = objectCopy(navigation)
updateModelMetadataNavigation[0].metafields[0].navigation.name = "Update Model Metadata"

let updateModelMetadata = [
	...updateModelMetadataNavigation,
	{
		"title":"updateModelMetadata",
		"type_slug": "forms",
		"metafields":[
			{
				key:"Body",
				type:"body",
				// left:20,
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
					name:"Update Model Metadata"
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
									height:1.3,
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
				value:"Enter the name of the model ",
                left:450,
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
                left:300,
                width:600,
				options:{
					css:{
                        "z-index":2,
                        "text-align":"center"
                    },
                    extras:{
                        appUpdateModelMetadata:{
                            type:"modelName"
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
				key:"question",
				type:"text",
				value:"Update the model description here",
				next:"true",
                left:400,
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
				type:"textbox",
                next:"true",
                left:300,
                width:600,
				height:100,
				options:{
					css:{
                        "z-index":2,
                        "text-align":"center"
                    },
                    extras:{
                        appUpdateModelMetadata:{
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
				key:"button",
				type:"updateMetadataButton",
				split:5,
                left:320,
                next:"true",
				value:"Update Model Metadata",
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
                        appUpdateModelMetadata:{
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
let  copyModelNavigation = objectCopy(navigation)
copyModelNavigation[0].metafields[0].navigation.name = "Copy Model"
let copyModel = [
	...copyModelNavigation,
	{
		"title":"copyModel",
		"type_slug": "forms",
		"metafields":[
			{
				key:"Body",
				type:"body",
				// left:20,
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
					name:"Copy Model"
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
									height:1.3,
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
				value:"Enter the name of the model ",
                left:450,
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
                left:300,
                width:600,
				options:{
					css:{
                        "z-index":2,
                        "text-align":"center"
                    },
                    extras:{
                        appCopyModel:{
                            type:"modelName"
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
				key:"question",
				type:"text",
				value:"Enter the new name for the copied model",
				next:"true",
                left:400,
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
                left:300,
                width:600,
				options:{
					css:{
                        "z-index":2,
                        "text-align":"center"
                    },
                    extras:{
                        appCopyModel:{
                            type:"destModel"
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
				key:"button",
				type:"copyModelButton",
				split:5,
                left:320,
                next:"true",
				value:"Copy Model",
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
                        appCopyModel:{
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
let  exportModelNavigation = objectCopy(navigation)
exportModelNavigation[0].metafields[0].navigation.name = "Exporting Model"
let exportModel = [
	...exportModelNavigation,
	{
		"title":"exportModel",
		"type_slug": "forms",
		"metafields":[
			{
				key:"Body",
				type:"body",
				// left:20,
				delta:{
					group:[
						{
							name:"storage-buckets",
							type:"add_remove_button"
						},
					]
				},
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
					name:"Exporting Model"
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
									height:1.3,
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
				value:"Enter the name of the model ",
                left:450,
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
                left:300,
                width:600,
				options:{
					css:{
                        "z-index":2,
                        "text-align":"center"
                    },
                    extras:{
                        appExportModel:{
                            type:"modelName"
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
				key:"question",
				type:"text",
				value:"Provide the gs bucket destination URI(s)",
				next:"true",
                left:400,
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
				delta:{
					"group":"storage-buckets"
				},
                left:300,
                width:600,
				options:{
					css:{
                        "z-index":2,
                        "text-align":"center"
                    },
                    extras:{
                        appExportModel:{
                            type:"storageBuckets"
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
				"key": "add-1",
				"type": "button",
				"value":"Add ",
				"next":"true",
				left:270,
				delta:{
					"group":"storage-buckets",
					"type":"add",
					"by":"1"
				},
				"split": "3",
			},
			{
				"key": "remove-1",
				"type": "button",
				"value":"Remove",
				delta:{
					"group":"storage-buckets",
					"type":"remove",
					"by":"1"
				},
				"split": "3",
				"googleSheets": {},
			},
			{
				key:"button",
				type:"exportModelButton",
				split:5,
                left:320,
                next:"true",
				value:"Export Model",
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
                        appExportModel:{
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
let  deleteModelNavigation = objectCopy(navigation)
deleteModelNavigation[0].metafields[0].navigation.name = "Delete Model"
let deleteModel = [
	...deleteModelNavigation,
	{
		"title":"deleteModel",
		"type_slug": "forms",
		"metafields":[
			{
				key:"Body",
				type:"body",
				// left:20,
				delta:{
					group:[
						{
							name:"model-delete",
							type:"add_remove_button"
						},
					]
				},
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
					name:"Delete Model"
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
									height:1.3,
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
				value:"Enter the model(s) to be deleted",
				next:"true",
                left:400,
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
				delta:{
					"group":"model-delete"
				},
                left:300,
                width:600,
				options:{
					css:{
                        "z-index":2,
                        "text-align":"center"
                    },
                    extras:{
                        appDeleteModel:{
                            type:"models"
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
				"key": "add-1",
				"type": "button",
				"value":"Add ",
				"next":"true",
				left:270,
				delta:{
					"group":"model-delete",
					"type":"add",
					"by":"1"
				},
				"split": "3",
			},
			{
				"key": "remove-1",
				"type": "button",
				"value":"Remove",
				delta:{
					"group":"model-delete",
					"type":"remove",
					"by":"1"
				},
				"split": "3",
				"googleSheets": {},
			},
			{
				key:"button",
				type:"deleteModelButton",
				split:5,
                left:320,
                next:"true",
				value:"Delete",
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
                        appDeleteModel:{
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
	...getModelMetadata,
	...updateModelMetadata,
	...copyModel,
	...exportModel,
	...deleteModel
]



export default website
