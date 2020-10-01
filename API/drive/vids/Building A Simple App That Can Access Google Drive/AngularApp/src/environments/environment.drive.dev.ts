export const environment: any = {
	production: false,
	url: 'rental',
	inputHandle: {
		options: false,
		link: false,
		linkInit: true
	},
	printFiles: {
		test:true
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
		clientId: "637621663480-fjeor8d83uakuld5fngm1k0hhmfbngpf.apps.googleusercontent.com",
		clientSecret: "",
		apiKey: "AIzaSyAl4azeCqVGiLKooch7LCsNh5HTleDt1Mc"
	}

};

