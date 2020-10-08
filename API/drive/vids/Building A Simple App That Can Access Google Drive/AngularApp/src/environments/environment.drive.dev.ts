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
		apiKey: "AIzaSyBUNA128RmwCbTjRT9wx0th0fPPPj9qZkA",
		clientId: "637621663480-v9bjf1b2cvkc0ummik2hs1v6fbr4raj3.apps.googleusercontent.com"
		//
	},
	playground: {
		create: false,
		createThumbnail: false,
		upload: {
			simple: false,
			multipart: false,
			resumable: true,
			indexable:false,
			gSuite:false
		}
	},

	//replace upload object here
	upload:{
		simple:false,
		multipart:false,
		resumable:true
	}
	//
		

};

