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
		apiKey: "AIzaSyAtQldOTKhcC8njFO_XiknHr3nyA9s3uhg",
		clientId: "637621663480-5ojtpb099mvkick6gv9o8ba2tvdcdh2v.apps.googleusercontent.com"
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

	//replace fields object here
	fields:{
		all:false,
		single:false,
		nested:false,
		group:false,
		multiple:true
	},
	//

	//replace share object here
	share:{
		create:false,
		list:false,
		change:false,
		revoke:false,
		transfer:true,
	},
	//

	//replace adf object here
	adf:{
        create:false,
		list:true
	},
	//

	//replace comment object here
	comment:{
		unanchored:{
			create:false,
		},
		anchored:{
			create:false//doesnt work
		},
		reply:false,
		resolved:false, //doesnt work
		delete:false,
		list:true
	},
	//

	//replace properties object here
	props:{
		create:{
			run:false,
			all:false,
			solo:false
		},
		see:{
			run:true,
			all:false,
			solo:true
		},
	},
    //

    //replace shortcut object here
    shortcut:{
        create:false,
        search:true
    },
    //
};

