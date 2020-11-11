export const environment: any = {
	production: false,
	url: 'playground',
	inputHandle: {
		options: false,
		link: false,
		linkInit: true
	},
	printFiles: {
		test: false
	},
	lifecycleHooks: false,
	component: {
		zChild: false,
		form: {
			panelView: -1, //should be a number use a availble number to view it
			lifecycleHooks: false,
		},
		dialog: {
			panelView: -1,
			lifecycleHooks: false,
		},
		app: {}
	},
	submission: {
		fakeValues: true,
		optionsClicked: true,
		endUser: true,
		click: false
	},
	googleDrive: {
		// insert credentials here
		apiKey: "AIzaSyDGwvxYiTVw95Roljs-wp0t44RcrrfK1Vk",
		clientId: "637621663480-nt3bckdocsmk6hn2h8r0h1226fair6of.apps.googleusercontent.com"
		//
	},
	playground: {
		create: false,
		createThumbnail: false,
		upload: {
			simple: false,
			multipart: false,
			resumable: false,
			indexable:false,
			gSuite:false,
			pregenerated:true,
		},
		folders:{
			create:false,
			moveFiles:false
		},
		download:{
			restrictDownload:false
		}
	},

	//replace upload object here
	upload:{
		simple:false,
		multipart:false	,
		resumable:false,
	},
	//


	// replace folders object here
	folders:{
		create:false,
		moveFiles:true
	},
	//

	// replace download object here
	download:{
		drive:false,
		gSuite:false,
		partial:true
	},
	//

	// replace search object here
	search:{
		all:false,
		query:true
	},
	//
};

