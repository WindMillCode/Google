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
		apiKey: "AIzaSyCD44QOh5OaPjmoBP6Rk0iS3omol-AQrJI",
		clientId: "637621663480-g2o26odrg312op1qvj8qfbhd5c4oj3qp.apps.googleusercontent.com"
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
			gSuite:false
		},
		folders:{
			create:false,
			moveFiles:true
		}
	},

	//replace upload object here
	upload:{
		simple:false,
		multipart:false,
		resumable:false
	},
	//


	// replace folders object here
	folders:{
		create:false,
		moveFiles:true
	},
	//

};

