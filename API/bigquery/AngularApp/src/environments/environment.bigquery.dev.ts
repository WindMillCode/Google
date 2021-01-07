export const environment: any = {
    production: false,
    url: 'Bigquery',
    inputHandle: {
        options: false,
        link: false,
        linkInit: false
    },
    cookie:{
        // permission:"allow",
        // confirm:"false"
    },
    component: {

        form: {
            panelView: -1, //should be a number use a positive number to view it
            lifecycleHooks: false,
            zChildView:-1,
            zChild:-1
        },
        dialog: {
            panelView: -1,
			lifecycleHooks: true,
            zChildView:-1,
            zChild:-1
        },
        app: {}
    },
    submission: {
        fakeValues: false,
        optionsClicked: true,
        endUser: true,
        moreThanOne:false,
        click:false,
        play: false,
        invalidate: {
            any: false,
        }
    },
    testingAcct:{
		confirm:"false", //true for hubspot false for drive
		capybara: { // remove this if not doing unit or e2e tests impt
			main:"true",
			url:"Bigquery"
		}
    },
    sentry:{
        env:"Bigquery_development",
        defaultIntegrations:true,
        tracingOrigins:["localhost",/^\//]
    },
    dataset:{
    },

    // update tables object here
    regularTables:{
        default:true,

        IAM:false,
        setIAM:false,

        browse:false,
        query:false
    },
    //

    //update table Schemas object here
    tableSchemas:{

    }
    //

};

