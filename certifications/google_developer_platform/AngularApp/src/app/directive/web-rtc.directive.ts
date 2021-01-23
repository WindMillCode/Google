import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy } from '../customExports'
import { catchError, delay,first } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import needed items
import {webRTCVideoInit,webRTCTextBoxInit,webRTCPeerAndSignaling,webRTCCamera} from '../webRTC.lib'
import * as socketFn from 'socket.io-client';
//

@Directive({
    selector: '[appWebRTC]'
})
export class WebRTCDirective {

    @Input() webRTC: any;
    extras: any;
    zChildren: any;
    agGrid:any = {
        zSymbol:""
    }

    constructor(
        private el: ElementRef,
        private http: HttpClient,
        private renderer2: Renderer2,
        private ryber: RyberService
    ) { }


    @HostListener('click') onClick() {


        if (this.extras?.confirm === 'true') {




            //communicate with the python backend
            this.http.post(
                "http://localhost:3005",
                {},
                {
                    responseType: 'text',
                }
            )
            .subscribe({


                error: (error) => {


                    eventDispatcher({
                        event: 'resize',
                        element: window
                    })
                },
                next: (result: any) => {



                    eventDispatcher({
                        event: 'resize',
                        element: window
                    })
                }

            })
            //

        }

    }

    ngOnInit() {
        this.extras = this.webRTC
        if (this.extras?.confirm === 'true') {


            // add the adapter shim
            let {scripts} =this.ryber.appCO0.metadata

            scripts =  scripts .filter((x:any,i)=>{
                return x.name === "webRTC Adapter"
            })

            //

            combineLatest([
                // load event fires once however the rxjs helps this method fire
                ...Array.from(scripts,(x:any,i)=>{return fromEvent(x.element,"load")}),
                this.ryber[this.extras.co.valueOf()].metadata.zChildrenSubject
            ])
            .pipe(first())
            .subscribe((result) => {

                // console.log(result)
                // setup for all elements involved in the lab
                this.zChildren = this.ryber[this.extras.co.valueOf()].metadata.zChildren
                Object.entries(this.zChildren)
                .forEach((x:any,i)=>{
                    if(x[1]?.extras?.appWebRTC?.confirm === "pickup"){
                        this.extras[x[1].extras.appWebRTC.webRTC.item] = x[0]
                    }
                })

                //

                if(this.extras.webRTC.item === "localVideo"){
                    // intialize objects for WTC peer connection
                    let  mediaStreamConstraints = {
                        video: true,
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
                    //

                    // blur the screen so end users can identify you
                    this.renderer2.setStyle(
                        localVideo,
                        "filter",
                        "blur(10px) invert(2) opacity(.5)"
                    )
                    //

                    // blur the caller and change the background
                    Object.assign(this.zChildren[this.extras.remoteVideo].css,
                        {
                            filter:"blur(15px) opacity(.8)"
                        }
                    )
                    //

                    fromEvent(localVideo,'loadedmetadata').subscribe(logVideoLoaded)
                    fromEvent(remoteVideo,'loadedmetadata').subscribe(logVideoLoaded)
                    fromEvent(localVideo,'onresize').subscribe(logResizedVideo)


                    // // Set up initial action buttons status: disable call and hangup.
                    callButton.disabled = true;
                    hangupButton.disabled = true;

                    // Add click event handlers for buttons.
                    startButton.addEventListener('click', startAction);
                    callButton.addEventListener('click', callAction);
                    hangupButton.addEventListener('click', hangupAction);


                    // request from the end user use of the webcam
                    from(navigator.mediaDevices.getUserMedia(mediaStreamConstraints))
                    .subscribe({
                        next:gotLocalMediaStream,
                        error:handleLocalMediaStreamError,
                    })
                    //
                }

                else if(this.extras.webRTC.item === "dataChannelSend"){

                    // intialize objects for WTC peer connection
                   // console.log(this.extras)
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


                    // data channel is non media communication
                   startButton.onclick = createConnection;
                   sendButton.onclick = sendData;
                   closeButton.onclick = closeDataChannels;
                    // intialize objects for WTC peer connection
               }

                else if(this.extras.webRTC.item === "camera"){
                    let configuration = null;

                    console.log(this.extras)
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


                    var peerConn;
                    var dataChannel;
                    //initalize the client socket
                    let socketFn = require ('socket.io-client')
                    let socket= socketFn("http://localhost:8080/")
                    // let socket = s.io.connect();
                    //
                    console.log(adapter)
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

                    // Attach event handlers
                    snapBtn.addEventListener('click', snapPhoto);
                    sendBtn.addEventListener('click', sendPhoto);
                    snapAndSendBtn.addEventListener('click', snapAndSend);

                    // Disable send buttons by default.
                    sendBtn.disabled = true;
                    snapAndSendBtn.disabled = true;


                    // Create a random room if not already present in the URL.
                    if (!room) {
                    room = window.location.hash = randomToken();
                    }

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
                    //


                    //setup te client side for the socket session
                    isInitiator = this.cameraSocketSession({updateRoomURL,socket, isInitiator, grabWebCamVideo, createPeerConnection, configuration, signalingMessageCallback, sendBtn, snapAndSendBtn});
                    //

                    // Joining a room
                    socket.emit('create or join', room);
                    if (location.hostname.match(/localhost|127\.0\.0/)) {
                        socket.emit('ipaddr');
                    }
                }






            })

        }
    }

    private cameraSocketSession(devObj) {
        let {updateRoomURL,socket, isInitiator, grabWebCamVideo, createPeerConnection, configuration, signalingMessageCallback, sendBtn, snapAndSendBtn} = devObj
        socket.on('ipaddr', function (ipaddr) {
            console.log('Server IP address is: ' + ipaddr);
            updateRoomURL(ipaddr);
        });

        socket.on('created', function (room, clientId) {
            console.log('Created room', room, '- my client ID is', clientId);
            isInitiator = true;
            grabWebCamVideo();
        });

        socket.on('joined', function (room, clientId) {
            console.log('This peer has joined room', room, 'with client ID', clientId);
            isInitiator = false;
            createPeerConnection(isInitiator, configuration);
            grabWebCamVideo();
        });

        socket.on('full', function (room) {
            alert('Room ' + room + ' is full. We will create a new room for you.');
            window.location.hash = '';
            window.location.reload();
        });

        socket.on('ready', function () {
            console.log('Socket is ready');
            createPeerConnection(isInitiator, configuration);
        });

        socket.on('log', function (array) {
            console.log.apply(console, array);
        });

        socket.on('message', function (message) {
            console.log('Client received message:', message);
            signalingMessageCallback(message);
        });

        // Leaving rooms and disconnecting from peers.
        socket.on('disconnect', function (reason) {
            console.log(`Disconnected: ${reason}.`);
            sendBtn.disabled = true;
            snapAndSendBtn.disabled = true;
        });

        socket.on('bye', function (room) {
            console.log(`Peer leaving room ${room}.`);
            sendBtn.disabled = true;
            snapAndSendBtn.disabled = true;
            // If peer did not create the room, re-enter to be creator.
            if (!isInitiator) {
                window.location.reload();
            }
        });
        return isInitiator;
    }

    // challenge setup RTC and Peer with the code in this section
    private rtcPeerSocketSession(devObj) {

        if(false){

            let isChannelReady = false;
            let isInitiator = false;
            let isStarted = false;
            let localStream;
            let pc;
            let remoteStream;
            let turnReady;
            let pcConfig = {
                'iceServers': [{
                    'urls': 'stun:stun.l.google.com:19302'
                }]
            };
            let sdpConstraints = {
                offerToReceiveAudio: true,
                offerToReceiveVideo: true
            };
            let room = 'foo';
            let constraints = {
                video: true
            };

            let localVideo = this.el.nativeElement;
            let remoteVideo = this.zChildren[this.extras.remoteVideo].element;

            //initalize the client socket
            let socketFn = require ('socket.io-client')
            let {io} = socketFn("http://localhost:8080/")
            let socket = io.connect();
            //


            let  {gotStream,requestTurn,sendMessage,maybeStart,doAnswer,handleRemoteHangup} =  webRTCPeerAndSignaling({
                isChannelReady,
                isInitiator,
                isStarted,
                localStream,
                pc,
                remoteStream,
                turnReady,
                localVideo,
                remoteVideo,
                socket,
                pcConfig,
                sdpConstraints,
                room
            });

            navigator.mediaDevices.getUserMedia({
                audio: false,
                video: true
            })
            .then(gotStream)
            .catch(function (e) {
                alert('getUserMedia() error: ' + e.name);
            });

            if (location.hostname !== 'localhost') {
                requestTurn(
                    'https://computeengineondemand.appspot.com/turn?username=41784574&key=4080218913'
                );
            }

            fromEvent(window,"beforeunload")
            .subscribe(()=>{
                sendMessage('bye');
            });


            // ({ isInitiator, isChannelReady } = this.socketSession({room, socket, isInitiator, isChannelReady, isStarted, pc,maybeStart,doAnswer,handleRemoteHangup}));

        }

        let {room, socket, isInitiator, isChannelReady, isStarted, pc,maybeStart,doAnswer,handleRemoteHangup} = devObj
        if (room !== '') {
            socket.emit('create or join', room);
            console.log('Attempted to create or  join room', room);
        }

        socket.on('created', function (room) {
            console.log('Created room ' + room);
            isInitiator = true;
        });

        socket.on('full', function (room) {
            console.log('Room ' + room + ' is full');
        });

        socket.on('join', function (room) {
            console.log('Another peer made a request to join room ' + room);
            console.log('This peer is the initiator of room ' + room + '!');
            isChannelReady = true;
        });

        socket.on('joined', function (room) {
            console.log('joined: ' + room);
            isChannelReady = true;
        });

        socket.on('log', function (array) {
            console.log.apply(console, array);
        });

        socket.on('message', function (message) {
            console.log('Client received message:', message);
            if (message === 'got user media') {
                maybeStart();
            } else if (message.type === 'offer') {
                if (!isInitiator && !isStarted) {
                    maybeStart();
                }
                pc.setRemoteDescription(new RTCSessionDescription(message));
                doAnswer();
            } else if (message.type === 'answer' && isStarted) {
                pc.setRemoteDescription(new RTCSessionDescription(message));
            } else if (message.type === 'candidate' && isStarted) {
                let candidate = new RTCIceCandidate({
                    sdpMLineIndex: message.label,
                    candidate: message.candidate
                });
                pc.addIceCandidate(candidate);
            } else if (message === 'bye' && isStarted) {
                handleRemoteHangup();
            }
        });
        return { isInitiator, isChannelReady };
    }
    //

                //     // stop the recoding
                //     console.log(localStream.getVideoTracks())
                //     // localStream.getVideoTracks()[0].stop()




    ngOnDestroy() {
        if (this.extras?.confirm === 'true') {
            Object.values(this)
                .forEach((x: any, i) => {
                    if (x instanceof Subscriber) {
                        x.unsubscribe?.()
                    }

                })
        }
    }
}

