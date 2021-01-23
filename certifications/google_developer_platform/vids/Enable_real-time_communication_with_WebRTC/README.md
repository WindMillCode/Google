# Enable Real-Time Communication With WebRTC

<!-- ## [Youtube Walkthrough]() -->


* after the lab your file should look like web-rtc.directive.final.ts 
* if issues copy and paste from web-rtc.directive.start.ts


### Start the Angular App

* download the frontend [here](https://downgit.github.io/#/home?url=https://github.com/WindMillCode/Google/tree/master/certifications/google_developer_platform/AngularApp)
open a terminal and head to project root and run this command
```ps1
npm install -s
npx ng serve -c=webRTC --open=true
```

### Setup the Node.js Backend 
* download the backend [here](https://downgit.github.io/#/home?url=https://github.com/WindMillCode/Google/tree/master/certifications/google_developer_platform/vids/Enable_real-time_communication_with_WebRTC)
in a terminal in the folder root
    * target makes it a local package, do not make it global, it might replace your packages
    * if you make a mistake or believe a corruption happened delete site-packages and try again
```ps1
npm install -s
node index.js
```


* open web-rtc.directive.ts and in your code editor,



### Stream video from your webcam

* in 'self to self mediaStream' paste this code
    * this part focuses on mediaStream especially how we use navigator.mediaDevices.getUserMedia to use the endUser webcam as media
    * this is setup through a self to self RTC peer connection, which means the video call is done in the same webpage, however you need two RTCPeerConnection objects as demonstrated in the event listenenr callbacks
```ts
if(this.extras.webRTC.item === "localVideo"){
    // intialize objects for RTC peer connection

    // 

    // blur the screen so end users can identify you
    this.renderer2.setStyle(
        localVideo,
        "filter",
        "blur(10px) invert(2) opacity(.5)"
    )

    Object.assign(this.zChildren[this.extras.remoteVideo].css,
        {
            filter:"blur(15px) opacity(.8)"
        }
    )
    //

    // Set up initial action buttons status: disable call and hangup.

    //
    
    // request from the end user use of the webcam

    //  
}
```

#### A great understanding of taking advantage of object destructuring
* in ' intialize objects for RTC peer connection' paste this code
    * __mediaStreamConstraints__ help specifiy which media you need from the  end user
    whether it be camera or audio or future media
    * in this lab will see plenty of object destructuining
    ```ts
    let {logVideoLoaded,logResizedVideo,...neededVars} = webRTCFn({
        video,audio,stereo,threeD,digital
    })
    ```
    this is done because implementing webRTC needs much dedication to be properly impleemented, however there is much much complexietly an average web developer is not expected to be responsible for under webRTC
    * this way of coding is good for many use cases because it allows the developers to 
        * constantly update the arguments without the types
        * present elemnts in any order to the fn
        * es6 features compact the code,
        * code stays in the libraries and we only see the variable
    * it is highly encouraged to send single objects as arguments to function calls, containing all items dynamicincally the fn will need
```ts
                    let  mediaStreamConstraints = {
                        video: true,
                        // audio:false
                    };
                    let  offerOptions = {
                        offerToReceiveVideo: 1,
                    };
                    let startTime = null;
                    const localVideo = this.el.nativeElement;
                    const remoteVideo =  this.zChildren[this.extras.remoteVideo].element;
                    const startButton =  this.zChildren[this.extras.startButton].element
                    const callButton =   this.zChildren[this.extras.callButton].element
                    const hangupButton = this.zChildren[this.extras.hangupButton].element
                    let localStream;
                    let remoteStream;
                    let localPeerConnection;
                    let remotePeerConnection;

                    let {logVideoLoaded,logResizedVideo,startAction,callAction,hangupAction
                    ,gotLocalMediaStream,handleLocalMediaStreamError} = webRTCVideoInit({
                        mediaStreamConstraints,
                        offerOptions,
                        startTime,
                        localVideo,
                        remoteVideo,
                        startButton,
                        callButton,
                        hangupButton,
                        localStream,
                        remoteStream,
                        localPeerConnection,
                        remotePeerConnection,
                    })
```

* in 'Set up initial action buttons status: disable call and hangup.' paste
    * look at the fn in the callbacks to see whats going on
```ts
fromEvent(localVideo,'loadedmetadata').subscribe(logVideoLoaded)
fromEvent(remoteVideo,'loadedmetadata').subscribe(logVideoLoaded)
fromEvent(localVideo,'onresize').subscribe(logResizedVideo)


callButton.disabled = true;
hangupButton.disabled = true;

startButton.addEventListener('click', startAction);
callButton.addEventListener('click', callAction);
hangupButton.addEventListener('click', hangupAction);
```

* in 'request from the end user use of the webcam' 
    * this is how we get the webcam 
```ts
from(navigator.mediaDevices.getUserMedia(mediaStreamConstraints))
.subscribe({
    next:gotLocalMediaStream,
    error:handleLocalMediaStreamError,
})
```

* head to the frontend and play with the first component in green

### Send text data with RTC DATA Channel
in 'rtcDatChannel' paste this code
```ts
else if(this.extras.webRTC.item === "dataChannelSend"){
    // intialize objects for RTC peer connection

    let   localConnection;
    let   remoteConnection;
    let   sendChannel;
    let   receiveChannel;
    let   pcConstraint;
    let   dataConstraint;
    const dataChannelSend = this.el.nativeElement;
    const dataChannelReceive = this.zChildren[this.extras.dataChannelReceive].element;
    const startButton =  this.zChildren[this.extras.startButton].element
    const sendButton =   this.zChildren[this.extras.sendButton].element
    const closeButton = this.zChildren[this.extras.closeButton].element

    this.renderer2.setAttribute(
        dataChannelSend,
        "disabled",
        "true"
    )

    this.renderer2.setAttribute(
        dataChannelReceive,
        "disabled",
        "true"
    )



    let {createConnection,sendData,closeDataChannels} = webRTCTextBoxInit({
            localConnection,
            remoteConnection,
            sendChannel,
            receiveChannel,
            pcConstraint,
            dataConstraint,
            dataChannelSend,
            dataChannelReceive,
            startButton,
            sendButton,
            closeButton,
    })
    //
    
    // data channel is non media communication
    startButton.onclick = createConnection;
    sendButton.onclick = sendData;
    closeButton.onclick = closeDataChannels;
    // 
}
```
* head to the front in the red component hit the start button type text and hit send, when done hit stop


### Using Signaling so RTC Can happen  from different webpages 
* open index.js this is the signaling service backend
* in 'camera app w/ signaling backend' paste this code
    * if you want to have RTCPeer with another enduser outside the current tab you need to create signaling service 
    * __WebRTC does not provide a signaling service 
```ts
else if(this.extras.webRTC.item === "camera"){
    // intialize objects for RTC peer connection

    
    // 

    // blur the screen so end users can identify you
    this.renderer2.setStyle(
        video,
        "filter",
        "contrast(100) sepia(.5) saturate(100) invert(1) blur(5px)"
    )

    this.renderer2.setStyle(
        photo,
        "filter",
        "contrast(100) sepia(.5) saturate(100) invert(1) blur(5px)"
    )
    //    Attach event logic

    // 

    // Create a random room if not already present in the URL.

    // 

    //setup the client side for the socket session

    // 

    // Joining a room

    //  
}
```

* in 'intialize objects for RTC peer connection' paste this code
    * the impt part is the room url element which will be used to indicate to the end user which RTCPeerConnection they are on,
    in practice,only the app needs to know
```ts
                    let configuration = null;
                    let roomURL = this.zChildren[this.extras.url].element;
                    let video = this.el.nativeElement;
                    let photo = this.zChildren[this.extras.photo].element
                    let photoContext = photo.getContext('2d');
                    let trail =          this.zChildren[this.extras.trail].element
                    let snapBtn =        this.zChildren[this.extras.snap].element
                    let sendBtn =        this.zChildren[this.extras.send].element
                    let snapAndSendBtn = this.zChildren[this.extras.snapAndSend].element

                    let photoContextW;
                    let photoContextH;
                    let isInitiator;
                    let room = window.location.hash.substring(1);


                    let peerConn;
                    let dataChannel;
                    //initalize the client socket
                    let socketFn = require ('socket.io-client')
                    let socket= socketFn("http://localhost:8080/")

                    let {updateRoomURL,snapAndSend,sendPhoto,snapPhoto,randomToken,grabWebCamVideo,createPeerConnection,signalingMessageCallback}=  webRTCCamera({
                        roomURL,
                        video,
                        photo,
                        photoContext,
                        trail,
                        snapBtn,
                        sendBtn,
                        snapAndSendBtn,
                        photoContextW,
                        photoContextH,
                        isInitiator,
                        room,
                        peerConn,
                        dataChannel,
                        socket,
                        adapter,

                    })
```
* in 'attach event logic' paste this code
```ts
snapBtn.addEventListener('click', snapPhoto);
sendBtn.addEventListener('click', sendPhoto);
snapAndSendBtn.addEventListener('click', snapAndSend);



                    sendBtn.disabled = true;
                    snapAndSendBtn.disabled = true;
```

* in 'Create a random room if not already present in the URL.' paste this code
    * we use randomToken, to give that room a name
```ts
                    if (!room) {
                        room = window.location.hash = randomToken();
                    }
```

* in 'setup the client side for the socket session' paste this code
    * look at the client side and the server side in index.js and see the actions take as the 2 sockets talk to each other to make sure the RTCPeerConnection works
    * in the server (index.js) the main point is 
    'create or join room'
     which directs 2 clients to join the same session
    * in the client the main  messages are
    created,
    joined,
    full
    which indicates to the client which room they are in and if is there enough space in the current room what to do, in this case make a new room
    * grabWebCamVideo holds the logic for navigator.mediaDevices.getUserMedia
```ts
this.cameraSocketSession({updateRoomURL,socket, isInitiator, grabWebCamVideo, createPeerConnection, configuration, signalingMessageCallback, sendBtn, snapAndSendBtn});
```

* in 'Joining a room' paste this code
    * to communicate we use socket.emit("message name",...data)
    * in practice make sure data is an object contanining all the data needed
    * socket.io is good at handling different data and transforming it as necessary to be sent 
```ts
        socket.emit('create or join', room);
        if (location.hostname.match(/localhost|127\.0\.0/)) {
            socket.emit('ipaddr');
        }
```
* open a second tab for the same url and head to the blue component and hit snap and send, check the first tab and see the sent photos in the inccoming photos
* if issues restart the server in the terminal
```ps1
node index.js
```


### Resources
[MediaTrackConstraints](https://w3c.github.io/mediacapture-main/getusermedia.html#media-track-constraints)

### Challenge 
* implement the socket.io backend in python
* try to implement, challenge setup RTC and Peer with the code in this section in your app