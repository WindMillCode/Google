# Enable Real-Time Communication With WebRTC

<!-- ## [Youtube Walkthrough]() -->


* after the lab your file should look like template.final.py 
* if issues copy and paste from template.start.py


### Start the Angular App

* download the frontend [here](https://downgit.github.io/#/home?url=https://github.com/WindMillCode/Google/tree/master/certifications/google_developer_platform/AngularApp)
open a terminal and head to project root and run this command
```ps1
npm install -s
npx ng serve -c=webRTC --open=true
```

### Setup the Python Backend 
* download the backend [here]()
in a terminal in the folder root
    * target makes it a local package, do not make it global, it might replace your packages
    * if you make a mistake or believe a corruption happened delete site-packages and try again
```ps1
pip install -r requirements.txt --upgrade --target .\site-packages
python .\tornado_server.py
```

* if there are issues remove all datasets created from the lab and start again
* open template.py and in your code editor,



### Stream video from your webcam

* in 'paste env dictionary here' replace
```py
    env=  {
        "create": True,
        "repeated":False,
        "autodetect1":False,
        "add_column":False,
    }
```


### Resources
[MediaTrackConstraints](https://w3c.github.io/mediacapture-main/getusermedia.html#media-track-constraints)

### Challenge 
* implement the socket.io backend in python