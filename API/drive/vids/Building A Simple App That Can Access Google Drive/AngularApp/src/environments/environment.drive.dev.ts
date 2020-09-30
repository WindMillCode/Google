export const environment:any = {
  production: false,
  url:'rental',
  inputHandle:{
      options:false,
      link:false,
      linkInit:true
  },
  lifecycleHooks:false,
  component:{
      zChild:false,
      form:{
        panelView:-1, //should be a number use a availble number to view it
        lifecycleHooks:false,
      },
      dialog:{
        panelView:-1,
        lifecycleHooks:false,
      },
      app:{}
  },
  submission:{
        fakeValues:true,
        optionsClicked:true,      
        endUser:true,
        click:false
  },
  googleDrive:{
    clientId:"",
    clientSecret:"",
    apiKey:""
  }

};

